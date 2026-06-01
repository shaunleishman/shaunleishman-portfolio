"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { Skeleton } from "@/components/ui/Skeleton";
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

  return (
    <StaticThumbnail project={project} priority={priority} className={className} />
  );
}

function StaticThumbnail({ project, priority, className }: ProjectThumbnailProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
      <Image
        src={project.thumbnail}
        alt=""
        fill
        priority={priority}
        unoptimized
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover object-center transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
      />
    </>
  );
}
