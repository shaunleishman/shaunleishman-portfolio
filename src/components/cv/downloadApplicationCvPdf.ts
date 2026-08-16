import {
  getApplicationBySlug,
  getApplicationCvPdfFilename,
} from "@/content/applications";
import { downloadCvPdf } from "@/components/cv/downloadCvPdf";

export async function downloadApplicationCvPdf(slug: string) {
  const application = getApplicationBySlug(slug);
  if (!application?.hasCv) {
    throw new Error("Application CV not found");
  }

  if (application.cvMode !== "tailored") {
    await downloadCvPdf();
    return;
  }

  const response = await fetch(`/api/cv/applications/${slug}/pdf`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getApplicationCvPdfFilename(application);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
