"use client";

import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { formatBucketLabel, type ContentRow, type TimeSeriesPoint } from "@/lib/analytics-metrics-types";

export function MetricsKpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
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
  if (points.length === 0) {
    return <p className="text-body-sm text-[var(--color-text-muted)]">{emptyLabel}</p>;
  }

  const max = Math.max(...points.map((p) => p.value), 1);

  return (
    <div className="space-y-2">
      {points.map((point) => {
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
