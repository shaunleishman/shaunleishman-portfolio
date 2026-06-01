import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon?: LucideIcon;
  children?: React.ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "accent" | "muted";
  className?: string;
};

const sizes = {
  sm: { box: "h-9 w-9", icon: 16 },
  md: { box: "h-11 w-11", icon: 20 },
  lg: { box: "h-14 w-14", icon: 24 },
} as const;

const variants = {
  light: "bg-[var(--color-bg-muted)] text-[var(--color-accent)]",
  dark: "bg-white/10 text-white",
  accent: "bg-[var(--color-accent)] text-white",
  muted: "bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)]",
} as const;

export function IconBadge({
  icon: Icon,
  children,
  label,
  size = "md",
  variant = "light",
  className,
}: IconBadgeProps) {
  const { box, icon: iconSize } = sizes[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        box,
        variants[variant],
        className,
      )}
      aria-hidden={label ? undefined : true}
      title={label}
    >
      {children ?? (Icon && <Icon size={iconSize} strokeWidth={1.75} aria-hidden />)}
    </span>
  );
}
