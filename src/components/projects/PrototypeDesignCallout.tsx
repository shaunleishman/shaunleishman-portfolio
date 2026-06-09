"use client";

import type { CSSProperties } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PrototypeCalloutPlacement = "above" | "below" | "left" | "right";

export type PrototypeCalloutViewportCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type PrototypeHighlightRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PrototypeCalloutSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "positive";

export type PrototypeCalloutConfig = {
  title: string;
  /** Design-review format — used when `description` is not set. */
  issue?: string;
  resolution?: string;
  /** Walkthrough caption — one short line, no issue/fix labels. */
  description?: string;
  severity?: PrototypeCalloutSeverity;
  /**
   * Design-space region the callout explains — used for the red highlight frame
   * and to aim the callout pointer.
   */
  highlight?: PrototypeHighlightRegion;
  /** Which side of the highlight the callout sits on (pointer aims inward). */
  calloutSide?: "left" | "right";
  viewportCorner?: PrototypeCalloutViewportCorner;
  anchor?: { x: number; y: number };
  placement?: PrototypeCalloutPlacement;
  maxWidth?: number | string;
};

type PrototypeDesignCalloutProps = PrototypeCalloutConfig & {
  onDismiss?: () => void;
  className?: string;
  showPointer?: boolean;
  accentColor?: string;
};

const OMRON_NAVY = "#003153";

const SEVERITY_META: Record<PrototypeCalloutSeverity, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "border-red-300/60 bg-red-600/30 text-red-50",
  },
  high: {
    label: "High",
    className: "border-orange-400/50 bg-orange-500/20 text-orange-100",
  },
  medium: {
    label: "Medium",
    className: "border-amber-400/50 bg-amber-500/20 text-amber-100",
  },
  low: {
    label: "Low",
    className: "border-sky-400/50 bg-sky-500/20 text-sky-100",
  },
  positive: {
    label: "Positive",
    className: "border-emerald-400/50 bg-emerald-500/20 text-emerald-100",
  },
};

const POINTER_CLASS_BASE =
  "after:absolute after:border-8 after:border-transparent";

function pointerClass(placement: PrototypeCalloutPlacement) {
  switch (placement) {
    case "below":
      return `${POINTER_CLASS_BASE} after:left-1/2 after:top-full after:-translate-x-1/2 after:border-t-[var(--callout-accent)]`;
    case "left":
      return `${POINTER_CLASS_BASE} after:left-full after:top-1/2 after:-translate-y-1/2 after:border-l-[var(--callout-accent)]`;
    case "right":
      return `${POINTER_CLASS_BASE} after:right-full after:top-1/2 after:-translate-y-1/2 after:border-r-[var(--callout-accent)]`;
    case "above":
    default:
      return `${POINTER_CLASS_BASE} after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-b-[var(--callout-accent)]`;
  }
}

export function PrototypeDesignCallout({
  title,
  issue,
  resolution,
  description,
  severity,
  placement = "above",
  viewportCorner,
  maxWidth,
  onDismiss,
  className,
  showPointer,
  accentColor = OMRON_NAVY,
}: PrototypeDesignCalloutProps) {
  const pointerVisible = showPointer ?? Boolean(!viewportCorner && placement);
  const severityMeta = severity ? SEVERITY_META[severity] : null;
  const captionMode = Boolean(description?.trim());

  return (
    <div
      className={cn(
        "relative motion-safe:animate-[fade-in_0.25s_ease-out]",
        pointerVisible && pointerClass(placement),
        className,
      )}
      style={{ maxWidth: maxWidth ?? "min(17.5rem, 78vw)", "--callout-accent": accentColor } as CSSProperties}
      role="note"
      aria-label={
        captionMode
          ? `${title}. ${description}`
          : `Design note: ${title}${severityMeta ? `, ${severityMeta.label} severity` : ""}`
      }
    >
      <div
        className="rounded-lg p-3.5 text-white shadow-lg"
        style={{ backgroundColor: accentColor }}
      >
        <div className={cn("flex items-start justify-between gap-2", captionMode ? "" : "mb-2")}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm font-semibold leading-snug">{title}</p>
              {severityMeta && !captionMode ? (
                <span
                  className={cn(
                    "inline-flex shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    severityMeta.className,
                  )}
                >
                  {severityMeta.label}
                </span>
              ) : null}
            </div>
          </div>
          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              aria-label="Dismiss design note"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
        {captionMode ? (
          <p className="mt-1.5 text-xs leading-snug text-white/95">{description}</p>
        ) : (
          <div className="space-y-1.5 text-xs leading-snug text-white/95">
            <p>
              <span className="font-semibold text-white">Issue: </span>
              {issue}
            </p>
            <p>
              <span className="font-semibold text-white">Fix: </span>
              {resolution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function calloutScreenPosition(
  anchor: { x: number; y: number },
  placement: PrototypeCalloutPlacement,
  layout: {
    scale: number;
    offsetX: number;
    offsetY: number;
  },
) {
  const x = layout.offsetX + anchor.x * layout.scale;
  const y = layout.offsetY + anchor.y * layout.scale;

  switch (placement) {
    case "below":
      return { left: x, top: y + 12, transform: "translate(-50%, 0)" };
    case "left":
      return { left: x - 12, top: y, transform: "translate(-100%, -50%)" };
    case "right":
      return { left: x + 12, top: y, transform: "translate(0, -50%)" };
    case "above":
    default:
      return { left: x, top: y - 12, transform: "translate(-50%, -100%)" };
  }
}

const CALLOUT_GAP = 16;
const CALLOUT_ESTIMATE_WIDTH = 220;
const CALLOUT_ESTIMATE_HEIGHT = 72;
const CANVAS_INSET = 8;

function estimateCalloutBounds(
  style: CSSProperties,
  side: "left" | "right",
): { xMin: number; xMax: number; yMin: number; yMax: number } {
  const left = typeof style.left === "number" ? style.left : 0;
  const top = typeof style.top === "number" ? style.top : 0;

  if (side === "left") {
    return {
      xMin: left - CALLOUT_ESTIMATE_WIDTH,
      xMax: left,
      yMin: top - CALLOUT_ESTIMATE_HEIGHT / 2,
      yMax: top + CALLOUT_ESTIMATE_HEIGHT / 2,
    };
  }

  return {
    xMin: left,
    xMax: left + CALLOUT_ESTIMATE_WIDTH,
    yMin: top - CALLOUT_ESTIMATE_HEIGHT / 2,
    yMax: top + CALLOUT_ESTIMATE_HEIGHT / 2,
  };
}

function fitsCanvas(
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
  canvas: { width: number; height: number },
) {
  return (
    bounds.xMin >= CANVAS_INSET &&
    bounds.xMax <= canvas.width - CANVAS_INSET &&
    bounds.yMin >= CANVAS_INSET &&
    bounds.yMax <= canvas.height - CANVAS_INSET
  );
}

/** Pick a side that keeps the callout inside the grey mat canvas. */
export function resolveCalloutLayout(
  highlight: PrototypeHighlightRegion,
  preferredSide: "left" | "right",
  layout: {
    scale: number;
    offsetX: number;
    offsetY: number;
  },
  canvas: { width: number; height: number },
): { style: CSSProperties; placement: PrototypeCalloutPlacement } {
  const sides: ("left" | "right")[] =
    preferredSide === "left" ? ["left", "right"] : ["right", "left"];

  for (const side of sides) {
    const candidate = calloutPositionForHighlight(highlight, side, layout);
    if (fitsCanvas(estimateCalloutBounds(candidate.style, side), canvas)) {
      return candidate;
    }
  }

  const marginWidth = Math.max(0, layout.offsetX - VIEWPORT_INSET);
  const corner: PrototypeCalloutViewportCorner =
    marginWidth > 120 ? "top-left" : "top-right";

  return {
    style: calloutViewportCornerStyle(corner, layout),
    placement: corner.endsWith("left") ? "right" : "left",
  };
}

export function calloutPositionForHighlight(
  highlight: PrototypeHighlightRegion,
  side: "left" | "right",
  layout: {
    scale: number;
    offsetX: number;
    offsetY: number;
  },
): { style: CSSProperties; placement: PrototypeCalloutPlacement } {
  const targetCy = highlight.y + highlight.height / 2;
  const screenCy = layout.offsetY + targetCy * layout.scale;

  if (side === "left") {
    const screenRight = layout.offsetX + highlight.x * layout.scale - CALLOUT_GAP;
    return {
      style: {
        left: screenRight,
        top: screenCy,
        transform: "translate(-100%, -50%)",
      },
      placement: "left",
    };
  }

  const screenLeft =
    layout.offsetX + (highlight.x + highlight.width) * layout.scale + CALLOUT_GAP;
  return {
    style: {
      left: screenLeft,
      top: screenCy,
      transform: "translate(0, -50%)",
    },
    placement: "right",
  };
}

export function highlightOverlayStyle(
  highlight: PrototypeHighlightRegion,
  layout: {
    scale: number;
    offsetX: number;
    offsetY: number;
  },
): CSSProperties {
  return {
    left: layout.offsetX + highlight.x * layout.scale,
    top: layout.offsetY + highlight.y * layout.scale,
    width: highlight.width * layout.scale,
    height: highlight.height * layout.scale,
  };
}

const VIEWPORT_INSET = 12;

/** Place the callout in the grey letterbox margin when possible. */
export function calloutViewportCornerStyle(
  corner: PrototypeCalloutViewportCorner,
  layout: {
    offsetX: number;
    offsetY: number;
  },
): CSSProperties {
  const marginWidth = Math.max(0, layout.offsetX - VIEWPORT_INSET);
  const marginHeight = Math.max(0, layout.offsetY - VIEWPORT_INSET);
  const sideMaxWidth =
    marginWidth > 120 ? marginWidth : marginHeight > 120 ? marginHeight : undefined;

  switch (corner) {
    case "top-left":
      return {
        top: VIEWPORT_INSET,
        left: VIEWPORT_INSET,
        maxWidth: sideMaxWidth,
      };
    case "top-right":
      return {
        top: VIEWPORT_INSET,
        right: VIEWPORT_INSET,
        maxWidth: sideMaxWidth,
      };
    case "bottom-left":
      return {
        bottom: VIEWPORT_INSET,
        left: VIEWPORT_INSET,
        maxWidth: sideMaxWidth,
      };
    case "bottom-right":
      return {
        bottom: VIEWPORT_INSET,
        right: VIEWPORT_INSET,
        maxWidth: sideMaxWidth,
      };
  }
}
