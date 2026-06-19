"use client";

import Image from "next/image";
import { ChevronDown, Globe, Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRedesignPreview } from "./RedesignPreviewContext";
import {
  RedesignCalloutMarkers,
  RedesignCalloutRegion,
  RedesignCalloutsLegend,
} from "./RedesignFindingIndicator";

const ASSETS = {
  hero: "/metrics/case-studies/mg-employees/redesign/hero-flexing-muscles-swimmer-desktop.jpg",
  logo: "/metrics/case-studies/mg-employees/redesign/pru-logo.svg",
} as const;

/** Live-site palette from evaluation screenshots (June 2026) */
const PRU = {
  teal: "#004B4D",
  dark: "#333333",
  yellow: "#FFB81C",
  peach: "#F3EBE8",
  charcoal: "#2F2F2F",
  brownGrey: "#3B352E",
  lightGrey: "#F8F8F8",
} as const;

/** Shared page layout — one gutter and content width across all sections */
const PAGE_GUTTER = "px-4 sm:px-6";
const CONTENT = "mx-auto w-full max-w-5xl";

/** Shared vertical rhythm — update once to restyle spacing across the mock */
const PRU_SPACE = {
  /** Section padding (top/bottom of each band) */
  section: "py-12",
  /** Scroll offset for in-page anchor links (clears sticky header) */
  scrollAnchor: "scroll-mt-20",
  /** h1/h2 → first paragraph */
  titleToBody: "mt-3",
  /** Paragraph → list or secondary block */
  bodyToBlock: "mt-4",
  /** Content block → buttons or link group */
  blockToActions: "mt-6",
  /** Section heading → first child (grid, accordion, etc.) */
  sectionTitleToContent: "mt-6",
  /** Tighter stack for card title → description */
  cardTitleToBody: "mt-2",
  /** Card body → action link */
  cardBodyToAction: "mt-6",
  /** Vertical link lists */
  linkStack: "flex flex-col items-start gap-3",
  /** Horizontal button rows */
  buttonRow: "flex flex-wrap items-center gap-3",
  /** Two-column content sections */
  gridTwoCol: "grid gap-8 md:grid-cols-2",
  /** Task card row */
  gridThreeCol: "grid gap-4 sm:grid-cols-3",
  /** Supporting info tile grid */
  gridTiles: "grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3",
  /** Grey / callout panels */
  panel: "p-6 md:p-8",
  /** FAQ accordion stack */
  accordionStack: "flex flex-col gap-4",
} as const;

/** Shared typography — update once to restyle headings across the mock */
const PRU_TYPE = {
  sectionTitle: "text-[1.25rem] font-normal text-neutral-900",
  cardTitle: "text-[1.125rem] font-normal leading-snug text-neutral-900",
  cardTitleHover: "group-hover:underline group-hover:underline-offset-2",
  body: "text-[0.875rem] leading-relaxed text-neutral-600",
  bodySmall: "text-[0.8125rem] leading-relaxed text-neutral-600",
} as const;

/** Typography on dark (charcoal) bands */
const PRU_TYPE_ON_DARK = {
  sectionTitle: "text-[1.25rem] font-normal text-white",
  body: "text-[0.875rem] leading-relaxed text-neutral-300",
  bodyLarge: "text-[0.9375rem] leading-relaxed text-neutral-300",
  link: "inline-flex cursor-pointer items-center gap-1.5 text-[0.875rem] text-white underline underline-offset-2 transition-opacity hover:opacity-80",
} as const;

type PrototypeView = "home" | "login" | "register";

type SectionKey =
  | "workplace-pensions"
  | "avc"
  | "faq"
  | "important-info"
  | "manage-online"
  | "supporting-info";

type FaqCta = {
  label: string;
  external?: boolean;
  action?: "login" | "register";
  variant?: "link" | "button";
  /** When variant is "button" — defaults to outlined teal secondary */
  buttonStyle?: "primary" | "secondary" | "dark";
};

type FaqItem = {
  question: string;
  answer: string;
  ctas?: FaqCta[];
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Am I enrolled already?",
    answer:
      "If you meet the eligibility criteria and work for a participating employer, you are usually enrolled automatically. Check with your employer or log in to confirm your status.",
    ctas: [{ label: "Log in to check your status", action: "login", external: true }],
  },
  {
    question: "How do I log in?",
    answer:
      "Use the email address linked to your pension and the password you set when registering.",
    ctas: [
      { label: "Log in", action: "login", external: true },
      { label: "Register for online access", action: "register", external: true },
    ],
  },
  {
    question: "What is an AVC?",
    answer:
      "An Additional Voluntary Contribution (AVC) is extra money you save on top of your main workplace pension to boost your retirement income.",
    ctas: [
      { label: "Local Government AVC scheme", external: true },
      { label: "Group AVC scheme website", external: true },
    ],
  },
  {
    question: "How do I make changes to my plan?",
    answer:
      "Contact your employer to change contributions. To switch funds or update details, use the online service. Call 0345 600 0383 (Mon–Fri, 8:30am–6pm) if you need help.",
    ctas: [
      { label: "Log in to the online service", action: "login", external: true },
      { label: "How we use your personal data", external: true },
    ],
  },
  {
    question: "Additional product information",
    answer:
      "Key facts, charges, and terms for workplace pension products are available in your plan documents and product brochures.",
    ctas: [{ label: "Product information", variant: "button" }],
  },
];

const SUPPORTING_INFO_ITEMS = [
  {
    title: "Understand your obligations",
    description:
      "The Government has created an employer responsibility to automatically enrol eligible jobholders into a good pension plan, and to make contributions to it.",
  },
  {
    title: "Jargon buster",
    description: "Bite-sized explanations of terms used.",
  },
  {
    title: "The basics",
    description: "Answers to common questions about automatic enrolment.",
  },
  {
    title: "A Guide to administering your payroll",
    description:
      "Hints and tips to help make your payroll file submissions and payments a success every time.",
  },
  {
    title: "Prudential Corporate Pensions Trustee Limited (PCPTL)",
    description:
      "To make sure we offer customers value for money, like all who offer workplace contract-based plans, we answer to an independent group called the PCPTL",
  },
  {
    title: "Things to think about",
    description:
      "The rules are now in place and there are a number of issues you will need to consider to practically implement the regulations.",
  },
  {
    title: "Checklist",
    description: "There's a lot to do, our checklist could help you.",
  },
  {
    title: "Automatic enrolment & qualifying workplace pensions",
    description:
      "The law on workplace pensions has changed. Every employer with at least one member of staff now has new duties.",
  },
  {
    title: "New look simpler annual benefit statements",
    description:
      "Our updated statements have a simpler layout that highlights the most important information you need to know about your pension savings.",
  },
  {
    title: "Contact us",
    description:
      "If you are an Employer and want to discuss how we can work together or to find out more details about our corporate solutions, please contact us.",
  },
  {
    title: "Would you like to use your Prudential plan for qualifying purposes?",
    description:
      "If you would like your plan to qualify under the new rules, we may be able to help you, but you will need to let us know six months before your staging date.",
  },
  {
    title: "Better Workplace Pensions - we're here to help",
    description:
      "On the 6th April 2015, the Government introduced additional requirements for workplace pensions.",
  },
] as const;

const SUPPORTING_INFO_INITIAL_COUNT = 6;

const SUPPORTING_LINKS = [
  "Security and financial crime",
  "Sustainable Finance Disclosure Statement",
] as const;

const FOOTER_AUDIENCE_LINKS = [
  "Employees and Customers",
  "Employers",
  "Trustees",
  "Independent Governance Committee",
] as const;

const FOOTER_POLICY_LINKS = [
  "Privacy",
  "Terms and Conditions",
  "Accessibility",
  "Complaints",
  "Data Protection Notice",
  "Security and financial crime",
] as const;

const PRU_LEGAL_FOOTER =
  '"Prudential" is a trading name of Prudential Distribution Limited. Prudential Distribution Limited is registered in Scotland. Registered Office at 5 Central Way, Kildean Business Park, Stirling, FK8 1FT. Registered number SC212640. Authorised and regulated by the Financial Conduct Authority. Prudential Distribution Limited is part of the same corporate group as the Prudential Assurance Company Limited. The Prudential Assurance Company Limited and Prudential Distribution Limited are direct/indirect subsidiaries of M&G plc, a company incorporated in the United Kingdom. These companies are not affiliated in any manner with Prudential Financial, Inc, a company whose principal place of business is in the United States of America or Prudential plc, an international group incorporated in the United Kingdom.';

function PruExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={cn("size-3 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="1.5" y="1.5" width="7" height="7" rx="0.5" />
      <path d="M5 7 10.5 1.5M10.5 1.5H7M10.5 1.5V5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PRU_BUTTON_LAYOUT =
  "inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-2.5 text-[0.875rem] font-normal leading-none";

/** Filled primary buttons (teal / dark) — shared sizing and hover */
const PRU_BUTTON_FILLED = cn(PRU_BUTTON_LAYOUT, "text-white transition-opacity hover:opacity-90");

/** Outlined secondary — teal border and text; update PRU.teal to restyle everywhere */
const PRU_BUTTON_SECONDARY = cn(
  PRU_BUTTON_LAYOUT,
  "border bg-white transition-colors hover:bg-[#004B4D]/5",
);

function PruTealButton({
  children,
  className,
  onClick,
  showExternalIcon = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showExternalIcon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(PRU_BUTTON_FILLED, className)}
      style={{ backgroundColor: PRU.teal }}
    >
      {children}
      {showExternalIcon ? <PruExternalIcon className="text-white" /> : null}
    </button>
  );
}

function PruDarkButton({
  children,
  className,
  onClick,
  showExternalIcon = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showExternalIcon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(PRU_BUTTON_FILLED, className)}
      style={{ backgroundColor: PRU.dark }}
    >
      {children}
      {showExternalIcon ? <PruExternalIcon className="text-white" /> : null}
    </button>
  );
}

function PruSecondaryButton({
  children,
  className,
  onClick,
  showExternalIcon = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showExternalIcon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        PRU_BUTTON_SECONDARY,
        className,
      )}
      style={{ borderColor: PRU.teal, color: PRU.teal }}
    >
      {children}
      {showExternalIcon ? <PruExternalIcon /> : null}
    </button>
  );
}

function PruCookieButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-auto cursor-pointer whitespace-nowrap border border-neutral-800/25 bg-white px-3 py-1.5 text-center text-xs font-normal text-neutral-900 transition-colors hover:bg-neutral-50"
    >
      {children}
    </button>
  );
}

function PruUtilityBar() {
  return (
    <div
      className={cn("flex items-center justify-end gap-5 border-b border-neutral-700 py-2 text-[0.75rem] text-neutral-200", PAGE_GUTTER)}
      style={{ backgroundColor: PRU.charcoal }}
    >
      <span className="inline-flex items-center gap-1.5">
        <Globe className="size-3.5 stroke-[1.5]" aria-hidden />
        Employees and Customers
        <ChevronDown className="size-3 stroke-[2]" aria-hidden />
      </span>
      <Search className="size-3.5 stroke-[1.5]" aria-hidden />
    </div>
  );
}

function PruNavDropdown({
  label,
  open,
  onToggle,
  items,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: { label: string; onSelect: () => void }[];
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-[#004B4D]"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={cn("size-3.5 text-neutral-600 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[14rem] border border-neutral-200 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onSelect}
              className="block w-full cursor-pointer px-4 py-2 text-left text-[0.875rem] text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-[#004B4D]"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PruHeader({
  openDropdown,
  onToggleDropdown,
  onGoHome,
  onGoLogin,
  onGoRegister,
  onScrollToSection,
}: {
  openDropdown: "pensions" | "tools" | null;
  onToggleDropdown: (key: "pensions" | "tools") => void;
  onGoHome: () => void;
  onGoLogin: () => void;
  onGoRegister: () => void;
  onScrollToSection: (section: SectionKey) => void;
}) {
  const { showCallouts } = useRedesignPreview();

  return (
    <header className={cn("sticky top-0 z-40 overflow-visible border-b border-neutral-200 bg-white py-4", PAGE_GUTTER)}>
      <div className={cn(CONTENT, "flex items-center gap-3 sm:gap-6")}>
        <button type="button" onClick={onGoHome} className="shrink-0 cursor-pointer transition-opacity hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="Pru, part of M&G plc" className="h-9 w-auto sm:h-11" />
        </button>

        <nav className="hidden items-center gap-5 text-[0.875rem] text-neutral-800 sm:flex">
          <PruNavDropdown
            label="Learn about pensions"
            open={openDropdown === "pensions"}
            onToggle={() => onToggleDropdown("pensions")}
            items={[
              {
                label: "Workplace pensions",
                onSelect: () => onScrollToSection("workplace-pensions"),
              },
              {
                label: "Extra savings (AVC)",
                onSelect: () => onScrollToSection("avc"),
              },
              {
                label: "Common questions (FAQ)",
                onSelect: () => onScrollToSection("faq"),
              },
            ]}
          />
          <PruNavDropdown
            label="Tools"
            open={openDropdown === "tools"}
            onToggle={() => onToggleDropdown("tools")}
            items={[
              {
                label: "Online service",
                onSelect: () => onScrollToSection("manage-online"),
              },
            ]}
          />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <PruSecondaryButton onClick={onGoRegister} showExternalIcon={false} className="!px-3 sm:!px-6">
            Register
          </PruSecondaryButton>
          <PruTealButton onClick={onGoLogin} className="!px-3 sm:!px-6">
            Log in
          </PruTealButton>
        </div>
      </div>
      {showCallouts ? (
        <>
          <RedesignCalloutMarkers findingIds={["HE-003", "HE-002"]} />
        </>
      ) : null}
    </header>
  );
}

function PruMockForm({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
}) {
  return (
    <main className="mx-auto max-w-md px-6 py-12 text-left">
      <h1 className="text-[1.75rem] font-light text-[#3B352E]">{title}</h1>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-600">{subtitle}</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="prototype-email" className="block text-[0.8125rem] font-medium text-neutral-800">
            Email address
          </label>
          <input
            id="prototype-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-[0.9375rem] text-neutral-900 outline-none focus:border-[#004B4D] focus:ring-1 focus:ring-[#004B4D]"
          />
        </div>
        <div>
          <label htmlFor="prototype-password" className="block text-[0.8125rem] font-medium text-neutral-800">
            Password
          </label>
          <input
            id="prototype-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-[0.9375rem] text-neutral-900 outline-none focus:border-[#004B4D] focus:ring-1 focus:ring-[#004B4D]"
          />
        </div>
        <PruDarkButton className="w-full" showExternalIcon={false}>
          Continue
        </PruDarkButton>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 cursor-pointer text-[0.875rem] text-[#004B4D] underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        Back to employees page
      </button>
    </main>
  );
}

function FaqCtaButton({
  cta,
  onLogin,
  onRegister,
}: {
  cta: FaqCta;
  onLogin: () => void;
  onRegister: () => void;
}) {
  if (cta.variant === "button") {
    const buttonStyle = cta.buttonStyle ?? "secondary";

    if (buttonStyle === "primary") {
      return <PruTealButton showExternalIcon={false}>{cta.label}</PruTealButton>;
    }
    if (buttonStyle === "dark") {
      return <PruDarkButton showExternalIcon={false}>{cta.label}</PruDarkButton>;
    }
    return <PruSecondaryButton showExternalIcon={false}>{cta.label}</PruSecondaryButton>;
  }

  const handleClick = () => {
    if (cta.action === "login") onLogin();
    if (cta.action === "register") onRegister();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex cursor-pointer items-center gap-1.5 text-[0.8125rem] text-[#004B4D] underline underline-offset-2 transition-opacity hover:opacity-80"
    >
      {cta.label}
      {cta.external ? <PruExternalIcon /> : null}
    </button>
  );
}

function PruCookieBar({ onDismiss }: { onDismiss: () => void }) {
  const { immersive, showCallouts, callouts } = useRedesignPreview();

  return (
    <RedesignCalloutRegion
      calloutId="HE-008"
      callouts={callouts}
      showMarkers={showCallouts}
      tooltipPlacement="above"
      markerClassName="bottom-3 right-3 top-auto"
      className={cn(immersive && "fixed inset-x-0 bottom-0 z-40")}
    >
      <div
        role="region"
        aria-label="Cookie preferences"
        className={cn(
          "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 text-left sm:gap-x-6",
          immersive && "shadow-[0_-4px_24px_rgba(0,0,0,0.15)]",
        )}
        style={{ backgroundColor: PRU.yellow }}
      >
      <div className="min-w-0 max-w-2xl flex-1">
        <p className="text-sm font-bold leading-tight text-neutral-900">Optimise your browsing experience</p>
        <p className="mt-0.5 text-xs leading-snug text-neutral-900">
          We use cookies to run this site and improve your experience. See our{" "}
          <span className="underline">cookie policy</span>.
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">
        <PruCookieButton onClick={onDismiss}>Accept optional cookies</PruCookieButton>
        <PruCookieButton onClick={onDismiss}>Essential cookies only</PruCookieButton>
        <PruCookieButton onClick={onDismiss}>More options</PruCookieButton>
      </div>
      </div>
    </RedesignCalloutRegion>
  );
}

function PruSiteFooter() {
  return (
    <footer className={cn("text-left text-neutral-200", PAGE_GUTTER, PRU_SPACE.section)} style={{ backgroundColor: PRU.charcoal }}>
      <div className={CONTENT}>
        <nav aria-label="Site audiences" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_AUDIENCE_LINKS.map((label) => (
            <button
              key={label}
              type="button"
              className="cursor-pointer text-[0.875rem] text-neutral-100 transition-opacity hover:opacity-80"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="Pru, part of M&G plc" className="h-11 w-auto bg-white px-2 py-1" />

          <nav aria-label="Legal and policy" className="flex flex-wrap gap-x-5 gap-y-2 md:max-w-xl md:justify-end">
            {FOOTER_POLICY_LINKS.map((label) => (
              <button
                key={label}
                type="button"
                className="cursor-pointer text-[0.8125rem] text-neutral-300 underline underline-offset-2 transition-opacity hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t border-neutral-600 pt-6 text-[0.6875rem] leading-relaxed text-neutral-400">
          {PRU_LEGAL_FOOTER}
        </p>
      </div>
    </footer>
  );
}

/**
 * Live Pru/M&G layout and component styles, with heuristic evaluation fixes applied
 * in content and hierarchy only (task cards, plain language, Log in prominence, etc.).
 */
export function MgEmployeesRedesign() {
  const { immersive, showCallouts, callouts } = useRedesignPreview();
  const [view, setView] = useState<PrototypeView>("home");
  const [openDropdown, setOpenDropdown] = useState<"pensions" | "tools" | null>(null);
  const [cookieDismissed, setCookieDismissed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});
  const [supportingInfoExpanded, setSupportingInfoExpanded] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    "workplace-pensions": null,
    avc: null,
    faq: null,
    "important-info": null,
    "manage-online": null,
    "supporting-info": null,
  });

  const closeDropdowns = useCallback(() => setOpenDropdown(null), []);

  const scrollToSection = useCallback((section: SectionKey) => {
    closeDropdowns();
    setView("home");
    requestAnimationFrame(() => {
      sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [closeDropdowns]);

  const goHome = useCallback(() => {
    closeDropdowns();
    setView("home");
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [closeDropdowns]);

  const goLogin = useCallback(() => {
    closeDropdowns();
    setView("login");
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [closeDropdowns]);

  const goRegister = useCallback(() => {
    closeDropdowns();
    setView("register");
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [closeDropdowns]);

  const toggleDropdown = useCallback((key: "pensions" | "tools") => {
    setOpenDropdown((current) => (current === key ? null : key));
  }, []);

  const toggleFaq = useCallback((question: string) => {
    setExpandedFaq((current) => ({ ...current, [question]: !current[question] }));
  }, []);

  const setSectionRef = useCallback(
    (key: SectionKey) => (node: HTMLElement | null) => {
      sectionRefs.current[key] = node;
    },
    [],
  );

  return (
    <div
      ref={topRef}
      className={cn(
        "w-full bg-white font-sans text-[#333333] antialiased",
        immersive ? "min-h-screen pb-28" : "overflow-hidden",
      )}
    >
      <PruUtilityBar />

      <PruHeader
        openDropdown={openDropdown}
        onToggleDropdown={toggleDropdown}
        onGoHome={goHome}
        onGoLogin={goLogin}
        onGoRegister={goRegister}
        onScrollToSection={scrollToSection}
      />

      {view === "login" ? (
        <PruMockForm
          title="Log in"
          subtitle="Access your pension online to check your balance, view documents, and manage your policy."
          onBack={goHome}
        />
      ) : null}

      {view === "register" ? (
        <PruMockForm
          title="Register for online access"
          subtitle="Create your online account to manage your workplace pension in one secure place."
          onBack={goHome}
        />
      ) : null}

      {view === "home" ? (
        <>
          {/* Hero — heading, image, task cards as one visual unit */}
          <section className="bg-white text-center">
            <div className={cn(CONTENT, PAGE_GUTTER, "pt-12 pb-10")}>
              <RedesignCalloutRegion calloutId="HE-004" callouts={callouts} showMarkers={showCallouts}>
                <h1 className="text-[2rem] font-light leading-tight text-[#3B352E] sm:text-[2.125rem]">
                  Pensions through your employer
                </h1>
                <p className={cn("mx-auto max-w-3xl text-[0.9375rem] font-light leading-relaxed text-[#3B352E]/90", PRU_SPACE.titleToBody)}>
                  Pick what you want to do. Check your pension online, learn the basics, or explore extra savings.
                </p>
              </RedesignCalloutRegion>
            </div>

            <div className="w-full">
              <Image
                src={ASSETS.hero}
                alt=""
                width={1720}
                height={616}
                className="block h-auto w-full"
                priority
                sizes="100vw"
              />
            </div>

            <div className={cn(PAGE_GUTTER, "pb-12 pt-10")}>
              <RedesignCalloutRegion
                calloutId="HE-001"
                callouts={callouts}
                showMarkers={showCallouts}
                className={cn(CONTENT, PRU_SPACE.gridThreeCol, "text-left")}
              >
                {[
                  {
                    title: "Check my pension online",
                    text: "Log in to see your balance and documents.",
                    action: "Log in",
                    primary: true,
                    onClick: goLogin,
                  },
                  {
                    title: "Learn about workplace pensions",
                    text: "Plain-English guide to how it works.",
                    action: "Find out more",
                    primary: false,
                    onClick: () => scrollToSection("workplace-pensions"),
                  },
                  {
                    title: "Apply for extra savings (AVC)",
                    text: "Save more on top of your main pension.",
                    action: "Find out more",
                    primary: false,
                    onClick: () => scrollToSection("avc"),
                  },
                ].map((card) => (
                  <button
                    key={card.title}
                    type="button"
                    onClick={card.onClick}
                    className="cursor-pointer border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-[#004B4D]/30 hover:bg-neutral-50"
                  >
                    <p className={PRU_TYPE.cardTitle}>{card.title}</p>
                    <p className={cn(PRU_SPACE.cardTitleToBody, PRU_TYPE.bodySmall)}>{card.text}</p>
                    <span
                      className={cn(
                        "inline-block text-[0.8125rem]",
                        PRU_SPACE.cardBodyToAction,
                        card.primary
                          ? "font-semibold text-[#004B4D]"
                          : "text-[#004B4D] underline underline-offset-2",
                      )}
                    >
                      {card.action}
                    </span>
                  </button>
                ))}
              </RedesignCalloutRegion>
            </div>
          </section>

          {/* Workplace pensions + AVC */}
          <section
            className={cn("text-left", PAGE_GUTTER, PRU_SPACE.section)}
            style={{ backgroundColor: PRU.charcoal }}
          >
            <div className={cn(CONTENT, PRU_SPACE.gridTwoCol)}>
              <RedesignCalloutRegion
                calloutId="HE-010"
                callouts={callouts}
                showMarkers={showCallouts}
                className={PRU_SPACE.scrollAnchor}
              >
                <div id="workplace-pensions" ref={setSectionRef("workplace-pensions")}>
                  <h2 className={PRU_TYPE_ON_DARK.sectionTitle}>Workplace pensions</h2>
                  <p className={cn(PRU_SPACE.titleToBody, PRU_TYPE_ON_DARK.bodyLarge)}>
                    Most UK employees earning over £10,000 are enrolled automatically. Your employer pays in, and you
                    can too.
                  </p>
                  <ul className={cn(PRU_SPACE.bodyToBlock, "list-disc space-y-1.5 pl-5", PRU_TYPE_ON_DARK.body)}>
                    <li>Aged 22 up to State Pension age</li>
                    <li>Earn more than £10,000 a year</li>
                    <li>Work in the UK</li>
                  </ul>
                  <div className={cn(PRU_SPACE.blockToActions, PRU_SPACE.linkStack)}>
                    <button type="button" className={PRU_TYPE_ON_DARK.link}>
                      Workplace Pension Guide
                      <PruExternalIcon />
                    </button>
                    <button type="button" className={PRU_TYPE_ON_DARK.link}>
                      Corporate Pensions Value Assessment
                      <PruExternalIcon />
                    </button>
                  </div>
                </div>
              </RedesignCalloutRegion>
              <div id="avc" ref={setSectionRef("avc")} className={PRU_SPACE.scrollAnchor}>
                <h2 className={PRU_TYPE_ON_DARK.sectionTitle}>Extra savings (AVC)</h2>
                <p className={cn(PRU_SPACE.titleToBody, PRU_TYPE_ON_DARK.bodyLarge)}>
                  An AVC is a separate pot you build alongside your workplace pension for extra retirement income.
                </p>
                <div className={cn(PRU_SPACE.blockToActions, PRU_SPACE.linkStack)}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("faq")}
                    className={PRU_TYPE_ON_DARK.link}
                  >
                    Find out about AVC schemes
                    <PruExternalIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("faq")}
                    className={PRU_TYPE_ON_DARK.link}
                  >
                    Apply for an AVC
                    <PruExternalIcon />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Important information */}
          <section
            id="important-info"
            ref={setSectionRef("important-info")}
            className={cn(PRU_SPACE.scrollAnchor, "bg-white text-left", PAGE_GUTTER, PRU_SPACE.section)}
          >
            <div className={CONTENT}>
              <div
                className={cn("border border-neutral-200 border-l-[6px] bg-white", PRU_SPACE.panel)}
                style={{ borderLeftColor: PRU.teal }}
              >
                <h2 className={PRU_TYPE.sectionTitle}>Important information</h2>
                <p className={cn(PRU_SPACE.titleToBody, "max-w-4xl", PRU_TYPE.body)}>
                  M&amp;G Wealth Advice can&apos;t provide advice on setting up new public sector Additional Voluntary
                  Contributions (AVCs). They can advise if you want to take money out of your plan.
                </p>
              </div>
            </div>
          </section>

          {/* Manage online */}
          <section
            id="manage-online"
            ref={setSectionRef("manage-online")}
            className={cn(PRU_SPACE.scrollAnchor, "bg-white text-left", PAGE_GUTTER, PRU_SPACE.section)}
          >
            <div className={cn(CONTENT, PRU_SPACE.gridTwoCol)}>
              <div className={cn("text-left", PRU_SPACE.panel)} style={{ backgroundColor: PRU.lightGrey }}>
                <h2 className={PRU_TYPE.sectionTitle}>Already have a policy with us?</h2>
                <p className={cn(PRU_SPACE.titleToBody, PRU_TYPE.body)}>
                  Guides, documents, and support for pensions or other products you already hold, not for opening
                  something new.
                </p>
                <div className={PRU_SPACE.blockToActions}>
                  <PruTealButton showExternalIcon={false}>View help for your products</PruTealButton>
                </div>
              </div>
              <RedesignCalloutRegion
                calloutId="HE-009"
                callouts={callouts}
                showMarkers={showCallouts}
                className={cn("text-left", PRU_SPACE.panel)}
                style={{ backgroundColor: PRU.lightGrey }}
              >
                <h2 className={PRU_TYPE.sectionTitle}>Manage your policy online</h2>
                <p className={cn(PRU_SPACE.titleToBody, PRU_TYPE.body)}>
                  Check value, update details, view documents, and send secure messages.
                </p>
                <div className={cn(PRU_SPACE.blockToActions, PRU_SPACE.buttonRow)}>
                  <PruTealButton onClick={goLogin}>Log in</PruTealButton>
                  <PruSecondaryButton onClick={goRegister}>Register for online access</PruSecondaryButton>
                </div>
                <button
                  type="button"
                  onClick={goLogin}
                  className={cn(
                    PRU_SPACE.bodyToBlock,
                    "inline-flex cursor-pointer items-center gap-1.5 text-[0.8125rem] text-neutral-700 underline underline-offset-2 transition-opacity hover:opacity-80",
                  )}
                >
                  Employers can log in via the employer portal
                  <PruExternalIcon />
                </button>
              </RedesignCalloutRegion>
            </div>
          </section>

          {/* FAQ — below manage online, before supporting links */}
          <section
            id="faq"
            ref={setSectionRef("faq")}
            className={cn(PRU_SPACE.scrollAnchor, "bg-white text-left", PAGE_GUTTER, PRU_SPACE.section)}
          >
            <div className={CONTENT}>
              <h2 className={PRU_TYPE.sectionTitle}>Common questions</h2>
              <RedesignCalloutRegion
                calloutId="HE-005"
                callouts={callouts}
                showMarkers={showCallouts}
                className={PRU_SPACE.sectionTitleToContent}
              >
                <div className={PRU_SPACE.accordionStack}>
                  {FAQ_ITEMS.map((item) => {
                    const expanded = expandedFaq[item.question] ?? false;

                    return (
                      <div
                        key={item.question}
                        className="border border-neutral-200 text-[0.875rem] text-neutral-800"
                        style={{ backgroundColor: PRU.lightGrey }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(item.question)}
                          className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-200/40"
                          aria-expanded={expanded}
                        >
                          {item.question}
                          <ChevronDown
                            className={cn(
                              "size-4 shrink-0 text-neutral-500 transition-transform",
                              expanded && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                        {expanded ? (
                          <div className="border-t border-neutral-200 bg-white px-5 py-4">
                            <p className={PRU_TYPE.bodySmall}>{item.answer}</p>
                            {item.ctas?.length ? (
                              <div className={cn(PRU_SPACE.blockToActions, PRU_SPACE.linkStack)}>
                                {item.ctas.map((cta) => (
                                  <FaqCtaButton
                                    key={cta.label}
                                    cta={cta}
                                    onLogin={goLogin}
                                    onRegister={goRegister}
                                  />
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </RedesignCalloutRegion>
            </div>
          </section>

          {/* Supporting information */}
          <section
            id="supporting-info"
            ref={setSectionRef("supporting-info")}
            className={cn(PRU_SPACE.scrollAnchor, "text-left", PAGE_GUTTER, PRU_SPACE.section)}
            style={{ backgroundColor: PRU.peach }}
          >
            <div className={CONTENT}>
              <h2 className={PRU_TYPE.sectionTitle}>Supporting information</h2>
              <RedesignCalloutRegion
                calloutId="HE-011"
                callouts={callouts}
                showMarkers={showCallouts}
                className={PRU_SPACE.sectionTitleToContent}
              >
                <div className={PRU_SPACE.gridTiles}>
                  {(supportingInfoExpanded
                    ? SUPPORTING_INFO_ITEMS
                    : SUPPORTING_INFO_ITEMS.slice(0, SUPPORTING_INFO_INITIAL_COUNT)
                  ).map((item) => (
                    <article key={item.title} className="h-full">
                      <button
                        type="button"
                        className="group flex h-full min-h-[9.5rem] w-full flex-col cursor-pointer rounded-sm border border-neutral-400/30 p-5 text-left transition-colors hover:border-[#004B4D]/40 hover:bg-black/[0.04]"
                      >
                        <h3 className={cn(PRU_TYPE.cardTitle, PRU_TYPE.cardTitleHover)}>
                          {item.title}
                        </h3>
                        <p className={cn(PRU_SPACE.cardTitleToBody, "flex-1", PRU_TYPE.bodySmall)}>{item.description}</p>
                      </button>
                    </article>
                  ))}
                </div>
                <div className={cn(PRU_SPACE.blockToActions, "flex flex-wrap items-center gap-4")}>
                  <p className="text-[0.75rem] text-neutral-500">
                    Displaying 1 -{" "}
                    {supportingInfoExpanded ? SUPPORTING_INFO_ITEMS.length : SUPPORTING_INFO_INITIAL_COUNT} Of{" "}
                    {SUPPORTING_INFO_ITEMS.length}
                  </p>
                  {supportingInfoExpanded ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSupportingInfoExpanded(false);
                        requestAnimationFrame(() => {
                          sectionRefs.current["supporting-info"]?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        });
                      }}
                      className="cursor-pointer text-[0.875rem] text-[#004B4D] underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      Show less
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSupportingInfoExpanded(true)}
                      className="cursor-pointer text-[0.875rem] text-[#004B4D] underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      Show more
                    </button>
                  )}
                </div>
              </RedesignCalloutRegion>
              <ul className={cn(PRU_SPACE.blockToActions, "space-y-3 border-t border-neutral-300/60 pt-8")}>
                {SUPPORTING_LINKS.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1.5 text-[0.875rem] text-neutral-800 transition-opacity hover:underline hover:underline-offset-2 hover:opacity-80"
                    >
                      {label}
                      <PruExternalIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Site footer */}
          <PruSiteFooter />
        </>
      ) : null}

      {!cookieDismissed ? <PruCookieBar onDismiss={() => setCookieDismissed(true)} /> : null}

      {showCallouts && view === "home" ? <RedesignCalloutsLegend /> : null}
    </div>
  );
}
