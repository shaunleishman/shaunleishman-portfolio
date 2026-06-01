import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

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

  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <div className="container-site max-w-3xl">
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

          <h1 className="text-h1 font-semibold mb-6">{project.title}</h1>
          <ul className="flex flex-wrap gap-2 mb-8" aria-label="Project tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          <p className="text-body-lg text-neutral-300">{project.overview}</p>
        </div>
      </section>

      <div
        className={`h-64 md:h-80 bg-gradient-to-br ${project.accentClass}`}
        role="img"
        aria-label={`${project.title} project visual`}
      />

      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-[var(--color-border)]">
            <div>
              <dt className="text-label text-[var(--color-text-muted)] mb-1">Duration</dt>
              <dd className="text-body font-semibold">{project.duration}</dd>
            </div>
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-label text-[var(--color-text-muted)] mb-1">{m.label.split(" ").slice(0, 3).join(" ")}</dt>
                <dd className="text-h4 font-semibold tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>

          <CaseStudyBlock title="What was the problem?">{project.problem}</CaseStudyBlock>

          <CaseStudyBlock title="What was my role?">
            <ul className="list-disc pl-5 space-y-2">
              {project.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="What was our approach?">
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="text-h4 font-semibold mb-3">Why this method?</h3>
            <ul className="list-disc pl-5 space-y-2">
              {project.approachWhy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Key findings">
            <ul className="list-disc pl-5 space-y-2">
              {project.keyFindings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="What did I learn?">
            <ul className="space-y-4">
              {project.learnings.map((item) => (
                <li key={item} className="text-[var(--color-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Limitations">
            <ul className="list-disc pl-5 space-y-2">
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4">
            <Button href="/work">← All projects</Button>
            <Button href="/contact" variant="secondary">
              Discuss this project
            </Button>
          </div>
        </div>
      </article>

      <CTASection dark={false} />
    </>
  );
}

function CaseStudyBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12" aria-labelledby={title.replace(/\s/g, "-").toLowerCase()}>
      <h2
        id={title.replace(/\s/g, "-").toLowerCase()}
        className="text-h3 font-semibold mb-4"
      >
        {title}
      </h2>
      <div className="text-body-lg text-[var(--color-text-secondary)]">{children}</div>
    </section>
  );
}
