import type { BlogPost } from "@/lib/blog";

/** Absolute URL for social previews (Open Graph / LinkedIn). */
export function getBlogShareImageUrl(post: BlogPost, siteUrl: string): string {
  if (post.thumbnail) {
    return post.thumbnail.startsWith("http")
      ? post.thumbnail
      : `${siteUrl.replace(/\/$/, "")}${post.thumbnail.startsWith("/") ? post.thumbnail : `/${post.thumbnail}`}`;
  }

  return `${siteUrl.replace(/\/$/, "")}/blog/${post.slug}/opengraph-image`;
}

/** Path used in the blog index and cards. Uses the dynamic OG route when no custom file is set. */
export function getBlogThumbnailSrc(post: BlogPost): string {
  if (post.thumbnail) return post.thumbnail;
  return `/blog/${post.slug}/opengraph-image`;
}
