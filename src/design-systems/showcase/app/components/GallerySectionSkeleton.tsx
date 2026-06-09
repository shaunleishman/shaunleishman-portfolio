import { forwardRef } from "react";

type GallerySectionSkeletonProps = {
  id: string;
  title: string;
};

export const GallerySectionSkeleton = forwardRef<HTMLElement, GallerySectionSkeletonProps>(
  function GallerySectionSkeleton({ id, title }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className="gallery-section-skeleton min-w-0 scroll-mt-6"
        aria-busy="true"
        aria-label={`Loading ${title}`}
      >
        <div className="mb-4 sm:mb-6">
          <div className="gallery-section-skeleton__shimmer mb-2 h-7 w-36 rounded-md sm:w-44" />
          <div className="gallery-section-skeleton__shimmer h-4 w-full max-w-lg rounded-md" />
          <div className="gallery-section-skeleton__shimmer mt-1.5 h-4 w-2/3 max-w-sm rounded-md" />
        </div>

        <div
          className="rounded-2xl border p-4 sm:p-6"
          style={{ borderColor: "#aab6b4", backgroundColor: "#ffffff" }}
        >
          <div className="mb-4 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:flex-wrap lg:items-end">
            {[0, 1, 2].map((index) => (
              <div key={index} className="w-full shrink-0 sm:w-[252px]">
                <div className="gallery-section-skeleton__shimmer mb-1 h-3 w-10 rounded" />
                <div className="gallery-section-skeleton__shimmer h-10 rounded-lg" />
              </div>
            ))}
          </div>

          <div className="gallery-section-skeleton__shimmer h-40 rounded-xl sm:h-52" />

          <div className="mt-6 border-t pt-4" style={{ borderColor: "#cdd4d3" }}>
            <div className="gallery-section-skeleton__shimmer h-9 w-28 rounded-lg" />
          </div>
        </div>
      </section>
    );
  },
);
