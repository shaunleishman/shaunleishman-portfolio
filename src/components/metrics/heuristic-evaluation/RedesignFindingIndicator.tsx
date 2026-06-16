"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { RedesignCallout } from "@/content/heuristic-evaluations/types";
import { SeverityBadge } from "./HeuristicFindingCard";
import { useRedesignPreview } from "./RedesignPreviewContext";

const MARKER_OFFSETS = [
  "top-3 right-3",
  "top-3 right-12",
  "top-3 right-[4.25rem]",
  "top-12 right-3",
] as const;

const TOOLTIP_MAX_WIDTH = 288;
const VIEWPORT_MARGIN = 16;
const TOOLTIP_GAP = 8;

type TooltipPosition = {
  top: number;
  left: number;
  width: number;
};

function clampTooltipPosition(
  anchorRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
  placement: "above" | "below",
): TooltipPosition {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(TOOLTIP_MAX_WIDTH, vw - VIEWPORT_MARGIN * 2);

  let left = anchorRect.right - width;
  left = Math.max(VIEWPORT_MARGIN, Math.min(left, vw - width - VIEWPORT_MARGIN));

  let top: number;
  let effectivePlacement = placement;

  if (placement === "above") {
    top = anchorRect.top - tooltipHeight - TOOLTIP_GAP;
    if (top < VIEWPORT_MARGIN) {
      effectivePlacement = "below";
      top = anchorRect.bottom + TOOLTIP_GAP;
    }
  } else {
    top = anchorRect.bottom + TOOLTIP_GAP;
    if (top + tooltipHeight > vh - VIEWPORT_MARGIN) {
      effectivePlacement = "above";
      top = anchorRect.top - tooltipHeight - TOOLTIP_GAP;
    }
  }

  if (effectivePlacement === "above" && top < VIEWPORT_MARGIN) {
    top = VIEWPORT_MARGIN;
  }
  if (effectivePlacement === "below" && top + tooltipHeight > vh - VIEWPORT_MARGIN) {
    top = Math.max(VIEWPORT_MARGIN, vh - tooltipHeight - VIEWPORT_MARGIN);
  }

  return { top, left, width };
}

type RedesignFindingIndicatorProps = {
  callout: RedesignCallout;
  /** Stack multiple markers in the same region */
  index?: number;
  /** Unique suffix when the same finding appears in multiple regions */
  instanceId?: string;
  className?: string;
  accentColor?: string;
  /** Prefer upward tooltips for elements near the bottom of the viewport */
  tooltipPlacement?: "above" | "below";
};

function CalloutTooltipContent({
  callout,
  tooltipId,
}: {
  callout: RedesignCallout;
  tooltipId: string;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-neutral-500">
          {callout.findingId}
        </span>
        <SeverityBadge severity={callout.severity} />
      </div>
      <p className="mt-1.5 text-[0.8125rem] font-semibold leading-snug text-neutral-900">{callout.title}</p>
      <p className="mt-1.5 text-[0.75rem] leading-relaxed text-neutral-600">
        <span className="font-medium text-neutral-800">What I found </span>
        {callout.problem}
      </p>
      <p className="mt-2 border-t border-neutral-100 pt-2 text-[0.75rem] leading-relaxed text-neutral-700">
        <span className="font-medium text-[#004B4D]">My fix in the mock </span>
        {callout.change}
      </p>
    </>
  );
}

export function RedesignFindingIndicator({
  callout,
  index = 0,
  instanceId,
  className,
  accentColor = "#E85D04",
  tooltipPlacement = "below",
}: RedesignFindingIndicatorProps) {
  const offset = MARKER_OFFSETS[index] ?? MARKER_OFFSETS[0];
  const tooltipId = instanceId ? `callout-${callout.findingId}-${instanceId}` : `callout-${callout.findingId}`;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    const tooltip = tooltipRef.current;
    if (!button) return;

    const anchorRect = button.getBoundingClientRect();
    const tooltipHeight = tooltip?.offsetHeight ?? 220;
    const tooltipWidth = tooltip?.offsetWidth ?? Math.min(TOOLTIP_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);

    setPosition(clampTooltipPosition(anchorRect, tooltipWidth, tooltipHeight, tooltipPlacement));
  }, [tooltipPlacement]);

  const showTooltip = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleHideTooltip = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();
  }, [open, callout, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onScrollOrResize = () => updatePosition();

    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  return (
    <>
      <div className={cn("pointer-events-auto absolute z-30", offset, className)}>
        <button
          ref={buttonRef}
          type="button"
          className="flex size-7 items-center justify-center rounded-full border-2 border-white text-[0.625rem] font-bold text-white shadow-md transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: accentColor }}
          aria-describedby={open ? tooltipId : undefined}
          aria-label={`${callout.findingId}, ${callout.title}. Hover for details.`}
          onMouseEnter={showTooltip}
          onMouseLeave={scheduleHideTooltip}
          onFocus={showTooltip}
          onBlur={scheduleHideTooltip}
        >
          {callout.findingId.replace("HE-", "")}
        </button>
      </div>

      {mounted && open
        ? createPortal(
            <div
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              style={
                position
                  ? {
                      top: position.top,
                      left: position.left,
                      width: position.width,
                    }
                  : {
                      top: -9999,
                      left: -9999,
                      width: Math.min(TOOLTIP_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2),
                      visibility: "hidden" as const,
                    }
              }
              className={cn(
                "pointer-events-auto fixed z-[10001] rounded-xl border border-neutral-200 bg-white p-3 text-left shadow-xl",
                position ? "opacity-100" : "opacity-0",
              )}
              onMouseEnter={showTooltip}
              onMouseLeave={scheduleHideTooltip}
            >
              <CalloutTooltipContent callout={callout} tooltipId={tooltipId} />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

type RedesignCalloutRegionProps = {
  calloutId: string;
  callouts: readonly RedesignCallout[];
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Marker index when several sit in one region */
  markerIndex?: number;
  markerClassName?: string;
  markerInstanceId?: string;
  tooltipPlacement?: "above" | "below";
  showMarkers?: boolean;
  accentColor?: string;
};

export function RedesignCalloutRegion({
  calloutId,
  callouts,
  children,
  className,
  style,
  markerIndex = 0,
  markerClassName,
  markerInstanceId,
  tooltipPlacement,
  showMarkers = false,
  accentColor,
}: RedesignCalloutRegionProps) {
  const { accentColor: contextAccent } = useRedesignPreview();
  const callout = callouts.find((item) => item.findingId === calloutId);

  return (
    <div className={cn("relative overflow-visible", className)} style={style}>
      {children}
      {showMarkers && callout ? (
        <RedesignFindingIndicator
          callout={callout}
          index={markerIndex}
          instanceId={markerInstanceId ?? calloutId}
          className={markerClassName}
          accentColor={accentColor ?? contextAccent}
          tooltipPlacement={tooltipPlacement}
        />
      ) : null}
    </div>
  );
}

export function RedesignCalloutsLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-24 left-4 z-[9998] max-w-[14rem] rounded-xl border border-neutral-200 bg-white/95 px-3 py-2.5 text-[0.6875rem] leading-relaxed text-neutral-600 shadow-lg backdrop-blur-sm",
        className,
      )}
    >
      <p className="font-semibold text-neutral-800">Audit fix markers</p>
      <p className="mt-1">Hover an orange number to see the issue and what changed in this mock.</p>
    </div>
  );
}

export function RedesignCalloutMarkers({
  findingIds,
  className,
}: {
  findingIds: readonly string[];
  className?: string;
}) {
  const { showCallouts, callouts, accentColor } = useRedesignPreview();

  if (!showCallouts) return null;

  return (
    <>
      {findingIds.map((findingId, index) => {
        const callout = callouts.find((item) => item.findingId === findingId);
        if (!callout) return null;

        return (
          <RedesignFindingIndicator
            key={`${findingId}-${index}`}
            callout={callout}
            index={index}
            instanceId={`nav-${index}`}
            accentColor={accentColor}
            className={className}
            tooltipPlacement="below"
          />
        );
      })}
    </>
  );
}
