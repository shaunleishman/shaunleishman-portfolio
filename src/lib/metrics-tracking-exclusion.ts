import type { NextRequest } from "next/server";
import { verifyMetricsSessionToken } from "@/lib/metrics-auth";
import { METRICS_COOKIE_NAME } from "@/lib/metrics-config";

/** True when the request has a valid metrics dashboard session (site owner). */
export function isMetricsOwnerRequest(request: NextRequest): boolean {
  const token = request.cookies.get(METRICS_COOKIE_NAME)?.value;
  return verifyMetricsSessionToken(token);
}
