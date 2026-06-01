"use client";

import { Download } from "lucide-react";
import { useCallback, useState } from "react";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";
import { cn } from "@/lib/utils";

export function DownloadCvButton() {
  const [status, setStatus] = useState<"idle" | "preparing">("idle");

  const handleDownload = useCallback(async () => {
    setStatus("preparing");
    try {
      await downloadCvPdf();
    } finally {
      setStatus("idle");
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => void handleDownload()}
      disabled={status === "preparing"}
      aria-busy={status === "preparing"}
      className={cn(
        "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-full bg-white text-[#0a0a0a] text-body-sm font-medium transition-colors",
        status === "preparing" ? "opacity-70 cursor-wait" : "hover:bg-neutral-100",
      )}
    >
      <Download className="size-4 shrink-0" aria-hidden />
      {status === "preparing" ? "Preparing PDF…" : "Download CV"}
    </button>
  );
}
