export const NHS_AGE_GROUPS = ["18-24", "25-39", "40-49", "50-59", "60-69", "70-79"] as const;

export type NhsAgeGroup = (typeof NHS_AGE_GROUPS)[number];

export type SurveyRespondentRow = {
  ageGroup: NhsAgeGroup;
  surveyRespondents: number;
  onBehalfOfChild: number;
  insight?: string;
};

export type PriorResourceRow = {
  ageGroup: NhsAgeGroup;
  surveyRespondents: number;
  usedNhsInform: number;
  wentToGpPharmacy: number;
  insight?: string;
};

export type OutcomeTimeBlock = {
  id: string;
  label: string;
  shortLabel: string;
  didNotTryResources: number;
  triedResources: number;
  insight?: { series: "did-not-try" | "tried"; text: string };
};

export const nhsSurveyRespondents: SurveyRespondentRow[] = [
  { ageGroup: "18-24", surveyRespondents: 8, onBehalfOfChild: 0.8 },
  {
    ageGroup: "25-39",
    surveyRespondents: 43,
    onBehalfOfChild: 18,
    insight: "Largest share of survey respondents — many calling on behalf of young children.",
  },
  { ageGroup: "40-49", surveyRespondents: 22, onBehalfOfChild: 9 },
  { ageGroup: "50-59", surveyRespondents: 13, onBehalfOfChild: 2 },
  { ageGroup: "60-69", surveyRespondents: 10, onBehalfOfChild: 2 },
  { ageGroup: "70-79", surveyRespondents: 4, onBehalfOfChild: 0.2 },
];

export const nhsPriorResourceUse: PriorResourceRow[] = [
  { ageGroup: "18-24", surveyRespondents: 8, usedNhsInform: 5.5, wentToGpPharmacy: 2 },
  {
    ageGroup: "25-39",
    surveyRespondents: 43,
    usedNhsInform: 24,
    wentToGpPharmacy: 6,
    insight: "Peak age group for trying NHS Inform before calling 111.",
  },
  { ageGroup: "40-49", surveyRespondents: 22, usedNhsInform: 11, wentToGpPharmacy: 4.5 },
  { ageGroup: "50-59", surveyRespondents: 13, usedNhsInform: 3.5, wentToGpPharmacy: 2 },
  { ageGroup: "60-69", surveyRespondents: 10, usedNhsInform: 4, wentToGpPharmacy: 1.5 },
  { ageGroup: "70-79", surveyRespondents: 4.5, usedNhsInform: 1.5, wentToGpPharmacy: 1 },
];

export const nhs999OutcomeBlocks: OutcomeTimeBlock[] = [
  {
    id: "overnight",
    label: "12 midnight – 8 am",
    shortLabel: "Overnight",
    didNotTryResources: 21,
    triedResources: 13,
    insight: {
      series: "did-not-try",
      text: "57% of which were on behalf of themselves.",
    },
  },
  {
    id: "morning",
    label: "8 am – 12 noon",
    shortLabel: "Morning",
    didNotTryResources: 12,
    triedResources: 18,
    insight: {
      series: "tried",
      text: "Breaking point: 60% of which were retired and tried the GP first.",
    },
  },
  {
    id: "afternoon",
    label: "12 noon – 6 pm",
    shortLabel: "Afternoon",
    didNotTryResources: 19,
    triedResources: 10,
  },
  {
    id: "evening",
    label: "6 pm – 12 midnight",
    shortLabel: "Evening",
    didNotTryResources: 18,
    triedResources: 13,
  },
];

/** Line chart points at period boundaries (midnight → midnight) */
export const nhs999OutcomeSeries = {
  didNotTry: [18, 21, 12, 19, 18],
  tried: [14, 13, 18, 10, 13],
} as const;

export const NHS_QUANT_COLORS = {
  teal: "#26a69a",
  coral: "#d4553a",
  purple: "#7c6ba8",
  orange: "#e8913a",
  reference: "#94a3b8",
} as const;

export type NhsQuantitativeView = {
  id: string;
  name: string;
  title: string;
  description: string;
};

export const nhsQuantitativeViews: NhsQuantitativeView[] = [
  {
    id: "survey-respondents",
    name: "Survey respondents",
    title: "Who filled out the survey",
    description:
      "People who used 111 in the past 12 months and completed the follow-up survey (April 2023).",
  },
  {
    id: "prior-resources",
    name: "Prior resource use",
    title: "Trying other resources first",
    description:
      "Whether callers used NHS Inform or visited a GP or pharmacy before calling 111, by age group.",
  },
  {
    id: "999-outcomes",
    name: "999 outcomes",
    title: "Told to call 999 after 111",
    description:
      "Share of callers told to call 999 — comparing those who tried other resources first vs those who did not.",
  },
];
