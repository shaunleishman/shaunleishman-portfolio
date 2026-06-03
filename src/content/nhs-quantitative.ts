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
  olive: "#8a9548",
  magenta: "#c4578a",
  reference: "#94a3b8",
} as const;

export type NhsWeekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export type NhsWeekdayMeta = {
  id: NhsWeekday;
  label: string;
  shortLabel: string;
  color: string;
};

export const NHS_WEEKDAYS: NhsWeekdayMeta[] = [
  { id: "monday", label: "Monday", shortLabel: "Mon", color: NHS_QUANT_COLORS.coral },
  { id: "tuesday", label: "Tuesday", shortLabel: "Tue", color: NHS_QUANT_COLORS.teal },
  { id: "wednesday", label: "Wednesday", shortLabel: "Wed", color: NHS_QUANT_COLORS.purple },
  { id: "thursday", label: "Thursday", shortLabel: "Thu", color: NHS_QUANT_COLORS.olive },
  { id: "friday", label: "Friday", shortLabel: "Fri", color: NHS_QUANT_COLORS.magenta },
];

export type NhsCallOutcomeRow = {
  id: string;
  label: string;
  byWeekday: Record<NhsWeekday, number>;
};

/** Share of each call outcome by weekday (overall percentage). */
export const nhsWeekdayOutcomes: NhsCallOutcomeRow[] = [
  {
    id: "999",
    label: "999",
    byWeekday: { monday: 0, tuesday: 1.0, wednesday: 1.4, thursday: 0.8, friday: 1.4 },
  },
  {
    id: "ae",
    label: "A&E",
    byWeekday: { monday: 5.0, tuesday: 2.5, wednesday: 3.2, thursday: 6.8, friday: 5.8 },
  },
  {
    id: "callback",
    label: "Call back",
    byWeekday: { monday: 2.0, tuesday: 1.2, wednesday: 1.2, thursday: 3.5, friday: 2.8 },
  },
  {
    id: "gp",
    label: "GP",
    byWeekday: { monday: 0.5, tuesday: 1.0, wednesday: 3.2, thursday: 2.5, friday: 1.8 },
  },
  {
    id: "self-care",
    label: "Self care",
    byWeekday: { monday: 0, tuesday: 1.0, wednesday: 2.0, thursday: 2.8, friday: 2.0 },
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    byWeekday: { monday: 0.5, tuesday: 0.5, wednesday: 1.0, thursday: 1.5, friday: 0.5 },
  },
];

export type NhsSatisfactionRow = {
  label: string;
  value: number;
};

/** Overall satisfaction with the 111 service (all callers). */
export const nhsSatisfactionLevels: NhsSatisfactionRow[] = [
  { label: "Very satisfied", value: 58 },
  { label: "Somewhat satisfied", value: 28 },
  { label: "Neither", value: 4 },
  { label: "Somewhat dissatisfied", value: 5 },
  { label: "Very dissatisfied", value: 5 },
];

export type NhsTypicalCallerLayer = {
  id: string;
  percentage: number;
  label: string;
  detail: string;
};

export const nhsTypicalCallerProfile = {
  ageGroup: "25-39" as NhsAgeGroup,
  layers: [
    {
      id: "behalf-child",
      percentage: 43,
      label: "Behalf of child",
      detail: "The largest share of 25–39 survey respondents called on behalf of a young child.",
    },
    {
      id: "urgency",
      percentage: 30,
      label: "Urgent due to new symptoms",
      detail: "New or worsening symptoms were the most common urgency driver in this age band.",
    },
    {
      id: "time",
      percentage: 17,
      label: "6 pm – 12 midnight",
      detail: "Evening calls when GP access is limited — a pattern seen across several personas.",
    },
    {
      id: "outcome",
      percentage: 5,
      label: "Referred to A&E",
      detail: "A small but critical share of this cohort ended with an A&E referral after 111.",
    },
  ] satisfies NhsTypicalCallerLayer[],
};

export const NHS_TYPICAL_CALLER_COLORS = ["#a8cce8", "#7eb3e0", "#4d94cf", "#005eb8"] as const;

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
    name: "Prior use",
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
  {
    id: "satisfaction",
    name: "Satisfaction",
    title: "Breakdown of satisfaction levels with the 111 service",
    description: "Overall satisfaction among all 111 callers who completed the follow-up survey.",
  },
  {
    id: "weekday-outcomes",
    name: "Weekday outcomes",
    title: "Outcome of calls for weekdays",
    description:
      "How call outcomes varied Monday to Friday — A&E referrals peaked mid-week and on Thursday.",
  },
  {
    id: "typical-caller",
    name: "Typical caller",
    title: "Most typical 111 caller — ages 25–39",
    description:
      "How urgency, time of call, and outcome layer for the largest survey age group. Select a step to explore.",
  },
];
