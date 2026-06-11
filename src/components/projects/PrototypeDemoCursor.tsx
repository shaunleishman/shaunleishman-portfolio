"use client";

import { cn } from "@/lib/utils";

type LayoutMetrics = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export function PrototypeDemoCursor({
  position,
  layout,
  visible = true,
  clicking = false,
  className,
}: {
  position: { x: number; y: number };
  layout: LayoutMetrics;
  visible?: boolean;
  clicking?: boolean;
  className?: string;
}) {
  if (!visible) return null;

  const left = layout.offsetX + position.x * layout.scale;
  const top = layout.offsetY + position.y * layout.scale;

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn(
        "pointer-events-none absolute z-[35] size-6 motion-safe:transition-[left,top,transform] motion-safe:duration-700 motion-safe:ease-out",
        clicking && "motion-safe:scale-90",
        className,
      )}
      style={{ left, top }}
    >
      <path
        d="M4 2l2.2 16.2L10.5 12 16 18.5 18.5 17 13 10.5 20.2 9.2z"
        fill="#171717"
        stroke="#fff"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
