import type { BlogPost } from "@/lib/blog";

/**
 * Dimensions and MIME type for og:image meta tags.
 * The values are measured from the file the share route sends
 * (`getBlogShareImageMeta` in `blog-share-image.ts`). That module is
 * server-only so the blog index does not import it.
 */
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

/** Path used in the blog index and cards. This stays the card image, not the share crop. */
export function getBlogThumbnailSrc(post: { slug: string; thumbnail?: string }): string {
  if (post.thumbnail) return post.thumbnail;
  return `/blog/${post.slug}/opengraph-image`;
}
