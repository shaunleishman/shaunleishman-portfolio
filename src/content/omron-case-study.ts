/** Recruiter-optimised content for the OMRON case study */

export const omronCaseStudyMeta = {
  outcomeLine:
    "Safer monitoring and handover flows after the platform failed its medication titration risk assessment.",
  problemStatement:
    "The hypertension platform failed a risk assessment because practitioners could assign the wrong medication plan to the wrong patient. Small UI gaps (missing records, stale data, unclear handovers) created serious clinical risk.",
};

export const omronAtAGlance = {
  summary: "Practitioners co-designed with the product team on a patient-safety fix.",
  productGoal:
    "Make hypertension monitoring and medication titration assignment safe enough to pass a clinical risk assessment.",
  team:
    "Worked with OMRON's product team and clinical stakeholders. Practitioners co-designed in workshops, which I facilitated and turned into design decisions.",
  problem:
    "Assigning medication titration was error-prone without full patient context, role-specific workflows, or clear handover when patients moved between practitioners.",
  contribution:
    "I ran the co-design workshops, built wireframes and a clickable prototype, then scripted and moderated the usability tests that shaped the final flows.",
  highlights: [
    "Workshop sketches fed straight into wireframes",
    "Four critical issues found in usability testing",
    "Prototype aligned the team before build",
  ],
  methods: [
    { label: "Interviews", percent: 15 },
    { label: "Co-design workshops", percent: 25 },
    { label: "Wireframing", percent: 20 },
    { label: "Prototyping", percent: 20 },
    { label: "Usability testing", percent: 20 },
  ],
};

export const omronSectionNav = [
  { id: "at-a-glance", label: "Summary" },
  { id: "the-challenge", label: "Challenge" },
  { id: "my-role", label: "My role" },
  { id: "timeline", label: "Timeline" },
  { id: "co-design", label: "Co-design" },
  { id: "build-and-test", label: "Build & test" },
  { id: "refined-solution", label: "Solution" },
  { id: "limitations", label: "Limitations" },
  { id: "key-takeaways", label: "Takeaways" },
] as const;

export type OmronSectionId = (typeof omronSectionNav)[number]["id"];

export function omronSectionTitle(id: OmronSectionId): string {
  return omronSectionNav.find((item) => item.id === id)?.label ?? id;
}

export const omronMyRole = {
  lead: "Practitioners and product team shaped direction together. Below: in the room vs what I led after.",
  impact:
    "Persona boards and workshop outputs helped five role groups align on how they assign and monitor patients. Then we turned that into a prototype the team could test.",
};

export const omronTeamTogetherItems = [
  "Practitioners co-designed assignment and monitoring flows in workshops we ran together. They sketched solutions. We captured constraints and turned them into design.",
  "The product team scoped the risk-assessment fix and joined usability sessions to hear findings firsthand.",
];

export const omronRoleItems = [
  "We ran co-design workshops and turned practitioner sketches into wireframes, keeping role-specific assignment logic visible early.",
  "We built a clickable prototype from workshop outputs so the team could test assign-and-handover flows before development.",
  "We scripted usability sessions, moderated tests, and wrote the findings report, including mandatory handover reasons after practitioners struggled with silent transfers.",
];

export const omronProjectTimeline = {
  totalWeeks: 10,
  lead: "Where I led work vs where the wider team ran discovery before I joined.",
  intro:
    "Six weeks from risk assessment through to handoff. I led the early testing and everything from co-design onward; the wider team ran practitioner discovery interviews.",
  phases: [
    {
      label: "Risk assessment",
      tasks: [
        { label: "Recruitment", startWeek: 1, endWeek: 3, involved: true, detail: "Lined up practitioners to test the at-risk flows." },
        { label: "Study prep", startWeek: 1, endWeek: 3, involved: true, detail: "Wrote the test script and scenarios for the sessions." },
        { label: "Moderated sessions", startWeek: 3, endWeek: 3.55, involved: true, detail: "Ran moderated sessions on the medication assignment flow." },
        { label: "Findings report", startWeek: 3.45, endWeek: 3.65, involved: true, detail: "Wrote up the critical safety issues we found." },
      ],
    },
    {
      label: "Discovery",
      tasks: [
        { label: "Interview prep", startWeek: 3.65, endWeek: 5.65, involved: false, detail: "Wider team prepared the discovery interview guide." },
        { label: "Recruitment", startWeek: 3.65, endWeek: 5.65, involved: false, detail: "Wider team recruited practitioners for discovery." },
        { label: "Practitioner interviews", startWeek: 5.65, endWeek: 6.2, involved: false, detail: "Wider team interviewed practitioners about their workflows." },
        { label: "Research report", startWeek: 6.1, endWeek: 6.35, involved: false, detail: "Wider team wrote up the discovery findings." },
        { label: "Reading research reports", startWeek: 6.28, endWeek: 6.35, involved: true, detail: "I read their reports to ground my design work." },
      ],
    },
    {
      label: "Co-design",
      tasks: [
        { label: "Workshop prep", startWeek: 5.3, endWeek: 6.4, involved: true, detail: "Planned the activities and materials for the workshops." },
        { label: "Running the workshops", startWeek: 6.4, endWeek: 6.55, involved: true, detail: "Facilitated practitioners sketching the safer flows." },
        { label: "Prototyping", startWeek: 6.75, endWeek: 7, involved: true, detail: "Turned workshop sketches into a clickable prototype." },
      ],
    },
    {
      label: "Usability testing",
      tasks: [
        { label: "Recruitment", startWeek: 7, endWeek: 9, involved: true, detail: "Recruited practitioners for the validation round." },
        { label: "Study prep", startWeek: 7, endWeek: 9, involved: true, detail: "Scripted tasks to test the revised flows." },
        { label: "Moderated sessions", startWeek: 9, endWeek: 9.55, involved: true, detail: "Moderated testing on the updated prototype." },
        { label: "Findings report", startWeek: 9.45, endWeek: 9.65, involved: true, detail: "Documented the fixes needed before handoff." },
        { label: "Prototype iteration", startWeek: 9.58, endWeek: 9.75, involved: true, detail: "Refined the prototype against test feedback." },
      ],
    },
  ],
} as const;

export const omronCoDesignItems = [
  "We interviewed existing and prospective OMRON VISO users across primary care roles",
  "We ran workshops to share interview findings and sketch solutions with practitioners",
  "We mapped how GPs, nurse practitioners, pharmacists, practice nurses, and admin staff assign and monitor patients differently",
];

export const omronTestingFindings = [
  {
    title: "Medical records dependency",
    text: "Practitioners could not safely assign titration plans without full clinical records. We flagged this in testing and raised it as a blocker before handoff.",
  },
  {
    title: "Role-specific workflows",
    text: "Each practitioner group worked differently, so we avoided a one-size-fits-all flow and tested versions that matched each role.",
  },
  {
    title: "Stale monitoring data",
    text: "Dashboards did not always show live readings. Testing showed practitioners lost confidence making titration decisions. We documented this for the product team.",
  },
  {
    title: "Inflexible handover",
    text: "Transferring patients between practitioners needed clearer notes. We added a mandatory reason field in the prototype after testing showed silent handovers created error risk.",
  },
];

export const omronReflectionItems = [
  "Healthcare workflows cannot be designed from guesses. Roles, responsibilities, and escalation paths vary more than generic SaaS patterns allow.",
  "Small usability issues create big clinical risk. Extra clicks, hidden validation, or missing context directly affect patient safety.",
  "Bringing design system thinking in earlier would have reduced rework when scaling action-card patterns across the platform.",
];
