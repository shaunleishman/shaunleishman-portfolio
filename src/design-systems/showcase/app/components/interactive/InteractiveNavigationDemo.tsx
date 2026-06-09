"use client";

import { useState } from "react";
import Header from "../../../imports/Header";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import { getNavItemVariantConfig, NavigationItemPreview, SideMenuDemo, type NavItemVariant } from "./InteractiveNavDemo";

type NavPart = "header" | "items" | "menu";

export function InteractiveNavigationDemo() {
  const [part, setPart] = useState<NavPart>("items");
  const [headerVariant, setHeaderVariant] = useState<"Carbon Reporting" | "Insight">("Carbon Reporting");
  const [navItemVariant, setNavItemVariant] = useState<NavItemVariant>("menu-default");
  const [showAll, setShowAll] = useState(false);

  const liveCode = (() => {
    switch (part) {
      case "header":
        return `import Header from './imports/Header';

<Header header="${headerVariant}" />`;
      case "items": {
        const config = getNavItemVariantConfig(navItemVariant);
        return `const [activeItem, setActiveItem] = useState(${navItemVariant === "menu-selected" ? '"1"' : "null"});

{DEMO_NAV_ITEMS.map((item) => (
  <ShowcaseNavMenuItem
    key={item.id}
    label={item.label}
    icon={CirclePlus}
    level="${config.level}"
    active={activeItem === item.id}
    onClick={() => setActiveItem(item.id)}
  />
))}`;
      }
      case "menu":
        return `import { ShowcaseNavSidebar, PRODUCT_NAV } from './ShowcaseNavSidebar';

<ShowcaseNavSidebar
  title="Carbon Reporting"
  subtitle={null}
  navItems={PRODUCT_NAV}
  navAriaLabel="Application sections"
  activeSection="dashboard"
  onSectionChange={setActiveSection}
/>`;
    }
  })();

  useComponentSectionCode(liveCode, !showAll);

  const componentFilter = {
    id: "part",
    label: "Component",
    value: part,
    onChange: (value: string) => setPart(value as NavPart),
    options: [
      { value: "header", label: "Header" },
      { value: "items", label: "Navigation items" },
      { value: "menu", label: "Side menu" },
    ],
  };

  const filters =
    part === "header"
      ? [
          componentFilter,
          {
            id: "header",
            label: "Variant",
            value: headerVariant,
            onChange: (value: string) => setHeaderVariant(value as typeof headerVariant),
            options: [
              { value: "Carbon Reporting", label: "Carbon Reporting" },
              { value: "Insight", label: "Insight" },
            ],
          },
        ]
      : part === "items"
        ? [
            componentFilter,
            {
              id: "navItem",
              label: "Variant",
              value: navItemVariant,
              onChange: (value: string) => setNavItemVariant(value as NavItemVariant),
              options: [
                { value: "menu-default", label: "Menu · default" },
                { value: "menu-selected", label: "Menu · selected" },
                { value: "submenu-default", label: "Sub-menu · default" },
              ],
            },
          ]
        : [componentFilter];

  const preview = (() => {
    switch (part) {
      case "header":
        return <Header header={headerVariant} />;
      case "items":
        return <NavigationItemPreview variant={navItemVariant} />;
      case "menu":
        return <SideMenuDemo />;
    }
  })();

  return (
    <div>
      <ComponentVariantToolbar showAll={showAll} onShowAllChange={setShowAll} filters={filters} />

      {showAll ? (
        <div className="space-y-8">
          <Header header="Carbon Reporting" />
          <Header header="Insight" />
          <NavigationItemPreview showAll />
          <SideMenuDemo />
        </div>
      ) : (
        <VariantPreviewFrame label={part === "items" ? getNavItemVariantConfig(navItemVariant).title : part}>
          {preview}
        </VariantPreviewFrame>
      )}
      {!showAll && part === "items" && (
        <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
          Click a menu item to select it. The active item shows the teal accent bar, icon, and label.
        </p>
      )}
    </div>
  );
}
