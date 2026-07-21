import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMetricsPath } from "@/lib/metrics-config";
import { applySecurityHeaders } from "@/lib/security-headers";

function withSecurityHeaders(response: NextResponse) {
  applySecurityHeaders(response.headers);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const metricsPath = getMetricsPath();

  const isLegacyAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isDirectMetrics = pathname === "/metrics" || pathname.startsWith("/metrics/");
  const isSecretMetrics = pathname === metricsPath || pathname.startsWith(`${metricsPath}/`);

  if (isLegacyAdmin || isDirectMetrics) {
    return withSecurityHeaders(new NextResponse("Not Found", { status: 404 }));
  }

  if (isSecretMetrics) {
    const suffix = pathname.slice(metricsPath.length);
    const url = request.nextUrl.clone();
    url.pathname = `/metrics${suffix}`;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-metrics-access", "1");

    return withSecurityHeaders(
      NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      }),
    );
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
