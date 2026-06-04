import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics";
import { parseAnalyticsPeriod } from "@/lib/analytics-period";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";
import { verifyMetricsSessionToken } from "@/lib/metrics-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  if (!verifyMetricsSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const filterPath = path && path !== "all" ? path : null;
  const filterPeriod = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));

  return NextResponse.json(getAnalyticsSummary(filterPath, filterPeriod));
}
