import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
};

export function SectionLabel({ children, dark, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-label font-medium mb-4 inline-flex items-center gap-2",
        dark ? "text-neutral-400" : "text-[var(--color-text-muted)]",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full shrink-0",
          dark ? "bg-[#3b66f5]" : "bg-[var(--color-accent)]",
        )}
        aria-hidden
      />
      {children}
    </p>
  );
}
