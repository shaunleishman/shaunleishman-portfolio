import { cn } from "@/lib/utils";

type CaseStudySubheadingProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withLead?: boolean;
};

export function CaseStudySubheading({
  children,
  className,
  id,
  withLead = false,
}: CaseStudySubheadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        "text-h4 font-semibold text-[var(--color-text-primary)]",
        withLead ? "mb-2" : "mb-4",
        className,
      )}
    >
      {children}
    </h3>
  );
}

type CaseStudySubsectionProps = {
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
};

/** Second-level heading used consistently across rich case studies (e.g. Key takeaways, User flow). */
export function CaseStudySubsection({
  title,
  lead,
  children,
  className,
}: CaseStudySubsectionProps) {
  const headingId = title.replace(/\s/g, "-").toLowerCase();

  return (
    <section className={cn("mb-10", className)} aria-labelledby={headingId}>
      <CaseStudySubheading id={headingId} withLead={Boolean(lead)}>
        {title}
      </CaseStudySubheading>
      {lead && (
        <p className="mb-4 max-w-2xl text-body text-[var(--color-text-muted)]">{lead}</p>
      )}
      {children}
    </section>
  );
}
