"use client";

import { useId } from "react";
import type { ScreenshotAnnotation } from "@/lib/screenshot-annotations";

const STROKE = "#ef4444";

type ScreenshotAnnotationLayerProps = {
  annotations: ScreenshotAnnotation[];
  className?: string;
};

export function ScreenshotAnnotationLayer({ annotations, className }: ScreenshotAnnotationLayerProps) {
  const markerId = useId();

  if (annotations.length === 0) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={STROKE} />
        </marker>
      </defs>
      {annotations.map((annotation, index) => {
        if (annotation.type === "rect") {
          return (
            <rect
              key={index}
              x={annotation.left}
              y={annotation.top}
              width={annotation.width}
              height={annotation.height}
              fill="none"
              stroke={STROKE}
              strokeWidth="0.45"
              rx="1.2"
            />
          );
        }

        return (
          <line
            key={index}
            x1={annotation.from.x}
            y1={annotation.from.y}
            x2={annotation.to.x}
            y2={annotation.to.y}
            stroke={STROKE}
            strokeWidth="0.45"
            markerEnd={`url(#${markerId})`}
          />
        );
      })}
    </svg>
  );
}
