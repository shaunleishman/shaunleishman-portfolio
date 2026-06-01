"use client";

import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FeaturedWork() {
  return (
    <section
      aria-labelledby="featured-work-heading"
      data-analytics-section="featured-work"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <SectionLabel>Featured work</SectionLabel>
        <h2 id="featured-work-heading" className="text-h2 font-semibold mb-12 max-w-2xl">
          Design grounded in research
        </h2>

        <div className="flex flex-col gap-16 lg:gap-24">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
            >
              <Link
                href={`/work/${project.slug}`}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${project.accentClass} order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                aria-label={`View case study: ${project.title}`}
              >
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-body-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-h3 font-semibold tabular-nums">{metric.value}</dt>
                      <dd className="text-body-sm text-[var(--color-text-muted)] mt-1">
                        {metric.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/work"
            className="text-body font-medium text-[var(--color-accent)] hover:underline underline-offset-4 min-h-[44px] inline-flex items-center"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
