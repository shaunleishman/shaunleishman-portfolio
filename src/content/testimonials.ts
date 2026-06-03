import { siteConfig } from "@/content/projects";

export type Testimonial = {
  id: string;
  /** Best single line — shown large in the carousel */
  headline: string;
  /** Short, scannable highlights from the full recommendation */
  highlights: string[];
  author: string;
  role: string;
  linkedInUrl?: string;
};

/** Sourced from LinkedIn recommendations — update when new ones are added on profile. */
export const testimonials: Testimonial[] = [
  {
    id: "augusto-domingos",
    headline:
      "An incredible eye for seamless user experiences — consistently prioritises delivering meaningful value.",
    highlights: [
      "Truly talented Product Designer focused on products that make a real difference",
      "Doesn't settle for the easiest solution — focuses on what makes sense long term",
      "Isn't afraid of tough conversations that drive the team and company forward",
      "Invaluable asset with a user-centric, creative mindset",
    ],
    author: "Augusto Domingos",
    role: "Software Engineering Coordinator, arbnco",
    linkedInUrl: "https://www.linkedin.com/in/augusto-domingos",
  },
  {
    id: "design-system-colleague",
    headline:
      "A completely functional design system in just six months — highly important to the company.",
    highlights: [
      "Incredibly skilled designer and very collaborative — up to speed in no time",
      "Open-minded, prioritises learning and sharing perspective",
      "Working with him taught me how UX methods affect actual code",
      "Undoubtedly someone who creates value wherever he works",
    ],
    author: "LinkedIn colleague",
    role: "LinkedIn recommendation · Design systems",
    linkedInUrl: siteConfig.linkedIn,
  },
];

export const testimonialsSourceUrl = siteConfig.linkedIn;
