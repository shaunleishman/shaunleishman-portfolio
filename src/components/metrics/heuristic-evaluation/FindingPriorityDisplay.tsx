import { cn } from "@/lib/utils";
import type { FindingPriorityScore } from "@/content/heuristic-evaluations/types";
import {
  computePriorityPoints,
  FREQUENCY_LABELS,
  getPriorityTier,
  IMPACT_LABELS,
  MAX_PRIORITY_POINTS,
  PERSISTENCE_LABELS,
  PRIORITY_SCALE,
  PRIORITY_TIER_STYLES,
} from "./finding-priority";

function getPriorityPointsBadgeStyle(points: number): string {
  const tier = getPriorityTier(points);
  return PRIORITY_TIER_STYLES[tier].badge;
}

export function PriorityRankBadge({
  rank,
  priority,
  totalFindings,
}: {
  rank: number;
  priority: FindingPriorityScore;
  totalFindings: number;
}) {
  const points = computePriorityPoints(priority);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.75rem] font-semibold tabular-nums",
        getPriorityPointsBadgeStyle(points),
      )}
      title={`${points} points (fix order ${rank} of ${totalFindings}). Frequency × impact × persistence, max ${MAX_PRIORITY_POINTS}.`}
    >
      <span className="opacity-80">Priority</span>
      {points}
    </span>
  );
}

const PRIORITY_DIMENSIONS = [
  { key: "Frequency", getHint: (p: FindingPriorityScore) => FREQUENCY_LABELS[p.frequency], getValue: (p: FindingPriorityScore) => p.frequency },
  { key: "Impact", getHint: (p: FindingPriorityScore) => IMPACT_LABELS[p.impact], getValue: (p: FindingPriorityScore) => p.impact },
  { key: "Persistence", getHint: (p: FindingPriorityScore) => PERSISTENCE_LABELS[p.persistence], getValue: (p: FindingPriorityScore) => p.persistence },
] as const;

export function FindingPriorityBreakdown({
  rank,
  priority,
  totalFindings,
}: {
  rank: number;
  priority: FindingPriorityScore;
  totalFindings: number;
}) {
  const points = computePriorityPoints(priority);
  const barClass = PRIORITY_TIER_STYLES[getPriorityTier(points)].bar;

  return (
    <div className="rounded-xl bg-[var(--color-bg-muted)] px-4 py-3">
      <p className="text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">
        Rank{" "}
        <span className="font-semibold text-[var(--color-text-primary)]">{rank}</span> of {totalFindings}
        <span className="mx-1.5 text-[var(--color-text-muted)]">·</span>
        <span className="font-mono tabular-nums text-[var(--color-text-primary)]">
          {priority.frequency}×{priority.impact}×{priority.persistence}
        </span>{" "}
        = <span className="font-semibold text-[var(--color-text-primary)]">{points}</span>
      </p>
      <dl className="mt-3 grid grid-cols-3 gap-3">
        {PRIORITY_DIMENSIONS.map(({ key, getHint, getValue }) => {
          const value = getValue(priority);
          return (
            <div key={key} title={getHint(priority)}>
              <dt className="text-[0.75rem] text-[var(--color-text-muted)]">{key}</dt>
              <dd className="mt-1.5 flex gap-0.5" aria-label={`${key}: ${value} of 5`}>
                {PRIORITY_SCALE.map((step) => (
                  <span
                    key={step}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      step <= value ? barClass : "bg-[var(--color-border)]",
                    )}
                  />
                ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
