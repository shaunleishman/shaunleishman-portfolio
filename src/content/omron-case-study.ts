/** Recruiter-optimised content for the OMRON case study */

export const omronCaseStudyMeta = {
  outcomeLine:
    "Safer monitoring and handover flows after the platform failed its medication titration risk assessment.",
  problemStatement:
    "The hypertension monitoring platform failed a risk assessment because practitioners could assign the wrong medication plan to the wrong patient. Small UI gaps (missing records, stale data, unclear handovers) created outsized clinical risk.",
};

export const omronAtAGlance = {
  summary:
    "A quick overview of the problem, my contribution, and how the work was delivered. The sections below go into more detail.",
  problem:
    "Medication titration assignment was error-prone without full patient context, role-specific workflows, or clear handover when reassigning patients between practitioners.",
  contribution:
    "Facilitated co-design workshops, translated sketches into a prototype, moderated usability testing, and delivered implementation guidance for the product team.",
  highlights: [
    "Co-design with GPs, nurses, pharmacists, and admin staff",
    "Prototype tested on critical assign-and-handover flows",
    "Six-week delivery from interviews through to handoff",
  ],
  methods: [
    "Interviews",
    "Co-design workshops",
    "Wireframing",
    "Prototyping",
    "Usability testing",
  ],
};

export const omronSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "co-design", label: "Co-design" },
  { id: "iteration", label: "Iteration" },
  { id: "usability-testing", label: "Testing" },
  { id: "refined-solution", label: "Solution" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type OmronSectionId = (typeof omronSectionNav)[number]["id"];

export function omronSectionTitle(id: OmronSectionId): string {
  return omronSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const omronRoleItems = [
  "Facilitated co-design workshops and produced wireframes and prototypes",
  "Scripted usability testing sessions and wrote the findings report",
  "Moderated and note-took during practitioner usability tests",
];

export const omronCoDesignItems = [
  "Interviewed existing and prospective OMRON VISO users across primary care roles",
  "Ran workshops to report interview findings and sketch solutions together",
  "Mapped how GPs, nurse practitioners, pharmacists, practice nurses, and admin staff assign and monitor patients differently",
];

export const omronTestingFindings = [
  {
    title: "Medical records dependency",
    text: "Practitioners could not safely assign titration plans without full clinical record context in the platform.",
  },
  {
    title: "Role-specific workflows",
    text: "Each practitioner group worked differently, so a single assignment flow could not fit every role.",
  },
  {
    title: "Stale monitoring data",
    text: "Dashboards did not always reflect live readings, reducing confidence when making titration decisions.",
  },
  {
    title: "Inflexible handover",
    text: "Transferring patients between practitioners needed clearer notes, so we added a mandatory reason field to reduce error risk.",
  },
];

export const omronReflectionItems = [
  "Healthcare workflows cannot be designed from assumptions. Roles, responsibilities, and escalation paths vary more than generic SaaS patterns allow for.",
  "Small usability issues create large clinical risk: extra clicks, hidden validation, or missing context directly affect patient safety.",
  "Bringing design system thinking in earlier would have reduced rework when scaling the action-card patterns across the platform.",
];
