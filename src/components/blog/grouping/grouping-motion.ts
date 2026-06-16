import type { CSSProperties } from "react";

export const GROUPING_TRANSITION_MS = 500;

export const groupingGapTransition =
  "motion-safe:transition-[gap] motion-safe:duration-500 motion-safe:ease-out";

export const groupingMorphTransition =
  "motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out";

export const groupingPanelIn =
  "motion-safe:animate-[grouping-panel-in_0.5s_ease-out_both]";

export const groupingHintIn =
  "motion-safe:animate-[grouping-hint-in_0.35s_ease-out_both]";

export const groupingConnectorIn =
  "motion-safe:animate-[grouping-connector-in_0.45s_ease-out_both]";

export function groupingStaggerDelay(index: number, stepMs = 45): CSSProperties {
  return { animationDelay: `${index * stepMs}ms` };
}
