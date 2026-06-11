/** Recruiter-optimised content for the NHS 111 case study */

export const nhsCaseStudyMeta = {
  outcomeLine:
    "Five caller personas and journey maps to improve NHS 111 routing and reassurance.",
  problemStatement:
    "Many people called NHS 111 without knowing if it was the right service or what to expect in the queue. Long waits, repeated questions, and unclear routing put pressure on callers and A&E.",
};

export const nhsAtAGlance = {
  summary:
    "Solo research for the NHS product team. Below: the problem, who I worked with, and what I delivered.",
  productGoal:
    "Give the NHS team evidence to improve 111 routing, wait-time updates, and caller reassurance.",
  team:
    "I was the only researcher on a four-week brief, reporting to the NHS product team. They set priorities. I owned recruitment through to final delivery.",
  problem:
    "Callers often used 111 for the wrong kind of help, waited without updates, and struggled to reach the right pathway, especially out of hours when GP access was limited.",
  contribution:
    "I owned recruitment, interviews, surveys, analysis, personas, journey maps, and the final presentation. I turned findings into tools the product team could reuse, not a report that sat on a shelf.",
  highlights: [
    "Five personas gave the team shared language for caller types before solution design",
    "Journey maps showed where reassurance and routing broke down",
    "Survey data backed up interview themes so findings were harder to ignore",
  ],
  methods: [
    "User interviews",
    "Surveys",
    "Affinity mapping",
    "Personas",
    "Journey mapping",
    "Thematic analysis",
  ],
};

export const nhsSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "research-approach", label: "Approach" },
  { id: "qualitative-research", label: "Qualitative" },
  { id: "personas-journeys", label: "Personas & journeys" },
  { id: "quantitative-research", label: "Quantitative" },
  { id: "key-findings", label: "Findings" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type NhsSectionId = (typeof nhsSectionNav)[number]["id"];

export function nhsSectionTitle(id: NhsSectionId): string {
  return nhsSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const nhsMyRole = {
  lead: "The NHS product team set priorities and came to the final readout. I was the sole researcher. Everything below is what I delivered.",
  impact:
    "My journey maps helped the team agree on the biggest pain points (long waits, repeated questions, unclear routing) before anyone moved into solution design.",
};

export const nhsTeamTogetherItems = [
  "The NHS product team scoped the four-week brief, shared context, and joined the final presentation.",
  "Call handlers and recent callers took part in interviews and surveys I designed. Their stories shaped the personas and journey maps.",
];

export const nhsRoleItems = [
  "I managed recruitment and wrote the survey and interview plan. I chose phone interviews to fit the timeline.",
  "I ran interviews with call handlers and recent callers, then led affinity mapping to find patterns and design opportunities.",
  "I designed a survey to back up interview themes with numbers, then turned both into personas, journey maps, and a report for the product team.",
];

export const nhsQualitativeItems = [
  "I ran 30-minute interviews with recent callers and call handlers",
  "I led affinity mapping to find recurring behaviours, frustrations, and needs",
  "I created five personas covering uncertainty, distress, confirmation-seeking, breaking point, and GP substitution",
  "I mapped journeys showing where reassurance, routing clarity, and wait-time updates matter most",
];

export const nhsQuantitativeItems = [
  "I designed a follow-up survey to back up interview themes with measurable patterns",
  "Analysis of who tried other resources before calling 111",
  "Outcome and urgency data by time of day and day of week",
  "999 referral patterns compared with prior resource use",
];

export const nhsFindingHighlights = [
  {
    title: "People try other services first",
    text: "Many callers, especially older people, waited for their GP before calling 111, often when symptoms had already got worse.",
  },
  {
    title: "Helpful staff, frustrating waits",
    text: "Callers liked the staff, but long waits, repeating information, and scripted replies wore down trust during triage.",
  },
  {
    title: "Clearer routing and faster help",
    text: "Data on urgency, timing, and outcomes showed where clearer updates and faster routing would ease pressure on A&E.",
  },
];

export const nhsReflectionItems = [
  "Mixing numbers and interviews made findings harder to dismiss. Numbers showed what was happening. Interviews explained why.",
  "Personas and journey maps gave the NHS team tools they could reuse in product decisions, not just a one-off report.",
  "Phone interviews worked well for recruitment, but face-to-face sessions would have captured emotion and trust more clearly.",
];
