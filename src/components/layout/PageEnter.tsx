"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle enter fade when the route changes.
 * Starts visible so server render, hydration, and no-JS never paint a blank page.
 * If a navigation is interrupted before the reveal frame, visibility is restored.
 */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const isFirst = useRef(true);
  const mounted = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    let revealFrame = 0;
    setVisible(false);
    revealFrame = requestAnimationFrame(() => {
      revealFrame = 0;
      setVisible(true);
    });

    return () => {
      if (revealFrame === 0) return;
      cancelAnimationFrame(revealFrame);
      if (mounted.current) setVisible(true);
    };
  }, [pathname]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div
      className={cn(
        "motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
        visible ? "motion-safe:opacity-100" : "motion-safe:opacity-0",
      )}
    >
      {children}
    </div>
  );
}
