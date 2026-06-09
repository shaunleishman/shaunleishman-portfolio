import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "info" | "success" | "warning" | "error";
};

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  info: "bg-[var(--blue-p100)] text-[var(--colour-labels-primary)]",
  success: "bg-[var(--colour-states-success-bg)] text-[var(--colour-states-success)]",
  warning: "bg-[var(--colour-states-warning-bg)] text-[var(--colour-states-warning)]",
  error: "bg-[var(--colour-states-error-bg)] text-[var(--colour-states-error)]",
};

export function Badge({ variant = "info", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-small-radius)] px-[var(--measurement-spacing-xs)] py-[var(--measurement-spacing-xxs)] text-[var(--typography-font-size-xxs)] font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
