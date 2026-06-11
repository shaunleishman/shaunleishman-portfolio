"use client";

import { useCallback, useEffect, useState } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { MetricsHeatmapViewer } from "@/components/metrics/MetricsHeatmapViewer";
import { MetricsPageFilter } from "@/components/metrics/MetricsPageFilter";
import { MetricsPeriodFilter } from "@/components/metrics/MetricsPeriodFilter";
import { AdminShell } from "@/components/admin/AdminShell";

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
    <AdminShell
      title="Insights"
      description="Deep dive: heatmaps, scroll depth, section attention, exit pages, and portfolio feedback."
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
            <StatCard label="Feedback submissions" value={String(data.feedback.total)} />
          </div>

          {data.feedback.total > 0 && (
            <section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-h4 font-semibold mb-1">Feedback summary</h2>
              <p className="mb-6 text-body-sm text-[var(--color-text-muted)]">
                Quality ratings (1–5 scale, avg{" "}
                <strong className="text-[var(--color-text-primary)]">
                  {data.feedback.averageScore || "-"}
                </strong>
                ) and what people would improve.
              </p>

              <div className="grid gap-8 lg:grid-cols-2">
                <DataTable
                  title="Quality ratings"
                  headers={["Rating", "Count"]}
                  rows={data.feedback.byQuality.map((row) => [row.label, String(row.count)])}
                />
                <DataTable
                  title="By content type"
                  headers={["Type", "Submissions"]}
                  rows={data.feedback.byContentType.map((row) => [
                    row.contentType === "article" ? "Article" : "Case study",
                    String(row.count),
                  ])}
                />
                <DataTable
                  title="What to improve"
                  headers={["Area", "Count"]}
                  rows={data.feedback.byImprovementArea.map((row) => [row.label, String(row.count)])}
                />
                <DataTable
                  title="By page"
                  headers={["Page", "Submissions", "Avg score"]}
                  rows={data.feedback.byPage.map((row) => [
                    row.path,
                    String(row.count),
                    String(row.averageScore),
                  ])}
                />
              </div>

              {data.feedback.otherComments.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-body font-semibold mb-3">Other comments</h3>
                  <ul className="space-y-3">
                    {data.feedback.otherComments.map((entry, index) => (
                      <li
                        key={`${entry.timestamp}-${index}`}
                        className="rounded-xl border border-[var(--color-border)] px-4 py-3 text-body-sm"
                      >
                        <p className="font-medium text-[var(--color-text-primary)]">{entry.path}</p>
                        <p className="mt-1 text-[var(--color-text-secondary)]">{entry.comment}</p>
                        <time
                          className="mt-2 block text-[0.6875rem] text-[var(--color-text-muted)]"
                          dateTime={entry.timestamp}
                        >
                          {new Date(entry.timestamp).toLocaleString("en-GB")}
                        </time>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

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
    </AdminShell>
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
