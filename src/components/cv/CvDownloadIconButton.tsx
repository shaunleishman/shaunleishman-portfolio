"use client";

import { Check, Download, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";
import { cn } from "@/lib/utils";

type CvDownloadIconButtonProps = {
  className?: string;
};

export function CvDownloadIconButton({ className }: CvDownloadIconButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleDownload = useCallback(async () => {
    setStatus("loading");
    try {
      await downloadCvPdf();
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }, []);

  const label =
    status === "loading"
      ? "Preparing CV download"
      : status === "done"
        ? "CV downloaded"
        : "Download CV as PDF";

  return (
    <button
      type="button"
      onClick={() => void handleDownload()}
      disabled={status === "loading"}
      aria-busy={status === "loading"}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] transition-colors",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        status === "loading" && "cursor-wait opacity-70",
        status === "done" && "border-[#0d7377]/30 text-[#0d7377]",
        className,
      )}
    >
      {status === "loading" ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : status === "done" ? (
        <Check className="size-4" aria-hidden />
      ) : (
        <Download className="size-4" aria-hidden />
      )}
    </button>
  );
}
