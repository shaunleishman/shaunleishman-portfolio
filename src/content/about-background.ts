import { siteConfig } from "@/content/projects";

/**
 * Background copy for the About page.
 *
 * Server components only. This module reads `siteConfig` from the project
 * catalog. The tab switcher must receive plain props from
 * `AboutBackgroundSection` and must not import this file, or the catalog is
 * shipped to the browser.
 */

export type AboutBackgroundView = "professional" | "personal";

export const eyesOfHome = {
  name: "Eyes of Home",
  instagramUrl: "https://www.instagram.com/eyes_of_home/",
} as const;

export const aboutBackgroundViews = {
  professional: {
    label: "Professional",
    heading: "Design informed by user research",
    paragraphs: [
      "I'm a research-led UX/UI designer. I start with discovery interviews and co-design workshops, then turn what I learn into wireframes, prototypes, and usability tests. Recently that's been healthcare with OMRON and NHS 111, and sustainability with Arbnco, where people must trust what they see before acting.",
      siteConfig.quote,
      "I'm looking for UX/UI design roles across interaction design and prototyping, where I help teams decide with real user evidence, not just polished screens.",
    ],
  },
  personal: {
    label: "Personal",
    heading: "Off the clock",
    paragraphs: [
      "Design work can live in your head for hours. I balance that with things that get me outside, on stage, or hands-on with something physical.",
      "I value straight talk, good humour, and never making anyone feel stupid for not knowing something. That's how I show up with friends, family, teams, and in the work itself.",
      "If we work together, you'll get someone who cares about the craft and remembers there's a human on the other side of every screen.",
    ],
  },
} as const satisfies Record<
  AboutBackgroundView,
  { label: string; heading: string; paragraphs: readonly string[] }
>;

/** Lead sentence on the Personal tab. The band name is the link between these parts. */
export const aboutPersonalLead = {
  before:
    "I'm based in Edinburgh, and music fills most of my spare time. I write songs, produce, and sing lead in the band ",
  after: ".",
} as const;

export const aboutBackgroundViewOrder: AboutBackgroundView[] = ["professional", "personal"];

export const aboutProfilePhotos = {
  professional: {
    src: "/images/profile.png",
    alt: `${siteConfig.name}, UX/UI designer`,
  },
  personal: {
    src: "/images/profile-personal.jpg",
    alt: `${siteConfig.name} performing live with guitar`,
  },
} as const satisfies Record<AboutBackgroundView, { src: string; alt: string }>;

export const aboutBackgroundLinks = {
  cvUrl: siteConfig.cvUrl,
  linkedIn: siteConfig.linkedIn,
} as const;
