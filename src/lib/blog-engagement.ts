import { getAllPosts, getPostBySlug } from "@/lib/blog";
import {
  blogPostPath,
  withEngagementSeed,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";
import {
  getBlogEngagementRecord,
  readBlogEngagementStore,
  readBlogEngagementStoreSync,
  type BlogEngagementRecord,
  type BlogEngagementStore,
} from "@/lib/blog-engagement-store";

const BLOG_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Published articles only. The pattern blocks path segments before the slug
 * is joined onto the content directory.
 */
export function isPublishedBlogSlug(slug: string): boolean {
  if (slug.length > 120 || !BLOG_SLUG.test(slug)) return false;
  const post = getPostBySlug(slug);
  return Boolean(post?.published);
}

export type { BlogEngagementStats } from "@/lib/blog-engagement-shared";
export { blogPostPath, formatEngagementCount } from "@/lib/blog-engagement-shared";

function countsFromStore(store: BlogEngagementStore, path: string): Omit<BlogEngagementStats, "slug"> {
  const record = getBlogEngagementRecord(store, path);
  return {
    views: record.views,
    likes: record.likes,
    shares: record.shares,
  };
}

/** Build the public payload from a record already in memory. Avoids a second blob read. */
export function blogEngagementStatsFromRecord(
  slug: string,
  record: Pick<BlogEngagementRecord, "views" | "likes" | "shares">,
): BlogEngagementStats {
  return withEngagementSeed(slug, {
    views: record.views,
    likes: record.likes,
    shares: record.shares,
  });
}

export function getBlogEngagementForSlug(slug: string): BlogEngagementStats {
  const path = blogPostPath(slug);
  const store = readBlogEngagementStoreSync();
  return withEngagementSeed(slug, countsFromStore(store, path));
}

export async function getBlogEngagementForSlugAsync(slug: string): Promise<BlogEngagementStats> {
  const path = blogPostPath(slug);
  const store = await readBlogEngagementStore();
  return withEngagementSeed(slug, countsFromStore(store, path));
}

export function getBlogEngagementMap(): Record<string, BlogEngagementStats> {
  const slugs = getAllPosts().map((post) => post.slug);
  const store = readBlogEngagementStoreSync();
  const map: Record<string, BlogEngagementStats> = {};

  slugs.forEach((slug) => {
    map[slug] = withEngagementSeed(slug, countsFromStore(store, blogPostPath(slug)));
  });

  return map;
}

export async function getBlogEngagementMapAsync(): Promise<Record<string, BlogEngagementStats>> {
  const slugs = getAllPosts().map((post) => post.slug);
  const store = await readBlogEngagementStore();
  const map: Record<string, BlogEngagementStats> = {};

  slugs.forEach((slug) => {
    map[slug] = withEngagementSeed(slug, countsFromStore(store, blogPostPath(slug)));
  });

  return map;
}
