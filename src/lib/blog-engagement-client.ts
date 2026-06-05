import type { BlogEngagementStats } from "@/lib/blog-engagement-shared";

export async function fetchBlogEngagementStats(slug: string): Promise<BlogEngagementStats | null> {
  try {
    const res = await fetch(`/api/blog/engagement?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stats?: BlogEngagementStats };
    return data.stats ?? null;
  } catch {
    return null;
  }
}
