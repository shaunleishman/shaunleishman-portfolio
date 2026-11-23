"use client";

import { Check, Download, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";
import { cn } from "@/lib/utils";

type CvDownloadIconButtonProps = {
  className?: string;
};

export function CvDownloadIconButton({ className }: CvDownloadIconButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const resetTimer = useRef<number | null>(null);

  const clearReset = useCallback(() => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  useEffect(() => clearReset, [clearReset]);

  const handleDownload = useCallback(async () => {
    clearReset();
    setStatus("loading");
    try {
      await downloadCvPdf();
      setStatus("done");
      resetTimer.current = window.setTimeout(() => {
        resetTimer.current = null;
        setStatus("idle");
      }, 2000);
    } catch {
      setStatus("idle");
    }
  }, [clearReset]);

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
        status === "done" && "border-[var(--color-accent)]/30 text-[var(--color-accent)]",
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
