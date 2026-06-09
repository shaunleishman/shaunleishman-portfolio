import type { PrototypeCalloutConfig } from "@/components/projects/PrototypeDesignCallout";
import type { BulkSynthesiseStep } from "@/prototypes/half-hourly/HalfHourlyBulkDemoPlayback";

export type ArbncoBulkDemoStepConfig = PrototypeCalloutConfig & {
  step: BulkSynthesiseStep;
  /** DOM selector measured inside the 1280×800 prototype frame. */
  targetSelector: string;
  showCallout?: boolean;
  showHighlight?: boolean;
  showCursor?: boolean;
  durationMs?: number;
};

export const arbncoBulkSynthesiseSteps: ArbncoBulkDemoStepConfig[] = [
  {
    step: "idle",
    title: "Project list",
    description: "Start with no rows selected.",
    targetSelector: "#project-list-select-2",
    showCallout: false,
    showHighlight: false,
    showCursor: false,
    durationMs: 1200,
  },
  {
    step: "pick-2",
    title: "Select rows",
    description: "Tick each mixed project.",
    targetSelector: "#project-list-select-2",
    showCallout: false,
    showHighlight: true,
    showCursor: true,
    durationMs: 900,
  },
  {
    step: "pick-3",
    title: "Select rows",
    description: "Tick each mixed project.",
    targetSelector: "#project-list-select-3",
    showCallout: false,
    showHighlight: true,
    showCursor: true,
    durationMs: 900,
  },
  {
    step: "pick-4",
    title: "Select rows",
    description: "Tick each mixed project.",
    targetSelector: "#project-list-select-4",
    showCallout: false,
    showHighlight: true,
    showCursor: true,
    durationMs: 900,
  },
  {
    step: "selected",
    title: "Bulk selection",
    description: "Three mixed projects — synthesise appears in the toolbar.",
    targetSelector: "#project-list-toolbar-actions",
    calloutSide: "right",
    maxWidth: "13rem",
    showCallout: true,
    showHighlight: true,
    showCursor: true,
    durationMs: 2800,
  },
  {
    step: "synthesise",
    title: "Synthesise",
    description: "Turn on synthetic hourly data for every selected project.",
    targetSelector: "#demo-bulk-synthesise",
    calloutSide: "left",
    maxWidth: "13rem",
    showCallout: true,
    showHighlight: true,
    showCursor: true,
    durationMs: 2800,
  },
  {
    step: "synthesised",
    title: "Synthesised",
    description: "Chips turn green — Synthesise drops away, Revert stays.",
    targetSelector: 'tr[data-selected="true"] td:nth-child(3)',
    calloutSide: "right",
    maxWidth: "13rem",
    showCallout: true,
    showHighlight: true,
    showCursor: false,
    durationMs: 3200,
  },
];

const DEFAULT_STEP_DURATION_MS = 4000;

export function bulkSynthesiseDemoStepDurationMs(
  step: ArbncoBulkDemoStepConfig,
  fallback = DEFAULT_STEP_DURATION_MS,
) {
  return step.durationMs ?? fallback;
}

export function bulkSynthesiseDemoTotalDurationMs(
  steps: readonly ArbncoBulkDemoStepConfig[] = arbncoBulkSynthesiseSteps,
) {
  return steps.reduce((sum, step) => sum + bulkSynthesiseDemoStepDurationMs(step), 0);
}

export function bulkSynthesiseDemoElapsedBeforeStepMs(
  stepIndex: number,
  steps: readonly ArbncoBulkDemoStepConfig[] = arbncoBulkSynthesiseSteps,
) {
  return steps
    .slice(0, stepIndex)
    .reduce((sum, step) => sum + bulkSynthesiseDemoStepDurationMs(step), 0);
}
