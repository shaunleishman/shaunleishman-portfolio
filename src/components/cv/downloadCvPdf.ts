import { getCvPdfFilename } from "@/lib/cv-pdf-filename";

/** How long the object URL stays alive after the click. Not awaited. */
const BLOB_URL_LIFETIME_MS = 1000;

let inFlight: Promise<void> | null = null;

/**
 * Saves the public CV PDF. A second call while the first is still fetching
 * shares that request. The object URL is revoked after the click, on a timer,
 * so the browser can start the download. This function returns once the click
 * has run.
 */
export function downloadCvPdf(): Promise<void> {
  if (inFlight) return inFlight;
  const pending = saveCvPdf().finally(() => {
    if (inFlight === pending) inFlight = null;
  });
  inFlight = pending;
  return pending;
}

async function saveCvPdf(): Promise<void> {
  const response = await fetch("/api/cv/pdf", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getCvPdfFilename();
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
