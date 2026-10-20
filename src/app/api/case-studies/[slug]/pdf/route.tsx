import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CaseStudyPdfDocument } from "@/components/case-studies/CaseStudyPdfDocument";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";
import { respondWithCaseStudyPdf } from "@/lib/case-study-pdf-response";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const evaluation = getEvaluationBySlug(slug);

  if (!evaluation) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  return respondWithCaseStudyPdf({
    request,
    kind: "report",
    evaluation,
    errorMessage: "PDF generation failed",
    render: () => renderToBuffer(<CaseStudyPdfDocument evaluation={evaluation} />),
  });
}
