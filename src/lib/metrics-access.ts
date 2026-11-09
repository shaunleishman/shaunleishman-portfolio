import { getMetricsSecret } from "@/lib/metrics-config";

export const METRICS_ACCESS_HEADER = "x-metrics-access";
/** Same-process ticket for the second middleware pass. Never the CSP nonce, and never set on the response. */
export const METRICS_REWRITE_HEADER = "x-metrics-rewrite";

const REWRITE_TTL_MS = 10_000;

type IssuedRewrite = { expiresAt: number };
const issuedRewrites = new Map<string, IssuedRewrite>();

function pruneIssuedRewrites(now: number) {
  for (const [id, issued] of issuedRewrites) {
    if (issued.expiresAt <= now) issuedRewrites.delete(id);
  }
}

export function rememberMetricsRewrite(id: string, now = Date.now()) {
  pruneIssuedRewrites(now);
  issuedRewrites.set(id, { expiresAt: now + REWRITE_TTL_MS });
}

export function consumeMetricsRewrite(id: string | null, now = Date.now()): boolean {
  if (!id) return false;
  pruneIssuedRewrites(now);
  const issued = issuedRewrites.get(id);
  if (!issued) return false;
  issuedRewrites.delete(id);
  return true;
}

function bytesToHex(bytes: ArrayBuffer): string {
  let hex = "";
  for (const byte of new Uint8Array(bytes)) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function signMetricsAccess(secret: string, nonce: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`metrics-access:${nonce}`),
  );
  return bytesToHex(signature);
}

/** Proof the metrics layout can check. Without a signing secret this is the literal marker middleware already used. */
export async function createMetricsAccessProof(nonce: string): Promise<string> {
  const secret = getMetricsSecret();
  if (!secret) return "1";
  return signMetricsAccess(secret, nonce);
}

/**
 * True when this /metrics request is the follow-up to our own rewrite.
 * A client-supplied `x-metrics-access: 1` is not enough: Next re-enters
 * middleware on the rewritten path, and that header is present either way.
 */
export async function isMetricsRewriteContinuation(input: {
  nonce: string | null;
  proof: string | null;
  rewriteId: string | null;
}): Promise<boolean> {
  if (!input.nonce || !input.proof) return false;

  const secret = getMetricsSecret();
  if (secret) {
    const expected = await signMetricsAccess(secret, input.nonce);
    return safeEqual(input.proof, expected);
  }

  return input.proof === "1" && consumeMetricsRewrite(input.rewriteId);
}

export async function hasMetricsPageAccess(headerList: {
  get(name: string): string | null;
}): Promise<boolean> {
  const proof = headerList.get(METRICS_ACCESS_HEADER);
  const nonce = headerList.get("x-nonce");
  if (!proof || !nonce) return false;

  const secret = getMetricsSecret();
  if (!secret) return proof === "1";

  const expected = await signMetricsAccess(secret, nonce);
  return safeEqual(proof, expected);
}
