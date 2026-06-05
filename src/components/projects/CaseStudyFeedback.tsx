"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FeedbackProximityPopover } from "@/components/feedback/FeedbackProximityPopover";
import {
  FEEDBACK_VARIANT_CONFIG,
  getImprovementLabel,
  getQualityKey,
  isOtherImprovement,
  type FeedbackVariant,
} from "@/lib/feedback-config";
import { isAnalyticsAllowed } from "@/lib/consent";
import { cn } from "@/lib/utils";
import { FilterChip } from "@/components/ui/FilterChip";
import { FeedbackSubmittedNotice } from "@/components/ui/FeedbackSubmittedNotice";

type FeedbackStep = "rating" | "followup" | "done";

type CaseStudyFeedbackProps = {
  feedbackPath: string;
  variant?: FeedbackVariant;
  question?: string;
  submittedDescription?: string;
  sectionTitle?: string;
  sectionLead?: string;
};

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
  const otherFieldId = useId();
  const [step, setStep] = useState<FeedbackStep>("rating");
  const [score, setScore] = useState<number | null>(null);
  const [improvementId, setImprovementId] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setStep("rating");
    setScore(null);
    setImprovementId(null);
    setOtherText("");
    setSubmitted(false);
    setSubmitting(false);
  }, [feedbackPath]);

  const canSubmitFollowUp =
    improvementId !== null &&
    (!isOtherImprovement(improvementId) || otherText.trim().length > 0);

  const sendFeedback = useCallback(
    async (
      qualityScore: number,
      nextImprovementId?: string | null,
      nextOtherText?: string,
    ) => {
      setSubmitting(true);
      const feedback = config.getFeedbackBucket(qualityScore);
      const quality = getQualityKey(variant, qualityScore);
      const improvementLabel = nextImprovementId
        ? getImprovementLabel(variant, nextImprovementId)
        : undefined;
      const trimmedOther = nextOtherText?.trim() ?? "";
      const reason =
        nextImprovementId && isOtherImprovement(nextImprovementId)
          ? `Other: ${trimmedOther}`
          : improvementLabel ?? null;

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
              score: qualityScore,
              quality: quality ?? null,
              improvementArea: nextImprovementId ?? null,
              improvementOther: isOtherImprovement(nextImprovementId ?? null) ? trimmedOther : null,
              reason,
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
    [feedbackPath, variant, config],
  );

  function handlePrimaryOnRating() {
    if (score === null) return;
    if (config.needsFollowUp(score)) {
      setStep("followup");
      return;
    }
    void sendFeedback(score);
  }

  function handleSubmitFollowUp() {
    if (score === null || !canSubmitFollowUp) return;
    void sendFeedback(score, improvementId, otherText);
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
          onClick={() => {
            setStep("rating");
            setImprovementId(null);
            setOtherText("");
          }}
          className="mb-4 text-body-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
          ← Back to rating
        </button>

        <fieldset disabled={submitting} className="border-0 p-0 m-0 min-w-0">
          <div className="flex flex-wrap gap-2">
            {config.improvementOptions.map((option) => (
              <FilterChip
                key={option.id}
                label={option.label}
                selected={improvementId === option.id}
                onClick={() => {
                  setImprovementId(option.id);
                  if (!option.other) setOtherText("");
                }}
                accent="neutral"
              />
            ))}
          </div>
        </fieldset>

        {isOtherImprovement(improvementId) && (
          <div className="mt-4">
            <label htmlFor={otherFieldId} className="text-body-sm font-medium text-[var(--color-text-primary)]">
              {config.otherImprovementLabel}
            </label>
            <textarea
              id={otherFieldId}
              value={otherText}
              onChange={(event) => setOtherText(event.target.value)}
              placeholder={config.otherImprovementPlaceholder}
              rows={3}
              disabled={submitting}
              className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-body-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
            />
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSubmitFollowUp}
            disabled={!canSubmitFollowUp || submitting}
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
                  setImprovementId(null);
                  setOtherText("");
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
              : score !== null && config.needsFollowUp(score)
                ? "Continue"
                : "Submit rating"}
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
