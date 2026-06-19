import Link from "next/link";
import type { ReactNode } from "react";

type PublicReportShellProps = {
  title: string;
  description?: string;
  /** Public destination for the back link. Never points at the gated metrics path. */
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
};

/**
 * Lightweight, ungated wrapper for sharing a heuristic-evaluation report publicly.
 * Renders a title bar and a public "Back to portfolio" link — no sidebar, no
 * password gate, and no links into the secret metrics dashboard.
 */
export function PublicReportShell({
  title,
  description,
  backHref = "/work",
  backLabel = "Back to portfolio",
  children,
}: PublicReportShellProps) {
  return (
    <div className="bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-[var(--color-border)] bg-white px-[var(--container-padding)] py-3 sm:py-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-h4 font-semibold truncate">{title}</h1>
          {description && (
            <p className="mt-0.5 text-body-sm text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
        <Link
          href={backHref}
          className="inline-flex shrink-0 min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium transition-colors hover:border-[var(--color-accent)]/40"
        >
          <span aria-hidden>←</span>
          {backLabel}
        </Link>
      </div>
      <div className="px-1 py-6 sm:p-6">
        <div className="container-site max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
