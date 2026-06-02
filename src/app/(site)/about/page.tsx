import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SiteFeedbackSection } from "@/components/sections/SiteFeedbackSection";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, UX/UI designer focused on research-led product design.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="grid-bg text-white section-padding pb-12">
        <PageHero>
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
            A UX/UI designer who combines user research, co-design, and usability testing to build
            products people trust, especially in complex, high-stakes environments.
          </p>
        </PageHero>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
          <Reveal variant="scale" delay={80}>
            <div
              className="aspect-square rounded-2xl overflow-hidden max-w-[280px] border border-[var(--color-border)] bg-neutral-100"
              role="img"
              aria-label={`Photo of ${siteConfig.name}`}
            >
              <Image
                src="/images/profile.jpg"
                alt={`${siteConfig.name}, UX/UI designer`}
                width={794}
                height={1024}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <SectionLabel>Background</SectionLabel>
              <h2 className="text-h2 font-semibold mb-6">Your product design partner</h2>
              <div className="prose prose-neutral max-w-none text-body-lg text-[var(--color-text-secondary)] space-y-4">
                <p>
                  Research-led UX/UI design across discovery interviews, co-design workshops,
                  wireframes, prototypes, and usability testing. Recent work spans healthcare (OMRON,
                  NHS 111) and sustainability (Arbnco), where clarity and trust are non-negotiable.
                </p>
                <p>{siteConfig.quote}</p>
                <p>
                  Currently looking for UX/UI design roles where the work spans research, interaction
                  design, and prototyping: helping teams make better decisions with real user
                  evidence, not just polished screens.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/contact">Get in touch</Button>
                <Button href={siteConfig.cvUrl} variant="secondary">
                  View CV
                </Button>
                <Button href={siteConfig.linkedIn} variant="secondary" external>
                  LinkedIn
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFeedbackSection dark={false} />
    </>
  );
}
