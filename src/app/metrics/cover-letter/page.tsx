"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DownloadCoverLetterButton } from "@/components/cv/DownloadCoverLetterButton";
import { coverLetterContent } from "@/content/cover-letter";
import { siteConfig } from "@/content/projects";

export default function CoverLetterAdminPage() {
  return (
    <AdminShell
      title="Cover letter"
      description="One-page cover letter in the same visual format as the CV PDF. Private to this admin area. Download it for applications where a letter is needed."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-[var(--color-text-primary)]">
            {coverLetterContent.roleTitle}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {coverLetterContent.roleMeta}
          </p>
        </div>
        <DownloadCoverLetterButton />
      </div>

      <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
        <div className="border-b border-[var(--color-border)] px-6 py-8 sm:px-10">
          <p className="text-label text-[var(--color-text-muted)]">{coverLetterContent.label}</p>
          <h2 className="mt-2 text-h3 font-semibold text-[var(--color-text-primary)]">
            {siteConfig.name}
          </h2>
          <p className="mt-1 text-body text-[var(--color-text-secondary)]">
            {coverLetterContent.headline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-[var(--color-text-secondary)]">
            <li>
              <a
                href={`mailto:${coverLetterContent.contact.email}`}
                className="text-[var(--color-accent)] hover:underline"
              >
                {coverLetterContent.contact.email}
              </a>
            </li>
            <li>{coverLetterContent.contact.phone}</li>
            <li>
              <a
                href={coverLetterContent.contact.linkedIn}
                className="text-[var(--color-accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={coverLetterContent.contact.portfolio}
                className="text-[var(--color-accent)] hover:underline"
              >
                {coverLetterContent.contact.portfolioLabel}
              </a>
            </li>
          </ul>
        </div>

        <div className="px-6 py-8 sm:px-10">
          <div className="mb-8 border-l-[3px] border-[var(--color-accent)] pl-4">
            <p className="text-body font-semibold text-[var(--color-text-primary)]">
              {coverLetterContent.roleTitle}
            </p>
            <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
              {coverLetterContent.roleMeta}
            </p>
          </div>

          <p className="mb-4 text-body text-[var(--color-text-primary)]">
            {coverLetterContent.greeting}
          </p>

          <div className="space-y-4">
            {coverLetterContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-body leading-relaxed text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 text-body text-[var(--color-text-secondary)]">
            {coverLetterContent.closing}
          </p>
          <p className="mt-1 text-body font-semibold text-[var(--color-text-primary)]">
            {coverLetterContent.signOff}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-6 py-4 sm:px-10">
          <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">
            {siteConfig.brand}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {coverLetterContent.contact.portfolioLabel}
          </p>
        </div>
      </article>
    </AdminShell>
  );
}
