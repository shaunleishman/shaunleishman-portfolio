import { aboutOriginTimeline } from "@/content/about";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function AboutOriginTimeline() {
  return (
    <section
      aria-labelledby="about-origin-heading"
      data-analytics-section="about-origin"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>Origin story</SectionLabel>}
          title={
            <h2 id="about-origin-heading" className="text-h2 font-semibold mb-4 max-w-2xl">
              How I got here
            </h2>
          }
          description={
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl">
              Design came first, then psychology, then product work. Each step added a layer I still use
              every day.
            </p>
          }
        />

        <ol className="relative m-0 max-w-2xl list-none space-y-0 p-0">
          {aboutOriginTimeline.map((step, index) => {
            const isLast = index === aboutOriginTimeline.length - 1;

            return (
              <li key={step.title}>
                <Reveal delay={index * 70}>
                  <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4">
                    <div className="flex flex-col items-center">
                      <span
                        className="mt-1.5 size-3 shrink-0 rounded-full border-2 border-[var(--color-accent)] bg-white"
                        aria-hidden
                      />
                      {!isLast && (
                        <span
                          className="my-1 w-px flex-1 min-h-[2.5rem] bg-[var(--color-border)]"
                          aria-hidden
                        />
                      )}
                    </div>

                    <div className={isLast ? "pb-0" : "pb-8"}>
                      <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">{step.title}</h3>
                      <p className="mt-1 text-body text-[var(--color-text-secondary)]">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
