"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SiteLogoLink } from "@/components/layout/SiteLogo";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function MobileMenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-6 w-6 flex-col items-center justify-center" aria-hidden="true">
      <span
        className={cn(
          "absolute block h-0.5 w-6 rounded-full bg-current motion-safe:transition-all motion-safe:duration-300",
          open ? "translate-y-0 rotate-45" : "-translate-y-2",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 w-6 rounded-full bg-current motion-safe:transition-all motion-safe:duration-300",
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 w-6 rounded-full bg-current motion-safe:transition-all motion-safe:duration-300",
          open ? "translate-y-0 -rotate-45" : "translate-y-2",
        )}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isDarkHero =
    pathname === "/" ||
    pathname.startsWith("/work") ||
    pathname === "/about" ||
    pathname.startsWith("/blog") ||
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
        <SiteLogoLink ariaCurrent={pathname === "/"} className="text-body" />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-body-sm font-medium transition-colors hover:opacity-80 min-h-[44px] inline-flex items-center",
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
                  {(pathname === link.href || pathname.startsWith(`${link.href}/`)) && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--color-accent)] motion-safe:animate-[scale-in_0.2s_ease-out]"
                      aria-hidden
                    />
                  )}
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
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          <MobileMenuIcon open={menuOpen} />
        </button>
      </div>

      <div className="lg:hidden" aria-hidden={!menuOpen}>
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          className={cn(
            "fixed inset-0 top-16 z-40 bg-black/50 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />

        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          inert={menuOpen ? undefined : true}
          className={cn(
            "fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b shadow-lg motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
            isDarkHero
              ? "border-white/10 bg-[var(--color-bg-dark)]/95 backdrop-blur-md"
              : "border-[var(--color-border)] bg-white/95 backdrop-blur-md",
          )}
        >
          <ul className="container-site flex flex-col py-4">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={cn(
                  "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
                  menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                )}
                style={menuOpen ? { transitionDelay: `${80 + index * 40}ms` } : undefined}
              >
                <Link
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block py-3 text-body font-medium min-h-[44px]"
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              className={cn(
                "pt-2 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
                menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
              )}
              style={menuOpen ? { transitionDelay: `${80 + navLinks.length * 40}ms` } : undefined}
            >
              <Button href="/contact" variant={isDarkHero ? "inverse" : "primary"}>
                Let&apos;s talk
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
