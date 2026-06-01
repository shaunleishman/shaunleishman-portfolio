import Link from "next/link";
import { cn } from "@/lib/utils";

type FilterChipBase = {
  label: string;
  selected?: boolean;
  className?: string;
  accent?: "accent" | "teal" | "neutral";
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

const accentStyles = {
  accent: {
    selected: "bg-[var(--color-accent)] text-white border-transparent shadow-sm",
    idle: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] bg-white",
  },
  teal: {
    selected: "bg-[#0d7377] text-white border-transparent shadow-sm",
    idle: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[#0d7377]/40 bg-white",
  },
  neutral: {
    selected: "bg-[var(--color-text-primary)] text-white border-transparent",
    idle: "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-neutral-400 bg-white",
  },
} as const;

export function FilterChip(props: FilterChipProps) {
  const { label, selected, className, accent = "accent" } = props;
  const styles = accentStyles[accent];
  const classes = cn(
    "inline-flex min-h-[36px] shrink-0 items-center rounded-full border px-3 py-1.5 text-body-sm font-medium transition-colors whitespace-nowrap",
    selected ? styles.selected : styles.idle,
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        aria-current={props["aria-current"]}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classes}
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
