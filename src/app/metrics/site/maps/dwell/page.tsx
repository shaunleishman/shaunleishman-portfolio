"use client";

import { MetricsHeatmapViewer } from "@/components/metrics/MetricsHeatmapViewer";
import { MetricsMapsPage } from "@/components/metrics/MetricsMapsPage";

export default function MetricsDwellMapPage() {
  return (
    <MetricsMapsPage
      title="Dwell heatmap"
      description="Mouse dwell patterns on an 8×8px grid. Open the live overlay to inspect where visitors pause on each page."
    >
      {({ path, period }) => <MetricsHeatmapViewer path={path} period={period} />}
    </MetricsMapsPage>
  );
}
