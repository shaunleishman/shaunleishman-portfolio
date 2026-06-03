"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  HEATMAP_CELL_SIZE,
  METRICS_HEATMAP_OVERLAY_PARAM,
  removeHeatmapOverlayParam,
  type PageHeatmapData,
} from "@/lib/analytics-heatmap-types";
import { dwellColor, formatDwell } from "@/lib/heatmap-visual";

type HeatmapResponse = {
  heatmap: PageHeatmapData | null;
};

export function MetricsHeatmapOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const overlayRequested = searchParams.get(METRICS_HEATMAP_OVERLAY_PARAM) === "1";

  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [heatmap, setHeatmap] = useState<PageHeatmapData | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [docSize, setDocSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!overlayRequested) {
      setAuthorized(false);
      setHeatmap(null);
      return;
    }

    let cancelled = false;

    void (async () => {
      const res = await fetch(`/api/metrics/heatmap?path=${encodeURIComponent(pathname)}`, {
        credentials: "include",
      });

      if (cancelled) return;

      if (!res.ok) {
        setAuthorized(false);
        setHeatmap(null);
        return;
      }

      const json = (await res.json()) as HeatmapResponse;
      setAuthorized(true);
      setHeatmap(json.heatmap);
    })();

    return () => {
      cancelled = true;
    };
  }, [overlayRequested, pathname]);

  const syncLayout = useCallback(() => {
    setScrollY(window.scrollY);
    setDocSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
    });
  }, []);

  useEffect(() => {
    if (!overlayRequested || !authorized) return;

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
  }, [authorized, overlayRequested, syncLayout, pathname]);

  const exitOverlay = useCallback(() => {
    const qs = removeHeatmapOverlayParam(searchParams);
    router.replace(`${pathname}${qs}`);
  }, [pathname, router, searchParams]);

  if (!mounted || !overlayRequested || !authorized) {
    return null;
  }

  const maxDwellMs = heatmap?.maxDwellMs ?? 1;
  const refWidth = heatmap?.pageWidth ?? docSize.width;
  const refHeight = heatmap?.pageHeight ?? docSize.height;
  const scaleX = refWidth > 0 ? docSize.width / refWidth : 1;
  const scaleY = refHeight > 0 ? docSize.height / refHeight : 1;
  const cellSizeX = HEATMAP_CELL_SIZE * scaleX;
  const cellSizeY = HEATMAP_CELL_SIZE * scaleY;

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
          {showGrid && (
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)
                `,
                backgroundSize: `${cellSizeX}px ${cellSizeY}px`,
              }}
            />
          )}

          {heatmap?.cells.map((cell) => {
            const intensity = cell.dwellMs / maxDwellMs;
            return (
              <div
                key={`${cell.cellX}-${cell.cellY}`}
                className="absolute"
                style={{
                  left: cell.cellX * cellSizeX,
                  top: cell.cellY * cellSizeY,
                  width: cellSizeX,
                  height: cellSizeY,
                  backgroundColor: dwellColor(intensity),
                }}
                title={formatDwell(cell.dwellMs)}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-[9999] w-[min(100vw-2rem,22rem)] rounded-2xl border border-neutral-700 bg-neutral-900/95 p-4 text-white shadow-2xl backdrop-blur-sm">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Private heatmap</p>
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

        {heatmap ? (
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-neutral-300">
            <span>{formatDwell(heatmap.totalDwellMs)} dwell</span>
            <span>{heatmap.totalSessions} sessions</span>
            <span>{heatmap.cells.length} hot cells</span>
            <span>{Math.round(scaleX * 100)}% width scale</span>
          </div>
        ) : (
          <p className="mb-3 text-xs text-neutral-400">No dwell data for this page yet.</p>
        )}

        <div className="mb-3 flex items-center gap-2 text-xs text-neutral-300">
          <span>Low</span>
          <div className="flex h-2.5 flex-1 overflow-hidden rounded-full">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
              <div key={v} className="flex-1" style={{ backgroundColor: dwellColor(v) }} />
            ))}
          </div>
          <span>High</span>
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
          Only visible to you while signed in to metrics. Scroll the page normally — the overlay tracks with content.
        </p>
      </div>
    </>,
    document.body,
  );
}
