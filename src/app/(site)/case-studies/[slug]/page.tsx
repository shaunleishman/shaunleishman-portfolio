import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeuristicEvaluationReport } from "@/components/metrics/heuristic-evaluation/HeuristicEvaluationReport";
import { PublicReportShell } from "@/components/case-studies/PublicReportShell";
import { getEvaluationBySlug } from "@/content/heuristic-evaluations";
import { siteConfig } from "@/content/projects";
import { CASE_STUDY_ENTRIES } from "@/lib/admin-nav";
import { caseStudyDocumentTitle, caseStudyShareDescription } from "@/lib/case-study-report";

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

  const title = caseStudyDocumentTitle(evaluation);
  const description = caseStudyShareDescription(evaluation);
  const url = `${siteConfig.siteUrl}/case-studies/${slug}`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
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
