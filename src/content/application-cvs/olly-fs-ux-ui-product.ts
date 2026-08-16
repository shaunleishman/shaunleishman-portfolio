import { cvContent, type CvContent } from "@/content/cv";

/**
 * Tailored CV for the financial-services UX/UI & Product Designer submission
 * via recruiter Olly. Does not replace the public site CV in `cv.ts`.
 * Written to fill one A4 page without spilling to two.
 */
export const ollyFsUxUiProductCv: CvContent = {
  headline: "UX/UI & Product Designer · Edinburgh",
  summary: [
    "I'm a hybrid UX/UI and Product Designer in Edinburgh. Over five years I've worked end to end, from research and discovery through high-fidelity UI and developer handoff, mostly on products in financial services, healthcare, energy, government, and SaaS.",
    "Figma is the centre of how I work. Component libraries, documentation, tokens, semantic and primitive variables, and advanced prototyping. Portfolio evidence of process and craft sits at www.shaunleishmanportfolio.com.",
  ],
  strengths: [
    "End-to-end UX, UI, and product design from discovery to handoff",
    "Advanced Figma, design systems, tokens, and component libraries",
    "Financial services work across research-led UX and digital campaign craft",
    "Stakeholder and board-ready presentation of research and design rationale",
  ],
  experience: [
    {
      role: "Product Designer",
      company: "Arbnco",
      period: "Mar 2024 to Jun 2026",
      paragraphs: [
        "Decarbonisation platform for commercial buildings. I owned product UX and UI end to end on dense energy, carbon, consent, and reporting flows. Day to day I stayed hands-on, streamlining components and tightening application UI for accessibility, usability, and clean visual design so people could trust the numbers before they acted.",
        "I refreshed the Figma design system and brought it into line with the developers' component library. Tokens, semantic and primitive variables, documentation, and shared components so the product could scale without every sprint inventing a new pattern. Figma and live components matched properly in under six months.",
        "On synthetic hourly data, meters were often monthly but teams needed hourly views. I designed eligibility, activation, and how estimated hours sit next to real readings across graphs, tables, and reports, then handed that to engineering ready to build.",
      ],
    },
    {
      role: "UX Consultant",
      company: "User Vision",
      period: "Mar 2022 to Mar 2024",
      paragraphs: [
        "Client work across healthcare, SaaS, government, and public services, with a clear financial-services strand for Abrdn. That engagement was research-led. Personas and behavioural archetypes, journey maps, interviews, usability testing, and a retirement calculator. I turned the findings into recommendations and proposed designs, then presented research, designs, and rationale in client and board-style meetings for non-technical stakeholders.",
        "Elsewhere I ran research end to end and moved findings into journey changes and prototypes developers could ship. One navigation change that was getting in people's way went up by about 40% in task success after we simplified it.",
      ],
      note: "I was shifting from digital design into UX, with a psychology masters place at Stirling lined up, when User Vision approached me and I took the role.",
    },
    {
      role: "Digital Designer",
      company: "The&Partnership",
      period: "Oct 2019 to Sept 2021",
      paragraphs: [
        "Digital and visual design for financial services clients including NatWest, RBS, and Ulster Bank. Emails, landing pages, campaigns, and animation under tight brand rules. Templates and reusable assets that had to hold up across web, social, and advertising. Same need for clarity with regulated audiences, just through campaign and brand work rather than research-led product UX.",
        "On a Scottish Rugby campaign I led the creative side of the digital work. It reached over 11 million interactions.",
      ],
    },
  ],
  education: cvContent.education,
  skills: [
    {
      label: "UX and product",
      items:
        "Discovery, UX strategy, information architecture, journeys, wireframing, high-fidelity UI, usability testing, interviews, surveys, workshops, accessibility-aware design, developer handoff.",
    },
    {
      label: "Figma and systems",
      items:
        "Figma, component libraries, documentation, design tokens, semantic and primitive variables, advanced prototyping, design systems with engineering, data visualisation, responsive UI.",
    },
    {
      label: "Creative and technical",
      items:
        "Emails, landing pages, campaigns, animation, Adobe XD, Photoshop, Illustrator, InDesign, After Effects, Premiere Pro, basic HTML and CSS, AI-assisted prototyping.",
    },
  ],
  interests: cvContent.interests,
  contact: cvContent.contact,
};
