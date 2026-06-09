"use client";

import { createContext, useContext, type ReactNode } from "react";

export type BulkSynthesiseStep =
  | "idle"
  | "pick-2"
  | "pick-3"
  | "pick-4"
  | "selected"
  | "synthesise"
  | "synthesised";

const BulkDemoPlaybackContext = createContext<BulkSynthesiseStep>("idle");

export function useBulkDemoPlaybackStep() {
  return useContext(BulkDemoPlaybackContext);
}

export function BulkDemoPlaybackProvider({
  step,
  children,
}: {
  step: BulkSynthesiseStep;
  children: ReactNode;
}) {
  return (
    <BulkDemoPlaybackContext.Provider value={step}>{children}</BulkDemoPlaybackContext.Provider>
  );
}

export const BULK_SYNTHESISE_DEMO_IDS = ["2", "3", "4"] as const;

export const BULK_SYNTHESISED_LABEL = "Synthesised";
