"use client";

import { useEffect, useState } from "react";
import { fetchMetricsJson } from "@/lib/metrics-fetch";

type MetricsQueryOptions = {
  /**
   * Keep the last response on screen while the next request is in flight.
   * Heatmaps replace the panel with the loading message instead.
   */
  keepPrevious?: boolean;
  /** Bump to run the same URL again. */
  reloadNonce?: number;
};

/**
 * Loads one metrics URL and ignores responses from requests that were aborted.
 * Loading is derived from the snapshot so a filter change does not call setState in the effect.
 */
export function useMetricsQuery<T>(
  url: string | null,
  { keepPrevious = true, reloadNonce = 0 }: MetricsQueryOptions = {},
) {
  const [snapshot, setSnapshot] = useState<{ url: string; nonce: number; data: T | null } | null>(null);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    const requested = url;
    const nonce = reloadNonce;
    void fetchMetricsJson<T>(requested, controller.signal).then((result) => {
      if (result.aborted) return;
      setSnapshot({ url: requested, nonce, data: result.data });
    });
    return () => controller.abort();
  }, [reloadNonce, url]);

  const settled = url !== null && snapshot?.url === url && snapshot.nonce === reloadNonce;
  if (!keepPrevious) {
    return {
      data: settled && snapshot ? snapshot.data : null,
      loading: url !== null && !settled,
    };
  }

  const data = snapshot?.data ?? null;
  return {
    data,
    loading: url !== null && !settled && data === null,
  };
}
