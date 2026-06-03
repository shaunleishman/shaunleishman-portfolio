export type ScreenshotRectAnnotation = {
  type: "rect";
  left: number;
  top: number;
  width: number;
  height: number;
};

export type ScreenshotArrowAnnotation = {
  type: "arrow";
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export type ScreenshotAnnotation = ScreenshotRectAnnotation | ScreenshotArrowAnnotation;
