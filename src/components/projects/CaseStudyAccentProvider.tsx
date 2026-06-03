"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { SITE_COLORS } from "@/lib/colors";

const CaseStudyAccentContext = createContext<string>(SITE_COLORS.accent);

export function useCaseStudyAccent() {
  return useContext(CaseStudyAccentContext);
}

type CaseStudyAccentProviderProps = {
  accentColor: string;
  children: ReactNode;
  className?: string;
};

/** Sets `--case-study-accent` for descendants and provides the value via context. */
export function CaseStudyAccentProvider({
  accentColor,
  children,
  className,
}: CaseStudyAccentProviderProps) {
  return (
    <CaseStudyAccentContext.Provider value={accentColor}>
      <div
        className={className}
        style={{ "--case-study-accent": accentColor } as CSSProperties}
      >
        {children}
      </div>
    </CaseStudyAccentContext.Provider>
  );
}
