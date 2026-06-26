"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HeuristicEvaluation, Severity } from "@/content/heuristic-evaluations/types";
import { useAdminHref } from "@/hooks/useAdminBase";
import { cn } from "@/lib/utils";
import { MetricsKpiCard } from "@/components/metrics/metrics-ui";
import { HeuristicFindingCard, HeuristicPill, SeverityBadge, SeverityLevelsGuide } from "./HeuristicFindingCard";
import { CollapsiblePanel, CollapsibleTeaserCard, ReportSection, scrollIntoReportViewport } from "./CollapsibleReportSection";
import { AnnotatedScreenshot } from "./AnnotatedScreenshot";
import { FullscreenPagePreview } from "./FullscreenPagePreview";
import { MgEmployeesRedesign } from "./MgEmployeesRedesign";
import { OffAxisRedesign } from "./OffAxisRedesign";
import {
  type FindingsSeverityFilterValue,
  FindingsSeverityFilter,
  countFindingsBySeverity,
  filterFindingsBySeverity,
} from "./FindingsSeverityFilter";
import { FindingPriorityBreakdown, PriorityRankBadge, PriorityScoringGuide } from "./FindingPriorityDisplay";
import { buildPriorityRankMap, EFFORT_LABELS, getQuickWins, sortFindingsByPriority } from "./finding-priority";

const FINDINGS_INITIAL_VISIBLE = 6;
const SEVERE_PROBLEMS_COUNT = 2;

const SEVERITY_RANK: Record<Severity, number> = {
  critical: 3,
  high: 2,
  medium: 1,
  low: 0,
};

const SEVERITY_KPI_OPTIONS: { key: Severity; label: string }[] = [
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

const ACTION_PRIORITY_LABELS = {
  fix_now: "Fix now",
  fix_next: "Fix next",
  monitor: "Monitor",
  validate: "Validate with users",
} as const;

const ACTION_PRIORITY_STYLES = {
  fix_now: "border-red-200 bg-red-50",
  fix_next: "border-amber-200 bg-amber-50",
  monitor: "border-blue-200 bg-blue-50",
  validate: "border-purple-200 bg-purple-50",
} as const;

/** Interactive redesign mocks, keyed by evaluation slug. Studies without an entry fall back to the static redesign summary. */
const REDESIGN_MOCKS: Record<
  string,
  { Component: React.ComponentType; headline: string; teaser: string }
> = {
  "mg-employees": {
    Component: MgEmployeesRedesign,
    headline: "Live-site layout with audit fixes",
    teaser: "Task cards, plain language, stronger Log in, slimmer cookie bar",
  },
  "off-axis-tours": {
    Component: OffAxisRedesign,
    headline: "Live-site layout with audit fixes",
    teaser: "Clear hero actions, how-it-works, directory search, real cards, footer",
  },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format an ISO date (YYYY-MM-DD) as a UK-style date, e.g. "15 June 2026". */
function formatUkDate(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthName = MONTH_NAMES[Number(month) - 1];
  if (!monthName) return iso;
  return `${Number(day)} ${monthName} ${year}`;
}

type HeuristicEvaluationReportProps = {
  evaluation: HeuristicEvaluation;
  /** Override the "Back to case studies" destination. Defaults to the secret metrics case-studies path. */
  backHref?: string;
  /** Hide the internal back link entirely (e.g. when a public shell provides its own). */
  hideBack?: boolean;
};

export function HeuristicEvaluationReport({
  evaluation,
  backHref: backHrefProp,
  hideBack = false,
}: HeuristicEvaluationReportProps) {
  const adminBackHref = useAdminHref("case-studies");
  const backHref = backHrefProp ?? adminBackHref;
  const { executiveSummary, scope, findings, actionPlan, screenshots } = evaluation;
  const redesignMock = REDESIGN_MOCKS[evaluation.slug];

  const fixNowCount = actionPlan.filter((item) => item.priority === "fix_now").length;
  const [severityFilter, setSeverityFilter] = useState<FindingsSeverityFilterValue>("all");
  const [findingsExpanded, setFindingsExpanded] = useState(false);
  const firstRevealedFindingRef = useRef<HTMLDivElement>(null);
  const findingsSectionRef = useRef<HTMLElement>(null);
  const priorityRankById = useMemo(() => buildPriorityRankMap(findings), [findings]);
  const topSevereFindings = useMemo(
    () =>
      [...findings]
        .sort((a, b) => {
          const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
          if (bySeverity !== 0) return bySeverity;
          // Tie-break on reach (frequency × impact), independent of how quick the fix is.
          return (
            b.priority.frequency * b.priority.impact -
            a.priority.frequency * a.priority.impact
          );
        })
        .slice(0, SEVERE_PROBLEMS_COUNT),
    [findings],
  );
  const quickWins = useMemo(() => getQuickWins(findings), [findings]);
  const filteredFindings = useMemo(
    () => sortFindingsByPriority(filterFindingsBySeverity(findings, severityFilter)),
    [findings, severityFilter],
  );
  const visibleFindings = useMemo(() => {
    if (findingsExpanded || severityFilter !== "all") return filteredFindings;
    return filteredFindings.slice(0, FINDINGS_INITIAL_VISIBLE);
  }, [filteredFindings, findingsExpanded, severityFilter]);
  const hiddenFindingsCount = filteredFindings.length - visibleFindings.length;

  const handleSeverityKpiClick = (severity: Severity) => {
    setSeverityFilter((current) => (current === severity ? "all" : severity));
    window.requestAnimationFrame(() => {
      if (findingsSectionRef.current) scrollIntoReportViewport(findingsSectionRef.current);
    });
  };

  useEffect(() => {
    setFindingsExpanded(false);
  }, [severityFilter]);

  useEffect(() => {
    if (!findingsExpanded || !firstRevealedFindingRef.current) return;
    window.requestAnimationFrame(() => {
      scrollIntoReportViewport(firstRevealedFindingRef.current!);
    });
  }, [findingsExpanded]);

  return (
    <div className="space-y-8 pb-20 sm:space-y-10 sm:pb-24">
      <div>
        {!hideBack && (
          <Link
            href={backHref}
            className="mb-4 inline-flex min-h-11 items-center text-body-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
          >
            Back to case studies
          </Link>
        )}
        <div className="h-1 w-16 rounded-full mb-4" style={{ backgroundColor: evaluation.accent }} aria-hidden />
        <p className="text-label text-[var(--color-text-muted)]">{evaluation.client}</p>
        <h1 className="text-h2 font-semibold mt-1 text-balance">{evaluation.title}</h1>
        <a
          href={scope.evaluatedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block max-w-full break-words text-body-sm text-[var(--color-accent)] hover:underline"
        >
          {scope.evaluatedUrl}
        </a>
      </div>

      <ReportSection title="Summary">
        <div className="space-y-3">
          <CollapsiblePanel
            label="Overview"
            headline={executiveSummary.usabilityHealth}
            teaser={executiveSummary.whatWasEvaluated}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-body-sm font-semibold mb-2">Top issues</h3>
                <ul className="space-y-1.5">
                  {executiveSummary.topIssues.map((issue) => (
                    <li key={issue} className="text-body-sm text-[var(--color-text-secondary)] flex gap-2">
                      <span className="text-[var(--color-accent)] shrink-0">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-body-sm font-semibold mb-2">Next steps</h3>
                <ol className="space-y-1.5 list-decimal list-inside">
                  {executiveSummary.recommendedNextSteps.map((step) => (
                    <li key={step} className="text-body-sm text-[var(--color-text-secondary)]">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel
            label="Method"
            headline={`${formatUkDate(scope.evaluationDate)} · ${scope.evaluator}`}
            teaser={scope.limitations[0]}
          >
            <dl className="grid gap-4 sm:grid-cols-2 text-body-sm">
              <div>
                <dt className="text-label text-[var(--color-text-muted)]">Date</dt>
                <dd>{formatUkDate(scope.evaluationDate)}</dd>
              </div>
              <div>
                <dt className="text-label text-[var(--color-text-muted)]">Reviewer</dt>
                <dd>{scope.evaluator}</dd>
              </div>
              {scope.timeSpent ? (
                <div className="sm:col-span-2">
                  <dt className="text-label text-[var(--color-text-muted)]">Time spent</dt>
                  <dd>{scope.timeSpent}</dd>
                </div>
              ) : null}
              <div className="sm:col-span-2">
                <dt className="text-label text-[var(--color-text-muted)] mb-1">Tasks reviewed</dt>
                <dd>
                  <ul className="space-y-1">
                    {scope.tasksEvaluated.map((t) => (
                      <li key={t} className="text-[var(--color-text-secondary)]">• {t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-label text-[var(--color-text-muted)] mb-1">Limitations</dt>
                <dd>
                  <ul className="space-y-1">
                    {scope.limitations.map((l) => (
                      <li key={l} className="text-[var(--color-text-secondary)]">• {l}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </CollapsiblePanel>
        </div>
      </ReportSection>

      <ReportSection title="How findings are scored">
        <div className="space-y-3">
          <CollapsiblePanel
            label="Severity levels"
            headline="How badly an issue affects the task"
            teaser="What critical, high, medium, and low mean for the user."
          >
            <SeverityLevelsGuide />
          </CollapsiblePanel>
          <CollapsiblePanel
            label="Priority score"
            headline="Frequency × impact × speed to fix"
            teaser="What each 1 to 5 rating means and how the scores set the fix order."
          >
            <PriorityScoringGuide />
          </CollapsiblePanel>
        </div>
      </ReportSection>

      <ReportSection title="Most severe problems">
        <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
          The {SEVERE_PROBLEMS_COUNT} most severe findings — the issues most likely to block people or cause harm, by how badly they affect the task and how many people they reach. Each one is covered in full in the findings list below.
        </p>
        <div className="space-y-3">
          {topSevereFindings.map((finding) => {
            const rank = priorityRankById.get(finding.finding_id) ?? 0;
            return (
              <CollapsibleTeaserCard
                key={finding.finding_id}
                className="border-2 border-amber-200 bg-amber-50/50"
                summaryClassName="hover:bg-amber-50/80"
                label={finding.screen_or_flow}
                title={finding.title}
                teaser={finding.description}
                meta={
                  <>
                    <HeuristicPill heuristic={finding.primary_heuristic} />
                    <PriorityRankBadge
                      rank={rank}
                      priority={finding.priority}
                      totalFindings={findings.length}
                    />
                    <SeverityBadge severity={finding.severity} />
                  </>
                }
              >
                <div className="space-y-3 text-body-sm">
                  <FindingPriorityBreakdown priority={finding.priority} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
                      <p className="font-medium text-[var(--color-text-primary)] mb-1">My observation</p>
                      <p className="text-[var(--color-text-secondary)]">
                        {finding.evidence.observed_behaviour}
                      </p>
                      {finding.user_impact && (
                        <p className="mt-2 text-[var(--color-text-secondary)]">
                          <span className="font-medium text-[var(--color-text-primary)]">Impact: </span>
                          {finding.user_impact}
                        </p>
                      )}
                    </div>
                    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
                      <p className="font-medium text-[var(--color-text-primary)] mb-1">My recommendation</p>
                      <p>{finding.recommendation}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(finding.finding_id);
                      if (!el) return;
                      const toggle = el.querySelector<HTMLButtonElement>("button[aria-expanded]");
                      if (toggle?.getAttribute("aria-expanded") === "false") {
                        toggle.click();
                      } else {
                        scrollIntoReportViewport(el);
                      }
                    }}
                    className="text-body-sm font-medium text-[var(--color-text-primary)] underline underline-offset-2"
                  >
                    Jump to full finding →
                  </button>
                </div>
              </CollapsibleTeaserCard>
            );
          })}
        </div>
      </ReportSection>

      <ReportSection title="Findings by severity">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-body-sm text-[var(--color-text-muted)]">
            Click a severity to filter the findings list below.
          </p>
          {severityFilter !== "all" && (
            <button
              type="button"
              onClick={() => setSeverityFilter("all")}
              className="text-body-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-6" role="group" aria-label="Filter findings by severity">
          {SEVERITY_KPI_OPTIONS.map(({ key, label }) => {
            const count = countFindingsBySeverity(findings, key);
            return (
              <MetricsKpiCard
                key={key}
                label={label}
                value={String(count)}
                active={severityFilter === key}
                disabled={count === 0}
                onClick={() => handleSeverityKpiClick(key)}
              />
            );
          })}
        </div>
      </ReportSection>

      {screenshots && screenshots.length > 0 && (
        <ReportSection title="Screenshots">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"
              >
                <AnnotatedScreenshot
                  src={shot.src}
                  alt={shot.alt}
                  annotations={shot.annotations}
                  density="compact"
                  expandable
                  caption={shot.caption}
                  className="rounded-none border-0"
                />
                <figcaption className="p-3 text-[0.8125rem] text-[var(--color-text-muted)]">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </ReportSection>
      )}

      <ReportSection
        ref={findingsSectionRef}
        id="findings-list"
        title={`Findings (${findings.length})`}
      >
        <FindingsSeverityFilter findings={findings} value={severityFilter} onChange={setSeverityFilter} />
        <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
          Severity reflects how blocking an issue is. Priority points on each card reflect fix order from
          frequency, impact, and how quick the fix is, which is separate from the severity filter above.
        </p>
        {severityFilter !== "all" && (
          <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
            Showing {filteredFindings.length} of {findings.length}{" "}
            <span className="capitalize">{severityFilter}</span> severity finding
            {filteredFindings.length === 1 ? "" : "s"}
          </p>
        )}
        {filteredFindings.length > 0 ? (
          <>
            <div className="space-y-3">
              {visibleFindings.map((finding, index) => (
                <div
                  key={finding.finding_id}
                  ref={index === FINDINGS_INITIAL_VISIBLE ? firstRevealedFindingRef : undefined}
                  className={cn(
                    index >= FINDINGS_INITIAL_VISIBLE &&
                      findingsExpanded &&
                      "motion-safe:animate-[report-panel-in_0.35s_ease-out_both]",
                  )}
                  style={
                    index >= FINDINGS_INITIAL_VISIBLE && findingsExpanded
                      ? { animationDelay: `${(index - FINDINGS_INITIAL_VISIBLE) * 40}ms` }
                      : undefined
                  }
                >
                  <HeuristicFindingCard
                    finding={finding}
                    priorityRank={priorityRankById.get(finding.finding_id) ?? 0}
                    totalFindings={findings.length}
                  />
                </div>
              ))}
            </div>
            {hiddenFindingsCount > 0 ? (
              <button
                type="button"
                onClick={() => setFindingsExpanded(true)}
                className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-body-sm font-medium text-[var(--color-accent)] motion-safe:transition-colors motion-safe:duration-200 hover:bg-[var(--color-bg-muted)]"
              >
                Show {hiddenFindingsCount} more finding{hiddenFindingsCount === 1 ? "" : "s"}
              </button>
            ) : findingsExpanded && filteredFindings.length > FINDINGS_INITIAL_VISIBLE ? (
              <button
                type="button"
                onClick={() => setFindingsExpanded(false)}
                className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-body-sm font-medium text-[var(--color-text-muted)] motion-safe:transition-colors motion-safe:duration-200 hover:bg-[var(--color-bg-muted)]"
              >
                Show fewer findings
              </button>
            ) : null}
          </>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-8 text-center">
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              No <span className="capitalize">{severityFilter}</span> severity findings in this evaluation.
            </p>
            <button
              type="button"
              onClick={() => setSeverityFilter("all")}
              className="mt-3 text-body-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Show all findings
            </button>
          </div>
        )}
      </ReportSection>

      <ReportSection title="Action plan">
        <div className="space-y-3">
          <CollapsiblePanel
            label="Priorities"
            headline="What to fix and in what order"
            teaser={`${fixNowCount} to fix now · ${actionPlan.length} actions in total`}
          >
            <div className="space-y-3">
              {actionPlan.map((item) => (
                <div
                  key={item.action}
                  className={`flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-start sm:gap-4 ${ACTION_PRIORITY_STYLES[item.priority]}`}
                >
                  <span className="w-max shrink-0 rounded-full bg-white border border-current/20 px-2.5 py-0.5 text-[0.75rem] font-semibold">
                    {ACTION_PRIORITY_LABELS[item.priority]}
                  </span>
                  <p className="text-body-sm">{item.action}</p>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          {quickWins.length > 0 && (
            <CollapsiblePanel
              label="Quick wins"
              headline="High payoff for low effort"
              teaser={`${quickWins.length} fast ${quickWins.length === 1 ? "fix" : "fixes"} · frequent, high-impact issues that ship quickly`}
            >
              <div className="space-y-3">
                {quickWins.map((finding) => (
                  <div
                    key={finding.finding_id}
                    className="rounded-xl border border-[var(--color-border)] bg-white p-4"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <HeuristicPill heuristic={finding.primary_heuristic} />
                      <span className="w-max rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--color-text-secondary)]">
                        {EFFORT_LABELS[finding.priority.effort]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-body-sm font-medium text-[var(--color-text-primary)]">
                      {finding.title}
                    </p>
                    <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">
                      {finding.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </CollapsiblePanel>
          )}
        </div>
      </ReportSection>

      {redesignMock && (
        <ReportSection id="proposed-redesign" title="Proposed redesign">
          <CollapsiblePanel
            label="Interactive mock"
            headline={redesignMock.headline}
            teaser={redesignMock.teaser}
          >
            <FullscreenPagePreview
              title="Proposed redesign"
              returnAnchorId="proposed-redesign"
              callouts={evaluation.redesignSummary?.callouts}
              accentColor={evaluation.accent}
            >
              <redesignMock.Component />
            </FullscreenPagePreview>
            {evaluation.redesignSummary && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-body-sm font-semibold">Top changes in the mock</h3>
                  <ul className="mt-2 space-y-1.5">
                    {evaluation.redesignSummary.implemented
                      .slice(0, evaluation.redesignSummary.planned.length)
                      .map((item) => (
                        <li key={item} className="flex gap-2 text-body-sm text-[var(--color-text-secondary)]">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-body-sm font-semibold">Still to do</h3>
                  <ul className="mt-2 space-y-1.5">
                    {evaluation.redesignSummary.planned.map((item) => (
                      <li key={item} className="flex gap-2 text-body-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CollapsiblePanel>
        </ReportSection>
      )}

      {evaluation.redesignSummary && !redesignMock ? (
        <ReportSection id="redesign-summary" title="Redesign summary">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
            {evaluation.redesignSummary.intro && (
              <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
                {evaluation.redesignSummary.intro}
              </p>
            )}
            <div className={cn("grid gap-6 sm:grid-cols-2", evaluation.redesignSummary.intro && "mt-6")}>
              <div>
                <h3 className="text-body-sm font-semibold text-[var(--color-text-primary)]">
                  Key changes in the mock
                </h3>
                <ul className="mt-3 space-y-2">
                  {evaluation.redesignSummary.implemented.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-[var(--color-text-primary)]">
                  Still to validate or build
                </h3>
                <ul className="mt-3 space-y-2">
                  {evaluation.redesignSummary.planned.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ReportSection>
      ) : null}
    </div>
  );
}
