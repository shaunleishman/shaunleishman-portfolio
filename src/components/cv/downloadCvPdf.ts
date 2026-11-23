import { getCvPdfFilename } from "@/lib/cv-pdf-filename";

/** How long the object URL stays alive after the browser is asked to save. */
const BLOB_URL_LIFETIME_MS = 1000;

let inFlight: Promise<void> | null = null;

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
  link.tabIndex = -1;
  link.setAttribute("aria-hidden", "true");
  // display:none is ignored by some browsers. Keep the anchor off-screen.
  link.style.position = "fixed";
  link.style.left = "-9999px";
  document.body.appendChild(link);
  link.click();

  // Do not await this timer. Waiting would hold the button on
  // "Preparing PDF…" for an extra second. Revoking in the same turn
  // as the click cancels the save.
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, BLOB_URL_LIFETIME_MS);
}

export function downloadCvPdf() {
  if (!inFlight) {
    inFlight = saveCvPdf().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}
