export type BlogEngagementStats = {
  slug: string;
  views: number;
  likes: number;
  shares: number;
};

/** Public stats use the stored engagement counts only — no padded baselines. */
export function withEngagementSeed(
  slug: string,
  counts: Omit<BlogEngagementStats, "slug">,
): BlogEngagementStats {
  return {
    slug,
    views: counts.views,
    likes: counts.likes,
    shares: counts.shares,
  };
}

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function formatEngagementCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}

/** Keep the higher count per metric so in-flight fetches cannot roll back a like/share. */
export function mergeBlogEngagementStats(
  current: BlogEngagementStats,
  incoming: BlogEngagementStats,
): BlogEngagementStats {
  return {
    slug: current.slug,
    views: Math.max(current.views, incoming.views),
    likes: Math.max(current.likes, incoming.likes),
    shares: Math.max(current.shares, incoming.shares),
  };
}
