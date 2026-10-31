import { filenameFromContentDisposition, savePdfBlob } from "@/components/cv/savePdfBlob";

export async function downloadCoverLetterPdf(slug: string) {
  const response = await fetch(`/api/cv/cover-letter/${encodeURIComponent(slug)}/pdf`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    throw new Error("Cover letter not found");
  }

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const filename = filenameFromContentDisposition(
    response.headers.get("Content-Disposition"),
    "cover-letter.pdf",
  );
  savePdfBlob(blob, filename);
}
