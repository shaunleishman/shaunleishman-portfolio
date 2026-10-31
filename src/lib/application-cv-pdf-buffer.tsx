import { renderToBuffer } from "@react-pdf/renderer";
import { CvPdfDocument } from "@/components/cv/CvPdfDocument";
import type { CvContent } from "@/content/cv";
import { siteConfig } from "@/content/projects";
import { getCachedPdfBuffer } from "@/lib/application-pdf-cache";

/**
 * Tailored application CVs only. The public CV route stays uncached here so
 * this pass does not change that download.
 * `quote` is in the stamp because the PDF prints it under the header.
 */
export function getApplicationCvPdfBuffer(content: CvContent) {
  const stamp = JSON.stringify({
    density: "compact",
    content,
    name: siteConfig.name,
    quote: siteConfig.quote,
    brand: siteConfig.brand,
  });

  return getCachedPdfBuffer(`application-cv:${stamp}`, () =>
    renderToBuffer(<CvPdfDocument content={content} density="compact" />),
  );
}
