import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessTabs } from "@/components/ui/ProcessTabs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      data-analytics-section="process"
      className="section-padding bg-[var(--color-bg-muted)]"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>How I work</SectionLabel>}
          title={
            <h2 id="process-heading" className="text-h2 font-semibold mb-4 max-w-xl">
              My design process
            </h2>
          }
          description={
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl">
              Structured, user-centred design from discovery to delivery. Built for teams
              that need evidence-backed decisions, not just polished screens.
            </p>
          }
        />
        <Reveal delay={80}>
          <ProcessTabs />
        </Reveal>
      </div>
    </section>
  );
}
