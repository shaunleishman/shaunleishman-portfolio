/**
 * About page facts that do not read the project catalog.
 * Background copy lives in `about-background.ts` so client sections can import
 * this file without shipping every case study to the browser.
 *
 * Life-window photos are JPEG. Keep the `.jpg` extension: the site sends
 * `X-Content-Type-Options: nosniff`, so a `.png` name would be served as
 * `image/png` and the browser would refuse the file.
 */

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
    src: "/images/profile-personal.jpg",
    icon: "music",
    accent: "#7c3aed",
  },
  {
    id: "diving",
    label: "Diving",
    alt: "Shaun in scuba gear with a dive buddy",
    src: "/images/about/diving.jpg",
    icon: "diving",
    accent: "#0891b2",
  },
  {
    id: "skiing",
    label: "Skiing",
    alt: "Shaun skiing on a sunny powder day",
    src: "/images/about/skiing.jpg",
    icon: "skiing",
    accent: "#475569",
  },
  {
    id: "travel",
    label: "Travel",
    alt: "Shaun in the desert with mountains in the background",
    src: "/images/about/travel.jpg",
    icon: "travel",
    accent: "#d97706",
  },
  {
    id: "gaming",
    label: "Gaming",
    alt: "Shaun at a gaming setup with mechanical keyboard and PC",
    src: "/images/about/gaming.jpg",
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
    title: "Masters in Psychology",
    detail: "Accepted at the University of Stirling",
  },
  {
    title: "UX consultancy",
    detail: "Chose consultancy over the Masters, combining psychology and design",
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
