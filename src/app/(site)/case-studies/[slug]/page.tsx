import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeuristicEvaluationReport } from "@/components/metrics/heuristic-evaluation/HeuristicEvaluationReport";
import { PublicReportShell } from "@/components/case-studies/PublicReportShell";
import { CASE_STUDY_ENTRIES } from "@/lib/admin-nav";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Meta descriptions stay within 160 characters and do not end mid-word. */
function metaDescription(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max + 1);
  const space = cut.lastIndexOf(" ");
  return (space > 0 ? cut.slice(0, space) : flat.slice(0, max)).trimEnd();
}

export function generateStaticParams() {
  return CASE_STUDY_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evaluation = getEvaluationBySlug(slug);

  if (!evaluation) {
    return {
      title: "Case study not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${evaluation.title} · Case study`,
    description: metaDescription(evaluation.executiveSummary.whatWasEvaluated),
    robots: { index: false, follow: false },
  };
}

export default async function PublicCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const evaluation = getEvaluationBySlug(slug);

  if (!evaluation) {
    notFound();
  }

  return (
    <PublicReportShell
      title={evaluation.title}
      description={`Heuristic evaluation for ${evaluation.client}`}
      backHref="/work"
      backLabel="Back to portfolio"
      pdfSlug={slug}
    >
      <HeuristicEvaluationReport evaluation={evaluation} hideBack />
    </PublicReportShell>
  );
}
