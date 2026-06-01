import { Skeleton, SkeletonHero, SkeletonText } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <>
      <SkeletonHero />
      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <div className="mb-10 flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-20 rounded-full" />
            ))}
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="py-8 border-b border-[var(--color-border)] space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-7 w-4/5" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
