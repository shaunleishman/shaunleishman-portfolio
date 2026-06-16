import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { HeuristicEvaluationReport } from "@/components/metrics/heuristic-evaluation/HeuristicEvaluationReport";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations/mg-employees";
import { CASE_STUDY_ENTRIES } from "@/lib/admin-nav";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDY_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const evaluation = getEvaluationBySlug(slug);

  if (!evaluation) {
    notFound();
  }

  return (
    <AdminShell title={evaluation.title} description={`Heuristic evaluation for ${evaluation.client}`}>
      <HeuristicEvaluationReport evaluation={evaluation} />
    </AdminShell>
  );
}
