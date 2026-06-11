"use client";

import { ShowcasePageShell } from "./ShowcasePageShell";

/** Reserved slots for usage patterns: content to be added later. */
export const USAGE_PATTERN_SLOTS = [
  {
    id: "forms",
    title: "Form layouts",
    description: "Login, settings, and multi-step project forms.",
    status: "coming-soon" as const,
  },
  {
    id: "tables",
    title: "Data tables",
    description: "Meter lists, filters, bulk actions, and column customisation.",
    status: "coming-soon" as const,
  },
  {
    id: "dashboards",
    title: "Dashboard shells",
    description: "Sidebar navigation, page headers, and consumption overview layouts.",
    status: "coming-soon" as const,
  },
  {
    id: "feedback",
    title: "Feedback & states",
    description: "Validation, empty states, loading, and success confirmations.",
    status: "coming-soon" as const,
  },
];

export default function UsageExamples() {
  return (
    <ShowcasePageShell className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[var(--colour-labels-neutral)] sm:text-2xl">Usage patterns</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--colour-labels-neutral)]">
          Real-world compositions that combine tokens and components. Pattern content will be added here as it is
          documented: each slot is reserved and ready to fill in.
        </p>
      </div>

      <div className="rounded-[var(--radius-large-radius)] border border-dashed border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-6">
        <p className="text-sm font-semibold text-[var(--colour-labels-primary)]">Patterns coming soon</p>
        <p className="mt-2 text-sm text-[var(--colour-labels-neutral)]">
          Share your pattern examples when ready and they will appear in the sections below.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {USAGE_PATTERN_SLOTS.map((slot) => (
          <article
            key={slot.id}
            className="rounded-[var(--radius-large-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-5"
          >
            <span className="inline-flex rounded-full bg-[var(--colour-states-warning-bg)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--colour-states-warning)]">
              Coming soon
            </span>
            <h3 className="mt-3 text-base font-semibold text-[var(--colour-labels-neutral)]">{slot.title}</h3>
            <p className="mt-1 text-sm text-[var(--colour-labels-disabled)]">{slot.description}</p>
            <div className="mt-4 min-h-[5rem] rounded-[var(--radius-medium-radius)] border border-dashed border-[var(--grey-n200)] bg-[var(--colour-surfaces-bg)]" />
          </article>
        ))}
      </div>
    </ShowcasePageShell>
  );
}
