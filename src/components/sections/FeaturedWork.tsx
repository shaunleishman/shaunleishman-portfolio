import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
                  className={`group relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-neutral-100 order-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.01] ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  aria-label={`View case study: ${project.title}`}
                >
                  <ProjectThumbnail project={project} priority={index === 0} />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 z-20 flex items-end justify-between p-6 md:p-8 pointer-events-none">
                    <div className="flex flex-wrap gap-2 pointer-events-none">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-body-sm font-medium text-white shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="rounded-full bg-white/20 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      aria-hidden
                    >
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>

                <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="text-h3 font-semibold mb-4">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-body-lg text-[var(--color-text-secondary)] mb-8">
                    {project.overview.slice(0, 180)}…
                  </p>

                  <ul className="space-y-2.5">
                    {project.cardHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-body-sm leading-snug text-[var(--color-text-secondary)]"
                      >
                        <span
                          className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                          aria-hidden
                        />
                        <span>{item}</span>
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
