import { savePdfBlob } from "@/components/cv/savePdfBlob";

export function downloadCoverLetterPdf(slug: string) {
  return savePdfBlob(`/api/cv/cover-letter/${encodeURIComponent(slug)}/pdf`);
}
