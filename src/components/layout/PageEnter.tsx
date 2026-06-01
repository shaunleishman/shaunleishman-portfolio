"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Subtle enter animation when route changes */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      className={cn(
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        visible ? "motion-safe:opacity-100 motion-safe:translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-1",
      )}
    >
      {children}
    </div>
  );
}
