"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NHS_AGE_GROUPS,
  NHS_QUANT_COLORS,
  nhs999OutcomeBlocks,
  nhs999OutcomeSeries,
  nhsPriorResourceUse,
  nhsQuantitativeViews,
  nhsSurveyRespondents,
  type NhsAgeGroup,
  type OutcomeTimeBlock,
} from "@/content/nhs-quantitative";

const MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOTION_MS = 650;

type NhsQuantitativeInteractiveProps = {
  className?: string;
};

function motionStyle(property: string) {
  return {
    transitionProperty: property,
    transitionDuration: `${MOTION_MS}ms`,
    transitionTimingFunction: MOTION_EASE,
  } as const;
}

function AgePills({
  baseId,
  activeAge,
  onSelect,
}: {
  baseId: string;
  activeAge: NhsAgeGroup;
  onSelect: (age: NhsAgeGroup) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Age group"
      className="flex flex-wrap gap-1.5"
    >
      {NHS_AGE_GROUPS.map((age) => {
        const isActive = age === activeAge;
        return (
          <button
            key={age}
            type="button"
            role="tab"
            id={`${baseId}-age-${age}`}
            aria-selected={isActive}
            onClick={() => onSelect(age)}
            className={cn(
              "rounded-full px-3 py-1.5 text-body-sm font-medium min-h-[36px] motion-safe:transition-all motion-safe:duration-300",
              isActive
                ? "bg-[#005eb8] text-white shadow-sm"
                : "bg-white/80 text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[#005eb8]/40 hover:text-[#005eb8]",
            )}
          >
            {age}
          </button>
        );
      })}
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-body-sm">
        <span className="text-[var(--color-text-secondary)]">{label}</span>
        <span className="shrink-0 font-medium tabular-nums text-[var(--color-text-primary)]">
          {value % 1 === 0 ? value : value.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[#dbeafe]">
        <div
          className="absolute inset-y-0 left-0 rounded-full motion-safe:transition-[width] motion-safe:duration-[650ms] motion-safe:ease-in-out"
          style={{ width: `${width}%`, backgroundColor: color, ...motionStyle("width") }}
        />
      </div>
    </div>
  );
}

function InsightBox({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div
      className="mt-4 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-body-sm text-[var(--color-text-secondary)]"
      style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
    >
      {text}
    </div>
  );
}

function SurveyRespondentsPanel({ baseId }: { baseId: string }) {
  const [activeAge, setActiveAge] = useState<NhsAgeGroup>("25-39");
  const row = nhsSurveyRespondents.find((item) => item.ageGroup === activeAge)!;
  const max = 45;

  return (
    <div>
      <AgePills baseId={`${baseId}-survey`} activeAge={activeAge} onSelect={setActiveAge} />
      <div className="mt-5 space-y-4" role="tabpanel" aria-labelledby={`${baseId}-age-${activeAge}`}>
        <MetricBar
          label="Survey respondents"
          value={row.surveyRespondents}
          max={max}
          color={NHS_QUANT_COLORS.teal}
        />
        <MetricBar
          label="On behalf of a child"
          value={row.onBehalfOfChild}
          max={max}
          color={NHS_QUANT_COLORS.coral}
        />
        {row.insight && <InsightBox text={row.insight} accentColor={NHS_QUANT_COLORS.teal} />}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-body-sm text-[var(--color-text-muted)]">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.teal }} />
          Survey respondents
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.coral }} />
          On behalf of a child
        </span>
      </div>
    </div>
  );
}

function PriorResourcesPanel({ baseId }: { baseId: string }) {
  const [activeAge, setActiveAge] = useState<NhsAgeGroup>("25-39");
  const row = nhsPriorResourceUse.find((item) => item.ageGroup === activeAge)!;
  const max = 45;

  return (
    <div>
      <AgePills baseId={`${baseId}-resources`} activeAge={activeAge} onSelect={setActiveAge} />
      <div className="mt-5 space-y-4" role="tabpanel">
        <MetricBar
          label="Survey respondents"
          value={row.surveyRespondents}
          max={max}
          color={NHS_QUANT_COLORS.teal}
        />
        <MetricBar
          label="Used NHS Inform before calling"
          value={row.usedNhsInform}
          max={max}
          color={NHS_QUANT_COLORS.purple}
        />
        <MetricBar
          label="Went to GP / pharmacy before calling"
          value={row.wentToGpPharmacy}
          max={max}
          color={NHS_QUANT_COLORS.orange}
        />
        {row.insight && <InsightBox text={row.insight} accentColor={NHS_QUANT_COLORS.purple} />}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-body-sm text-[var(--color-text-muted)]">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.teal }} />
          Survey respondents
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.purple }} />
          NHS Inform
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.orange }} />
          GP / pharmacy
        </span>
      </div>
    </div>
  );
}

function OutcomeLineChart({
  activeBlockId,
  showDidNotTry,
  showTried,
}: {
  activeBlockId: string;
  showDidNotTry: boolean;
  showTried: boolean;
}) {
  const yMax = 24;
  const width = 400;
  const height = 120;
  const padX = 16;
  const padY = 12;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const toPoint = (index: number, value: number) => {
    const x = padX + (index / (nhs999OutcomeSeries.didNotTry.length - 1)) * chartW;
    const y = padY + chartH - (value / yMax) * chartH;
    return { x, y };
  };

  const linePath = (values: readonly number[]) =>
    values.map((value, index) => {
      const { x, y } = toPoint(index, value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");

  const activeIndex = nhs999OutcomeBlocks.findIndex((block) => block.id === activeBlockId);
  const highlightStart = padX + (activeIndex / nhs999OutcomeBlocks.length) * chartW;
  const highlightWidth = chartW / nhs999OutcomeBlocks.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Line chart of 999 referral rates through the day"
    >
      <line
        x1={padX}
        y1={toPoint(0, 21).y}
        x2={width - padX}
        y2={toPoint(0, 21).y}
        stroke={NHS_QUANT_COLORS.reference}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text x={width - padX} y={toPoint(0, 21).y - 4} textAnchor="end" className="fill-[var(--color-text-muted)] text-[8px]">
        21%
      </text>

      <rect
        x={highlightStart}
        y={padY}
        width={highlightWidth}
        height={chartH}
        fill="#005eb8"
        opacity={0.06}
        className="motion-safe:transition-[x,width] motion-safe:duration-[650ms] motion-safe:ease-in-out"
      />

      {nhs999OutcomeBlocks.slice(0, -1).map((_, index) => {
        const x = padX + ((index + 1) / nhs999OutcomeBlocks.length) * chartW;
        return (
          <line
            key={index}
            x1={x}
            y1={padY}
            x2={x}
            y2={padY + chartH}
            stroke="#cbd5e1"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        );
      })}

      {showDidNotTry && (
        <>
          <path
            d={linePath(nhs999OutcomeSeries.didNotTry)}
            fill="none"
            stroke={NHS_QUANT_COLORS.coral}
            strokeWidth={2.5}
            strokeLinejoin="round"
            className="motion-safe:transition-opacity motion-safe:duration-300"
          />
          {nhs999OutcomeSeries.didNotTry.map((value, index) => {
            const { x, y } = toPoint(index, value);
            return <circle key={index} cx={x} cy={y} r={3.5} fill={NHS_QUANT_COLORS.coral} />;
          })}
        </>
      )}

      {showTried && (
        <>
          <path
            d={linePath(nhs999OutcomeSeries.tried)}
            fill="none"
            stroke={NHS_QUANT_COLORS.teal}
            strokeWidth={2.5}
            strokeLinejoin="round"
            className="motion-safe:transition-opacity motion-safe:duration-300"
          />
          {nhs999OutcomeSeries.tried.map((value, index) => {
            const { x, y } = toPoint(index, value);
            return <circle key={index} cx={x} cy={y} r={3.5} fill={NHS_QUANT_COLORS.teal} />;
          })}
        </>
      )}
    </svg>
  );
}

function Outcome999Panel({ baseId }: { baseId: string }) {
  const [activeBlockId, setActiveBlockId] = useState(nhs999OutcomeBlocks[0].id);
  const [showDidNotTry, setShowDidNotTry] = useState(true);
  const [showTried, setShowTried] = useState(true);

  const activeBlock = nhs999OutcomeBlocks.find((block) => block.id === activeBlockId) as OutcomeTimeBlock;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowDidNotTry((value) => !value)}
          aria-pressed={showDidNotTry}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 text-body-sm motion-safe:transition-all motion-safe:duration-300",
            showDidNotTry
              ? "border-[#d4553a]/40 bg-[#d4553a]/10 text-[var(--color-text-primary)]"
              : "border-[var(--color-border)] bg-white/70 text-[var(--color-text-muted)] opacity-60",
          )}
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.coral }} />
          Didn&apos;t try other resources
        </button>
        <button
          type="button"
          onClick={() => setShowTried((value) => !value)}
          aria-pressed={showTried}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 text-body-sm motion-safe:transition-all motion-safe:duration-300",
            showTried
              ? "border-[#26a69a]/40 bg-[#26a69a]/10 text-[var(--color-text-primary)]"
              : "border-[var(--color-border)] bg-white/70 text-[var(--color-text-muted)] opacity-60",
          )}
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: NHS_QUANT_COLORS.teal }} />
          Tried other resources first
        </button>
      </div>

      <OutcomeLineChart
        activeBlockId={activeBlockId}
        showDidNotTry={showDidNotTry}
        showTried={showTried}
      />

      <div
        role="tablist"
        aria-label="Time of call"
        className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
      >
        {nhs999OutcomeBlocks.map((block) => {
          const isActive = block.id === activeBlockId;
          return (
            <button
              key={block.id}
              type="button"
              role="tab"
              id={`${baseId}-time-${block.id}`}
              aria-selected={isActive}
              onClick={() => setActiveBlockId(block.id)}
              className={cn(
                "rounded-lg px-2 py-2 text-center text-[0.7rem] leading-tight font-medium min-h-[44px] motion-safe:transition-all motion-safe:duration-300 sm:text-body-sm",
                isActive
                  ? "bg-[#005eb8] text-white shadow-sm"
                  : "bg-white/80 text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[#005eb8]/40 hover:text-[#005eb8]",
              )}
            >
              {block.shortLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
        {showDidNotTry && (
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-1">Didn&apos;t try other resources</p>
            <p
              className="text-h3 font-semibold tabular-nums motion-safe:transition-opacity motion-safe:duration-[650ms]"
              style={{ color: NHS_QUANT_COLORS.coral }}
            >
              {activeBlock.didNotTryResources}%
            </p>
            <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">{activeBlock.label}</p>
          </div>
        )}
        {showTried && (
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-1">Tried other resources first</p>
            <p
              className="text-h3 font-semibold tabular-nums motion-safe:transition-opacity motion-safe:duration-[650ms]"
              style={{ color: NHS_QUANT_COLORS.teal }}
            >
              {activeBlock.triedResources}%
            </p>
            <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">{activeBlock.label}</p>
          </div>
        )}
      </div>

      {activeBlock.insight && (
        <InsightBox
          text={activeBlock.insight.text}
          accentColor={
            activeBlock.insight.series === "did-not-try"
              ? NHS_QUANT_COLORS.coral
              : NHS_QUANT_COLORS.teal
          }
        />
      )}
    </div>
  );
}

export function NhsQuantitativeInteractive({ className }: NhsQuantitativeInteractiveProps) {
  const baseId = useId();
  const [activeViewId, setActiveViewId] = useState(nhsQuantitativeViews[0]?.id ?? "survey-respondents");

  const activeView = nhsQuantitativeViews.find((view) => view.id === activeViewId) ?? nhsQuantitativeViews[0];

  const handleSelect = useCallback((id: string) => {
    setActiveViewId(id);
  }, []);

  const panel = useMemo(() => {
    switch (activeView.id) {
      case "prior-resources":
        return <PriorResourcesPanel baseId={baseId} />;
      case "999-outcomes":
        return <Outcome999Panel baseId={baseId} />;
      default:
        return <SurveyRespondentsPanel baseId={baseId} />;
    }
  }, [activeView.id, baseId]);

  return (
    <div className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#f5f8fa] shadow-sm">
        <div className="border-b border-[#005eb8]/15 bg-[#eef4f9] px-4 py-5 md:px-6">
          <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
            Survey data captured April 2023 — select a chart to explore patterns by age group or time of call.
          </p>

          <div
            role="tablist"
            aria-label="Quantitative survey charts"
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {nhsQuantitativeViews.map((view) => {
              const isActive = view.id === activeViewId;
              const tabId = `${baseId}-view-${view.id}`;

              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-quant-panel`}
                  onClick={() => handleSelect(view.id)}
                  className={cn(
                    "relative px-4 py-2.5 text-body-sm font-medium min-h-[44px] motion-safe:transition-all motion-safe:duration-300",
                    isActive
                      ? [
                          "rounded-full bg-[#005eb8] text-white shadow-sm",
                          "sm:rounded-b-none sm:rounded-t-xl sm:bg-[#f5f8fa] sm:text-[#005eb8] sm:shadow-[0_-1px_0_0_rgba(0,94,184,0.08)]",
                          "sm:z-10 sm:-mb-px sm:border sm:border-[var(--color-border)] sm:border-b-[#f5f8fa]",
                          "sm:after:absolute sm:after:inset-x-3 sm:after:bottom-0 sm:after:h-0.5 sm:after:rounded-full sm:after:bg-[#005eb8]",
                        ]
                      : [
                          "rounded-full border border-transparent bg-white/70 text-[var(--color-text-secondary)]",
                          "hover:border-[#005eb8]/25 hover:bg-white hover:text-[#005eb8]",
                          "sm:rounded-xl",
                        ],
                  )}
                >
                  {view.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-quant-panel`}
          aria-labelledby={`${baseId}-view-${activeView.id}`}
          className="p-5 md:p-6"
        >
          <div className="mb-5">
            <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">{activeView.title}</h3>
            <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">{activeView.description}</p>
          </div>

          <div className="motion-safe:animate-[fade-in_0.25s_ease-out]" key={activeView.id}>
            {panel}
          </div>
        </div>
      </div>

      <p className="mt-3 text-body-sm text-[var(--color-text-muted)]">
        Toggle series, age groups, or time blocks to compare survey patterns from the NHS 111 follow-up study.
      </p>
    </div>
  );
}
