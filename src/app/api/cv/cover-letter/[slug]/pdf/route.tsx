import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterPdfDocument } from "@/components/cv/CoverLetterPdfDocument";
import {
  getCoverLetterBySlug,
  getCoverLetterPdfFilename,
} from "@/content/cover-letter";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const letter = getCoverLetterBySlug(slug);

  if (!letter) {
    return NextResponse.json({ error: "Cover letter not found" }, { status: 404 });
  }

  try {
    const buffer = await renderToBuffer(<CoverLetterPdfDocument letter={letter} />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getCoverLetterPdfFilename(letter)}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
