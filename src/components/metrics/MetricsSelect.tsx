"use client";

import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type MetricsSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /** Classes for the wrapper, used for width or min-width in a layout. */
  className?: string;
};

/**
 * Native select with a custom chevron that sits inside the field.
 * Hides the browser default arrow (which gets clipped) and keeps text
 * clear of the chevron with right padding.
 */
export function MetricsSelect({ className, children, ...props }: MetricsSelectProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <select
        {...props}
        className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-white pl-3 pr-10 py-2.5 text-body-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
