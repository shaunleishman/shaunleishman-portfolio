import { Download, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";

type DownloadReportPdfButtonProps = {
  /** Case study slug. Links to `/api/case-studies/${slug}/${kind === "deck" ? "deck" : "pdf"}`. */
  slug: string;
  /** "report" is the full document PDF; "deck" is the landscape summary presentation. */
  kind?: "report" | "deck";
  className?: string;
  variant?: "compact" | "prominent";
};

/**
 * Downloads a case-study report as a self-contained PDF — either the full
 * document ("report") or the landscape summary deck ("deck"). Useful for
 * sharing where the public link is blocked by corporate security, since the
 * PDF can be attached to an email instead.
 */
export function DownloadReportPdfButton({
  slug,
  kind = "report",
  className,
  variant = "prominent",
}: DownloadReportPdfButtonProps) {
  const isCompact = variant === "compact";
  const isDeck = kind === "deck";
  const href = `/api/case-studies/${slug}/${isDeck ? "deck" : "pdf"}`;
  const Icon = isDeck ? Presentation : Download;
  const label = isDeck ? "Download deck" : "Download PDF";

  return (
    <a
      href={href}
      download
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
        isCompact ? "px-3 py-1.5 text-[0.75rem]" : "min-h-[44px] px-4 py-2 text-body-sm",
        className,
      )}
    >
      <Icon className={isCompact ? "size-3.5" : "size-4"} aria-hidden />
      {label}
    </a>
  );
}
