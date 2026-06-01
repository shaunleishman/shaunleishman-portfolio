import { Skeleton, SkeletonHero, SkeletonText } from "@/components/ui/Skeleton";

export default function WorkLoading() {
  return (
    <>
      <SkeletonHero />
      <section className="section-padding bg-white">
        <div className="container-site grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <SkeletonText lines={2} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
