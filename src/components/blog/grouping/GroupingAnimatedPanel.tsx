"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { groupingPanelIn } from "./grouping-motion";

type GroupingAnimatedPanelProps = {
  panelKey: string;
  children: ReactNode;
  className?: string;
};

export function GroupingAnimatedPanel({ panelKey, children, className }: GroupingAnimatedPanelProps) {
  return (
    <div key={panelKey} className={cn(groupingPanelIn, className)}>
      {children}
    </div>
  );
}
