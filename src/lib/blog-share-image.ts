import fs from "fs";
import path from "path";
import type { BlogShareImageMeta } from "@/lib/blog-images";

const PUBLIC_ROOT = path.join(process.cwd(), "public");

/**
 * A prepared share crop can use a different extension than the card thumbnail.
 * `photo.png` may have a sibling `photo-og.jpg`.
 */
const OG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export type BlogShareImageFile = {
  publicPath: string;
  data: Buffer;
  mime: string;
  width: number;
  height: number;
};

type SniffedImage = {
  mime: string;
  width: number;
  height: number;
};

/** Paths the share route tries, first match wins. The card thumbnail is last. */
export function blogShareImageCandidates(thumbnail: string): string[] {
  const extension = path.posix.extname(thumbnail);
  const base = extension ? thumbnail.slice(0, -extension.length) : thumbnail;
  const ordered = [
    extension ? `${base}-og${extension}` : "",
    ...OG_EXTENSIONS.map((ogExtension) => `${base}-og${ogExtension}`),
    thumbnail,
  ].filter((candidate) => candidate.length > 0);

  return [...new Set(ordered)];
}

function isInsidePublic(absolute: string): boolean {
  const relative = path.relative(PUBLIC_ROOT, absolute);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function jpegSize(data: Buffer): { width: number; height: number } | null {
  let offset = 2;

  while (offset + 8 < data.length) {
    if (data[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = data[offset + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    if (offset + 4 > data.length) return null;
    const segmentLength = data.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;

    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      if (offset + 9 > data.length) return null;
      return {
        height: data.readUInt16BE(offset + 5),
        width: data.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + segmentLength;
  }

  return null;
}

/**
 * Trust the file bytes, not the extension. Several card images are JPEGs
 * saved with a `.png` name, and the old meta tags described every one of
 * them as a 1200×630 PNG.
 */
export function sniffImage(data: Buffer): SniffedImage | null {
  if (
    data.length >= 24 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47
  ) {
    return {
      mime: "image/png",
      width: data.readUInt32BE(16),
      height: data.readUInt32BE(20),
    };
  }

  if (data.length >= 10 && data.toString("ascii", 0, 3) === "GIF") {
    return {
      mime: "image/gif",
      width: data.readUInt16LE(6),
      height: data.readUInt16LE(8),
    };
  }

  if (data.length >= 4 && data[0] === 0xff && data[1] === 0xd8) {
    const size = jpegSize(data);
    if (!size) return null;
    return { mime: "image/jpeg", width: size.width, height: size.height };
  }

  return null;
}

export function readBlogShareImage(thumbnail: string): BlogShareImageFile | null {
  if (!thumbnail.startsWith("/") || thumbnail.startsWith("//") || thumbnail.includes("\0")) {
    return null;
  }

  for (const candidate of blogShareImageCandidates(thumbnail)) {
    if (!candidate.startsWith("/") || candidate.includes("\0")) continue;

    const absolute = path.resolve(PUBLIC_ROOT, candidate.replace(/^\/+/, ""));
    if (!isInsidePublic(absolute) || !fs.existsSync(absolute)) continue;

    const data = fs.readFileSync(absolute);
    const sniffed = sniffImage(data);
    if (!sniffed) continue;

    return {
      publicPath: candidate,
      data,
      mime: sniffed.mime,
      width: sniffed.width,
      height: sniffed.height,
    };
  }

  return null;
}

/** Dimensions and MIME type for the file the share route will actually send. */
export function getBlogShareImageMeta(post: { thumbnail?: string }): BlogShareImageMeta {
  const thumbnail = post.thumbnail;

  if (thumbnail?.startsWith("http://") || thumbnail?.startsWith("https://")) {
    if (/\.jpe?g($|\?)/i.test(thumbnail)) {
      return { width: 1200, height: 627, type: "image/jpeg" };
    }
    if (/\.png($|\?)/i.test(thumbnail)) {
      return { width: 1200, height: 630, type: "image/png" };
    }
    return { width: 1200, height: 630, type: "image/png" };
  }

  if (thumbnail) {
    const image = readBlogShareImage(thumbnail);
    if (image) {
      return { width: image.width, height: image.height, type: image.mime };
    }
  }

  return { width: 1200, height: 630, type: "image/png" };
}
