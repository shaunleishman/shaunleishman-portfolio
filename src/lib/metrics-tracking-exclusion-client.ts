export const METRICS_TRACKING_EXCLUSION_EVENT = "metrics-tracking-exclusion-changed";

let cachedExcluded: boolean | null = null;
let inflight: Promise<boolean> | null = null;

export async function isMetricsTrackingExcluded(force = false): Promise<boolean> {
  if (!force && cachedExcluded !== null) return cachedExcluded;
  if (inflight) return inflight;

  inflight = fetch("/api/metrics/auth", { credentials: "include" })
    .then(async (res) => {
      const json = (await res.json()) as { authenticated?: boolean };
      cachedExcluded = json.authenticated === true;
      return cachedExcluded;
    })
    .catch(() => {
      cachedExcluded = false;
      return false;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function invalidateMetricsTrackingExclusionCache() {
  if (typeof window === "undefined") return;
  cachedExcluded = null;
  window.dispatchEvent(new Event(METRICS_TRACKING_EXCLUSION_EVENT));
}

export function getCachedMetricsTrackingExcluded(): boolean {
  return cachedExcluded === true;
}
