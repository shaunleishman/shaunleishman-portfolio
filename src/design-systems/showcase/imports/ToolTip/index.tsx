"use client";

import { useLayoutEffect, useRef, useState } from "react";
import svgPaths from "./svg-w7y14cqv64";
import { buildTooltipShape, TOOLTIP_BODY_WIDTH, type TooltipPointerSide } from "./tooltip-shape";

type ToolTipProps = {
  className?: string;
  pointerSide?: TooltipPointerSide;
  showClose?: boolean;
  showIconLeft?: boolean;
  toolTip?: "Dark" | "Light" | "Error";
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

const TOOLTIP_THEMES: Record<NonNullable<ToolTipProps["toolTip"]>, TooltipTheme> = {
  Dark: {
    fill: "#106c7a",
    text: "text-white",
    iconFill: "white",
    closeFill: "white",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
  Light: {
    fill: "#ffffff",
    text: "text-[#4a5453]",
    iconFill: "#4A5453",
    closeFill: "#4A5453",
    stroke: "#aab6b4",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
  Error: {
    fill: "#ffffff",
    text: "text-[#d04a21]",
    iconFill: "#D04A21",
    closeFill: "#D04A21",
    stroke: "#d04a21",
    shadow: "drop-shadow(0px 8px 12px rgba(28,42,42,0.05))",
  },
};

export default function ToolTip({
  className,
  pointerSide = "bottom",
  showClose = true,
  showIconLeft = true,
  toolTip = "Dark",
}: ToolTipProps) {
  const theme = TOOLTIP_THEMES[toolTip];
  const contentRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(88);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    setBodyHeight(node.offsetHeight);
  }, [toolTip, pointerSide, showClose, showIconLeft]);

  const shape = buildTooltipShape(pointerSide, TOOLTIP_BODY_WIDTH, bodyHeight);
  const paddedWidth = shape.svgWidth + STROKE_PAD * 2;
  const paddedHeight = shape.svgHeight + STROKE_PAD * 2;

  return (
    <div className={className ?? "inline-block max-w-[320px]"} style={{ filter: theme.shadow }}>
      <div
        className="relative inline-block"
        style={{ width: shape.svgWidth, height: shape.svgHeight }}
      >
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
          data-name="Tool-tip"
        >
          <div className="flex w-full items-start gap-2">
            {showIconLeft && (
              <div className="relative size-6 shrink-0 overflow-clip" data-name="alert-circle">
                <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.pfeca300}
                      fill={`var(--fill-0, ${theme.iconFill})`}
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div
              className={`flex min-w-0 flex-1 flex-col gap-3 font-['Open_Sans:semi-bold',sans-serif] not-italic tracking-[-0.1px] ${theme.text}`}
              data-name="Text tool tip"
            >
              <p className="text-[14px] leading-[20px]">This is a tool tip</p>
              <p className="text-[10px] leading-[16px]">This is the tool tip description</p>
            </div>
            {showClose && (
              <div className="relative size-6 shrink-0 overflow-clip" data-name="x-close">
                <div className="absolute inset-[20.83%]" data-name="Icon (Stroke)">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p34ceb700}
                      fill={`var(--fill-0, ${theme.closeFill})`}
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
