import { FlaskConical, PenTool, type LucideIcon } from "lucide-react";
import { aboutStatGroups, type AboutStatGroup } from "@/content/about";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const statGroupIcons: Record<AboutStatGroup["icon"], LucideIcon> = {
  research: FlaskConical,
  design: PenTool,
};

export function AboutStatsSection() {
  return (
    <section
      aria-labelledby="about-stats-heading"
      data-analytics-section="about-stats"
      className="section-padding border-y border-[var(--color-border)] bg-[var(--color-bg-muted)]"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>By the numbers</SectionLabel>}
          title={
            <h2 id="about-stats-heading" className="text-h2 font-semibold mb-4 max-w-2xl">
              Footprints in the snow
            </h2>
          }
          description={
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl">
              Numbers from real projects. They do not replace the work, but they show the depth behind it.
            </p>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {aboutStatGroups.map((group, groupIndex) => {
            const Icon = statGroupIcons[group.icon];

            return (
              <Reveal key={group.label} delay={groupIndex * 80}>
                <article className="h-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                  <header className="flex items-center gap-3 border-b border-[var(--color-border)] px-6 py-4 md:px-8">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${group.accent} 12%, white)`,
                        color: group.accent,
                      }}
                      aria-hidden
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-label font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      {group.label}
                    </h3>
                  </header>

                  <dl className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
                    {group.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col gap-1.5 px-4 py-6 md:px-5">
                        <dd
                          className="text-h3 font-semibold leading-none tabular-nums"
                          style={{ color: group.accent }}
                        >
                          {stat.value}
                        </dd>
                        <dt className="text-body-sm leading-snug text-[var(--color-text-secondary)]">
                          {stat.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
