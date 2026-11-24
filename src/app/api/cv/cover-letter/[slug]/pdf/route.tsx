import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterPdfDocument } from "@/components/cv/CoverLetterPdfDocument";
import { coverLetterShared, getApplicationBySlug } from "@/content/applications";
import { siteConfig } from "@/content/projects";
import { getCachedPdfBuffer } from "@/lib/application-pdf-cache";
import { getCoverLetterPdfFilename } from "@/lib/application-pdf-filename";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const application = getApplicationBySlug(slug);

  if (!application?.hasCoverLetter) {
    return NextResponse.json({ error: "Cover letter not found" }, { status: 404 });
  }

  const stamp = JSON.stringify({
    letter: {
      slug: application.slug,
      company: application.company,
      jobTitle: application.jobTitle,
      roleMeta: application.roleMeta,
      greeting: application.greeting,
      paragraphs: application.paragraphs,
      closing: application.closing,
    },
    coverLetterShared,
    name: siteConfig.name,
    brand: siteConfig.brand,
  });

  try {
    const buffer = await getCachedPdfBuffer(`cover-letter:${application.slug}`, stamp, () =>
      renderToBuffer(<CoverLetterPdfDocument letter={application} />),
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getCoverLetterPdfFilename(application)}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
