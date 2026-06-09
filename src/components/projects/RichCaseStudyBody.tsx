import type { Project } from "@/content/projects";

type RichCaseStudyBodyProps = {
  slug: string;
  project: Project;
};

export async function RichCaseStudyBody({ slug, project }: RichCaseStudyBodyProps) {
  switch (slug) {
    case "arbnco-synthetic-ai-data": {
      const { ArbncoCaseStudyContent } = await import("@/components/projects/ArbncoCaseStudyContent");
      return <ArbncoCaseStudyContent project={project} />;
    }
    case "nhs-111-waiting-times": {
      const { NhsCaseStudyContent } = await import("@/components/projects/NhsCaseStudyContent");
      return <NhsCaseStudyContent project={project} />;
    }
    case "omron-patient-monitoring": {
      const { OmronCaseStudyContent } = await import("@/components/projects/OmronCaseStudyContent");
      return <OmronCaseStudyContent project={project} />;
    }
    default:
      return null;
  }
}
