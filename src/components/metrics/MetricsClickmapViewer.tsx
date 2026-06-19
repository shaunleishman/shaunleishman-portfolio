"use client";

import { useCallback, useEffect, useState } from "react";
import {
  buildHeatmapOverlayUrl,
  type PageClickmapData,
} from "@/lib/analytics-heatmap-types";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { clickColor } from "@/lib/heatmap-visual";
import { startHeatmapOverlaySession } from "@/lib/metrics-heatmap-session";

type ClickmapResponse = {
  paths: string[];
  clickmap: PageClickmapData | null;
};

export function MetricsClickmapViewer({ path, period = "all" }: { path: string; period?: AnalyticsPeriod }) {
  const [clickmap, setClickmap] = useState<PageClickmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadClickmap = useCallback(async (pagePath: string, periodFilter: AnalyticsPeriod) => {
    setLoading(true);

    const params = new URLSearchParams({ path: pagePath });
    if (periodFilter !== "all") params.set("period", periodFilter);

    const res = await fetch(`/api/metrics/clickmap?${params.toString()}`, {
      credentials: "include",
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const json = (await res.json()) as ClickmapResponse;
    setClickmap(json.clickmap);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadClickmap(path, period);
  }, [loadClickmap, path, period]);

  const metricsReturnPath =
    typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "";
  const overlayUrl = buildHeatmapOverlayUrl(path, metricsReturnPath || undefined, "click");

  const topCells = clickmap?.cells.slice(0, 12) ?? [];

  return (
    <section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-h4 font-semibold mb-1">Click map</h2>
          <p className="text-body-sm text-[var(--color-text-muted)] max-w-2xl">
            Open the live page with an 8×8px click grid overlaid on top. Every click is recorded on the same grid as
            the dwell heatmap.
          </p>
        </div>
        <a
          href={overlayUrl}
          onClick={() => {
            if (typeof window !== "undefined") {
              startHeatmapOverlaySession(
                `${window.location.pathname}${window.location.search}`,
                "click",
              );
            }
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-body-sm font-medium text-white min-h-[44px] hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Open live overlay
        </a>
      </div>

      {loading ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading click map…</p>
      ) : !clickmap || clickmap.totalClicks === 0 ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">
          No click data for this page yet. Browse the site first, then open the overlay to inspect click patterns.
        </p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-4 text-body-sm text-[var(--color-text-muted)]">
            <span>
              <strong className="text-[var(--color-text-primary)]">{clickmap.totalClicks}</strong> total clicks
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{clickmap.totalSessions}</strong> sessions
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{clickmap.cells.length}</strong> clicked cells
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">
                {clickmap.pageWidth}×{clickmap.pageHeight}px
              </strong>{" "}
              recorded size
            </span>
          </div>

          <div className="mb-6 flex items-center gap-2 text-body-sm text-[var(--color-text-muted)]">
            <span>Few clicks</span>
            <div className="flex h-3 w-32 overflow-hidden rounded-full">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
                <div key={v} className="flex-1" style={{ backgroundColor: clickColor(v) }} />
              ))}
            </div>
            <span>Many clicks</span>
          </div>

          {topCells.length > 0 && (
            <div>
              <h3 className="mb-3 text-body-sm font-semibold text-[var(--color-text-primary)]">
                Top clicked cells
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]">
                      <th scope="col" className="px-4 py-3 text-left font-semibold">
                        Grid cell
                      </th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold">
                        Position
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">
                        Clicks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCells.map((cell) => (
                      <tr key={`${cell.cellX}-${cell.cellY}`} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                          {cell.cellX}, {cell.cellY}
                        </td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                          {cell.cellX * 8}px, {cell.cellY * 8}px
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-primary)]">
                          {cell.clicks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
