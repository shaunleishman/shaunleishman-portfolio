import type { CSSProperties } from "react";

/** Site-wide brand colours — use for general UI outside a case study context. */
export const SITE_COLORS = {
  accent: "#3b66f5",
  accentHover: "#2d52d4",
  /** Off-black text — WCAG AAA on white; avoids pure #000 halation. */
  textPrimary: "#171717",
} as const;

/** Per-project accent colours — defined once in `projects.ts` and passed via context. */
export const PROJECT_ACCENTS = {
  omron: "#003153",
  nhs: "#005eb8",
  arbnco: "#00a7b5",
} as const;

/** Darken a hex colour by a ratio (0–1) for hover states. */
export function darkenHex(hex: string, amount = 0.12): string {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return hex;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  const factor = 1 - amount;
  const toByte = (n: number) => Math.max(0, Math.min(255, Math.round(n * factor)));

  return `#${toByte(r).toString(16).padStart(2, "0")}${toByte(g).toString(16).padStart(2, "0")}${toByte(b).toString(16).padStart(2, "0")}`;
}

export function caseStudyAccentStyle(accentColor: string): CSSProperties {
  return { "--case-study-accent": accentColor } as CSSProperties;
}
