"use client";

import dynamic from "next/dynamic";
import { useHeatmapOverlayActive } from "@/hooks/useHeatmapOverlayActive";

const MetricsHeatmapOverlay = dynamic(
  () =>
    import("@/components/metrics/MetricsHeatmapOverlay").then((mod) => ({
      default: mod.MetricsHeatmapOverlay,
    })),
  { ssr: false },
);

export function LazyMetricsHeatmapOverlay() {
  const overlayActive = useHeatmapOverlayActive();

  if (!overlayActive) return null;

  return <MetricsHeatmapOverlay />;
}
