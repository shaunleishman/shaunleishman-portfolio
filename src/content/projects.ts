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
    title: "OMRON: Patient monitoring",
    tags: ["UI design", "Co-design", "Usability testing", "Interviews"],
    duration: "6 weeks",
    overview:
      "OMRON needed a risk assessment for their hypertension monitoring platform to gauge patient and staff safety. After the platform failed the initial assessment, we worked with their team to conduct interviews and co-design workshops to develop a new direction. We then tested the prototype with users and provided implementation guidance for the new platform.",
    problem:
      "The platform failed a risk assessment due to a high risk of human error when assigning patients a medication plan (titration).",
    role: [
      "Facilitate co-design workshops and produce wireframes and prototypes",
      "Script out the usability testing and write the report",
      "Moderate and note-take during usability testing",
    ],
    approach: [
      "Interviews with practitioners (existing and non-existing users)",
      "Co-design workshop (report findings and create solutions)",
      "Create prototype based on sketches",
      "Conduct usability tests on prototype",
    ],
    approachWhy: [
      "Showing the team a concrete methodology",
      "Making sure that everyone was involved",
      "Helping the product team improve their future decisions",
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
      "Co-designed workshops and prototyped a safer medication assignment flow",
      "Moderated usability testing and documented findings for the product team",
      "Six-week delivery from practitioner interviews through to handoff",
    ],
    nextSteps: [
      "Make the changes to the prototype with the insights gathered from the test",
      "Hand off the designs to the developers and implement the updated prototype",
      "Re-test when the implementation has been completed",
    ],
    limitations: [
      "Scope lacked design system and library consideration",
      "Practical and real-life use of the assignment feature",
    ],
    learnings: [
      "I learnt not to design from assumptions. Healthcare workflows need real practitioner context because roles and responsibilities vary.",
      "I learnt that small usability issues can create big risks. Too many clicks, unclear validation, or hidden information can reduce confidence.",
      "I learnt to think about scalability earlier. Next time, I'd bring design system thinking in sooner to reduce design and technical debt.",
    ],
    featured: true,
    accentColor: "#003da5",
    accentClass: "from-[#003da5] to-[#0055cc]",
    thumbnail: "/projects/omron-patient-monitoring.gif",
  },
  {
    slug: "nhs-111-waiting-times",
    title: "NHS 111: Waiting times",
    tags: ["Interviews", "UX", "Surveys"],
    duration: "4 weeks",
    overview:
      "To improve NHS 111 and ease pressure on A&E, we spoke to recent users to understand their behaviour and needs. Using affinity mapping, we identified key touchpoints, highlighting a strong need for reassurance, clear guidance, and timely support.",
    problem:
      "Many 111 callers were using the service for the wrong type of support. We needed to understand who was calling, why they were unsure about the service, and how the triage journey could guide people to the right help sooner.",
    role: [
      "Manage recruitment and write the survey and interview plan",
      "Moderate interviews with call handlers and people who recently used the service",
      "Design and write the research outcomes and report",
      "Present quantitative and qualitative data to the NHS product team",
    ],
    approach: [
      "30 minute interviews (journey map and personas)",
      "Survey (strengthen the qualitative data)",
      "Thematically analyse data",
      "Create journey maps, personas and full report",
    ],
    approachWhy: [
      "Triangulate sources for better accuracy",
      "Keeping the experience measurable",
      "Help the team gain a deeper understanding of their users",
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
      "Mapped caller journeys through interviews and affinity analysis",
      "Strengthened findings with survey data and thematic analysis",
      "Four-week delivery from recruitment through to research report",
    ],
    nextSteps: [
      "Integrate the outcomes in further team discussions",
      "Make the improvement changes that were suggested",
      "Conduct more research methods to validate changes made",
    ],
    limitations: [
      "Face-to-face styled interviews could have helped the richness of data gathered",
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
      "Energy platform users often only had monthly meter readings, which limited how much detail they could see in their carbon reports. When enough data was available, machine learning could generate more detailed hourly estimates. The design challenge was helping people understand when those estimates were being used, turn the feature on with confidence, and trust what they were seeing.",
    problem:
      "Users needed clearer carbon insights, but low-resolution energy data limited reporting. Generated hourly data could help, only if people understood when it was active and could trust it.",
    role: [
      "Led end-to-end UI/UX for synthetic data visibility, from journey mapping through to final screens",
      "Designed updates across graphs, tables, filters, reports, and results pages",
      "Ran design reviews and aligned engineering on product status patterns, product eligibility logic, and developer handoff specifications",
    ],
    approach: [
      "Mapped where synthetic data would affect the existing user journey",
      "Used established design patterns to move quickly without adding unnecessary complexity",
      "Added clear labels, messages, and controls so users could understand and trust the data",
    ],
    approachWhy: [
      "Used existing design patterns because there was limited time for new research",
      "Focused on known customer needs rather than starting discovery from scratch",
      "Designed around the available machine learning solution for generating synthetic data",
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
      "Redesigned core user flows end-to-end",
      "Updated key platform interfaces",
      "3–4 week delivery from journey mapping to prototype handoff",
    ],
    nextSteps: [
      "Validate designs with users once engineering constraints are confirmed",
      "Extend status patterns to bulk project management flows",
    ],
    limitations: [
      "Limited time for new research, so we used existing patterns",
      "Fixed technical constraints shaped the design",
      "The UI had to clarify eligibility and ineligible cases",
    ],
    learnings: [
      "This project reinforced how important it is to make complex technical systems understandable and trustworthy, especially when they change how people read their data.",
      "Clear product status patterns, labels, tooltips, and visual indicators helped users understand what was available, what was missing, and what to do next.",
    ],
    featured: true,
    accentColor: "#0d7377",
    accentClass: "from-[#0d7377] to-[#14a085]",
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
      "Start by understanding the problem space, business goals, and the people affected. Through interviews, surveys, and stakeholder conversations, the team defines what we're solving and why it matters.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Research is synthesised into clear insights: personas, journey maps, and problem statements, so the team shares a common understanding of user needs and priorities.",
  },
  {
    number: "03",
    title: "Ideate",
    description:
      "Co-design workshops and sketching sessions explore solutions collaboratively, keeping stakeholders involved and surfacing ideas grounded in real context.",
  },
  {
    number: "04",
    title: "Prototype",
    description:
      "Ideas become wireframes and interactive prototypes, with layout, hierarchy, and flow established before visual polish.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "Usability tests capture what works and what creates friction. Findings are documented clearly so teams can act on them quickly.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "Designs are handed off with implementation guidance, then refined based on user behaviour, analytics, and evolving product needs.",
  },
];

export const skills = [
  {
    title: "User research",
    description:
      "Interviews, surveys, and affinity mapping to uncover what users need and why, turning findings into personas, journey maps, and actionable reports.",
    items: ["Interviews", "Surveys", "Affinity mapping", "Personas & journey maps"],
  },
  {
    title: "UI design",
    description:
      "Clean, accessible interfaces with clear hierarchy. From wireframes to high-fidelity screens that developers can implement with confidence.",
    items: ["Wireframing", "Visual design", "Design systems", "Prototyping"],
  },
  {
    title: "Co-design & facilitation",
    description:
      "Workshops that bring stakeholders and users into the design process, ensuring solutions reflect real workflows and build shared ownership.",
    items: ["Co-design workshops", "Stakeholder facilitation", "Sketching sessions", "Design critiques"],
  },
  {
    title: "Usability testing",
    description:
      "Structured testing from script to report. I moderate sessions, capture findings, and translate them into design improvements that reduce risk.",
    items: ["Test scripting", "Moderation", "Reporting", "Iterative refinement"],
  },
];

export const valueProps = [
  {
    title: "Research-led, not assumption-led",
    description:
      "I don't design from guesses. Every decision is grounded in user evidence: interviews, testing, and real workflow context, especially in complex domains like healthcare.",
  },
  {
    title: "Collaborative by default",
    description:
      "Co-design workshops and stakeholder involvement are central to my process. The best solutions emerge when the people closest to the problem help shape them.",
  },
  {
    title: "Outcomes over deliverables",
    description:
      "Personas, journey maps, and reports are only valuable if teams use them. I focus on artefacts that drive decisions, not documents that sit on a shelf.",
  },
  {
    title: "Clear handoffs that reduce rework",
    description:
      "I document what developers and product teams need to know: states, flows, and rationale, so implementation moves faster with fewer surprises.",
  },
];

export const faqs = [
  {
    question: "What kind of roles are you looking for?",
    answer:
      "I'm looking for UX/UI design roles where I can contribute across research, interaction design, and prototyping, ideally in product teams working on meaningful problems in health, sustainability, or public services.",
  },
  {
    question: "What's your typical project involvement?",
    answer:
      "I work end-to-end from discovery through to usability testing and handoff. On recent projects I've facilitated co-design workshops, moderated user tests, and delivered research reports alongside UI designs.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. Based in the UK and comfortable collaborating remotely through regular check-ins, workshops, and async communication.",
  },
  {
    question: "Can I see detailed case studies?",
    answer:
      "Each project on the Work page includes the full case study: problem, approach, findings, and learnings. Happy to discuss any project in more detail.",
  },
];

export const siteConfig = {
  name: "Shaun Leishman",
  brand: "sleishman.design",
  brandHandle: "sleishman",
  logo: "/brand/logo.png",
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
