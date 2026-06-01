"use client";

import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";

const RELEVANCE_STOPS = [
  { value: 0, id: "not", label: "Not relevant" },
  { value: 1, id: "somewhat", label: "Somewhat relevant" },
  { value: 2, id: "very", label: "Very relevant" },
] as const;

const REASONS = [
  "Wrong industry",
  "Wrong skills or focus area",
  "Too technical",
  "Not enough detail",
  "Wrong seniority level",
  "Looking for different experience",
  "Not the kind of project I hire for",
] as const;

type RelevanceId = (typeof RELEVANCE_STOPS)[number]["id"];

type CaseStudyFeedbackProps = {
  projectSlug: string;
};

function getRelevance(value: number) {
  return RELEVANCE_STOPS.find((stop) => stop.value === value) ?? RELEVANCE_STOPS[1];
}

export function CaseStudyFeedback({ projectSlug }: CaseStudyFeedbackProps) {
  const sliderId = useId();
  const [sliderValue, setSliderValue] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const relevance = getRelevance(sliderValue);
  const isNegative = relevance.id !== "very";
  const showReasons = hasInteracted && isNegative;

  const sendFeedback = useCallback(
    async (feedback: RelevanceId, nextReason?: string) => {
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
            path: `/work/${projectSlug}`,
            metadata: {
              feedback,
              reason: nextReason ?? null,
            },
          }),
        });
      } catch {
        /* non-blocking */
      } finally {
        setSubmitting(false);
      }

      setSubmitted(true);
    },
    [projectSlug],
  );

  function handleSliderChange(nextValue: number) {
    setHasInteracted(true);
    setSliderValue(nextValue);
    setReason(null);

    const nextRelevance = getRelevance(nextValue);
    if (nextRelevance.id === "very") {
      void sendFeedback("very");
    }
  }

  function handleReasonSelect(nextReason: string) {
    setReason(nextReason);
    void sendFeedback(relevance.id, nextReason);
  }

  if (submitted) {
    return (
      <p className="text-body-sm text-[var(--color-text-muted)] motion-safe:animate-[fade-in_0.3s_ease-out]">
        Thanks for the feedback.
      </p>
    );
  }

  return (
    <div className="surface-muted rounded-xl p-5 not-prose">
      <label htmlFor={sliderId} className="text-body-sm font-medium text-[var(--color-text-primary)]">
        Was this project relevant to you?
      </label>

      <div className="mt-4">
        <p
          className="mb-3 text-body-sm font-medium text-[#0d7377]"
          aria-live="polite"
          aria-atomic="true"
        >
          {hasInteracted ? relevance.label : "Drag the slider to respond"}
        </p>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={2}
          step={1}
          value={sliderValue}
          disabled={submitting}
          onChange={(event) => handleSliderChange(Number(event.target.value))}
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full bg-white",
            "accent-[#0d7377]",
            "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#0d7377] [&::-webkit-slider-thumb]:shadow-md",
            "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#0d7377] [&::-moz-range-thumb]:shadow-md",
          )}
          aria-valuetext={relevance.label}
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={sliderValue}
        />

        <div className="mt-2 flex justify-between gap-2 text-body-sm text-[var(--color-text-muted)]">
          <span>Not relevant</span>
          <span className="hidden sm:inline">Somewhat relevant</span>
          <span>Very relevant</span>
        </div>
      </div>

      {showReasons && (
        <fieldset
          className="mt-5 border-t border-[var(--color-border)] pt-5 motion-safe:animate-[fade-in_0.25s_ease-out]"
          disabled={submitting}
        >
          <legend className="text-body-sm font-medium text-[var(--color-text-primary)] mb-3">
            Why wasn&apos;t this relevant enough?
          </legend>
          <div className="flex flex-wrap gap-2">
            {REASONS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={reason === option}
                onClick={() => handleReasonSelect(option)}
                accent="neutral"
              />
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
