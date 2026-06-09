"use client";

import type { ReactNode } from "react";

type ShowcasePageShellProps = {
  children: ReactNode;
  /** Max content width — pages still grow/shrink with the viewport below this cap. */
  maxWidth?: "4xl" | "6xl" | "7xl";
  className?: string;
};

const MAX_WIDTH_CLASS = {
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export function ShowcasePageShell({
  children,
  maxWidth = "4xl",
  className = "",
}: ShowcasePageShellProps) {
  return (
    <div className={`w-full min-w-0 ${MAX_WIDTH_CLASS[maxWidth]} mx-auto ${className}`.trim()}>
      {children}
    </div>
  );
}
