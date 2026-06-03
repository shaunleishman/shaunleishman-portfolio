import { skills } from "@/content/projects";
import { skillIcons } from "@/lib/icon-maps";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function SkillsSection() {
  return (
    <section
      aria-labelledby="skills-heading"
      data-analytics-section="skills"
      className="section-padding bg-white border-t border-[var(--color-border)]"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>What I do</SectionLabel>}
          title={
            <h2 id="skills-heading" className="text-h2 font-semibold mb-4 max-w-2xl">
              UX/UI design skills
            </h2>
          }
          description={
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl">
              Research-led design across discovery, prototyping, and validation, tailored
              to complex domains where trust and clarity matter most.
            </p>
          }
        />

        <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill.title];
            return (
              <li key={skill.title}>
                <Reveal delay={index * 50}>
                  <div className="grid gap-4 py-8 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_200px_1fr_1fr] lg:gap-8 items-start">
                    <div className="flex gap-4 items-start md:contents">
                      {Icon && <IconBadge icon={Icon} size="lg" variant="light" className="shrink-0" />}
                      <h3 className="text-h4 font-semibold flex-1 md:col-start-2">{skill.title}</h3>
                    </div>
                    <p className="text-body text-[var(--color-text-secondary)] md:col-start-2 lg:col-start-3">
                      {skill.description}
                    </p>
                    <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0 lg:col-start-4 lg:justify-end">
                      {skill.items.map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-3 py-1.5 text-body-sm leading-none min-h-8 whitespace-nowrap text-[var(--color-text-secondary)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
