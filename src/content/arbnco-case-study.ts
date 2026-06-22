/** Recruiter-optimised content for the Arbnco case study */

export const arbncoCaseStudyMeta = {
  outcomeLine:
    "Clearer ways to trust synthetic hourly energy data, and to turn it on across the platform.",
  problemStatement:
    "Teams needed hourly carbon data, but most meters only reported once a month.",
};

export const arbncoAtAGlance = {
  summary:
    "I was the design lead on a short squad sprint to make synthetic hourly data trustworthy.",
  productGoal:
    "Help energy teams get hourly carbon insights from machine-learning estimates they could understand and trust.",
  team:
    "We were a squad with a product manager and engineers. They owned what was technically possible, and I led the design and handoff.",
  problem:
    "Monthly meter readings were too coarse for the hourly carbon insights teams needed. Without finer data, they could not see or act on hourly patterns.",
  contribution:
    "I led the UI/UX work end to end, from the journey map and wireframes through to the prototype, design reviews, and engineering handoff.",
  highlights: [
    "Eligibility visible before users turn data on",
    "One status pattern PM and engineering shared",
    "Journey map to implementation in 3–4 weeks",
  ],
  methods: [
    { label: "Service design", percent: 15 },
    { label: "Journey mapping", percent: 15 },
    { label: "UI design", percent: 30 },
    { label: "Prototyping", percent: 25 },
    { label: "Design reviews", percent: 15 },
  ],
};

export const arbncoSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "timeline", label: "Timeline" },
  { id: "design", label: "Design" },
  { id: "refined-solution", label: "Solution" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type ArbncoSectionId = (typeof arbncoSectionNav)[number]["id"];

export function arbncoSectionTitle(id: ArbncoSectionId): string {
  return arbncoSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const arbncoMyRole = {
  lead: "This was a squad sprint: the team owned scope and feasibility, and I led the design.",
  impact:
    "Our journey map helped the team agree where users needed clarity before anyone opened Figma. That cut rework when eligibility rules changed late in the sprint.",
};

export const arbncoTeamTogetherItems = [
  "The PM and engineering set the ML rules, sprint scope, and what could ship.",
  "In design reviews we shared our flows and reasoning, and the squad agreed which screens to build first.",
];

export const arbncoRoleItems = [
  "We mapped where synthetic data fit, then focused on the project list and settings where trust is decided.",
  "We updated graphs, tables, and reports with plain labels instead of ML jargon, to reassure users.",
  "We ran design reviews and wrote handoff specs for eligibility and status tags, so engineering had one pattern.",
];

export const arbncoProjectTimeline = {
  totalWeeks: 4,
  lead: "3 to 4 weeks from journey map to engineering handoff, with me leading design throughout.",
  intro:
    "Over a squad sprint with PM and engineering, I mapped the journey, designed the flows, and handed off specs, while the squad worked out what could ship.",
  phases: [
    {
      label: "Discovery",
      tasks: [
        { label: "Journey mapping", startWeek: 1, endWeek: 1.65, involved: true, detail: "Mapped the energy team's end-to-end data journey." },
        { label: "Squad alignment", startWeek: 1.4, endWeek: 1.9, involved: true, detail: "Aligned with PM and engineers on what could ship." },
      ],
    },
    {
      label: "Design",
      tasks: [
        { label: "Wireframes & UI", startWeek: 1.5, endWeek: 2.85, involved: true, detail: "Designed flows for eligibility and data status." },
        { label: "Design reviews", startWeek: 2, endWeek: 3.15, involved: true, detail: "Reviewed designs with the squad for feasibility." },
      ],
    },
    {
      label: "Prototype & handoff",
      tasks: [
        { label: "High-fidelity prototype", startWeek: 2.75, endWeek: 3.5, involved: true, detail: "Built a clickable prototype for deeper exploration." },
        { label: "Design review", startWeek: 3.42, endWeek: 3.49, involved: true, detail: "Walked the squad through the prototype." },
        { label: "Engineering handoff", startWeek: 3.3, endWeek: 4, involved: true, detail: "Handed off flows, states, and specs to engineering." },
      ],
    },
  ],
} as const;

/** Synthetic-data journey, aligned to the half-hourly prototype flow. */
export const arbncoJourneyStages = [
  {
    label: "Scan the portfolio",
    action: "Compare data resolution across buildings before turning hourly estimates on.",
    response: "Resolution column on the project list plus All, Synthetic, and Mixed filter chips.",
    improvement:
      "List view shows coverage at a glance. Users spot gaps without opening each project.",
  },
  {
    label: "Spot eligibility",
    action: "See which buildings have enough readings for ML hourly estimates.",
    problem: "Eligibility rules only surfaced inside project settings, so blockers were easy to miss.",
    response:
      "Colour-coded chips on every row. Mixed means eligible, High means insufficient data, Synthetic means already on.",
    improvement:
      "Mixed and High are visible on the list, so users no longer discover blockers only after clicking through.",
  },
  {
    label: "Enable one building",
    action: "Turn synthetic data on for a single project from Edit Project settings.",
    response:
      "Dedicated toggle with plain-language copy and a first-visit tooltip explaining what estimates unlock.",
    improvement:
      "Toggle uses a green active border and helper text. The tooltip dismisses after the first read.",
  },
  {
    label: "Bulk select",
    action: "Activate hourly estimates for several mixed-resolution buildings at once.",
    response: "Row checkboxes reveal a toolbar. Synthesise appears only when every selected row is eligible.",
    improvement:
      "Selecting mixed projects surfaces Synthesise in the toolbar. Ineligible rows stay disabled.",
  },
  {
    label: "Synthesise selection",
    action: "Confirm turning on generated data for the whole selection.",
    response:
      "One Synthesise action updates resolution chips to green “Synthesised” and clears the bulk action when done.",
    improvement:
      "Chips flip to success immediately. Revert stays available if users need to roll back.",
  },
  {
    label: "Confirm active state",
    action: "Trust that synthetic hourly data is actually running on a project.",
    problem: "Users could not tell if estimates were active after leaving settings.",
    response: "Green chips, sparkles badge in the sidebar, and matching labels in settings and overview.",
    improvement:
      "Project shell accent shifts to green when synthetic is enabled, visible across list, settings, and charts.",
  },
  {
    label: "Read charts with confidence",
    action: "Review energy and carbon charts knowing which segments use estimates and which use meter readings.",
    response:
      "Chart legends and overview copy distinguish synthetic segments from original low-frequency data.",
    improvement:
      "Energy and carbon views keep actual readings alongside generated hours so trust does not drop after activation.",
  },
  {
    label: "Revert when needed",
    action: "Roll back synthetic data if estimates are wrong or a building no longer qualifies.",
    response:
      "Bulk Revert from the list toolbar, or toggle off in project settings. The Mixed chip returns when synthetic is off.",
    improvement: "Revert mirrors Synthesise with the same toolbar pattern, no separate admin flow.",
  },
] as const;

/** Figma Make prototype shared in design reviews before the built interactive demo. */
export const arbncoInitialPrototypeUrl =
  "https://www.figma.com/make/MAun3hdKIKb6vTuWxbwDGN/Prototype-for-Half-Hourly-Project?fullscreen=1&t=XgJ56NLCAL3ShPcD-1&code-node-id=0-9";

/** Static preview for the Make file — external sites cannot iframe Figma Make. */
export const arbncoInitialPrototypePreview = {
  src: "/projects/arbnco-synthetic-ai-data/initial-prototype-list-preview.png",
  alt: "Initial prototype showing the project list with a data resolution column and synthetic status tags",
  width: 1024,
  height: 604,
} as const;

export const arbncoReflectionItems = [
  "Complex technical features need simple, trustworthy UI, especially when they change how people read their data.",
  "Clear status tags, labels, and tooltips helped users see what was available, what was missing, and what to do next.",
];
