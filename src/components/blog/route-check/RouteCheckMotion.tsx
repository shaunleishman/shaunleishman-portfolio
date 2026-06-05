"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  getRouteBandTone,
  type RouteBand,
  type RouteBandTone,
} from "@/components/blog/route-check/route-check-data";
import { cn } from "@/lib/utils";

const SPARK_OFFSETS = [
  { x: 0, y: -26 },
  { x: 26, y: 0 },
  { x: 0, y: 26 },
  { x: -26, y: 0 },
  { x: 18, y: -18 },
  { x: -18, y: -18 },
] as const;

export function RouteCheckPanel({
  panelKey,
  children,
  className,
}: {
  panelKey: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      key={panelKey}
      className={cn(
        "motion-safe:animate-[route-check-enter_0.45s_ease-out]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function useAnimatedScore(target: number, active: boolean) {
  const [display, setDisplay] = useState(active ? 0 : target);

  useEffect(() => {
    if (!active) {
      setDisplay(target);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const duration = 700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return display;
}

type RouteCheckFinaleProps = {
  band: RouteBand;
  icon: LucideIcon;
  compact?: boolean;
};

export function RouteCheckFinale({ band, icon: Icon, compact = false }: RouteCheckFinaleProps) {
  const tone = getRouteBandTone(band.id);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        compact ? "size-20" : "mx-auto my-6 size-[5.5rem]",
        tone === "negative" &&
          "motion-safe:animate-[route-check-finale-shake_0.65s_ease-out_0.15s_both]",
        tone === "mixed" && "motion-safe:animate-[route-check-finale-good_0.55s_ease-out_both]",
      )}
      style={
        {
          backgroundColor: `${band.color}14`,
          color: band.color,
          "--finale-color": band.color,
        } as CSSProperties
      }
    >
      {tone === "positive" && (
        <>
          <span
            className="pointer-events-none absolute inset-0 rounded-full border-2 motion-safe:animate-[route-check-ring-expand_0.9s_ease-out_both]"
            style={{ borderColor: band.color }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 rounded-full border motion-safe:animate-[route-check-ring-expand_1.1s_ease-out_0.12s_both]"
            style={{ borderColor: `${band.color}88` }}
            aria-hidden
          />
          {SPARK_OFFSETS.map((offset, index) => (
            <span
              key={index}
              className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 rounded-full motion-safe:animate-[route-check-spark_0.85s_ease-out_both]"
              style={
                {
                  backgroundColor: band.color,
                  animationDelay: `${0.2 + index * 0.06}s`,
                  "--spark-x": `${offset.x}px`,
                  "--spark-y": `${offset.y}px`,
                } as CSSProperties
              }
              aria-hidden
            />
          ))}
        </>
      )}

      {tone === "negative" && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full motion-safe:animate-[route-check-warning-glow_1.4s_ease-in-out_0.3s_2]"
          aria-hidden
        />
      )}

      <Icon
        className={cn(
          "relative size-9",
          tone === "positive" &&
            "motion-safe:animate-[route-check-finale-good_0.55s_ease-out_both]",
          tone === "mixed" &&
            "motion-safe:animate-[route-check-finale-good_0.5s_ease-out_both]",
        )}
        aria-hidden
      />

      <p className="sr-only">
        {tone === "positive"
          ? "Strong result — low cognitive load."
          : tone === "negative"
            ? "Poor result — high cognitive load."
            : "Mixed result — some friction on this route."}
      </p>
    </div>
  );
}

export function staggerStyle(index: number, baseMs = 50): CSSProperties {
  return { animationDelay: `${index * baseMs}ms` };
}

export function routeCheckStepClass() {
  return "motion-safe:animate-[route-check-step-in_0.4s_ease-out_both]";
}

export type { RouteBandTone };