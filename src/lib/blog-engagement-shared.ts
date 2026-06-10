export type BlogEngagementStats = {
  slug: string;
  views: number;
  likes: number;
  shares: number;
};

/** Starting counts — real analytics are added on top for a realistic public total. */
const BLOG_ENGAGEMENT_SEED: Record<string, { views: number; likes: number; shares: number }> = {
  default: { views: 172, likes: 15, shares: 7 },
  "why-kano-model-is-about-letting-go": { views: 172, likes: 15, shares: 7 },
  "are-users-getting-tired-of-your-product": { views: 64, likes: 8, shares: 4 },
  "what-if-we-are-wrong-about-this": { views: 28, likes: 4, shares: 2 },
};

export function withEngagementSeed(
  slug: string,
  counts: Omit<BlogEngagementStats, "slug">,
): BlogEngagementStats {
  const seed = BLOG_ENGAGEMENT_SEED[slug] ?? BLOG_ENGAGEMENT_SEED.default;

  return {
    slug,
    views: seed.views + counts.views,
    likes: seed.likes + counts.likes,
    shares: seed.shares + counts.shares,
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
