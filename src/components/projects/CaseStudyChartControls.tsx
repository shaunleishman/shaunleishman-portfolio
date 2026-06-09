import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CHART_ACCENTS = {
  nhs: {
    brand: "var(--case-study-accent)",
    panelBg: "var(--color-bg-muted)",
    headerBg: "var(--color-bg-muted)",
    trackBg: "#e5e5e5",
    activeSurface: "var(--color-bg-light)",
    headerBorder: "border-[var(--color-border)]",
  },
  omron: {
    brand: "var(--case-study-accent)",
    panelBg: "var(--color-bg-muted)",
    headerBg: "var(--color-bg-muted)",
    trackBg: "#e5e5e5",
    activeSurface: "var(--color-bg-light)",
    headerBorder: "border-[var(--color-border)]",
  },
} as const;

export type ChartAccent = keyof typeof CHART_ACCENTS;

/** Toggle filter — coloured outline + dot (chart series, weekdays). */
export function FilterOutlinePill({
  label,
  ariaLabel,
  color,
  pressed,
  onToggle,
}: {
  label: string;
  ariaLabel?: string;
  color: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={pressed}
      aria-label={ariaLabel ?? label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-transparent px-2.5 py-0.5 text-[0.75rem] font-medium leading-tight min-h-[30px] motion-safe:transition-all motion-safe:duration-200",
        pressed
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-muted)] opacity-55 hover:opacity-85",
      )}
      style={{ borderColor: color }}
    >
      <span
        className="size-1.5 shrink-0 rounded-full motion-safe:transition-opacity motion-safe:duration-200"
        style={{ backgroundColor: color, opacity: pressed ? 1 : 0.55 }}
        aria-hidden
      />
      {label}
    </button>
  );
}

/** Exclusive choice — brand outline, no solid fill (age groups, time blocks). */
export function ChoiceOutlinePill({
  label,
  selected,
  onSelect,
  accent = "nhs",
  variant = "pill",
  className,
  id,
  role,
  ariaSelected,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  accent?: ChartAccent;
  variant?: "pill" | "tile";
  className?: string;
  id?: string;
  role?: string;
  ariaSelected?: boolean;
}) {
  const { brand, activeSurface } = CHART_ACCENTS[accent];
  const hoverClass = "hover:border-[var(--case-study-accent)]/35 hover:text-[var(--case-study-accent)]";

  return (
    <button
      type="button"
      id={id}
      role={role}
      aria-selected={ariaSelected ?? selected}
      onClick={onSelect}
      className={cn(
        "inline-flex items-center justify-center border font-medium motion-safe:transition-all motion-safe:duration-200",
        variant === "pill"
          ? "rounded-full px-3 py-1.5 text-[0.8125rem] leading-tight min-h-[32px]"
          : "w-full rounded-lg px-2 py-2 text-center text-[0.8125rem] leading-tight min-h-[44px] sm:text-body-sm",
        selected
          ? "font-semibold shadow-sm"
          : cn(
              "border-[var(--color-border)] bg-white/80 text-[var(--color-text-secondary)] hover:bg-white",
              hoverClass,
            ),
        className,
      )}
      style={
        selected
          ? { borderColor: brand, color: brand, backgroundColor: activeSurface }
          : undefined
      }
    >
      {label}
    </button>
  );
}

/** Static chart key — dot + label. */
export function ChartLegendKey({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-body-sm text-[var(--color-text-muted)]">
      <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {label}
    </span>
  );
}

/** Compact chart insight callout — left accent only, no full card shell. */
export function ChartInsightCard({
  children,
  accentColor,
  className,
}: {
  children: ReactNode;
  accentColor?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-l-[3px] pl-3 py-0.5 text-body-sm leading-snug text-[var(--color-text-muted)]",
        className,
      )}
      style={accentColor ? { borderLeftColor: accentColor } : undefined}
    >
      {children}
    </div>
  );
}
