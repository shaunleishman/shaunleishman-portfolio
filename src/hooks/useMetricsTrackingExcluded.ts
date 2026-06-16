"use client";

import { useEffect, useState } from "react";
import {
  isMetricsTrackingExcluded,
  METRICS_TRACKING_EXCLUSION_EVENT,
} from "@/lib/metrics-tracking-exclusion-client";

/** null while the first auth check is in flight. */
export function useMetricsTrackingExcluded(): boolean | null {
  const [excluded, setExcluded] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => {
      void isMetricsTrackingExcluded(true).then(setExcluded);
    };

    void isMetricsTrackingExcluded().then(setExcluded);

    window.addEventListener("focus", sync);
    window.addEventListener(METRICS_TRACKING_EXCLUSION_EVENT, sync);
    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener(METRICS_TRACKING_EXCLUSION_EVENT, sync);
    };
  }, []);

  return excluded;
}
