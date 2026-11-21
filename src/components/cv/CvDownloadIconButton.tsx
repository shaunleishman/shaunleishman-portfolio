"use client";

import { Check, Download, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";
import { cn } from "@/lib/utils";

type CvDownloadIconButtonProps = {
  className?: string;
};

const DONE_RESET_MS = 2000;

export function CvDownloadIconButton({ className }: CvDownloadIconButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const resetTimerRef = useRef<number | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleDownload = useCallback(async () => {
    const requestId = ++requestRef.current;
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setStatus("loading");
    try {
      await downloadCvPdf();
      if (requestId !== requestRef.current) return;
      setStatus("done");
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = null;
        setStatus("idle");
      }, DONE_RESET_MS);
    } catch {
      if (requestId !== requestRef.current) return;
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
