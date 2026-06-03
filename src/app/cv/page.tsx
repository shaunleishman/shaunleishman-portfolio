import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { cvContent } from "@/content/cv";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { DownloadCvButton } from "@/components/cv/DownloadCvButton";
import { CvHeader, CvQuote, CvSection } from "@/components/cv/CvAnimatedSections";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "CV",
  description: `${siteConfig.name} UX/UI Designer CV`,
};

export default function CvPage() {
  return (
    <div className="cv-document min-h-screen bg-white text-[#0a0a0a]">
      <header className="cv-no-print border-b border-[#e5e5e5] bg-[#0a0a0a] text-white">
        <div className="container-site flex items-center justify-between gap-4 py-4">
          <Link href="/" className="min-h-[44px] inline-flex items-center">
            <SiteLogo className="text-body text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <DownloadCvButton />
            <Link
              href="/"
              className="text-body-sm text-neutral-400 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      <main data-cv-pdf-root className="container-site max-w-3xl py-10 md:py-14 print:py-8">
        <CvHeader>
          <p className="text-label uppercase tracking-widest text-[#737373] mb-3">CV</p>
          <h1 className="text-h2 font-semibold mb-2">{siteConfig.name}</h1>
          <p className="text-body-lg text-[#525252] mb-4">{cvContent.headline}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-body-sm text-[#525252]">
            <li>
              <a href={`mailto:${cvContent.contact.email}`} className="text-[#3b66f5] hover:underline">
                {cvContent.contact.email}
              </a>
            </li>
            <li>{cvContent.contact.phone}</li>
            <li>
              <a href={cvContent.contact.linkedIn} className="text-[#3b66f5] hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={cvContent.contact.portfolio} className="text-[#3b66f5] hover:underline">
                {siteConfig.brand}
              </a>
            </li>
          </ul>
        </CvHeader>

        <CvQuote>{siteConfig.quote}</CvQuote>

        <Reveal delay={120} variant="fade">
          <section className="mb-10 space-y-4 print:mb-8">
            {cvContent.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-body text-[#525252] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        </Reveal>

        <CvSection title="Key strengths" delay={40}>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 sm:items-start">
            {cvContent.strengths.map((item) => (
              <li key={item} className="flex gap-2 text-body-sm leading-snug text-[#525252]">
                <span className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-[#3b66f5]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Experience" delay={60}>
          <div className="space-y-8">
            {cvContent.experience.map((job) => (
              <article key={`${job.company}-${job.period}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-h4 font-semibold">
                    {job.role} · {job.company}
                  </h3>
                  <p className="text-body-sm text-[#737373] shrink-0">{job.period}</p>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((item) => (
                    <li key={item.slice(0, 32)} className="flex gap-2 text-body-sm leading-snug text-[#525252]">
                      <span className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-[#737373]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </CvSection>

        <CvSection title="Leadership, communication and AI" delay={40}>
          <p className="text-body-sm text-[#525252] leading-relaxed">{cvContent.leadership}</p>
        </CvSection>

        <CvSection title="Education" delay={40}>
          <ul className="space-y-3">
            {cvContent.education.map((item) => (
              <li key={item.title}>
                <p className="font-medium text-body">{item.title}</p>
                <p className="text-body-sm text-[#737373]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Skills" delay={40}>
          <div className="space-y-4">
            {cvContent.skills.map((group) => (
              <div key={group.label}>
                <p className="text-body-sm font-semibold mb-1">{group.label}</p>
                <p className="text-body-sm text-[#525252] leading-relaxed">{group.items}</p>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection title="Interests" delay={40}>
          <p className="text-body-sm text-[#525252] leading-relaxed">{cvContent.interests}</p>
        </CvSection>

        <Reveal delay={60}>
          <footer className="mt-12 pt-6 border-t border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 print:mt-8">
            <SiteLogo className="text-body" />
            <p className="text-body-sm text-[#737373]">{siteConfig.brand}</p>
          </footer>
        </Reveal>
      </main>
    </div>
  );
}
