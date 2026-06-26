import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type DownloadReportPdfButtonProps = {
  /** Case study slug. Links to `/api/case-studies/${slug}/pdf`. */
  slug: string;
  className?: string;
  variant?: "compact" | "prominent";
};

/**
 * Downloads the case-study report as a self-contained PDF. Useful for sharing
 * into environments where the public link is blocked by corporate security
 * (the PDF can be attached to an email instead).
 */
export function DownloadReportPdfButton({
  slug,
  className,
  variant = "prominent",
}: DownloadReportPdfButtonProps) {
  const isCompact = variant === "compact";

  return (
    <a
      href={`/api/case-studies/${slug}/pdf`}
      download
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
        isCompact ? "px-3 py-1.5 text-[0.75rem]" : "min-h-[44px] px-4 py-2 text-body-sm",
        className,
      )}
    >
      <Download className={isCompact ? "size-3.5" : "size-4"} aria-hidden />
      Download PDF
    </a>
  );
}
