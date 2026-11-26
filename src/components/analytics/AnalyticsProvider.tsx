"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { useHeatmapOverlayActive } from "@/hooks/useHeatmapOverlayActive";
import { useMetricsTrackingExcluded } from "@/hooks/useMetricsTrackingExcluded";
import { scrollDepthReached, sectionCountsAsViewed } from "@/lib/analytics-beacons";
import {
  HEATMAP_CELL_SIZE,
  METRICS_PREVIEW_PARAM,
  SCROLL_BAND_COUNT,
} from "@/lib/analytics-heatmap-types";
import { isArticlePath } from "@/lib/analytics-paths";
import { getAnalyticsSessionId } from "@/lib/analytics-session";

function isTrackablePath(path: string): boolean {
  return !path.startsWith("/metrics") && !path.startsWith("/internal/");
}

async function track(
  type:
    | "pageview"
    | "scroll"
    | "section_view"
    | "exit"
    | "scroll_band"
    | "heatmap_dwell"
    | "click_map"
    | "page_meta",
  path: string,
  metadata?: Record<string, string | number>,
) {
  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return;
  if (!isTrackablePath(path) && type !== "exit") return;

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        type,
        path,
        metadata,
      }),
      keepalive: type === "exit" || type === "heatmap_dwell" || type === "click_map" || type === "page_meta",
    });
  } catch {
    // A failed beacon stays on the page. The next one can still send.
  }
}

async function trackBatch(
  path: string,
  events: { type: "heatmap_dwell"; metadata: Record<string, string | number> }[],
) {
  if (events.length === 0) return;

  const sessionId = getAnalyticsSessionId();
  if (!sessionId || !isTrackablePath(path)) return;

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path, events }),
      keepalive: true,
    });
  } catch {
    // A failed beacon stays on the page. The next one can still send.
  }
}

const MOUSE_SAMPLE_MS = 100;
const DWELL_FLUSH_MS = 4000;

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ready: consentReady, analytics: analyticsAllowed } = useConsent();
  const isPreview = searchParams.get(METRICS_PREVIEW_PARAM) === "1";
  const isHeatmapOverlay = useHeatmapOverlayActive();
  const metricsOwnerExcluded = useMetricsTrackingExcluded();
  const skipTracking =
    !consentReady ||
    !analyticsAllowed ||
    isPreview ||
    isHeatmapOverlay ||
    metricsOwnerExcluded !== false;

  const scrollTracked = useRef(new Set<number>());
  const scrollBandsTracked = useRef(new Set<number>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dwellAccumulator = useRef(new Map<string, number>());
  const activeCellRef = useRef<string | null>(null);
  const lastSampleRef = useRef<number>(0);
  const pageMetaSent = useRef(false);

  useEffect(() => {
    if (skipTracking || !pathname) return;

    // Keep the path from this effect. The address can already be the next page
    // by the time a beacon is sent, and cleanup must flush dwell for this one.
    const path = pathname;

    scrollTracked.current = new Set();
    scrollBandsTracked.current = new Set();
    dwellAccumulator.current = new Map();
    activeCellRef.current = null;
    lastSampleRef.current = 0;
    pageMetaSent.current = false;

    // Blog article pageviews are recorded once via /api/blog/engagement and
    // mirrored into the analytics store. Skip here so consenting visitors are
    // not counted twice.
    if (!isArticlePath(path)) {
      void track("pageview", path);
    }

    const sendPageMeta = () => {
      if (pageMetaSent.current) return;
      pageMetaSent.current = true;
      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;
      void track("page_meta", path, { pageWidth, pageHeight });
    };

    const flushDwell = () => {
      const entries = [...dwellAccumulator.current.entries()];
      if (entries.length === 0) return;

      dwellAccumulator.current.clear();

      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;

      void trackBatch(
        path,
        entries.map(([key, dwellMs]) => {
          const [cellX, cellY] = key.split(":").map(Number);
          return {
            type: "heatmap_dwell" as const,
            metadata: { cellX, cellY, dwellMs, pageWidth, pageHeight },
          };
        }),
      );
    };

    const creditActiveCell = () => {
      const key = activeCellRef.current;
      if (!key) return;
      dwellAccumulator.current.set(
        key,
        (dwellAccumulator.current.get(key) ?? 0) + MOUSE_SAMPLE_MS,
      );
    };

    const sampleDwell = (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastSampleRef.current < MOUSE_SAMPLE_MS) return;
      lastSampleRef.current = now;

      const x = clientX + window.scrollX;
      const y = clientY + window.scrollY;
      const cellX = Math.floor(x / HEATMAP_CELL_SIZE);
      const cellY = Math.floor(y / HEATMAP_CELL_SIZE);
      const key = `${cellX}:${cellY}`;

      if (activeCellRef.current && activeCellRef.current !== key) {
        dwellAccumulator.current.set(
          activeCellRef.current,
          (dwellAccumulator.current.get(activeCellRef.current) ?? 0) + MOUSE_SAMPLE_MS,
        );
      } else if (activeCellRef.current === key) {
        dwellAccumulator.current.set(key, (dwellAccumulator.current.get(key) ?? 0) + MOUSE_SAMPLE_MS);
      }

      activeCellRef.current = key;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;

      ([25, 50, 75, 100] as const).forEach((milestone) => {
        if (!scrollDepthReached(milestone, window.scrollY, maxScroll)) return;
        if (scrollTracked.current.has(milestone)) return;
        scrollTracked.current.add(milestone);
        void track("scroll", path, { depth: `${milestone}%` });
      });

      const band = Math.min(
        SCROLL_BAND_COUNT - 1,
        Math.max(0, Math.floor((scrollPercent / 100) * SCROLL_BAND_COUNT)),
      );
      if (!scrollBandsTracked.current.has(band)) {
        scrollBandsTracked.current.add(band);
        void track("scroll_band", path, { band });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      sampleDwell(event.clientX, event.clientY);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-analytics-no-click-map]")) return;

      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;
      const cellX = Math.floor(x / HEATMAP_CELL_SIZE);
      const cellY = Math.floor(y / HEATMAP_CELL_SIZE);
      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;

      void track("click_map", path, { cellX, cellY, pageWidth, pageHeight });
    };

    const handleMouseLeave = () => {
      creditActiveCell();
      activeCellRef.current = null;
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      creditActiveCell();
      activeCellRef.current = null;
      flushDwell();
      // A page kept in the back-forward cache has not been left.
      if (event.persisted) return;
      void track("exit", path);
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "hidden") return;
      creditActiveCell();
      activeCellRef.current = null;
      flushDwell();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, { capture: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibility);
    handleScroll();

    const attachMouseMove = () => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    };

    const idleHandle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(attachMouseMove, { timeout: 4000 })
        : window.setTimeout(attachMouseMove, 2000);

    const flushInterval = window.setInterval(flushDwell, DWELL_FLUSH_MS);

    const metaTimeout = window.setTimeout(sendPageMeta, 800);

    const seenSections = new Set<string>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !sectionCountsAsViewed({
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              intersectionHeight: entry.intersectionRect.height,
              viewportHeight: entry.rootBounds?.height ?? window.innerHeight,
              sectionHeight: entry.boundingClientRect.height,
            })
          ) {
            return;
          }
          const section = entry.target.getAttribute("data-analytics-section");
          if (!section) return;
          observerRef.current?.unobserve(entry.target);
          if (seenSections.has(section)) return;
          seenSections.add(section);
          void track("section_view", path, { section });
        });
      },
      // 0 lets a section taller than the screen report before a 0.4 ratio is possible.
      { threshold: [0, 0.4] },
    );

    document.querySelectorAll("[data-analytics-section]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick, { capture: true });
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle as number);
      } else {
        window.clearTimeout(idleHandle as number);
      }
      observerRef.current?.disconnect();
      window.clearInterval(flushInterval);
      window.clearTimeout(metaTimeout);
      creditActiveCell();
      activeCellRef.current = null;
      flushDwell();
    };
  }, [pathname, skipTracking]);

  return <>{children}</>;
}
