"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import {
  expandTrendBuckets,
  formatBucketLabel,
  type ContentRow,
  type TimeSeriesPoint,
} from "@/lib/analytics-metrics-types";

export function MetricsKpiCard({
  label,
  value,
  active = false,
  disabled = false,
  onClick,
}: {
  label: string;
  value: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const interactive = Boolean(onClick) && !disabled;
  const className = cn(
    "rounded-2xl border bg-white p-4 text-left sm:p-5",
    interactive && "cursor-pointer motion-safe:transition-[border-color,box-shadow,background-color] motion-safe:duration-200 hover:border-[var(--color-accent)]/40 hover:shadow-sm",
    active
      ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/20"
      : "border-[var(--color-border)]",
    disabled && "opacity-50",
  );

  if (interactive) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={className}>
        <p className="text-label text-[var(--color-text-muted)] mb-1">{label}</p>
        <p className="text-h3 font-semibold tabular-nums">{value}</p>
      </button>
    );
  }

  return (
    <div className={className}>
      <p className="text-label text-[var(--color-text-muted)] mb-1">{label}</p>
      <p className="text-h3 font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function MetricsBarChart({
  points,
  period,
  emptyLabel = "No data in this period yet.",
}: {
  points: TimeSeriesPoint[];
  period: AnalyticsPeriod;
  emptyLabel?: string;
}) {
  const series = useMemo(() => expandTrendBuckets(points, period), [points, period]);

  if (series.length === 0) {
    return <p className="text-body-sm text-[var(--color-text-muted)]">{emptyLabel}</p>;
  }

  const max = Math.max(...series.map((p) => p.value), 1);

  return (
    <div className="space-y-2">
      {series.map((point) => {
        const width = Math.round((point.value / max) * 100);
        return (
          <div key={point.date} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3 text-body-sm">
            <span className="truncate text-[var(--color-text-muted)] tabular-nums">
              {formatBucketLabel(point.date, period)}
            </span>
            <div className="h-2 rounded-full bg-neutral-100">
              <div
                className="h-2 rounded-full bg-[var(--color-accent)]"
                style={{ width: `${width}%` }}
              />
            </div>
            <span className="text-right font-medium tabular-nums">{point.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export function MetricsLineChart({
  points,
  period,
  emptyLabel = "No data in this period yet.",
}: {
  points: TimeSeriesPoint[];
  period: AnalyticsPeriod;
  emptyLabel?: string;
}) {
  const series = useMemo(() => expandTrendBuckets(points, period), [points, period]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (series.length === 0) {
    return <p className="text-body-sm text-[var(--color-text-muted)]">{emptyLabel}</p>;
  }

  const n = series.length;
  const max = Math.max(...series.map((p) => p.value), 1);

  // Inset the plot inside the 0–100 coordinate space so end points and the
  // tallest peak are never clipped at the edges.
  const PAD_X = 2;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 8;
  const xAt = (i: number) => (n === 1 ? 50 : PAD_X + (i / (n - 1)) * (100 - PAD_X * 2));
  const yAt = (v: number) => PAD_TOP + (1 - v / max) * (100 - PAD_TOP - PAD_BOTTOM);

  const coords = series.map((point, i) => ({ x: xAt(i), y: yAt(point.value), point, i }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const baseline = 100 - PAD_BOTTOM;
  const areaPath = `${linePath} L ${coords[n - 1].x} ${baseline} L ${coords[0].x} ${baseline} Z`;

  const handleMove = (clientX: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setActiveIndex(Math.max(0, Math.min(n - 1, Math.round(ratio * (n - 1)))));
  };

  const active = activeIndex === null ? null : coords[activeIndex];

  // Show at most 7 evenly spaced labels so a 28-day range stays readable.
  const tickCount = Math.min(n, 7);
  const ticks = Array.from({ length: tickCount }, (_, t) =>
    tickCount === 1 ? 0 : Math.round((t / (tickCount - 1)) * (n - 1)),
  );

  return (
    <figure
      role="img"
      aria-label={`Traffic trend. ${series
        .map((p) => `${formatBucketLabel(p.date, period)}: ${p.value}`)
        .join(", ")}.`}
    >
      <div
        className="relative h-56 w-full touch-none select-none"
        onMouseMove={(e) => handleMove(e.clientX, e.currentTarget)}
        onMouseLeave={() => setActiveIndex(null)}
        onTouchStart={(e) => handleMove(e.touches[0].clientX, e.currentTarget)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.currentTarget)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <path d={areaPath} fill="var(--color-accent)" fillOpacity={0.1} />
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-[var(--color-border)]"
            style={{ left: `${active.x}%` }}
          />
        )}

        {coords.map((c) => (
          <div
            key={c.point.date}
            className={cn(
              "pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-accent)] motion-safe:transition-transform",
              active?.i === c.i ? "scale-150" : n > 14 && "opacity-0",
            )}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          />
        ))}

        {active && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-white px-2.5 py-1.5 text-center"
            style={{
              left: `${Math.min(Math.max(active.x, 12), 88)}%`,
              top: `${active.y}%`,
              transform: `translate(-50%, ${active.y < 32 ? "14px" : "calc(-100% - 14px)"})`,
            }}
          >
            <p className="text-[0.6875rem] uppercase tracking-wide text-[var(--color-text-muted)]">
              {formatBucketLabel(active.point.date, period)}
            </p>
            <p className="text-body-sm font-semibold tabular-nums">
              {active.point.value} {active.point.value === 1 ? "visit" : "visits"}
            </p>
          </div>
        )}
      </div>

      <figcaption className="relative mt-2 h-4">
        {ticks.map((idx) => (
          <span
            key={idx}
            className="absolute -translate-x-1/2 whitespace-nowrap text-[0.6875rem] tabular-nums text-[var(--color-text-muted)]"
            style={{ left: `${xAt(idx)}%` }}
          >
            {formatBucketLabel(series[idx].date, period)}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export function MetricsRankedList({
  title,
  rows,
  metric = "views",
}: {
  title: string;
  rows: ContentRow[];
  metric?: "views" | "listeners" | "likes" | "shares";
}) {
  const metricLabel =
    metric === "listeners" ? "viewers" : metric === "views" ? "views" : metric;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-h4 font-semibold mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">No data yet.</p>
      ) : (
        <ol className="space-y-3">
          {rows.map((row, index) => (
            <li key={row.path} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-muted)] text-body-sm font-semibold tabular-nums">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{row.title}</p>
                <p className="text-body-sm text-[var(--color-text-muted)] truncate">{row.path}</p>
              </div>
              <span className="shrink-0 text-body-sm font-semibold tabular-nums">
                {row[metric]} {metricLabel}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function MetricsContentTable({
  rows,
  sortLabel,
}: {
  rows: ContentRow[];
  sortLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="text-body-sm text-[var(--color-text-muted)]">No data in this period yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]">
            <th scope="col" className="px-4 py-3 text-left font-semibold">
              Title
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Views
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Viewers
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Likes
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Shares
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.path} className="border-b border-[var(--color-border)] last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium">{row.title}</p>
                <p className="text-[var(--color-text-muted)]">{row.path}</p>
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium">{row.views}</td>
              <td className="px-4 py-3 text-right tabular-nums">{row.listeners}</td>
              <td className="px-4 py-3 text-right tabular-nums">{row.likes}</td>
              <td className="px-4 py-3 text-right tabular-nums">{row.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-2 text-xs text-[var(--color-text-muted)]">Sorted by {sortLabel}</p>
    </div>
  );
}
