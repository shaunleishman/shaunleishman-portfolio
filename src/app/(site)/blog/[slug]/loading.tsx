import { Skeleton, SkeletonHero, SkeletonText } from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <>
      <SkeletonHero />
      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl space-y-4">
          <SkeletonText lines={12} />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <SkeletonText lines={8} />
        </div>
      </article>
    </>
  );
}
