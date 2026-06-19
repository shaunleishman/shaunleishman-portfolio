"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { MetricsPageFilter } from "@/components/metrics/MetricsPageFilter";
import { MetricsPeriodFilter } from "@/components/metrics/MetricsPeriodFilter";
import { AdminShell } from "@/components/admin/AdminShell";

type MetricsMapsPageProps = {
  title: string;
  description: string;
  children: (props: { path: string; period: AnalyticsPeriod }) => ReactNode;
};

export function MetricsMapsPage({ title, description, children }: MetricsMapsPageProps) {
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
