import type { Project } from "@/content/projects";

type RichCaseStudyBodyProps = {
  slug: string;
  project: Project;
};

const richCaseStudies = {
  "arbnco-synthetic-ai-data": () =>
    import("@/components/projects/ArbncoCaseStudyContent").then((mod) => mod.ArbncoCaseStudyContent),
  "nhs-111-waiting-times": () =>
    import("@/components/projects/NhsCaseStudyContent").then((mod) => mod.NhsCaseStudyContent),
  "omron-patient-monitoring": () =>
    import("@/components/projects/OmronCaseStudyContent").then((mod) => mod.OmronCaseStudyContent),
} as const;

export type RichCaseStudySlug = keyof typeof richCaseStudies;

export function isRichCaseStudySlug(slug: string): slug is RichCaseStudySlug {
  return Object.prototype.hasOwnProperty.call(richCaseStudies, slug);
}

export async function RichCaseStudyBody({ slug, project }: RichCaseStudyBodyProps) {
  if (!isRichCaseStudySlug(slug)) return null;

  const Content = await richCaseStudies[slug]();
  return <Content project={project} />;
}
