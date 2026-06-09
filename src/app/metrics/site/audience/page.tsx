"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricsBarChart, MetricsKpiCard } from "@/components/metrics/metrics-ui";
import { MetricsPeriodSelect } from "@/components/metrics/MetricsPeriodSelect";
import { useMetricsDashboard } from "@/hooks/useMetricsDashboard";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import type { AudienceMetricKey } from "@/lib/analytics-metrics-types";
import { getAudienceMetricLabel } from "@/lib/analytics-metrics-types";

const METRIC_OPTIONS: AudienceMetricKey[] = [
  "active_viewers",
  "project_views",
  "article_views",
  "views_per_viewer",
  "shares",
];

export default function MetricsAudiencePage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("28d");
  const [metric, setMetric] = useState<AudienceMetricKey>("active_viewers");

  const { data, loading } = useMetricsDashboard({ period, metric });

  return (
    <AdminShell
      title="Audience"
      description="Track how people engage over time: viewers, project and article reach, depth per session, and shares."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="audience-metric" className="mb-1.5 block text-label text-[var(--color-text-muted)]">
            Metric
          </label>
          <select
            id="audience-metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value as AudienceMetricKey)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-body-sm min-h-[44px]"
          >
            {METRIC_OPTIONS.map((key) => (
              <option key={key} value={key}>
                {getAudienceMetricLabel(key)}
              </option>
            ))}
          </select>
        </div>
        <MetricsPeriodSelect value={period} onChange={setPeriod} id="audience-period" />
      </div>

      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading audience data…</p>
      ) : data ? (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricsKpiCard
              label={`Total ${data.audience.metricLabel.toLowerCase()}`}
              value={String(data.audience.summary)}
            />
            <MetricsKpiCard label="Unique viewers" value={String(data.overview.uniqueSessions)} />
            <MetricsKpiCard label="Pageviews" value={String(data.overview.pageviews)} />
          </div>

          <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-h4 font-semibold mb-1">{data.audience.metricLabel}</h2>
            <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">{data.periodLabel}</p>
            <MetricsBarChart points={data.audience.series} period={data.period} />
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-h4 font-semibold mb-4">Engagement breakdown</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricsKpiCard label="Project views" value={String(data.overview.projectViews)} />
              <MetricsKpiCard label="Article views" value={String(data.overview.articleViews)} />
              <MetricsKpiCard label="Likes" value={String(data.overview.blogLikes)} />
              <MetricsKpiCard label="Shares" value={String(data.overview.blogShares)} />
            </div>
          </section>
        </>
      ) : null}
    </AdminShell>
  );
}
