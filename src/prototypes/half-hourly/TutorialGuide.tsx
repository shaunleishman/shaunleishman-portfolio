"use client";

import { useCallback, useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

export type TutorialGuideStep = {
  id: string;
  title: string;
  description: string;
  mode: "center" | "spotlight";
  targetId?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

type TutorialGuideProps = {
  step: number;
  steps: TutorialGuideStep[];
  onNext: () => void;
  onClose: () => void;
  onPrimary?: () => void;
};

function useTargetRect(targetId?: string, active?: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const measure = useCallback(() => {
    if (!targetId || !active) {
      setRect(null);
      return;
    }
    const el = document.getElementById(targetId);
    if (!el) {
      setRect(null);
      return;
    }
    setRect(el.getBoundingClientRect());
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [targetId, active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    const interval = window.setInterval(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      window.clearInterval(interval);
    };
  }, [measure]);

  return rect;
}

export function TutorialGuide({ step, steps, onNext, onClose, onPrimary }: TutorialGuideProps) {
  const current = steps[step];
  const rect = useTargetRect(current?.targetId, current?.mode === "spotlight");

  if (!current) return null;

  const primaryAction = onPrimary ?? onNext;
  const isLast = step >= steps.length - 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="hh-tutorial-title">
      {current.mode === "spotlight" && rect ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-black/70" aria-hidden />
          <div
            className="pointer-events-none absolute rounded-lg ring-4 ring-[#00a7b5] ring-offset-2 ring-offset-transparent"
            style={{
              top: rect.top - 4,
              left: rect.left - 4,
              width: rect.width + 8,
              height: rect.height + 8,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
            }}
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/70" aria-hidden />
      )}

      <div
        className={
          current.mode === "spotlight" && rect
            ? "absolute z-[101] w-[min(22rem,calc(100vw-2rem))]"
            : "absolute inset-0 z-[101] flex items-center justify-center p-4"
        }
        style={
          current.mode === "spotlight" && rect
            ? {
                top: Math.min(rect.bottom + 16, window.innerHeight - 220),
                left: Math.min(Math.max(rect.left, 16), window.innerWidth - 360),
              }
            : undefined
        }
      >
        <div className="pointer-events-auto relative rounded-lg bg-white p-6 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="Close tutorial"
          >
            <X className="size-5" />
          </button>

          <div className="mb-4 flex items-start gap-3 pr-6">
            <div className="rounded-full bg-[#00a7b5] p-2">
              <Sparkles className="size-6 text-white" aria-hidden />
            </div>
            <div className="flex-1">
              <h3 id="hh-tutorial-title" className="mb-2 text-lg font-bold text-gray-900">
                {current.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{current.description}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`size-2 rounded-full ${idx === step ? "bg-[#00a7b5]" : "bg-gray-300"}`}
                  aria-hidden
                />
              ))}
            </div>

            <div className="flex gap-2">
              {current.secondaryLabel && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {current.secondaryLabel}
                </button>
              )}
              <button
                type="button"
                onClick={isLast ? onClose : primaryAction}
                className="rounded bg-[#00a7b5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#008c98]"
              >
                {isLast ? "Got it!" : current.primaryLabel ?? "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
