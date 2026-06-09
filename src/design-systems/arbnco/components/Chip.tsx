import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "primary" | "success" | "success-solid" | "warning" | "error";
  size?: "default" | "sm" | "md";
};

const toneStyles: Record<NonNullable<ChipProps["tone"]>, string> = {
  neutral: "bg-[var(--grey-n100)] text-[var(--colour-labels-neutral)]",
  primary: "bg-[var(--blue-p100)] text-[var(--colour-labels-primary)]",
  success: "bg-[var(--colour-states-success-bg)] text-[var(--colour-states-success)]",
  "success-solid": "bg-[var(--accents-growth,#14a35c)] text-white",
  warning: "bg-[var(--colour-states-warning-bg)] text-[var(--colour-states-warning)]",
  error: "bg-[var(--colour-states-error-bg)] text-[var(--colour-states-error)]",
};

const sizeStyles: Record<NonNullable<ChipProps["size"]>, string> = {
  default: "px-2 py-0.5 text-[10px]",
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-[var(--measurement-spacing-sm)] py-[var(--measurement-spacing-xxs)] text-[var(--typography-font-size-xxs)]",
};

export function Chip({ tone = "neutral", size = "sm", className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
