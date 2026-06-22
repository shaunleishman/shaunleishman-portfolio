/** Recruiter-optimised content for the OMRON case study */

export const omronCaseStudyMeta = {
  outcomeLine:
    "Safer monitoring and handover flows after the platform failed its medication titration risk assessment.",
  problemStatement:
    "The hypertension platform failed a risk assessment because practitioners could assign the wrong medication plan to the wrong patient.",
};

export const omronAtAGlance = {
  summary: "OMRON brought me in to co-design a safer monitoring platform.",
  productGoal:
    "Make hypertension monitoring and medication titration safe enough to pass clinical risk assessments.",
  team:
    "I co-designed with OMRON's product team, a service designer, a product manager, and a consultant doctor who gave us the clinical expertise.",
  problem:
    "Assigning medication titration carried real medical risk. A single mistake could put a patient on the wrong medication and harm their health.",
  contribution:
    "I ran the co-design workshops and turned our sketches into wireframes and a clickable prototype. Then I scripted and moderated the usability tests that shaped the final flows.",
  highlights: [
    "Workshop sketches fed straight into wireframes",
    "Prototype aligned the team before build",
    "Four critical issues found in usability testing",
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
  lead: "The product team and I shaped the direction together. Here is what I led after.",
  impact:
    "Persona boards from research helped us design for five different roles. Then we turned that into a prototype the team could test.",
};

export const omronTeamTogetherItems = [
  "The product team and I co-designed the assignment and monitoring flows in workshops we ran together.",
  "The product team scoped the risk-assessment fix and joined usability sessions to hear findings firsthand.",
];

export const omronRoleItems = [
  "We ran the co-design workshops and turned our sketches into wireframes, keeping role-specific assignment logic visible early.",
  "We built a clickable prototype from workshop outputs so the team could test assign-and-handover flows before development.",
  "We scripted usability sessions, moderated the tests, and wrote the findings report.",
];

export const omronProjectTimeline = {
  totalWeeks: 10,
  lead: "Where I led work vs where the wider team ran discovery before I joined.",
  intro:
    "Six weeks from risk assessment through to handoff. I led the early testing and everything from co-design onward, while the wider team ran practitioner discovery interviews.",
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
        { label: "Running the workshops", startWeek: 6.4, endWeek: 6.55, involved: true, detail: "Facilitated the team sketching the safer flows." },
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
  "We ran workshops to share the interview findings and sketch solutions as a team",
  "We mapped how five primary care roles assign and monitor patients differently",
];

export const omronTestingFindings = [
  {
    title: "Medical records dependency",
    text: "Practitioners could not safely assign titration plans without full clinical records. We flagged it in testing as a blocker before handoff.",
  },
  {
    title: "Role-specific workflows",
    text: "Each practitioner group worked differently, so we avoided a one-size-fits-all flow and tested versions that matched each role.",
  },
  {
    title: "Stale monitoring data",
    text: "Dashboards did not always show live readings, so practitioners lost confidence making titration decisions. We documented it for the product team.",
  },
  {
    title: "Inflexible handover",
    text: "Transferring patients between practitioners needed clearer notes. After testing showed silent handovers created risk, we added a mandatory reason field.",
  },
];

export const omronReflectionItems = [
  "Healthcare workflows cannot be designed from guesses. Roles, responsibilities, and escalation paths vary more than generic SaaS patterns allow.",
  "Small usability issues create big clinical risk. Extra clicks, hidden validation, or missing context directly affect patient safety.",
  "Bringing design system thinking in earlier would have reduced rework when scaling action-card patterns across the platform.",
];
