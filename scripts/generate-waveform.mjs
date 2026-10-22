// Generate a compact waveform-peaks JSON from a WAV file.
// Usage: node scripts/generate-waveform.mjs <input.wav> <output.json> [bars]
//
// Walks RIFF chunks (handles JUNK/other chunks), reads the fmt + data chunks,
// and reduces the PCM to N normalised peak values (0-100) for a SoundCloud-style
// bar waveform. Supports 16-, 24-, and 32-bit integer PCM.
//
// Writes `{ duration, peaks }` for ArticleAudioPlayer. Place it next to the
// audio file as `<name>.peaks.json`. Leave an already published peaks file in
// place unless the source audio changed — regenerating redraws the waveform.

import fs from "fs";

const [, , inputPath, outputPath, barsArg] = process.argv;
const parsedBars = Math.floor(Number(barsArg));
const BARS = Number.isFinite(parsedBars) && parsedBars > 0 ? parsedBars : barsArg ? 0 : 200;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/generate-waveform.mjs <input.wav> <output.json> [bars]");
  process.exit(1);
}

const buf = fs.readFileSync(inputPath);

if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WAVE") {
  console.error("Not a RIFF/WAVE file");
  process.exit(1);
}

let offset = 12;
let fmt = null;
let dataOffset = -1;
let dataSize = 0;

while (offset + 8 <= buf.length) {
  const id = buf.toString("ascii", offset, offset + 4);
  const size = buf.readUInt32LE(offset + 4);
  const body = offset + 8;

  if (id === "fmt ") {
    fmt = {
      audioFormat: buf.readUInt16LE(body),
      channels: buf.readUInt16LE(body + 2),
      sampleRate: buf.readUInt32LE(body + 4),
      bitsPerSample: buf.readUInt16LE(body + 14),
    };
  } else if (id === "data") {
    dataOffset = body;
    dataSize = size;
  }

  offset = body + size + (size % 2); // chunks are word-aligned
}

if (!fmt || dataOffset < 0) {
  console.error("Missing fmt or data chunk");
  process.exit(1);
}

// A truncated file can claim a data chunk longer than the bytes on disk.
if (dataOffset + dataSize > buf.length) {
  dataSize = buf.length - dataOffset;
}

const { channels, bitsPerSample, sampleRate } = fmt;
const bytesPerSample = bitsPerSample / 8;
const frameSize = bytesPerSample * channels;
const frameCount = Math.floor(dataSize / frameSize);

if (!Number.isFinite(BARS) || BARS < 1) {
  console.error("Bar count must be a positive number");
  process.exit(1);
}

if (frameCount <= 0 || !sampleRate) {
  console.error("WAV has no samples");
  process.exit(1);
}

function readSample(frameIndex) {
  // Read channel 0 only; that is enough for a visual peak profile.
  const pos = dataOffset + frameIndex * frameSize;
  if (bitsPerSample === 16) {
    return buf.readInt16LE(pos) / 32768;
  }
  if (bitsPerSample === 24) {
    const b0 = buf[pos];
    const b1 = buf[pos + 1];
    const b2 = buf[pos + 2];
    let val = b0 | (b1 << 8) | (b2 << 16);
    if (val & 0x800000) val -= 0x1000000;
    return val / 8388608;
  }
  if (bitsPerSample === 32) {
    return buf.readInt32LE(pos) / 2147483648;
  }
  throw new Error(`Unsupported bit depth: ${bitsPerSample}`);
}

const peaks = new Array(BARS).fill(0);
for (let bar = 0; bar < BARS; bar++) {
  // Spread every frame across the bars, including the remainder that
  // `floor(frameCount / bars)` used to drop. A short file (fewer frames than
  // bars) no longer collapses to silence.
  const start = Math.floor((bar * frameCount) / BARS);
  const end = Math.floor(((bar + 1) * frameCount) / BARS);
  let sumSquares = 0;
  let count = 0;
  for (let f = start; f < end; f++) {
    const amp = readSample(f);
    sumSquares += amp * amp;
    count++;
  }
  peaks[bar] = count > 0 ? Math.sqrt(sumSquares / count) : 0; // RMS loudness
}

let max = 0.0001;
for (const peak of peaks) {
  if (peak > max) max = peak;
}
// Normalise, then apply a mild curve so quiet gaps read shorter (more dynamic look).
const normalised = peaks.map((p) => {
  const scaled = Math.pow(p / max, 0.85);
  return Math.max(3, Math.round(scaled * 100));
});

const duration = frameCount / sampleRate;
fs.writeFileSync(
  outputPath,
  JSON.stringify({ duration: Math.round(duration * 100) / 100, peaks: normalised }),
);
console.log(
  `Wrote ${BARS} peaks to ${outputPath} (${channels}ch, ${bitsPerSample}-bit, ${frameCount} frames, ${duration.toFixed(1)}s)`,
);
