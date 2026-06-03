import { siteConfig } from "@/content/projects";

export type Testimonial = {
  id: string;
  /** Hero quote shown in the carousel */
  headline: string;
  author: string;
  role: string;
  linkedInUrl?: string;
};

/** Sourced from LinkedIn recommendations, update when new ones are added on profile. */
export const testimonials: Testimonial[] = [
  {
    id: "augusto-domingos",
    headline:
      "An incredible eye for seamless user experiences, consistently prioritises delivering meaningful value.",
    author: "Augusto Domingos",
    role: "Engineering Operations & Team Enablement, arbnco",
    linkedInUrl: "https://www.linkedin.com/in/augusto-domingos",
  },
  {
    id: "duncan-stephen",
    headline:
      "An incredible creative thinker with an uncanny ability to sense the big picture of users' experience on any project.",
    author: "Duncan Stephen",
    role: "Principal User Experience Consultant, User Vision",
  },
  {
    id: "stephen-denning",
    headline:
      "A rare blend of technical capability and artistic flair, with a focus on making evidence-based design decisions.",
    author: "Stephen Denning",
    role: "UX Director, User Vision",
  },
  {
    id: "francesco-blasi",
    headline:
      "We developed a completely functional design system in just six months, an amazing accomplishment for the team.",
    author: "Francesco Blasi",
    role: "Senior Software Engineer",
  },
  {
    id: "garima-kamra",
    headline:
      "He asks the right questions to get to the core of complex problems, with real depth on requirements before designing a solution.",
    author: "Garima Kamra",
    role: "Product Manager · arbnco",
  },
  {
    id: "gwen-inarejos",
    headline:
      "Extremely knowledgeable and forthcoming with great ideas around design and research. His positivity makes him a great asset every team needs.",
    author: "Gwen Inarejos",
    role: "Executive Search Consultant",
  },
];

export const testimonialsSourceUrl = siteConfig.linkedIn;
