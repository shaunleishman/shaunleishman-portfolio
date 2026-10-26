"use client";

import { useLayoutEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  getRouteBandTone,
  type RouteBand,
  type RouteBandTone,
} from "@/components/blog/route-check/route-check-data";
import { cn } from "@/lib/utils";

/**
 * Motion for the Route Check widget.
 *
 * `RouteCheckPanel` puts `panelKey` on the animated node. The parent renders
 * one panel per phase, so the key has to sit on that node for
 * `route-check-enter` to replay when the question changes.
 *
 * `route-check-step-in` animates `transform` and uses fill `both` so a
 * staggered row stays hidden during its delay. A selected option scales with
 * Tailwind's `scale` property, which is separate from `transform`. Folding
 * that scale into the keyframe lets the fill mode cancel the selection scale.
 *
 * The score counts from 0 to the total over 700ms with an ease-out cubic.
 * The frame state lives in `RouteCheckScoreValue`, so a tick re-renders the
 * number and not the finale or the band list. A parent live region must not
 * wrap that number: it would announce every tick. The results screen
 * announces the finished total once. Reduced motion shows that total before
 * paint.
 *
 * The survey bar transitions `width` only, over 500ms. `transition-all` was
 * also watching every other property on the bar.
 */

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

const SCORE_COUNT_MS = 700;

type RouteCheckScoreValueProps = {
  target: number;
  className?: string;
  style?: CSSProperties;
};

export function RouteCheckScoreValue({ target, className, style }: RouteCheckScoreValueProps) {
  const [display, setDisplay] = useState(0);

  useLayoutEffect(() => {
    let frame = 0;
    let cancelled = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => {
        if (!cancelled) setDisplay(target);
      });
      return () => {
        cancelled = true;
      };
    }

    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min((now - start) / SCORE_COUNT_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
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