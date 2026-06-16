"use client";

import { useEffect } from "react";
import { isMetricsTrackingExcluded } from "@/lib/metrics-tracking-exclusion-client";

/** Prefetch metrics session state so sync analytics checks are accurate. */
export function MetricsTrackingExclusionWarmup() {
  useEffect(() => {
    void isMetricsTrackingExcluded();
  }, []);

  return null;
}
