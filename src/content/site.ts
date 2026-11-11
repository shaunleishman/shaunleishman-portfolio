/**
 * Brand and contact details for the header, footer, and metadata.
 * Lives apart from the case-study catalog so the site shell does not ship that copy
 * to the browser. Import `siteConfig` from here, not from `@/content/projects`.
 */
export const siteConfig = {
  name: "Shaun Leishman",
  brand: "sleishman.design",
  brandHandle: "sleishman",
  logo: "/brand/logo.png",
  logoDark: "/brand/logo-dark.png",
  domain: "shaunleishmanportfolio.com",
  siteUrl: "https://www.shaunleishmanportfolio.com",
  tagline: "Helping Teams Design Products Users Trust",
  heroHeadlineLines: ["Helping Teams", "Design Products", "Users Trust"],
  heroFocusAreas: [
    "Energy & sustainability",
    "Healthcare",
    "Government",
    "Finance",
    "Mostly B2B products",
  ],
  quote:
    "It's one thing to shape experiences that improve lives. Helping people make better decisions is where the real work happens.",
  email: "postalshaun@outlook.com",
  phone: "07708002642",
  linkedIn: "https://www.linkedin.com/in/shaun-leishman-94a46b130/",
  cvUrl: "/cv",
  experience: "5+ years",
};
