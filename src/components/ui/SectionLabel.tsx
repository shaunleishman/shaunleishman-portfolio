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
        "text-label font-medium mb-4",
        dark ? "text-neutral-400" : "text-[var(--color-text-muted)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
