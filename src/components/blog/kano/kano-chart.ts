import { sampleCurve, satisfactionAt, type KanoCategory } from "./kano-math";

/**
 * Chart geometry in a 520×196 viewBox. Satisfaction +1 is the top of the plot
 * and -1 is the bottom, so `toY` maps the -1…1 range onto the plot height.
 * Category line and area paths are cached: pointer moves re-render the chart
 * and must not resample the curves. The strings are pure functions of the
 * category, so the cache does not change the diagram.
 */
export const CHART = {
  w: 520,
  h: 196,
  pad: { top: 16, right: 16, bottom: 36, left: 44 },
} as const;

const CURVE_STEPS = 48;
const categoryLineCache = new Map<KanoCategory, string>();
const categoryAreaCache = new Map<KanoCategory, string>();

export const Y_TICKS = [1, 0.5, 0, -0.5, -1] as const;

export function plotWidth() {
  return CHART.w - CHART.pad.left - CHART.pad.right;
}

export function plotHeight() {
  return CHART.h - CHART.pad.top - CHART.pad.bottom;
}

export function toX(t: number) {
  return CHART.pad.left + t * plotWidth();
}

export function toY(value: number) {
  return CHART.pad.top + ((1 - value) / 2) * plotHeight();
}

export function fromX(px: number) {
  return Math.min(1, Math.max(0, (px - CHART.pad.left) / plotWidth()));
}

export function linePathFromFn(fn: (t: number) => number, steps = CURVE_STEPS) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const y = fn(t);
    return `${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(y).toFixed(1)}`;
  }).join(" ");
}

export function pathFromSamples(points: Array<{ t: number; y: number }>) {
  return points
    .map(({ t, y }, i) => `${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(y).toFixed(1)}`)
    .join(" ");
}

export function pathForCategory(category: KanoCategory) {
  const cached = categoryLineCache.get(category);
  if (cached) return cached;
  const path = pathFromSamples(sampleCurve(category, CURVE_STEPS));
  categoryLineCache.set(category, path);
  return path;
}

export function pathFromFn(fn: (t: number) => number, steps = CURVE_STEPS) {
  return linePathFromFn(fn, steps);
}

/** Closed area between a curve and the neutral axis (satisfaction 0). */
export function areaPathFromFn(fn: (t: number) => number, steps = CURVE_STEPS) {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const y = fn(t);
    return { x: toX(t), py: toY(y) };
  });

  const baseline = toY(0);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.py.toFixed(1)}`).join(" ");
  const close = `L ${pts[pts.length - 1].x.toFixed(1)} ${baseline.toFixed(1)} L ${pts[0].x.toFixed(1)} ${baseline.toFixed(1)} Z`;
  return `${line} ${close}`;
}

export function areaPathForCategory(category: KanoCategory) {
  const cached = categoryAreaCache.get(category);
  if (cached) return cached;
  const path = areaPathFromFn((t) => satisfactionAt(t, category));
  categoryAreaCache.set(category, path);
  return path;
}

/** Tooltip copy. The 5% and 95% edges are the words "Not present" and "Fully built". */
export function formatImplementation(t: number): string {
  if (t <= 0.05) return "Not present";
  if (t >= 0.95) return "Fully built";
  return `${Math.round(t * 100)}% implemented`;
}
