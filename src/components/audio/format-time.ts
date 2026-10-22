/** Clock label shared by the article player and the floating bar. */
export function formatPlaybackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const ss = secs.toString().padStart(2, "0");
  // Under an hour the label stays `m:ss`, matching the previous clock.
  if (hours === 0) return `${mins}:${ss}`;
  return `${hours}:${mins.toString().padStart(2, "0")}:${ss}`;
}

/** A usable media length. NaN and Infinity are treated as unknown. */
export function finiteMediaDuration(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}
