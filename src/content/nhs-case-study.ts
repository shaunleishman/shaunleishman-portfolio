/** Recruiter-optimised content for the NHS 111 case study */

export const nhsCaseStudyMeta = {
  outcomeLine:
    "Five caller personas and journey maps to improve NHS 111 routing and reassurance.",
  problemStatement:
    "Many people called NHS 111 without knowing if it was the right service or what to expect in the queue. Long waits, repeated questions, and unclear routing put pressure on callers and A&E.",
};

export const nhsAtAGlance = {
  summary: "Research lead with the NHS product team. Goal, team, and our work below.",
  productGoal:
    "Give the NHS team evidence to improve 111 routing, wait-time updates, and caller reassurance.",
  team:
    "I was the research lead on a four-week brief, reporting to the NHS product team. They set priorities. Together we took recruitment through to final delivery.",
  problem:
    "Callers often used 111 for the wrong kind of help, waited without updates, and struggled to reach the right pathway, especially out of hours when GP access was limited.",
  contribution:
    "I led recruitment, interviews, surveys, analysis, personas, journey maps, and the final presentation. We turned findings into tools the product team could reuse, not a report that sat on a shelf.",
  highlights: [
    "Five personas for shared caller language",
    "Journey maps showed where routing broke down",
    "Survey data backed interview themes",
  ],
  methods: [
    { label: "User interviews", percent: 25 },
    { label: "Surveys", percent: 15 },
    { label: "Affinity mapping", percent: 15 },
    { label: "Personas", percent: 15 },
    { label: "Journey mapping", percent: 15 },
    { label: "Thematic analysis", percent: 15 },
  ],
};

export const nhsSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "timeline", label: "Timeline" },
  { id: "research", label: "Research" },
  { id: "key-findings", label: "Findings" },
  { id: "deliverables", label: "Deliverables" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type NhsSectionId = (typeof nhsSectionNav)[number]["id"];

export function nhsSectionTitle(id: NhsSectionId): string {
  return nhsSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const nhsMyRole = {
  lead: "NHS team set priorities; I led research. Below: what we did together vs what I led.",
  impact:
    "Our journey maps helped the team agree on the biggest pain points (long waits, repeated questions, unclear routing) before anyone moved into solution design.",
};

export const nhsTeamTogetherItems = [
  "The NHS product team scoped the four-week brief, shared context, and joined the final presentation.",
  "Call handlers and recent callers took part in interviews and surveys we designed. Their stories shaped the personas and journey maps.",
];

export const nhsRoleItems = [
  "I led recruitment and wrote the survey and interview plan. We chose phone interviews to fit the timeline.",
  "We ran interviews with call handlers and recent callers, then led affinity mapping to find patterns and design opportunities.",
  "We designed a survey to back up interview themes with numbers, then turned both into personas, journey maps, and a report for the product team.",
];

export const nhsProjectTimeline = {
  totalWeeks: 4,
  lead: "4 weeks from brief to final presentation. I led research throughout.",
  intro:
    "A four-week NHS brief. I owned recruitment, fieldwork, analysis, and deliverables; the product team scoped priorities and joined the final readout.",
  phases: [
    {
      label: "Planning",
      tasks: [
        { label: "Brief with NHS team", startWeek: 1, endWeek: 1.2, involved: true, detail: "Aligned on goals and scope with the NHS team." },
        { label: "Survey plan", startWeek: 1.2, endWeek: 1.55, involved: true, detail: "Designed the survey to back up interview themes." },
        { label: "Interview plan", startWeek: 1.75, endWeek: 3.75, involved: true, detail: "Wrote the interview guide and screening criteria." },
        { label: "Recruitment", startWeek: 1.75, endWeek: 3.25, involved: true, detail: "Recruited callers and call handlers to take part." },
        { label: "Study prep", startWeek: 1.75, endWeek: 2.25, involved: true, detail: "Set up consent, logistics, and session schedules." },
      ],
    },
    {
      label: "Fieldwork",
      tasks: [
        { label: "Phone interviews", startWeek: 2.25, endWeek: 3.25, involved: true, detail: "Ran 30-minute interviews with callers and handlers." },
        { label: "Survey fielding", startWeek: 2, endWeek: 3.25, involved: true, detail: "Collected survey responses to quantify the themes." },
      ],
    },
    {
      label: "Synthesis",
      tasks: [
        { label: "Affinity mapping", startWeek: 3.25, endWeek: 3.55, involved: true, detail: "Clustered findings to surface behaviour patterns." },
      ],
    },
    {
      label: "Delivery",
      tasks: [
        { label: "Personas", startWeek: 3.55, endWeek: 3.75, involved: true, detail: "Built five personas for shared caller language." },
        { label: "Journey maps", startWeek: 3.65, endWeek: 3.85, involved: true, detail: "Mapped where reassurance and routing matter most." },
        { label: "Findings report", startWeek: 3.75, endWeek: 3.92, involved: true, detail: "Packaged the evidence into reusable team tools." },
        { label: "Final presentation", startWeek: 3.9, endWeek: 4, involved: true, detail: "Presented findings and recommendations to the team." },
      ],
    },
  ],
} as const;

export const nhsQualitativeItems = [
  "We ran 30-minute interviews with callers and handlers, then affinity-mapped the recurring behaviours, frustrations, and needs",
  "We created five personas covering uncertainty, distress, confirmation-seeking, breaking point, and GP substitution",
  "We mapped journeys showing where reassurance, routing clarity, and wait-time updates matter most",
];

export const nhsQuantitativeItems = [
  "We designed a follow-up survey to back up interview themes with measurable patterns",
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
