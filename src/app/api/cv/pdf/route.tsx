import { NextResponse } from "next/server";
import { getCvPdfFilename } from "@/lib/cv-pdf-filename";
import { getCvPdfBuffer } from "@/lib/cv-pdf-buffer";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await getCvPdfBuffer();

    // Copy the bytes. The cached buffer must stay intact for the next request.
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getCvPdfFilename()}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
