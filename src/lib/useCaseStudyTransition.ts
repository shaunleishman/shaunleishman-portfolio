import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const CASE_STUDY_TRANSITION_MS = 650;
export const CASE_STUDY_FADE_MS = CASE_STUDY_TRANSITION_MS / 2;

export function useCaseStudyTransition<T extends { id: string }>(activeId: string, items: readonly T[]) {
  const [displayId, setDisplayId] = useState(activeId);
  const [contentVisible, setContentVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (activeId === displayId) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayId(activeId);
      setContentVisible(true);
      return;
    }

    setContentVisible(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayId(activeId);
      setContentVisible(true);
    }, CASE_STUDY_FADE_MS);

    return () => clearTimeout(timeoutRef.current);
  }, [activeId, displayId]);

  const displayItem = items.find((item) => item.id === displayId) ?? items[0];
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return { activeItem, displayItem, contentVisible };
}

export function caseStudyContentFadeClass(visible: boolean) {
  return cn(
    "motion-safe:transition-opacity motion-safe:duration-[325ms] motion-safe:ease-out",
    visible ? "opacity-100" : "opacity-0",
  );
}
