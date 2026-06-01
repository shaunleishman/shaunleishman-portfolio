import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";

export function FeaturedWork() {
  return (
    <section
      aria-labelledby="featured-work-heading"
      data-analytics-section="featured-work"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>Featured work</SectionLabel>}
          title={
            <h2 id="featured-work-heading" className="text-h2 font-semibold mb-12 max-w-2xl">
              Design grounded in research
            </h2>
          }
        />

        <div className="flex flex-col gap-16 lg:gap-24">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <article className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <Link
                  href={`/work/${project.slug}`}
                  className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 order-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.01] ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  aria-label={`View case study: ${project.title}`}
                >
                  <ProjectThumbnail project={project} priority={index === 0} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <span
                    className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </Link>

                <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="text-h3 font-semibold mb-3">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <ul className="flex flex-wrap gap-2 mb-4" aria-label="Project tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>

                  <p className="text-body-lg text-[var(--color-text-secondary)] mb-6">
                    {project.overview.slice(0, 180)}…
                  </p>

                  <ul className="space-y-2">
                    {project.cardHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-body-sm text-[var(--color-text-secondary)]"
                      >
                        <span className="text-[var(--color-accent)] shrink-0" aria-hidden>
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16 text-center">
          <Link
            href="/work"
            className="text-body font-medium text-[var(--color-accent)] hover:underline underline-offset-4 min-h-[44px] inline-flex items-center"
          >
            View all projects →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
