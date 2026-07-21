/**
 * Fixed security headers (everything except CSP).
 * CSP is built per-request with a nonce in middleware so Observatory does not
 * penalise script-src 'unsafe-inline'.
 */
export const FIXED_SECURITY_HEADERS: { key: string; value: string }[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

/** @deprecated Use FIXED_SECURITY_HEADERS; CSP is request-scoped. */
export const SECURITY_HEADERS = FIXED_SECURITY_HEADERS;

export function buildContentSecurityPolicy(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";

  return [
    "default-src 'self'",
    // Nonce + strict-dynamic: Observatory-friendly script policy without 'unsafe-inline'
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // Keep 'unsafe-inline' for styles only (Tailwind / React style attributes).
    // Observatory scores this as style-src-only unsafe, which is not a penalty.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function applyFixedSecurityHeaders(headers: Headers) {
  for (const header of FIXED_SECURITY_HEADERS) {
    headers.set(header.key, header.value);
  }
  // Prefer no public CORS on document responses when possible.
  headers.delete("Access-Control-Allow-Origin");
}

export function applySecurityHeaders(headers: Headers) {
  applyFixedSecurityHeaders(headers);
}
