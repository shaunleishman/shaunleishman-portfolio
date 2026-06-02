import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { arbncoCaseStudyMeta } from "@/content/arbnco-case-study";
import { getIntroVisualBlocks } from "@/content/project-images";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { CaseStudyVisualBlocks } from "@/components/projects/CaseStudyVisualBlock";
import { CaseStudyListWithVisuals } from "@/components/projects/CaseStudyListWithVisuals";
import { ArbncoCaseStudyContent } from "@/components/projects/ArbncoCaseStudyContent";
import { CaseStudyBlock } from "@/components/projects/CaseStudyBlock";
import { CaseStudyTextSection } from "@/components/projects/CaseStudyTextSection";
import { SiteFeedbackSection } from "@/components/sections/SiteFeedbackSection";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.overview.slice(0, 160),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isArbnco = slug === "arbnco-synthetic-ai-data";

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero wide={isArbnco}>
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
            <p className="text-body-lg font-medium text-[#14a085] mb-6 max-w-2xl">
              {arbncoCaseStudyMeta.outcomeLine}
            </p>
          )}
          <p className="text-body-lg text-neutral-300 mb-6">{project.overview}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Project tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          {!isArbnco && (
            <CaseStudyVisualBlocks
              blocks={getIntroVisualBlocks(slug, "overview")}
              className="mt-10"
            />
          )}
        </PageHero>
      </section>

      {!isArbnco && (
        <Reveal variant="fade">
          <div
            className="relative aspect-[16/10] max-h-80 md:max-h-96 w-full overflow-hidden bg-neutral-100"
            role="img"
            aria-label={`${project.title} project thumbnail`}
          >
            <ProjectThumbnail project={project} priority />
          </div>
        </Reveal>
      )}

      <article className="section-padding bg-white">
        <div className={`container-site ${isArbnco ? "max-w-4xl" : "max-w-3xl"}`}>
          {!isArbnco && (
            <Reveal delay={60}>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-[var(--color-border)]">
                <div>
                  <dt className="text-label text-[var(--color-text-muted)] mb-1">Duration</dt>
                  <dd className="text-body font-semibold">{project.duration}</dd>
                </div>
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-h4 font-semibold tabular-nums text-[var(--color-text-primary)] mb-1">
                      {m.value}
                    </dt>
                    <dd className="text-body-sm text-[var(--color-text-muted)]">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {isArbnco ? (
            <ArbncoCaseStudyContent project={project} />
          ) : (
            <>
              <CaseStudyTextSection title="What was the problem?" slug={slug} section="problem">
                <p>{project.problem}</p>
              </CaseStudyTextSection>

              <CaseStudyBlock title="What was my role?" delay={40}>
                <ul className="list-disc pl-5 space-y-2">
                  {project.role.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CaseStudyBlock>

              <CaseStudyBlock title="What was our approach?" delay={40}>
                <CaseStudyListWithVisuals slug={slug} section="approach" items={project.approach} />
                <h3 className="text-h4 font-semibold mb-3 mt-8">Why this method?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {project.approachWhy.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CaseStudyBlock>

              <CaseStudyBlock title="Key findings" delay={40}>
                <CaseStudyListWithVisuals slug={slug} section="findings" items={project.keyFindings} />
              </CaseStudyBlock>

              <CaseStudyBlock title="What did I learn?" delay={40}>
                <ul className="space-y-4">
                  {project.learnings.map((item) => (
                    <li key={item} className="text-[var(--color-text-secondary)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </CaseStudyBlock>

              <CaseStudyBlock title="Limitations" delay={40}>
                <CaseStudyVisualBlocks
                  blocks={getIntroVisualBlocks(slug, "limitations")}
                  className="mb-8"
                />
                <ul className="list-disc pl-5 space-y-2">
                  {project.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CaseStudyBlock>

              <Reveal delay={60}>
                <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4">
                  <Button href="/work">← All projects</Button>
                  <Button href="/contact" variant="secondary">
                    Discuss this project
                  </Button>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </article>

      <SiteFeedbackSection dark={false} />
    </>
  );
}
