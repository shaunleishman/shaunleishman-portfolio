/** Recruiter-optimised content for the Arbnco case study */

export const arbncoCaseStudyMeta = {
  outcomeLine:
    "Clearer paths to trust and turn on synthetic hourly energy data across the platform.",
  problemStatement:
    "Teams needed hourly carbon data. Most meters only reported once a month.",
};

export const arbncoAtAGlance = {
  summary:
    "A team sprint where I was the only designer. Below you can see the goal, who was involved, and what I did myself.",
  productGoal:
    "Help energy teams get hourly carbon insights from machine-learning estimates they could understand and trust.",
  team:
    "I worked with a product manager and engineers. They handled what was technically possible. I owned the experience design and handoff.",
  problem:
    "Users could not get hourly carbon data without enough meter readings. Generated data could help, but only if the UI made rules, status, and trust easy to see.",
  contribution:
    "I owned the full UI/UX: journey map, wireframes, prototype, design reviews, and developer handoff. I turned product rules into flows, status patterns, and specs engineering could build.",
  highlights: [
    "Showed eligibility and active state before users turned on generated data",
    "Got PM and engineering aligned on status patterns for a smoother handoff",
    "Delivered journey map to prototype in 3–4 weeks within fixed technical limits",
  ],
  methods: ["Service design", "Journey mapping", "UI design", "Prototyping", "Design reviews"],
};

export const arbncoSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "considerations", label: "Considerations" },
  { id: "iteration", label: "Iteration" },
  { id: "design-review", label: "Design review" },
  { id: "refined-solution", label: "Refined solution" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type ArbncoSectionId = (typeof arbncoSectionNav)[number]["id"];

export function arbncoSectionTitle(id: ArbncoSectionId): string {
  return arbncoSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const arbncoMyRole = {
  lead: "This was a team sprint. Below I split what we did together from what I owned myself.",
  impact:
    "My journey map helped the team agree where users needed clarity before anyone opened Figma. That cut rework when eligibility rules changed late in the sprint.",
};

export const arbncoTeamTogetherItems = [
  "The PM and engineering set the ML rules, sprint scope, and what could ship.",
  "In design reviews I shared flows and my reasoning. The squad challenged ideas and agreed which screens to do first.",
];

export const arbncoRoleItems = [
  "I mapped where synthetic data fit in the journey, then focused on the project list and settings. That is where users decide if they trust the feature.",
  "I updated graphs, tables, filters, and reports. I used plain labels instead of ML jargon because review feedback showed users needed reassurance.",
  "I ran design reviews and wrote handoff specs for eligibility logic and status tags so engineering could use one pattern everywhere.",
];

export const arbncoReflectionItems = [
  "Complex technical features need simple, trustworthy UI, especially when they change how people read their data.",
  "Clear status tags, labels, tooltips, and icons helped users see what was available, what was missing, and what to do next.",
];
