"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { METRICS_HEATMAP_OVERLAY_PARAM } from "@/lib/analytics-heatmap-types";
import { isHeatmapOverlaySessionActive } from "@/lib/metrics-heatmap-session";

export function useHeatmapOverlayActive(): boolean {
  const searchParams = useSearchParams();
  const urlActive = searchParams.get(METRICS_HEATMAP_OVERLAY_PARAM) === "1";
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    const sync = () => setSessionActive(isHeatmapOverlaySessionActive());
    sync();
    window.addEventListener("metrics-heatmap-overlay-change", sync);
    return () => window.removeEventListener("metrics-heatmap-overlay-change", sync);
  }, [searchParams]);

  return urlActive || sessionActive;
}
