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

/**
 * Keep the higher count per metric so an older response cannot roll back a like or share.
 * Returns `current` when the counts are unchanged, so a poll does not re-render the article.
 * Stats for a different article are ignored.
 */
export function mergeBlogEngagementStats(
  current: BlogEngagementStats,
  incoming: BlogEngagementStats,
): BlogEngagementStats {
  if (incoming.slug !== current.slug) return current;
  if (
    current.views === incoming.views &&
    current.likes === incoming.likes &&
    current.shares === incoming.shares
  ) {
    return current;
  }

  return {
    slug: current.slug,
    views: Math.max(current.views, incoming.views),
    likes: Math.max(current.likes, incoming.likes),
    shares: Math.max(current.shares, incoming.shares),
  };
}

/** Apply a like or share delta for this article only. */
export function bumpEngagementCount(
  current: BlogEngagementStats,
  slug: string,
  metric: "likes" | "shares",
  delta: 1 | -1,
): BlogEngagementStats {
  if (current.slug !== slug) return current;
  const next = Math.max(0, current[metric] + delta);
  if (next === current[metric]) return current;
  return { ...current, [metric]: next };
}

/**
 * A successful write keeps the higher count.
 * A rejected write drops the optimistic +1 when that +1 is still the latest change.
 */
export function reconcileEngagementAction(
  current: BlogEngagementStats,
  incoming: BlogEngagementStats,
  metric: "likes" | "shares",
  changed: boolean,
  baseline: number,
): BlogEngagementStats {
  if (!changed) {
    if (current.slug !== incoming.slug) return current;
    if (current[metric] !== baseline + 1) return current;
    if (current[metric] === incoming[metric]) return current;
    return { ...current, [metric]: incoming[metric] };
  }
  return mergeBlogEngagementStats(current, incoming);
}
