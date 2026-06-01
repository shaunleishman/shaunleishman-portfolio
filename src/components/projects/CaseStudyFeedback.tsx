"use client";

import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";

const MIN_SCORE = 1;
const MAX_SCORE = 7;
const THUMB_SIZE_PX = 20;

function getTickPercent(value: number) {
  return ((value - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100;
}

const SCORE_LABELS = [
  "Not relevant at all",
  "Not very relevant",
  "Slightly relevant",
  "Moderately relevant",
  "Quite relevant",
  "Very relevant",
  "Extremely relevant",
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

type FeedbackBucket = "not" | "somewhat" | "very";

type CaseStudyFeedbackProps = {
  projectSlug: string;
};

function getScoreLabel(score: number) {
  return SCORE_LABELS[score - 1] ?? SCORE_LABELS[3];
}

function getFeedbackBucket(score: number): FeedbackBucket {
  if (score <= 2) return "not";
  if (score <= 4) return "somewhat";
  return "very";
}

export function CaseStudyFeedback({ projectSlug }: CaseStudyFeedbackProps) {
  const sliderId = useId();
  const [score, setScore] = useState(4);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isNegative = score <= 4;
  const showReasons = hasInteracted && isNegative;
  const canConfirm = hasInteracted && (!isNegative || reason !== null);

  const sendFeedback = useCallback(
    async (feedback: FeedbackBucket, relevanceScore: number, nextReason?: string) => {
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
              score: relevanceScore,
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

  function handleSliderChange(nextScore: number) {
    setHasInteracted(true);
    setScore(nextScore);
    setReason(null);
  }

  function handleConfirm() {
    if (!canConfirm) return;
    void sendFeedback(getFeedbackBucket(score), score, reason ?? undefined);
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
          {hasInteracted ? getScoreLabel(score) : "Move the slider, then confirm your rating"}
        </p>

        <div
          style={{
            paddingLeft: THUMB_SIZE_PX / 2,
            paddingRight: THUMB_SIZE_PX / 2,
          }}
        >
          <input
            id={sliderId}
            type="range"
            min={MIN_SCORE}
            max={MAX_SCORE}
            step={1}
            value={score}
            disabled={submitting}
            onChange={(event) => handleSliderChange(Number(event.target.value))}
            className={cn(
              "block h-2 w-full cursor-pointer appearance-none rounded-full bg-white",
              "accent-[#0d7377]",
              "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#0d7377] [&::-webkit-slider-thumb]:shadow-md",
              "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#0d7377] [&::-moz-range-thumb]:shadow-md",
            )}
            aria-valuetext={`${score} out of 7. ${getScoreLabel(score)}`}
            aria-valuemin={MIN_SCORE}
            aria-valuemax={MAX_SCORE}
            aria-valuenow={score}
          />

          <div className="relative mt-3 h-1.5" aria-hidden>
            {SCORE_LABELS.map((_, index) => {
              const point = index + 1;
              return (
                <span
                  key={point}
                  className={cn(
                    "absolute top-0 size-1.5 -translate-x-1/2 rounded-full transition-colors",
                    score === point ? "bg-[#0d7377]" : "bg-[var(--color-border)]",
                  )}
                  style={{ left: `${getTickPercent(point)}%` }}
                />
              );
            })}
          </div>

          <div className="mt-2 flex justify-between gap-2 text-body-sm text-[var(--color-text-muted)]">
            <span>Not relevant</span>
            <span>Very relevant</span>
          </div>
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
                onClick={() => setReason(option)}
                accent="neutral"
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {showReasons && !reason && (
          <p className="text-body-sm text-[var(--color-text-muted)]">Select a reason to continue.</p>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm || submitting}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-body-sm font-medium transition-colors",
            "bg-[#0d7377] text-white hover:bg-[#0a5c5f] disabled:cursor-not-allowed disabled:opacity-45",
            !showReasons && "sm:ml-auto",
          )}
        >
          {submitting ? "Submitting…" : "Confirm rating"}
        </button>
      </div>
    </div>
  );
}
