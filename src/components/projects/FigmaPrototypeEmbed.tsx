"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ExternalLink, Maximize2, Play, X } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  figmaPrototypeEmbedUrl,
  isFigmaMakeUrl,
  type FigmaEmbedScaling,
} from "@/lib/figma";
import { cn } from "@/lib/utils";

const FIGMA_ORIGINS = ["https://embed.figma.com", "https://www.figma.com"] as const;

type FigmaPrototypeEmbedProps = {
  url: string;
  title: string;
  description?: string;
  caption?: string;
  /** Preview image when the URL is Figma Make (Make files cannot be iframe-embedded externally). */
  previewSrc?: string;
  previewAlt?: string;
  previewWidth?: number;
  previewHeight?: number;
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
  /** Inset frame on grey — matches built prototype embeds, not edge-to-edge full width */
  layout?: "full" | "inset";
  className?: string;
};

export function FigmaPrototypeEmbed({
  url,
  title,
  description,
  caption,
  previewSrc,
  previewAlt,
  previewWidth,
  previewHeight,
  aspectRatio = 16 / 10,
  scaling = "scale-down",
  fullscreenScaling = "fit-width",
  priority = false,
  compactHeader = false,
  layout = "full",
  className,
}: FigmaPrototypeEmbedProps) {
  const dialogId = useId();
  const containerRef = useRef<HTMLElement>(null);
  const [loadEmbed, setLoadEmbed] = useState(priority);
  const [inlineLoaded, setInlineLoaded] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const isMake = isFigmaMakeUrl(url);
  const usePreview = isMake && Boolean(previewSrc);

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
    if (usePreview) return;

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
  }, [inlineSrc, usePreview]);

  useEffect(() => {
    if (priority || loadEmbed || usePreview) return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "iteration") {
      setLoadEmbed(true);
    }
  }, [loadEmbed, priority, usePreview]);

  useEffect(() => {
    if (priority || loadEmbed || usePreview) return;

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
  }, [loadEmbed, priority, usePreview]);

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

  function HeaderActions() {
    return (
      <div className="flex shrink-0 items-center gap-2">
        {!usePreview && (
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--case-study-accent)]/40 hover:text-[var(--case-study-accent)]"
            aria-haspopup="dialog"
            aria-expanded={fullscreen}
            aria-controls={dialogId}
          >
            <Maximize2 className="size-4" aria-hidden />
            Expand
          </button>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--case-study-accent)]/40 hover:text-[var(--case-study-accent)]"
          aria-label={`${title} (opens in a new tab)`}
        >
          {usePreview ? <Play className="size-4" aria-hidden /> : <ExternalLink className="size-4" aria-hidden />}
          {usePreview ? "Open in Figma Make" : "Figma"}
        </a>
      </div>
    );
  }

  function PreviewPanel() {
    if (!previewSrc) return null;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full bg-[#f5f6f6]"
        aria-label={`${title} — open interactive prototype in Figma Make`}
      >
        {!previewLoaded && <Skeleton className="absolute inset-0 min-h-[12rem] rounded-none" aria-hidden />}
        <Image
          src={previewSrc}
          alt={previewAlt ?? title}
          width={previewWidth ?? 1024}
          height={previewHeight ?? 604}
          className="h-auto w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:scale-[1.005]"
          sizes="(min-width: 768px) 1120px, 100vw"
          onLoad={() => setPreviewLoaded(true)}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#171717]/0 motion-safe:transition-colors motion-safe:duration-200 group-hover:bg-[#171717]/5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/95 px-4 py-2 text-body-sm font-medium text-[var(--color-text-primary)] shadow-sm motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-105">
            <Play className="size-4 text-[var(--case-study-accent)]" aria-hidden />
            Open in Figma Make
          </span>
        </div>
      </a>
    );
  }

  const figureClassName = cn(
    "m-0 flex w-full flex-col gap-0 overflow-hidden not-prose",
    layout === "inset"
      ? "rounded-2xl border border-[var(--color-border)] bg-white"
      : "surface-card",
    className,
  );

  const viewportClassName = cn(
    "relative w-full overflow-hidden bg-[#f5f6f6]",
    layout === "inset" && "p-4 md:p-6",
    usePreview && layout === "inset" && "rounded-t-2xl",
  );

  const frameClassName = cn(
    "relative w-full overflow-hidden",
    layout === "inset" &&
      "rounded-xl border border-[var(--color-border)] bg-white shadow-sm",
  );

  return (
    <>
      <figure ref={containerRef} className={figureClassName}>
        {!usePreview && (
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
            <HeaderActions />
          </div>
        )}

        <div className={viewportClassName}>
          <div
            className={frameClassName}
            style={usePreview ? undefined : { aspectRatio }}
          >
            {usePreview ? (
              <PreviewPanel />
            ) : (
              <>
                {(!loadEmbed || !inlineLoaded) && (
                  <Skeleton className="absolute inset-0 rounded-none" aria-hidden={inlineLoaded} />
                )}
                {loadEmbed ? (
                  <PrototypeFrame src={inlineSrc} onLoad={() => setInlineLoaded(true)} />
                ) : null}
                {!inlineLoaded && loadEmbed && (
                  <p className="absolute inset-x-0 bottom-4 text-center text-body-sm text-[var(--color-text-muted)]">
                    Loading interactive prototype from Figma…
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {caption && (
          <figcaption className="m-0 border-t border-[var(--color-border)] bg-white px-4 py-2.5 text-body-sm leading-snug text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>

      {!usePreview && fullscreen && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, full screen`}
          className="fixed inset-0 z-50 flex flex-col bg-neutral-900 motion-safe:animate-[fade-in_0.2s_ease-out]"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <p className="truncate text-body-sm font-medium text-white">{title}</p>
            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-body-sm font-medium text-white transition-colors hover:bg-white/20"
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
