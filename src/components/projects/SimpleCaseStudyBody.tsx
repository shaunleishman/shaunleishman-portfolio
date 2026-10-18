import type { Project } from "@/content/projects";
import { getIntroVisualBlocks } from "@/content/project-images";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { CaseStudyBlock } from "@/components/projects/CaseStudyBlock";
import { CaseStudyListWithVisuals } from "@/components/projects/CaseStudyListWithVisuals";
import { CaseStudyTextSection } from "@/components/projects/CaseStudyTextSection";
import { CaseStudyVisualBlocks } from "@/components/projects/CaseStudyVisualBlock";

type SimpleCaseStudyBodyProps = {
  project: Project;
};

/** Shorter case studies that are not one of the long-form reports. */
export async function SimpleCaseStudyBody({ project }: SimpleCaseStudyBodyProps) {
  return (
    <>
      <div className="bg-white">
        <div className="container-site max-w-3xl">
          <Reveal variant="fade">
            <div
              className="relative aspect-[16/10] max-h-80 w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 md:max-h-96"
              role="img"
              aria-label={`${project.title} project thumbnail`}
            >
              <ProjectThumbnail project={project} priority />
            </div>
          </Reveal>
        </div>
      </div>

      <article className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={60}>
            <dl className="mb-16 grid grid-cols-2 gap-6 border-b border-[var(--color-border)] pb-16 md:grid-cols-4">
              <div>
                <dt className="text-label mb-1 text-[var(--color-text-muted)]">Project duration</dt>
                <dd className="text-body font-semibold">{project.duration}</dd>
              </div>
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-h4 mb-1 font-semibold text-[var(--color-text-primary)] tabular-nums">
                    {metric.value}
                  </dt>
                  <dd className="text-body-sm text-[var(--color-text-muted)]">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <CaseStudyTextSection title="What was the problem?" slug={project.slug} section="problem">
            <p>{project.problem}</p>
          </CaseStudyTextSection>

          <CaseStudyBlock title="What was my role?" delay={40}>
            <ul className="list-disc space-y-2 pl-5">
              {project.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="What was our approach?" delay={40}>
            <CaseStudyListWithVisuals slug={project.slug} section="approach" items={project.approach} />
            <h3 className="text-h4 mt-8 mb-3 font-semibold">Why this method?</h3>
            <ul className="list-disc space-y-2 pl-5">
              {project.approachWhy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <CaseStudyBlock title="Key findings" delay={40}>
            <CaseStudyListWithVisuals slug={project.slug} section="findings" items={project.keyFindings} />
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
              blocks={getIntroVisualBlocks(project.slug, "limitations")}
              className="mb-8"
            />
            <ul className="list-disc space-y-2 pl-5">
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseStudyBlock>

          <Reveal delay={60}>
            <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-12 sm:flex-row">
              <Button href="/work">← All projects</Button>
              <Button href="/contact" variant="secondary">
                Discuss this project
              </Button>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
