"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricsKpiCard, MetricsLineChart } from "@/components/metrics/metrics-ui";
import { MetricsPeriodSelect } from "@/components/metrics/MetricsPeriodSelect";
import { useMetricsDashboard } from "@/hooks/useMetricsDashboard";
import { METRICS_HOME_PERIOD, type AnalyticsPeriod } from "@/lib/analytics-period";

export default function AdminOverviewPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(METRICS_HOME_PERIOD);
  const { data, loading } = useMetricsDashboard({ period });

  return (
    <AdminShell
      title="Overview"
      description="Your admin home. Quick health checks and shortcuts to site metrics, prototypes, design systems, case studies, and cover letter."
    >
      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading overview…</p>
      ) : data ? (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-body-sm text-[var(--color-text-muted)]">
              Snapshot for{" "}
              <strong className="text-[var(--color-text-primary)]">{data.periodLabel}</strong>
            </p>
            <MetricsPeriodSelect value={period} onChange={setPeriod} id="overview-period" />
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsKpiCard label="Pageviews" value={String(data.overview.pageviews)} />
            <MetricsKpiCard label="Unique viewers" value={String(data.overview.uniqueSessions)} />
            <MetricsKpiCard label="On site now" value={String(data.activeNow.count)} />
            <MetricsKpiCard label="Feedback" value={String(data.overview.feedbackSubmissions)} />
          </div>

          <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-h4 font-semibold mb-4">Traffic trend</h2>
            <MetricsLineChart points={data.trend} period={data.period} />
          </section>
        </>
      ) : null}
    </AdminShell>
  );
}
