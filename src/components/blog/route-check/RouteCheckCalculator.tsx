"use client";

import { useId, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BatteryLow,
  CircleCheck,
  ClipboardList,
  Construction,
  Gauge,
  ListChecks,
  Monitor,
  Navigation,
  RotateCcw,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { KanoWidget } from "@/components/blog/kano/KanoWidget";
import {
  ROUTE_BANDS,
  ROUTE_CHECK_QUESTIONS,
  getRouteBand,
  sumAnswers,
  type RouteBand,
} from "@/components/blog/route-check/route-check-data";
import {
  RouteCheckFinale,
  RouteCheckPanel,
  routeCheckStepClass,
  staggerStyle,
  useAnimatedScore,
} from "@/components/blog/route-check/RouteCheckMotion";
import { cn } from "@/lib/utils";

const QUESTION_COUNT = ROUTE_CHECK_QUESTIONS.length;

const BAND_ICONS: Record<RouteBand["id"], LucideIcon> = {
  heavy: TriangleAlert,
  "stop-start": Construction,
  clear: Navigation,
  smooth: CircleCheck,
};

function IconBadge({
  icon: Icon,
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
        className,
      )}
      aria-hidden
    >
      <Icon className={iconClassName ?? "size-5"} />
    </span>
  );
}

type Phase = "intro" | "questions" | "results";

export function RouteCheckCalculator() {
  const baseId = useId();
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => Array(QUESTION_COUNT).fill(null),
  );

  const currentQuestion = ROUTE_CHECK_QUESTIONS[step];
  const currentAnswer = answers[step];
  const answeredCount = answers.filter((value) => value !== null).length;
  const total = sumAnswers(answers);
  const band = total !== null ? getRouteBand(total) : null;

  function selectAnswer(score: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = score;
      return next;
    });
  }

  function startSurvey() {
    setPhase("questions");
    setStep(0);
  }

  function goNext() {
    if (currentAnswer === null) return;
    if (step < QUESTION_COUNT - 1) {
      setStep(step + 1);
      return;
    }
    setPhase("results");
  }

  function goBack() {
    if (phase === "results") {
      setPhase("questions");
      setStep(QUESTION_COUNT - 1);
      return;
    }
    if (step === 0) {
      setPhase("intro");
      return;
    }
    setStep(step - 1);
  }

  function restart() {
    setAnswers(Array(QUESTION_COUNT).fill(null));
    setStep(0);
    setPhase("intro");
  }

  return (
    <KanoWidget
      title="Route Check"
      hint={phase === "intro" ? undefined : "10 questions · score out of 50"}
    >
      {phase === "intro" && (
        <RouteCheckPanel panelKey="intro">
          <RouteCheckIntro onStart={startSurvey} />
        </RouteCheckPanel>
      )}

      {phase === "questions" && (
        <>
          <div className="mb-4 flex items-center gap-3">
            <IconBadge icon={ClipboardList} className="size-9" iconClassName="size-4" />
            <div className="min-w-0 flex-1">
              <p className="text-label text-[var(--color-text-muted)]">
                Question {step + 1} of {QUESTION_COUNT}
              </p>
              <div
                className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-muted)]"
                role="progressbar"
                aria-valuenow={step + 1}
                aria-valuemin={1}
                aria-valuemax={QUESTION_COUNT}
                aria-label="Survey progress"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                  style={{ width: `${((step + 1) / QUESTION_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <RouteCheckPanel panelKey={`step-${step}`}>
            <fieldset>
              <legend className="text-body-lg font-semibold leading-snug text-[var(--color-text-primary)]">
                {currentQuestion.question}
              </legend>
              {currentQuestion.hint && (
                <p className="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">
                  {currentQuestion.hint}
                </p>
              )}
              <div
                className="mt-3 flex flex-col gap-2"
                role="radiogroup"
                aria-labelledby={`${baseId}-q-${step}`}
              >
                <span id={`${baseId}-q-${step}`} className="sr-only">
                  {currentQuestion.question}
                </span>
                {currentQuestion.options.map((label, index) => {
                  const score = index + 1;
                  const selected = currentAnswer === score;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectAnswer(score)}
                      style={staggerStyle(index, 45)}
                      className={cn(
                        routeCheckStepClass(),
                        "flex min-h-[44px] w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-body-sm transition-[border-color,background-color,transform] duration-200",
                        selected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-text-primary)] motion-safe:scale-[1.01]"
                          : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/30",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold tabular-nums transition-colors duration-200",
                          selected
                            ? "bg-[var(--color-accent)] text-white"
                            : "bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]",
                        )}
                        aria-hidden
                      >
                        {score}
                      </span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </RouteCheckPanel>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-border)] px-4 py-2 text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={currentAnswer === null}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-body-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              {step < QUESTION_COUNT - 1 ? "Next question" : "See score"}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>

          {answeredCount > 0 && (
            <p className="mt-3 text-[0.8125rem] text-[var(--color-text-muted)]">
              {answeredCount} of {QUESTION_COUNT} answered
            </p>
          )}
        </>
      )}

      {phase === "results" && band && total !== null && (
        <RouteCheckPanel panelKey="results">
          <RouteCheckResults total={total} band={band} onRestart={restart} />
        </RouteCheckPanel>
      )}
    </KanoWidget>
  );
}

type RouteCheckIntroProps = {
  onStart: () => void;
};

function RouteCheckIntro({ onStart }: RouteCheckIntroProps) {
  const steps: Array<{ icon: LucideIcon; label: string; detail: string }> = [
    {
      icon: Monitor,
      label: "Pick a screen",
      detail: "Choose a page or flow on your product",
    },
    {
      icon: ListChecks,
      label: "Answer 10 questions",
      detail: "Rate what you see from 1 to 5",
    },
    {
      icon: Gauge,
      label: "Get your score",
      detail: "See how much cognitive load it creates",
    },
  ];

  return (
    <div>
      <div className="flex items-start gap-3">
        <IconBadge icon={BatteryLow} className="size-11" iconClassName="size-5" />
        <div>
          <h4 className="text-h3 font-semibold leading-tight text-[var(--color-text-primary)]">
            Is your screen tiring to use?
          </h4>
          <p className="mt-2 max-w-xl text-body-lg leading-snug text-[var(--color-text-secondary)]">
            Pick a screen, run the check, and find out how hard users have to work.
          </p>
        </div>
      </div>

      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <li
              key={step.label}
              style={staggerStyle(index, 80)}
              className={cn(
                routeCheckStepClass(),
                "flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] px-3 py-4 text-center",
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                <StepIcon className="size-5" aria-hidden />
              </span>
              <span className="mt-3 block text-body-sm font-semibold text-[var(--color-text-primary)]">
                {step.label}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-[var(--color-text-muted)]">
                {step.detail}
              </span>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white transition-[opacity,transform] duration-200 hover:opacity-90 motion-safe:hover:scale-[1.01] active:scale-[0.99]"
      >
        Start Route Check
        <ArrowRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}

type RouteCheckResultsProps = {
  total: number;
  band: RouteBand;
  onRestart: () => void;
};

function RouteCheckResults({ total, band, onRestart }: RouteCheckResultsProps) {
  const BandIcon = BAND_ICONS[band.id];
  const animatedScore = useAnimatedScore(total, true);

  return (
    <div aria-live="polite">
      <div
        className="overflow-hidden rounded-2xl border motion-safe:animate-[route-check-score-pop_0.55s_ease-out_both]"
        style={{
          borderColor: `${band.color}35`,
          backgroundColor: `${band.color}07`,
        }}
      >
        <div className="flex flex-col items-center gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:px-8 sm:py-7">
          <RouteCheckFinale band={band} icon={BandIcon} compact />

          <div className="min-w-0 text-center sm:text-left">
            <p className="text-label text-[var(--color-text-muted)]">Your Route Check score</p>

            <div className="mt-1 flex items-baseline justify-center gap-1.5 sm:justify-start">
              <span
                className="text-[clamp(2.75rem,7vw,3.75rem)] font-semibold tabular-nums leading-none tracking-tight"
                style={{ color: band.color }}
              >
                {animatedScore}
              </span>
              <span className="text-h3 font-normal text-[var(--color-text-muted)]">/ 50</span>
            </div>

            <h4 className="mt-4 text-h3 font-semibold leading-tight" style={{ color: band.color }}>
              {band.label}
            </h4>
            <p className="mx-auto mt-2 max-w-sm text-body-sm leading-relaxed text-[var(--color-text-secondary)] sm:mx-0">
              {band.description}
            </p>
          </div>
        </div>
      </div>

      <details
        className={cn(
          routeCheckStepClass(),
          "group mt-5 motion-safe:animate-[route-check-step-in_0.45s_ease-out_both]",
        )}
        style={{ animationDelay: "0.35s" }}
      >
        <summary className="cursor-pointer list-none text-[0.8125rem] font-medium text-[var(--color-text-muted)] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="underline decoration-[var(--color-border)] underline-offset-2 group-open:no-underline">
            What do the scores mean?
          </span>
        </summary>
        <ul className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
          {ROUTE_BANDS.map((entry) => {
            const isCurrent = entry.id === band.id;
            return (
              <li
                key={entry.id}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-[0.8125rem] leading-snug",
                  isCurrent && "bg-[var(--color-bg-muted)]",
                )}
              >
                <span className="font-medium tabular-nums" style={{ color: entry.color }}>
                  {entry.min}–{entry.max}
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {" "}
                  · {entry.label}
                </span>
                <span className="text-[var(--color-text-muted)]"> — {entry.description}</span>
                {isCurrent && (
                  <span className="sr-only"> (your result)</span>
                )}
              </li>
            );
          })}
        </ul>
      </details>

      <button
        type="button"
        onClick={onRestart}
        className={cn(
          routeCheckStepClass(),
          "mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-body-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 motion-safe:animate-[route-check-step-in_0.45s_ease-out_both]",
        )}
        style={{ animationDelay: "0.5s" }}
      >
        <RotateCcw className="size-4" aria-hidden />
        Start again
      </button>
    </div>
  );
}
