import { readEvents, type AnalyticsEvent } from "@/lib/analytics";
import {
  HEATMAP_CELL_SIZE,
  SCROLL_BAND_COUNT,
  type DwellCell,
  type EventTypeBreakdown,
  type HourlyActivity,
  type PageHeatmapData,
} from "@/lib/analytics-heatmap-types";

export {
  HEATMAP_CELL_SIZE,
  SCROLL_BAND_COUNT,
  METRICS_PREVIEW_PARAM,
  type DwellCell,
  type EventTypeBreakdown,
  type HourlyActivity,
  type HeatmapScrollBand,
  type HeatmapSectionRow,
  type PageHeatmapData,
} from "@/lib/analytics-heatmap-types";

export function getHeatmapPagePaths(): string[] {
  const paths = new Set<string>();
  readEvents().forEach((event) => {
    if (event.type === "pageview" || event.type === "heatmap_dwell" || event.type === "section_view") {
      paths.add(event.path);
    }
  });
  return [...paths].sort((a, b) => a.localeCompare(b));
}

function filterByPath(events: AnalyticsEvent[], path?: string | null) {
  if (!path) return events;
  return events.filter((event) => event.path === path);
}

export function getPageHeatmapData(path: string): PageHeatmapData {
  const events = readEvents().filter((event) => event.path === path);

  const dwellMap = new Map<string, number>();
  const sessions = new Set<string>();
  let totalDwellMs = 0;
  let pageWidth = 1280;
  let pageHeight = 0;
  let maxCellX = 0;
  let maxCellY = 0;

  events.forEach((event) => {
    if (event.type === "page_meta") {
      const w = Number(event.metadata?.pageWidth);
      const h = Number(event.metadata?.pageHeight);
      if (Number.isFinite(w) && w > 0) pageWidth = w;
      if (Number.isFinite(h) && h > 0) pageHeight = Math.max(pageHeight, h);
    }
  });

  events
    .filter((event) => event.type === "heatmap_dwell")
    .forEach((event) => {
      sessions.add(event.sessionId);
      const cellX = Number(event.metadata?.cellX);
      const cellY = Number(event.metadata?.cellY);
      const dwellMs = Number(event.metadata?.dwellMs);
      if (!Number.isFinite(cellX) || !Number.isFinite(cellY) || !Number.isFinite(dwellMs) || dwellMs <= 0) {
        return;
      }

      const key = `${cellX}:${cellY}`;
      dwellMap.set(key, (dwellMap.get(key) ?? 0) + dwellMs);
      totalDwellMs += dwellMs;
      maxCellX = Math.max(maxCellX, cellX);
      maxCellY = Math.max(maxCellY, cellY);

      const w = Number(event.metadata?.pageWidth);
      const h = Number(event.metadata?.pageHeight);
      if (Number.isFinite(w) && w > 0) pageWidth = w;
      if (Number.isFinite(h) && h > 0) pageHeight = Math.max(pageHeight, h);
    });

  if (pageHeight <= 0) {
    pageHeight = (maxCellY + 1) * HEATMAP_CELL_SIZE;
  }

  const bandCounts = new Map<number, number>();
  events
    .filter((event) => event.type === "scroll_band")
    .forEach((event) => {
      const band = Number(event.metadata?.band);
      if (!Number.isFinite(band)) return;
      bandCounts.set(band, (bandCounts.get(band) ?? 0) + 1);
    });

  const sectionCounts = new Map<string, number>();
  events
    .filter((event) => event.type === "section_view")
    .forEach((event) => {
      const section = String(event.metadata?.section ?? "unknown");
      sectionCounts.set(section, (sectionCounts.get(section) ?? 0) + 1);
    });

  const cells: DwellCell[] = [...dwellMap.entries()].map(([key, dwellMs]) => {
    const [cellX, cellY] = key.split(":").map(Number);
    return { cellX, cellY, dwellMs };
  });

  const maxDwellMs = cells.reduce((max, cell) => Math.max(max, cell.dwellMs), 0);

  const scrollBands = Array.from({ length: SCROLL_BAND_COUNT }, (_, band) => {
    const start = Math.round((band / SCROLL_BAND_COUNT) * 100);
    const end = Math.round(((band + 1) / SCROLL_BAND_COUNT) * 100);
    return {
      band,
      label: `${start}–${end}%`,
      count: bandCounts.get(band) ?? 0,
    };
  });

  return {
    path,
    pageWidth,
    pageHeight,
    totalDwellMs,
    totalSessions: sessions.size,
    cells,
    maxDwellMs,
    scrollBands,
    sections: [...sectionCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([section, count]) => ({ section, count })),
  };
}

export function getHourlyActivity(path?: string | null): HourlyActivity[] {
  const events = filterByPath(readEvents(), path);
  const counts = new Map<string, number>();

  events.forEach((event) => {
    const hour = event.timestamp.slice(0, 13);
    counts.set(hour, (counts.get(hour) ?? 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-48)
    .map(([hour, count]) => ({ hour: `${hour}:00`, count }));
}

export function getEventTypeBreakdown(path?: string | null): EventTypeBreakdown[] {
  const events = filterByPath(readEvents(), path);
  const counts = new Map<string, number>();

  events.forEach((event) => {
    counts.set(event.type, (counts.get(event.type) ?? 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));
}

export function getTotalDwellMs(path?: string | null): number {
  return filterByPath(readEvents(), path)
    .filter((event) => event.type === "heatmap_dwell")
    .reduce((sum, event) => sum + Number(event.metadata?.dwellMs ?? 0), 0);
}
