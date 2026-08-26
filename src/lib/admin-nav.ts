export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: AdminNavItem[];
};

export function buildAdminNav(base: string): AdminNavItem[] {
  return [
    {
      id: "overview",
      label: "Overview",
      href: base,
      description: "Dashboard home and quick links",
    },
    {
      id: "site",
      label: "Site metrics",
      href: `${base}/site`,
      description: "Traffic, content, and engagement",
      children: [
        { id: "site-home", label: "Summary", href: `${base}/site` },
        { id: "site-content", label: "Content", href: `${base}/site/content` },
        { id: "site-audience", label: "Audience", href: `${base}/site/audience` },
        { id: "site-insights", label: "Insights", href: `${base}/site/insights` },
        { id: "site-dwell-map", label: "Dwell heatmap", href: `${base}/site/maps/dwell` },
        { id: "site-click-map", label: "Click map", href: `${base}/site/maps/clicks` },
      ],
    },
    {
      id: "prototypes",
      label: "Prototypes",
      href: `${base}/prototypes`,
      description: "Interactive project demos",
    },
    {
      id: "design-systems",
      label: "Design Systems",
      href: `${base}/design-systems`,
      description: "Design token and component showcases",
    },
    {
      id: "case-studies",
      label: "Case Studies",
      href: `${base}/case-studies`,
      description: "Heuristic evaluations and UX audit reports",
    },
    {
      id: "applications",
      label: "Applications",
      href: `${base}/applications`,
      description: "Tailored CV and cover letter packs by job",
    },
  ];
}

export type PrototypeEntry = {
  slug: string;
  title: string;
  client: string;
  description: string;
  accent: string;
  tags: string[];
};

export type DesignSystemEntry = {
  slug: string;
  title: string;
  client: string;
  description: string;
  accent: string;
  tags: string[];
};

export const DESIGN_SYSTEM_ENTRIES: DesignSystemEntry[] = [
  {
    slug: "showcase",
    title: "Design System Showcase",
    client: "Arbnco",
    description:
      "Tokens, components, and usage patterns. Includes page controls, meters table toolbar, and bulk actions.",
    accent: "#00a7b5",
    tags: ["Design tokens", "Components", "Page controls"],
  },
];

export type CaseStudyEntry = {
  slug: string;
  title: string;
  client: string;
  description: string;
  accent: string;
  tags: string[];
  evaluatedUrl: string;
  evaluationDate: string;
};

export const CASE_STUDY_ENTRIES: CaseStudyEntry[] = [
  {
    slug: "off-axis-tours",
    title: "Off Axis heuristic evaluation · Part 1",
    client: "Off Axis · Live music gig-swap platform",
    description:
      "Part 1. Expert UX review of the public marketplace for a live-music gig-swap startup. Covers first impression, action paths, directory search, and trust signals.",
    accent: "#A855F7",
    tags: ["Heuristic evaluation", "Part 1", "Marketplace"],
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-06-18",
  },
  {
    slug: "off-axis-dashboards",
    title: "Off Axis heuristic evaluation · Part 2",
    client: "Off Axis · Artist and admin dashboards",
    description:
      "Part 2. Expert UX review of logged-in artist account flows and the super-admin dashboard. Text-only findings covering profile, orders, support, and operations.",
    accent: "#A855F7",
    tags: ["Heuristic evaluation", "Part 2", "Dashboard"],
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-08-06",
  },
  {
    slug: "off-axis-onboarding",
    title: "Off Axis heuristic evaluation · Part 3",
    client: "Off Axis · Artist signup, first gig, and support",
    description:
      "Part 3. Expert UX review of artist signup, pending approval, create first gig, venues, and support invites. Text-only findings.",
    accent: "#A855F7",
    tags: ["Heuristic evaluation", "Part 3", "Onboarding"],
    evaluatedUrl: "https://offaxistours.com/",
    evaluationDate: "2026-08-26",
  },
  {
    slug: "mg-employees",
    title: "M&G Employees heuristic evaluation",
    client: "M&G / Prudential Workplace Pensions",
    description:
      "Expert UX review of the employee landing page for enrolled workplace pension members. Identifies content, hierarchy, and action-path gaps.",
    accent: "#E85D04",
    tags: ["Heuristic evaluation", "Financial services", "Content clarity"],
    evaluatedUrl: "https://workplacepensions.mandg.com/employees/",
    evaluationDate: "2026-06-15",
  },
];

export const PROTOTYPE_ENTRIES: PrototypeEntry[] = [
  {
    slug: "half-hourly",
    title: "Half-hourly synthetic data",
    client: "Arbnco",
    description:
      "Energy Insight prototype with a project list, synthetic data toggle, and consumption charts.",
    accent: "#00a7b5",
    tags: ["Energy", "Dashboard", "Synthetic data"],
  },
  {
    slug: "enhance",
    title: "Patient monitoring & assignment",
    client: "Enhance",
    description:
      "Healthcare monitoring dashboard with a patient list, practitioner assignment flow, and patient detail view.",
    accent: "#003153",
    tags: ["Healthcare", "Monitoring", "Assignment flow"],
  },
];
