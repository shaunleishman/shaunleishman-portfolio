/** Recruiter-optimised content for the NHS 111 case study */

export const nhsCaseStudyMeta = {
  outcomeLine:
    "Five caller personas and journey maps to improve NHS 111 routing and reassurance.",
  problemStatement:
    "Many people reached NHS 111 without knowing whether it was the right service, or what to expect once they were in the queue. Long waits, repeated questions, and unclear routing added pressure on callers and on A&E.",
};

export const nhsAtAGlance = {
  summary:
    "A quick overview of the problem, my contribution, and how the research was delivered. The sections below go into more detail.",
  problem:
    "Callers often used 111 for the wrong type of support, waited without updates, and struggled to reach the right pathway, especially out of hours when GP access was limited.",
  contribution:
    "End-to-end mixed-method research: recruitment, interviews, survey design, thematic analysis, personas, journey maps, and presentation to the NHS product team.",
  highlights: [
    "Five caller personas from interviews and affinity mapping",
    "Journey maps highlighting reassurance and routing gaps",
    "Four-week delivery from recruitment to final report",
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

export const nhsRoleItems = [
  "Managed recruitment and wrote the survey and interview plan",
  "Moderated interviews with call handlers and people who recently used the service",
  "Designed and wrote the research outcomes and report",
  "Presented quantitative and qualitative data to the NHS product team",
];

export const nhsQualitativeItems = [
  "30-minute interviews with recent callers and call handlers",
  "Affinity mapping to identify recurring behaviours, frustrations, and needs",
  "Five personas spanning uncertainty, distress, confirmation-seeking, breaking point, and GP substitution",
  "Journey maps showing where reassurance, routing clarity, and wait-time updates matter most",
];

export const nhsQuantitativeItems = [
  "Follow-up survey to triangulate interview themes with measurable patterns",
  "Analysis of who tried other resources before calling 111",
  "Outcome and urgency data by time of day and day of week",
  "999 referral patterns compared with prior resource use",
];

export const nhsFindingHighlights = [
  {
    title: "People try other services first",
    text: "Many callers, especially senior citizens, waited for their GP before turning to 111, often when symptoms had already worsened.",
  },
  {
    title: "Helpful staff, frustrating waits",
    text: "Callers rated staff positively, but long waits, repeating information, and scripted responses eroded trust during the triage journey.",
  },
  {
    title: "Clearer routing and faster help",
    text: "Urgency, timing, and outcome data showed where clearer updates and quicker access to the right pathway would reduce pressure on A&E.",
  },
];

export const nhsReflectionItems = [
  "Mixing quantitative and qualitative data made the findings harder to dismiss, numbers showed what was happening, interviews explained why.",
  "Personas and journey maps gave the NHS team practical artefacts they could reuse in product decisions, not just a one-off report.",
  "Phone interviews were efficient for recruitment, but face-to-face sessions would have captured emotion and trust more richly.",
];
