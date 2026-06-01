import { Skeleton, SkeletonHero, SkeletonText } from "@/components/ui/Skeleton";

export default function CaseStudyLoading() {
  return (
    <>
      <SkeletonHero />
      <article className="section-padding bg-white">
        <div className="container-site max-w-4xl space-y-8">
          <Skeleton className="h-10 w-full max-w-md rounded-full" />
          <div className="surface-muted p-6 md:p-8 space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
            <SkeletonText lines={4} />
          </div>
          <SkeletonText lines={8} />
          <Skeleton className="aspect-[16/10] w-full max-w-lg rounded-xl" />
        </div>
      </article>
    </>
  );
}
