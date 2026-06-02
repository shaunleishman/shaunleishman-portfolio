"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Thin progress bar — shows reading position on long pages */
export function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function updateProgress() {
      rafRef.current = null;
      const node = barRef.current;
      if (!node) return;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      node.style.transform = `scaleX(${ratio})`;
    }

    function scheduleUpdate() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
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
