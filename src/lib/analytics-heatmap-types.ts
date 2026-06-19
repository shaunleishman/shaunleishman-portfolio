import { METRICS_HEATMAP_RETURN_PARAM } from "@/lib/metrics-heatmap-session";

export const HEATMAP_CELL_SIZE = 8;
export const SCROLL_BAND_COUNT = 20;
export const METRICS_PREVIEW_PARAM = "metrics_preview";
export const METRICS_HEATMAP_OVERLAY_PARAM = "metrics_heatmap";
export const METRICS_MAP_MODE_PARAM = "metrics_map_mode";

export type MapOverlayMode = "dwell" | "click";

export type DwellCell = {
  cellX: number;
  cellY: number;
  dwellMs: number;
};

export type HeatmapScrollBand = {
  band: number;
  label: string;
  count: number;
};

export type HeatmapSectionRow = {
  section: string;
  count: number;
};

export type PageHeatmapData = {
  path: string;
  pageWidth: number;
  pageHeight: number;
  totalDwellMs: number;
  totalSessions: number;
  cells: DwellCell[];
  maxDwellMs: number;
  scrollBands: HeatmapScrollBand[];
  sections: HeatmapSectionRow[];
};

export type ClickCell = {
  cellX: number;
  cellY: number;
  clicks: number;
};

export type PageClickmapData = {
  path: string;
  pageWidth: number;
  pageHeight: number;
  totalClicks: number;
  totalSessions: number;
  cells: ClickCell[];
  maxClicks: number;
};

export type HourlyActivity = {
  hour: string;
  count: number;
};

export type EventTypeBreakdown = {
  type: string;
  count: number;
};

export function buildHeatmapOverlayUrl(
  path: string,
  returnPath?: string,
  mode: MapOverlayMode = "dwell",
): string {
  const [base, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set(METRICS_HEATMAP_OVERLAY_PARAM, "1");
  if (mode === "click") {
    params.set(METRICS_MAP_MODE_PARAM, "click");
  }
  if (returnPath) {
    params.set(METRICS_HEATMAP_RETURN_PARAM, returnPath);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : `${base}?${METRICS_HEATMAP_OVERLAY_PARAM}=1`;
}

/** @deprecated Use buildHeatmapOverlayUrl */
export const buildMapOverlayUrl = buildHeatmapOverlayUrl;

export function removeHeatmapOverlayParam(searchParams: URLSearchParams): string {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(METRICS_HEATMAP_OVERLAY_PARAM);
  params.delete(METRICS_MAP_MODE_PARAM);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
