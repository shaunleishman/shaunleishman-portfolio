/**
 * Fixed security headers (everything except CSP).
 * CSP is built per document request with a nonce in middleware so Observatory
 * does not penalise script-src 'unsafe-inline'. Raster images, fonts, and
 * media skip that nonce: their bytes are not a document, and cloning every
 * request header onto those responses is wasted work.
 *
 * style-src stays 'unsafe-inline' in production. A nonce in style-src makes
 * browsers ignore 'unsafe-inline', which drops Tailwind and React style
 * attributes. Do not switch this to the nonce-only sample in the Next.js CSP guide.
 */
export const CANONICAL_APEX_HOST = "shaunleishmanportfolio.com";
export const CANONICAL_WWW_HOST = "www.shaunleishmanportfolio.com";
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

/**
 * Extensions whose responses are not documents. SVG is excluded: a top-level
 * SVG can execute a script, so it keeps the document CSP.
 */
const STATIC_ASSET_EXTENSIONS = new Set([
  "avif",
  "gif",
  "ico",
  "jpeg",
  "jpg",
  "json",
  "mp3",
  "mp4",
  "ogg",
  "otf",
  "png",
  "ttf",
  "wav",
  "webm",
  "webp",
  "woff",
  "woff2",
]);

export function isStaticAssetPath(pathname: string): boolean {
  const slash = pathname.lastIndexOf("/");
  const name = slash >= 0 ? pathname.slice(slash + 1) : pathname;
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return false;
  return STATIC_ASSET_EXTENSIONS.has(name.slice(dot + 1).toLowerCase());
}

/**
 * Apex → www on https without keeping the incoming port. A request on port 80
 * would otherwise redirect to https://www…:80.
 */
export function canonicalWwwUrl(input: URL): URL {
  const url = new URL(input.toString());
  url.protocol = "https:";
  url.hostname = CANONICAL_WWW_HOST;
  url.port = "";
  return url;
}

export function buildContentSecurityPolicy(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";

  const directives = [
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
  ];

  // On http://localhost this upgrades /_next scripts to https and the dev
  // server never answers them, so the page stays blank. Production still sends it.
  if (!isDev) directives.push("upgrade-insecure-requests");

  return directives.join("; ");
}

export function applyFixedSecurityHeaders(headers: Headers) {
  for (const header of FIXED_SECURITY_HEADERS) {
    headers.set(header.key, header.value);
  }
  // Prefer no public CORS on document responses when possible.
  headers.delete("Access-Control-Allow-Origin");
}

/** Fixed headers only. CSP is request-scoped and is not set here. */
export function applySecurityHeaders(headers: Headers) {
  applyFixedSecurityHeaders(headers);
}
