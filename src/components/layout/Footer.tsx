import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { siteConfig } from "@/content/projects";
import { SiteLogoLink } from "@/components/layout/SiteLogo";

const footerLinks = {
  pages: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
  social: [
    { href: siteConfig.linkedIn, label: "LinkedIn", linkedIn: true, external: true as const },
    { href: siteConfig.cvUrl, label: "CV", icon: FileText, external: false as const },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-dark)] bg-[var(--color-bg-dark)] text-white">
      <div className="container-site section-padding pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <SiteLogoLink className="text-body mb-4 text-white" />
            <p className="text-body-sm text-neutral-400 max-w-xs">
              UX/UI designer focused on research-led product design for healthcare,
              public services, and sustainability.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-label text-neutral-500 mb-4">Pages</p>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-300 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <p className="text-label text-neutral-500 mb-4">Connect</p>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => {
                const className =
                  "text-body-sm text-neutral-300 hover:text-white transition-colors min-h-[44px] inline-flex items-center gap-2";
                const icon = "linkedIn" in link && link.linkedIn ? (
                  <LinkedInIcon size={16} />
                ) : link.icon ? (
                  <link.icon size={16} strokeWidth={1.75} aria-hidden />
                ) : null;

                return (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className={className}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {icon}
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={className}>
                        {icon}
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-body-sm text-neutral-300 hover:text-white transition-colors min-h-[44px] inline-flex items-center gap-2"
                >
                  <Mail size={16} strokeWidth={1.75} aria-hidden />
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-body-sm text-neutral-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built for accessibility and performance.</p>
        </div>
      </div>
    </footer>
  );
}
