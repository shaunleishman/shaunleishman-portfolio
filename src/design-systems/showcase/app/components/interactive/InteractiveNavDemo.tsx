"use client";

import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { ConnectedAccordion } from "../ConnectedAccordion";
import {
  PRODUCT_NAV,
  ShowcaseNavMenuItem,
  ShowcaseNavSidebar,
  type ProductNavSection,
} from "../ShowcaseNavSidebar";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar } from "../ComponentVariantToolbar";

export function InteractiveAccordionDemo() {
  const [showAll, setShowAll] = useState(false);

  useComponentSectionCode(`import { ConnectedAccordion } from './ConnectedAccordion';

<ConnectedAccordion defaultOpen />`, !showAll);

  return (
    <div className="showcase-accordion-demo-shell">
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all states"
        collapseLabel="Show focused view"
        filters={[]}
      />

      <div className="showcase-accordion-demo">
        {showAll ? (
          <div className="space-y-6">
            <ConnectedAccordion defaultOpen defaultChecked={false} />
            <ConnectedAccordion defaultOpen defaultChecked />
            <ConnectedAccordion defaultOpen={false} defaultChecked={false} />
            <ConnectedAccordion defaultOpen={false} defaultChecked />
          </div>
        ) : (
          <>
            <ConnectedAccordion defaultOpen />
            <p className="mt-3 text-xs text-[var(--colour-labels-disabled)]">
              Click the checkbox to select the row. Click the header or chevron to expand or collapse — the chevron points up
              when open and down when closed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export type NavItemVariant = "menu-default" | "menu-selected" | "submenu-default";

const NAV_ITEM_VARIANTS: {
  value: NavItemVariant;
  title: string;
  level: "menu" | "submenu";
  active: boolean;
}[] = [
  { value: "menu-default", title: "Menu · default", level: "menu", active: false },
  { value: "menu-selected", title: "Menu · selected", level: "menu", active: true },
  { value: "submenu-default", title: "Sub-menu · default", level: "submenu", active: false },
];

export function getNavItemVariantConfig(variant: NavItemVariant) {
  return NAV_ITEM_VARIANTS.find((item) => item.value === variant)!;
}

const DEMO_NAV_ITEMS = [
  { id: "1", label: "Menu item 1" },
  { id: "2", label: "Menu item 2" },
  { id: "3", label: "Menu item 3" },
] as const;

function getInitialSelection(variant: NavItemVariant): string | null {
  return variant === "menu-selected" ? "1" : null;
}

export function NavigationItemPreview({
  variant = "menu-default",
  showAll = false,
}: {
  variant?: NavItemVariant;
  showAll?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(() => getInitialSelection(variant));

  useEffect(() => {
    setSelectedId(getInitialSelection(variant));
  }, [variant]);

  const config = getNavItemVariantConfig(variant);

  if (showAll) {
    return (
      <div className="showcase-nav-item-preview mx-auto space-y-6">
        {NAV_ITEM_VARIANTS.map((item) => (
          <NavigationItemList key={item.value} variant={item.value} />
        ))}
      </div>
    );
  }

  return (
    <div className="showcase-nav-item-preview mx-auto">
      <NavigationItemList
        variant={variant}
        selectedId={selectedId}
        onSelect={setSelectedId}
        level={config.level}
        showTitle={false}
      />
    </div>
  );
}

function NavigationItemList({
  variant,
  selectedId: controlledSelectedId,
  onSelect,
  level: levelOverride,
  showTitle = true,
}: {
  variant: NavItemVariant;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  level?: "menu" | "submenu";
  showTitle?: boolean;
}) {
  const config = getNavItemVariantConfig(variant);
  const level = levelOverride ?? config.level;
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(() =>
    getInitialSelection(variant),
  );

  const selectedId = controlledSelectedId ?? internalSelectedId;
  const handleSelect = onSelect ?? setInternalSelectedId;

  return (
    <div>
      {!levelOverride && showTitle && (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#aab6b4]">{config.title}</p>
      )}
      <div className="flex flex-col gap-1">
        {DEMO_NAV_ITEMS.map((item) => (
          <ShowcaseNavMenuItem
            key={item.id}
            label={item.label}
            icon={CirclePlus}
            level={level}
            active={selectedId === item.id}
            onClick={() => handleSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function NavigationItemDemo() {
  return <NavigationItemPreview showAll />;
}

export function SideMenuDemo() {
  const [activeSection, setActiveSection] = useState<ProductNavSection>("dashboard");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div>
      <div className="showcase-sidebar-preview mx-auto">
        <ShowcaseNavSidebar
          title="Carbon Reporting"
          subtitle={null}
          navItems={PRODUCT_NAV}
          navAriaLabel="Application sections"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onSettingsClick={() => setStatus("Settings clicked")}
          onLogoutClick={() => setStatus("Log out clicked")}
          className="w-full"
        />
      </div>
      {status && (
        <p className="mt-3 text-center text-xs text-[#106c7a]" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
