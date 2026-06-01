"use client";

import { GitBranch, LayoutDashboard, Timer, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const HIGHLIGHT_ICONS: LucideIcon[] = [GitBranch, LayoutDashboard, Timer];

type CaseStudyAtAGlanceProps = {
  id?: string;
  title?: string;
  summary?: string;
  problem: string;
  contribution: string;
  highlights: string[];
  methods: string[];
  accentColor?: string;
};

export function CaseStudyAtAGlance({
  id = "at-a-glance",
  title = "Summary",
  summary,
  problem,
  contribution,
  highlights,
  methods,
  accentColor = "#0d7377",
}: CaseStudyAtAGlanceProps) {
  return (
    <Reveal variant="up">
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        className="mb-14 scroll-mt-36 surface-muted p-6 md:p-8"
      >
        <h2 id={`${id}-heading`} className="text-h4 font-semibold mb-1">
          {title}
        </h2>
        {summary && (
          <p className="text-body-sm text-[var(--color-text-muted)] mb-6 max-w-2xl">{summary}</p>
        )}

        <ul className="grid gap-4 sm:grid-cols-3 mb-8 pb-8 border-b border-[var(--color-border)]">
          {highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];

            return (
              <li key={item} className="min-h-0">
                <Reveal delay={index * 50} variant="scale">
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <p className="text-body-sm font-medium leading-snug text-[var(--color-text-primary)]">
                      {item}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
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
                className="rounded-full px-3 py-1 text-body-sm font-medium text-white"
                style={{ backgroundColor: accentColor }}
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
