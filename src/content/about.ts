import { siteConfig } from "@/content/projects";

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
      "Research-led UX/UI design across discovery interviews, co-design workshops, wireframes, prototypes, and usability testing. Recent work spans healthcare (OMRON, NHS 111) and sustainability (Arbnco), where clarity and trust are non-negotiable.",
      siteConfig.quote,
      "Currently looking for UX/UI design roles where the work spans research, interaction design, and prototyping, helping teams make better decisions with real user evidence, not just polished screens.",
    ],
  },
  personal: {
    label: "Personal",
    heading: "Off the clock",
    paragraphs: [
      "Design work can live in your head for hours. I try to balance that with things that get me outside, on stage, or hands-on with something physical.",
      "I value straight talk, good humour, and never making anyone feel stupid for not knowing something. That's how I show up with friends, family, teams, and in the work itself.",
      "If we work together, you'll get someone who cares about the craft and remembers there's a human on the other side of every screen.",
    ],
  },
} as const satisfies Record<
  AboutBackgroundView,
  { label: string; heading: string; paragraphs: readonly string[] }
>;

export const aboutBackgroundViewOrder: AboutBackgroundView[] = ["professional", "personal"];

export const aboutProfilePhotos = {
  professional: {
    src: "/images/profile.png",
    alt: `${siteConfig.name}, UX/UI designer`,
  },
  personal: {
    src: "/images/profile-personal.png",
    alt: `${siteConfig.name} performing live with guitar`,
  },
} as const satisfies Record<AboutBackgroundView, { src: string; alt: string }>;
