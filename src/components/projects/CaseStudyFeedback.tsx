"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FeedbackProximityPopover } from "@/components/feedback/FeedbackProximityPopover";
import { isAnalyticsAllowed } from "@/lib/consent";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";
import { FeedbackSubmittedNotice } from "@/components/ui/FeedbackSubmittedNotice";

const RATING_OPTIONS = [
  { score: 1, label: "Weak or unconvincing" },
  { score: 2, label: "Weak in places" },
  { score: 4, label: "Neutral" },
  { score: 6, label: "Strong and credible" },
  { score: 7, label: "Very impressive" },
] as const;

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
type FeedbackStep = "rating" | "followup" | "done";

type CaseStudyFeedbackProps = {
  feedbackPath: string;
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
  question = "How strong does this project come across?",
  submittedDescription = "Thanks, it helps me understand what's working on this case study.",
  sectionTitle = "Your feedback",
  sectionLead = "An optional rating helps me understand how relevant this case study is, whether you're hiring, collaborating, or just browsing.",
}: CaseStudyFeedbackProps) {
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
    [feedbackPath],
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

  const popoverTitle = step === "followup" ? "What held it back?" : sectionTitle;
  const popoverLead = step === "followup" ? "Pick the closest reason so I can improve this case study." : sectionLead;

  const formContent =
    submitted || step === "done" ? (
      <FeedbackSubmittedNotice description={submittedDescription} />
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
        <p className="text-body-sm font-medium text-[var(--color-text-primary)]">{question}</p>

        <div
          role="radiogroup"
          aria-labelledby={`${groupId}-label`}
          className="mt-3 flex flex-col gap-2"
        >
          <span id={`${groupId}-label`} className="sr-only">
            {question}
          </span>
          {RATING_OPTIONS.map((option) => {
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
      eyebrow="Portfolio feedback"
      variant="case-study"
    >
      {formContent}
    </FeedbackProximityPopover>
  );
}
