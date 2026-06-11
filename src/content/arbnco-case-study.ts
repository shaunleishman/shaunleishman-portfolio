/** Recruiter-optimised content for the Arbnco case study */

export const arbncoCaseStudyMeta = {
  outcomeLine:
    "Clearer paths to trust and turn on synthetic hourly energy data across the platform.",
  problemStatement:
    "Teams needed hourly carbon data. Most meters only reported once a month.",
};

export const arbncoAtAGlance = {
  summary:
    "Design lead on a team sprint. Goal, team, and our work below.",
  productGoal:
    "Help energy teams get hourly carbon insights from machine-learning estimates they could understand and trust.",
  team:
    "We worked as a squad with a product manager and engineers. They handled what was technically possible. I led the experience design and handoff.",
  problem:
    "Users could not get hourly carbon data without enough meter readings. Generated data could help, but only if the UI made rules, status, and trust easy to see.",
  contribution:
    "I led the UI/UX. We mapped the journey, built wireframes and a prototype, ran design reviews, and handed off to engineering. We turned product rules into flows, status patterns, and specs the squad could build.",
  highlights: [
    "Eligibility visible before users turn data on",
    "One status pattern PM and engineering shared",
    "Journey map to implementation in 3–4 weeks",
  ],
  methods: ["Service design", "Journey mapping", "UI design", "Prototyping", "Design reviews"],
};

export const arbncoSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
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
  lead: "This was a team sprint. Below we split what we did together from what I led.",
  impact:
    "Our journey map helped the team agree where users needed clarity before anyone opened Figma. That cut rework when eligibility rules changed late in the sprint.",
};

export const arbncoTeamTogetherItems = [
  "The PM and engineering set the ML rules, sprint scope, and what could ship.",
  "In design reviews we shared flows and our reasoning. The squad challenged ideas and agreed which screens to do first.",
];

export const arbncoRoleItems = [
  "We mapped where synthetic data fit in the journey, then focused on the project list and settings. That is where users decide if they trust the feature.",
  "We updated graphs, tables, filters, and reports. We used plain labels instead of ML jargon because review feedback showed users needed reassurance.",
  "We ran design reviews and wrote handoff specs for eligibility logic and status tags so engineering could use one pattern everywhere.",
];

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
  alt: "Initial prototype — project list with data resolution column and synthetic status tags",
  width: 1024,
  height: 604,
} as const;

export const arbncoReflectionItems = [
  "Complex technical features need simple, trustworthy UI, especially when they change how people read their data.",
  "Clear status tags, labels, tooltips, and icons helped users see what was available, what was missing, and what to do next.",
];
