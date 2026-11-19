import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { groupingHintIn } from "./grouping-motion";

type GroupingWidgetProps = {
  title: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/** Compact interactive embed within blog prose */
export function GroupingWidget({ title, hint, children, className }: GroupingWidgetProps) {
  return (
    <aside
      className={cn("my-8 not-prose surface-card shadow-sm overflow-hidden", className)}
      aria-label={title}
    >
      <header className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]">
        <h3 className="text-body-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {hint && (
          <p className="text-[0.8125rem] leading-snug text-[var(--color-text-muted)] mt-0.5">{hint}</p>
        )}
      </header>
      <div className="p-4">{children}</div>
    </aside>
  );
}

/**
 * Status line under an explorer. The live region stays mounted; the key replays
 * the fade on an inner span. Keying the region itself drops the announcement.
 */
export function GroupingLiveHint({
  hintKey,
  className,
  children,
}: {
  hintKey: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className="mt-3 text-body-sm text-[var(--color-text-secondary)]" aria-live="polite">
      <span key={hintKey} className={cn(groupingHintIn, className)}>
        {children}
      </span>
    </p>
  );
}
