import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { BlogPost } from "@/lib/blog";
import type { BlogShareImageMeta } from "@/lib/blog-images";

export type BlogShareImageFile = BlogShareImageMeta & {
  data: Buffer;
};

type CacheEntry = {
  mtimeMs: number;
  size: number;
  image: BlogShareImageFile;
};

const cache = new Map<string, CacheEntry>();

function contentTypeFor(filePath: string, data: Buffer): string {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    data.length >= 8 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47
  ) {
    return "image/png";
  }

  const lower = filePath.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

function imageSize(data: Buffer): { width: number; height: number } | null {
  if (
    data.length >= 24 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47
  ) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }

  if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 8 < data.length) {
    if (data[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = data[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }

    const standalone =
      marker === 0xd8 ||
      marker === 0xd9 ||
      marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd7);
    if (standalone) {
      offset += 2;
      continue;
    }

    if (offset + 4 > data.length) return null;
    const length = data.readUInt16BE(offset + 2);
    if (length < 2) return null;

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame) {
      if (offset + 9 > data.length) return null;
      return {
        height: data.readUInt16BE(offset + 5),
        width: data.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  return null;
}

function publicPath(urlPath: string): string {
  return join(process.cwd(), "public", urlPath.replace(/^\//, ""));
}

/**
 * File the share route sends.
 * `name-og` is used only when it has the card's extension, then the card.
 * A sibling with another extension is left alone: the Kano `-og.jpg` is a
 * different picture from the index card. Type and size come from the bytes.
 * Several cards are JPEG data saved as `.png`.
 */
export function readBlogShareImage(post: Pick<BlogPost, "thumbnail">): BlogShareImageFile | null {
  const thumbnail = post.thumbnail;
  if (!thumbnail || thumbnail.startsWith("http")) return null;

  const sameExtensionOg = thumbnail.replace(/(\.[a-z]+)$/i, "-og$1");
  const candidates =
    sameExtensionOg === thumbnail ? [thumbnail] : [sameExtensionOg, thumbnail];

  for (const candidate of candidates) {
    const filePath = publicPath(candidate);
    if (!existsSync(filePath)) continue;

    const stat = statSync(filePath);
    const cached = cache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
      return cached.image;
    }

    const data = readFileSync(filePath);
    const type = contentTypeFor(filePath, data);
    const size = imageSize(data);
    const image: BlogShareImageFile = {
      data,
      type,
      width: size?.width ?? 1200,
      height: size?.height ?? (type === "image/jpeg" ? 627 : 630),
    };
    cache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, image });
    return image;
  }

  return null;
}

/** Open Graph width, height, and type for the file `readBlogShareImage` sends. */
export function getServedBlogShareImageMeta(
  post: Pick<BlogPost, "thumbnail">,
): BlogShareImageMeta | null {
  const image = readBlogShareImage(post);
  if (!image) return null;
  return { width: image.width, height: image.height, type: image.type };
}
