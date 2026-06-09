"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CHART_ENTER_MS,
  displayPercent,
  lerpByProgress,
  useChartEnterProgress,
} from "@/lib/useChartEnterProgress";
import {
  CHART_ACCENTS,
  ChartInsightCard,
  ChoiceOutlinePill,
  FilterOutlinePill,
} from "@/components/projects/CaseStudyChartControls";
import { FilterChip } from "@/components/ui/FilterChip";
import { NhsTypicalCallerFunnel } from "@/components/projects/NhsTypicalCallerFunnel";
import {
  NHS_AGE_GROUPS,
  NHS_QUANT_COLORS,
  NHS_WEEKDAYS,
  nhs999OutcomeBlocks,
  nhs999OutcomeSeries,
  nhsPriorResourceUse,
  nhsQuantitativeViews,
  nhsSatisfactionLevels,
  nhsSurveyRespondents,
  nhsWeekdayOutcomes,
  type NhsAgeGroup,
  type NhsWeekday,
  type OutcomeTimeBlock,
} from "@/content/nhs-quantitative";

const MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOTION_MS = CHART_ENTER_MS;

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
    <div role="tablist" aria-label="Age group" className="flex flex-wrap gap-1.5">
      {NHS_AGE_GROUPS.map((age) => (
        <ChoiceOutlinePill
          key={age}
          id={`${baseId}-age-${age}`}
          role="tab"
          label={age}
          selected={age === activeAge}
          ariaSelected={age === activeAge}
          onSelect={() => onSelect(age)}
        />
      ))}
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  color,
  progress = 1,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  progress?: number;
}) {
  const width = max > 0 ? Math.min(100, (value / max) * 100 * progress) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-body-sm">
        <span className="text-[var(--color-text-secondary)]">{label}</span>
        <span className="shrink-0 font-medium tabular-nums text-[var(--color-text-primary)]">
          {displayPercent(value, progress)}%
        </span>
      </div>
      <div className="relative h-2.5 rounded-full" style={{ backgroundColor: CHART_ACCENTS.nhs.trackBg }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${width}%`, backgroundColor: color, ...motionStyle("width") }}
        />
      </div>
    </div>
  );
}

function InsightBox({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <ChartInsightCard accentColor={accentColor} className="mt-2">
      {text}
    </ChartInsightCard>
  );
}

function SurveyRespondentsPanel({ baseId, animationKey }: { baseId: string; animationKey: string }) {
  const [activeAge, setActiveAge] = useState<NhsAgeGroup>("25-39");
  const progress = useChartEnterProgress(`${animationKey}-${activeAge}`);
  const row = nhsSurveyRespondents.find((item) => item.ageGroup === activeAge)!;
  const max = 45;

  return (
    <div>
      <AgePills baseId={`${baseId}-survey`} activeAge={activeAge} onSelect={setActiveAge} />
      <div className="mt-3 space-y-3" role="tabpanel" aria-labelledby={`${baseId}-age-${activeAge}`}>
        <MetricBar
          label="Survey respondents"
          value={row.surveyRespondents}
          max={max}
          color={NHS_QUANT_COLORS.teal}
          progress={progress}
        />
        <MetricBar
          label="On behalf of a child"
          value={row.onBehalfOfChild}
          max={max}
          color={NHS_QUANT_COLORS.coral}
          progress={progress}
        />
        {row.insight && <InsightBox text={row.insight} accentColor={NHS_QUANT_COLORS.teal} />}
      </div>
    </div>
  );
}

function PriorResourcesPanel({ baseId, animationKey }: { baseId: string; animationKey: string }) {
  const [activeAge, setActiveAge] = useState<NhsAgeGroup>("25-39");
  const progress = useChartEnterProgress(`${animationKey}-${activeAge}`);
  const row = nhsPriorResourceUse.find((item) => item.ageGroup === activeAge)!;
  const max = 45;

  return (
    <div>
      <AgePills baseId={`${baseId}-resources`} activeAge={activeAge} onSelect={setActiveAge} />
      <div className="mt-3 space-y-3" role="tabpanel">
        <MetricBar
          label="Survey respondents"
          value={row.surveyRespondents}
          max={max}
          color={NHS_QUANT_COLORS.teal}
          progress={progress}
        />
        <MetricBar
          label="Used NHS Inform before calling"
          value={row.usedNhsInform}
          max={max}
          color={NHS_QUANT_COLORS.purple}
          progress={progress}
        />
        <MetricBar
          label="Went to GP / pharmacy before calling"
          value={row.wentToGpPharmacy}
          max={max}
          color={NHS_QUANT_COLORS.orange}
          progress={progress}
        />
        {row.insight && <InsightBox text={row.insight} accentColor={NHS_QUANT_COLORS.purple} />}
      </div>
    </div>
  );
}

function OutcomeLineChart({
  activeBlockId,
  showDidNotTry,
  showTried,
  progress,
}: {
  activeBlockId: string;
  showDidNotTry: boolean;
  showTried: boolean;
  progress: number;
}) {
  const yMax = 24;
  const width = 400;
  const height = 120;
  const padX = 16;
  const padY = 12;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;
  const baselineY = padY + chartH;

  const toPoint = (index: number, value: number) => {
    const x = padX + (index / (nhs999OutcomeSeries.didNotTry.length - 1)) * chartW;
    const animatedValue = lerpByProgress(value, progress);
    const y = baselineY - (animatedValue / yMax) * chartH;
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
        fill="var(--case-study-accent)"
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
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="motion-safe:transition-opacity motion-safe:duration-300"
          />
          {nhs999OutcomeSeries.didNotTry.map((value, index) => {
            const { x, y } = toPoint(index, value);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={2}
                fill="white"
                stroke={NHS_QUANT_COLORS.coral}
                strokeWidth={1}
              />
            );
          })}
        </>
      )}

      {showTried && (
        <>
          <path
            d={linePath(nhs999OutcomeSeries.tried)}
            fill="none"
            stroke={NHS_QUANT_COLORS.teal}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="motion-safe:transition-opacity motion-safe:duration-300"
          />
          {nhs999OutcomeSeries.tried.map((value, index) => {
            const { x, y } = toPoint(index, value);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={2}
                fill="white"
                stroke={NHS_QUANT_COLORS.teal}
                strokeWidth={1}
              />
            );
          })}
        </>
      )}
    </svg>
  );
}

function SatisfactionPanel({ animationKey }: { animationKey: string }) {
  const max = 60;
  const progress = useChartEnterProgress(animationKey);

  return (
    <div>
      <div className="space-y-3">
        {nhsSatisfactionLevels.map((row) => (
          <MetricBar
            key={row.label}
            label={row.label}
            value={row.value}
            max={max}
            color={NHS_QUANT_COLORS.coral}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function WeekdayGroupedBarChart({
  visibleWeekdays,
  progress,
}: {
  visibleWeekdays: Record<NhsWeekday, boolean>;
  progress: number;
}) {
  const yMax = 10;
  const width = 654;
  const height = 132;
  const pad = { top: 6, right: 4, bottom: 28, left: 22 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const visibleDays = NHS_WEEKDAYS.filter((day) => visibleWeekdays[day.id]);
  const groupCount = nhsWeekdayOutcomes.length;
  const groupW = plotW / groupCount;

  const barGeometry = (groupIndex: number, barIndex: number, barCount: number) => {
    const innerPad = 3;
    const usable = groupW - innerPad * 2;
    const gap = barCount > 1 ? 1.5 : 0;
    const barW = barCount > 0 ? (usable - gap * (barCount - 1)) / barCount : 0;
    const x = pad.left + groupIndex * groupW + innerPad + barIndex * (barW + gap);
    return { x, barW };
  };

  const barHeight = (value: number) => lerpByProgress((value / yMax) * plotH, progress);
  const baselineY = pad.top + plotH;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full max-h-[13.5rem]"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Grouped bar chart of call outcomes by weekday"
    >
      {[2.5, 5, 7.5, 10].map((tick) => {
        const y = baselineY - (tick / yMax) * plotH;
        return (
          <g key={tick}>
            <line
              x1={pad.left}
              y1={y}
              x2={width - pad.right}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth={0.5}
              strokeDasharray="2 3"
            />
            <text
              x={pad.left - 4}
              y={y + 2.5}
              textAnchor="end"
              className="fill-[var(--color-text-muted)] text-[6px]"
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {nhsWeekdayOutcomes.map((outcome, groupIndex) => {
        const dividerX = pad.left + groupIndex * groupW;
        return groupIndex > 0 ? (
          <line
            key={`divider-${outcome.id}`}
            x1={dividerX}
            y1={pad.top}
            x2={dividerX}
            y2={baselineY}
            stroke="#e2e8f0"
            strokeWidth={0.5}
          />
        ) : null;
      })}

      {nhsWeekdayOutcomes.map((outcome, groupIndex) =>
        visibleDays.map((day, barIndex) => {
          const value = outcome.byWeekday[day.id];
          const { x, barW } = barGeometry(groupIndex, barIndex, visibleDays.length);
          const h = barHeight(value);
          if (h <= 0) return null;

          return (
            <rect
              key={`${outcome.id}-${day.id}`}
              x={x}
              y={baselineY - h}
              width={barW}
              height={h}
              rx={1}
              fill={day.color}
              className="motion-safe:transition-[height,y] motion-safe:duration-[650ms] motion-safe:ease-in-out"
            />
          );
        }),
      )}

      {nhsWeekdayOutcomes.map((outcome, groupIndex) => {
        const x = pad.left + groupIndex * groupW + groupW / 2;
        return (
          <text
            key={`label-${outcome.id}`}
            x={x}
            y={height - 8}
            textAnchor="middle"
            className="fill-[var(--color-text-secondary)] text-[7px]"
          >
            {outcome.label}
          </text>
        );
      })}
    </svg>
  );
}

function WeekdayOutcomesPanel({ animationKey }: { animationKey: string }) {
  const progress = useChartEnterProgress(animationKey);
  const [visibleWeekdays, setVisibleWeekdays] = useState<Record<NhsWeekday, boolean>>(() =>
    Object.fromEntries(NHS_WEEKDAYS.map((day) => [day.id, true])) as Record<NhsWeekday, boolean>,
  );

  const toggleWeekday = (id: NhsWeekday) => {
    setVisibleWeekdays((current) => {
      const activeCount = Object.values(current).filter(Boolean).length;
      if (current[id] && activeCount <= 1) return current;
      return { ...current, [id]: !current[id] };
    });
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by weekday"
        className="mb-3 flex flex-wrap gap-1.5"
      >
        {NHS_WEEKDAYS.map((day) => (
          <FilterOutlinePill
            key={day.id}
            label={day.shortLabel}
            ariaLabel={day.label}
            color={day.color}
            pressed={visibleWeekdays[day.id]}
            onToggle={() => toggleWeekday(day.id)}
          />
        ))}
      </div>

      <WeekdayGroupedBarChart visibleWeekdays={visibleWeekdays} progress={progress} />

      <p className="mt-1.5 text-body-sm text-[var(--color-text-muted)]">Overall percentage by outcome</p>
    </div>
  );
}

function Outcome999Panel({ baseId, animationKey }: { baseId: string; animationKey: string }) {
  const [activeBlockId, setActiveBlockId] = useState(nhs999OutcomeBlocks[0].id);
  const [showDidNotTry, setShowDidNotTry] = useState(true);
  const [showTried, setShowTried] = useState(true);
  const progress = useChartEnterProgress(`${animationKey}-${activeBlockId}`);

  const activeBlock = nhs999OutcomeBlocks.find((block) => block.id === activeBlockId) as OutcomeTimeBlock;

  return (
    <div>
      <div
        role="group"
        aria-label="Chart series"
        className="mb-3 flex flex-wrap gap-1.5"
      >
        <FilterOutlinePill
          label="Didn't try other resources"
          color={NHS_QUANT_COLORS.coral}
          pressed={showDidNotTry}
          onToggle={() => setShowDidNotTry((value) => !value)}
        />
        <FilterOutlinePill
          label="Tried other resources first"
          color={NHS_QUANT_COLORS.teal}
          pressed={showTried}
          onToggle={() => setShowTried((value) => !value)}
        />
      </div>

      <OutcomeLineChart
        activeBlockId={activeBlockId}
        showDidNotTry={showDidNotTry}
        showTried={showTried}
        progress={progress}
      />

      <div
        role="tablist"
        aria-label="Time of call"
        className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
      >
        {nhs999OutcomeBlocks.map((block) => (
          <ChoiceOutlinePill
            key={block.id}
            id={`${baseId}-time-${block.id}`}
            role="tab"
            label={block.shortLabel}
            selected={block.id === activeBlockId}
            ariaSelected={block.id === activeBlockId}
            onSelect={() => setActiveBlockId(block.id)}
            variant="tile"
          />
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
        {showDidNotTry && (
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-1">Didn&apos;t try other resources</p>
            <p
              className="text-h3 font-semibold tabular-nums"
              style={{ color: NHS_QUANT_COLORS.coral }}
            >
              {displayPercent(activeBlock.didNotTryResources, progress)}%
            </p>
            <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">{activeBlock.label}</p>
          </div>
        )}
        {showTried && (
          <div className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-1">Tried other resources first</p>
            <p
              className="text-h3 font-semibold tabular-nums"
              style={{ color: NHS_QUANT_COLORS.teal }}
            >
              {displayPercent(activeBlock.triedResources, progress)}%
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
        return <PriorResourcesPanel baseId={baseId} animationKey={activeView.id} />;
      case "999-outcomes":
        return <Outcome999Panel baseId={baseId} animationKey={activeView.id} />;
      case "satisfaction":
        return <SatisfactionPanel animationKey={activeView.id} />;
      case "weekday-outcomes":
        return <WeekdayOutcomesPanel animationKey={activeView.id} />;
      case "typical-caller":
        return <NhsTypicalCallerFunnel animationKey={activeView.id} />;
      default:
        return <SurveyRespondentsPanel baseId={baseId} animationKey={activeView.id} />;
    }
  }, [activeView.id, baseId]);

  return (
    <div className={cn("not-prose", className)}>
      <div
        id={`${baseId}-explorer`}
        className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
      >
        <div className="border-b border-[var(--color-border)] px-4 py-2.5 md:px-5">
          <div
            role="tablist"
            aria-label="Quantitative survey charts"
            className="-mx-4 flex gap-1.5 overflow-x-auto overscroll-x-contain px-4 pb-0.5 scrollbar-none md:-mx-5 md:px-5"
          >
            {nhsQuantitativeViews.map((view) => {
              const selected = view.id === activeViewId;

              return (
                <FilterChip
                  key={view.id}
                  id={`${baseId}-view-${view.id}`}
                  label={view.name}
                  selected={selected}
                  onClick={() => handleSelect(view.id)}
                  accentColor="var(--case-study-accent)"
                  aria-pressed={selected}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-quant-panel`}
                  className="min-h-[32px] px-2.5 py-1"
                />
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-quant-panel`}
          aria-labelledby={`${baseId}-view-${activeView.id}`}
          className="p-4 md:p-5"
        >
          <div className="mb-3">
            <h3 className="text-body font-semibold text-[var(--color-text-primary)]">{activeView.title}</h3>
            <p className="mt-0.5 text-body-sm text-[var(--color-text-muted)]">{activeView.description}</p>
          </div>

          <div className="motion-safe:animate-[fade-in_0.25s_ease-out]" key={activeView.id}>
            {panel}
          </div>
        </div>
      </div>
    </div>
  );
}
