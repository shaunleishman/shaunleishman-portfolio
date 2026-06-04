"use client";

import { useCallback, useEffect, useState } from "react";
import {
  buildHeatmapOverlayUrl,
  type PageHeatmapData,
} from "@/lib/analytics-heatmap-types";
import type { AnalyticsPeriod } from "@/lib/analytics-period";
import { dwellColor, formatDwell } from "@/lib/heatmap-visual";
import { startHeatmapOverlaySession } from "@/lib/metrics-heatmap-session";

type HeatmapResponse = {
  paths: string[];
  heatmap: PageHeatmapData | null;
};

export function MetricsHeatmapViewer({ path, period = "all" }: { path: string; period?: AnalyticsPeriod }) {
  const [heatmap, setHeatmap] = useState<PageHeatmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadHeatmap = useCallback(async (pagePath: string, periodFilter: AnalyticsPeriod) => {
    setLoading(true);

    const params = new URLSearchParams({ path: pagePath });
    if (periodFilter !== "all") params.set("period", periodFilter);

    const res = await fetch(`/api/metrics/heatmap?${params.toString()}`, {
      credentials: "include",
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const json = (await res.json()) as HeatmapResponse;
    setHeatmap(json.heatmap);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadHeatmap(path, period);
  }, [loadHeatmap, path, period]);

  const metricsReturnPath =
    typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "";
  const overlayUrl = buildHeatmapOverlayUrl(path, metricsReturnPath || undefined);

  return (
    <section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-h4 font-semibold mb-1">Mouse dwell heatmap</h2>
          <p className="text-body-sm text-[var(--color-text-muted)] max-w-2xl">
            Open the live page with an 8×8px dwell grid overlaid on top. Browse other pages while the overlay stays on;
            exit when you are done to return to metrics.
          </p>
        </div>
        <a
          href={overlayUrl}
          onClick={() => {
            if (typeof window !== "undefined") {
              startHeatmapOverlaySession(`${window.location.pathname}${window.location.search}`);
            }
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-body-sm font-medium text-white min-h-[44px] hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Open live overlay
        </a>
      </div>

      {loading ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading heatmap…</p>
      ) : !heatmap ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">
          No heatmap data for this page yet. Browse the site first, then open the overlay to inspect dwell patterns.
        </p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-4 text-body-sm text-[var(--color-text-muted)]">
            <span>
              <strong className="text-[var(--color-text-primary)]">{formatDwell(heatmap.totalDwellMs)}</strong>{" "}
              total dwell
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{heatmap.totalSessions}</strong> sessions
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{heatmap.cells.length}</strong> active cells
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">
                {heatmap.pageWidth}×{heatmap.pageHeight}px
              </strong>{" "}
              recorded size
            </span>
          </div>

          <div className="mb-6 flex items-center gap-2 text-body-sm text-[var(--color-text-muted)]">
            <span>Low dwell</span>
            <div className="flex h-3 w-32 overflow-hidden rounded-full">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
                <div key={v} className="flex-1" style={{ backgroundColor: dwellColor(v) }} />
              ))}
            </div>
            <span>High dwell</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-body-sm font-semibold text-[var(--color-text-primary)]">Scroll depth</h3>
              <div className="flex min-h-[12rem] flex-col gap-1 rounded-xl border border-[var(--color-border)] bg-neutral-50 p-2">
                {heatmap.scrollBands.map((band) => {
                  const maxScroll = Math.max(...heatmap.scrollBands.map((b) => b.count), 1);
                  const width = band.count > 0 ? 20 + (band.count / maxScroll) * 80 : 0;
                  return (
                    <div key={band.band} className="grid grid-cols-[3rem_1fr] items-center gap-2">
                      <span className="text-[0.65rem] tabular-nums text-[var(--color-text-muted)]">
                        {band.label}
                      </span>
                      <div className="h-2 rounded-full bg-neutral-200/80">
                        <div
                          className="h-2 rounded-full bg-[var(--color-accent)]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {heatmap.sections.length > 0 && (
              <div>
                <h3 className="mb-3 text-body-sm font-semibold text-[var(--color-text-primary)]">
                  Section attention
                </h3>
                <ul className="space-y-2">
                  {heatmap.sections.map((section) => {
                    const maxSection = Math.max(...heatmap.sections.map((s) => s.count), 1);
                    const width = 12 + (section.count / maxSection) * 88;
                    return (
                      <li key={section.section}>
                        <div className="mb-1 flex items-center justify-between gap-3 text-body-sm">
                          <span className="font-medium text-[var(--color-text-primary)]">{section.section}</span>
                          <span className="tabular-nums text-[var(--color-text-muted)]">{section.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-neutral-100">
                          <div
                            className="h-2 rounded-full bg-teal-600/80"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
