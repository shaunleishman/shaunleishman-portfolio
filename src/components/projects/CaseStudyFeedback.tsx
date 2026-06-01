"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";

const RELEVANCE = [
  { id: "very", label: "Very relevant" },
  { id: "somewhat", label: "Somewhat relevant" },
  { id: "not", label: "Not relevant" },
] as const;

const REASONS = [
  "Wrong industry",
  "Wrong skills",
  "Too technical",
  "Not enough detail",
  "Looking for different experience",
] as const;

type CaseStudyFeedbackProps = {
  projectSlug: string;
};

export function CaseStudyFeedback({ projectSlug }: CaseStudyFeedbackProps) {
  const [relevance, setRelevance] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function submit(nextRelevance: string, nextReason?: string) {
    setRelevance(nextRelevance);
    if (nextReason) setReason(nextReason);

    try {
      const sessionId =
        sessionStorage.getItem("portfolio_session") ??
        (() => {
          const id = crypto.randomUUID();
          sessionStorage.setItem("portfolio_session", id);
          return id;
        })();

      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: "click",
          path: `/work/${projectSlug}`,
          metadata: {
            feedback: nextRelevance,
            reason: nextReason ?? null,
          },
        }),
      });
    } catch {
      /* non-blocking */
    }

    if (nextRelevance === "very" || (nextRelevance !== "very" && nextReason)) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="text-body-sm text-[var(--color-text-muted)] motion-safe:animate-[fade-in_0.3s_ease-out]">
        Thanks for the feedback.
      </p>
    );
  }

  return (
    <div className="surface-muted p-4 not-prose">
      <p className="text-body-sm font-medium text-[var(--color-text-primary)] mb-3">
        Was this project relevant to you?
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {RELEVANCE.map((option) => (
          <FilterChip
            key={option.id}
            label={option.label}
            selected={relevance === option.id}
            onClick={() => submit(option.id)}
            accent="teal"
          />
        ))}
      </div>

      {relevance && relevance !== "very" && (
        <>
          <p className="text-body-sm text-[var(--color-text-muted)] mb-2">What was the mismatch?</p>
          <div className="flex flex-wrap gap-2">
            {REASONS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={reason === option}
                onClick={() => submit(relevance, option)}
                accent="neutral"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
