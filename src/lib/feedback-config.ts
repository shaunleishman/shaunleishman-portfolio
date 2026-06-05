export type FeedbackVariant = "case-study" | "article";

export type FeedbackBucket = "weak" | "decent" | "strong";

export type FeedbackRatingOption = {
  score: number;
  label: string;
  /** Stored in analytics metadata */
  quality: string;
};

export type ImprovementOption = {
  id: string;
  label: string;
  other?: boolean;
};

export const OTHER_IMPROVEMENT_ID = "other";

export type FeedbackVariantConfig = {
  eyebrow: string;
  sectionTitle: string;
  sectionLead: string;
  question: string;
  submittedDescription: string;
  followUpTitle: string;
  followUpLead: string;
  otherImprovementLabel: string;
  otherImprovementPlaceholder: string;
  ratingOptions: readonly FeedbackRatingOption[];
  improvementOptions: readonly ImprovementOption[];
  needsFollowUp: (score: number) => boolean;
  getFeedbackBucket: (score: number) => FeedbackBucket;
};

const QUALITY_RATINGS: readonly FeedbackRatingOption[] = [
  { score: 5, label: "Excellent", quality: "excellent" },
  { score: 4, label: "Strong", quality: "strong" },
  { score: 3, label: "Solid", quality: "solid" },
  { score: 2, label: "Needs work", quality: "needs_work" },
  { score: 1, label: "Poor", quality: "poor" },
];

export const FEEDBACK_VARIANT_CONFIG: Record<FeedbackVariant, FeedbackVariantConfig> = {
  "case-study": {
    eyebrow: "Portfolio feedback",
    sectionTitle: "Your feedback",
    sectionLead:
      "Optional — helps me understand how this case study comes across and what to improve for hiring managers and collaborators.",
    question: "How would you rate the overall quality of this case study?",
    submittedDescription:
      "Thanks — this helps me strengthen future case studies and focus on what matters most.",
    followUpTitle: "What's the main thing that you would improve?",
    followUpLead:
      "Pick the area that would make the biggest difference. If it's something else, choose Other and tell me in your own words.",
    otherImprovementLabel: "Tell me what you'd improve",
    otherImprovementPlaceholder: "What would make this case study stronger for you?",
    ratingOptions: QUALITY_RATINGS,
    improvementOptions: [
      { id: "clarity", label: "Clarity" },
      { id: "storytelling", label: "Storytelling" },
      { id: "visual_design", label: "Visual design" },
      { id: "ux_process", label: "UX process" },
      { id: "research_evidence", label: "Research evidence" },
      { id: "outcome_impact", label: "Outcome and impact" },
      { id: "my_role", label: "My role" },
      { id: OTHER_IMPROVEMENT_ID, label: "Other", other: true },
    ],
    needsFollowUp: (score) => score <= 4,
    getFeedbackBucket: (score) => {
      if (score <= 2) return "weak";
      if (score === 3) return "decent";
      return "strong";
    },
  },
  article: {
    eyebrow: "Article feedback",
    sectionTitle: "Your feedback",
    sectionLead:
      "Optional — helps me understand what's working in my writing and what to improve for the next article.",
    question: "How would you rate the overall quality of this article?",
    submittedDescription:
      "Thanks — that helps me improve future articles and write about what readers actually need.",
    followUpTitle: "What's the main thing that you would improve?",
    followUpLead:
      "Pick the area that would have helped most. If it's something else, choose Other and tell me in your own words.",
    otherImprovementLabel: "Tell me what you'd improve",
    otherImprovementPlaceholder: "What would make this article more useful for you?",
    ratingOptions: QUALITY_RATINGS,
    improvementOptions: [
      { id: "clarity", label: "Clarity" },
      { id: "storytelling", label: "Storytelling and structure" },
      { id: "examples", label: "Examples and practical takeaways" },
      { id: "depth", label: "Depth and detail" },
      { id: "relevance", label: "Relevance to my interests" },
      { id: "title_intro", label: "Title and intro" },
      { id: OTHER_IMPROVEMENT_ID, label: "Other", other: true },
    ],
    needsFollowUp: (score) => score <= 4,
    getFeedbackBucket: (score) => {
      if (score <= 2) return "weak";
      if (score === 3) return "decent";
      return "strong";
    },
  },
};

export function getQualityKey(variant: FeedbackVariant, score: number): string | undefined {
  return FEEDBACK_VARIANT_CONFIG[variant].ratingOptions.find((option) => option.score === score)
    ?.quality;
}

export function getImprovementLabel(
  variant: FeedbackVariant,
  improvementId: string,
): string | undefined {
  return FEEDBACK_VARIANT_CONFIG[variant].improvementOptions.find(
    (option) => option.id === improvementId,
  )?.label;
}

export function isOtherImprovement(improvementId: string | null): boolean {
  return improvementId === OTHER_IMPROVEMENT_ID;
}

export const QUALITY_LABELS: Record<string, string> = {
  excellent: "Excellent",
  strong: "Strong",
  solid: "Solid",
  needs_work: "Needs work",
  poor: "Poor",
};

export function getQualityLabel(qualityKey: string): string {
  return QUALITY_LABELS[qualityKey] ?? qualityKey.replace(/_/g, " ");
}

export function getImprovementAreaDisplayLabel(
  areaId: string,
  contentType?: string | null,
): string {
  if (contentType === "article") {
    const articleLabel = getImprovementLabel("article", areaId);
    if (articleLabel) return articleLabel;
  }
  const caseStudyLabel = getImprovementLabel("case-study", areaId);
  if (caseStudyLabel) return caseStudyLabel;
  return areaId.replace(/_/g, " ");
}
