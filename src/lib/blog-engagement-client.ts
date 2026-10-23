import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";

function isEngagementStats(value: unknown): value is BlogEngagementStats {
  if (!value || typeof value !== "object") return false;
  const stats = value as Partial<BlogEngagementStats>;
  return (
    typeof stats.slug === "string" &&
    typeof stats.views === "number" &&
    typeof stats.likes === "number" &&
    typeof stats.shares === "number"
  );
}

export async function fetchBlogEngagementStats(slug: string): Promise<BlogEngagementStats | null> {
  try {
    const res = await fetch(`/api/blog/engagement?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stats?: unknown };
    return isEngagementStats(data.stats) ? data.stats : null;
  } catch {
    return null;
  }
}

export async function fetchBlogEngagementMap(): Promise<Record<string, BlogEngagementStats> | null> {
  try {
    const res = await fetch("/api/blog/engagement", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { posts?: unknown };
    if (!data.posts || typeof data.posts !== "object") return null;

    const posts: Record<string, BlogEngagementStats> = {};
    for (const [slug, stats] of Object.entries(data.posts)) {
      if (isEngagementStats(stats)) posts[slug] = stats;
    }
    return posts;
  } catch {
    return null;
  }
}
