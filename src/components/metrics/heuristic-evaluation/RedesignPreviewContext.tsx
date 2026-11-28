"use client";

import { createContext, useContext, useMemo } from "react";
import type { RedesignCallout } from "@/content/heuristic-evaluations/types";

/** Stable empty list. A fresh `[]` default would bust the memo and re-render the mock. */
export const EMPTY_CALLOUTS: readonly RedesignCallout[] = [];

type RedesignPreviewContextValue = {
  /** True inside the edge-to-edge full screen portal */
  immersive: boolean;
  /** Finding markers — shown in full-screen explore mode */
  showCallouts: boolean;
  callouts: readonly RedesignCallout[];
  accentColor: string;
};

const RedesignPreviewContext = createContext<RedesignPreviewContextValue>({
  immersive: false,
  showCallouts: false,
  callouts: EMPTY_CALLOUTS,
  accentColor: "#E85D04",
});

export function RedesignPreviewProvider({
  immersive,
  callouts = EMPTY_CALLOUTS,
  accentColor = "#E85D04",
  children,
}: {
  immersive: boolean;
  callouts?: readonly RedesignCallout[];
  accentColor?: string;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({
      immersive,
      showCallouts: immersive && callouts.length > 0,
      callouts,
      accentColor,
    }),
    [immersive, callouts, accentColor],
  );

  return (
    <RedesignPreviewContext.Provider value={value}>
      {children}
    </RedesignPreviewContext.Provider>
  );
}

export function useRedesignPreview() {
  return useContext(RedesignPreviewContext);
}
