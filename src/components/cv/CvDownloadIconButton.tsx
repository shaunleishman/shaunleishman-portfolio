"use client";

import { Check, Download, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";
import { cn } from "@/lib/utils";

type CvDownloadIconButtonProps = {
  className?: string;
};

/** Checkmark dwell. A newer download cancels it so the spinner is not cleared early. */
const DONE_RESET_MS = 2000;

export function CvDownloadIconButton({ className }: CvDownloadIconButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      if (resetTimer.current != null) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleDownload = useCallback(async () => {
    const id = ++requestId.current;
    if (resetTimer.current != null) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }

    setStatus("loading");
    try {
      await downloadCvPdf();
      if (requestId.current !== id) return;
      setStatus("done");
      resetTimer.current = setTimeout(() => {
        resetTimer.current = null;
        setStatus("idle");
      }, DONE_RESET_MS);
    } catch {
      if (requestId.current !== id) return;
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
    <>
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
      <span className="sr-only" role="status" aria-live="polite">
        {status === "loading" ? "Preparing CV download" : status === "done" ? "CV downloaded" : ""}
      </span>
    </>
  );
}
