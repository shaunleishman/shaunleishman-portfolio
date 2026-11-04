"use client";

import { createContext, useContext, useMemo } from "react";
import type { RedesignCallout } from "@/content/heuristic-evaluations/types";

type RedesignPreviewContextValue = {
  /** True inside the edge-to-edge full screen portal */
  immersive: boolean;
  /** Finding markers — shown in full-screen explore mode */
  showCallouts: boolean;
  callouts: readonly RedesignCallout[];
  accentColor: string;
};

const EMPTY_CALLOUTS: readonly RedesignCallout[] = [];

const RedesignPreviewContext = createContext<RedesignPreviewContextValue>({
  immersive: false,
  showCallouts: false,
  callouts: [],
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
