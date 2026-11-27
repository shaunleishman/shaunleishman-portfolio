"use client";

import { useCallback } from "react";
import type { AnalyticsDashboard, AudienceMetricKey, ContentSortKey } from "@/lib/analytics-metrics-types";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { useMetricsGet } from "@/hooks/useMetricsGet";

type DashboardParams = {
  period: AnalyticsPeriod;
  sort?: ContentSortKey;
  metric?: AudienceMetricKey;
  enabled?: boolean;
};

export function useMetricsDashboard({
  period,
  sort,
  metric,
  enabled = true,
}: DashboardParams) {
  const params = new URLSearchParams({ period });
  if (sort) params.set("sort", sort);
  if (metric) params.set("metric", metric);

  const { data, loading, reload } = useMetricsGet<AnalyticsDashboard>(
    enabled ? `/api/metrics/dashboard?${params.toString()}` : null,
    { initialLoading: false },
  );

  const reloadDashboard = useCallback(async () => {
    reload();
    return null;
  }, [reload]);

  return { data, loading, reload: reloadDashboard };
}
