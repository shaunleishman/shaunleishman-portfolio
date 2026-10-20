import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CaseStudyDeckDocument } from "@/components/case-studies/CaseStudyDeckDocument";
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
    kind: "deck",
    evaluation,
    errorMessage: "Deck generation failed",
    render: () => renderToBuffer(<CaseStudyDeckDocument evaluation={evaluation} />),
  });
}
