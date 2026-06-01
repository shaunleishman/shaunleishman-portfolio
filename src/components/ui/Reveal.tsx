"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "fade" | "left" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Play on mount (heroes) instead of waiting for scroll */
  immediate?: boolean;
  variant?: RevealVariant;
};

const hiddenByVariant: Record<RevealVariant, string> = {
  up: "motion-safe:opacity-0 motion-safe:translate-y-3",
  fade: "motion-safe:opacity-0",
  left: "motion-safe:opacity-0 motion-safe:-translate-x-3",
  scale: "motion-safe:opacity-0 motion-safe:scale-[0.98]",
};

const visibleByVariant: Record<RevealVariant, string> = {
  up: "motion-safe:opacity-100 motion-safe:translate-y-0",
  fade: "motion-safe:opacity-100",
  left: "motion-safe:opacity-100 motion-safe:translate-x-0",
  scale: "motion-safe:opacity-100 motion-safe:scale-100",
};

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const id = window.setTimeout(() => setVisible(true), delay);
      return () => window.clearTimeout(id);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, immediate]);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
        "print:opacity-100 print:translate-none print:scale-100",
        visible ? visibleByVariant[variant] : hiddenByVariant[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
