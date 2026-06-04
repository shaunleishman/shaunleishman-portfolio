export type FeedbackVariant = "case-study" | "article";

export type FeedbackRatingOption = {
  score: number;
  label: string;
};

export type FeedbackVariantConfig = {
  eyebrow: string;
  sectionTitle: string;
  sectionLead: string;
  question: string;
  submittedDescription: string;
  followUpTitle: string;
  followUpLead: string;
  ratingOptions: readonly FeedbackRatingOption[];
  reasons: readonly string[];
};

export const FEEDBACK_VARIANT_CONFIG: Record<FeedbackVariant, FeedbackVariantConfig> = {
  "case-study": {
    eyebrow: "Portfolio feedback",
    sectionTitle: "Your feedback",
    sectionLead:
      "An optional rating helps me understand how relevant this case study is, whether you're hiring, collaborating, or just browsing.",
    question: "How strong does this project come across?",
    submittedDescription: "Thanks, it helps me understand what's working on this case study.",
    followUpTitle: "What held it back?",
    followUpLead: "Pick the closest reason so I can improve this case study.",
    ratingOptions: [
      { score: 1, label: "Weak or unconvincing" },
      { score: 2, label: "Weak in places" },
      { score: 4, label: "Neutral" },
      { score: 6, label: "Strong and credible" },
      { score: 7, label: "Very impressive" },
    ],
    reasons: [
      "Wrong industry",
      "Wrong skills or focus area",
      "Too technical",
      "Not enough detail",
      "Hard to follow the story",
      "Doesn't show enough impact",
      "Not the kind of project I hire for",
    ],
  },
  article: {
    eyebrow: "Article feedback",
    sectionTitle: "Your feedback",
    sectionLead:
      "An optional rating helps me understand whether this article is useful, clear, and worth sharing.",
    question: "How strong does this article come across?",
    submittedDescription: "Thanks. It helps me understand what's working in my writing.",
    followUpTitle: "What held it back?",
    followUpLead: "Pick the closest reason so I can improve this article.",
    ratingOptions: [
      { score: 1, label: "Not convincing or clear" },
      { score: 2, label: "Weak in places" },
      { score: 4, label: "Neutral" },
      { score: 6, label: "Clear and useful" },
      { score: 7, label: "Strong and worth sharing" },
    ],
    reasons: [
      "Too long or too short",
      "Not enough detail",
      "Hard to follow",
      "Too technical",
      "Not relevant to me",
      "Too generic",
      "Missing examples",
    ],
  },
};
