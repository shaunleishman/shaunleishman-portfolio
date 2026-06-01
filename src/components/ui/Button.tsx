import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  secondary:
    "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  inverse:
    "bg-white text-[var(--color-text-primary)] hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-dark)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline-offset-4 hover:underline",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-body-sm font-medium transition-colors duration-200 min-h-[44px] min-w-[44px]",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
