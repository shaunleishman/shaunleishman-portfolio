import { filenameFromContentDisposition, savePdfBlob } from "@/components/cv/savePdfBlob";
import type { ApplicationCvMode } from "@/content/application-model";

export async function downloadApplicationCvPdf(slug: string, cvMode?: ApplicationCvMode) {
  const tailored = cvMode === "tailored";
  const response = await fetch(
    tailored ? `/api/cv/applications/${encodeURIComponent(slug)}/pdf` : "/api/cv/pdf",
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const filename = filenameFromContentDisposition(
    response.headers.get("Content-Disposition"),
    "cv.pdf",
  );
  savePdfBlob(blob, filename);
}
