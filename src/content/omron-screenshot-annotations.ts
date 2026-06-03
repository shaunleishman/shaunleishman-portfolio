import type { ScreenshotAnnotation } from "@/lib/screenshot-annotations";

/** Callouts for the action-card resolve flow — percentages relative to screenshot bounds. */
export const omronActionCardAnnotations: ScreenshotAnnotation[] = [
  {
    type: "rect",
    left: 26,
    top: 72.5,
    width: 48,
    height: 12,
  },
  {
    type: "arrow",
    from: { x: 78, y: 58 },
    to: { x: 62, y: 76 },
  },
];
