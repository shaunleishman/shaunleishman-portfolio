"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { displayPercent, useChartEnterProgress } from "@/lib/useChartEnterProgress";
import {
  nhsTypicalCallerProfile,
  type NhsTypicalCallerLayer,
} from "@/content/nhs-quantitative";

const CHART_SIZE = 192;
const CX = CHART_SIZE / 2;
const CY = CHART_SIZE / 2;
const OUTER_R = 73;
const INNER_R = 46;
const SLICE_GAP = 1.5;
const SLICE_NEUTRAL = "#c8dce8";
const SLICE_ACTIVE = "var(--case-study-accent)";

type NhsTypicalCallerFunnelProps = {
  className?: string;
  animationKey?: string;
};

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeDonutSlice(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
) {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

function CallerPieChart({
  layers,
  activeId,
  hoveredId,
  onHover,
  onSelect,
  baseId,
  progress,
}: {
  layers: NhsTypicalCallerLayer[];
  activeId: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  baseId: string;
  progress: number;
}) {
  const hoveredLayer = hoveredId ? layers.find((layer) => layer.id === hoveredId) : null;
  const total = layers.reduce((sum, layer) => sum + layer.percentage, 0);

  const slices = useMemo(() => {
    let cursor = 0;
    return layers.map((layer, index) => {
      const sweep = (layer.percentage / total) * (360 - layers.length * SLICE_GAP);
      const start = cursor + SLICE_GAP / 2;
      const end = cursor + sweep;
      cursor = end + SLICE_GAP / 2;
      return { layer, index, start, end };
    });
  }, [layers, total]);

  return (
    <svg
      width={CHART_SIZE}
      height={CHART_SIZE}
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      className="mx-auto block h-auto w-full max-w-[12rem]"
      role="img"
      aria-label="Breakdown of typical 111 caller profile by share of respondents"
    >
      {slices.map(({ layer, start, end }) => {
        const isHovered = layer.id === hoveredId;
        const dimmed = Boolean(hoveredId && !isHovered);
        const animatedEnd = start + (end - start) * progress;

        return (
          <path
            key={layer.id}
            d={describeDonutSlice(CX, CY, OUTER_R, INNER_R, start, animatedEnd)}
            fill={isHovered ? SLICE_ACTIVE : SLICE_NEUTRAL}
            className="motion-safe:transition-[fill,opacity] motion-safe:duration-300 motion-safe:ease-out"
            opacity={dimmed ? 0.55 : 1}
            stroke="white"
            strokeWidth={1.25}
            role="button"
            tabIndex={0}
            aria-pressed={layer.id === activeId}
            aria-labelledby={`${baseId}-label-${layer.id}`}
            onMouseEnter={() => onHover(layer.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(layer.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(layer.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(layer.id);
              }
            }}
          />
        );
      })}

      {hoveredLayer && (
        <>
          <text
            x={CX}
            y={CY - 2}
            textAnchor="middle"
            fill={SLICE_ACTIVE}
            fontSize={24}
            fontWeight={600}
          >
            {displayPercent(hoveredLayer.percentage, progress)}%
          </text>
          <text
            x={CX}
            y={CY + 15}
            textAnchor="middle"
            fill="#64748b"
            fontSize={9}
            fontWeight={500}
            letterSpacing="0.04em"
          >
            SHARE
          </text>
        </>
      )}
    </svg>
  );
}

export function NhsTypicalCallerFunnel({ className, animationKey = "typical-caller" }: NhsTypicalCallerFunnelProps) {
  const baseId = useId();
  const progress = useChartEnterProgress(animationKey);
  const { ageGroup, layers } = nhsTypicalCallerProfile;
  const [activeId, setActiveId] = useState(layers[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn("not-prose", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="shrink-0 sm:w-[12.5rem]">
          <p className="mb-3 text-center text-[0.7rem] font-medium uppercase tracking-widest text-[var(--case-study-accent)] sm:text-left">
            Ages {ageGroup}
          </p>
          <CallerPieChart
            layers={layers}
            activeId={activeId}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onSelect={setActiveId}
            baseId={baseId}
            progress={progress}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div role="list" aria-label="Caller profile layers" className="space-y-1">
            {layers.map((layer, index) => {
              const isActive = layer.id === activeId;
              const isHovered = layer.id === hoveredId;

              return (
                <div key={layer.id} role="listitem">
                  <button
                    type="button"
                    id={`${baseId}-label-${layer.id}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => setHoveredId(layer.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(layer.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => setActiveId(layer.id)}
                    className={cn(
                      "grid w-full grid-cols-[0.625rem_3.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-lg border border-transparent px-3 py-2.5 text-left motion-safe:transition-all motion-safe:duration-200",
                      isHovered
                        ? "border-[var(--case-study-accent)]/25 bg-neutral-50 shadow-sm"
                        : "hover:border-[var(--color-border)] hover:bg-white/70",
                    )}
                  >
                    <span
                      className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full motion-safe:transition-colors motion-safe:duration-300"
                      style={{ backgroundColor: isHovered ? SLICE_ACTIVE : SLICE_NEUTRAL }}
                      aria-hidden
                    />
                    <span
                      className="text-h4 font-semibold tabular-nums leading-none text-[var(--case-study-accent)]"
                      style={{ opacity: isHovered ? 1 : 0.72 }}
                    >
                      {displayPercent(layer.percentage, progress)}%
                    </span>
                    <span
                      className={cn(
                        "min-w-0 pt-0.5 text-body-sm leading-snug motion-safe:transition-colors motion-safe:duration-200",
                        isHovered
                          ? "font-medium text-[var(--color-text-primary)]"
                          : isActive
                            ? "font-medium text-[var(--color-text-secondary)]"
                            : "text-[var(--color-text-secondary)]",
                      )}
                    >
                      {layer.label}
                    </span>
                  </button>

                  {index < layers.length - 1 && (
                    <div className="flex justify-center py-0.5 sm:justify-start sm:pl-[4.75rem]" aria-hidden>
                      <svg viewBox="0 0 12 18" className="h-4 w-3 text-[var(--color-text-muted)]/50">
                        <path
                          d="M6 0v12m0 0-3.5 3.5M6 12l3.5 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.25}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
