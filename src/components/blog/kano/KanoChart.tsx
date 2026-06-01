"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  CHART,
  Y_TICKS,
  areaPathForCategory,
  formatImplementation,
  fromX,
  plotHeight,
  plotWidth,
  toX,
  toY,
} from "./kano-chart";
import { satisfactionLabel, type KanoCategory } from "./kano-math";
import type { KanoCategoryMeta } from "./kano-math";

type CurveLayer = {
  id: string;
  d: string;
  areaD?: string;
  color: string;
  dashed?: boolean;
  opacity?: number;
};

type KanoChartProps = {
  curves: CurveLayer[];
  categories?: KanoCategoryMeta[];
  activeId?: KanoCategory;
  activeColor?: string;
  onHighlightTChange?: (t: number) => void;
  valueAt?: (t: number) => number;
  xLabel?: string;
  ariaLabel: string;
  metricLabel?: string;
  metricValue?: string;
};

export function KanoChart({
  curves,
  categories,
  activeId,
  activeColor,
  onHighlightTChange,
  valueAt,
  xLabel = "Feature implementation",
  ariaLabel,
  metricLabel,
  metricValue,
}: KanoChartProps) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverT, setHoverT] = useState<number | null>(null);

  const highlightT = hoverT ?? 0.65;
  const pw = plotWidth();
  const ph = plotHeight();

  const primaryCurve =
    curves.find((c) => c.id === activeId) ??
    curves.find((c) => c.id === "now") ??
    curves[0];

  const primaryColor =
    activeColor ?? primaryCurve?.color ?? categories?.find((c) => c.id === activeId)?.color ?? "#14b8a6";

  const yAtHighlight = valueAt?.(highlightT) ?? 0;
  const hx = toX(highlightT);
  const hy = toY(yAtHighlight);
  const showGuide = valueAt !== undefined && hoverT !== null;

  const handlePointer = useCallback(
    (clientX: number, target: SVGSVGElement) => {
      const rect = target.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * CHART.w;
      const t = fromX(x);
      setHoverT(t);
      onHighlightTChange?.(t);
    },
    [onHighlightTChange],
  );

  const tooltipW = 128;
  const tooltipX = Math.min(Math.max(hx - tooltipW / 2, CHART.pad.left), CHART.w - CHART.pad.right - tooltipW);
  const tooltipY = Math.max(hy - 48, CHART.pad.top + 4);

  return (
    <div className="rounded-2xl bg-white p-3 shadow-[0_2px_16px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04] sm:p-4">
      {(metricLabel || metricValue) && (
        <div className="mb-3 px-0.5">
          {metricLabel && (
            <p className="text-[0.75rem] font-medium text-[var(--color-text-muted)]">{metricLabel}</p>
          )}
          {metricValue && (
            <p className="text-[1.125rem] font-semibold tracking-tight text-[var(--color-text-primary)]">
              {metricValue}
            </p>
          )}
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${CHART.w} ${CHART.h}`}
        className="w-full touch-none select-none"
        role="img"
        aria-label={ariaLabel}
        onPointerLeave={() => setHoverT(null)}
      >
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity={0.03} />
          </linearGradient>
        </defs>

        <rect x={CHART.pad.left} y={CHART.pad.top} width={pw} height={ph} fill="#fafbfc" rx={8} />

        {Y_TICKS.map((tick) => (
          <line
            key={tick}
            x1={CHART.pad.left}
            y1={toY(tick)}
            x2={CHART.pad.left + pw}
            y2={toY(tick)}
            stroke={tick === 0 ? "#dde1e6" : "#ebeef2"}
            strokeDasharray={tick === 0 ? undefined : "3 5"}
          />
        ))}

        <text x={CHART.pad.left - 8} y={toY(1) + 3} textAnchor="end" className="fill-neutral-400 text-[8px]">
          +
        </text>
        <text x={CHART.pad.left - 8} y={toY(0) + 3} textAnchor="end" className="fill-neutral-400 text-[8px]">
          0
        </text>
        <text x={CHART.pad.left - 8} y={toY(-1) + 3} textAnchor="end" className="fill-neutral-400 text-[8px]">
          −
        </text>

        {/* Background curves */}
        {categories?.map((cat) => {
          if (cat.id === activeId) return null;
          const path = curves.find((c) => c.id === cat.id);
          if (!path) return null;
          return (
            <path
              key={cat.id}
              d={path.d}
              fill="none"
              stroke={cat.color}
              strokeWidth={1}
              strokeLinecap="round"
              opacity={0.14}
            />
          );
        })}

        {curves
          .filter((c) => c.dashed)
          .map((curve) => (
            <path
              key={`bg-${curve.id}`}
              d={curve.d}
              fill="none"
              stroke={curve.color}
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeDasharray={curve.dashed ? "6 4" : undefined}
              opacity={curve.opacity ?? 0.35}
            />
          ))}

        {/* Area fill */}
        {activeId && (
          <path d={areaPathForCategory(activeId)} fill={`url(#${uid}-fill)`} />
        )}
        {primaryCurve?.areaD && (
          <path d={primaryCurve.areaD} fill={`url(#${uid}-fill)`} />
        )}

        {/* Primary line */}
        {categories && activeId && (
          <path
            d={curves.find((c) => c.id === activeId)?.d ?? ""}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        )}
        {primaryCurve && (!categories || primaryCurve.id !== activeId) && (
          <path
            d={primaryCurve.d}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        )}

        {showGuide && (
          <>
            <line
              x1={hx}
              y1={CHART.pad.top}
              x2={hx}
              y2={CHART.pad.top + ph}
              stroke={primaryColor}
              strokeWidth={1}
              opacity={0.4}
            />
            <circle cx={hx} cy={hy} r={5} fill="white" stroke={primaryColor} strokeWidth={1.5} />
            <rect x={tooltipX} y={tooltipY} width={tooltipW} height={42} rx={8} fill="#18181b" />
            <text x={tooltipX + 10} y={tooltipY + 15} className="fill-neutral-400 text-[8px]">
              {formatImplementation(highlightT)}
            </text>
            <text x={tooltipX + 10} y={tooltipY + 32} className="fill-white text-[10px] font-semibold">
              {satisfactionLabel(yAtHighlight)}
            </text>
          </>
        )}

        {[0, 0.5, 1].map((t) => (
          <text
            key={t}
            x={toX(t)}
            y={CHART.h - 10}
            textAnchor="middle"
            className="fill-neutral-400 text-[8px]"
          >
            {t === 0 ? "None" : t === 1 ? "Full" : "50%"}
          </text>
        ))}
        <text
          x={CHART.pad.left + pw / 2}
          y={CHART.h - 1}
          textAnchor="middle"
          className="fill-neutral-500 text-[9px] font-medium"
        >
          {xLabel}
        </text>

        {valueAt && (
          <rect
            x={CHART.pad.left}
            y={CHART.pad.top}
            width={pw}
            height={ph}
            fill="transparent"
            className="cursor-crosshair"
            onPointerMove={(e) => svgRef.current && handlePointer(e.clientX, svgRef.current)}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              svgRef.current && handlePointer(e.clientX, svgRef.current);
            }}
          />
        )}
      </svg>
    </div>
  );
}
