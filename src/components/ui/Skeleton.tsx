import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  /** Shimmer pulse (default) or static block */
  variant?: "shimmer" | "static";
};

export function Skeleton({ className, variant = "shimmer" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-lg bg-neutral-200/80",
        variant === "shimmer" && "animate-skeleton-shimmer",
        className,
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-4/5" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-[var(--color-border)] overflow-hidden", className)} aria-hidden>
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("grid-bg section-padding pb-12", className)} aria-busy="true" aria-label="Loading">
      <div className="container-site max-w-3xl space-y-4">
        <Skeleton className="h-4 w-32 bg-white/10" variant="static" />
        <Skeleton className="h-12 w-full max-w-xl bg-white/10" variant="static" />
        <Skeleton className="h-5 w-full max-w-lg bg-white/10" variant="static" />
        <Skeleton className="h-5 w-4/5 max-w-md bg-white/10" variant="static" />
      </div>
    </div>
  );
}
