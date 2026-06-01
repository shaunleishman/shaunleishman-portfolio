import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";

export const metadata: Metadata = {
  title: "Work",
  description: "UX/UI design case studies — research, co-design, and usability testing.",
};

export default function WorkPage() {
  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <div className="container-site max-w-3xl">
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
            Case studies from healthcare, public services, and sustainability — each
            grounded in user research and tested with real users.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="group flex flex-col">
                <Link
                  href={`/work/${project.slug}`}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mb-5 focus-visible:outline-offset-4 group block"
                  aria-label={`View case study: ${project.title}`}
                >
                  <ProjectThumbnail project={project} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </Link>
                <h2 className="text-h4 font-semibold mb-2">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-[var(--color-accent)] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-1">
                  {project.overview.slice(0, 120)}…
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Project tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
