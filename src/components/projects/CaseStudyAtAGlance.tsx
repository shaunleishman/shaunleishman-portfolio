"use client";

import { Reveal } from "@/components/ui/Reveal";

type CaseStudyAtAGlanceProps = {
  id?: string;
  summary?: string;
  problem: string;
  contribution: string;
  highlights: string[];
  methods: string[];
  accentClass?: string;
};

export function CaseStudyAtAGlance({
  id = "at-a-glance",
  summary,
  problem,
  contribution,
  highlights,
  methods,
  accentClass = "from-[#0d7377] to-[#14a085]",
}: CaseStudyAtAGlanceProps) {
  return (
    <Reveal variant="up">
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        className="mb-14 scroll-mt-36 surface-muted p-6 md:p-8"
      >
        <h2 id={`${id}-heading`} className="text-h4 font-semibold mb-1">
          At a glance
        </h2>
        {summary && (
          <p className="text-body-sm text-[var(--color-text-muted)] mb-6 max-w-2xl">{summary}</p>
        )}

        <ul className="grid gap-3 sm:grid-cols-3 mb-8 pb-8 border-b border-[var(--color-border)]">
          {highlights.map((item, index) => (
            <li key={item}>
              <Reveal delay={index * 50} variant="scale">
                <div className="rounded-lg bg-white border border-[var(--color-border)] px-3 py-2.5 text-body-sm text-[var(--color-text-secondary)]">
                  {item}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              The challenge
            </h3>
            <p className="text-body text-[var(--color-text-secondary)]">{problem}</p>
          </div>
          <div>
            <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              My contribution
            </h3>
            <p className="text-body text-[var(--color-text-secondary)]">{contribution}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
            Methods &amp; skills
          </h3>
          <ul className="flex flex-wrap gap-2" aria-label="Methods and skills demonstrated">
            {methods.map((method) => (
              <li
                key={method}
                className={`rounded-full bg-gradient-to-r ${accentClass} px-3 py-1 text-body-sm font-medium text-white`}
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
