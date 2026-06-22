import { siteConfig } from "@/content/projects";

export type AboutBackgroundView = "professional" | "personal";

export const eyesOfHome = {
  name: "Eyes of Home",
  instagramUrl: "https://www.instagram.com/eyes_of_home/",
} as const;

export type AboutLifeWindow = {
  id: string;
  label: string;
  alt: string;
  /** Drop a photo at this path to replace the gradient fallback */
  src?: string;
  icon: "music" | "diving" | "skiing" | "travel" | "gaming";
  accent: string;
};

export const aboutLifeWindows: readonly AboutLifeWindow[] = [
  {
    id: "music",
    label: "Music",
    alt: "Shaun performing live with guitar",
    src: "/images/profile-personal.png",
    icon: "music",
    accent: "#7c3aed",
  },
  {
    id: "diving",
    label: "Diving",
    alt: "Shaun in scuba gear with a dive buddy",
    src: "/images/about/diving.png",
    icon: "diving",
    accent: "#0891b2",
  },
  {
    id: "skiing",
    label: "Skiing",
    alt: "Shaun skiing on a sunny powder day",
    src: "/images/about/skiing.png",
    icon: "skiing",
    accent: "#475569",
  },
  {
    id: "travel",
    label: "Travel",
    alt: "Shaun in the desert with mountains in the background",
    src: "/images/about/travel.png",
    icon: "travel",
    accent: "#d97706",
  },
  {
    id: "gaming",
    label: "Gaming",
    alt: "Shaun at a gaming setup with mechanical keyboard and PC",
    src: "/images/about/gaming.png",
    icon: "gaming",
    accent: "#4f46e5",
  },
] as const;

export type AboutOriginStep = {
  title: string;
  detail: string;
};

export const aboutOriginTimeline: readonly AboutOriginStep[] = [
  {
    title: "University",
    detail: "First-class honours in design",
  },
  {
    title: "YCN Award",
    detail: "Won for Frontier Lager in London",
  },
  {
    title: "Digital designer",
    detail: "Branding, landing pages, campaigns",
  },
  {
    title: "Masters in psychology",
    detail: "Accepted at the University of Stirling",
  },
  {
    title: "UX consultancy",
    detail: "Found the bridge between psychology and design",
  },
  {
    title: "Startup & product work",
    detail: "Systems, complexity, and product ownership",
  },
  {
    title: "Now",
    detail: "Growing toward senior leadership in a bigger team",
  },
] as const;

export type AboutStatGroup = {
  label: string;
  icon: "research" | "design";
  accent: string;
  stats: readonly { value: string; label: string }[];
};

export const aboutStatGroups: readonly AboutStatGroup[] = [
  {
    label: "Research",
    icon: "research",
    accent: "#0891b2",
    stats: [
      { value: "2 yrs", label: "UX research" },
      { value: "190+", label: "Participants interviewed" },
      { value: "240+", label: "Hours of research sessions" },
    ],
  },
  {
    label: "Design",
    icon: "design",
    accent: "#7c3aed",
    stats: [
      { value: "3 yrs", label: "UX/UI design" },
      { value: "8", label: "Products worked on" },
      { value: "40+", label: "Hours of co-design workshops" },
    ],
  },
] as const;

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
