import { cn } from "@/lib/utils";

type CaseStudySectionProps = {
  id: string;
  title: string;
  /** Recruiter-oriented lead — why this section matters */
  lead?: string;
  children: React.ReactNode;
  className?: string;
};

export function CaseStudySection({
  id,
  title,
  lead,
  children,
  className,
}: CaseStudySectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("mb-14 scroll-mt-36", className)}>
      <h2 id={`${id}-heading`} className="text-h3 font-semibold mb-2">
        {title}
      </h2>
      {lead && (
        <p className="text-body text-[var(--color-text-muted)] mb-6 max-w-2xl">{lead}</p>
      )}
      {!lead && <div className="mb-4" />}
      <div className="text-body-lg text-[var(--color-text-secondary)]">{children}</div>
    </section>
  );
}
