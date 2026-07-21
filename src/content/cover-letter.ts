import { siteConfig } from "@/content/projects";

export const coverLetterContent = {
  label: "Cover letter",
  headline: "UX/UI Designer · Edinburgh",
  roleTitle: "UX Designer",
  roleMeta: "12-month FTC · Edinburgh · Hybrid",
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
  signOff: siteConfig.name,
  contact: {
    email: siteConfig.email,
    phone: siteConfig.phone,
    linkedIn: siteConfig.linkedIn,
    portfolio: `https://www.${siteConfig.domain}`,
    portfolioLabel: `www.${siteConfig.domain}`,
  },
};

export function getCoverLetterPdfFilename(date = new Date()) {
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `Shaun-Leishman-UX-Designer-Cover-Letter-${month}-${year}.pdf`;
}
