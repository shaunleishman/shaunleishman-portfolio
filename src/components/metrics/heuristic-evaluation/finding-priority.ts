import type { FindingPriorityScore } from "@/content/heuristic-evaluations/types";

export const PRIORITY_SCALE = [1, 2, 3, 4, 5] as const;

export const FREQUENCY_LABELS: Record<FindingPriorityScore["frequency"], string> = {
  1: "Rare, few would mention it",
  2: "Uncommon, occasional",
  3: "Moderate, a clear pattern",
  4: "Common, many would complain",
  5: "Very common, nearly everyone",
};

export const IMPACT_LABELS: Record<FindingPriorityScore["impact"], string> = {
  1: "Minor, task still completes",
  2: "Noticeable, extra effort",
  3: "Significant, fixable mistakes",
  4: "Major, likely task failure",
  5: "Severe, blocking or harmful",
};

export const EFFORT_LABELS: Record<FindingPriorityScore["effort"], string> = {
  1: "Very quick, under a day",
  2: "Quick, a day or two",
  3: "Moderate, about a week",
  4: "Large, a few weeks",
  5: "Major, a big project",
};

export const MAX_PRIORITY_POINTS = 5 * 5 * 5;

/**
 * Turns the effort rating into a "speed" factor so quicker fixes score higher.
 * Effort 1 (very quick) → 5, effort 5 (major project) → 1.
 */
export function effortSpeedFactor(effort: FindingPriorityScore["effort"]): number {
  return 6 - effort;
}

/**
 * Composite priority score (1–125) from frequency × impact × speed-to-fix.
 * Speed-to-fix is the inverse of effort, so frequent, high-impact issues that
 * are quick to fix rise to the top.
 */
export function computePriorityPoints(priority: FindingPriorityScore): number {
  return priority.frequency * priority.impact * effortSpeedFactor(priority.effort);
}

/** A frequent, high-impact issue that is quick to fix — worth doing first. */
export function isQuickWin(priority: FindingPriorityScore): boolean {
  return priority.effort <= 2 && priority.impact >= 3 && priority.frequency >= 3;
}

/** Quick wins, highest priority first. */
export function getQuickWins<T extends { priority: FindingPriorityScore }>(
  findings: readonly T[],
): T[] {
  return sortFindingsByPriority(findings.filter((f) => isQuickWin(f.priority)));
}

/** Highest priority first; ties keep source order */
export function sortFindingsByPriority<T extends { priority: FindingPriorityScore }>(
  findings: readonly T[],
): T[] {
  return [...findings].sort(
    (a, b) => computePriorityPoints(b.priority) - computePriorityPoints(a.priority),
  );
}

/** Rank map keyed by finding_id — 1 = fix first */
export function buildPriorityRankMap<T extends { finding_id: string; priority: FindingPriorityScore }>(
  findings: readonly T[],
): Map<string, number> {
  return new Map(
    sortFindingsByPriority(findings).map((finding, index) => [finding.finding_id, index + 1]),
  );
}

export type PriorityTier = "critical" | "high" | "medium" | "low";

export function getPriorityTier(points: number): PriorityTier {
  if (points >= 75) return "critical";
  if (points >= 45) return "high";
  if (points >= 20) return "medium";
  return "low";
}

export const PRIORITY_TIER_STYLES: Record<
  PriorityTier,
  { badge: string; bar: string }
> = {
  critical: {
    badge: "bg-red-100 text-red-900 border-red-200",
    bar: "bg-red-600",
  },
  high: {
    badge: "bg-amber-100 text-amber-900 border-amber-200",
    bar: "bg-amber-500",
  },
  medium: {
    badge: "bg-yellow-50 text-yellow-900 border-yellow-200",
    bar: "bg-yellow-500",
  },
  low: {
    badge: "bg-neutral-100 text-neutral-700 border-neutral-200",
    bar: "bg-neutral-400",
  },
};
