import { NextResponse } from "next/server";
import {
  getApplicationBySlug,
  getCoverLetterPdfFilename,
} from "@/content/applications";
import { getCoverLetterPdfBuffer } from "@/lib/cover-letter-pdf-buffer";

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

  try {
    const buffer = await getCoverLetterPdfBuffer(application);

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
