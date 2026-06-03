import { getAllPosts } from "@/lib/blog";
import { readEvents } from "@/lib/analytics";
import {
  blogPostPath,
  withEngagementSeed,
  type BlogEngagementStats,
} from "@/lib/blog-engagement-shared";

export type { BlogEngagementStats } from "@/lib/blog-engagement-shared";
export { blogPostPath, formatEngagementCount } from "@/lib/blog-engagement-shared";

export function getBlogEngagementForSlug(slug: string): BlogEngagementStats {
  const path = blogPostPath(slug);
  const events = readEvents();

  return withEngagementSeed(slug, {
    views: events.filter((event) => event.type === "pageview" && event.path === path).length,
    likes: events.filter((event) => event.type === "blog_like" && event.path === path).length,
    shares: events.filter((event) => event.type === "blog_share" && event.path === path).length,
  });
}

export function getBlogEngagementMap(): Record<string, BlogEngagementStats> {
  const slugs = getAllPosts().map((post) => post.slug);
  const map: Record<string, BlogEngagementStats> = {};

  slugs.forEach((slug) => {
    map[slug] = getBlogEngagementForSlug(slug);
  });

  return map;
}
