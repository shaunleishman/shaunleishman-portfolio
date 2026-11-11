"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/** Thin progress bar — shows reading position on long pages. */
function writeScrollProgress(node: HTMLDivElement | null) {
  if (!node) return;

  const scrolling = document.scrollingElement ?? document.documentElement;
  const scrollable = scrolling.scrollHeight - scrolling.clientHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, scrolling.scrollTop / scrollable)) : 0;
  node.style.transform = `scaleX(${ratio})`;
}

export function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    writeScrollProgress(barRef.current);
  }, [pathname]);

  useEffect(() => {
    function scheduleUpdate() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          writeScrollProgress(barRef.current);
        });
      }
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        // A cancelled frame must not leave the id set, or later scrolls never schedule.
        rafRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-16 z-[60] h-0.5 bg-transparent lg:top-[4.5rem]"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--color-accent)] will-change-transform motion-reduce:transition-none"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
