import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterPdfDocument } from "@/components/cv/CoverLetterPdfDocument";
import { coverLetterShared, type Application } from "@/content/applications";
import { siteConfig } from "@/content/projects";
import { getCachedPdfBuffer } from "@/lib/application-pdf-cache";

function coverLetterStamp(letter: Application) {
  return JSON.stringify({
    company: letter.company,
    jobTitle: letter.jobTitle,
    roleMeta: letter.roleMeta,
    greeting: letter.greeting ?? "",
    paragraphs: letter.paragraphs ?? [],
    closing: letter.closing ?? "",
    label: coverLetterShared.label,
    headline: coverLetterShared.headline,
    signOff: coverLetterShared.signOff,
    contact: coverLetterShared.contact,
    name: siteConfig.name,
    brand: siteConfig.brand,
  });
}

export function getCoverLetterPdfBuffer(letter: Application) {
  return getCachedPdfBuffer(`cover-letter:${coverLetterStamp(letter)}`, () =>
    renderToBuffer(<CoverLetterPdfDocument letter={letter} />),
  );
}
