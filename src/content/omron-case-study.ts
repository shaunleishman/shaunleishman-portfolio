/** Recruiter-optimised content for the OMRON case study */

export const omronCaseStudyMeta = {
  outcomeLine:
    "Safer monitoring and handover flows after the platform failed its medication titration risk assessment.",
  problemStatement:
    "The hypertension platform failed a risk assessment because practitioners could assign the wrong medication plan to the wrong patient. Small UI gaps (missing records, stale data, unclear handovers) created serious clinical risk.",
};

export const omronAtAGlance = {
  summary:
    "A healthcare project where practitioners co-designed with the product team. Below: the safety problem, who was involved, and what I delivered.",
  productGoal:
    "Make hypertension monitoring and medication titration assignment safe enough to pass a clinical risk assessment.",
  team:
    "I worked with OMRON's product team and clinical stakeholders. Practitioners co-designed in workshops. I facilitated sessions, turned insights into wireframes and a prototype, and ran usability testing.",
  problem:
    "Assigning medication titration was error-prone without full patient context, role-specific workflows, or clear handover when patients moved between practitioners.",
  contribution:
    "I ran co-design workshops, built wireframes and a clickable prototype, scripted and moderated usability tests, and wrote the findings report. Practitioners shaped clinical needs. I turned those into testable flows and documented what had to change for handoff.",
  highlights: [
    "Workshop sketches went straight into wireframes, not a separate report that got shelved",
    "Usability testing found four critical issues, including mandatory handover reasons",
    "The prototype gave the product team something concrete to align on before build",
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

export const omronMyRole = {
  lead: "Practitioners and the product team shaped clinical direction together. Below: what we did in the room, and what I owned after workshops.",
  impact:
    "Persona boards and workshop outputs helped five role groups align on how they assign and monitor patients. Then I turned that into a prototype the team could test.",
};

export const omronTeamTogetherItems = [
  "Practitioners co-designed assignment and monitoring flows in workshops I ran. They sketched solutions. I captured constraints and turned them into design.",
  "The product team scoped the risk-assessment fix and joined usability sessions to hear findings firsthand.",
];

export const omronRoleItems = [
  "I ran co-design workshops and turned practitioner sketches into wireframes, keeping role-specific assignment logic visible early.",
  "I built a clickable prototype from workshop outputs so the team could test assign-and-handover flows before development.",
  "I scripted usability sessions, moderated tests, and wrote the findings report, including mandatory handover reasons after practitioners struggled with silent transfers.",
];

export const omronCoDesignItems = [
  "I interviewed existing and prospective OMRON VISO users across primary care roles",
  "I ran workshops to share interview findings and sketch solutions with practitioners",
  "I mapped how GPs, nurse practitioners, pharmacists, practice nurses, and admin staff assign and monitor patients differently",
];

export const omronTestingFindings = [
  {
    title: "Medical records dependency",
    text: "Practitioners could not safely assign titration plans without full clinical records. I flagged this in testing and raised it as a blocker before handoff.",
  },
  {
    title: "Role-specific workflows",
    text: "Each practitioner group worked differently, so I avoided a one-size-fits-all flow and tested versions that matched each role.",
  },
  {
    title: "Stale monitoring data",
    text: "Dashboards did not always show live readings. Testing showed practitioners lost confidence making titration decisions. I documented this for the product team.",
  },
  {
    title: "Inflexible handover",
    text: "Transferring patients between practitioners needed clearer notes. I added a mandatory reason field in the prototype after testing showed silent handovers created error risk.",
  },
];

export const omronReflectionItems = [
  "Healthcare workflows cannot be designed from guesses. Roles, responsibilities, and escalation paths vary more than generic SaaS patterns allow.",
  "Small usability issues create big clinical risk. Extra clicks, hidden validation, or missing context directly affect patient safety.",
  "Bringing design system thinking in earlier would have reduced rework when scaling action-card patterns across the platform.",
];
