import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeuristicEvaluationReport } from "@/components/metrics/heuristic-evaluation/HeuristicEvaluationReport";
import { PublicReportShell } from "@/components/case-studies/PublicReportShell";
import { CASE_STUDY_ENTRIES } from "@/lib/admin-nav";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
    description: evaluation.executiveSummary.whatWasEvaluated.slice(0, 160),
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
    >
      <HeuristicEvaluationReport evaluation={evaluation} hideBack />
    </PublicReportShell>
  );
}
