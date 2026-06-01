"use client";

import { Download } from "lucide-react";
import { useCallback, useState } from "react";
import { getCvPdfFilename } from "@/content/cv";
import { cn } from "@/lib/utils";

export function DownloadCvButton() {
  const [status, setStatus] = useState<"idle" | "preparing" | "error">("idle");

  const handleDownload = useCallback(async () => {
    const root = document.querySelector<HTMLElement>("[data-cv-pdf-root]");
    if (!root) return;

    setStatus("preparing");
    document.documentElement.classList.add("cv-pdf-export");

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: [12, 14, 16, 14],
          filename: getCvPdfFilename(),
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: root.scrollWidth,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ["css", "legacy"],
            avoid: ["section", "article", "h2", "h3", "blockquote"],
          },
        })
        .from(root)
        .save();
    } catch {
      setStatus("error");
      const previousTitle = document.title;
      document.title = getCvPdfFilename().replace(/\.pdf$/i, "");
      window.print();
      document.title = previousTitle;
      window.setTimeout(() => setStatus("idle"), 2500);
      return;
    } finally {
      document.documentElement.classList.remove("cv-pdf-export");
    }

    setStatus("idle");
  }, []);

  const label =
    status === "preparing" ? "Preparing PDF…" : status === "error" ? "Use print dialog" : "Download CV";

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
      {label}
    </button>
  );
}
