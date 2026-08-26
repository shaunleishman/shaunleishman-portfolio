import type { HeuristicEvaluation } from "./types";
import { mgEmployeesEvaluation } from "./mg-employees";
import { offAxisDashboardsEvaluation } from "./off-axis-dashboards";
import { offAxisOnboardingEvaluation } from "./off-axis-onboarding";
import { offAxisToursEvaluation } from "./off-axis-tours";

/** All heuristic evaluations, keyed by slug. Add new studies here. */
export const HEURISTIC_EVALUATIONS: Record<string, HeuristicEvaluation> = {
  [mgEmployeesEvaluation.slug]: mgEmployeesEvaluation,
  [offAxisDashboardsEvaluation.slug]: offAxisDashboardsEvaluation,
  [offAxisOnboardingEvaluation.slug]: offAxisOnboardingEvaluation,
  [offAxisToursEvaluation.slug]: offAxisToursEvaluation,
};

export function getEvaluationBySlug(slug: string): HeuristicEvaluation | undefined {
  return HEURISTIC_EVALUATIONS[slug];
}
