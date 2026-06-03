"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ExternalLink, Maximize2, X } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { figmaPrototypeEmbedUrl, type FigmaEmbedScaling } from "@/lib/figma";
import { cn } from "@/lib/utils";

const FIGMA_ORIGINS = ["https://embed.figma.com", "https://www.figma.com"] as const;

type FigmaPrototypeEmbedProps = {
  url: string;
  title: string;
  description?: string;
  caption?: string;
  /** Preview container aspect ratio (width / height) */
  aspectRatio?: number;
  /** Inline scaling — default shows the full frame scaled down */
  scaling?: FigmaEmbedScaling;
  /** Full-screen scaling — larger view for interaction */
  fullscreenScaling?: FigmaEmbedScaling;
  /** Start loading the embed as soon as the component mounts */
  priority?: boolean;
  /** Hide title/description in the card — use when a CaseStudySubsection heading sits above */
  compactHeader?: boolean;
  className?: string;
};

export function FigmaPrototypeEmbed({
  url,
  title,
  description,
  caption,
  aspectRatio = 16 / 10,
  scaling = "scale-down",
  fullscreenScaling = "fit-width",
  priority = false,
  compactHeader = false,
  className,
}: FigmaPrototypeEmbedProps) {
  const dialogId = useId();
  const containerRef = useRef<HTMLElement>(null);
  const [loadEmbed, setLoadEmbed] = useState(priority);
  const [inlineLoaded, setInlineLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const inlineSrc = useMemo(
    () => figmaPrototypeEmbedUrl(url, { scaling, contentScaling: "fixed" }),
    [url, scaling],
  );
  const fullscreenSrc = useMemo(
    () =>
      figmaPrototypeEmbedUrl(url, {
        scaling: fullscreenScaling,
        contentScaling: "responsive",
      }),
    [url, fullscreenScaling],
  );

  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    for (const origin of FIGMA_ORIGINS) {
      for (const rel of ["preconnect", "dns-prefetch"] as const) {
        if (document.querySelector(`link[rel="${rel}"][href="${origin}"]`)) continue;
        const link = document.createElement("link");
        link.rel = rel;
        link.href = origin;
        if (rel === "preconnect") link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        links.push(link);
      }
    }

    const prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.href = inlineSrc;
    document.head.appendChild(prefetch);
    links.push(prefetch);

    return () => {
      for (const link of links) link.remove();
    };
  }, [inlineSrc]);

  useEffect(() => {
    if (priority || loadEmbed) return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "iteration") {
      setLoadEmbed(true);
    }
  }, [loadEmbed, priority]);

  useEffect(() => {
    if (priority || loadEmbed) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadEmbed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px 600px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadEmbed, priority]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  function PrototypeFrame({
    src,
    className: frameClassName,
    onLoad,
  }: {
    src: string;
    className?: string;
    onLoad?: () => void;
  }) {
    return (
      <iframe
        src={src}
        title={title}
        className={cn("absolute inset-0 h-full w-full border-0 bg-neutral-100", frameClassName)}
        allowFullScreen
        loading="eager"
        onLoad={onLoad}
      />
    );
  }

  return (
    <>
      <figure ref={containerRef} className={cn("surface-card flex flex-col gap-0 overflow-hidden not-prose", className)}>
        <div
          className={cn(
            "flex flex-wrap items-center gap-3 border-b border-[var(--color-border)] bg-neutral-50 px-5 py-4",
            compactHeader ? "justify-end" : "justify-between",
          )}
        >
          {!compactHeader && (
            <div className="min-w-0">
              <p className="text-body font-semibold text-[var(--color-text-primary)]">{title}</p>
              {description && (
                <p className="text-body-sm text-[var(--color-text-muted)]">{description}</p>
              )}
            </div>
          )}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--case-study-accent)]/40 hover:text-[var(--case-study-accent)] transition-colors"
              aria-haspopup="dialog"
              aria-expanded={fullscreen}
              aria-controls={dialogId}
            >
              <Maximize2 className="size-4" aria-hidden />
              Expand
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--case-study-accent)]/40 hover:text-[var(--case-study-accent)] transition-colors"
              aria-label={`${title} (opens in a new tab)`}
            >
              <ExternalLink className="size-4" aria-hidden />
              Figma
            </a>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden bg-neutral-100"
          style={{ aspectRatio }}
        >
          {(!loadEmbed || !inlineLoaded) && (
            <Skeleton className="absolute inset-0 rounded-none" aria-hidden={inlineLoaded} />
          )}
          {loadEmbed ? <PrototypeFrame src={inlineSrc} onLoad={() => setInlineLoaded(true)} /> : null}
          {!inlineLoaded && loadEmbed && (
            <p className="absolute inset-x-0 bottom-4 text-center text-body-sm text-[var(--color-text-muted)]">
              Loading interactive prototype from Figma…
            </p>
          )}
        </div>

        {caption && (
          <figcaption className="m-0 border-t border-[var(--color-border)] bg-white px-4 py-2 text-body-sm leading-snug text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>

      {fullscreen && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — full screen`}
          className="fixed inset-0 z-50 flex flex-col bg-neutral-900 motion-safe:animate-[fade-in_0.2s_ease-out]"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <p className="truncate text-body-sm font-medium text-white">{title}</p>
            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-body-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="size-4" aria-hidden />
                Open in Figma
              </a>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Close full screen prototype"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
          <div className="relative min-h-0 flex-1 bg-neutral-100">
            <PrototypeFrame src={fullscreenSrc} />
          </div>
        </div>
      )}
    </>
  );
}
