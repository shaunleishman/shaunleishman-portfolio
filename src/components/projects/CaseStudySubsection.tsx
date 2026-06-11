import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

type CaseStudySubsectionProps = {
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  /** Extra top margin after a content box (table, embed, wireframe) — no border line. */
  spacingTop?: boolean;
};

/** Second-level heading used consistently across rich case studies (e.g. User flow, Survey results). */
export function CaseStudySubsection({
  title,
  lead,
  children,
  className,
  spacingTop = false,
}: CaseStudySubsectionProps) {
  const headingId = title.replace(/\s/g, "-").toLowerCase();

  return (
    <section
      className={cn(
        "mb-12 last:mb-0",
        spacingTop && "mt-10 md:mt-12",
        className,
      )}
      aria-labelledby={headingId}
    >
      <SectionHeader
        id={headingId}
        title={title}
        lead={lead}
        variant="secondary"
        as="div"
        className={lead ? "mb-6" : "mb-5"}
      />
      {children}
    </section>
  );
}
