import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { TagList } from "@/components/ui/Tag";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "UX/UI design case studies: research, co-design, and usability testing.",
};

export default function WorkPage() {
  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white">
                Work
              </li>
            </ol>
          </nav>
          <h1 className="text-h1 font-semibold mb-4">Selected work</h1>
          <p className="text-body-lg text-neutral-300">
            Case studies from healthcare, public services, and sustainability. Each
            grounded in user research and tested with real users.
          </p>
        </PageHero>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <article className="group flex flex-col">
                  <Link
                    href={`/work/${project.slug}`}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-neutral-100 mb-5 focus-visible:outline-offset-4 group block motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.02]"
                    aria-label={`View case study: ${project.title}`}
                  >
                    <ProjectThumbnail project={project} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </Link>
                  <h2 className="text-h4 font-semibold mb-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h2>
                  <p className="mb-4 text-body-sm text-[var(--color-text-secondary)]">
                    {project.overview.slice(0, 120)}…
                  </p>
                  <TagList tags={project.tags} aria-label="Project tags" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
