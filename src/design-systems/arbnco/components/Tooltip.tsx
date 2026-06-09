"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import svgPaths from "@/design-systems/showcase/imports/ToolTip/svg-w7y14cqv64";
import {
  buildTooltipShape,
  TOOLTIP_BODY_WIDTH,
  type TooltipPointerSide,
} from "@/design-systems/showcase/imports/ToolTip/tooltip-shape";

export type TooltipVariant = "dark" | "light" | "error";

export type TooltipProps = {
  title: string;
  children: ReactNode;
  variant?: TooltipVariant;
  pointerSide?: TooltipPointerSide;
  showClose?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  icon?: ReactNode;
  className?: string;
};

type TooltipTheme = {
  fill: string;
  text: string;
  iconFill: string;
  closeFill: string;
  stroke?: string;
  shadow: string;
};

const STROKE_WIDTH = 1;
const STROKE_PAD = STROKE_WIDTH;

const TOOLTIP_THEMES: Record<TooltipVariant, TooltipTheme> = {
  dark: {
    fill: "#106c7a",
    text: "text-white",
    iconFill: "white",
    closeFill: "white",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
  light: {
    fill: "#ffffff",
    text: "text-[#4a5453]",
    iconFill: "#4A5453",
    closeFill: "#4A5453",
    stroke: "#aab6b4",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
  error: {
    fill: "#ffffff",
    text: "text-[#d04a21]",
    iconFill: "#D04A21",
    closeFill: "#D04A21",
    stroke: "#d04a21",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
};

function DefaultIcon({ fill }: { fill: string }) {
  return (
    <div className="relative size-6 shrink-0 overflow-clip" aria-hidden>
      <div className="absolute inset-[4.17%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path clipRule="evenodd" d={svgPaths.pfeca300} fill={`var(--fill-0, ${fill})`} fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function CloseIcon({ fill, onClick }: { fill: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative size-6 shrink-0 overflow-clip border-0 bg-transparent p-0"
      aria-label="Close tooltip"
    >
      <div className="absolute inset-[20.83%]" aria-hidden>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path clipRule="evenodd" d={svgPaths.p34ceb700} fill={`var(--fill-0, ${fill})`} fillRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

export function Tooltip({
  title,
  children,
  variant = "dark",
  pointerSide = "top",
  showClose = true,
  onClose,
  showIcon = true,
  icon,
  className,
}: TooltipProps) {
  const theme = TOOLTIP_THEMES[variant];
  const contentRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(88);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    setBodyHeight(node.offsetHeight);
  }, [title, children, variant, pointerSide, showClose, showIcon, icon]);

  const shape = buildTooltipShape(pointerSide, TOOLTIP_BODY_WIDTH, bodyHeight);
  const paddedWidth = shape.svgWidth + STROKE_PAD * 2;
  const paddedHeight = shape.svgHeight + STROKE_PAD * 2;

  return (
    <div
      className={className ?? "inline-block max-w-[min(320px,calc(100vw-2rem))]"}
      style={{ filter: theme.shadow }}
      role="tooltip"
    >
      <div className="relative inline-block" style={{ width: shape.svgWidth, height: shape.svgHeight }}>
        <svg
          width={paddedWidth}
          height={paddedHeight}
          viewBox={`0 0 ${paddedWidth} ${paddedHeight}`}
          className="pointer-events-none absolute block overflow-visible"
          style={{ left: -STROKE_PAD, top: -STROKE_PAD }}
          aria-hidden
        >
          <g transform={`translate(${STROKE_PAD}, ${STROKE_PAD})`}>
            <path d={shape.path} fill={theme.fill} stroke="none" />
            {theme.stroke && (
              <path
                d={shape.path}
                fill="none"
                stroke={theme.stroke}
                strokeWidth={STROKE_WIDTH}
                strokeLinejoin="miter"
                strokeMiterlimit={3}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        </svg>

        <div
          ref={contentRef}
          className="absolute flex flex-col gap-4 p-4"
          style={{
            left: shape.contentX,
            top: shape.contentY,
            width: shape.contentWidth,
          }}
        >
          <div className="flex w-full items-start gap-2">
            {showIcon && (icon ?? <DefaultIcon fill={theme.iconFill} />)}
            <div
              className={`flex min-w-0 flex-1 flex-col gap-3 font-['Open_Sans:semi-bold',sans-serif] not-italic tracking-[-0.1px] ${theme.text}`}
            >
              <p className="text-[14px] leading-[20px]">{title}</p>
              <div className="text-[10px] leading-[16px] font-['Open_Sans:regular',sans-serif]">{children}</div>
            </div>
            {showClose && <CloseIcon fill={theme.closeFill} onClick={onClose} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export type TooltipAnchorProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  tooltip: ReactNode;
  /** Tooltip placement relative to the trigger. */
  placement?: "bottom-start" | "bottom" | "left";
  className?: string;
};

export function TooltipAnchor({
  open,
  onOpenChange,
  children,
  tooltip,
  placement = "bottom-start",
  className,
}: TooltipAnchorProps) {
  const placementClass =
    placement === "left"
      ? "absolute right-full top-1/2 z-30 mr-2 -translate-y-1/2"
      : placement === "bottom"
        ? "absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2"
        : "absolute left-0 top-full z-30 mt-2";

  return (
    <span
      className={`relative inline-flex ${className ?? ""}`}
      onMouseEnter={() => onOpenChange?.(true)}
      onMouseLeave={() => onOpenChange?.(false)}
    >
      {children}
      {open && <div className={placementClass}>{tooltip}</div>}
    </span>
  );
}
