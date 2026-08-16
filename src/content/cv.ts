import { siteConfig } from "@/content/projects";

export type CvExperienceItem = {
  role: string;
  company: string;
  period: string;
  /** Short uneven paragraphs, not a verb-parade bullet stack. */
  paragraphs: string[];
  /** Optional aside shown below the role, e.g. to explain a gap or career change. */
  note?: string;
};

export type CvContent = {
  headline: string;
  summary: string[];
  strengths: string[];
  experience: CvExperienceItem[];
  education: { title: string; detail: string }[];
  skills: { label: string; items: string }[];
  interests: string;
  contact: {
    email: string;
    phone: string;
    linkedIn: string;
    portfolio: string;
    portfolioLabel: string;
  };
};

export const cvContent: CvContent = {
  headline: "UX/UI Designer · Edinburgh",
  summary: [
    "I'm a UX/UI Designer in Edinburgh with over five years making complex digital products easier to use and easier to ship. Most of that sits in healthcare, SaaS, energy, government, and financial services, where people have to trust what they see before they act.",
    "I work across research, prototyping, design systems, and data-heavy screens. Happy to run workshops or stakeholder conversations when a project needs clarity. I use AI-assisted prototyping to explore ideas quickly, but I still own the thinking and what ships.",
  ],
  strengths: [
    "Making dense technical and regulated products clearer to use",
    "Research, prototyping, and design systems with engineering",
    "Workshops and stakeholder work when the direction is still messy",
  ],
  experience: [
    {
      role: "Product Designer",
      company: "Arbnco",
      period: "Mar 2024 to Jun 2026",
      paragraphs: [
        "The product helps commercial buildings with energy and carbon reporting. Most of my work was making dense technical stuff readable so people could trust it. I designed energy, carbon, consent, and reporting flows, and ran the design system with engineering. Figma and live components matched properly in under 6 months.",
        "One sprint I remember well was the synthetic hourly data work. Meters were often monthly, but teams needed hourly views. I designed how people turn estimates on, see eligibility, and tell estimated hours apart from real readings.",
      ],
    },
    {
      role: "UX Consultant",
      company: "User Vision",
      period: "Mar 2022 to Mar 2024",
      paragraphs: [
        "Client work across healthcare, SaaS, government, and public services. Research took up a big chunk of my week. I usually ran it end to end, then turned findings into journey changes, prototypes, and recommendations developers could build.",
        "One change that stuck with me was a navigation flow that was getting in people's way. We simplified it, and task success went up by about 40%.",
      ],
      note: "I was shifting from digital design into UX, with a psychology masters place at Stirling lined up, when User Vision approached me and I took the role.",
    },
    {
      role: "Digital Designer",
      company: "The&Partnership",
      period: "Oct 2019 to Sept 2021",
      paragraphs: [
        "Digital campaign work for financial services clients including RBS, NatWest, and Ulster Bank. Brand guidelines, templates, and reusable assets that had to hold up across email, web, social, and advertising.",
        "One piece that stuck with me was a Scottish Rugby campaign. I led the creative side of the digital work, and it reached over 11 million interactions.",
      ],
    },
  ] as CvExperienceItem[],
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
      detail: "Emotional design, data-driven UX, usability testing, HCI, and VR/AR",
    },
  ],
  skills: [
    {
      label: "UX and product",
      items:
        "UX strategy, discovery, information architecture, journeys, wireframing, prototyping, usability testing, interviews, surveys, workshops, accessibility-aware design.",
    },
    {
      label: "UI and systems",
      items:
        "Figma, design systems, component libraries, data visualisation, responsive UI, visual hierarchy, developer handover.",
    },
    {
      label: "Creative and technical",
      items:
        "Adobe XD, Photoshop, Illustrator, InDesign, After Effects, Premiere Pro, basic HTML and CSS, AI-assisted prototyping.",
    },
  ],
  interests:
    "Music, songwriting, production, fixing electronics, jiujitsu, mountain biking, skiing, scuba diving, mentoring.",
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
