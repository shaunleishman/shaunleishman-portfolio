"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Component,
  FileCheck,
  Gauge,
  LayoutGrid,
  LayoutDashboard,
  LogOut,
  Building2,
  Settings,
  SwatchBook,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ShowcaseNavSection = "overview" | "tokens" | "components" | "patterns";

export type SidebarNavItem<T extends string = string> = {
  id: T;
  label: string;
  icon: LucideIcon;
};

export type ProductNavSection = "dashboard" | "funds" | "meters" | "units" | "consent";

const DESIGN_SYSTEM_NAV: SidebarNavItem<ShowcaseNavSection>[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "tokens", label: "Design Tokens", icon: SwatchBook },
  { id: "components", label: "Components", icon: Component },
  { id: "patterns", label: "Usage Patterns", icon: BookOpen },
];

export const PRODUCT_NAV: SidebarNavItem<ProductNavSection>[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "funds", label: "Funds and assets", icon: Wallet },
  { id: "meters", label: "Meters", icon: Gauge },
  { id: "units", label: "Unit management", icon: Building2 },
  { id: "consent", label: "Consent", icon: FileCheck },
];

type ShowcaseNavMenuItemProps = {
  label: string;
  icon: LucideIcon;
  active: boolean;
  level?: "menu" | "submenu";
  accentColor?: string;
  /** Icon-only mode for collapsed navigation rails. */
  iconOnly?: boolean;
  onClick: () => void;
  id?: string;
};

export function ShowcaseNavMenuItem({
  label,
  icon: Icon,
  active,
  level = "menu",
  accentColor = "#00a7b5",
  iconOnly = false,
  onClick,
  id,
}: ShowcaseNavMenuItemProps) {
  const itemTransition = "duration-700 ease-in-out";

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      title={iconOnly ? label : undefined}
      aria-label={label}
      data-name="Menu-item"
      className={cn(
        "group flex w-full cursor-pointer overflow-hidden rounded-[8px] p-3 transition-colors",
        iconOnly ? "items-center justify-center" : level === "submenu" ? "items-start" : "items-center",
        active
          ? "bg-[#394040] hover:bg-[#455050]"
          : level === "submenu"
            ? "bg-transparent hover:bg-[#455050]"
            : "bg-transparent hover:bg-[#394040]",
      )}
    >
      <span
        className={cn(
          "flex min-w-0 items-center transition-all",
          itemTransition,
          iconOnly ? "gap-0" : "w-full gap-2",
        )}
        data-name="Icon-menu-text"
      >
        <span
          className={cn(
            "flex shrink-0 self-stretch overflow-hidden transition-all",
            itemTransition,
            active && !iconOnly ? "w-[2px]" : "w-0 opacity-0",
          )}
          aria-hidden
        >
          <span className="h-full w-[2px] rounded-[4px]" style={{ backgroundColor: accentColor }} />
        </span>
        <Icon
          className={cn(
            "size-6 shrink-0 transition-colors",
            !iconOnly && level === "submenu" && "mt-0.5",
            active ? "group-hover:opacity-90" : "text-[#aab6b4] group-hover:text-white",
          )}
          strokeWidth={1.75}
          style={active ? { color: accentColor } : undefined}
          aria-hidden
        />
        <span
          className={cn(
            "text-left font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-5 tracking-[-0.1px] transition-all",
            itemTransition,
            iconOnly
              ? "max-w-0 overflow-hidden opacity-0"
              : "min-w-0 flex-1 whitespace-normal opacity-100",
            active ? "group-hover:opacity-90" : "text-[#aab6b4] group-hover:text-white",
          )}
          style={active ? { color: accentColor } : undefined}
          aria-hidden={iconOnly}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

type ShowcaseNavSidebarProps<T extends string = ShowcaseNavSection> = {
  activeSection: T;
  onSectionChange: (section: T) => void;
  className?: string;
  title?: string;
  subtitle?: string | null;
  navItems?: SidebarNavItem<T>[];
  navAriaLabel?: string;
  /** Fill the parent height and pin settings/log out to the bottom. */
  fillHeight?: boolean;
  /** Collapse to an icon rail on desktop until hovered (matches half-hourly prototype). */
  collapsibleOnHover?: boolean;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
};

export function ShowcaseNavSidebar<T extends string = ShowcaseNavSection>({
  activeSection,
  onSectionChange,
  className,
  title = "Design System",
  subtitle = "Tokens, components & patterns",
  navItems = DESIGN_SYSTEM_NAV as SidebarNavItem<T>[],
  navAriaLabel = "Design system sections",
  fillHeight = false,
  collapsibleOnHover = false,
  onSettingsClick,
  onLogoutClick,
}: ShowcaseNavSidebarProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const showLabels = !collapsibleOnHover || isMobile || isHovered;
  const railWidth = showLabels ? "w-64" : "w-[72px]";
  const railTransition = collapsibleOnHover ? "transition-all duration-700 ease-in-out" : "";

  return (
    <aside
      className={cn(
        "flex min-h-0 shrink-0 flex-col bg-[#232828] p-3",
        railWidth,
        railTransition,
        fillHeight ? "h-full overflow-hidden" : "h-auto",
        className,
      )}
      onMouseEnter={() => collapsibleOnHover && setIsHovered(true)}
      onMouseLeave={() => collapsibleOnHover && setIsHovered(false)}
    >
      <div
        className={cn(
          "shrink-0 overflow-hidden rounded-[8px] p-3 transition-all duration-700 ease-in-out",
          showLabels ? "max-h-24 opacity-100" : "max-h-0 p-0 opacity-0",
        )}
      >
        <h1 className="font-['Open_Sans:semi-bold',sans-serif] text-[18px] leading-6 tracking-[-0.2px] text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 font-['Open_Sans:regular',sans-serif] text-[12px] leading-4 text-[#aab6b4]">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "my-2 h-px shrink-0 rounded-[4px] bg-[#aab6b4]/40 transition-opacity duration-700 ease-in-out",
          showLabels ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      <nav aria-label={navAriaLabel} className="shrink-0">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <ShowcaseNavMenuItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={activeSection === item.id}
              iconOnly={!showLabels}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </div>
      </nav>

      <div className={`shrink-0 pt-2 ${fillHeight ? "mt-auto" : "mt-2"}`}>
        <ShowcaseNavMenuItem
          label="Settings"
          icon={Settings}
          active={false}
          iconOnly={!showLabels}
          onClick={() => onSettingsClick?.()}
        />

        <div
          className={cn(
            "my-2 h-px rounded-[4px] bg-[#aab6b4]/40 transition-opacity duration-700 ease-in-out",
            showLabels ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />

        <ShowcaseNavMenuItem
          label="Log out"
          icon={LogOut}
          active={false}
          iconOnly={!showLabels}
          onClick={() => onLogoutClick?.()}
        />
      </div>
    </aside>
  );
}

export { DESIGN_SYSTEM_NAV as SHOWCASE_NAV_ITEMS };
