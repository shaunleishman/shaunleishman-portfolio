"use client";

import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCaseStudyAccent } from "@/components/projects/CaseStudyAccentProvider";
import type {
  CaseStudyTimelinePhase,
  CaseStudyTimelineTask,
} from "@/content/case-study-timeline";

export type { CaseStudyTimelinePhase, CaseStudyTimelineTask } from "@/content/case-study-timeline";

type CaseStudyProjectTimelineProps = {
  totalWeeks: number;
  phases: readonly CaseStudyTimelinePhase[];
  className?: string;
};

function computeTimelineScale(
  phases: readonly CaseStudyTimelinePhase[],
  configuredTotalWeeks: number,
) {
  const maxEndWeek = Math.max(
    ...phases.flatMap((phase) => phase.tasks.map((task) => task.endWeek)),
    1,
  );
  const scaleWeeks = Math.min(configuredTotalWeeks, maxEndWeek);
  const weekCount = Math.max(1, Math.ceil(scaleWeeks));

  return { scaleWeeks, weekCount };
}

function barStyle(startWeek: number, endWeek: number, scaleWeeks: number) {
  const left = ((startWeek - 1) / scaleWeeks) * 100;
  let width = ((endWeek - startWeek) / scaleWeeks) * 100;

  // Integer-scale projects: tasks ending on the final week reach the timeline edge.
  if (Number.isInteger(scaleWeeks) && endWeek >= scaleWeeks - 0.001) {
    width = 100 - left;
  }

  return {
    left: `${left}%`,
    width: `${Math.max(width, 100 / scaleWeeks / 4)}%`,
  };
}

function phaseRange(tasks: readonly CaseStudyTimelineTask[]) {
  return {
    startWeek: Math.min(...tasks.map((task) => task.startWeek)),
    endWeek: Math.max(...tasks.map((task) => task.endWeek)),
    involved: tasks.some((task) => task.involved),
  };
}

type TooltipContent =
  | { kind: "task"; label: string; involved: boolean; detail?: string }
  | {
      kind: "phase";
      label: string;
      tasks: readonly { label: string; involved: boolean }[];
    };

function InvolvementDot({ involved, accent }: { involved: boolean; accent: string }) {
  return (
    <span
      className="mt-[3px] size-2.5 shrink-0 rounded-sm"
      style={{ backgroundColor: involved ? accent : "#d4d4d4" }}
      aria-hidden
    />
  );
}

function TimelineTooltip({ content, accent }: { content: TooltipContent; accent: string }) {
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 w-max min-w-[9rem] max-w-[16rem] -translate-x-1/2 text-left",
        "rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-lg",
        "opacity-0 translate-y-1 motion-safe:transition-[opacity,transform] motion-safe:duration-150 motion-safe:ease-out",
        "group-hover/timeline:opacity-100 group-hover/timeline:translate-y-0",
      )}
    >
      {content.kind === "task" ? (
        <span className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2">
            <InvolvementDot involved={content.involved} accent={accent} />
            <span className="text-body-sm font-semibold leading-snug text-[var(--color-text-primary)]">
              {content.label}
            </span>
          </span>
          <span className="text-[0.75rem] leading-snug text-[var(--color-text-secondary)]">
            {content.detail ??
              (content.involved ? "My involvement on this task." : "Run by the wider team, not my role.")}
          </span>
        </span>
      ) : (
        <span className="flex flex-col gap-2">
          <span className="text-body-sm font-semibold leading-snug text-[var(--color-text-primary)]">
            {content.label}
          </span>
          <span className="flex flex-col gap-1.5">
            {content.tasks.map((task) => (
              <span key={task.label} className="flex items-start gap-2">
                <InvolvementDot involved={task.involved} accent={accent} />
                <span className="text-[0.75rem] leading-snug text-[var(--color-text-secondary)]">
                  {task.label}
                </span>
              </span>
            ))}
          </span>
        </span>
      )}
      <span
        className="absolute left-1/2 top-full size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border-b border-r border-[var(--color-border)] bg-white"
        aria-hidden
      />
    </span>
  );
}

function TimelineTrackShell({
  weekCount,
  size = "md",
  label,
  children,
}: {
  weekCount: number;
  size?: "md" | "sm";
  label: string;
  children: ReactNode;
}) {
  const weekColumns = `repeat(${weekCount}, minmax(0, 1fr))`;

  return (
    <div
      className={cn(
        "relative w-full rounded-lg bg-neutral-100",
        size === "md" ? "h-9" : "h-7",
      )}
      role="img"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: weekColumns }}
        aria-hidden
      >
        {Array.from({ length: weekCount }, (_, index) => (
          <div
            key={index}
            className="border-l border-[var(--color-border)]/50 first:border-l-0"
          />
        ))}
      </div>
      {children}
    </div>
  );
}

function TimelineBarVisual({
  startWeek,
  endWeek,
  scaleWeeks,
  involved,
  accent,
  size = "md",
}: {
  startWeek: number;
  endWeek: number;
  scaleWeeks: number;
  involved: boolean;
  accent: string;
  size?: "md" | "sm";
}) {
  const style = barStyle(startWeek, endWeek, scaleWeeks);

  return (
    <span
      className={cn(
        "absolute rounded-md",
        size === "md" ? "top-1.5 bottom-1.5" : "top-1 bottom-1",
        involved ? "opacity-100" : "bg-neutral-300",
      )}
      style={{
        ...style,
        ...(involved ? { backgroundColor: accent } : {}),
      }}
      aria-hidden
    />
  );
}

function TimelineInteractiveBar({
  label,
  detail,
  startWeek,
  endWeek,
  scaleWeeks,
  involved,
  accent,
  size = "md",
}: {
  label: string;
  detail?: string;
  startWeek: number;
  endWeek: number;
  scaleWeeks: number;
  involved: boolean;
  accent: string;
  size?: "md" | "sm";
}) {
  const style = barStyle(startWeek, endWeek, scaleWeeks);

  return (
    <span
      className={cn(
        "group/timeline absolute cursor-help rounded-md motion-safe:transition-opacity hover:opacity-90",
        size === "md" ? "top-1.5 bottom-1.5" : "top-1 bottom-1",
        involved ? "opacity-100" : "bg-neutral-300",
      )}
      style={{
        ...style,
        ...(involved ? { backgroundColor: accent } : {}),
      }}
    >
      <TimelineTooltip content={{ kind: "task", label, involved, detail }} accent={accent} />
    </span>
  );
}

function TimelinePhaseOverviewTrack({
  phase,
  scaleWeeks,
  weekCount,
  accent,
  label,
}: {
  phase: CaseStudyTimelinePhase;
  scaleWeeks: number;
  weekCount: number;
  accent: string;
  label: string;
}) {
  const range = phaseRange(phase.tasks);
  const style = barStyle(range.startWeek, range.endWeek, scaleWeeks);

  return (
    <TimelineTrackShell weekCount={weekCount} size="md" label={label}>
      {phase.tasks.map((task) => (
        <TimelineBarVisual
          key={task.label}
          startWeek={task.startWeek}
          endWeek={task.endWeek}
          scaleWeeks={scaleWeeks}
          involved={task.involved}
          accent={accent}
          size="md"
        />
      ))}
      <span
        className={cn(
          "group/timeline absolute top-1.5 bottom-1.5 z-10 cursor-help rounded-md bg-transparent",
        )}
        style={style}
      >
        <TimelineTooltip
          content={{
            kind: "phase",
            label: phase.label,
            tasks: phase.tasks.map((task) => ({ label: task.label, involved: task.involved })),
          }}
          accent={accent}
        />
      </span>
    </TimelineTrackShell>
  );
}

function TimelineTaskTrack({
  task,
  scaleWeeks,
  weekCount,
  accent,
  label,
}: {
  task: CaseStudyTimelineTask;
  scaleWeeks: number;
  weekCount: number;
  accent: string;
  label: string;
}) {
  return (
    <TimelineTrackShell weekCount={weekCount} size="sm" label={label}>
      <TimelineInteractiveBar
        label={task.label}
        detail={task.detail}
        startWeek={task.startWeek}
        endWeek={task.endWeek}
        scaleWeeks={scaleWeeks}
        involved={task.involved}
        accent={accent}
        size="sm"
      />
    </TimelineTrackShell>
  );
}

function WeekHeader({ weekCount }: { weekCount: number }) {
  const weekColumns = `repeat(${weekCount}, minmax(0, 1fr))`;

  return (
    <div
      className="grid border-b border-[var(--color-border)] pb-2"
      style={{ gridTemplateColumns: weekColumns }}
    >
      {Array.from({ length: weekCount }, (_, index) => (
        <div key={index} className="text-center text-label text-[var(--color-text-muted)]">
          Wk {index + 1}
        </div>
      ))}
    </div>
  );
}

function TimelinePhase({
  phase,
  scaleWeeks,
  weekCount,
  accent,
}: {
  phase: CaseStudyTimelinePhase;
  scaleWeeks: number;
  weekCount: number;
  accent: string;
}) {
  const panelId = useId();
  const range = phaseRange(phase.tasks);
  const hasMixedInvolvement =
    phase.tasks.some((task) => task.involved) && phase.tasks.some((task) => !task.involved);
  const phaseLabel = hasMixedInvolvement
    ? `${phase.label}, weeks ${range.startWeek} to ${range.endWeek}, with and without my involvement`
    : `${phase.label}, weeks ${range.startWeek} to ${range.endWeek}, ${range.involved ? "my involvement" : "without my involvement"}`;

  return (
    <details className="group border-t border-[var(--color-border)] first:border-t-0">
      <summary className="grid cursor-pointer list-none grid-cols-1 items-center gap-3 px-4 py-4 motion-safe:transition-colors hover:bg-neutral-50/80 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6 md:px-5 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-body-sm font-semibold text-[var(--color-text-primary)]">
          <ChevronDown
            className="size-4 shrink-0 text-[var(--color-text-muted)] motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
            aria-hidden
          />
          {phase.label}
        </span>
        <TimelinePhaseOverviewTrack
          phase={phase}
          scaleWeeks={scaleWeeks}
          weekCount={weekCount}
          accent={accent}
          label={phaseLabel}
        />
      </summary>

      <div
        id={panelId}
        className="border-t border-[var(--color-border)] bg-neutral-50/50 px-4 pb-4 pt-3 md:px-5"
      >
        <ul className="m-0 list-none space-y-2 p-0 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-6 md:space-y-2">
          {phase.tasks.map((task) => (
            <li
              key={task.label}
              className="grid grid-cols-1 items-center gap-2 md:col-span-2 md:grid md:grid-cols-subgrid"
            >
              <p className="text-pretty text-body-sm leading-snug text-[var(--color-text-secondary)] md:pl-6">
                {task.label}
              </p>
              <TimelineTaskTrack
                task={task}
                scaleWeeks={scaleWeeks}
                weekCount={weekCount}
                accent={accent}
                label={`${task.label}, weeks ${task.startWeek} to ${task.endWeek}, ${task.involved ? "my involvement" : "without my involvement"}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export function CaseStudyProjectTimeline({
  totalWeeks,
  phases,
  className,
}: CaseStudyProjectTimelineProps) {
  const accent = useCaseStudyAccent();
  const { scaleWeeks, weekCount } = computeTimelineScale(phases, totalWeeks);

  return (
    <div className={cn("not-prose", className)}>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-[var(--color-text-secondary)]">
        <span className="inline-flex items-center gap-2">
          <span
            className="size-3 shrink-0 rounded-sm"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          My involvement
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 shrink-0 rounded-sm bg-neutral-300" aria-hidden />
          Without my involvement
        </span>
      </div>

      <div className="-mx-1 overflow-x-auto px-1">
        <div className="min-w-[36rem] rounded-xl border border-[var(--color-border)] bg-white">
          <div className="px-4 pt-4 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6 md:px-5">
            <div className="hidden md:block" aria-hidden />
            <WeekHeader weekCount={weekCount} />
          </div>

          {phases.map((phase) => (
            <TimelinePhase
              key={phase.label}
              phase={phase}
              scaleWeeks={scaleWeeks}
              weekCount={weekCount}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
