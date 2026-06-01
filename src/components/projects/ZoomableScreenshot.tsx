"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

type ZoomableScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function ZoomableScreenshot({ src, alt, caption, className }: ZoomableScreenshotProps) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <>
      <figure className={cn("surface-card overflow-hidden", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in text-left"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
        >
          {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden />}
          <Image
            src={src}
            alt={alt}
            width={2048}
            height={1280}
            onLoad={() => setLoaded(true)}
            className={cn(
              "h-auto w-full transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            sizes="(max-width: 768px) 100vw, 960px"
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[0.75rem] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn className="size-3.5" aria-hidden />
            Zoom
          </span>
        </button>
        {caption && (
          <figcaption className="px-4 py-3 text-body-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-auto max-h-[85vh] w-full rounded-lg object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
