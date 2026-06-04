import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { CONSENT_CATEGORIES } from "@/lib/consent";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "How this portfolio uses cookies and analytics.",
};

export default function PrivacyPage() {
  return (
    <div className="section-padding container-site max-w-3xl">
      <p className="text-label text-[var(--color-text-muted)] mb-2">Legal</p>
      <h1 className="text-h2 font-semibold mb-4">Privacy & cookies</h1>
      <p className="text-body text-[var(--color-text-secondary)] mb-8 leading-relaxed">
        This page explains how {siteConfig.name}&apos;s portfolio ({siteConfig.domain}) uses cookies and
        similar technologies. The site is operated as a personal portfolio, not as a commercial data broker.
      </p>

      <section className="mb-8">
        <h2 className="text-h4 font-semibold mb-3">Cookie categories</h2>
        <ul className="space-y-4">
          {CONSENT_CATEGORIES.map((category) => (
            <li
              key={category.id}
              className="rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <h3 className="text-body font-semibold mb-1">
                {category.title}
                {category.required ? (
                  <span className="ml-2 font-normal text-[var(--color-text-muted)]">(required)</span>
                ) : (
                  <span className="ml-2 font-normal text-[var(--color-text-muted)]">(optional)</span>
                )}
              </h3>
              <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-h4 font-semibold mb-3">What we collect when analytics is on</h2>
        <ul className="list-disc pl-5 space-y-2 text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
          <li>Pages visited and approximate scroll depth</li>
          <li>Sections that come into view</li>
          <li>Anonymous session identifiers (stored in your browser, not used for advertising)</li>
          <li>Aggregated mouse dwell patterns for heatmaps (no personal identification)</li>
          <li>Optional feedback, likes, or share actions you choose to submit</li>
        </ul>
        <p className="mt-4 text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
          Data is stored to help improve the portfolio. It is not sold or used for third-party advertising.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-h4 font-semibold mb-3">Your choices</h2>
        <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
          The cookie banner appears on each visit until you choose Accept all. Rejecting optional cookies
          only applies to your current visit; we will ask again next time. You can change analytics on or
          off later in cookie settings after you have accepted.
        </p>
        <CookieSettingsButton className="text-[var(--color-accent)] font-medium underline-offset-2 hover:underline min-h-[44px] inline-flex items-center" />
      </section>

      <section>
        <h2 className="text-h4 font-semibold mb-3">Contact</h2>
        <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
          Questions about privacy? Email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-accent)] underline underline-offset-2">
            {siteConfig.email}
          </a>
          . You can also return to the{" "}
          <Link href="/" className="text-[var(--color-accent)] underline underline-offset-2">
            home page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
