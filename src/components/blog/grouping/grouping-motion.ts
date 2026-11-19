import type { CSSProperties } from "react";

/** Preset easings use the `duration-500` literals below. Keep those class names whole so Tailwind can see them. */
export const GROUPING_TRANSITION_MS = 500;

export const groupingGapTransition =
  "motion-safe:transition-[gap] motion-safe:duration-500 motion-safe:ease-out";

/**
 * Properties the explorers actually morph. `transition-all` also watches layout
 * properties that never change on these nodes.
 */
export const groupingMorphTransition =
  "motion-safe:transition-[margin,max-height,opacity,width,height,border-radius,background-color,border-color,border-width,color,padding,align-self] motion-safe:duration-500 motion-safe:ease-out";

export const groupingPanelIn =
  "motion-safe:animate-[grouping-panel-in_0.5s_ease-out_both]";

export const groupingHintIn =
  "motion-safe:animate-[grouping-hint-in_0.35s_ease-out_both]";

export const groupingConnectorIn =
  "motion-safe:animate-[grouping-connector-in_0.45s_ease-out_both]";

export function groupingStaggerDelay(index: number, stepMs = 45): CSSProperties {
  return { animationDelay: `${index * stepMs}ms` };
}

/**
 * Closed rows stay mounted so the grid height can ease shut.
 * `inert` keeps that collapsed copy out of the accessibility tree.
 */
export function groupingCollapsedProps(open: boolean): { "aria-hidden"?: true; inert?: true } {
  if (open) return {};
  return { "aria-hidden": true, inert: true };
}
