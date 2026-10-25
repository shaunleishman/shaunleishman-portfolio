import type { CSSProperties } from "react";

/**
 * Shared motion for the grouping article widgets.
 *
 * `GROUPING_TRANSITION_MS` is the preset morph (500). The Tailwind duration
 * classes below and the `grouping-*-in` keyframes in `src/app/globals.css`
 * have to stay on that same duration.
 *
 * Preset gap changes are meant to ease. A range input must not: pass
 * `transitionDuration: "0s"` while the slider is the source, or the 500ms
 * ease leaves the spacing behind the thumb for the whole drag.
 *
 * `groupingMorphTransition` lists the properties the explorers actually
 * change (margin, padding, size, colour, radius, border, opacity).
 * `transition-all` was also interpolating every other property on each card.
 *
 * Collapsed blocks stay mounted so `grid-template-rows` can ease shut, which
 * also leaves them in the accessibility tree. Mark them with
 * `groupingCollapsedProps` for the closed state.
 *
 * Hint copy fades by remounting an inner span (`groupingHintIn`). The
 * `aria-live` element has to stay mounted across that remount or the status
 * change is not announced.
 *
 * `grouping-connector-in` animates `transform: scaleX`. Stepper rules also
 * use `-translate-y-1/2`. Tailwind v4 keeps that centering on the separate
 * `translate` property, so the keyframe does not pull the rules off center.
 * Do not fold the translate into the keyframe: dots and the vertical parent
 * rule share the same animation.
 *
 * Similarity cards set `transitionDelay` on the article. Delay does not
 * inherit, and the article's own properties do not change, so the cards
 * morph together. Moving the delay onto the morphing children would stagger
 * that motion.
 */
export const GROUPING_TRANSITION_MS = 500;

export const groupingGapTransition =
  "motion-safe:transition-[gap] motion-safe:duration-500 motion-safe:ease-out";

export const groupingMorphTransition =
  "motion-safe:transition-[margin,padding,max-height,opacity,width,height,border-radius,background-color,color,border-color,border-width] motion-safe:duration-500 motion-safe:ease-out";

export const groupingPanelIn =
  "motion-safe:animate-[grouping-panel-in_0.5s_ease-out_both]";

export const groupingHintIn =
  "motion-safe:animate-[grouping-hint-in_0.35s_ease-out_both]";

export const groupingConnectorIn =
  "motion-safe:animate-[grouping-connector-in_0.45s_ease-out_both]";

export function groupingStaggerDelay(index: number, stepMs = 45): CSSProperties {
  return { animationDelay: `${index * stepMs}ms` };
}

/** Drop a collapsed, still-mounted block out of the accessibility tree. */
export function groupingCollapsedProps(open: boolean) {
  if (open) return {};
  return { "aria-hidden": true, inert: true } as const;
}
