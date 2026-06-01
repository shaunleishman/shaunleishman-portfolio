import { valueProps } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ValuePropsSection() {
  return (
    <section
      aria-labelledby="value-props-heading"
      data-analytics-section="value-props"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <SectionLabel>Why work with me</SectionLabel>
        <h2 id="value-props-heading" className="text-h2 font-semibold mb-12">
          4 reasons why
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
          {valueProps.map((prop) => (
            <article key={prop.title}>
              <h3 className="text-h4 font-semibold mb-3">{prop.title}</h3>
              <p className="text-body text-[var(--color-text-secondary)]">
                {prop.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
