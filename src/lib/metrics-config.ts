/** Obscure dashboard path — set METRICS_PATH in env before deploying. */
export const DEFAULT_METRICS_PATH = "/internal/site-insights-k9m2";
export const DEFAULT_METRICS_GATE_KEY = "insights";

export function getMetricsPath(): string {
  const path = process.env.METRICS_PATH?.trim() || DEFAULT_METRICS_PATH;
  if (!path.startsWith("/") || path.includes(" ")) {
    return DEFAULT_METRICS_PATH;
  }
  return path.replace(/\/+$/, "") || DEFAULT_METRICS_PATH;
}

/** Secret phrase typed on the public site to open the metrics dashboard. */
export function getMetricsGateKey(): string {
  const key = process.env.METRICS_GATE_KEY?.trim() || DEFAULT_METRICS_GATE_KEY;
  return key.toLowerCase();
}

export function getMetricsPassword(): string | undefined {
  return process.env.METRICS_PASSWORD?.trim() || process.env.ADMIN_PASSWORD?.trim() || undefined;
}

export function getMetricsSecret(): string | undefined {
  return process.env.METRICS_SECRET?.trim() || getMetricsPassword();
}

export const METRICS_COOKIE_NAME = "metrics_session";
export const METRICS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
