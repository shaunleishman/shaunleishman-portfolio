"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/projects";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isDarkHero =
    pathname === "/" ||
    pathname.startsWith("/work/") ||
    pathname === "/about" ||
    pathname === "/contact";

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        isDarkHero
          ? "border-white/10 bg-[var(--color-bg-dark)]/90 backdrop-blur-md text-white"
          : "border-[var(--color-border)] bg-white/90 backdrop-blur-md text-[var(--color-text-primary)]",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Link
          href="/"
          className="text-body font-semibold tracking-tight focus-visible:outline-offset-4"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {siteConfig.name.toLowerCase().replace(" ", "")}.design
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-body-sm font-medium transition-colors hover:opacity-80 min-h-[44px] inline-flex items-center",
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "opacity-100"
                      : "opacity-70",
                  )}
                  aria-current={
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/contact"
            variant={isDarkHero ? "inverse" : "primary"}
            className="!py-2.5 !px-5"
          >
            Let&apos;s talk
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={cn(
            "lg:hidden border-t",
            isDarkHero ? "border-white/10 bg-[var(--color-bg-dark)]" : "border-[var(--color-border)] bg-white",
          )}
        >
          <ul className="container-site flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-body font-medium min-h-[44px]"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button href="/contact" variant={isDarkHero ? "inverse" : "primary"}>
                Let&apos;s talk
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
