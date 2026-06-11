import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type FilterChipBase = {
  label: string;
  selected?: boolean;
  className?: string;
  /** Site accent preset, neutral, or a custom hex (e.g. case study brand colour). */
  accent?: "accent" | "neutral";
  accentColor?: string;
  id?: string;
  role?: string;
  "aria-selected"?: boolean;
  "aria-controls"?: string;
};

type FilterChipButton = FilterChipBase & {
  href?: never;
  onClick: () => void;
  type?: "button";
  "aria-pressed"?: boolean;
  "aria-current"?: never;
};

type FilterChipLink = FilterChipBase & {
  href: string;
  onClick?: never;
  "aria-current"?: "location" | boolean;
  "aria-pressed"?: never;
};

export type FilterChipProps = FilterChipButton | FilterChipLink;

const presetStyles = {
  accent: {
    selected: "bg-[var(--color-accent)] text-white border-transparent",
    idle: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 bg-white",
  },
  neutral: {
    selected: "bg-[var(--color-text-primary)] text-white border-transparent",
    idle: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-neutral-400 bg-white",
  },
} as const;

function customAccentClasses(selected: boolean) {
  return cn(
    selected
      ? "border-transparent text-white bg-[var(--chip-accent)]"
      : "text-[var(--color-text-secondary)] bg-white chip-accent-idle",
  );
}

export function FilterChip(props: FilterChipProps) {
  const {
    label,
    selected,
    className,
    accent = "accent",
    accentColor,
    id,
    role,
    "aria-selected": ariaSelected,
    "aria-controls": ariaControls,
  } = props;

  const usesCustomAccent = Boolean(accentColor);
  const styles = usesCustomAccent ? null : presetStyles[accent];

  const classes = cn(
    "inline-flex min-h-[36px] shrink-0 items-center rounded-full border px-3 py-1.5 text-body-sm font-medium transition-[background-color,color,border-color] whitespace-nowrap",
    usesCustomAccent ? customAccentClasses(Boolean(selected)) : selected ? styles!.selected : styles!.idle,
    className,
    selected && "text-white",
  );

  const style = accentColor ? ({ "--chip-accent": accentColor } as CSSProperties) : undefined;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} style={style} aria-current={props["aria-current"]}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id={id}
      role={role}
      aria-selected={ariaSelected}
      aria-controls={ariaControls}
      onClick={props.onClick}
      className={classes}
      style={style}
      aria-pressed={props["aria-pressed"] ?? selected}
    >
      {label}
    </button>
  );
}

export function FilterChipRow({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3", className)}>
      {label && (
        <p className="text-label text-[var(--color-text-muted)] mb-1.5">{label}</p>
      )}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
