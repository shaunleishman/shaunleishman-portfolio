import { getApplicationBySlug, getCoverLetterPdfFilename } from "@/content/applications";

export async function downloadCoverLetterPdf(slug: string) {
  const application = getApplicationBySlug(slug);
  if (!application?.hasCoverLetter) {
    throw new Error("Cover letter not found");
  }

  const response = await fetch(`/api/cv/cover-letter/${slug}/pdf`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getCoverLetterPdfFilename(application);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
