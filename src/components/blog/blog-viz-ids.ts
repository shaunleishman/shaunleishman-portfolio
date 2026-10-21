/** Ids accepted by `<!-- viz:id -->` in an article's markdown. */
export const BLOG_VIZ_IDS = [
  "kano-overview",
  "kano-curve",
  "kano-shift",
  "route-check",
  "grouping-proximity",
  "grouping-similarity",
  "grouping-common-region",
  "grouping-connectedness",
] as const;

export type BlogVizId = (typeof BLOG_VIZ_IDS)[number];

export function isBlogVizId(id: string): id is BlogVizId {
  return (BLOG_VIZ_IDS as readonly string[]).includes(id);
}
