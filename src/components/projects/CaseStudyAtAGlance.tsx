"use client";

import { GitBranch, LayoutDashboard, Timer, type LucideIcon } from "lucide-react";
import { CaseStudyTwoColumn } from "@/components/projects/CaseStudyLayout";
import { CaseStudySectionHeader } from "@/components/projects/CaseStudySectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HIGHLIGHT_ICONS: LucideIcon[] = [GitBranch, LayoutDashboard, Timer];

type CaseStudyAtAGlanceProps = {
  id?: string;
  title?: string;
  summary?: string;
  productGoal?: string;
  team?: string;
  problem: string;
  contribution: string;
  highlights: string[];
  methods: { label: string; percent: number }[];
  accentColor?: string;
};

export function CaseStudyAtAGlance({
  id = "at-a-glance",
  title = "Summary",
  summary,
  productGoal,
  team,
  problem,
  contribution,
  highlights,
  methods,
  accentColor = "var(--color-accent)",
}: CaseStudyAtAGlanceProps) {
  return (
    <Reveal variant="up">
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        className="mb-16 scroll-mt-36 surface-muted p-6 md:mb-20 md:p-8"
      >
        <CaseStudySectionHeader
          id={id}
          title={title}
          lead={summary}
        />

        <ul className="mb-8 grid gap-4 border-b border-[var(--color-border)] pb-8 sm:grid-cols-3 sm:items-stretch">
          {highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];

            return (
              <li key={item} className="h-full">
                <Reveal delay={index * 50} variant="scale" className="h-full">
                  <div className="flex h-full items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white p-4 sm:gap-5">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <p className="min-w-0 flex-1 text-body-sm font-medium leading-snug text-[var(--color-text-primary)]">
                      {item}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="grid gap-6 md:grid-cols-2">
          {productGoal && (
            <div>
              <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                Product goal
              </h3>
              <p className="text-body-sm text-[var(--color-text-secondary)]">{productGoal}</p>
            </div>
          )}
          <div className={productGoal ? undefined : "md:col-span-2"}>
            <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              User problem
            </h3>
            <p className="text-body-sm text-[var(--color-text-secondary)]">{problem}</p>
          </div>
        </div>

        {team ? (
          <CaseStudyTwoColumn className="mt-6">
            <div>
              <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                Team
              </h3>
              <p className="line-clamp-3 text-body-sm text-[var(--color-text-secondary)]">{team}</p>
            </div>
            <div>
              <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                What I owned
              </h3>
              <p className="line-clamp-3 text-body-sm text-[var(--color-text-secondary)]">
                {contribution}
              </p>
            </div>
          </CaseStudyTwoColumn>
        ) : (
          <div className="mt-6">
            <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              What I owned
            </h3>
            <p className="line-clamp-3 text-body-sm text-[var(--color-text-secondary)]">
              {contribution}
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-label uppercase tracking-wide text-[var(--color-text-muted)]">
              Methods &amp; skills
            </h3>
            <span className="text-[0.6875rem] text-[var(--color-text-muted)]">
              Rough share of my effort
            </span>
          </div>
          <ul
            className="m-0 flex list-none flex-wrap items-center gap-2 p-0"
            aria-label="Methods and skills demonstrated, with rough share of effort"
          >
            {methods.map((method) => (
              <li
                key={method.label}
                className="inline-flex items-center gap-2 rounded-full py-1.5 pl-3.5 pr-2 text-body-sm font-medium leading-none text-white"
                style={{ backgroundColor: accentColor }}
              >
                {method.label}
                <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-[0.6875rem] font-semibold tabular-nums">
                  {method.percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
