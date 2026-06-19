import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CopyShareLinkButton } from "@/components/case-studies/CopyShareLinkButton";
import { HeuristicEvaluationReport } from "@/components/metrics/heuristic-evaluation/HeuristicEvaluationReport";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
        <p className="text-body-sm text-[var(--color-text-muted)]">
          Share the public, unlisted version of this report.
        </p>
        <CopyShareLinkButton slug={slug} />
      </div>
      <HeuristicEvaluationReport evaluation={evaluation} />
    </AdminShell>
  );
}
