"use client";

import {
  useLayoutEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
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
        // `both` applies the hidden start state before the first paint. The end state is fully visible, with no offset.
        "motion-safe:animate-[route-check-enter_0.45s_ease-out_both]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * 700ms ease-out cubic. State stays in the score node so a tick does not
 * re-render the results card. Reduced motion returns the final total on the
 * first render, so paint never shows the count.
 */
export function useAnimatedScore(target: number, active: boolean) {
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useLayoutEffect(() => {
    if (!active || reducedMotion) return;

    const duration = 700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(eased * target);
      setDisplay((current) => (current === next ? current : next));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, target]);

  if (!active || reducedMotion) return target;
  return display;
}

/** Ticking total. Keep the finished-score live region outside this node. */
export function RouteCheckScoreValue({ total }: { total: number }) {
  return useAnimatedScore(total, true);
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
          ? "Strong result. Low cognitive load."
          : tone === "negative"
            ? "Poor result. High cognitive load."
            : "Mixed result. Some friction on this route."}
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