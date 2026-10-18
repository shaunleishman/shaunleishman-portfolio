import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectThumbnailProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  /** Passed through to next/image for still thumbnails. */
  sizes?: string;
};

function stillSrc(thumbnail: string): string {
  return thumbnail.replace(/\.gif$/i, "-still.jpg");
}

/**
 * GIF thumbnails stay on a plain img. next/image does not keep GIF animation.
 * Reduced-motion visitors get the first frame instead, and skip the GIF download.
 */
function GifThumbnail({ project, priority, className }: ProjectThumbnailProps) {
  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source srcSet={stillSrc(project.thumbnail)} type="image/jpeg" media="(prefers-reduced-motion: reduce)" />
      <img
        src={project.thumbnail}
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("h-full w-full object-cover object-center", className)}
      />
    </picture>
  );
}

export async function ProjectThumbnail({
  project,
  priority,
  className,
  sizes,
}: ProjectThumbnailProps) {
  if (project.thumbnail.endsWith(".gif")) {
    return <GifThumbnail project={project} priority={priority} className={className} />;
  }

  const { StaticProjectThumbnail } = await import("@/components/projects/StaticProjectThumbnail");
  return (
    <StaticProjectThumbnail
      project={project}
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
}
