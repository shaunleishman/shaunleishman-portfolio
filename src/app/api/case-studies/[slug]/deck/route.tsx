import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CaseStudyDeckDocument } from "@/components/case-studies/CaseStudyDeckDocument";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";
import { caseStudyPdfHeaders } from "@/lib/case-study-download";
import { getCachedCaseStudyPdf } from "@/lib/case-study-pdf-cache";

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
    const buffer = await getCachedCaseStudyPdf("deck", evaluation, () =>
      renderToBuffer(<CaseStudyDeckDocument evaluation={evaluation} />),
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: caseStudyPdfHeaders(evaluation.slug, "deck"),
    });
  } catch {
    return NextResponse.json({ error: "Deck generation failed" }, { status: 500 });
  }
}
