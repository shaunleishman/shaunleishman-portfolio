"use client";

import { useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getNhsJourneyMap, type NhsJourneyStage } from "@/content/nhs-journey-maps";

/** Must match `STAGE_COLUMN_CLASS` (9.5rem @ 16px root). */
const COLUMN_WIDTH = 152;
const STAGE_COLUMN_CLASS = "w-[9.5rem]";
const EMOTION_CHART_HEIGHT = 44;
const EMOTION_EMOJI_HEIGHT = 28;

type NhsPersonaJourneyMapProps = {
  personaId: string;
  personaName: string;
  className?: string;
};

function emotionEmoji(value: number) {
  if (value >= 70) return "🙂";
  if (value >= 50) return "😐";
  if (value >= 35) return "😟";
  return "😢";
}

function EmotionTrack({
  stages,
  activeIndex,
  onSelect,
}: {
  stages: NhsJourneyStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const totalWidth = stages.length * COLUMN_WIDTH;
  const padX = COLUMN_WIDTH / 2;
  const baselineY = EMOTION_CHART_HEIGHT - 10;
  const plotTop = 8;
  const plotHeight = baselineY - plotTop;

  const points = stages.map((stage, index) => {
    const x = padX + index * COLUMN_WIDTH;
    const y = plotTop + (1 - stage.emotion / 100) * plotHeight;
    return { x, y };
  });

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="border-t border-[var(--color-border)] bg-white/70">
      <p className="px-3 pt-3 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
        Emotion
      </p>

      <svg
        width={totalWidth}
        height={EMOTION_CHART_HEIGHT}
        viewBox={`0 0 ${totalWidth} ${EMOTION_CHART_HEIGHT}`}
        className="block shrink-0"
        role="img"
        aria-label="Emotional journey through the call"
      >
        <line x1={0} y1={baselineY} x2={totalWidth} y2={baselineY} stroke="#e2e8f0" strokeWidth={1} />
        <path
          d={path}
          fill="none"
          stroke="var(--case-study-accent)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={activeIndex === index ? 4 : 3}
            fill={activeIndex === index ? "var(--case-study-accent)" : "white"}
            stroke="var(--case-study-accent)"
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="flex shrink-0" style={{ width: totalWidth }}>
        {stages.map((stage, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Stage ${index + 1}: ${stage.label}`}
            aria-pressed={activeIndex === index}
            onClick={() => onSelect(index)}
            className={cn(
              STAGE_COLUMN_CLASS,
              "flex shrink-0 items-center justify-center py-1 motion-safe:transition-opacity motion-safe:duration-200",
              activeIndex === index ? "opacity-100" : "opacity-80 hover:opacity-100",
            )}
            style={{ height: EMOTION_EMOJI_HEIGHT }}
          >
            <span className="text-base leading-none select-none">{emotionEmoji(stage.emotion)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StageColumn({
  stage,
  index,
  isActive,
  onSelect,
  columnId,
}: {
  stage: NhsJourneyStage;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
  columnId: string;
}) {
  return (
    <button
      type="button"
      id={columnId}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      className={cn(
        STAGE_COLUMN_CLASS,
        "flex shrink-0 flex-col border-r border-[var(--color-border)] px-2.5 py-3 text-left motion-safe:transition-colors motion-safe:duration-200 last:border-r-0",
        index % 2 === 0 ? "bg-white/50" : "bg-[#eef4f9]/40",
        isActive && "bg-[#f5f8fa] ring-1 ring-inset ring-[var(--case-study-accent)]/20",
      )}
    >
      <div className="mb-2 flex items-start gap-1">
        <span
          className={cn(
            "inline-flex min-h-[2.4rem] flex-1 items-center rounded-md border px-1.5 py-1 text-[0.62rem] font-semibold leading-tight",
            isActive
              ? "border-[var(--case-study-accent)]/35 bg-white text-[var(--case-study-accent)]"
              : "border-[var(--case-study-accent)]/15 bg-white/80 text-[var(--color-text-primary)]",
          )}
        >
          {stage.label}
        </span>
      </div>

      {stage.description && (
        <p className="text-[0.65rem] leading-snug text-[var(--color-text-secondary)]">{stage.description}</p>
      )}

      {stage.frustration && (
        <p
          className={cn(
            "mt-2 rounded-md px-2 py-1.5 text-[0.62rem] leading-snug text-[var(--color-text-secondary)]",
            stage.frustrationHighlight ? "bg-[#fce8ea]" : "bg-[#f7f7f7]",
          )}
        >
          {stage.frustration}
        </p>
      )}

      {stage.quote && (
        <p className="mt-2 text-[0.62rem] italic leading-snug text-[var(--case-study-accent)]/90">&ldquo;{stage.quote}&rdquo;</p>
      )}
    </button>
  );
}

export function NhsPersonaJourneyMap({ personaId, personaName, className }: NhsPersonaJourneyMapProps) {
  const baseId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const journey = useMemo(() => getNhsJourneyMap(personaId), [personaId]);

  if (!journey) return null;

  const activeStage = journey.stages[activeIndex] ?? journey.stages[0];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    const node = scrollRef.current;
    if (!node) return;
    const left = index * COLUMN_WIDTH - node.clientWidth / 2 + COLUMN_WIDTH / 2;
    node.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  return (
    <div className={cn("not-prose", className)}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-label uppercase tracking-widest text-[var(--case-study-accent)]">{personaName}</p>
          <p className="mt-0.5 text-body-sm text-[var(--color-text-muted)]">
            End-to-end journey from first hearing about 111 through to after the call.
          </p>
        </div>
        <p className="text-[0.65rem] text-[var(--color-text-muted)]">
          {activeIndex + 1} / {journey.stages.length}, scroll or tap a stage
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#f5f8fa] shadow-sm">
        <div
          ref={scrollRef}
          className="overflow-x-auto overscroll-x-contain"
          aria-label={`${personaName} journey map stages`}
        >
          <div className="min-w-max">
            <div className="flex">
              {journey.stages.map((stage, index) => (
                <StageColumn
                  key={`${personaId}-${index}`}
                  stage={stage}
                  index={index}
                  isActive={index === activeIndex}
                  onSelect={handleSelect}
                  columnId={`${baseId}-stage-${index}`}
                />
              ))}
            </div>

            <EmotionTrack
              stages={journey.stages}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[var(--case-study-accent)]/10 bg-white px-3 py-2.5 md:hidden">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--case-study-accent)]">
          {activeStage.label}
        </p>
        {activeStage.description && (
          <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">{activeStage.description}</p>
        )}
      </div>
    </div>
  );
}
