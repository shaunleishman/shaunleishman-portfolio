import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ApplicationDocumentChips } from "@/components/cv/ApplicationDocumentChips";
import { ApplicationDownloadButton } from "@/components/cv/ApplicationDownloadButton";
import { ApplicationOutcomeBadge } from "@/components/cv/ApplicationOutcomeBadge";
import {
  applications,
  coverLetterShared,
  getApplicationBySlug,
  getApplicationSector,
} from "@/content/applications";
import { siteConfig } from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return applications.map((application) => ({ slug: application.slug }));
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);

  if (!application) {
    notFound();
  }

  const sector = getApplicationSector(application.sectorId);
  const { contact } = coverLetterShared;

  return (
    <AdminShell
      title={application.jobTitle}
      description={`${application.company} · ${sector?.label ?? application.sectorId}`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
        <div className="min-w-0">
          <Link
            href="../applications"
            className="mb-2 inline-flex items-center gap-1 text-body-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All applications
          </Link>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <ApplicationOutcomeBadge outcomeId={application.outcomeId} />
            <ApplicationDocumentChips application={application} />
          </div>
          <p className="text-body-sm font-medium text-[var(--color-text-primary)]">
            {application.company}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {application.roleMeta}
            {sector ? ` · ${sector.label}` : null}
          </p>
        </div>
        <ApplicationDownloadButton application={application} />
      </div>

      {application.learningNote ? (
        <section className="mb-6 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4">
          <p className="text-label text-[var(--color-text-muted)]">Learning note</p>
          <p className="mt-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
            {application.learningNote}
          </p>
        </section>
      ) : (
        <section className="mb-6 rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-5 py-4">
          <p className="text-label text-[var(--color-text-muted)]">Learning note</p>
          <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
            When you hear back, add a <code>learningNote</code> on this application in{" "}
            <code>src/content/applications.ts</code> so the next pack can use what you learned.
          </p>
        </section>
      )}

      {application.hasCoverLetter ? (
        <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="border-b border-[var(--color-border)] px-6 py-8 sm:px-10">
            <p className="text-label text-[var(--color-text-muted)]">{coverLetterShared.label}</p>
            <h2 className="mt-2 text-h3 font-semibold text-[var(--color-text-primary)]">
              {siteConfig.name}
            </h2>
            <p className="mt-1 text-body text-[var(--color-text-secondary)]">
              {coverLetterShared.headline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-[var(--color-text-secondary)]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.phone}</li>
              <li>
                <a
                  href={contact.linkedIn}
                  className="text-[var(--color-accent)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={contact.portfolio} className="text-[var(--color-accent)] hover:underline">
                  {contact.portfolioLabel}
                </a>
              </li>
            </ul>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="mb-8 border-l-[3px] border-[var(--color-accent)] pl-4">
              <p className="text-body font-semibold text-[var(--color-text-primary)]">
                {application.jobTitle}
              </p>
              <p className="mt-1 text-body-sm text-[var(--color-text-primary)]">
                {application.company}
              </p>
              <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
                {application.roleMeta}
              </p>
            </div>

            <p className="mb-4 text-body text-[var(--color-text-primary)]">{application.greeting}</p>

            <div className="space-y-4">
              {(application.paragraphs ?? []).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-body leading-relaxed text-[var(--color-text-secondary)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-8 text-body text-[var(--color-text-secondary)]">{application.closing}</p>
            <p className="mt-1 text-body font-semibold text-[var(--color-text-primary)]">
              {coverLetterShared.signOff}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-6 py-4 sm:px-10">
            <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">
              {siteConfig.brand}
            </p>
            <p className="text-body-sm text-[var(--color-text-muted)]">{contact.portfolioLabel}</p>
          </div>
        </article>
      ) : (
        <p className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-8 text-body-sm text-[var(--color-text-muted)]">
          No cover letter for this application. Use Download for the tailored CV. Add a letter in{" "}
          <code>src/content/applications.ts</code> when you need one.
        </p>
      )}
    </AdminShell>
  );
}
