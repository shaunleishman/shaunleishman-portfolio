import type { BlogPost } from "@/lib/blog";

export type BlogShareImageMeta = {
  width: number;
  height: number;
  type: string;
};

/** Absolute URL for social previews (Open Graph / LinkedIn). */
export function getBlogShareImageUrl(post: BlogPost, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");

  if (post.thumbnail) {
    if (post.thumbnail.startsWith("http")) return post.thumbnail;
    return `${base}/og/blog/${post.slug}`;
  }

  return `${base}/blog/${post.slug}/opengraph-image`;
}

/** Dimensions and MIME type for og:image meta tags. */
export function getBlogShareImageMeta(post: BlogPost): BlogShareImageMeta {
  if (post.thumbnail?.match(/-og\.jpe?g$/i) || post.thumbnail?.match(/\.jpe?g$/i)) {
    return { width: 1200, height: 627, type: "image/jpeg" };
  }

  if (post.thumbnail?.match(/\.png$/i)) {
    return { width: 1200, height: 630, type: "image/png" };
  }

  return { width: 1200, height: 630, type: "image/png" };
}

/** Path used in the blog index and cards. */
export function getBlogThumbnailSrc(post: BlogPost): string {
  if (post.thumbnail) return post.thumbnail;
  return `/blog/${post.slug}/opengraph-image`;
}
