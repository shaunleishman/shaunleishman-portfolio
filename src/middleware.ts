import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMetricsPath } from "@/lib/metrics-config";
import {
  createMetricsAccessProof,
  isMetricsRewriteContinuation,
  METRICS_ACCESS_HEADER,
  METRICS_REWRITE_HEADER,
  rememberMetricsRewrite,
} from "@/lib/metrics-access";
import {
  applyFixedSecurityHeaders,
  buildContentSecurityPolicy,
  CANONICAL_APEX_HOST,
  canonicalWwwUrl,
  isStaticAssetPath,
} from "@/lib/security-headers";

function requestHost(request: NextRequest) {
  return request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
}

function createNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/** Apex → www with the full HSTS preload header on the redirect response. */
function redirectApexToWww(request: NextRequest) {
  const response = NextResponse.redirect(canonicalWwwUrl(request.nextUrl), 308);
  applyFixedSecurityHeaders(response.headers);
  return response;
}

function denyMetrics(csp: string) {
  const response = new NextResponse("Not Found", { status: 404 });
  applyFixedSecurityHeaders(response.headers);
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function isMetricsAppPath(pathname: string) {
  return pathname === "/metrics" || pathname.startsWith("/metrics/");
}

function isLegacyAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/**
 * Stays `middleware.ts` (Edge), not `proxy.ts`. The apex redirect has to run
 * before Vercel's own redirect. Proxy is Node and runs later. In the Vercel
 * dashboard, set the apex domain to "No Redirect" so this file handles it.
 */
export async function middleware(request: NextRequest) {
  if (requestHost(request) === CANONICAL_APEX_HOST) {
    return redirectApexToWww(request);
  }

  const { pathname } = request.nextUrl;
  const metricsPath = getMetricsPath();
  const isLegacyAdmin = isLegacyAdminPath(pathname);
  const isDirectMetrics = isMetricsAppPath(pathname);
  const isSecretMetrics = pathname === metricsPath || pathname.startsWith(`${metricsPath}/`);

  if (!isLegacyAdmin && !isDirectMetrics && !isSecretMetrics && isStaticAssetPath(pathname)) {
    const response = NextResponse.next();
    applyFixedSecurityHeaders(response.headers);
    return response;
  }

  const incomingNonce = request.headers.get("x-nonce");
  const incomingProof = request.headers.get(METRICS_ACCESS_HEADER);
  const continuation =
    isDirectMetrics &&
    (await isMetricsRewriteContinuation({
      nonce: incomingNonce,
      proof: incomingProof,
      rewriteId: request.headers.get(METRICS_REWRITE_HEADER),
    }));

  if (isLegacyAdmin || (isDirectMetrics && !continuation)) {
    return denyMetrics(buildContentSecurityPolicy(createNonce()));
  }

  const nonce = continuation && incomingNonce ? incomingNonce : createNonce();
  const csp = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(METRICS_ACCESS_HEADER);
  requestHeaders.delete(METRICS_REWRITE_HEADER);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  if (isSecretMetrics || continuation) {
    const proof =
      continuation && incomingProof ? incomingProof : await createMetricsAccessProof(nonce);
    requestHeaders.set(METRICS_ACCESS_HEADER, proof);

    if (isSecretMetrics) {
      const rewriteId = crypto.randomUUID();
      rememberMetricsRewrite(rewriteId);
      requestHeaders.set(METRICS_REWRITE_HEADER, rewriteId);
      const suffix = pathname.slice(metricsPath.length);
      const url = request.nextUrl.clone();
      url.pathname = `/metrics${suffix}`;
      const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
      applyFixedSecurityHeaders(response.headers);
      response.headers.set("Content-Security-Policy", csp);
      return response;
    }
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
    // Prefetch requests skip the broad matcher below. These paths must still
    // run, or a prefetch plus a client `x-metrics-access` header reaches the page.
    "/metrics",
    "/metrics/:path*",
    "/admin",
    "/admin/:path*",
    {
      source: "/((?!_next/static|_next/image).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
