"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  METRICS_HEATMAP_OVERLAY_PARAM,
  METRICS_MAP_MODE_PARAM,
  type MapOverlayMode,
} from "@/lib/analytics-heatmap-types";
import { getMapOverlayMode, isHeatmapOverlaySessionActive } from "@/lib/metrics-heatmap-session";

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

export function useMapOverlayMode(): MapOverlayMode {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get(METRICS_MAP_MODE_PARAM) === "click" ? "click" : "dwell";
  const [sessionMode, setSessionMode] = useState<MapOverlayMode>("dwell");

  useEffect(() => {
    const sync = () => setSessionMode(getMapOverlayMode());
    sync();
    window.addEventListener("metrics-heatmap-overlay-change", sync);
    return () => window.removeEventListener("metrics-heatmap-overlay-change", sync);
  }, [searchParams]);

  return urlMode === "click" ? "click" : sessionMode;
}
