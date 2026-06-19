"use client";

import { MetricsClickmapViewer } from "@/components/metrics/MetricsClickmapViewer";
import { MetricsMapsPage } from "@/components/metrics/MetricsMapsPage";

export default function MetricsClickMapPage() {
  return (
    <MetricsMapsPage
      title="Click map"
      description="Every page click on an 8×8px grid. Open the live overlay to see where visitors click across the site."
    >
      {({ path, period }) => <MetricsClickmapViewer path={path} period={period} />}
    </MetricsMapsPage>
  );
}
