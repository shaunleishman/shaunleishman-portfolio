import { getCvPdfFilename } from "@/lib/cv-pdf-filename";

/** How long the object URL and the off-screen anchor stay alive after click. */
const BLOB_URL_LIFETIME_MS = 1000;

let inFlight: Promise<void> | null = null;

export function downloadCvPdf(): Promise<void> {
  if (inFlight) return inFlight;

  inFlight = saveCvPdf().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

async function saveCvPdf() {
  const response = await fetch("/api/cv/pdf", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getCvPdfFilename();
  // Off-screen, not display:none. Some browsers skip the download for a hidden anchor.
  // Revoking in the same turn as click drops the file in Safari and Firefox.
  link.tabIndex = -1;
  link.setAttribute("aria-hidden", "true");
  link.style.position = "fixed";
  link.style.left = "-9999px";
  link.style.top = "0";
  document.body.appendChild(link);
  link.click();

  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, BLOB_URL_LIFETIME_MS);
}
