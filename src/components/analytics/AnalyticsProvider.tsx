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

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("analytics_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("analytics_session", id);
  }
  return id;
}

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
    | "page_meta",
  metadata?: Record<string, string | number>,
) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  const path = window.location.pathname;
  if (!isTrackablePath(path) && type !== "exit") return;

  await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      type,
      path,
      metadata,
    }),
    keepalive: type === "exit" || type === "heatmap_dwell" || type === "page_meta",
  });
}

async function trackBatch(
  events: { type: "heatmap_dwell"; metadata: Record<string, string | number> }[],
) {
  if (events.length === 0) return;

  const sessionId = getSessionId();
  const path = window.location.pathname;
  if (!sessionId || !isTrackablePath(path)) return;

  await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, path, events }),
    keepalive: true,
  });
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
    if (skipTracking) return;

    scrollTracked.current = new Set();
    scrollBandsTracked.current = new Set();
    dwellAccumulator.current = new Map();
    activeCellRef.current = null;
    lastSampleRef.current = 0;
    pageMetaSent.current = false;

    track("pageview");

    const sendPageMeta = () => {
      if (pageMetaSent.current) return;
      pageMetaSent.current = true;
      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;
      void track("page_meta", { pageWidth, pageHeight });
    };

    const flushDwell = () => {
      const entries = [...dwellAccumulator.current.entries()];
      if (entries.length === 0) return;

      dwellAccumulator.current.clear();

      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.scrollHeight;

      void trackBatch(
        entries.map(([key, dwellMs]) => {
          const [cellX, cellY] = key.split(":").map(Number);
          return {
            type: "heatmap_dwell" as const,
            metadata: { cellX, cellY, dwellMs, pageWidth, pageHeight },
          };
        }),
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
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;

      const milestones = [25, 50, 75, 100];
      milestones.forEach((m) => {
        if (scrollPercent >= m && !scrollTracked.current.has(m)) {
          scrollTracked.current.add(m);
          track("scroll", { depth: `${m}%` });
        }
      });

      const band = Math.min(
        SCROLL_BAND_COUNT - 1,
        Math.max(0, Math.floor((scrollPercent / 100) * SCROLL_BAND_COUNT)),
      );
      if (!scrollBandsTracked.current.has(band)) {
        scrollBandsTracked.current.add(band);
        track("scroll_band", { band });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      sampleDwell(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      if (activeCellRef.current) {
        dwellAccumulator.current.set(
          activeCellRef.current,
          (dwellAccumulator.current.get(activeCellRef.current) ?? 0) + MOUSE_SAMPLE_MS,
        );
        activeCellRef.current = null;
      }
    };

    const handleExit = () => {
      if (activeCellRef.current) {
        dwellAccumulator.current.set(
          activeCellRef.current,
          (dwellAccumulator.current.get(activeCellRef.current) ?? 0) + MOUSE_SAMPLE_MS,
        );
      }
      flushDwell();
      track("exit");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleExit);
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

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-analytics-section");
            if (section) {
              track("section_view", { section });
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.4 },
    );

    document.querySelectorAll("[data-analytics-section]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleExit);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle as number);
      } else {
        window.clearTimeout(idleHandle as number);
      }
      observerRef.current?.disconnect();
      window.clearInterval(flushInterval);
      window.clearTimeout(metaTimeout);
      flushDwell();
    };
  }, [pathname, skipTracking]);

  return <>{children}</>;
}
