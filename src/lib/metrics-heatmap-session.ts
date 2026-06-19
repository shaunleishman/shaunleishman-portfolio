export const METRICS_HEATMAP_SESSION_KEY = "metrics_heatmap_overlay";
export const METRICS_HEATMAP_RETURN_KEY = "metrics_heatmap_return";
export const METRICS_HEATMAP_RETURN_PARAM = "metrics_return";
export const METRICS_MAP_MODE_KEY = "metrics_map_mode";

export type MapOverlayMode = "dwell" | "click";

export function isHeatmapOverlaySessionActive(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(METRICS_HEATMAP_SESSION_KEY) === "1";
}

export function getMapOverlayMode(): MapOverlayMode {
  if (typeof window === "undefined") return "dwell";
  return sessionStorage.getItem(METRICS_MAP_MODE_KEY) === "click" ? "click" : "dwell";
}

export function startHeatmapOverlaySession(returnPath: string, mode: MapOverlayMode = "dwell"): void {
  sessionStorage.setItem(METRICS_HEATMAP_SESSION_KEY, "1");
  sessionStorage.setItem(METRICS_HEATMAP_RETURN_KEY, returnPath);
  sessionStorage.setItem(METRICS_MAP_MODE_KEY, mode);
  window.dispatchEvent(new Event("metrics-heatmap-overlay-change"));
}

export function endHeatmapOverlaySession(): void {
  sessionStorage.removeItem(METRICS_HEATMAP_SESSION_KEY);
  sessionStorage.removeItem(METRICS_HEATMAP_RETURN_KEY);
  sessionStorage.removeItem(METRICS_MAP_MODE_KEY);
  window.dispatchEvent(new Event("metrics-heatmap-overlay-change"));
}

export function getHeatmapOverlayReturnPath(): string {
  if (typeof window === "undefined") return "/metrics";
  return sessionStorage.getItem(METRICS_HEATMAP_RETURN_KEY) ?? "/metrics";
}

export function resolveHeatmapReturnPath(
  returnParam: string | null,
  referrer: string,
): string {
  if (returnParam && returnParam.startsWith("/")) {
    return returnParam;
  }

  try {
    const refUrl = new URL(referrer);
    if (refUrl.origin === window.location.origin && refUrl.pathname.startsWith("/")) {
      return `${refUrl.pathname}${refUrl.search}`;
    }
  } catch {
    /* ignore invalid referrer */
  }

  return getHeatmapOverlayReturnPath();
}
