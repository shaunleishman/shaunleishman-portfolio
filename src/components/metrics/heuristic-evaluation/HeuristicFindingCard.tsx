"use client";

import { cn } from "@/lib/utils";
import type { HeuristicFinding, Severity } from "@/content/heuristic-evaluations/types";
import { AnnotatedScreenshot } from "./AnnotatedScreenshot";
import { CollapsibleTeaserCard } from "./CollapsibleReportSection";
import { FindingPriorityBreakdown, PriorityRankBadge } from "./FindingPriorityDisplay";

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-amber-100 text-amber-900 border-amber-200",
  medium: "bg-yellow-50 text-yellow-900 border-yellow-200",
  low: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

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
          <span className="font-mono text-[0.75rem] text-[var(--color-text-muted)]">{finding.finding_id}</span>
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
        <FindingPriorityBreakdown
          rank={priorityRank}
          priority={finding.priority}
          totalFindings={totalFindings}
        />

        <div className="rounded-xl bg-[var(--color-bg-muted)] p-4">
          <p className="text-label font-semibold text-[var(--color-text-primary)] mb-2">What I saw</p>
          <p className="text-body-sm text-[var(--color-text-secondary)]">{finding.evidence.observed_behaviour}</p>
        </div>

        {finding.user_impact && (
          <div>
            <p className="text-body-sm font-medium text-[var(--color-text-muted)] mb-1">User impact</p>
            <p className="text-body-sm text-[var(--color-text-secondary)]">{finding.user_impact}</p>
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4">
          <p className="text-label font-semibold text-[var(--color-accent)] mb-1">My recommendation</p>
          <p className="text-body-sm">{finding.recommendation}</p>
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
