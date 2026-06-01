import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { siteConfig } from "@/content/projects";
import { ContactCvCard } from "@/components/contact/ContactCvCard";
import { EmailCopyAction } from "@/components/contact/EmailCopyAction";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — open to UX/UI design opportunities.`,
};

const contactMethods: Array<{
  title: string;
  description: string;
  href: string;
  label: string;
  external: boolean;
  icon?: LucideIcon;
  customIcon?: React.ReactNode;
}> = [
  {
    title: "Email",
    description: "Best for role enquiries and introductions.",
    href: `mailto:${siteConfig.email}`,
    label: siteConfig.email,
    icon: Mail,
    external: false,
  },
  {
    title: "LinkedIn",
    description: "Connect and message me directly.",
    href: siteConfig.linkedIn,
    label: "Connect on LinkedIn",
    customIcon: <LinkedInIcon size={24} />,
    external: true,
  },
  {
    title: "CV",
    description: "View my experience and download as PDF.",
    href: siteConfig.cvUrl,
    label: "View CV",
    icon: FileText,
    external: false,
  },
];

export default function ContactPage() {
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
                Contact
              </li>
            </ol>
          </nav>
          <h1 className="text-h1 font-semibold mb-4">Let&apos;s talk</h1>
          <p className="text-body-lg text-neutral-300">
            I&apos;m actively looking for UX/UI design roles. The fastest way to reach
            me is email or LinkedIn.
          </p>
        </PageHero>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {contactMethods.map((method, index) => (
              <Reveal key={method.title} delay={index * 70}>
                {method.title === "CV" ? (
                  <ContactCvCard
                    title={method.title}
                    description={method.description}
                    href={method.href}
                    label={method.label}
                  />
                ) : (
                  <article className="surface-card-interactive flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-6">
                    <IconBadge
                      icon={method.icon}
                      size="lg"
                      variant="light"
                      className="mb-4"
                    >
                      {method.customIcon}
                    </IconBadge>
                    <h2 className="text-h4 font-semibold mb-2">{method.title}</h2>
                    <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-1">
                      {method.description}
                    </p>
                    {method.title === "Email" ? (
                      <EmailCopyAction />
                    ) : (
                      <a
                        href={method.href}
                        className="text-body-sm font-medium text-[var(--color-accent)] hover:underline min-h-[44px] inline-flex items-center"
                        {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {method.label}
                      </a>
                    )}
                  </article>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
