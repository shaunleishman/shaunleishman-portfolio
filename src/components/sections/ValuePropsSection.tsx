import { valueProps } from "@/content/projects";
import { valuePropIcons } from "@/lib/icon-maps";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function ValuePropsSection() {
  return (
    <section
      aria-labelledby="value-props-heading"
      data-analytics-section="value-props"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>Why work with me</SectionLabel>}
          title={
            <h2 id="value-props-heading" className="text-h2 font-semibold mb-12">
              4 reasons why
            </h2>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {valueProps.map((prop, index) => {
            const Icon = valuePropIcons[index];
            return (
              <Reveal key={prop.title} delay={index * 70}>
                <article className="surface-card-interactive h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-8">
                  {Icon && (
                    <IconBadge icon={Icon} size="lg" variant="light" className="mb-5" />
                  )}
                  <h3 className="text-h4 font-semibold mb-3">{prop.title}</h3>
                  <p className="text-body text-[var(--color-text-secondary)]">
                    {prop.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
