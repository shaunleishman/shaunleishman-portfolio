import { cn } from "@/lib/utils";
import type { FindingPriorityScore } from "@/content/heuristic-evaluations/types";
import {
  computePriorityPoints,
  EFFORT_LABELS,
  FREQUENCY_LABELS,
  getPriorityTier,
  IMPACT_LABELS,
  MAX_PRIORITY_POINTS,
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
      title={`${points} points (fix order ${rank} of ${totalFindings}). Frequency × impact × speed to fix, max ${MAX_PRIORITY_POINTS}.`}
    >
      <span className="opacity-80">Priority</span>
      {points}
    </span>
  );
}

const PRIORITY_DIMENSIONS = [
  { key: "Frequency", getHint: (p: FindingPriorityScore) => FREQUENCY_LABELS[p.frequency], getValue: (p: FindingPriorityScore) => p.frequency },
  { key: "Impact", getHint: (p: FindingPriorityScore) => IMPACT_LABELS[p.impact], getValue: (p: FindingPriorityScore) => p.impact },
  { key: "Effort", getHint: (p: FindingPriorityScore) => EFFORT_LABELS[p.effort], getValue: (p: FindingPriorityScore) => p.effort },
] as const;

const SCORING_DIMENSIONS: {
  key: string;
  blurb: string;
  labels: Record<1 | 2 | 3 | 4 | 5, string>;
}[] = [
  { key: "Frequency", blurb: "How many people hit the issue", labels: FREQUENCY_LABELS },
  { key: "Impact", blurb: "How much it affects them", labels: IMPACT_LABELS },
  { key: "Effort", blurb: "How long the fix takes to build and test", labels: EFFORT_LABELS },
];

export function PriorityScoringGuide() {
  return (
    <div className="space-y-5 text-body-sm">
      <p className="leading-relaxed text-[var(--color-text-secondary)]">
        Every finding gets three ratings from 1 to 5: how often people hit it, how much it
        affects them, and how much effort the fix takes. The score (up to {MAX_PRIORITY_POINTS})
        rewards frequent, high-impact issues that are quick to fix, so effort works in reverse —
        the lower the effort, the higher the priority.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {SCORING_DIMENSIONS.map(({ key, blurb, labels }) => (
          <div
            key={key}
            className="rounded-xl border border-[var(--color-border)] bg-white p-4"
          >
            <p className="font-semibold text-[var(--color-text-primary)]">{key}</p>
            <p className="mb-3 text-[0.8125rem] text-[var(--color-text-muted)]">{blurb}</p>
            <dl className="space-y-2">
              {PRIORITY_SCALE.map((step) => (
                <div key={step} className="flex gap-2.5">
                  <dt
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-muted)] text-[0.75rem] font-semibold tabular-nums text-[var(--color-text-secondary)]"
                    aria-label={`Level ${step}`}
                  >
                    {step}
                  </dt>
                  <dd className="leading-snug text-[var(--color-text-secondary)]">
                    {labels[step]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
        This score sets the fix order. It is separate from severity, which describes how badly an
        issue affects the user&apos;s task.
      </p>
    </div>
  );
}

export function FindingPriorityBreakdown({
  priority,
}: {
  priority: FindingPriorityScore;
}) {
  const points = computePriorityPoints(priority);
  const fillClass = PRIORITY_TIER_STYLES[getPriorityTier(points)].bar;

  return (
    <dl className="inline-flex max-w-full flex-wrap divide-x divide-[var(--color-border)] overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      {PRIORITY_DIMENSIONS.map(({ key, getHint, getValue }) => {
        const value = getValue(priority);
        return (
          <div key={key} title={getHint(priority)} className="px-4 py-3">
            <dt className="text-[0.75rem] text-[var(--color-text-secondary)]">{key}</dt>
            <dd className="mt-1.5 flex gap-1" aria-label={`${key}: ${value} of 5`}>
              {PRIORITY_SCALE.map((step) => (
                <span
                  key={step}
                  className={cn(
                    "size-2.5 rounded-full",
                    step <= value ? fillClass : "bg-[var(--color-border)]",
                  )}
                />
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
