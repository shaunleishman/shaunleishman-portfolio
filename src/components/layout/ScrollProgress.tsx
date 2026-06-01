"use client";

import { useEffect, useState } from "react";

/** Thin progress bar — shows reading position on long pages */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-16 z-[60] h-0.5 bg-transparent lg:top-[4.5rem]"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--color-accent)] transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
