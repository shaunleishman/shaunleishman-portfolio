import type { FindingPriorityScore } from "@/content/heuristic-evaluations/types";

export const PRIORITY_SCALE = [1, 2, 3, 4, 5] as const;

export const FREQUENCY_LABELS: Record<FindingPriorityScore["frequency"], string> = {
  1: "Rare — few users would mention it",
  2: "Uncommon — occasional frustration",
  3: "Moderate — a noticeable pattern",
  4: "Common — many users would complain",
  5: "Very common — almost everyone hits it",
};

export const IMPACT_LABELS: Record<FindingPriorityScore["impact"], string> = {
  1: "Minor — small annoyance, task still completes",
  2: "Noticeable — extra effort or hesitation",
  3: "Significant — confusion or recoverable mistakes",
  4: "Major — likely task failure or support call",
  5: "Severe — blocking or serious harm",
};

export const PERSISTENCE_LABELS: Record<FindingPriorityScore["persistence"], string> = {
  1: "One-time — affects the user once",
  2: "Occasional — comes up now and then",
  3: "Repeating — returns on each visit",
  4: "Session-long — stays in the way throughout a visit",
  5: "Persistent — follows them across the experience",
};

export const MAX_PRIORITY_POINTS = 5 * 5 * 5;

/** Composite priority score (1–125) from frequency × impact × persistence */
export function computePriorityPoints(priority: FindingPriorityScore): number {
  return priority.frequency * priority.impact * priority.persistence;
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
    bar: "bg-red-500",
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
