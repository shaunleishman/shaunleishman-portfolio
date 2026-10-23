export type BlogEngagementStats = {
  slug: string;
  views: number;
  likes: number;
  shares: number;
};

/** Stored and displayed counts are non-negative integers. */
export function normalizeEngagementCount(value: unknown): number {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number) || number <= 0) return 0;
  return Math.min(Math.floor(number), Number.MAX_SAFE_INTEGER);
}

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
  const safe = normalizeEngagementCount(count);
  if (safe >= 1000) {
    return `${(safe / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(safe);
}

/**
 * Keep the higher count per metric so an older in-flight fetch cannot roll back
 * a like or share. Returns `current` when nothing changed so a poll does not
 * re-render the article.
 */
export function mergeBlogEngagementStats(
  current: BlogEngagementStats,
  incoming: BlogEngagementStats,
): BlogEngagementStats {
  const views = Math.max(
    normalizeEngagementCount(current.views),
    normalizeEngagementCount(incoming.views),
  );
  const likes = Math.max(
    normalizeEngagementCount(current.likes),
    normalizeEngagementCount(incoming.likes),
  );
  const shares = Math.max(
    normalizeEngagementCount(current.shares),
    normalizeEngagementCount(incoming.shares),
  );

  if (current.views === views && current.likes === likes && current.shares === shares) {
    return current;
  }

  return { slug: current.slug, views, likes, shares };
}

/**
 * Apply a like or share response.
 * `changed === false` means the server kept the previous count (duplicate like,
 * or a metrics-owner click). That metric must follow the server or the
 * optimistic +1 sticks until a full reload.
 */
export function reconcileEngagementAction(
  current: BlogEngagementStats,
  incoming: BlogEngagementStats | undefined,
  metric: "likes" | "shares",
  changed: boolean | undefined,
): BlogEngagementStats {
  if (!incoming) return current;

  if (changed === false) {
    const serverCount = normalizeEngagementCount(incoming[metric]);
    if (current[metric] === serverCount) return current;
    return { ...current, [metric]: serverCount };
  }

  return mergeBlogEngagementStats(current, incoming);
}
