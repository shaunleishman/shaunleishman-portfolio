"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Subtle enter animation when route changes.
 * Defaults visible so SSR / no-JS still shows content (never a blank page). */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

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
