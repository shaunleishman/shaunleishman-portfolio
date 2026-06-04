"use client";

import { useCallback, useEffect, useState } from "react";
import type { AnalyticsDashboard } from "@/lib/analytics-metrics-types";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import type { AudienceMetricKey, ContentSortKey } from "@/lib/analytics-metrics-types";

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
  const [data, setData] = useState<AnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!enabled) return null;

    setLoading(true);
    const params = new URLSearchParams({ period });
    if (sort) params.set("sort", sort);
    if (metric) params.set("metric", metric);

    const res = await fetch(`/api/metrics/dashboard?${params.toString()}`, {
      credentials: "include",
    });

    if (!res.ok) {
      setData(null);
      setLoading(false);
      return null;
    }

    const json = (await res.json()) as AnalyticsDashboard;
    setData(json);
    setLoading(false);
    return json;
  }, [enabled, metric, period, sort]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, reload: load };
}
