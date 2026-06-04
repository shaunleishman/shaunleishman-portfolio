"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FeedbackProximityPopover } from "@/components/feedback/FeedbackProximityPopover";
import {
  FEEDBACK_VARIANT_CONFIG,
  type FeedbackVariant,
} from "@/lib/feedback-config";
import { isAnalyticsAllowed } from "@/lib/consent";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";
import { FeedbackSubmittedNotice } from "@/components/ui/FeedbackSubmittedNotice";

type FeedbackBucket = "weak" | "decent" | "strong";
type FeedbackStep = "rating" | "followup" | "done";

type CaseStudyFeedbackProps = {
  feedbackPath: string;
  variant?: FeedbackVariant;
  question?: string;
  submittedDescription?: string;
  sectionTitle?: string;
  sectionLead?: string;
};

function getFeedbackBucket(score: number): FeedbackBucket {
  if (score <= 2) return "weak";
  if (score <= 5) return "decent";
  return "strong";
}

function needsFollowUp(score: number | null) {
  return score !== null && score <= 3;
}

export function CaseStudyFeedback({
  feedbackPath,
  variant = "case-study",
  question,
  submittedDescription,
  sectionTitle,
  sectionLead,
}: CaseStudyFeedbackProps) {
  const config = FEEDBACK_VARIANT_CONFIG[variant];
  const resolvedQuestion = question ?? config.question;
  const resolvedSubmittedDescription = submittedDescription ?? config.submittedDescription;
  const resolvedSectionTitle = sectionTitle ?? config.sectionTitle;
  const resolvedSectionLead = sectionLead ?? config.sectionLead;

  const groupId = useId();
  const [step, setStep] = useState<FeedbackStep>("rating");
  const [score, setScore] = useState<number | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setStep("rating");
    setScore(null);
    setReason(null);
    setSubmitted(false);
    setSubmitting(false);
  }, [feedbackPath]);

  const sendFeedback = useCallback(
    async (feedback: FeedbackBucket, strengthScore: number, nextReason?: string) => {
      setSubmitting(true);

      if (!isAnalyticsAllowed()) {
        setSubmitted(true);
        setSubmitting(false);
        setStep("done");
        return;
      }

      try {
        const sessionId =
          sessionStorage.getItem("analytics_session") ??
          (() => {
            const id = crypto.randomUUID();
            sessionStorage.setItem("analytics_session", id);
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
              contentType: variant,
            },
          }),
        });
      } catch {
        /* non-blocking */
      } finally {
        setSubmitting(false);
      }

      setSubmitted(true);
      setStep("done");
    },
    [feedbackPath, variant],
  );

  function handlePrimaryOnRating() {
    if (score === null) return;
    if (needsFollowUp(score)) {
      setStep("followup");
      return;
    }
    void sendFeedback(getFeedbackBucket(score), score);
  }

  function handleSubmitFollowUp() {
    if (score === null || !reason) return;
    void sendFeedback(getFeedbackBucket(score), score, reason);
  }

  const popoverTitle = step === "followup" ? config.followUpTitle : resolvedSectionTitle;
  const popoverLead = step === "followup" ? config.followUpLead : resolvedSectionLead;

  const formContent =
    submitted || step === "done" ? (
      <FeedbackSubmittedNotice description={resolvedSubmittedDescription} />
    ) : step === "followup" ? (
      <>
        <button
          type="button"
          onClick={() => setStep("rating")}
          className="mb-4 text-body-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
          ← Back to rating
        </button>

        <fieldset disabled={submitting} className="border-0 p-0 m-0 min-w-0">
          <div className="flex flex-wrap gap-2">
            {config.reasons.map((option) => (
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

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSubmitFollowUp}
            disabled={!reason || submitting}
            className="feedback-accent-button inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-body-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitting ? "Submitting…" : "Send feedback"}
          </button>
        </div>
      </>
    ) : (
      <>
        <p className="text-body-sm font-medium text-[var(--color-text-primary)]">{resolvedQuestion}</p>

        <div
          role="radiogroup"
          aria-labelledby={`${groupId}-label`}
          className="mt-3 flex flex-col gap-2"
        >
          <span id={`${groupId}-label`} className="sr-only">
            {resolvedQuestion}
          </span>
          {config.ratingOptions.map((option) => {
            const selected = score === option.score;
            return (
              <button
                key={option.score}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={submitting}
                onClick={() => {
                  setScore(option.score);
                  setReason(null);
                }}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left text-body-sm font-medium transition-colors min-h-[44px]",
                  selected
                    ? "feedback-accent-button border-transparent text-white"
                    : "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-[color-mix(in_srgb,var(--case-study-accent,var(--color-accent))_40%,var(--color-border))]",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handlePrimaryOnRating}
            disabled={score === null || submitting}
            className="feedback-accent-button inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-body-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitting
              ? "Submitting…"
              : score !== null && needsFollowUp(score)
                ? "Continue"
                : "Confirm rating"}
          </button>
        </div>
      </>
    );

  return (
    <FeedbackProximityPopover
      title={popoverTitle}
      lead={popoverLead}
      eyebrow={config.eyebrow}
      variant="case-study"
    >
      {formContent}
    </FeedbackProximityPopover>
  );
}
