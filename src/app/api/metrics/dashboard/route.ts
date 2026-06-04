import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsDashboard } from "@/lib/site-metrics";
import { parseAudienceMetric, parseContentSort } from "@/lib/analytics-metrics-types";
import { parseAnalyticsPeriod } from "@/lib/analytics-period";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsSessionToken } from "@/lib/metrics-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  if (!verifyMetricsSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));
  const contentSort = parseContentSort(request.nextUrl.searchParams.get("sort"));
  const audienceMetric = parseAudienceMetric(request.nextUrl.searchParams.get("metric"));

  return NextResponse.json(
    getAnalyticsDashboard({ period, contentSort, audienceMetric }),
  );
}
