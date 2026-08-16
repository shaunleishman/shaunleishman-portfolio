import type { Application } from "@/content/applications";
import { cn } from "@/lib/utils";

type ApplicationDocumentChipsProps = {
  application: Application;
  className?: string;
};

export function ApplicationDocumentChips({
  application,
  className,
}: ApplicationDocumentChipsProps) {
  const chips = [
    application.hasCv ? { id: "cv", label: "CV" } : null,
    application.hasCoverLetter ? { id: "cover-letter", label: "Cover letter" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  if (chips.length === 0) {
    return (
      <p className={cn("text-label text-[var(--color-text-muted)]", className)}>
        No files available
      </p>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Available downloads">
      {chips.map((chip) => (
        <li
          key={chip.id}
          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--color-text-secondary)]"
        >
          {chip.label}
        </li>
      ))}
    </ul>
  );
}
