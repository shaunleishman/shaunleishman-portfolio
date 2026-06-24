import { siteConfig } from "@/content/projects";

type CvExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  /** Optional aside shown below the role, e.g. to explain a gap or career change. */
  note?: string;
};

export const cvContent = {
  headline: "UX/UI Designer · Edinburgh",
  summary: [
    "I'm a UX/UI Designer with over 5 years' experience helping teams make complex digital products clearer, more usable, and easier to deliver. I've worked across healthcare, SaaS, energy, government, and financial services, often in environments where the subject matter is technical, regulated, or difficult to explain.",
    "My work spans UX strategy, research, prototyping, design systems, data visualisation, and stakeholder facilitation. I bring structure to uncertain projects, help teams align around user needs, and communicate design decisions in a way people can understand and act on.",
  ],
  strengths: [
    "UX strategy, discovery, and product planning",
    "Healthcare, SaaS, energy, government, and financial services experience",
    "Translating complex content and data into clear user journeys",
    "Wireframing, prototyping, usability testing, and research planning",
    "Design systems, UX standards, and design-to-development workflows",
    "Workshop facilitation, stakeholder alignment, and design storytelling",
    "AI-assisted prototyping and product exploration",
  ],
  experience: [
    {
      role: "Product Designer",
      company: "Arbnco",
      period: "Mar 2024 to Jun 2026",
      highlights: [
        "Designed product experiences for a decarbonisation platform used in commercial real estate, focused on complex data, carbon reporting, and consent workflows.",
        "Helped shape UX strategy and product planning for a platform supporting energy, carbon, and net-zero reporting.",
        "Led the structure and rollout of a shared design system, aligning Figma files with development components to improve consistency and delivery speed.",
        "Designed data-heavy experiences that helped users understand energy performance, carbon impact, consent status, and reporting issues.",
        "Facilitated workshops and design reviews with product, development, and stakeholder teams to define problems and agree practical solutions.",
        "Worked closely with developers to improve handover, reduce ambiguity, and build a working design system in under 6 months.",
      ],
    },
    {
      role: "UX Consultant",
      company: "User Vision",
      period: "Mar 2022 to Mar 2024",
      highlights: [
        "Delivered UX research and design projects for clients across healthcare, SaaS, government, and public-facing services.",
        "Planned and ran interviews, usability tests, surveys, workshops, and occasional focus groups with hundreds of participants.",
        "Managed UX research tasks from planning through to reporting, including scripts, analysis, recommendations, and stakeholder playback sessions.",
        "Turned complex user insight into clear journey improvements, prototypes, reports, and developer-ready recommendations.",
        "Contributed to measurable improvements, including a 40% increase in task success after simplifying a navigation flow.",
      ],
      note: "After several years in digital design, I decided to change direction towards user experience, with a focus on psychology. I was accepted at the University of Stirling for a Masters in Psychology, but at the same time I was approached for a UX role at User Vision.",
    },
    {
      role: "Digital Designer",
      company: "The&Partnership",
      period: "Oct 2019 to Sept 2021",
      highlights: [
        "Designed digital content across email, web, social, and advertising campaigns for major financial services clients.",
        "Created work for major banking clients including RBS, NatWest, and Ulster Bank.",
        "Led creative work on a Scottish Rugby campaign that reached over 11 million interactions.",
        "Built brand guidelines, templates, and reusable digital design assets.",
      ],
    },
  ] as CvExperienceItem[],
  leadership:
    "I'm comfortable stepping into a lead role when a project needs clarity, structure, or momentum. I've facilitated workshops, guided stakeholders through UX decisions, supported junior designers, and helped teams stay aligned when the direction is still uncertain. I also use AI-assisted prototyping to explore ideas quickly, while still owning the design thinking, decision-making, and quality of the final outcome.",
  education: [
    {
      title: "BDes (Hons) Graphic Design, Edinburgh Napier University",
      detail: "First Class Honours, 2019",
    },
    {
      title: "CPUX-F Certified",
      detail: "Foundation-level usability and UX certification",
    },
    {
      title: "Interaction Design Foundation",
      detail: "Completed courses in emotional design, data-driven UX, usability testing, HCI, and VR/AR",
    },
  ],
  skills: [
    {
      label: "UX and product",
      items:
        "UX strategy, discovery, information architecture, user journeys, wireframing, prototyping, usability testing, interviews, surveys, workshops, UX reporting, accessibility-aware design.",
    },
    {
      label: "UI and systems",
      items:
        "Figma, design systems, component libraries, data visualisation, responsive interface design, visual hierarchy, developer handover.",
    },
    {
      label: "Creative and technical",
      items:
        "Adobe XD, Photoshop, Illustrator, InDesign, After Effects, Premiere Pro, Logic Pro X, Cinema 4D, Procreate, basic HTML and CSS, AI-assisted prototyping.",
    },
  ],
  interests:
    "Music, songwriting, music production, fixing electronics, jiujitsu, mountain biking, skiing, scuba diving, and mentoring junior designers.",
  contact: {
    email: siteConfig.email,
    phone: siteConfig.phone,
    linkedIn: siteConfig.linkedIn,
    portfolio: `https://www.${siteConfig.domain}`,
    portfolioLabel: `www.${siteConfig.domain}`,
  },
};

export function getCvPdfFilename(date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `Shaun-Leishman-UX-Designer-CV-${month}-${year}.pdf`;
}
