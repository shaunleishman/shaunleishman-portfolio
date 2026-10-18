import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, type Project } from "@/content/projects";
import { arbncoCaseStudyMeta } from "@/content/arbnco-case-study";
import { nhsCaseStudyMeta } from "@/content/nhs-case-study";
import { omronCaseStudyMeta } from "@/content/omron-case-study";
import { excerpt } from "@/lib/excerpt";
import { isRichCaseStudySlug, RichCaseStudyBody } from "@/components/projects/RichCaseStudyBody";
import { TagList } from "@/components/ui/Tag";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/layout/PageHero";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const description = excerpt(project.overview, 160);
  const path = `/work/${project.slug}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description,
      url: path,
      type: "website",
    },
  };
}

async function SimpleCaseStudySlot({ project }: { project: Project }) {
  const { SimpleCaseStudyBody } = await import("@/components/projects/SimpleCaseStudyBody");
  return <SimpleCaseStudyBody project={project} />;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isArbnco = slug === "arbnco-synthetic-ai-data";
  const isNhs = slug === "nhs-111-waiting-times";
  const isOmron = slug === "omron-patient-monitoring";
  const isRichCaseStudy = isRichCaseStudySlug(slug);

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero wide={isRichCaseStudy}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white line-clamp-1">
                {project.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-h1 font-semibold mb-4">{project.title}</h1>
          {isArbnco && (
            <p className="text-body-lg font-medium text-[#26c6da] mb-6 max-w-2xl">
              {arbncoCaseStudyMeta.outcomeLine}
            </p>
          )}
          {isNhs && (
            <p className="text-body-lg font-medium text-[#41b6e6] mb-6 max-w-2xl">
              {nhsCaseStudyMeta.outcomeLine}
            </p>
          )}
          {isOmron && (
            <p className="text-body-lg font-medium text-[#5a9fd4] mb-6 max-w-2xl">
              {omronCaseStudyMeta.outcomeLine}
            </p>
          )}
          {!isRichCaseStudy && (
            <p className="text-body-lg text-neutral-300 mb-6">{project.overview}</p>
          )}
          <TagList tags={project.tags} aria-label="Project tags" />
          {!isRichCaseStudy && (
            <CaseStudyVisualBlocksSlot slug={slug} />
          )}
        </PageHero>
      </section>

      {isRichCaseStudy ? (
        <article className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <RichCaseStudyBody slug={slug} project={project} />
          </div>
        </article>
      ) : (
        <SimpleCaseStudySlot project={project} />
      )}

      <CTASection dark={false} />
    </>
  );
}

async function CaseStudyVisualBlocksSlot({ slug }: { slug: string }) {
  const { getIntroVisualBlocks } = await import("@/content/project-images");
  const { CaseStudyVisualBlocks } = await import("@/components/projects/CaseStudyVisualBlock");
  return (
    <CaseStudyVisualBlocks blocks={getIntroVisualBlocks(slug, "overview")} className="mt-10" />
  );
}
