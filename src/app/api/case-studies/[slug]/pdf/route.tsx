import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CaseStudyPdfDocument } from "@/components/case-studies/CaseStudyPdfDocument";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const evaluation = getEvaluationBySlug(slug);

  if (!evaluation) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  try {
    const buffer = await renderToBuffer(<CaseStudyPdfDocument evaluation={evaluation} />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}-heuristic-evaluation.pdf"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
