"use client";

import { memo, useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
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

/**
 * Map a pointer into implementation level 0–1.
 * `getScreenCTM` follows the viewBox, including a letterboxed SVG. The bounding-rect
 * ratio is only a fallback for the same mapping when the screen matrix is missing.
 */
function implementationFromPointer(svg: SVGSVGElement, clientX: number, clientY: number): number | null {
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const local = point.matrixTransform(ctm.inverse());
    if (Number.isFinite(local.x)) return fromX(local.x);
  }

  const rect = svg.getBoundingClientRect();
  if (rect.width <= 0) return null;
  return fromX(((clientX - rect.left) / rect.width) * CHART.w);
}

const ChartBackdrop = memo(function ChartBackdrop({
  uid,
  curves,
  categories,
  activeId,
  primaryColor,
}: {
  uid: string;
  curves: CurveLayer[];
  categories?: KanoCategoryMeta[];
  activeId?: KanoCategory;
  primaryColor: string;
}) {
  const pw = plotWidth();
  const ph = plotHeight();
  const primaryCurve =
    curves.find((c) => c.id === activeId) ?? curves.find((c) => c.id === "now") ?? curves[0];

  return (
    <>
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

      {activeId && <path d={areaPathForCategory(activeId)} fill={`url(#${uid}-fill)`} />}
      {primaryCurve?.areaD && <path d={primaryCurve.areaD} fill={`url(#${uid}-fill)`} />}

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
        <path d={primaryCurve.d} fill="none" stroke={primaryColor} strokeWidth={1.75} strokeLinecap="round" />
      )}
    </>
  );
});

const ChartAxis = memo(function ChartAxis({ xLabel }: { xLabel: string }) {
  const pw = plotWidth();
  return (
    <>
      {[0, 0.5, 1].map((t) => (
        <text key={t} x={toX(t)} y={CHART.h - 10} textAnchor="middle" className="fill-neutral-400 text-[8px]">
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
    </>
  );
});

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
  const capturedPointerId = useRef<number | null>(null);
  const frameRef = useRef(0);
  const pendingT = useRef<number | null>(null);
  const hoverGeneration = useRef(0);
  const [hoverT, setHoverT] = useState<number | null>(null);

  const highlightT = hoverT ?? 0.65;
  const pw = plotWidth();
  const ph = plotHeight();

  const primaryCurve =
    curves.find((c) => c.id === activeId) ?? curves.find((c) => c.id === "now") ?? curves[0];
  const primaryColor =
    activeColor ?? primaryCurve?.color ?? categories?.find((c) => c.id === activeId)?.color ?? "#14b8a6";

  const yAtHighlight = valueAt?.(highlightT) ?? 0;
  const hx = toX(highlightT);
  const hy = toY(yAtHighlight);
  const showGuide = valueAt !== undefined && hoverT !== null;

  const tooltipW = 128;
  const tooltipX = Math.min(Math.max(hx - tooltipW / 2, CHART.pad.left), CHART.w - CHART.pad.right - tooltipW);
  const tooltipY = Math.max(hy - 48, CHART.pad.top + 4);

  const cancelFrame = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
  }, []);

  useEffect(() => cancelFrame, [cancelFrame]);

  const flushPending = useCallback((generation: number) => {
    frameRef.current = 0;
    const t = pendingT.current;
    if (t === null || generation !== hoverGeneration.current) return;
    setHoverT(t);
    onHighlightTChange?.(t);
  }, [onHighlightTChange]);

  const publishPointer = useCallback(
    (clientX: number, clientY: number, svg: SVGSVGElement) => {
      const t = implementationFromPointer(svg, clientX, clientY);
      if (t === null) return;
      pendingT.current = t;
      if (frameRef.current) return;
      const generation = hoverGeneration.current;
      frameRef.current = requestAnimationFrame(() => flushPending(generation));
    },
    [flushPending],
  );

  const clearHover = useCallback(() => {
    const t = pendingT.current;
    hoverGeneration.current += 1;
    pendingT.current = null;
    cancelFrame();
    setHoverT(null);
    // The guide hides, but the readout keeps the last sample from this gesture.
    if (t !== null) onHighlightTChange?.(t);
  }, [cancelFrame, onHighlightTChange]);

  const endPointer = useCallback(
    (event: PointerEvent<SVGRectElement>) => {
      capturedPointerId.current = null;
      const svg = svgRef.current;
      if (!svg) {
        clearHover();
        return;
      }
      const bounds = svg.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      if (!inside) clearHover();
    },
    [clearHover],
  );

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
        onPointerLeave={() => {
          // pointerleave also fires while a drag is captured and the pointer
          // has left the SVG. Captured moves then set the guide again, and
          // releasing outside never gets another leave, so the guide stays stuck.
          if (capturedPointerId.current !== null) return;
          clearHover();
        }}
      >
        <ChartBackdrop
          uid={uid}
          curves={curves}
          categories={categories}
          activeId={activeId}
          primaryColor={primaryColor}
        />

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

        <ChartAxis xLabel={xLabel} />

        {valueAt && (
          <rect
            x={CHART.pad.left}
            y={CHART.pad.top}
            width={pw}
            height={ph}
            fill="transparent"
            className="cursor-crosshair"
            onPointerMove={(e) => svgRef.current && publishPointer(e.clientX, e.clientY, svgRef.current)}
            onPointerDown={(e) => {
              capturedPointerId.current = e.pointerId;
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                capturedPointerId.current = null;
              }
              if (svgRef.current) publishPointer(e.clientX, e.clientY, svgRef.current);
            }}
            onPointerUp={endPointer}
            onPointerCancel={() => {
              capturedPointerId.current = null;
              clearHover();
            }}
            onLostPointerCapture={() => {
              capturedPointerId.current = null;
            }}
          />
        )}
      </svg>
    </div>
  );
}
