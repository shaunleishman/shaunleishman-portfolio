"use client";

import { useCallback, useEffect, useState } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { MetricsHeatmapViewer } from "@/components/metrics/MetricsHeatmapViewer";
import { MetricsPageFilter } from "@/components/metrics/MetricsPageFilter";
import { MetricsPeriodFilter } from "@/components/metrics/MetricsPeriodFilter";
import { MetricsShell } from "@/components/metrics/MetricsShell";

export default function MetricsInsightsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterPath, setFilterPath] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState<AnalyticsPeriod>("28d");

  const loadSummary = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterPath !== "all") params.set("path", filterPath);
    if (filterPeriod !== "all") params.set("period", filterPeriod);
    const query = params.toString();

    const res = await fetch(`/api/metrics/summary${query ? `?${query}` : ""}`, {
      credentials: "include",
    });
    if (res.ok) {
      setData(await res.json());
    } else {
      setData(null);
    }
    setLoading(false);
  }, [filterPath, filterPeriod]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const heatmapPath =
    filterPath !== "all" ? filterPath : data?.topPages[0]?.path ?? data?.paths[0] ?? "/";

  return (
    <MetricsShell
      title="Insights"
      description="Deep dive: heatmaps, scroll depth, section attention, exit pages, and case study feedback."
    >
      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading insights…</p>
      ) : data ? (
        <>
          <div className="mb-8 space-y-6 rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <MetricsPeriodFilter value={filterPeriod} onChange={setFilterPeriod} />
            <MetricsPageFilter paths={data.paths} value={filterPath} onChange={setFilterPath} />
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Pageviews" value={String(data.totalPageviews)} />
            <StatCard label="Unique sessions" value={String(data.uniqueSessions)} />
            <StatCard label="Mouse dwell" value={formatDwell(data.totalDwellMs)} />
            <StatCard label="Feedback" value={String(data.feedback.total)} />
          </div>

          <MetricsHeatmapViewer path={heatmapPath} period={filterPeriod} />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <DataTable
              title="Most viewed pages"
              headers={["Page", "Views"]}
              rows={data.topPages.map((p) => [p.path, String(p.views)])}
            />
            <DataTable
              title="Most viewed sections"
              headers={["Section", "Views"]}
              rows={data.topSections.map((s) => [s.section, String(s.views)])}
            />
            <DataTable
              title="Scroll depth"
              headers={["Depth", "Count"]}
              rows={data.scrollDepth.map((s) => [s.depth, String(s.count)])}
            />
            <DataTable
              title="Exit pages"
              headers={["Page", "Exits"]}
              rows={data.exitPages.map((p) => [p.path, String(p.count)])}
            />
          </div>
        </>
      ) : null}
    </MetricsShell>
  );
}

function formatDwell(ms: number): string {
  if (ms <= 0) return "N/A";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <p className="text-label text-[var(--color-text-muted)] mb-2">{label}</p>
      <p className="text-h3 font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function DataTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-h4 font-semibold mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">No data yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]">
                {headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-[var(--color-text-secondary)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
