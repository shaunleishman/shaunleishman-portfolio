"use client";

import { FilterChip, FilterChipRow } from "@/components/ui/FilterChip";

export { FilterChipRow };

type KanoSliderProps = {
  id: string;
  label: string;
  value: number;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
  valueText?: string;
};

export function KanoSlider({
  id,
  label,
  value,
  minLabel,
  maxLabel,
  onChange,
  valueText,
}: KanoSliderProps) {
  return (
    <div>
      <label htmlFor={id} className="text-body-sm font-medium text-[var(--color-text-primary)]">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className="mt-1.5 w-full h-1.5 accent-[var(--color-accent)] cursor-pointer"
        aria-valuetext={valueText}
      />
      {(minLabel || maxLabel) && (
        <div className="mt-1 flex justify-between text-body-sm text-[var(--color-text-muted)]">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}

type KanoChipProps = {
  label: string;
  selected?: boolean;
  color?: string;
  onClick: () => void;
};

/** Kano category chip — uses FilterChip with optional custom selected colour */
export function KanoChip({ label, selected, color, onClick }: KanoChipProps) {
  if (selected && color) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex min-h-[36px] shrink-0 items-center rounded-full px-3 py-1.5 text-body-sm font-medium text-white shadow-sm transition-colors"
        style={{ backgroundColor: color }}
        aria-pressed
      >
        {label}
      </button>
    );
  }

  return (
    <FilterChip label={label} selected={selected} onClick={onClick} accent="accent" />
  );
}

type KanoDetailProps = {
  color?: string;
  title: string;
  body: string;
};

export function KanoDetail({ color, title, body }: KanoDetailProps) {
  return (
    <div className="mt-3 flex gap-2 surface-muted px-3 py-2">
      {color && (
        <span
          className="mt-1.5 size-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      )}
      <p className="text-body-sm leading-snug text-[var(--color-text-secondary)]">
        <span className="font-medium text-[var(--color-text-primary)]">{title}.</span> {body}
      </p>
    </div>
  );
}

type KanoStatProps = {
  label: string;
  value: string;
  accent?: string;
  highlight?: boolean;
};

export function KanoStat({ label, value, accent, highlight }: KanoStatProps) {
  return (
    <div
      className={`flex-1 rounded-lg px-2 py-1.5 text-center ${
        highlight
          ? "bg-[var(--color-accent)]/5 ring-1 ring-[var(--color-accent)]/25"
          : "bg-[var(--color-bg-muted)]"
      }`}
    >
      <p className="text-body-sm text-[var(--color-text-muted)]">{label}</p>
      <p
        className="text-body-sm font-semibold tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

export function KanoStatRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex gap-2" aria-live="polite">
      {children}
    </div>
  );
}

export { ClientMount } from "@/components/ui/ClientMount";