import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When `#14a35c`, primary button uses growth green instead of default teal. */
  accentColor?: string;
};

const growthPrimaryStyle = {
  "--colour-surfaces-primary": "var(--accents-growth)",
  "--colour-surfaces-primary-hover": "#1ab868",
  "--colour-surfaces-primary-pushed": "#0f8a4a",
} as CSSProperties;

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-[var(--measurement-height-sm)] px-[var(--measurement-spacing-sm)] text-[length:var(--typography-font-size-xs)] font-normal leading-5",
  md: "h-[var(--measurement-height-md)] px-[var(--measurement-spacing-sm)] text-[length:var(--typography-font-size-xs)] font-normal leading-5",
  lg: "h-[var(--measurement-height-lg)] px-[var(--measurement-spacing-md)] text-[length:var(--typography-font-size-sm)] font-semibold leading-6",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--colour-surfaces-primary)] text-[var(--colour-labels-reverse)] border border-transparent hover:bg-[var(--colour-surfaces-primary-hover)] active:bg-[var(--colour-surfaces-primary-pushed)]",
  secondary:
    "bg-[var(--colour-surfaces-neutral)] text-[var(--colour-labels-primary)] border border-[var(--colour-outlines-selected)] hover:bg-[var(--colour-surfaces-secondary-hover)] active:bg-[var(--colour-surfaces-secondary-pushed)]",
  tertiary:
    "bg-[var(--colour-surfaces-neutral)] text-[var(--colour-labels-neutral)] border border-[var(--colour-outlines-neutral)] hover:bg-[var(--colour-surfaces-tertiary-hover)] active:bg-[var(--colour-surfaces-tertiary-pushed)]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "button",
  accentColor,
  style,
  ...props
}: ButtonProps) {
  const accentStyle =
    variant === "primary" && accentColor === "#14a35c" ? growthPrimaryStyle : undefined;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...accentStyle, ...style }}
      className={cn(
        "inline-flex items-center justify-center gap-[var(--measurement-spacing-xs)] rounded-[var(--radius-medium-radius)] tracking-[var(--typography-letter-spacing-sm)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--colour-outlines-focused)] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[var(--colour-surfaces-disabled)] disabled:text-[var(--colour-labels-disabled)]",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
