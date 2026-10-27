import { getCvPdfFilename } from "@/lib/cv-pdf-filename";

/**
 * Revoke only after the click has had a turn to start.
 * Revoking in the same turn drops the file in Firefox and Safari.
 * The anchor stays off-screen so the wait does not show a link.
 */
const BLOB_URL_LIFETIME_MS = 1000;

export async function downloadCvPdf() {
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
  link.style.inset = "0 auto auto 0";
  link.style.width = "1px";
  link.style.height = "1px";
  link.style.overflow = "hidden";
  link.style.opacity = "0";
  link.style.pointerEvents = "none";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, BLOB_URL_LIFETIME_MS);
}
