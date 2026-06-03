import { NextRequest, NextResponse } from "next/server";
import { getHeatmapPagePaths, getPageHeatmapData } from "@/lib/analytics-heatmap";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsSessionToken } from "@/lib/metrics-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  if (!verifyMetricsSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const paths = getHeatmapPagePaths();

  if (!path) {
    return NextResponse.json({ paths, heatmap: null });
  }

  if (!paths.includes(path)) {
    return NextResponse.json({ paths, heatmap: getPageHeatmapData(path) });
  }

  return NextResponse.json({ paths, heatmap: getPageHeatmapData(path) });
}
