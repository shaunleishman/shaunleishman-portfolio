"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";
import { FeedbackSubmittedNotice } from "@/components/ui/FeedbackSubmittedNotice";

const MIN_SCORE = 1;
const MAX_SCORE = 7;
const NEUTRAL_SCORE = 4;
const SLIDER_THUMB_SIZE_PX = 20;

const ANCHOR_LABELS = {
  low: "Weak or unconvincing",
  mid: "Neutral",
  high: "Strong, credible and impressive",
} as const;

const SCORE_LABELS: Record<number, string> = {
  1: ANCHOR_LABELS.low,
  2: ANCHOR_LABELS.low,
  3: "Weak in places",
  4: ANCHOR_LABELS.mid,
  5: "Fairly strong",
  6: "Strong and credible",
  7: ANCHOR_LABELS.high,
};

const REASONS = [
  "Wrong industry",
  "Wrong skills or focus area",
  "Too technical",
  "Not enough detail",
  "Hard to follow the story",
  "Doesn't show enough impact",
  "Not the kind of project I hire for",
] as const;

type FeedbackBucket = "weak" | "decent" | "strong";

type CaseStudyFeedbackProps = {
  feedbackPath: string;
  question?: string;
  submittedDescription?: string;
  sectionTitle?: string;
  sectionLead?: string;
};

function getTickPositionPx(value: number, trackWidth: number, thumbSize: number) {
  const ratio = (value - MIN_SCORE) / (MAX_SCORE - MIN_SCORE);
  return thumbSize / 2 + ratio * Math.max(0, trackWidth - thumbSize);
}

function getScoreLabel(score: number) {
  return SCORE_LABELS[score] ?? ANCHOR_LABELS.mid;
}

function getFeedbackBucket(score: number): FeedbackBucket {
  if (score <= 2) return "weak";
  if (score <= 5) return "decent";
  return "strong";
}

export function CaseStudyFeedback({
  feedbackPath,
  question = "How strong does this project come across?",
  submittedDescription = "Thanks — it helps me understand what's working on this case study.",
  sectionTitle = "Your feedback",
  sectionLead = "An optional rating helps me understand whether this case study reads as credible and relevant — whether you're hiring, collaborating, or just browsing.",
}: CaseStudyFeedbackProps) {
  const sliderId = useId();
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [score, setScore] = useState(NEUTRAL_SCORE);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const needsReason = score <= 3;
  const showReasons = hasInteracted && needsReason;
  const canConfirm = hasInteracted && (!needsReason || reason !== null);

  useLayoutEffect(() => {
    const node = sliderTrackRef.current;
    if (!node) return;

    const updateTrackWidth = () => {
      setTrackWidth(node.clientWidth);
    };

    updateTrackWidth();

    const observer = new ResizeObserver(updateTrackWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const sendFeedback = useCallback(
    async (feedback: FeedbackBucket, strengthScore: number, nextReason?: string) => {
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
            path: feedbackPath,
            metadata: {
              feedback,
              score: strengthScore,
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
    [feedbackPath],
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
      <div className="not-prose">
        <div className="mb-5">
          <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">{sectionTitle}</h3>
          {sectionLead && (
            <p className="mt-1 text-body-sm text-[var(--color-text-muted)] max-w-2xl">{sectionLead}</p>
          )}
        </div>
        <FeedbackSubmittedNotice description={submittedDescription} />
      </div>
    );
  }

  return (
    <div className="not-prose">
      <div className="mb-5">
        <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">{sectionTitle}</h3>
        {sectionLead && (
          <p className="mt-1 text-body-sm text-[var(--color-text-muted)] max-w-2xl">{sectionLead}</p>
        )}
      </div>

      <div className="surface-muted rounded-xl p-5">
      <label htmlFor={sliderId} className="text-body-sm font-medium text-[var(--color-text-primary)]">
        {question}
      </label>

      <div className="mt-4">
        <p
          className="mb-3 text-body-sm font-medium text-[#0d7377]"
          aria-live="polite"
          aria-atomic="true"
        >
          {hasInteracted ? (
            <>
              <span className="tabular-nums">{score}</span>
              <span className="text-[var(--color-text-muted)]"> / 7 — </span>
              {getScoreLabel(score)}
            </>
          ) : (
            "Move the slider, then confirm your rating"
          )}
        </p>

        <div ref={sliderTrackRef} className="relative w-full">
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
              "relative z-10 m-0 block h-5 w-full cursor-pointer appearance-none bg-transparent",
              "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white",
              "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-white",
              "[&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#0d7377] [&::-webkit-slider-thumb]:shadow-md",
              "[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#0d7377] [&::-moz-range-thumb]:shadow-md",
            )}
            aria-valuetext={`${score} out of 7. ${getScoreLabel(score)}`}
            aria-valuemin={MIN_SCORE}
            aria-valuemax={MAX_SCORE}
            aria-valuenow={score}
          />

          <div className="relative mt-3 h-1.5" aria-hidden>
            {Array.from({ length: MAX_SCORE }, (_, index) => {
              const point = index + 1;
              const leftPx =
                trackWidth > 0
                  ? getTickPositionPx(point, trackWidth, SLIDER_THUMB_SIZE_PX)
                  : null;

              return (
                <span
                  key={point}
                  className={cn(
                    "absolute top-0 size-1.5 -translate-x-1/2 rounded-full transition-colors",
                    score === point ? "bg-[#0d7377]" : "bg-[var(--color-border)]",
                  )}
                  style={leftPx === null ? undefined : { left: `${leftPx}px` }}
                />
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 text-body-sm text-[var(--color-text-muted)] sm:grid-cols-3 sm:gap-4">
            <p className="leading-snug">{ANCHOR_LABELS.low}</p>
            <p className="leading-snug sm:text-center">{ANCHOR_LABELS.mid}</p>
            <p className="leading-snug sm:text-right">{ANCHOR_LABELS.high}</p>
          </div>
        </div>
      </div>

      {showReasons && (
        <fieldset
          className="mt-5 border-t border-[var(--color-border)] pt-5 motion-safe:animate-[fade-in_0.25s_ease-out]"
          disabled={submitting}
        >
          <legend className="text-body-sm font-medium text-[var(--color-text-primary)] mb-3">
            What held it back?
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

      <div className="relative mt-5 min-h-[44px]">
        <p
          className={cn(
            "text-body-sm text-[var(--color-text-muted)] sm:absolute sm:inset-y-0 sm:left-0 sm:flex sm:max-w-[calc(100%-12rem)] sm:items-center",
            !(showReasons && !reason) && "hidden",
          )}
        >
          Select a reason to continue.
        </p>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm || submitting}
          className={cn(
            "inline-flex min-h-[44px] mt-2 w-full items-center justify-center rounded-full px-6 py-2.5 text-body-sm font-medium transition-colors sm:absolute sm:right-0 sm:top-0 sm:mt-0 sm:w-auto",
            "bg-[#0d7377] text-white hover:bg-[#0a5c5f] disabled:cursor-not-allowed disabled:opacity-45",
          )}
        >
          {submitting ? "Submitting…" : "Confirm rating"}
        </button>
      </div>
    </div>
    </div>
  );
}
