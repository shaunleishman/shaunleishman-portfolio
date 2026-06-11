export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  duration: string;
  overview: string;
  problem: string;
  role: string[];
  approach: string[];
  approachWhy: string[];
  keyFindings: string[];
  metrics: ProjectMetric[];
  /** Narrative highlights on the home featured card */
  cardHighlights: string[];
  nextSteps: string[];
  limitations: string[];
  learnings: string[];
  featured: boolean;
  accentColor: string;
  accentClass: string;
  thumbnail: string;
};

export const projects: Project[] = [
  {
    slug: "omron-patient-monitoring",
    title: "OMRON - Patient monitoring",
    tags: ["UI design", "Co-design", "Usability testing", "Interviews"],
    duration: "6 weeks",
    overview:
      "The platform failed a patient-safety check. We ran co-design with practitioners, built safer assignment flows, and moderated usability testing before handoff.",
    problem:
      "The platform failed a risk assessment due to a high risk of human error when assigning patients a medication plan (titration).",
    role: [
      "Facilitated co-design workshops and produced wireframes and prototypes from practitioner sketches",
      "Scripted and moderated usability testing, then wrote the findings report for handoff",
      "Translated role-specific clinical workflows into testable assign-and-handover flows",
    ],
    approach: [
      "Interviewed practitioners across primary care roles to understand how each group assigns and monitors patients",
      "Facilitated co-design workshops where practitioners sketched solutions together",
      "Built a clickable prototype from workshop outputs so we could test critical flows in moderated sessions before build",
      "Moderated usability tests on assignment and handover, documenting findings the product team acted on",
    ],
    approachWhy: [
      "Workshops kept practitioners involved. We were not designing assignment logic from guesses alone.",
      "Testing focused on assign-and-handover because that was where the risk assessment failed.",
      "A working prototype gave stakeholders something concrete to align on, not just static screens.",
    ],
    keyFindings: [
      "Unusable without medical records",
      "Every medical practitioner is different",
      "Current systems don't show real-time data",
      "Communication in the systems lacks flexibility",
    ],
    metrics: [
      { value: "6 weeks", label: "End-to-end delivery from research to handoff" },
      { value: "4", label: "Key usability findings addressed in the prototype" },
      { value: "100%", label: "Practitioner involvement through co-design workshops" },
    ],
    cardHighlights: [
      "Ran co-design and built a safer medication assignment flow",
      "Usability testing led to mandatory handover reasons in the prototype",
      "Six weeks from practitioner interviews through to handoff",
    ],
    nextSteps: [
      "Make the changes to the prototype with the insights gathered from the test",
      "Hand off the designs to the developers and implement the updated prototype",
      "Re-test when the implementation has been completed",
    ],
    limitations: [
      "Scope lacked design system and library consideration",
      "Practical and real-life use of the assignment feature was not tested in live clinical systems",
      "Usability sessions used a prototype, so we could not fully test behaviour with real records and integrations",
    ],
    learnings: [
      "I learnt not to design from assumptions. Healthcare workflows need real practitioner context because roles and responsibilities vary.",
      "I learnt that small usability issues can create big risks. Too many clicks, unclear validation, or hidden information can reduce confidence.",
      "I learnt to think about scalability earlier. Next time, I'd bring design system thinking in sooner to reduce design and technical debt.",
    ],
    featured: true,
    accentColor: "#003153",
    accentClass: "from-[#003153] to-[#004266]",
    thumbnail: "/projects/omron-patient-monitoring.gif",
  },
  {
    slug: "nhs-111-waiting-times",
    title: "NHS 111 - Waiting times",
    tags: ["Interviews", "UX", "Surveys"],
    duration: "4 weeks",
    overview:
      "Research lead for the NHS product team. We delivered personas and journey maps to improve routing, reassurance, and wait-time updates.",
    problem:
      "Many 111 callers were using the service for the wrong type of support. The team needed to understand who was calling, why they were unsure, and where the triage journey broke down.",
    role: [
      "Managed recruitment and wrote the survey and interview plan",
      "Moderated interviews with call handlers and recent callers",
      "Synthesised findings into personas, journey maps, and a report we presented to the product team",
    ],
    approach: [
      "Ran 30-minute interviews, then affinity mapping to surface recurring behaviours and needs",
      "Designed a survey to triangulate interview themes with measurable patterns",
      "Created five personas and matching journey maps the NHS team could reuse in product decisions",
    ],
    approachWhy: [
      "Mixed methods made findings harder to ignore. Stories explained the numbers.",
      "Personas and journeys gave the team shared language before solution design.",
      "Phone interviews fit recruitment within a four-week brief.",
    ],
    keyFindings: [
      "Senior citizens often downplayed urgent symptoms, waiting for their GP to open and calling 111 only when they couldn't get through.",
      "Staff are seen as calm and helpful, but long waits, repeating info, and scripted replies are common issues.",
      "People want shorter waits, clearer updates, better-trained staff, and quicker access to the right help.",
    ],
    metrics: [
      { value: "5", label: "Personas created from mixed-method research" },
      { value: "4 weeks", label: "From recruitment to final report delivery" },
      { value: "3", label: "Research methods triangulated for accuracy" },
    ],
    cardHighlights: [
      "Five personas gave the NHS team shared language for caller types",
      "Journey maps highlighted where reassurance and routing broke down",
      "Four-week research engagement from recruitment to final report",
    ],
    nextSteps: [
      "Integrate the outcomes in further team discussions",
      "Make the improvement changes that were suggested",
      "Conduct more research methods to validate changes made",
    ],
    limitations: [
      "Face-to-face styled interviews could have helped the richness of data gathered",
      "Phone-only recruitment within a four-week brief limited how deeply we could explore each caller type",
      "We did not run follow-up research to validate findings before the team moved into solution design",
    ],
    learnings: [
      "I learnt the value of mixing data types. Quantitative data showed what was happening, while interviews helped explain why it was happening.",
      "I learnt that research methods affect the depth of insight. Phone interviews were useful, but face-to-face sessions would have helped capture emotion, behaviour and trust more clearly.",
      "I learnt to turn research into practical tools. Personas, journey maps and reports helped the NHS team use the findings in future decisions, not just read them once and shelve them.",
    ],
    featured: true,
    accentColor: "#005eb8",
    accentClass: "from-[#005eb8] to-[#41b6e6]",
    thumbnail: "/projects/nhs-111-waiting-times.gif",
  },
  {
    slug: "arbnco-synthetic-ai-data",
    title: "Arbnco - Synthetic Data Switch",
    tags: ["UI design", "Service Design", "Product Design"],
    duration: "3–4 weeks",
    overview:
      "As solo design lead, I redesigned core flows so energy teams could enable and trust ML-generated hourly carbon estimates.",
    problem:
      "Users needed clearer carbon insights, but monthly meter readings limited reporting. Generated hourly data could help only if people understood when it was on and could trust it.",
    role: [
      "Led end-to-end UI/UX for synthetic data visibility, from journey mapping through to final screens",
      "Designed updates across graphs, tables, filters, reports, and results pages",
      "Ran design reviews and aligned engineering on status patterns, eligibility logic, and handoff specs",
    ],
    approach: [
      "Mapped where synthetic data affected the existing journey before moving into screens",
      "Used established patterns to move quickly, adding plain-language labels where users needed reassurance",
      "Prioritised project list and settings flows because that is where users decided whether to trust generated data",
    ],
    approachWhy: [
      "No time for new research. We worked from known customer needs and existing patterns.",
      "Eligibility rules were complex. Status tags and tooltips showed missing data early.",
      "Design reviews with PM and engineering kept handoff aligned without me owning backend decisions.",
    ],
    keyFindings: [
      "Users need to know when generated data is being used, not just that a toggle exists",
      "Original low-frequency readings still need to feel accessible and reliable alongside generated data",
      "Plain-language messaging matters: explain the feature without making it feel technical or alarming",
    ],
    metrics: [
      { value: "4", label: "Core user flow stages redesigned end-to-end" },
      { value: "3–4 weeks", label: "From journey mapping to prototype handoff" },
      { value: "6+", label: "UI surfaces updated across the platform" },
    ],
    cardHighlights: [
      "Design lead on a team sprint. Journey map to implementation in 3–4 weeks.",
      "Made eligibility and active state visible across six platform surfaces.",
      "Aligned engineering on status patterns that cut handoff back-and-forth.",
    ],
    nextSteps: [
      "Validate designs with users once engineering constraints are confirmed",
      "Extend status patterns to bulk project management flows",
    ],
    limitations: [
      "No time for new user research. I relied on existing journey knowledge and design-review feedback.",
      "Fixed technical limits shaped what could ship in the sprint window.",
      "The platform structure predated this sprint. I couldn't redesign where features lived, so eligibility had to be explained within the existing layout.",
    ],
    learnings: [
      "Complex technical features need simple, trustworthy UI, especially when they change how people read their data.",
      "Clear status tags, labels, tooltips, and icons helped users see what was available, what was missing, and what to do next.",
    ],
    featured: true,
    accentColor: "#00a7b5",
    accentClass: "from-[#00a7b5] to-[#088391]",
    thumbnail: "/projects/arbnco-synthetic-ai-data.gif",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the problem, business goals, and the people affected. Interviews, surveys, and stakeholder chats define what we are solving and why it matters.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Turn research into clear insights: personas, journey maps, and problem statements so the team shares the same view of user needs.",
  },
  {
    number: "03",
    title: "Ideate",
    description:
      "Co-design workshops and sketching explore solutions together, keeping stakeholders involved and ideas grounded in real context.",
  },
  {
    number: "04",
    title: "Prototype",
    description:
      "Turn ideas into wireframes and clickable prototypes. Layout, hierarchy, and flow come before visual polish.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "Usability tests show what works and what creates friction. Findings are documented so teams can act on them quickly.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "Hand off designs with clear guidance, then refine based on user behaviour, analytics, and product needs.",
  },
];

export const skills = [
  {
    title: "User research",
    description:
      "Interviews, surveys, and affinity mapping to learn what users need. Findings become personas, journey maps, and clear reports.",
    items: ["Interviews", "Surveys", "Affinity mapping", "Personas & journey maps"],
  },
  {
    title: "UI design",
    description:
      "Clean, accessible interfaces with clear hierarchy. From wireframes to high-fidelity screens developers can build from.",
    items: ["Wireframing", "Visual design", "Design systems", "Prototyping"],
  },
  {
    title: "Co-design & facilitation",
    description:
      "Workshops that bring stakeholders and users into the process, so solutions match real workflows.",
    items: ["Co-design workshops", "Stakeholder facilitation", "Sketching sessions", "Design critiques"],
  },
  {
    title: "Usability testing",
    description:
      "Structured testing from script to report. I run sessions, capture findings, and turn them into design improvements.",
    items: ["Test scripting", "Moderation", "Reporting", "Iterative refinement"],
  },
];

export const valueProps = [
  {
    title: "Research-led, not guess-led",
    description:
      "I do not design from guesses. Decisions come from user evidence: interviews, testing, and real workflow context, especially in healthcare.",
  },
  {
    title: "Collaborative by default",
    description:
      "Co-design workshops and stakeholder input are central to my process. The best solutions come when the people closest to the problem help shape them.",
  },
  {
    title: "Outcomes over deliverables",
    description:
      "Personas, journey maps, and reports only matter if teams use them. I focus on artefacts that drive decisions, not documents that sit on a shelf.",
  },
  {
    title: "Clear handoffs that cut rework",
    description:
      "I document what developers and product teams need: states, flows, and rationale, so implementation moves faster with fewer surprises.",
  },
];

export const faqs = [
  {
    question: "What kind of roles are you looking for?",
    answer:
      "UX/UI design roles where I can work across research, interaction design, and prototyping. I enjoy product teams working on health, sustainability, or public services.",
  },
  {
    question: "What's your typical project involvement?",
    answer:
      "I work from discovery through testing and handoff. Recent projects include co-design workshops, usability tests, and research reports alongside UI design.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I'm based in the UK and happy to work remotely with regular check-ins, workshops, and async updates.",
  },
  {
    question: "Can I see detailed case studies?",
    answer:
      "Each project on the Work page has the full case study: problem, approach, findings, and learnings. Happy to talk through any of them.",
  },
];

export const siteConfig = {
  name: "Shaun Leishman",
  brand: "sleishman.design",
  brandHandle: "sleishman",
  logo: "/brand/logo.png",
  logoDark: "/brand/logo-dark.png",
  domain: "shaunleishmanportfolio.com",
  siteUrl: "https://www.shaunleishmanportfolio.com",
  tagline: "UX/UI designer helping teams build products users trust.",
  quote:
    "It's one thing shaping experiences that improve lives, but to encourage better decision-making is where the true magic happens.",
  email: "postalshaun@outlook.com",
  phone: "07708002642",
  linkedIn: "https://www.linkedin.com/in/shaun-leishman-94a46b130/",
  cvUrl: "/cv",
  experience: "5+ years",
};
