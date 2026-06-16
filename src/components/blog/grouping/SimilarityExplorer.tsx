"use client";

import { useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { FilterChipRow } from "@/components/blog/kano/KanoControls";
import { cn } from "@/lib/utils";
import { groupingHintIn, groupingMorphTransition } from "./grouping-motion";
import { GroupingWidget } from "./GroupingWidget";

type Mode = "inconsistent" | "consistent" | "flattened";

type CardSpec = {
  title: string;
  body: string;
  tag?: string;
  action?: string;
  actionPrimary?: boolean;
  icon?: boolean;
  tagStyle?: boolean;
};

const CARDS: CardSpec[] = [
  { title: "Getting started", body: "A quick tour of the main areas in your account.", action: "Read guide", icon: true },
  { title: "Upgrade plan", body: "Unlock more storage and team seats.", action: "Upgrade now", actionPrimary: true },
  {
    title: "Account details",
    body: "Review profile, billing, and notification settings.",
    action: "Review settings",
    tag: "Review",
    tagStyle: true,
  },
  { title: "Help centre", body: "Browse FAQs or talk to support.", action: "Get help" },
  { title: "Activity log", body: "Recent sign-ins and account changes.", action: "View log", icon: false },
  {
    title: "What's new",
    body: "Latest improvements and release notes.",
    action: "See updates",
    tag: "New",
    tagStyle: true,
  },
];

function SimilarityCard({ card, mode, index }: { card: CardSpec; mode: Mode; index: number }) {
  const isConsistent = mode === "consistent";
  const isFlattened = mode === "flattened";
  const showIcon = isConsistent || (!isFlattened && Boolean(card.icon));
  const showTagStyle = !isConsistent && !isFlattened && card.tagStyle && Boolean(card.tag);
  const footerLabel = isFlattened ? "Learn more" : showTagStyle ? card.tag! : card.action ?? card.tag ?? "";
  const isTag = showTagStyle;
  const isPrimary = !isConsistent && !isFlattened && Boolean(card.actionPrimary);
  const actionAlign =
    !isConsistent && !isFlattened ? (index === 1 ? "self-start" : index === 3 ? "self-end" : "") : "";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-white p-3",
        groupingMorphTransition,
      )}
      style={{ transitionDelay: `${index * 45}ms` }}
    >
      <div
        className={cn(
          "flex items-center gap-2 overflow-hidden",
          groupingMorphTransition,
          isConsistent ? "mb-2" : "mb-0 max-h-0 opacity-0",
          showIcon && !isConsistent && "mb-2 max-h-8 opacity-100",
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center text-[0.625rem]",
            groupingMorphTransition,
            isConsistent
              ? "size-6 rounded-md bg-[var(--color-bg-muted)]"
              : "size-7 rounded-full bg-[var(--color-accent)]/10",
            !showIcon && "size-0 opacity-0",
          )}
          aria-hidden={!showIcon}
        >
          ◆
        </span>
        {isConsistent ? (
          <h4 className="text-[0.8125rem] font-semibold text-[var(--color-text-primary)]">{card.title}</h4>
        ) : null}
      </div>

      {!isConsistent ? (
        <h4
          className={cn(
            "font-semibold text-[var(--color-text-primary)] motion-safe:transition-[font-size] motion-safe:duration-500 motion-safe:ease-out",
            isFlattened ? "text-[0.8125rem]" : index % 2 === 0 ? "text-[0.9375rem]" : "text-[0.75rem]",
          )}
        >
          {card.title}
        </h4>
      ) : null}

      <p
        className={cn(
          "flex-1 text-[0.75rem] leading-snug text-[var(--color-text-secondary)]",
          !isConsistent && "mt-1",
        )}
      >
        {card.body}
      </p>

      {footerLabel ? (
        <span
          className={cn(
            "mt-3 inline-flex w-fit rounded-md px-2 py-1 text-[0.6875rem] font-medium",
            groupingMorphTransition,
            isPrimary
              ? "border border-transparent bg-[var(--color-accent)] text-white"
              : isTag
                ? "border-transparent bg-transparent px-0 text-[var(--color-accent)]"
                : "border border-[var(--color-border)]",
            actionAlign,
          )}
        >
          {footerLabel}
        </span>
      ) : null}
    </article>
  );
}

export function SimilarityExplorer() {
  const [mode, setMode] = useState<Mode>("inconsistent");

  const hint =
    mode === "inconsistent"
      ? "Each card uses a different rhythm, so users relearn the pattern every time."
      : mode === "consistent"
        ? "Shared structure teaches the pattern once."
        : "Everything looks equal, so warnings and primary actions compete.";

  return (
    <GroupingWidget title="Law of Similarity" hint="Similar things should look related. Different jobs should feel different.">
      <FilterChipRow>
        <FilterChip label="Inconsistent" selected={mode === "inconsistent"} onClick={() => setMode("inconsistent")} />
        <FilterChip label="Consistent" selected={mode === "consistent"} onClick={() => setMode("consistent")} accent="accent" />
        <FilterChip label="Too similar" selected={mode === "flattened"} onClick={() => setMode("flattened")} />
      </FilterChipRow>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, index) => (
          <SimilarityCard key={card.title} card={card} mode={mode} index={index} />
        ))}
      </div>
      <p key={mode} className={cn("mt-3 text-body-sm text-[var(--color-text-secondary)]", groupingHintIn)}>
        {hint}
      </p>
    </GroupingWidget>
  );
}
