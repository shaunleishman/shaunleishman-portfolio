import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { cvContent } from "@/content/cv";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { PrintCvButton } from "@/components/cv/PrintCvButton";

export const metadata: Metadata = {
  title: "CV",
  description: `${siteConfig.name} — UX/UI Designer CV`,
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
            <PrintCvButton />
            <Link
              href="/"
              className="text-body-sm text-neutral-400 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="container-site max-w-3xl py-10 md:py-14 print:py-8">
        <div className="mb-8 border-b border-[#e5e5e5] pb-8 print:mb-6 print:pb-6">
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
        </div>

        <blockquote className="mb-10 border-l-4 border-[#3b66f5] pl-5 text-body-lg italic text-[#525252] print:mb-8">
          {siteConfig.quote}
        </blockquote>

        <section className="mb-10 space-y-4 print:mb-8">
          {cvContent.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body text-[#525252] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

        <CvSection title="Key strengths">
          <ul className="grid gap-2 sm:grid-cols-2">
            {cvContent.strengths.map((item) => (
              <li key={item} className="text-body-sm text-[#525252] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#3b66f5]">
                {item}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Experience">
          <div className="space-y-8">
            {cvContent.experience.map((job) => (
              <article key={`${job.company}-${job.period}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="text-h4 font-semibold">
                    {job.role} — {job.company}
                  </h3>
                  <p className="text-body-sm text-[#737373] shrink-0">{job.period}</p>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((item) => (
                    <li key={item.slice(0, 32)} className="text-body-sm text-[#525252] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#737373]">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </CvSection>

        <CvSection title="Leadership, communication and AI">
          <p className="text-body-sm text-[#525252] leading-relaxed">{cvContent.leadership}</p>
        </CvSection>

        <CvSection title="Education">
          <ul className="space-y-3">
            {cvContent.education.map((item) => (
              <li key={item.title}>
                <p className="font-medium text-body">{item.title}</p>
                <p className="text-body-sm text-[#737373]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Skills">
          <div className="space-y-4">
            {cvContent.skills.map((group) => (
              <div key={group.label}>
                <p className="text-body-sm font-semibold mb-1">{group.label}</p>
                <p className="text-body-sm text-[#525252] leading-relaxed">{group.items}</p>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection title="Interests">
          <p className="text-body-sm text-[#525252] leading-relaxed">{cvContent.interests}</p>
        </CvSection>

        <footer className="mt-12 pt-6 border-t border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 print:mt-8">
          <SiteLogo className="text-body" />
          <p className="text-body-sm text-[#737373]">{siteConfig.brand}</p>
        </footer>
      </main>
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 print:mb-8">
      <h2 className="text-label uppercase tracking-widest text-[#3b66f5] mb-4">{title}</h2>
      {children}
    </section>
  );
}
