import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CoverLetterPdfDocument } from "@/components/cv/CoverLetterPdfDocument";
import { getCoverLetterPdfFilename } from "@/content/cover-letter";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await renderToBuffer(<CoverLetterPdfDocument />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getCoverLetterPdfFilename()}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
