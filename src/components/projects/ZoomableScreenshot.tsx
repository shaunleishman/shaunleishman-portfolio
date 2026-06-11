"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { ScreenshotAnnotation } from "@/lib/screenshot-annotations";
import { ScreenshotAnnotationLayer } from "@/components/projects/ScreenshotAnnotationLayer";

type ZoomableScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** Cap inline preview height — full size is still available on zoom. */
  previewMaxHeight?: number;
  /** Fixed preview frame height (cover mode). Use beside a matched-height column. */
  previewHeight?: number;
  /** Grow the cover preview to fill a stretched grid row (height follows sibling content). */
  previewFill?: boolean;
  /** `cover` fills the preview (default); `contain` letterboxes the whole image. */
  previewFit?: "contain" | "cover";
  /** Intrinsic dimensions for `contain` previews (avoids wrong aspect-ratio cropping). */
  width?: number;
  height?: number;
  /** Percentage-based callouts drawn above the image — scale with the screenshot, not the frame. */
  annotations?: ScreenshotAnnotation[];
};

const DEFAULT_PREVIEW_MAX_HEIGHT = 480;

function AnnotatedMedia({
  annotations,
  children,
  className,
}: {
  annotations?: ScreenshotAnnotation[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      {children}
      {annotations && annotations.length > 0 && (
        <ScreenshotAnnotationLayer
          annotations={annotations}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

export function ZoomableScreenshot({
  src,
  alt,
  caption,
  className,
  previewMaxHeight = DEFAULT_PREVIEW_MAX_HEIGHT,
  previewHeight,
  previewFill = false,
  previewFit = "cover",
  width = 2048,
  height = 1280,
  annotations,
}: ZoomableScreenshotProps) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isAnimated = src.endsWith(".gif");

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const previewHeightCss = previewHeight
    ? `${previewHeight}px`
    : `min(${previewMaxHeight}px, 55vh)`;
  const isCover = previewFit === "cover";
  const fillCover = isCover && previewFill;

  const previewClassName = cn(
    "transition-opacity duration-300",
    isCover
      ? "absolute inset-0 h-full w-full object-cover object-center"
      : "h-auto w-full object-contain object-center",
    loaded ? "opacity-100" : "opacity-0",
  );

  const previewStyle = isCover ? undefined : ({ maxHeight: previewHeightCss } as const);
  const buttonStyle = isCover && !fillCover ? ({ height: previewHeightCss } as const) : undefined;

  return (
    <>
      <figure className={cn("surface-card flex flex-col gap-0 overflow-hidden", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={buttonStyle}
          className={cn(
            "group relative m-0 w-full cursor-zoom-in overflow-hidden border-0 p-0 leading-none bg-neutral-900 text-left",
            fillCover
              ? "min-h-[12rem] md:min-h-0 md:flex-1"
              : isCover
                ? "block shrink-0"
                : "flex min-h-[8rem] shrink-0 items-center justify-center bg-neutral-100/70",
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
        >
          {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
          {isAnimated ? (
            <AnnotatedMedia annotations={annotations}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={previewStyle}
                className={cn(previewClassName, "block")}
              />
            </AnnotatedMedia>
          ) : isCover ? (
            <AnnotatedMedia annotations={annotations} className="absolute inset-0">
              <Image
                src={src}
                alt={alt}
                fill
                onLoad={() => setLoaded(true)}
                className={previewClassName}
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </AnnotatedMedia>
          ) : (
            <AnnotatedMedia annotations={annotations}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={() => setLoaded(true)}
                style={previewStyle}
                className={previewClassName}
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </AnnotatedMedia>
          )}
          <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[0.75rem] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn className="size-3.5" aria-hidden />
            {isAnimated ? "Enlarge" : "Zoom"}
          </span>
        </button>
        {caption && (
          <figcaption className="m-0 border-t border-[var(--color-border)] bg-white px-4 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 motion-safe:animate-[fade-in_0.2s_ease-out]"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close enlarged image"
          >
            <X className="size-5" />
          </button>
          <div className="max-h-full max-w-5xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <AnnotatedMedia annotations={annotations} className="inline-block max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="h-auto max-h-[85vh] w-full rounded-lg object-contain" />
            </AnnotatedMedia>
          </div>
        </div>
      )}
    </>
  );
}
