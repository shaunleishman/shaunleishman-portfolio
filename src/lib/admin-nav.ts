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

export const PROTOTYPE_ENTRIES: PrototypeEntry[] = [
  {
    slug: "half-hourly",
    title: "Half-hourly synthetic data",
    client: "Arbnco",
    description:
      "Energy Insight prototype: project list, synthetic data toggle, and consumption charts.",
    accent: "#00a7b5",
    tags: ["Energy", "Dashboard", "Synthetic data"],
  },
  {
    slug: "enhance",
    title: "Patient monitoring & assignment",
    client: "Enhance",
    description:
      "Healthcare monitoring dashboard: patient list, practitioner assignment flow, and patient detail view.",
    accent: "#003153",
    tags: ["Healthcare", "Monitoring", "Assignment flow"],
  },
];
