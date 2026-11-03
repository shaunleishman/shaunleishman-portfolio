"use client";

import { useState } from "react";
import type { AnalyticsDashboard } from "@/lib/analytics-metrics-types";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import type { AudienceMetricKey, ContentSortKey } from "@/lib/analytics-metrics-types";
import { useMetricsQuery } from "@/hooks/useMetricsQuery";

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
  const [reloadNonce, setReloadNonce] = useState(0);
  const params = new URLSearchParams({ period });
  if (sort) params.set("sort", sort);
  if (metric) params.set("metric", metric);

  const query = useMetricsQuery<AnalyticsDashboard>(
    enabled ? `/api/metrics/dashboard?${params.toString()}` : null,
    { reloadNonce },
  );

  return {
    data: query.data,
    loading: query.loading,
    reload: () => setReloadNonce((nonce) => nonce + 1),
  };
}
