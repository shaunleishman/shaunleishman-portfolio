"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { CvDownloadIconButton } from "@/components/cv/CvDownloadIconButton";
import { IconBadge } from "@/components/ui/IconBadge";

type ContactCvCardProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function ContactCvCard({ title, description, href, label }: ContactCvCardProps) {
  return (
    <article className="surface-card-interactive relative flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-6">
      <CvDownloadIconButton className="absolute top-4 right-4" />
      <IconBadge icon={FileText} size="lg" variant="light" className="mb-4" />
      <h2 className="text-h4 font-semibold mb-2 pr-10">{title}</h2>
      <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-1">{description}</p>
      <Link
        href={href}
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-body-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-text-primary)]"
      >
        {label}
      </Link>
    </article>
  );
}
