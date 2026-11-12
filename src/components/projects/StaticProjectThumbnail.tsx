"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

type StaticProjectThumbnailProps = {
  project: Project;
  priority?: boolean;
  className?: string;
};

export function StaticProjectThumbnail({
  project,
  priority,
  className,
}: StaticProjectThumbnailProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
      <Image
        src={project.thumbnail}
        alt=""
        fill
        priority={priority}
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
