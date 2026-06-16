import { NextRequest, NextResponse } from "next/server";
import { parseAnalyticsPeriod } from "@/lib/analytics-period";
import { getHeatmapPagePaths, getPageHeatmapData } from "@/lib/analytics-heatmap";
import { readAnalyticsEvents } from "@/lib/analytics-store";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsSessionToken } from "@/lib/metrics-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  if (!verifyMetricsSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const period = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));
  const events = await readAnalyticsEvents();
  const paths = getHeatmapPagePaths(events);

  if (!path) {
    return NextResponse.json({ paths, heatmap: null });
  }

  return NextResponse.json({ paths, heatmap: getPageHeatmapData(events, path, period) });
}
