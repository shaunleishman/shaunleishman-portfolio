"use client";

import { useState, type ReactNode } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { MetricsPageFilter } from "@/components/metrics/MetricsPageFilter";
import { MetricsPeriodFilter } from "@/components/metrics/MetricsPeriodFilter";
import { AdminShell } from "@/components/admin/AdminShell";
import { useMetricsQuery } from "@/hooks/useMetricsQuery";

type MetricsMapsPageProps = {
  title: string;
  description: string;
  children: (props: { path: string; period: AnalyticsPeriod }) => ReactNode;
};

export function MetricsMapsPage({ title, description, children }: MetricsMapsPageProps) {
  const [filterPath, setFilterPath] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState<AnalyticsPeriod>("28d");
  const params = new URLSearchParams({ period: filterPeriod });
  if (filterPath !== "all") params.set("path", filterPath);
  const { data, loading } = useMetricsQuery<AnalyticsSummary>(`/api/metrics/summary?${params.toString()}`);

  const mapPath =
    filterPath !== "all" ? filterPath : data?.topPages[0]?.path ?? data?.paths[0] ?? "/";

  return (
    <AdminShell title={title} description={description}>
      {loading && !data ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading maps…</p>
      ) : data ? (
        <>
          <div className="mb-8 space-y-6 rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <MetricsPeriodFilter value={filterPeriod} onChange={setFilterPeriod} />
            <MetricsPageFilter paths={data.paths} value={filterPath} onChange={setFilterPath} />
          </div>

          {children({ path: mapPath, period: filterPeriod })}
        </>
      ) : null}
    </AdminShell>
  );
}
