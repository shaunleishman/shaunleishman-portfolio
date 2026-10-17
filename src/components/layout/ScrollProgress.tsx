"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Reading position along the page.
 * Scale (not width) avoids layout work while scrolling, and the value is
 * clamped so rubber-band overscroll cannot draw the bar past the track.
 * Scroll listeners stay mounted across navigations; the bar is corrected
 * before paint when the route changes.
 */
const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function readScrollRatio() {
  const scrolling = document.scrollingElement ?? document.documentElement;
  const viewport = scrolling.clientHeight;
  const height = Math.max(scrolling.scrollHeight, document.body?.scrollHeight ?? 0);
  const scrollable = height - viewport;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, scrolling.scrollTop / scrollable));
}

function paintScrollProgress(node: HTMLDivElement | null) {
  if (!node) return;
  node.style.transform = `scaleX(${readScrollRatio()})`;
}

export function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useClientLayoutEffect(() => {
    paintScrollProgress(barRef.current);
  }, [pathname]);

  useEffect(() => {
    function schedule() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        paintScrollProgress(barRef.current);
      });
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-16 z-[60] h-0.5 bg-transparent lg:top-[4.5rem]"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--color-accent)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
