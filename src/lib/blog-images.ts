import type { BlogPost } from "@/lib/blog";

export type BlogShareImageMeta = {
  width: number;
  height: number;
  type: string;
};

/** Absolute URL for social previews (Open Graph / LinkedIn). */
export function getBlogShareImageUrl(post: BlogPost, siteUrl: string): string {
  if (post.thumbnail) {
    return post.thumbnail.startsWith("http")
      ? post.thumbnail
      : `${siteUrl.replace(/\/$/, "")}${post.thumbnail.startsWith("/") ? post.thumbnail : `/${post.thumbnail}`}`;
  }

  return `${siteUrl.replace(/\/$/, "")}/blog/${post.slug}/opengraph-image`;
}

/** Dimensions and MIME type for og:image meta tags. */
export function getBlogShareImageMeta(post: BlogPost): BlogShareImageMeta {
  if (post.thumbnail?.match(/\.jpe?g$/i)) {
    return { width: 1200, height: 675, type: "image/jpeg" };
  }

  if (post.thumbnail?.match(/\.png$/i)) {
    return { width: 1200, height: 630, type: "image/png" };
  }

  return { width: 1200, height: 630, type: "image/png" };
}

/** Path used in the blog index and cards. Uses the dynamic OG route when no custom file is set. */
export function getBlogThumbnailSrc(post: BlogPost): string {
  if (post.thumbnail) return post.thumbnail;
  return `/blog/${post.slug}/opengraph-image`;
}
