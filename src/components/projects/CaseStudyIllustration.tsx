"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

type CaseStudyIllustrationProps = {
  src: string;
  alt: string;
  /** Use native img for GIF animation */
  animated?: boolean;
  /** sm = square character art, md = wider banner (e.g. toggle) */
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const sizeClasses = {
  sm: "w-[200px]",
  md: "w-[280px]",
};

/** Character illustrations with their own background colours */
export function CaseStudyIllustration({
  src,
  alt,
  animated = false,
  size = "sm",
  className,
  priority,
}: CaseStudyIllustrationProps) {
  if (animated || src.endsWith(".gif")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-auto w-full rounded-2xl overflow-hidden", sizeClasses[size], className)}
      />
    );
  }

  return (
    <StaticIllustration
      src={src}
      alt={alt}
      size={size}
      className={className}
      priority={priority}
    />
  );
}

function StaticIllustration({
  src,
  alt,
  size = "sm",
  className,
  priority,
}: CaseStudyIllustrationProps) {
  const [loaded, setLoaded] = useState(false);

  const shared = cn(
    "h-auto w-full rounded-2xl overflow-hidden transition-opacity duration-300",
    loaded ? "opacity-100" : "opacity-0",
    sizeClasses[size],
    className,
  );

  return (
    <div className="relative">
      {!loaded && (
        <Skeleton className={cn("absolute inset-0 rounded-2xl", sizeClasses[size])} aria-hidden />
      )}
      <Image
        src={src}
        alt={alt}
        width={1024}
        height={1024}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={shared}
        sizes="(max-width: 768px) 200px, 200px"
      />
    </div>
  );
}

type CaseStudyScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function CaseStudyScreenshot({ src, alt, caption, className }: CaseStudyScreenshotProps) {
  return (
    <figure className={cn("flex flex-col gap-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        width={2048}
        height={1280}
        className="block h-auto w-full"
        sizes="(max-width: 768px) 100vw, 960px"
      />
      {caption && (
        <figcaption className="m-0 border-t border-[var(--color-border)] bg-white px-4 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

type CaseStudySplitSectionProps = {
  id?: string;
  title: string;
  /** Why this section matters — orients recruiters quickly */
  lead?: string;
  visual: React.ReactNode;
  children: React.ReactNode;
  visualFirst?: boolean;
  className?: string;
};

/** Notion-style two-column section: illustration beside text */
export function CaseStudySplitSection({
  id,
  title,
  lead,
  visual,
  children,
  visualFirst = true,
  className,
}: CaseStudySplitSectionProps) {
  const headingId = id ?? title.replace(/\s/g, "-").toLowerCase();

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mb-14 scroll-mt-36", className)}
    >
      <h2 id={headingId} className="text-h3 font-semibold mb-2">
        {title}
      </h2>
      {lead && (
        <p className="text-body text-[var(--color-text-muted)] mb-6 max-w-2xl">{lead}</p>
      )}
      {!lead && <div className="mb-4" />}
      <div
        className={cn(
          "flex flex-col gap-6 md:flex-row md:items-start md:gap-8",
          !visualFirst && "md:flex-row-reverse",
        )}
      >
        <div className="shrink-0 self-center md:self-start">{visual}</div>
        <div className="min-w-0 flex-1 text-body-lg text-[var(--color-text-secondary)]">
          {children}
        </div>
      </div>
    </section>
  );
}
