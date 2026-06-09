export type TooltipPointerSide = "top" | "bottom" | "left" | "right";

const RADIUS = 8;
const ARROW_BREADTH = 24;
const ARROW_DEPTH = 8;

export type TooltipShapeMetrics = {
  path: string;
  svgWidth: number;
  svgHeight: number;
  contentX: number;
  contentY: number;
  contentWidth: number;
  contentHeight: number;
};

export function buildTooltipShape(
  side: TooltipPointerSide,
  bodyWidth: number,
  bodyHeight: number,
): TooltipShapeMetrics {
  const r = RADIUS;
  const half = ARROW_BREADTH / 2;

  switch (side) {
    case "bottom": {
      const cx = bodyWidth / 2;
      const h = bodyHeight;
      const w = bodyWidth;
      // Clockwise outline: no flat edge between arrow bases — the path dips through the tip.
      const path = [
        `M ${r} 0`,
        `H ${w - r}`,
        `A ${r} ${r} 0 0 1 ${w} ${r}`,
        `V ${h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        `L ${cx + half} ${h}`,
        `L ${cx} ${h + ARROW_DEPTH}`,
        `L ${cx - half} ${h}`,
        `L ${r} ${h}`,
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        `V ${r}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        "Z",
      ].join(" ");

      return {
        path,
        svgWidth: bodyWidth,
        svgHeight: bodyHeight + ARROW_DEPTH,
        contentX: 0,
        contentY: 0,
        contentWidth: bodyWidth,
        contentHeight: bodyHeight,
      };
    }
    case "top": {
      const cx = bodyWidth / 2;
      const offset = ARROW_DEPTH;
      const h = bodyHeight;
      const w = bodyWidth;
      const path = [
        `M ${cx} 0`,
        `L ${cx + half} ${offset}`,
        `L ${w - r} ${offset}`,
        `A ${r} ${r} 0 0 1 ${w} ${offset + r}`,
        `V ${offset + h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${offset + h}`,
        `H ${r}`,
        `A ${r} ${r} 0 0 1 0 ${offset + h - r}`,
        `V ${offset + r}`,
        `A ${r} ${r} 0 0 1 ${r} ${offset}`,
        `L ${cx - half} ${offset}`,
        "Z",
      ].join(" ");

      return {
        path,
        svgWidth: bodyWidth,
        svgHeight: bodyHeight + ARROW_DEPTH,
        contentX: 0,
        contentY: ARROW_DEPTH,
        contentWidth: bodyWidth,
        contentHeight: bodyHeight,
      };
    }
    case "left": {
      const cy = bodyHeight / 2;
      const offset = ARROW_DEPTH;
      const w = bodyWidth;
      const h = bodyHeight;
      const path = [
        `M 0 ${cy}`,
        `L ${offset} ${cy - half}`,
        `L ${offset} ${r}`,
        `A ${r} ${r} 0 0 1 ${offset + r} 0`,
        `H ${offset + w - r}`,
        `A ${r} ${r} 0 0 1 ${offset + w} ${r}`,
        `V ${h - r}`,
        `A ${r} ${r} 0 0 1 ${offset + w - r} ${h}`,
        `H ${offset + r}`,
        `A ${r} ${r} 0 0 1 ${offset} ${h - r}`,
        `L ${offset} ${cy + half}`,
        "Z",
      ].join(" ");

      return {
        path,
        svgWidth: bodyWidth + ARROW_DEPTH,
        svgHeight: bodyHeight,
        contentX: ARROW_DEPTH,
        contentY: 0,
        contentWidth: bodyWidth,
        contentHeight: bodyHeight,
      };
    }
    case "right": {
      const cy = bodyHeight / 2;
      const w = bodyWidth;
      const h = bodyHeight;
      const tipX = w + ARROW_DEPTH;
      const path = [
        `M ${w} ${cy - half}`,
        `L ${tipX} ${cy}`,
        `L ${w} ${cy + half}`,
        `L ${w} ${h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        `H ${r}`,
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        `V ${r}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        `H ${w - r}`,
        `A ${r} ${r} 0 0 1 ${w} ${r}`,
        "Z",
      ].join(" ");

      return {
        path,
        svgWidth: bodyWidth + ARROW_DEPTH,
        svgHeight: bodyHeight,
        contentX: 0,
        contentY: 0,
        contentWidth: bodyWidth,
        contentHeight: bodyHeight,
      };
    }
  }
}

export const TOOLTIP_BODY_WIDTH = 320;
