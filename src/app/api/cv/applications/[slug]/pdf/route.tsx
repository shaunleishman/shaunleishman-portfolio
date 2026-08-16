import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CvPdfDocument } from "@/components/cv/CvPdfDocument";
import {
  getApplicationBySlug,
  getApplicationCvPdfFilename,
} from "@/content/applications";
import { getApplicationCvContent } from "@/content/application-cvs";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const application = getApplicationBySlug(slug);
  const content = getApplicationCvContent(slug);

  if (!application?.hasCv || application.cvMode !== "tailored" || !content) {
    return NextResponse.json({ error: "Application CV not found" }, { status: 404 });
  }

  try {
    const buffer = await renderToBuffer(<CvPdfDocument content={content} />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getApplicationCvPdfFilename(application)}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
