"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

type ChartSkeletonProps = {
  className?: string;
  heightClass?: string;
};

export function ChartSkeleton({ className, heightClass = "h-[196px]" }: ChartSkeletonProps) {
  return (
    <div
      className={cn("rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04]", className)}
      aria-busy="true"
      aria-label="Loading chart"
    >
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className={cn("w-full rounded-lg", heightClass)} />
    </div>
  );
}

/** Renders skeleton until client mount (for interactive charts) */
export function ClientMount({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback ?? <ChartSkeleton />;
  }

  return children;
}
