import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMetricsPath } from "@/lib/metrics-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const metricsPath = getMetricsPath();

  const isLegacyAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isDirectMetrics = pathname === "/metrics" || pathname.startsWith("/metrics/");
  const isSecretMetrics = pathname === metricsPath || pathname.startsWith(`${metricsPath}/`);

  if (!isLegacyAdmin && !isDirectMetrics && !isSecretMetrics) {
    return NextResponse.next();
  }

  if (isLegacyAdmin || isDirectMetrics) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const suffix = pathname.slice(metricsPath.length);
  const url = request.nextUrl.clone();
  url.pathname = `/metrics${suffix}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-metrics-access", "1");

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
