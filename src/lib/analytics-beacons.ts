export type ScrollMilestone = 25 | 50 | 75 | 100;

/**
 * 25/50/75 use the rounded percent. 100 waits until the visitor is within 1px
 * of the bottom and at least 99% down, so rounding cannot fire it early.
 * A page that does not scroll stays at 0.
 */
export function scrollDepthReached(
  milestone: ScrollMilestone,
  scrollY: number,
  maxScroll: number,
): boolean {
  if (maxScroll <= 0) return false;
  if (milestone === 100) {
    return scrollY >= maxScroll - 1 && scrollY / maxScroll >= 0.99;
  }
  return Math.round((scrollY / maxScroll) * 100) >= milestone;
}

/**
 * Sections use a 0.4 intersection ratio. A section taller than 2.5 viewports
 * can never reach that ratio, so it counts once it covers 60% of the viewport.
 */
export function sectionCountsAsViewed(input: {
  isIntersecting: boolean;
  intersectionRatio: number;
  intersectionHeight: number;
  viewportHeight: number;
  sectionHeight: number;
}): boolean {
  if (!input.isIntersecting) return false;
  if (input.intersectionRatio >= 0.4) return true;

  const { viewportHeight, sectionHeight, intersectionHeight } = input;
  if (viewportHeight <= 0 || sectionHeight <= 0) return false;
  if (sectionHeight <= viewportHeight / 0.4) return false;
  return intersectionHeight >= viewportHeight * 0.6;
}
