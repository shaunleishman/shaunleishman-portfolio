import { skills } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SkillsSection() {
  return (
    <section
      aria-labelledby="skills-heading"
      data-analytics-section="skills"
      className="section-padding bg-white border-t border-[var(--color-border)]"
    >
      <div className="container-site">
        <SectionLabel>What I do</SectionLabel>
        <h2 id="skills-heading" className="text-h2 font-semibold mb-4 max-w-2xl">
          UX/UI design skills
        </h2>
        <p className="text-body-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl">
          Research-led design across discovery, prototyping, and validation — tailored
          to complex domains where trust and clarity matter most.
        </p>

        <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {skills.map((skill) => (
            <li
              key={skill.title}
              className="grid gap-4 py-8 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr_1fr] lg:gap-12 items-start"
            >
              <h3 className="text-h4 font-semibold">{skill.title}</h3>
              <p className="text-body text-[var(--color-text-secondary)] lg:col-span-1">
                {skill.description}
              </p>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-body-sm text-[var(--color-text-secondary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
