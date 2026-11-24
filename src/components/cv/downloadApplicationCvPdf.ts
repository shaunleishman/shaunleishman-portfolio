import { savePdfBlob } from "@/components/cv/savePdfBlob";
import type { ApplicationCvMode } from "@/content/application-model";

/** Shared CVs use the public CV route. This module does not call downloadCvPdf. */
export function downloadApplicationCvPdf(slug: string, cvMode: ApplicationCvMode | undefined) {
  if (cvMode !== "tailored") {
    return savePdfBlob("/api/cv/pdf");
  }
  return savePdfBlob(`/api/cv/applications/${encodeURIComponent(slug)}/pdf`);
}
