"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RedesignCallout } from "@/content/heuristic-evaluations/types";
import { RedesignPreviewProvider } from "./RedesignPreviewContext";

/** Inline teaser scale — content is laid out full-size then scaled down inside the frame */
const INLINE_PREVIEW_SCALE = 0.68;
const INLINE_PREVIEW_HEIGHT_PX = 288;

type PanelPosition = { x: number; y: number };

function clampPanelPosition(x: number, y: number, width: number, height: number): PanelPosition {
  const margin = 8;
  return {
    x: Math.max(margin, Math.min(window.innerWidth - width - margin, x)),
    y: Math.max(margin, Math.min(window.innerHeight - height - margin, y)),
  };
}

function FullscreenPreviewHud({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const [dragging, setDragging] = useState(false);

  const resolvePosition = useCallback((): PanelPosition => {
    const el = panelRef.current;
    if (!el) return { x: 16, y: 16 };
    const rect = el.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  }, []);

  const onDragHandlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const current = position ?? resolvePosition();
    if (!position) setPosition(current);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: current.x,
      origY: current.y,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragHandlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const el = panelRef.current;
    if (!el) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition(
      clampPanelPosition(
        dragRef.current.origX + dx,
        dragRef.current.origY + dy,
        el.offsetWidth,
        el.offsetHeight,
      ),
    );
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const reclamp = () => {
      const el = panelRef.current;
      if (!el) return;
      setPosition((current) => {
        if (!current) return current;
        return clampPanelPosition(current.x, current.y, el.offsetWidth, el.offsetHeight);
      });
    };

    window.addEventListener("resize", reclamp);
    return () => window.removeEventListener("resize", reclamp);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      setPosition((current) => {
        if (!current) return current;
        return clampPanelPosition(current.x, current.y, el.offsetWidth, el.offsetHeight);
      });
    });
  }, [expanded]);

  return (
    <div
      ref={panelRef}
      style={
        position
          ? { left: position.x, top: position.y, right: "auto", bottom: "auto" }
          : undefined
      }
      className={cn(
        "fixed z-[9999] rounded-2xl border border-neutral-700 bg-neutral-900/95 text-white shadow-2xl backdrop-blur-sm",
        !position && "bottom-4 right-4",
        expanded ? "w-[min(100vw-2rem,20rem)] p-4" : "w-auto p-2",
        dragging && "select-none",
      )}
    >
      <div className={cn("flex items-center gap-2", expanded && "items-start justify-between gap-3")}>
        <button
          type="button"
          data-drag-handle
          aria-label="Drag preview panel"
          onPointerDown={onDragHandlePointerDown}
          onPointerMove={onDragHandlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="inline-flex shrink-0 cursor-grab touch-none rounded-md border border-neutral-600 px-2 py-1 text-[0.65rem] font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 active:cursor-grabbing"
        >
          Drag
        </button>

        <div className="min-w-0 flex-1">
          {expanded ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Full screen preview
              </p>
              <p className="truncate text-sm font-medium">{title}</p>
            </>
          ) : (
            <p className="max-w-[10rem] truncate text-xs font-medium text-neutral-200">{title}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="rounded-lg border border-neutral-600 px-2 py-1 text-[0.65rem] font-medium text-neutral-300 hover:bg-neutral-800"
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "More"}
          </button>
          {!expanded ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-600 px-2 py-1 text-[0.65rem] font-medium text-neutral-200 hover:bg-neutral-800"
            >
              Back
            </button>
          ) : null}
        </div>
      </div>

      {expanded ? (
        <>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-neutral-600 px-2.5 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800"
          >
            Back to report
          </button>
          <p className="mt-3 text-[0.65rem] leading-relaxed text-neutral-500">
            Drag the grip to move this panel. Navigate the prototype and hover orange markers for
            audit fixes. Press Escape or Back to report to return.
          </p>
        </>
      ) : null}
    </div>
  );
}

type FullscreenPagePreviewProps = {
  title: string;
  description?: string;
  returnAnchorId: string;
  children: React.ReactNode;
  className?: string;
  callouts?: readonly RedesignCallout[];
  accentColor?: string;
};

export function FullscreenPagePreview({
  title,
  description,
  returnAnchorId,
  children,
  className,
  callouts = [],
  accentColor = "#E85D04",
}: FullscreenPagePreviewProps) {
  const dialogId = useId();
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const savedScrollRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openFullscreen = useCallback(() => {
    savedScrollRef.current = window.scrollY;
    setFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreen(false);

    requestAnimationFrame(() => {
      const anchor = document.getElementById(returnAnchorId);
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: savedScrollRef.current, behavior: "instant" });
    });
  }, [returnAnchorId]);

  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, closeFullscreen]);

  return (
    <>
      <figure
        className={cn("m-0 not-prose", className)}
        style={{ ["--preview-accent" as string]: accentColor }}
      >
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-4 sm:p-5">
          <button
            type="button"
            onClick={openFullscreen}
            className={cn(
              "group relative mx-auto block w-full max-w-2xl cursor-pointer overflow-hidden rounded-xl",
              "border border-[var(--color-border)] bg-white text-left shadow-sm",
              "transition-all duration-200 ease-out",
              "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--preview-accent)_35%,var(--color-border))]",
              "hover:shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--preview-accent)_25%,transparent)]",
              "motion-safe:hover:scale-[1.012]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--preview-accent)]",
            )}
            aria-haspopup="dialog"
            aria-expanded={fullscreen}
            aria-controls={dialogId}
          >
            <div
              className="relative overflow-hidden bg-white"
              style={{ height: INLINE_PREVIEW_HEIGHT_PX }}
            >
              <RedesignPreviewProvider immersive={false} callouts={callouts} accentColor={accentColor}>
                <div
                  aria-hidden={fullscreen}
                  className="pointer-events-none absolute left-1/2 top-0 select-none"
                  style={{
                    width: `${100 / INLINE_PREVIEW_SCALE}%`,
                    transform: `translateX(-50%) scale(${INLINE_PREVIEW_SCALE})`,
                    transformOrigin: "top center",
                  }}
                >
                  {children}
                </div>
              </RedesignPreviewProvider>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/85 to-transparent"
                aria-hidden
              />

              <div
                className={cn(
                  "pointer-events-none absolute inset-0 flex items-center justify-center",
                  "bg-[var(--preview-accent)]/0 transition-colors duration-200",
                  "group-hover:bg-[var(--preview-accent)]/[0.06] group-focus-visible:bg-[var(--preview-accent)]/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/95 px-4 py-2",
                    "text-[0.8125rem] font-medium text-[var(--color-text-primary)] shadow-md",
                    "opacity-0 transition-all duration-200",
                    "group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100",
                    "scale-95",
                  )}
                >
                  <Maximize2 className="size-4 text-[var(--preview-accent)]" strokeWidth={2} aria-hidden />
                  Open full screen
                </span>
              </div>
            </div>
          </button>

          <p className="mt-3 text-center text-body-sm text-[var(--color-text-muted)]">
            Click the preview to open the interactive mock and explore audit fix markers
          </p>
        </div>

        {(title || description) && (
          <figcaption className="sr-only">
            {title}
            {description ? `. ${description}` : ""}
          </figcaption>
        )}
      </figure>

      {mounted &&
        fullscreen &&
        createPortal(
          <>
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={`${title}, full screen preview`}
              className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-white motion-safe:animate-[fade-in_0.2s_ease-out]"
            >
              <RedesignPreviewProvider immersive callouts={callouts} accentColor={accentColor}>
                {children}
              </RedesignPreviewProvider>
            </div>

            <FullscreenPreviewHud title={title} onClose={closeFullscreen} />
          </>,
          document.body,
        )}
    </>
  );
}
