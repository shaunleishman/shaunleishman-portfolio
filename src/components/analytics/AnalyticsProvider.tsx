"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { useHeatmapOverlayActive } from "@/hooks/useHeatmapOverlayActive";
import { useMetricsTrackingExcluded } from "@/hooks/useMetricsTrackingExcluded";
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

type TrackType =
  | "pageview"
  | "scroll"
  | "section_view"
  | "exit"
  | "scroll_band"
  | "heatmap_dwell"
  | "click_map"
  | "page_meta";

async function postAnalytics(body: unknown, keepalive: boolean) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive,
    });
  } catch {
    // Collection is best-effort. A failed beacon must not reject the caller.
  }
}

async function track(
  path: string,
  type: TrackType,
  metadata?: Record<string, string | number>,
) {
  const sessionId = getAnalyticsSessionId();
  if (!sessionId) return;

  // Path is the page this listener was mounted for. Reading window.location
  // at send time attributes the previous page's dwell to the next route,
  // because the URL changes before the effect cleanup runs.
  if (!isTrackablePath(path) && type !== "exit") return;

  await postAnalytics(
    { sessionId, type, path, metadata },
    type === "exit" || type === "heatmap_dwell" || type === "click_map" || type === "page_meta",
  );
}

async function trackBatch(
  path: string,
  events: { type: "heatmap_dwell"; metadata: Record<string, string | number> }[],
) {
  if (events.length === 0) return;

  const sessionId = getAnalyticsSessionId();
  if (!sessionId || !isTrackablePath(path)) return;

  await postAnalytics({ sessionId, path, events }, true);
}

const MOUSE_SAMPLE_MS = 100;
const DWELL_FLUSH_MS = 4000;
const SECTION_VIEW_RATIO = 0.4;
const SECTION_OBSERVER_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

/**
 * A section counts as viewed at 40% visible. Sections taller than the screen
 * can never reach that ratio, so they also count once they fill most of the viewport.
 */
function sectionCountsAsViewed(entry: IntersectionObserverEntry): boolean {
  if (entry.intersectionRatio >= SECTION_VIEW_RATIO) return true;
  const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
  return viewportHeight > 0 && entry.intersectionRect.height >= viewportHeight * 0.6;
}

function scrollDepthPercent(): number {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;

  const remaining = maxScroll - window.scrollY;
  // The last pixel often rounds to 99, so the bottom milestone never fired.
  // Only snap once the visitor is actually at the end of a page that scrolls.
  if (remaining <= 1 && window.scrollY / maxScroll >= 0.99) return 100;

  return Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
}

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

    const path = pathname;

    scrollTracked.current = new Set();
    scrollBandsTracked.current = new Set();
    dwellAccumulator.current = new Map();
    activeCellRef.current = null;
    lastSampleRef.current = 0;
    pageMetaSent.current = false;

    // Blog article pageviews are recorded once via /api/blog/engagement and
    // mirrored into the analytics store only when analytics consent is on.
    // Skip here so consenting visitors are not counted twice.
    if (!isArticlePath(path)) {
      void track(path, "pageview");
    }

    const sendPageMeta = () => {
      if (pageMetaSent.current) return;
      pageMetaSent.current = true;
      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;
      void track(path, "page_meta", { pageWidth, pageHeight });
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

    const commitActiveCell = () => {
      if (!activeCellRef.current) return;
      dwellAccumulator.current.set(
        activeCellRef.current,
        (dwellAccumulator.current.get(activeCellRef.current) ?? 0) + MOUSE_SAMPLE_MS,
      );
      activeCellRef.current = null;
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
        const elapsed = MOUSE_SAMPLE_MS;
        dwellAccumulator.current.set(
          activeCellRef.current,
          (dwellAccumulator.current.get(activeCellRef.current) ?? 0) + elapsed,
        );
      } else if (activeCellRef.current === key) {
        dwellAccumulator.current.set(key, (dwellAccumulator.current.get(key) ?? 0) + MOUSE_SAMPLE_MS);
      }

      activeCellRef.current = key;
    };

    const handleScroll = () => {
      const scrollPercent = scrollDepthPercent();

      const milestones = [25, 50, 75, 100];
      milestones.forEach((m) => {
        if (scrollPercent >= m && !scrollTracked.current.has(m)) {
          scrollTracked.current.add(m);
          void track(path, "scroll", { depth: `${m}%` });
        }
      });

      const band = Math.min(
        SCROLL_BAND_COUNT - 1,
        Math.max(0, Math.floor((scrollPercent / 100) * SCROLL_BAND_COUNT)),
      );
      if (!scrollBandsTracked.current.has(band)) {
        scrollBandsTracked.current.add(band);
        void track(path, "scroll_band", { band });
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

      void track(path, "click_map", { cellX, cellY, pageWidth, pageHeight });
    };

    const handleMouseLeave = () => {
      commitActiveCell();
    };

    let exitSent = false;
    const handlePageHide = (event: PageTransitionEvent) => {
      commitActiveCell();
      flushDwell();
      // pagehide also fires when the page is frozen into bfcache. That visit
      // has not ended, so the exit beacon waits for a hide that does not persist.
      if (event.persisted || exitSent) return;
      exitSent = true;
      void track(path, "exit");
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "hidden") return;
      commitActiveCell();
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

    const sectionsTracked = new Set<string>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!sectionCountsAsViewed(entry)) return;
          const section = entry.target.getAttribute("data-analytics-section");
          if (!section || sectionsTracked.has(section)) return;
          sectionsTracked.add(section);
          void track(path, "section_view", { section });
          observerRef.current?.unobserve(entry.target);
        });
      },
      { threshold: SECTION_OBSERVER_THRESHOLDS },
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
      commitActiveCell();
      flushDwell();
    };
  }, [pathname, skipTracking]);

  return <>{children}</>;
}
