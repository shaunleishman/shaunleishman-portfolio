import type { HeuristicEvaluation } from "./types";
import { mgEmployeesEvaluation } from "./mg-employees";
import { offAxisDashboardsEvaluation } from "./off-axis-dashboards";
import { offAxisOnboardingEvaluation } from "./off-axis-onboarding";
import { offAxisTaskFlowsEvaluation } from "./off-axis-task-flows";
import { offAxisToursEvaluation } from "./off-axis-tours";

/** All heuristic evaluations, keyed by slug. Add new studies here. */
export const HEURISTIC_EVALUATIONS: Record<string, HeuristicEvaluation> = {
  [mgEmployeesEvaluation.slug]: mgEmployeesEvaluation,
  [offAxisDashboardsEvaluation.slug]: offAxisDashboardsEvaluation,
  [offAxisOnboardingEvaluation.slug]: offAxisOnboardingEvaluation,
  [offAxisTaskFlowsEvaluation.slug]: offAxisTaskFlowsEvaluation,
  [offAxisToursEvaluation.slug]: offAxisToursEvaluation,
};

/** Report pages import this lookup. Study files do not export another copy. */
export function getEvaluationBySlug(slug: string): HeuristicEvaluation | undefined {
  return HEURISTIC_EVALUATIONS[slug];
}
