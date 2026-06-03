"use client";

import { useCallback, useEffect, useState } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";
import { MetricsHeatmapViewer } from "@/components/metrics/MetricsHeatmapViewer";
import { MetricsPageFilter } from "@/components/metrics/MetricsPageFilter";

export default function MetricsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterPath, setFilterPath] = useState("all");

  const loadSummary = useCallback(async (pathFilter = filterPath) => {
    const query = pathFilter !== "all" ? `?path=${encodeURIComponent(pathFilter)}` : "";
    const res = await fetch(`/api/metrics/summary${query}`, { credentials: "include" });
    if (!res.ok) {
      setAuthenticated(false);
      setData(null);
      return false;
    }
    setData(await res.json());
    setAuthenticated(true);
    setError("");
    return true;
  }, [filterPath]);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const authRes = await fetch("/api/metrics/auth", { credentials: "include" });
      const authJson = (await authRes.json()) as { authenticated?: boolean };
      if (authJson.authenticated) {
        await loadSummary();
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    })();
  }, [loadSummary]);

  useEffect(() => {
    if (authenticated) {
      void loadSummary(filterPath);
    }
  }, [filterPath, authenticated, loadSummary]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/metrics/auth", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Invalid password");
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    setPassword("");
    await loadSummary();
    setLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/metrics/auth", { method: "DELETE", credentials: "include" });
    setAuthenticated(false);
    setData(null);
  }

  const heatmapPath =
    filterPath !== "all" ? filterPath : data?.topPages[0]?.path ?? data?.paths[0] ?? "/";

  if (authenticated === null || (loading && !data && authenticated !== false)) {
    return (
      <div className="section-padding container-site max-w-md">
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading metrics…</p>
      </div>
    );
  }

  return (
    <div className={`section-padding container-site ${authenticated ? "" : "max-w-md mx-auto"}`}>
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-label text-[var(--color-text-muted)] mb-2">Private</p>
          <h1 className="text-h2 font-semibold mb-2">Site metrics</h1>
          <p className="text-body text-[var(--color-text-secondary)] max-w-2xl">
            {authenticated
              ? "Visitor behaviour, mouse dwell heatmaps, section attention, scroll depth, and case study feedback."
              : "Password required. This page is not linked from the public site."}
          </p>
        </div>
        {authenticated && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void loadSummary()}
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      {!authenticated ? (
        <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <label htmlFor="metrics-password" className="block text-body-sm font-medium">
            Password
          </label>
          <input
            id="metrics-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            autoComplete="current-password"
          />
          {error && (
            <p role="alert" className="text-red-600 text-body-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-medium min-h-[44px] hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-60"
          >
            View metrics
          </button>
        </form>
      ) : data ? (
        <>
          <MetricsPageFilter paths={data.paths} value={filterPath} onChange={setFilterPath} />

          {data.filterPath && (
            <p className="mb-6 text-body-sm text-[var(--color-text-muted)]">
              Showing data for <strong className="text-[var(--color-text-primary)]">{data.filterPath}</strong>
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-10">
            <StatCard label="Total pageviews" value={String(data.totalPageviews)} />
            <StatCard label="Unique sessions" value={String(data.uniqueSessions)} />
            <StatCard label="Total mouse dwell" value={formatDwell(data.totalDwellMs)} />
            <StatCard label="Avg dwell / session" value={formatDwell(data.avgDwellPerSession)} />
            <StatCard label="Feedback submissions" value={String(data.feedback.total)} />
            <StatCard
              label="Average case study score"
              value={data.feedback.averageScore > 0 ? `${data.feedback.averageScore} / 7` : "—"}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2 mb-10">
            {data.dailyPageviews.length > 0 && (
              <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
                <h2 className="text-h4 font-semibold mb-4">Daily pageviews (last 14 days)</h2>
                <BarChart
                  items={data.dailyPageviews.map((d) => ({
                    key: d.date,
                    label: d.date.slice(5),
                    value: d.count,
                  }))}
                />
              </section>
            )}

            {data.hourlyActivity.length > 0 && (
              <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
                <h2 className="text-h4 font-semibold mb-4">Hourly activity</h2>
                <BarChart
                  items={data.hourlyActivity.map((h) => ({
                    key: h.hour,
                    label: formatHourlyLabel(h.hour),
                    value: h.count,
                  }))}
                  compact
                />
              </section>
            )}
          </div>

          {data.eventTypes.length > 0 && (
            <section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-h4 font-semibold mb-4">Event type breakdown</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {data.eventTypes.map((item) => (
                  <div
                    key={item.type}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-4 py-3"
                  >
                    <p className="text-label text-[var(--color-text-muted)] mb-1">{item.type}</p>
                    <p className="text-h4 font-semibold tabular-nums">{item.count}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <MetricsHeatmapViewer path={heatmapPath} />

          <div className="grid gap-8 lg:grid-cols-2 mb-10">
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

          <div className="grid gap-8 lg:grid-cols-2 mb-10">
            <DataTable
              title="Case study feedback scores"
              headers={["Case study", "Avg score", "Responses"]}
              rows={data.feedback.byCaseStudy.map((item) => [
                item.path,
                `${item.averageScore} / 7`,
                String(item.count),
              ])}
            />
            <DataTable
              title="Feedback sentiment"
              headers={["Bucket", "Count"]}
              rows={data.feedback.byBucket.map((item) => [item.bucket, String(item.count)])}
            />
            <DataTable
              title="Low-score reasons"
              headers={["Reason", "Count"]}
              rows={data.feedback.topReasons.map((item) => [item.reason, String(item.count)])}
            />
            <RecentEvents events={data.recentEvents} />
          </div>
        </>
      ) : null}
    </div>
  );
}

function formatHourlyLabel(hour: string): string {
  const date = new Date(hour);
  if (Number.isNaN(date.getTime())) return hour;

  const day = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day} ${time}`;
}

function formatDwell(ms: number): string {
  if (ms <= 0) return "—";
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

function BarChart({
  items,
  compact = false,
}: {
  items: { key: string; label: string; value: number }[];
  compact?: boolean;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className={`space-y-2 ${compact ? "max-h-64 overflow-y-auto pr-1" : ""}`}>
      {items.map((item) => {
        const width = Math.round((item.value / max) * 100);
        return (
          <div
            key={item.key}
            className={`grid items-center gap-3 text-body-sm ${
              compact ? "grid-cols-[5.5rem_1fr_2rem]" : "grid-cols-[4.5rem_1fr_2.5rem]"
            }`}
          >
            <span className="text-[var(--color-text-muted)] tabular-nums truncate">{item.label}</span>
            <div className="h-2 rounded-full bg-neutral-100">
              <div
                className="h-2 rounded-full bg-[var(--color-accent)]"
                style={{ width: `${width}%` }}
              />
            </div>
            <span className="text-right font-medium tabular-nums">{item.value}</span>
          </div>
        );
      })}
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
  const id = title.replace(/\s/g, "-").toLowerCase();
  return (
    <section aria-labelledby={id} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 id={id} className="text-h4 font-semibold mb-4">
        {title}
      </h2>
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

function RecentEvents({ events }: { events: AnalyticsSummary["recentEvents"] }) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-h4 font-semibold mb-4">Recent events</h2>
      {events.length === 0 ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">No events yet.</p>
      ) : (
        <ul className="space-y-2 text-body-sm max-h-80 overflow-y-auto">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-secondary)]"
            >
              <span className="font-medium text-[var(--color-text-primary)]">{event.type}</span>
              {" · "}
              {event.path}
              {" · "}
              <time dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString("en-GB")}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
