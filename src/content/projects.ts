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
  nextSteps: string[];
  limitations: string[];
  learnings: string[];
  featured: boolean;
  accentColor: string;
  accentClass: string;
};

export const projects: Project[] = [
  {
    slug: "omron-patient-monitoring",
    title: "OMRON — Patient monitoring",
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
  },
  {
    slug: "nhs-111-waiting-times",
    title: "NHS 111 — Waiting times",
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
  },
  {
    slug: "arbnco-synthetic-ai-data",
    title: "Arbnco — Synthetic AI data switch",
    tags: ["UI design", "Service Design", "Product Design"],
    duration: "3–4 weeks",
    overview:
      "This project was about helping users work with synthetic data in a clearer way. When a project had enough mixed energy data, the platform could create synthetic hourly data to give users more detailed results. My role was to make this easy to understand, so users could see when synthetic data was being used, what it meant, and what they needed to do next.",
    problem:
      "Customers needed more granular insights for making the best next step in their carbon offsetting journey.",
    role: [
      "Helped make synthetic data clear and easy to understand",
      "Designed updates across graphs, tables, filters, reports, and results pages",
      "Made sure users could trust the data and switch views when needed",
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
      "Users needed to know when synthetic data was being used",
      "The original low frequency data still needed to feel accessible and reliable",
      "Messaging had to be clear without making the feature feel overly technical or alarming",
    ],
    metrics: [
      { value: "4", label: "Core user flow stages redesigned end-to-end" },
      { value: "3–4 weeks", label: "From journey mapping to prototype handoff" },
      { value: "6+", label: "UI surfaces updated across the platform" },
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
      "I learnt that complex technical features need to be explained in a simple way, especially when they affect how users understand and trust the data.",
      "I learnt that clear status states, labels, tooltips, and visual indicators help users understand what is available, what is missing, and what they need to do next.",
      "I learnt that design decisions are often shaped by real constraints, so I will take a more practical, trust-focused approach into the next project.",
    ],
    featured: true,
    accentColor: "#0d7377",
    accentClass: "from-[#0d7377] to-[#14a085]",
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
      "I start by understanding the problem space, business goals, and the people affected. Through interviews, surveys, and stakeholder conversations, I define what we're solving and why it matters.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "I synthesise research into clear insights — personas, journey maps, and problem statements — so the team shares a common understanding of user needs and priorities.",
  },
  {
    number: "03",
    title: "Ideate",
    description:
      "I facilitate co-design workshops and sketching sessions to explore solutions collaboratively. This keeps stakeholders involved and surfaces ideas grounded in real context.",
  },
  {
    number: "04",
    title: "Prototype",
    description:
      "I translate ideas into wireframes and interactive prototypes, focusing on layout, hierarchy, and flow before adding visual polish.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "I plan and run usability tests, capturing what works and what creates friction. Findings are documented clearly so teams can act on them quickly.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "I hand off designs with implementation guidance and support iteration based on user behaviour, analytics, and evolving product needs.",
  },
];

export const skills = [
  {
    title: "User research",
    description:
      "Interviews, surveys, and affinity mapping to uncover what users need and why — turning findings into personas, journey maps, and actionable reports.",
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
      "I don't design from guesses. Every decision is grounded in user evidence — interviews, testing, and real workflow context — especially in complex domains like healthcare.",
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
      "I document what developers and product teams need to know — states, flows, and rationale — so implementation moves faster with fewer surprises.",
  },
];

export const faqs = [
  {
    question: "What kind of roles are you looking for?",
    answer:
      "I'm looking for UX/UI design roles where I can contribute across research, interaction design, and prototyping — ideally in product teams working on meaningful problems in health, sustainability, or public services.",
  },
  {
    question: "What's your typical project involvement?",
    answer:
      "I work end-to-end from discovery through to usability testing and handoff. On recent projects I've facilitated co-design workshops, moderated user tests, and delivered research reports alongside UI designs.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I'm based in the UK and comfortable collaborating remotely with async communication, regular check-ins, and workshop sessions over video.",
  },
  {
    question: "Can I see detailed case studies?",
    answer:
      "Each project on the Work page includes the full case study — problem, approach, findings, and learnings. I'm happy to walk through any project in more detail during an interview.",
  },
];

export const companies = ["OMRON", "NHS", "Arbnco"];

export const siteConfig = {
  name: "Shaun Leishman",
  domain: "shaunleishman.design",
  tagline:
    "UX/UI designer helping teams build products users trust through research-led design.",
  quote:
    "It's one thing shaping experiences that improve lives, but to encourage better decision making is where the true magic happens.",
  email: "hello@shaunleishman.com",
  linkedIn: "https://www.linkedin.com/in/shaunleishman",
  cvUrl: "#",
  experience: "3+ years",
};
