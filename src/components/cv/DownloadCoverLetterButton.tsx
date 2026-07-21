"use client";

import { Download } from "lucide-react";
import { useCallback, useState, type MouseEvent } from "react";
import { downloadCoverLetterPdf } from "@/components/cv/downloadCoverLetterPdf";
import { cn } from "@/lib/utils";

type DownloadCoverLetterButtonProps = {
  slug: string;
  className?: string;
};

export function DownloadCoverLetterButton({ slug, className }: DownloadCoverLetterButtonProps) {
  const [status, setStatus] = useState<"idle" | "preparing">("idle");

  const handleDownload = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setStatus("preparing");
      try {
        await downloadCoverLetterPdf(slug);
      } finally {
        setStatus("idle");
      }
    },
    [slug],
  );

  return (
    <button
      type="button"
      onClick={(event) => void handleDownload(event)}
      disabled={status === "preparing"}
      aria-busy={status === "preparing"}
      className={cn(
        "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-[var(--color-border)] bg-white text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors",
        status === "preparing"
          ? "cursor-wait opacity-70"
          : "hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]",
        className,
      )}
    >
      <Download className="size-4 shrink-0" aria-hidden />
      {status === "preparing" ? "Preparing PDF…" : "Download PDF"}
    </button>
  );
}
