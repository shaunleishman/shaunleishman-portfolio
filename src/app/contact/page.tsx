import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — open to UX/UI design opportunities.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <div className="container-site max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex gap-2 text-body-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-white">
                Contact
              </li>
            </ol>
          </nav>
          <h1 className="text-h1 font-semibold mb-4">Let&apos;s talk</h1>
          <p className="text-body-lg text-neutral-300">
            I&apos;m actively looking for UX/UI design roles. The fastest way to reach
            me is email or LinkedIn.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-h4 font-semibold mb-2">Email</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-body-lg text-[var(--color-accent)] hover:underline min-h-[44px] inline-flex items-center"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <h2 className="text-h4 font-semibold mb-2">LinkedIn</h2>
              <a
                href={siteConfig.linkedIn}
                className="text-body-lg text-[var(--color-accent)] hover:underline min-h-[44px] inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div>
              <h2 className="text-h4 font-semibold mb-2">CV</h2>
              <Button href={siteConfig.cvUrl} external variant="secondary">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
