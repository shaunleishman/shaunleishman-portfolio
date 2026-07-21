import { siteConfig } from "@/content/projects";

/**
 * Sectors you own. Add or rename here when you want new cover-letter categories.
 * Letters reference a sector by `id`.
 */
export const COVER_LETTER_SECTORS = [
  { id: "financial-services", label: "Financial services" },
  { id: "healthcare", label: "Healthcare" },
  { id: "energy", label: "Energy and sustainability" },
  { id: "saas", label: "SaaS and product" },
  { id: "government", label: "Government and public sector" },
  { id: "agency", label: "Agency and consultancy" },
] as const;

export type CoverLetterSectorId = (typeof COVER_LETTER_SECTORS)[number]["id"];

export type CoverLetter = {
  /** URL and PDF key, e.g. lloyds-ux-designer-ftc */
  slug: string;
  /** Employer or organisation the letter is for */
  company: string;
  /** Job title on the advert */
  jobTitle: string;
  /** Sector category from COVER_LETTER_SECTORS */
  sectorId: CoverLetterSectorId;
  /** Short line under the job title, e.g. location and contract */
  roleMeta: string;
  /** Optional date the letter was written, ISO date */
  writtenOn?: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
};

export const coverLetterContact = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  linkedIn: siteConfig.linkedIn,
  portfolio: `https://www.${siteConfig.domain}`,
  portfolioLabel: `www.${siteConfig.domain}`,
};

export const coverLetterShared = {
  label: "Cover letter",
  headline: "UX/UI Designer · Edinburgh",
  signOff: siteConfig.name,
  contact: coverLetterContact,
};

export const coverLetters: CoverLetter[] = [
  {
    slug: "lloyds-ux-designer-ftc",
    company: "Lloyds Banking Group",
    jobTitle: "UX Designer",
    sectorId: "financial-services",
    roleMeta: "12-month FTC · Edinburgh · Hybrid",
    writtenOn: "2026-07-21",
    greeting: "Dear Hiring Manager,",
    paragraphs: [
      "I'm applying for the UX Designer 12-month role in Edinburgh. I'm based here already, and the brief matches the kind of work I do best. Complex products, real customer journeys, and enough stakeholder pressure that the design has to hold up in the room as well as on the screen.",
      "For the last two years I was a Product Designer at Arbnco on a decarbonisation platform for commercial buildings. A lot of it was dense, technical stuff. Energy data, carbon reporting, consent. People only acted once they could trust what they were looking at. I owned the interaction design end to end, and I worked inside a shared design system with engineering so we were not inventing a new pattern every sprint. We got Figma and the live components matching properly in under six months.",
      "Before that I was a UX Consultant at User Vision. Research was a big part of the job. Interviews, usability tests, workshops, then turning what we heard into journey changes and prototypes developers could build. One navigation change stuck with me. The flow was getting in people's way, we simplified it, and task success went up by about 40%. I'm used to presenting that kind of work to stakeholders, taking the challenge, and changing the design when the evidence says so.",
      "Earlier on I designed digital campaign work for financial services clients at The&Partnership, including RBS, NatWest, and Ulster Bank. Regulated brand rules and business audiences are not new to me. Accessibility sits in the same place for me as clarity. If someone of a different age, background, or confidence level cannot use it, the journey is not finished.",
      "I prototype mainly in Figma. I'm comfortable working with dedicated research teams, and I'm happy to push back when a requirement would make things harder for the customer, as long as I can show why.",
      "I'd welcome a conversation about the role. My CV and portfolio are at www.shaunleishmanportfolio.com.",
    ],
    closing: "Yours sincerely,",
  },
];

export function getCoverLetterSector(sectorId: CoverLetterSectorId) {
  return COVER_LETTER_SECTORS.find((sector) => sector.id === sectorId);
}

export function getCoverLetterBySlug(slug: string) {
  return coverLetters.find((letter) => letter.slug === slug);
}

export function getCoverLettersBySector(sectorId: CoverLetterSectorId | "all") {
  if (sectorId === "all") return coverLetters;
  return coverLetters.filter((letter) => letter.sectorId === sectorId);
}

export function getCoverLetterPdfFilename(letter: CoverLetter, date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const company = letter.company.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const role = letter.jobTitle.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `Shaun-Leishman-${company}-${role}-Cover-Letter-${month}-${year}.pdf`;
}
