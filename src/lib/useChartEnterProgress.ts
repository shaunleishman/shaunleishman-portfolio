"use client";

import { useEffect, useState } from "react";

export const CHART_ENTER_MS = 650;
/** Pause after tab/filter change before bars and charts animate in. */
export const CHART_ENTER_DELAY_MS = 120;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Returns 0→1 when `animationKey` changes — for chart entrance animations. */
export function useChartEnterProgress(animationKey: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    setProgress(0);
    let frame = 0;
    let delayTimer: ReturnType<typeof setTimeout> | undefined;

    const startAnimation = () => {
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / CHART_ENTER_MS);
        setProgress(easeOutCubic(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    delayTimer = setTimeout(startAnimation, CHART_ENTER_DELAY_MS);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [animationKey]);

  return progress;
}

export function lerpByProgress(value: number, progress: number) {
  return value * progress;
}

export function displayPercent(value: number, progress: number) {
  if (!Number.isFinite(value) || !Number.isFinite(progress)) return 0;
  const scaled = value * progress;
  if (!Number.isFinite(scaled)) return 0;
  return value % 1 === 0 ? Math.round(scaled) : Number(scaled.toFixed(1));
}
