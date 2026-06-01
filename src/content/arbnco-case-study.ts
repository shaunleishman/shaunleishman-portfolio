/** Recruiter-optimised content for the Arbnco case study */

export const arbncoCaseStudyMeta = {
  outcomeLine:
    "Helped users understand, activate, and trust machine-generated energy data across the platform in under 4 weeks.",
  problemStatement:
    "Energy platform users needed hourly carbon insights, but monthly meter readings limited how much detail they could see. Machine learning could generate hourly estimates when enough data existed, but only if people understood when and why those estimates were being used.",
};

export const arbncoAtAGlance = {
  summary:
    "A quick overview of the problem, my contribution, and how the work was delivered. The sections below go into more detail.",
  problem:
    "Users could not access hourly carbon data without enough mixed-frequency readings. Generated data could help, but only if the UI made eligibility, status, and trust crystal clear.",
  contribution:
    "End-to-end UI/UX from journey mapping through prototyping, design reviews, and developer handoff, as the solo design lead in a cross-functional product team.",
  highlights: [
    "Redesigned core user flows end-to-end",
    "Updated key platform interfaces",
    "3–4 week delivery from journey mapping to prototype handoff",
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
  { id: "reflection", label: "Reflection" },
] as const;

export type ArbncoSectionId = (typeof arbncoSectionNav)[number]["id"];

export function arbncoSectionTitle(id: ArbncoSectionId): string {
  return arbncoSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const arbncoRoleItems = [
  "Owned UI/UX for synthetic data visibility from journey map through to final screens",
  "Designed updates across graphs, tables, filters, reports, and results pages",
  "Ran design reviews and aligned engineering on product status patterns, product eligibility logic, and developer handoff specifications",
];

export const arbncoReflectionItems = [
  "This project reinforced how important it is to make complex technical systems understandable and trustworthy, especially when they change how people read their data.",
  "Clear product status patterns, labels, tooltips, and visual indicators helped users understand what was available, what was missing, and what to do next.",
];
