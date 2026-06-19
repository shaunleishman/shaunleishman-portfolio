"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useHeatmapOverlayActive, useMapOverlayMode } from "@/hooks/useHeatmapOverlayActive";
import {
  HEATMAP_CELL_SIZE,
  METRICS_HEATMAP_OVERLAY_PARAM,
  METRICS_MAP_MODE_PARAM,
  removeHeatmapOverlayParam,
  type PageClickmapData,
  type PageHeatmapData,
} from "@/lib/analytics-heatmap-types";
import { clickColor, dwellColor, formatDwell } from "@/lib/heatmap-visual";
import {
  endHeatmapOverlaySession,
  getHeatmapOverlayReturnPath,
  METRICS_HEATMAP_RETURN_PARAM,
  resolveHeatmapReturnPath,
  startHeatmapOverlaySession,
} from "@/lib/metrics-heatmap-session";

type HeatmapResponse = {
  heatmap: PageHeatmapData | null;
};

type ClickmapResponse = {
  clickmap: PageClickmapData | null;
};

export function MetricsHeatmapOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const overlayActive = useHeatmapOverlayActive();
  const mapMode = useMapOverlayMode();
  const urlStartsOverlay = searchParams.get(METRICS_HEATMAP_OVERLAY_PARAM) === "1";

  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [heatmap, setHeatmap] = useState<PageHeatmapData | null>(null);
  const [clickmap, setClickmap] = useState<PageClickmapData | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [docSize, setDocSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!urlStartsOverlay) return;

    const returnPath = resolveHeatmapReturnPath(
      searchParams.get(METRICS_HEATMAP_RETURN_PARAM),
      document.referrer,
    );
    const mode = searchParams.get(METRICS_MAP_MODE_PARAM) === "click" ? "click" : "dwell";
    startHeatmapOverlaySession(returnPath, mode);

    const qs = removeHeatmapOverlayParam(searchParams);
    router.replace(`${pathname}${qs}`, { scroll: false });
  }, [urlStartsOverlay, pathname, router, searchParams]);

  useEffect(() => {
    if (!overlayActive) {
      setAuthorized(false);
      setHeatmap(null);
      setClickmap(null);
      return;
    }

    let cancelled = false;

    void (async () => {
      const endpoint =
        mapMode === "click"
          ? `/api/metrics/clickmap?path=${encodeURIComponent(pathname)}`
          : `/api/metrics/heatmap?path=${encodeURIComponent(pathname)}`;
      const res = await fetch(endpoint, {
        credentials: "include",
      });

      if (cancelled) return;

      if (!res.ok) {
        setAuthorized(false);
        setHeatmap(null);
        setClickmap(null);
        endHeatmapOverlaySession();
        return;
      }

      if (mapMode === "click") {
        const json = (await res.json()) as ClickmapResponse;
        setAuthorized(true);
        setClickmap(json.clickmap);
        setHeatmap(null);
      } else {
        const json = (await res.json()) as HeatmapResponse;
        setAuthorized(true);
        setHeatmap(json.heatmap);
        setClickmap(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [overlayActive, pathname, mapMode]);

  const syncLayout = useCallback(() => {
    setScrollY(window.scrollY);
    setDocSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
    });
  }, []);

  useEffect(() => {
    if (!overlayActive || !authorized) return;

    syncLayout();

    window.addEventListener("scroll", syncLayout, { passive: true });
    window.addEventListener("resize", syncLayout);

    const observer = new ResizeObserver(syncLayout);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", syncLayout);
      window.removeEventListener("resize", syncLayout);
      observer.disconnect();
    };
  }, [authorized, overlayActive, syncLayout, pathname]);

  const exitOverlay = useCallback(() => {
    const returnPath = getHeatmapOverlayReturnPath();
    endHeatmapOverlaySession();
    router.push(returnPath);
  }, [router]);

  if (!mounted || !overlayActive || !authorized) {
    return null;
  }

  const maxDwellMs = heatmap?.maxDwellMs ?? 1;
  const maxClicks = clickmap?.maxClicks ?? 1;
  const refWidth = heatmap?.pageWidth ?? clickmap?.pageWidth ?? docSize.width;
  const refHeight = heatmap?.pageHeight ?? clickmap?.pageHeight ?? docSize.height;
  const scale = refWidth > 0 ? docSize.width / refWidth : 1;
  const innerHeight = scale > 0 ? docSize.height / scale : docSize.height;

  return createPortal(
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
        aria-hidden
      >
        <div
          className="relative"
          style={{
            width: docSize.width,
            height: docSize.height,
            transform: `translateY(${-scrollY}px)`,
          }}
        >
          <div
            className="relative"
            style={{
              width: refWidth,
              height: Math.max(innerHeight, refHeight),
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {showGrid && (
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)
                `,
                  backgroundSize: `${HEATMAP_CELL_SIZE}px ${HEATMAP_CELL_SIZE}px`,
                }}
              />
            )}

            {mapMode === "dwell"
              ? heatmap?.cells.map((cell) => {
                  const intensity = cell.dwellMs / maxDwellMs;
                  return (
                    <div
                      key={`${cell.cellX}-${cell.cellY}`}
                      className="absolute"
                      style={{
                        left: cell.cellX * HEATMAP_CELL_SIZE,
                        top: cell.cellY * HEATMAP_CELL_SIZE,
                        width: HEATMAP_CELL_SIZE,
                        height: HEATMAP_CELL_SIZE,
                        backgroundColor: dwellColor(intensity),
                      }}
                      title={formatDwell(cell.dwellMs)}
                    />
                  );
                })
              : clickmap?.cells.map((cell) => {
                  const intensity = cell.clicks / maxClicks;
                  return (
                    <div
                      key={`${cell.cellX}-${cell.cellY}`}
                      className="absolute"
                      style={{
                        left: cell.cellX * HEATMAP_CELL_SIZE,
                        top: cell.cellY * HEATMAP_CELL_SIZE,
                        width: HEATMAP_CELL_SIZE,
                        height: HEATMAP_CELL_SIZE,
                        backgroundColor: clickColor(intensity),
                      }}
                      title={`${cell.clicks} clicks`}
                    />
                  );
                })}
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-4 right-4 z-[9999] w-[min(100vw-2rem,22rem)] rounded-2xl border border-neutral-700 bg-neutral-900/95 p-4 text-white shadow-2xl backdrop-blur-sm"
        data-analytics-no-click-map
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Private {mapMode === "click" ? "click map" : "heatmap"}
            </p>
            <p className="text-sm font-medium">{pathname}</p>
          </div>
          <button
            type="button"
            onClick={exitOverlay}
            className="rounded-lg border border-neutral-600 px-2.5 py-1 text-xs font-medium text-neutral-200 hover:bg-neutral-800"
          >
            Exit
          </button>
        </div>

        {mapMode === "click" ? (
          clickmap && clickmap.totalClicks > 0 ? (
            <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-neutral-300">
              <span>{clickmap.totalClicks} clicks</span>
              <span>{clickmap.totalSessions} sessions</span>
              <span>{clickmap.cells.length} clicked cells</span>
              <span>{Math.round(scale * 100)}% scale</span>
            </div>
          ) : (
            <p className="mb-3 text-xs text-neutral-400">No click data for this page yet.</p>
          )
        ) : heatmap ? (
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-neutral-300">
            <span>{formatDwell(heatmap.totalDwellMs)} dwell</span>
            <span>{heatmap.totalSessions} sessions</span>
            <span>{heatmap.cells.length} hot cells</span>
            <span>{Math.round(scale * 100)}% scale</span>
          </div>
        ) : (
          <p className="mb-3 text-xs text-neutral-400">No dwell data for this page yet.</p>
        )}

        <div className="mb-3 flex items-center gap-2 text-xs text-neutral-300">
          <span>{mapMode === "click" ? "Few" : "Low"}</span>
          <div className="flex h-2.5 flex-1 overflow-hidden rounded-full">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
              <div
                key={v}
                className="flex-1"
                style={{ backgroundColor: mapMode === "click" ? clickColor(v) : dwellColor(v) }}
              />
            ))}
          </div>
          <span>{mapMode === "click" ? "Many" : "High"}</span>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="rounded border-neutral-600"
          />
          Show 8×8px grid
        </label>

        <p className="mt-3 text-[0.65rem] leading-relaxed text-neutral-500">
          Browse the site normally; the overlay stays on until you exit and returns you to metrics.
        </p>
      </div>
    </>,
    document.body,
  );
}
