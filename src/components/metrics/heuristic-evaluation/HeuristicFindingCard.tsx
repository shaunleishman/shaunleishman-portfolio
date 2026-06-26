"use client";

import { cn } from "@/lib/utils";
import type { HeuristicFinding, HeuristicId, Severity } from "@/content/heuristic-evaluations/types";
import { HEURISTIC_LABELS } from "@/content/heuristic-evaluations/types";
import { AnnotatedScreenshot } from "./AnnotatedScreenshot";
import { CollapsibleTeaserCard } from "./CollapsibleReportSection";
import { FindingPriorityBreakdown, PriorityRankBadge } from "./FindingPriorityDisplay";

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-amber-100 text-amber-900 border-amber-200",
  medium: "bg-yellow-50 text-yellow-900 border-yellow-200",
  low: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

/** One-word summary of each Nielsen heuristic, used on the finding pills. */
const HEURISTIC_ONE_WORD: Record<HeuristicId, string> = {
  H01: "Visibility",
  H02: "Familiarity",
  H03: "Control",
  H04: "Consistency",
  H05: "Prevention",
  H06: "Recognition",
  H07: "Efficiency",
  H08: "Minimalism",
  H09: "Recovery",
  H10: "Help",
};

/** Pill summarising a finding's primary heuristic in one word, with the full name in the tooltip. */
export function HeuristicPill({
  heuristic,
  className,
}: {
  heuristic: HeuristicId;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex cursor-help items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--color-text-secondary)]",
        className,
      )}
      title={`${heuristic} · ${HEURISTIC_LABELS[heuristic]}`}
    >
      {HEURISTIC_ONE_WORD[heuristic]}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[0.75rem] font-semibold capitalize",
        SEVERITY_STYLES[severity],
      )}
    >
      {severity}
    </span>
  );
}

const SEVERITY_GUIDE: { severity: Severity; meaning: string }[] = [
  {
    severity: "critical",
    meaning: "The user fails the task and may face severe consequences.",
  },
  {
    severity: "high",
    meaning: "The user cannot finish the task and needs help to resolve it.",
  },
  {
    severity: "medium",
    meaning: "The user struggles, but finds a workaround.",
  },
  {
    severity: "low",
    meaning: "A slight frustration that does not stop the task.",
  },
];

export function SeverityLevelsGuide() {
  return (
    <div className="space-y-3 text-body-sm">
      <p className="leading-relaxed text-[var(--color-text-secondary)]">
        Severity describes how badly an issue affects the user&apos;s task. It is separate from how
        often people hit it, which feeds the priority score.
      </p>
      <dl className="space-y-2.5">
        {SEVERITY_GUIDE.map(({ severity, meaning }) => (
          <div key={severity} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <dt className="shrink-0">
              <SeverityBadge severity={severity} />
            </dt>
            <dd className="leading-snug text-[var(--color-text-secondary)]">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

type HeuristicFindingCardProps = {
  finding: HeuristicFinding;
  priorityRank: number;
  totalFindings: number;
  defaultOpen?: boolean;
};

export function HeuristicFindingCard({
  finding,
  priorityRank,
  totalFindings,
  defaultOpen = false,
}: HeuristicFindingCardProps) {
  return (
    <CollapsibleTeaserCard
      id={finding.finding_id}
      defaultOpen={defaultOpen}
      label={finding.screen_or_flow}
      className="border-[var(--color-border)]"
      title={finding.title}
      teaser={finding.description}
      meta={
        <>
          <HeuristicPill heuristic={finding.primary_heuristic} />
          <SeverityBadge severity={finding.severity} />
          <PriorityRankBadge
            rank={priorityRank}
            priority={finding.priority}
            totalFindings={totalFindings}
          />
        </>
      }
    >
      <div className="space-y-4">
        <FindingPriorityBreakdown priority={finding.priority} />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <p className="text-body-sm font-medium text-[var(--color-text-primary)] mb-1">My observation</p>
            <p className="text-body-sm text-[var(--color-text-secondary)]">{finding.evidence.observed_behaviour}</p>
            {finding.user_impact && (
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                <span className="font-medium text-[var(--color-text-primary)]">Impact: </span>
                {finding.user_impact}
              </p>
            )}
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
            <p className="text-body-sm font-medium text-[var(--color-text-primary)] mb-1">My recommendation</p>
            <p className="text-body-sm">{finding.recommendation}</p>
          </div>
        </div>

        {finding.accessibility_lens?.is_accessibility_related && (
          <p className="text-[0.8125rem] text-blue-800">
            This finding relates to {finding.accessibility_lens.wcag_principle}.
            {finding.accessibility_lens.notes ? ` ${finding.accessibility_lens.notes}` : ""}
          </p>
        )}

        {finding.screenshot_reference && (
          <AnnotatedScreenshot
            src={finding.screenshot_reference}
            alt={`Screenshot for ${finding.title}`}
            annotations={finding.screenshot_annotations}
            expandable
            caption={finding.screenshot_caption ?? finding.title}
          />
        )}
      </div>
    </CollapsibleTeaserCard>
  );
}
