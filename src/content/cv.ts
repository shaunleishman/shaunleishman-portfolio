import { siteConfig } from "@/content/projects";

type CvExperienceItem = {
  role: string;
  company: string;
  period: string;
  /** Short uneven paragraphs, not a verb-parade bullet stack. */
  paragraphs: string[];
  /** Optional aside shown below the role, e.g. to explain a gap or career change. */
  note?: string;
};

export const cvContent = {
  headline: "UX/UI Designer · Edinburgh",
  summary: [
    "I'm a UX/UI Designer in Edinburgh with over five years spent making complex digital products easier to use and easier to ship.",
    "Most of my work sits in places that are hard to explain, like healthcare, SaaS, energy, government, and financial services. These are products where people have to trust what they see before they act, so a confusing screen is not just untidy. It can stop someone making a decision that matters.",
    "I bring structure to messy problems. Research, prototyping, design systems, data-heavy screens, and the stakeholder conversations that keep a team moving when the direction is still uncertain.",
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
        "The product helps commercial buildings with energy and carbon reporting. Most of my work was making dense, technical stuff readable so people could trust it.",
        "I designed flows around energy performance, carbon impact, consent, and reporting. I also ran the design system work with the engineering team. We got Figma and the live components matching properly in under 6 months.",
        "One sprint I remember well was the synthetic hourly data work. Meter readings were often monthly, but teams needed hourly views. I designed how people could turn generated estimates on, see which buildings were eligible, and tell estimated hours apart from real readings.",
      ],
    },
    {
      role: "UX Consultant",
      company: "User Vision",
      period: "Mar 2022 to Mar 2024",
      paragraphs: [
        "Client work, mostly. Healthcare, SaaS, government, and public services. Research took up a big chunk of my week. Interviews, usability tests, surveys, workshops, the odd focus group. Hundreds of people across those projects.",
        "I usually ran the research myself from start to finish. Scripts, sessions, analysis, then the report and the playback. The useful bit was turning what people said into journey changes, prototypes, and recommendations a client could actually give to developers.",
        "One change that stuck with me was a navigation flow that was getting in people's way. We simplified it. Task success went up by about 40%.",
      ],
      note: "After a few years in digital design I wanted to move into UX, with more of a psychology focus. I had a place on a psychology masters at Stirling lined up, but User Vision approached me at the same time and I took the role.",
    },
    {
      role: "Digital Designer",
      company: "The&Partnership",
      period: "Oct 2019 to Sept 2021",
      paragraphs: [
        "Most of the work was for big financial services clients. Email, web, social, and advertising. A lot of it sat with banks like RBS, NatWest, and Ulster Bank, where the brand rules were tight and the assets had to hold up across a lot of channels.",
        "Day to day I was making campaign work and keeping it consistent. Brand guidelines, templates, reusable bits the team could pick up without starting from scratch every time.",
        "One piece that stuck with me was a Scottish Rugby campaign. I led the creative side of the digital work, and it reached over 11 million interactions.",
      ],
    },
  ] as CvExperienceItem[],
  leadership:
    "I'm happy to step into a lead role when a project needs clarity or momentum. That usually means running workshops, helping stakeholders make a call, supporting junior designers, and keeping the team pointed at the same problem. I use AI-assisted prototyping to explore ideas quickly, but I still own the thinking and the quality of what ships.",
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
