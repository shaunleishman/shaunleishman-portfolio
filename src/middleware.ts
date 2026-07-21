import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMetricsPath } from "@/lib/metrics-config";
import {
  applyFixedSecurityHeaders,
  buildContentSecurityPolicy,
} from "@/lib/security-headers";

const APEX_HOST = "shaunleishmanportfolio.com";
const WWW_HOST = "www.shaunleishmanportfolio.com";

function requestHost(request: NextRequest) {
  return request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
}

/** Apex → www with the full HSTS preload header on the redirect response. */
function redirectApexToWww(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = WWW_HOST;
  const response = NextResponse.redirect(url, 308);
  applyFixedSecurityHeaders(response.headers);
  return response;
}

export function middleware(request: NextRequest) {
  // Must run before Vercel’s incomplete apex redirect. In the Vercel dashboard,
  // set the apex domain to “No Redirect” so this middleware handles it.
  if (requestHost(request) === APEX_HOST) {
    return redirectApexToWww(request);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildContentSecurityPolicy(nonce);
  const { pathname } = request.nextUrl;
  const metricsPath = getMetricsPath();

  const isLegacyAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isDirectMetrics = pathname === "/metrics" || pathname.startsWith("/metrics/");
  const isSecretMetrics = pathname === metricsPath || pathname.startsWith(`${metricsPath}/`);

  if (isLegacyAdmin || isDirectMetrics) {
    const response = new NextResponse("Not Found", { status: 404 });
    applyFixedSecurityHeaders(response.headers);
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  if (isSecretMetrics) {
    const suffix = pathname.slice(metricsPath.length);
    const url = request.nextUrl.clone();
    url.pathname = `/metrics${suffix}`;
    requestHeaders.set("x-metrics-access", "1");

    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    applyFixedSecurityHeaders(response.headers);
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  applyFixedSecurityHeaders(response.headers);
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
