import crypto from "crypto";
import { METRICS_COOKIE_MAX_AGE_SECONDS, getMetricsSecret } from "@/lib/metrics-config";

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createMetricsSessionToken(): string | null {
  const secret = getMetricsSecret();
  if (!secret) return null;

  const issuedAt = Date.now().toString();
  const signature = signPayload(issuedAt, secret);
  return `${issuedAt}.${signature}`;
}

export function verifyMetricsSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  const secret = getMetricsSecret();
  if (!secret) return false;

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const issuedAtMs = Number(issuedAt);
  if (!Number.isFinite(issuedAtMs)) return false;

  const ageMs = Date.now() - issuedAtMs;
  if (ageMs < 0 || ageMs > METRICS_COOKIE_MAX_AGE_SECONDS * 1000) return false;

  const expected = signPayload(issuedAt, secret);
  if (expected.length !== signature.length) return false;

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function verifyMetricsPassword(password: string): boolean {
  const configured = process.env.METRICS_PASSWORD?.trim() || process.env.ADMIN_PASSWORD?.trim();
  if (!configured) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(configured);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
