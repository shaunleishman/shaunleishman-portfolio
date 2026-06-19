"use client";

import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseStudyJourneyStage = {
  label: string;
  /** What the user is trying to do at this stage */
  action: string;
  /** Design response for this stage */
  response: string;
  /** Pain point or friction we mapped before designing the response */
  problem?: string;
  /** How the built prototype addresses the friction. Optional detail for richer maps. */
  improvement?: string;
};

type CaseStudyJourneyMapProps = {
  stages: readonly CaseStudyJourneyStage[];
  className?: string;
};

/** Stages shown per carousel page — uses horizontal space without one-at-a-time paging. */
const STAGES_PER_PAGE = 3;

function StageCard({
  stage,
  index,
  total,
}: {
  stage: CaseStudyJourneyStage;
  index: number;
  total: number;
}) {
  const hasProblem = Boolean(stage.problem);

  return (
    <article
      className={cn(
        "flex h-full min-w-0 w-full flex-col overflow-hidden rounded-xl border bg-white text-left",
        hasProblem && "border-amber-200/80",
        !hasProblem && "border-[var(--color-border)]",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3",
          hasProblem ? "border-amber-200/80 bg-amber-50/70" : "border-[var(--color-border)] bg-neutral-50",
        )}
      >
        <span
          className={cn(
            "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold tabular-nums",
            hasProblem ? "bg-amber-600 text-white" : "bg-[var(--case-study-accent)] text-white",
          )}
          aria-hidden
        >
          {index + 1}
        </span>
        <span className="min-w-0 flex-1 text-body-sm font-semibold text-[var(--color-text-primary)]">
          {stage.label}
        </span>
        {hasProblem && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-amber-900">
            <AlertCircle className="size-3" strokeWidth={2} aria-hidden />
            Friction
          </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 py-4">
        <div className="flex flex-1 flex-col">
          <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">User</p>
          <p className="text-body-sm leading-relaxed text-[var(--color-text-primary)]">{stage.action}</p>
          {stage.problem && (
            <p className="mt-2.5 flex items-start gap-2 rounded-lg border border-amber-200/80 bg-amber-50/80 px-2.5 py-2 text-[0.8125rem] leading-snug text-amber-950">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-amber-700" strokeWidth={2} aria-hidden />
              <span>{stage.problem}</span>
            </p>
          )}
        </div>

        <div className="mt-4 shrink-0 border-t border-[var(--color-border)] pt-3">
          <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">Design</p>
          <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)]">{stage.response}</p>
        </div>

        {stage.improvement && (
          <div className="mt-4 shrink-0 border-t border-[var(--color-border)] pt-3">
            <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">In prototype</p>
            <p className="flex items-start gap-2 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
              <CheckCircle2
                className="mt-0.5 size-3.5 shrink-0 text-[var(--case-study-accent)]"
                strokeWidth={2}
                aria-hidden
              />
              <span>{stage.improvement}</span>
            </p>
          </div>
        )}
      </div>

      <span className="sr-only">
        Stage {index + 1} of {total}: {stage.label}. User: {stage.action}.
        {stage.problem ? ` Problem: ${stage.problem}.` : ""} Design: {stage.response}
        {stage.improvement ? ` In prototype: ${stage.improvement}` : ""}
      </span>
    </article>
  );
}

const navButtonClass =
  "inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--case-study-accent)]/35 hover:text-[var(--case-study-accent)] motion-safe:transition-colors disabled:cursor-not-allowed disabled:border-[var(--color-border)] disabled:opacity-40 disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)]";

/** Journey map carousel — three stage cards per page with prev/next controls. */
export function CaseStudyJourneyMap({ stages, className }: CaseStudyJourneyMapProps) {
  const [activePage, setActivePage] = useState(0);
  const total = stages.length;
  const totalPages = Math.ceil(total / STAGES_PER_PAGE);
  const pageStart = activePage * STAGES_PER_PAGE;
  const pageEnd = Math.min(pageStart + STAGES_PER_PAGE, total);
  const isAtStart = activePage === 0;
  const isAtEnd = activePage === totalPages - 1;

  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    stages.slice(pageIndex * STAGES_PER_PAGE, (pageIndex + 1) * STAGES_PER_PAGE),
  );

  const goToPage = useCallback(
    (page: number) => {
      setActivePage(Math.max(0, Math.min(page, totalPages - 1)));
    },
    [totalPages],
  );

  const goPrev = useCallback(() => {
    setActivePage((page) => Math.max(0, page - 1));
  }, []);

  const goNext = useCallback(() => {
    setActivePage((page) => Math.min(totalPages - 1, page + 1));
  }, [totalPages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && !isAtStart) goPrev();
      if (event.key === "ArrowRight" && !isAtEnd) goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, isAtStart, isAtEnd]);

  return (
    <div
      className={cn("not-prose", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Journey map stages"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={isAtStart}
          className={navButtonClass}
          aria-label="Previous stages"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            aria-live="polite"
            className="flex items-start motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {pages.map((pageStages, pageIndex) => (
              <div
                key={pageIndex}
                aria-hidden={pageIndex !== activePage}
                className="grid min-h-[22rem] w-full shrink-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
              >
                {pageStages.map((stage, index) => (
                  <StageCard
                    key={stage.label}
                    stage={stage}
                    index={pageIndex * STAGES_PER_PAGE + index}
                    total={total}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={isAtEnd}
          className={navButtonClass}
          aria-label="Next stages"
        >
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              onClick={() => goToPage(pageIndex)}
              className={cn(
                "h-2 rounded-full motion-safe:transition-all motion-safe:duration-300",
                activePage === pageIndex
                  ? "w-6 bg-[var(--case-study-accent)]"
                  : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]",
              )}
              aria-label={`Go to stages ${pageIndex * STAGES_PER_PAGE + 1} to ${Math.min((pageIndex + 1) * STAGES_PER_PAGE, total)}`}
              aria-current={activePage === pageIndex ? "step" : undefined}
            />
          ))}
        </div>
        <p className="text-body-sm text-[var(--color-text-muted)] tabular-nums">
          {pageStart + 1}–{pageEnd} of {total}
        </p>
      </div>
    </div>
  );
}
