import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { DownloadCoverLetterButton } from "@/components/cv/DownloadCoverLetterButton";
import {
  coverLetterShared,
  coverLetters,
  getCoverLetterBySlug,
  getCoverLetterSector,
} from "@/content/cover-letter";
import { siteConfig } from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return coverLetters.map((letter) => ({ slug: letter.slug }));
}

export default async function CoverLetterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const letter = getCoverLetterBySlug(slug);

  if (!letter) {
    notFound();
  }

  const sector = getCoverLetterSector(letter.sectorId);
  const { contact } = coverLetterShared;

  return (
    <AdminShell
      title={letter.jobTitle}
      description={`${letter.company} · ${sector?.label ?? letter.sectorId}`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
        <div className="min-w-0">
          <Link
            href="../cover-letter"
            className="mb-2 inline-flex items-center gap-1 text-body-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All cover letters
          </Link>
          <p className="text-body-sm font-medium text-[var(--color-text-primary)]">
            {letter.company}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {letter.roleMeta}
            {sector ? ` · ${sector.label}` : null}
          </p>
        </div>
        <DownloadCoverLetterButton slug={letter.slug} />
      </div>

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
              {letter.jobTitle}
            </p>
            <p className="mt-1 text-body-sm text-[var(--color-text-primary)]">{letter.company}</p>
            <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">{letter.roleMeta}</p>
          </div>

          <p className="mb-4 text-body text-[var(--color-text-primary)]">{letter.greeting}</p>

          <div className="space-y-4">
            {letter.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-body leading-relaxed text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 text-body text-[var(--color-text-secondary)]">{letter.closing}</p>
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
    </AdminShell>
  );
}
