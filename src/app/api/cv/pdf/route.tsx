import { NextResponse } from "next/server";
import { getCvPdfBuffer } from "@/lib/cv-pdf-buffer";
import { getCvPdfFilename } from "@/lib/cv-pdf-filename";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await getCvPdfBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getCvPdfFilename()}"`,
        // The browser should not pin the file. The server reuses one render per process
        // until the CV copy changes. The month in the filename is still read per request.
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("CV PDF generation failed", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
