import type { Project } from "@/content/projects";
import { StaticProjectThumbnail } from "@/components/projects/StaticProjectThumbnail";
import { cn } from "@/lib/utils";

type ProjectThumbnailProps = {
  project: Project;
  priority?: boolean;
  className?: string;
};

export function ProjectThumbnail({ project, priority, className }: ProjectThumbnailProps) {
  const isGif = project.thumbnail.endsWith(".gif");

  if (isGif) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.thumbnail}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center",
          className,
        )}
      />
    );
  }

  return <StaticProjectThumbnail project={project} priority={priority} className={className} />;
}
