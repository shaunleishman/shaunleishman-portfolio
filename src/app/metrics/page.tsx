"use client";

import { MetricsShell } from "@/components/metrics/MetricsShell";
import { MetricsBarChart, MetricsKpiCard, MetricsRankedList } from "@/components/metrics/metrics-ui";
import { useMetricsDashboard } from "@/hooks/useMetricsDashboard";
import { METRICS_HOME_PERIOD } from "@/lib/analytics-period";

export default function MetricsHomePage() {
  const { data, loading } = useMetricsDashboard({ period: METRICS_HOME_PERIOD });

  return (
    <MetricsShell
      title="Site metrics"
      description="High-level performance for the last 7 days: traffic, engagement, and what is performing right now."
    >
      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading dashboard…</p>
      ) : data ? (
        <>
          <p className="mb-6 text-body-sm text-[var(--color-text-muted)]">
            Overview for <strong className="text-[var(--color-text-primary)]">{data.periodLabel}</strong>
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsKpiCard label="Pageviews" value={String(data.overview.pageviews)} />
            <MetricsKpiCard label="Unique viewers" value={String(data.overview.uniqueSessions)} />
            <MetricsKpiCard label="Project views" value={String(data.overview.projectViews)} />
            <MetricsKpiCard label="Article views" value={String(data.overview.articleViews)} />
            <MetricsKpiCard label="Likes" value={String(data.overview.blogLikes)} />
            <MetricsKpiCard label="Shares" value={String(data.overview.blogShares)} />
            <MetricsKpiCard label="CV views" value={String(data.overview.cvViews)} />
            <MetricsKpiCard label="Contact views" value={String(data.overview.contactViews)} />
            <MetricsKpiCard label="Feedback" value={String(data.overview.feedbackSubmissions)} />
          </div>

          <div className="mb-10 grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-h4 font-semibold mb-1">On site now</h2>
              <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
                Active in the last 5 minutes
              </p>
              <p className="text-h2 font-semibold tabular-nums mb-4">{data.activeNow.count}</p>
              {data.activeNow.visitors.length === 0 ? (
                <p className="text-body-sm text-[var(--color-text-muted)]">No active visitors right now.</p>
              ) : (
                <ul className="space-y-2 text-body-sm">
                  {data.activeNow.visitors.map((visitor) => (
                    <li
                      key={visitor.sessionId}
                      className="flex justify-between gap-3 rounded-lg border border-[var(--color-border)] px-3 py-2"
                    >
                      <span className="truncate font-medium">{visitor.path}</span>
                      <time className="shrink-0 text-[var(--color-text-muted)]" dateTime={visitor.lastSeen}>
                        {new Date(visitor.lastSeen).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-h4 font-semibold mb-4">Traffic trend</h2>
              <MetricsBarChart points={data.trend} period={data.period} />
            </section>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <MetricsRankedList title="Top projects" rows={data.topProjects} metric="views" />
            <MetricsRankedList title="Top articles" rows={data.topArticles} metric="views" />
          </div>
        </>
      ) : null}
    </MetricsShell>
  );
}
