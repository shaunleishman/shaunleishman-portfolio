import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — UX/UI designer focused on research-led product design.`,
};

export default function AboutPage() {
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
                About
              </li>
            </ol>
          </nav>
          <h1 className="text-h1 font-semibold mb-4">
            I&apos;m {siteConfig.name}
          </h1>
          <p className="text-body-lg text-neutral-300">
            A UX/UI designer who combines user research, co-design, and usability
            testing to build products people trust — especially in complex, high-stakes
            environments.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
          <div
            className="aspect-square rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 max-w-[280px]"
            role="img"
            aria-label="Portrait of Shaun Leishman"
          />

          <div>
            <SectionLabel>Background</SectionLabel>
            <h2 className="text-h2 font-semibold mb-6">Your product design partner</h2>
            <div className="prose prose-neutral max-w-none text-body-lg text-[var(--color-text-secondary)] space-y-4">
              <p>
                I specialise in research-led UX/UI design — from discovery interviews
                and co-design workshops through to wireframes, prototypes, and
                usability testing. My recent work spans healthcare (OMRON, NHS 111)
                and sustainability (Arbnco), where clarity and trust are non-negotiable.
              </p>
              <p>
                {siteConfig.quote}
              </p>
              <p>
                I&apos;m currently looking for UX/UI design roles where I can contribute
                across the full design process — not just pushing pixels, but helping
                teams make better decisions with real user evidence.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/contact">Get in touch</Button>
              <Button href={siteConfig.cvUrl} variant="secondary" external>
                Download CV
              </Button>
              <Button href={siteConfig.linkedIn} variant="secondary" external>
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        dark={false}
        title="Let's connect"
        description="Whether you're hiring or just want to talk design, I'd love to hear from you."
      />
    </>
  );
}
