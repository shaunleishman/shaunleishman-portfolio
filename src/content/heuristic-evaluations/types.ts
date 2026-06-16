/** Types aligned to ux_ui_heuristic_evaluation_framework.json finding_schema */

export type HeuristicId =
  | "H01"
  | "H02"
  | "H03"
  | "H04"
  | "H05"
  | "H06"
  | "H07"
  | "H08"
  | "H09"
  | "H10";

export type AdditionalLensId = "L01" | "L02" | "L03" | "L04" | "L05";

export type Severity = "low" | "medium" | "high" | "critical";

export type Confidence = "low" | "medium" | "high";

export type FindingOwner =
  | "Design"
  | "Product"
  | "Engineering"
  | "Content"
  | "Research"
  | "Unknown";

export type FindingStatus =
  | "new"
  | "triaged"
  | "in_progress"
  | "fixed"
  | "accepted_risk"
  | "needs_research";

export type FindingEvidence = {
  observed_where: string;
  observed_behaviour: string;
  expected_behaviour: string;
};

export type ScreenshotAnnotationLabelPosition = "right" | "left" | "below" | "above" | "inside";

export type ScreenshotAnnotation = {
  /** Horizontal centre of the highlight, as a percentage of image width */
  x: number;
  /** Vertical centre of the highlight, as a percentage of image height */
  y: number;
  label: string;
  /** Highlight shape — boxes frame UI regions; arrows mark fold lines */
  shape?: "circle" | "box" | "arrow";
  /** Box width and height as percentages of the image (box shape only) */
  width?: number;
  height?: number;
  labelPosition?: ScreenshotAnnotationLabelPosition;
  variant?: "issue" | "fix" | "context";
};

export type AccessibilityLens = {
  is_accessibility_related: boolean;
  wcag_principle: string | null;
  notes: string | null;
};

export type FindingPriorityScore = {
  /** How often users are likely to complain — 1 rare, 5 very common */
  frequency: 1 | 2 | 3 | 4 | 5;
  /** How much the issue affects the user — 1 minor, 5 severe */
  impact: 1 | 2 | 3 | 4 | 5;
  /** Whether the issue is one-time or keeps affecting the user — 1 once, 5 persistent */
  persistence: 1 | 2 | 3 | 4 | 5;
};

export type HeuristicFinding = {
  finding_id: string;
  title: string;
  screen_or_flow: string;
  user_task: string;
  primary_heuristic: HeuristicId;
  secondary_heuristics?: HeuristicId[];
  additional_lenses?: AdditionalLensId[];
  description: string;
  evidence: FindingEvidence;
  user_impact: string;
  severity: Severity;
  confidence: Confidence;
  recommendation: string;
  owner: FindingOwner;
  status: FindingStatus;
  /** Frequency, impact and persistence scores used to derive priority points */
  priority: FindingPriorityScore;
  screenshot_reference?: string;
  screenshot_annotations?: ScreenshotAnnotation[];
  /** Clarifies what the screenshot does / does not show */
  screenshot_caption?: string;
  accessibility_lens?: AccessibilityLens;
};

export type SeveritySummary = {
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export type ActionPlanItem = {
  priority: "fix_now" | "fix_next" | "monitor" | "validate";
  action: string;
};

export type RedesignCallout = {
  findingId: string;
  title: string;
  /** One-line description of the original issue */
  problem: string;
  /** What changed in the proposed mock */
  change: string;
  severity: Severity;
};

export type RedesignSummary = {
  intro?: string;
  /** Changes shown in the proposed mock */
  implemented: string[];
  /** Follow-up work before or after rollout */
  planned: string[];
  /** Hover markers in the interactive prototype, keyed by finding */
  callouts?: RedesignCallout[];
};

export type EvaluationScope = {
  evaluatedUrl: string;
  evaluationDate: string;
  evaluator: string;
  userGroups: string[];
  tasksEvaluated: string[];
  heuristicsUsed: string[];
  additionalLenses: string[];
  limitations: string[];
};

export type ExecutiveSummary = {
  whatWasEvaluated: string;
  usabilityHealth: string;
  topIssues: string[];
  mainRisks: string[];
  recommendedNextSteps: string[];
};

export type HeuristicEvaluation = {
  slug: string;
  title: string;
  client: string;
  accent: string;
  executiveSummary: ExecutiveSummary;
  scope: EvaluationScope;
  severitySummary: SeveritySummary;
  themes: { label: string; findingIds: string[] }[];
  criticalProblems?: {
    title: string;
    heuristics: string[];
    evidence: string[];
    expectedBehaviour: string;
    userImpact: string;
    severity: Severity;
    confidence: Confidence;
    recommendation: string;
    whyMostCritical?: string;
  }[];
  findings: HeuristicFinding[];
  actionPlan: ActionPlanItem[];
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
    annotations?: ScreenshotAnnotation[];
  }[];
  redesignSummary?: RedesignSummary;
};

export const HEURISTIC_LABELS: Record<HeuristicId, string> = {
  H01: "Visibility of system status",
  H02: "Match between system and the real world",
  H03: "User control and freedom",
  H04: "Consistency and standards",
  H05: "Error prevention",
  H06: "Recognition rather than recall",
  H07: "Flexibility and efficiency of use",
  H08: "Aesthetic and minimalist design",
  H09: "Help users recognise, diagnose and recover from errors",
  H10: "Help and documentation",
};

export function countSeverity(findings: HeuristicFinding[]): SeveritySummary {
  return findings.reduce(
    (acc, f) => {
      acc[f.severity] += 1;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0 },
  );
}
