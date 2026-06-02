"use client";

import { usePathname } from "next/navigation";
import { useCallback, useId, useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const SCORE_LABELS: Record<number, string> = {
  1: "Not useful",
  2: "Slightly useful",
  3: "Moderately useful",
  4: "Very useful",
  5: "Extremely useful",
};

const POSITIVE_REASONS = [
  "Clear and easy to follow",
  "Relevant to my work",
  "Good level of detail",
  "Strong examples",
  "Shows skills well",
] as const;

const NEGATIVE_REASONS = [
  "Not enough detail",
  "Hard to navigate",
  "Not relevant to me",
  "Too generic",
  "Missing examples",
] as const;

const NEUTRAL_REASONS = [
  "Needs more depth",
  "Could be clearer",
  "Wrong focus for me",
  "Still exploring",
] as const;

type Sentiment = "negative" | "neutral" | "positive";

type SiteFeedbackSectionProps = {
  dark?: boolean;
};

function getSentiment(score: number): Sentiment {
  if (score <= 2) return "negative";
  if (score >= 4) return "positive";
  return "neutral";
}

function getReasonOptions(sentiment: Sentiment) {
  if (sentiment === "positive") return POSITIVE_REASONS;
  if (sentiment === "negative") return NEGATIVE_REASONS;
  return NEUTRAL_REASONS;
}

function getReasonLegend(sentiment: Sentiment) {
  if (sentiment === "positive") return "What was most useful?";
  if (sentiment === "negative") return "What wasn't useful?";
  return "What would make it more useful?";
}

function SiteFeedbackForm() {
  const pathname = usePathname();
  const groupId = useId();
  const [score, setScore] = useState<number | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sentiment = score === null ? null : getSentiment(score);
  const reasonOptions = sentiment ? getReasonOptions(sentiment) : [];
  const canSubmit = score !== null && reason !== null && !submitting;

  const sendFeedback = useCallback(async () => {
    if (score === null || reason === null || sentiment === null) return;

    setSubmitting(true);

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
          path: pathname,
          metadata: {
            feedbackType: "usefulness",
            score,
            sentiment,
            reason,
          },
        }),
      });
    } catch {
      /* non-blocking */
    } finally {
      setSubmitting(false);
    }

    setSubmitted(true);
  }, [pathname, reason, score, sentiment]);

  function handleScoreSelect(nextScore: number) {
    setScore(nextScore);
    setReason(null);
  }

  if (submitted) {
    return (
      <p className="text-body-sm text-[var(--color-text-muted)] motion-safe:animate-[fade-in_0.3s_ease-out]">
        Thanks — your feedback helps shape what I share next.
      </p>
    );
  }

  return (
    <div className="surface-muted rounded-xl p-5 not-prose text-left">
      <p className="text-body-sm font-medium text-[var(--color-text-primary)] mb-4">
        How useful did you find this?
      </p>

      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        <span id={`${groupId}-label`} className="sr-only">
          Rate usefulness from 1 to 5
        </span>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={score === value}
            disabled={submitting}
            onClick={() => handleScoreSelect(value)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border text-body-sm font-semibold tabular-nums transition-colors",
              score === value
                ? "border-[#0d7377] bg-[#0d7377] text-white shadow-sm"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[#0d7377]/40 hover:text-[#0d7377]",
            )}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-[0.6875rem] text-[var(--color-text-muted)]">
        <span>Not useful</span>
        <span>Very useful</span>
      </div>

      {score !== null && (
        <p className="mt-3 text-body-sm font-medium text-[#0d7377]" aria-live="polite">
          {SCORE_LABELS[score]}
        </p>
      )}

      {sentiment !== null && (
        <fieldset
          className="mt-5 border-t border-[var(--color-border)] pt-5 motion-safe:animate-[fade-in_0.25s_ease-out]"
          disabled={submitting}
        >
          <legend className="text-body-sm font-medium text-[var(--color-text-primary)] mb-3">
            {getReasonLegend(sentiment)}
          </legend>
          <div className="flex flex-wrap gap-2">
            {reasonOptions.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={reason === option}
                onClick={() => setReason(option)}
                accent="teal"
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {score !== null && !reason && (
          <p className="text-body-sm text-[var(--color-text-muted)]">Select a reason to continue.</p>
        )}
        <button
          type="button"
          onClick={() => void sendFeedback()}
          disabled={!canSubmit}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-body-sm font-medium transition-colors",
            "bg-[#0d7377] text-white hover:bg-[#0a5c5f] disabled:cursor-not-allowed disabled:opacity-45",
            (score === null || reason !== null) && "sm:ml-auto",
          )}
        >
          {submitting ? "Submitting…" : "Send feedback"}
        </button>
      </div>
    </div>
  );
}

export function SiteFeedbackSection({ dark = true }: SiteFeedbackSectionProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      data-analytics-section="feedback"
      className={
        dark
          ? "section-padding grid-bg text-white relative overflow-hidden border-t border-[var(--color-border-dark)]"
          : "section-padding bg-white border-t border-[var(--color-border)] relative overflow-hidden"
      }
    >
      <Reveal className="container-site max-w-2xl mx-auto text-center">
        <h2 id={headingId} className="text-h2 font-semibold mb-3">
          Was this useful?
        </h2>
        <p
          className={cn(
            "text-body-lg mb-8 max-w-xl mx-auto",
            dark ? "text-neutral-300" : "text-[var(--color-text-secondary)]",
          )}
        >
          A quick rating helps me understand what&apos;s working — and what to improve.
        </p>
        <SiteFeedbackForm />
      </Reveal>
    </section>
  );
}
