"use client";

import { PRIMITIVE_TOKEN_COUNT, SEMANTIC_TOKEN_COUNT } from "@/design-systems/arbnco";
import { ShowcasePageShell } from "./ShowcasePageShell";

interface OverviewProps {
  onNavigate?: (section: "tokens" | "components") => void;
}

export default function Overview({ onNavigate }: OverviewProps) {
  return (
    <ShowcasePageShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-3 text-2xl font-semibold text-[var(--colour-labels-neutral)] sm:mb-4 sm:text-[32px]">
          Welcome to the Design System
        </h1>
        <p className="text-sm leading-relaxed text-[var(--colour-labels-neutral)] sm:text-base">
          A comprehensive collection of design tokens, components, and UX patterns to ensure consistency
          across all products and experiences.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-[var(--radius-large-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-6">
          <div className="mb-2 text-3xl font-semibold text-[var(--colour-labels-primary)] sm:text-[40px]">40</div>
          <div className="text-sm font-semibold">Components</div>
        </div>
        <div className="rounded-[var(--radius-large-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-6">
          <div className="mb-2 text-3xl font-semibold text-[var(--colour-labels-primary)] sm:text-[40px]">
            {PRIMITIVE_TOKEN_COUNT}
          </div>
          <div className="text-sm font-semibold">Primitive tokens</div>
        </div>
        <div className="rounded-[var(--radius-large-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="mb-2 text-3xl font-semibold text-[var(--colour-labels-primary)] sm:text-[40px]">
            {SEMANTIC_TOKEN_COUNT}
          </div>
          <div className="text-sm font-semibold">Semantic tokens</div>
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[var(--colour-labels-neutral)] sm:mb-6 sm:text-2xl">
          Design principles
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Consistency",
              body: "All components follow the same design language, ensuring a unified experience across all touchpoints.",
            },
            {
              title: "Accessibility",
              body: "Components are designed with accessibility in mind, supporting keyboard navigation and screen readers.",
            },
            {
              title: "Flexibility",
              body: "Each component offers multiple variants and states to adapt to different use cases and contexts.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-medium-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-6"
            >
              <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--colour-labels-neutral)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-large-radius)] bg-[var(--colour-surfaces-secondary-hover)] p-5 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold text-[var(--colour-labels-primary)]">Getting started</h2>
        <p className="mb-4 text-sm leading-relaxed text-[var(--colour-labels-neutral)]">
          Explore the design tokens to understand the foundational elements, then browse through components
          to see how they are built and used.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.("tokens")}
            className="rounded-[var(--radius-medium-radius)] bg-[var(--colour-surfaces-primary)] px-4 py-2 text-sm font-semibold text-[var(--colour-labels-reverse)] hover:bg-[var(--colour-surfaces-primary-hover)]"
          >
            View tokens
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("components")}
            className="rounded-[var(--radius-medium-radius)] border border-[var(--colour-outlines-selected)] bg-[var(--colour-surfaces-neutral)] px-4 py-2 text-sm font-semibold text-[var(--colour-labels-primary)] hover:bg-[var(--colour-surfaces-secondary-hover)]"
          >
            Browse components
          </button>
        </div>
      </div>
    </ShowcasePageShell>
  );
}
