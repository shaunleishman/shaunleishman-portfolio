import { sampleCurve, type KanoCategory } from "./kano-math";

export const CHART = {
  w: 520,
  h: 196,
  pad: { top: 16, right: 16, bottom: 36, left: 44 },
} as const;

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

export function linePathFromFn(fn: (t: number) => number, steps = 48) {
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

const categoryLinePaths = new Map<KanoCategory, string>();

/**
 * Category line, sampled at 48 steps.
 * Cached because pointer moves re-render the chart and must not resample the curve.
 */
export function pathForCategory(category: KanoCategory) {
  const cached = categoryLinePaths.get(category);
  if (cached) return cached;
  const path = pathFromSamples(sampleCurve(category, 48));
  categoryLinePaths.set(category, path);
  return path;
}

export function pathFromFn(fn: (t: number) => number, steps = 48) {
  return linePathFromFn(fn, steps);
}

/** Closed area under a line down to the neutral axis (y = 0) */
export function areaPathFromFn(fn: (t: number) => number, steps = 48) {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return { t, y: fn(t), x: toX(t), py: toY(fn(t)) };
  });

  const baseline = toY(0);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.py.toFixed(1)}`).join(" ");
  const close = `L ${pts[pts.length - 1].x.toFixed(1)} ${baseline.toFixed(1)} L ${pts[0].x.toFixed(1)} ${baseline.toFixed(1)} Z`;
  return `${line} ${close}`;
}

const categoryAreaPaths = new Map<KanoCategory, string>();

/** Filled area for one category. Same cache rule as `pathForCategory`. */
export function areaPathForCategory(category: KanoCategory) {
  const cached = categoryAreaPaths.get(category);
  if (cached) return cached;
  const pts = sampleCurve(category, 48);
  const baseline = toY(0);
  const line = pts
    .map(({ t, y }, i) => `${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(y).toFixed(1)}`)
    .join(" ");
  const close = `L ${toX(1).toFixed(1)} ${baseline.toFixed(1)} L ${toX(0).toFixed(1)} ${baseline.toFixed(1)} Z`;
  const path = `${line} ${close}`;
  categoryAreaPaths.set(category, path);
  return path;
}

export function formatImplementation(t: number): string {
  if (t <= 0.05) return "Not present";
  if (t >= 0.95) return "Fully built";
  return `${Math.round(t * 100)}% implemented`;
}
