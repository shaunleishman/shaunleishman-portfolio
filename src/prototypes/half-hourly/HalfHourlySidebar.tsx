"use client";

import { useSyncExternalStore } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  Cloud,
  FileText,
  Info,
  LayoutGrid,
  Lightbulb,
  Plug,
  Settings,
  Stars,
  TrendingUp,
} from "lucide-react";
import { Chip } from "@/design-systems/arbnco";
import { ShowcaseNavMenuItem } from "@/design-systems/showcase/app/components/ShowcaseNavSidebar";
import { cn } from "@/lib/utils";
import { useHalfHourlyNav } from "./useHalfHourlyNav";

export type HalfHourlyMainSection = "overview" | "project-list" | "alerts" | "settings";
export type HalfHourlySubSection =
  | "about"
  | "energy-consumption"
  | "benchmarking"
  | "carbon"
  | "ecm"
  | "alerts"
  | "integration"
  | "edit-project";

const MAIN_NAV: {
  id: HalfHourlyMainSection;
  label: string;
  icon: typeof LayoutGrid;
  href: string;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid, href: "/overview" },
  { id: "project-list", label: "Project list", icon: FileText, href: "/" },
  { id: "alerts", label: "Alerts", icon: Bell, href: "/alerts" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

type SubNavItem = {
  id: HalfHourlySubSection;
  label: string;
  icon: typeof LayoutGrid;
  href?: (projectId: string) => string;
};

const PROJECT_SUB_NAV: SubNavItem[] = [
  {
    id: "about",
    label: "About the building",
    icon: Building2,
    href: (id) => `/project/${id}`,
  },
  {
    id: "energy-consumption",
    label: "Energy consumption overview",
    icon: BarChart3,
    href: (id) => `/project/${id}/energy-consumption`,
  },
  { id: "benchmarking", label: "Benchmarking", icon: TrendingUp, href: (id) => `/project/${id}/benchmarking` },
  { id: "carbon", label: "Carbon emissions", icon: Cloud, href: (id) => `/project/${id}/carbon` },
  {
    id: "ecm",
    label: "Energy conservation measures",
    icon: Lightbulb,
    href: (id) => `/project/${id}/energy-conservation-measures`,
  },
  { id: "alerts", label: "Alerts", icon: AlertTriangle, href: (id) => `/project/${id}/alerts` },
  { id: "integration", label: "Integration", icon: Plug, href: (id) => `/project/${id}/integration` },
  {
    id: "edit-project",
    label: "Edit project",
    icon: Settings,
    href: (id) => `/project/${id}/edit`,
  },
];

const SIDEBAR_TRANSITION = "transition-all duration-700 ease-in-out";

/**
 * Expanded state lives outside the component so it survives the remounts that
 * happen on in-app navigation — clicking a nav item keeps the menu open instead
 * of collapsing it, since the pointer is still over the sidebar.
 */
let sidebarHovered = false;
const sidebarHoverListeners = new Set<() => void>();

function setSidebarHovered(value: boolean) {
  if (sidebarHovered === value) return;
  sidebarHovered = value;
  sidebarHoverListeners.forEach((listener) => listener());
}

function subscribeSidebarHover(listener: () => void) {
  sidebarHoverListeners.add(listener);
  return () => sidebarHoverListeners.delete(listener);
}

function useSidebarHovered() {
  return useSyncExternalStore(
    subscribeSidebarHover,
    () => sidebarHovered,
    () => false,
  );
}

type HalfHourlySidebarProps = {
  currentProject?: { name: string; syntheticEnabled: boolean };
  currentProjectId?: string;
  accentColor: string;
  activeMainSection?: HalfHourlyMainSection;
  activeSubSection?: HalfHourlySubSection;
};

export function HalfHourlySidebar({
  currentProject,
  currentProjectId,
  accentColor,
  activeMainSection = "project-list",
  activeSubSection,
}: HalfHourlySidebarProps) {
  const { navigate } = useHalfHourlyNav();
  const isSubPage = Boolean(activeSubSection);
  const isHovered = useSidebarHovered();

  const showSubMenu = Boolean(currentProject && isSubPage);
  // The main rail stays collapsed (icons only) while the submenu is open.
  const showLabels = isHovered && !showSubMenu;
  const railWidth = showLabels ? "w-64" : "w-[72px]";

  return (
    <div
      className="relative flex h-full shrink-0"
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      <aside
        className={`flex h-full shrink-0 flex-col bg-[#232828] p-3 ${SIDEBAR_TRANSITION} ${railWidth}`}
        aria-label="Application navigation"
      >
        <nav className="flex flex-col gap-1">
          {MAIN_NAV.map((item) => (
            <ShowcaseNavMenuItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={activeMainSection === item.id}
              accentColor={accentColor}
              iconOnly={!showLabels}
              onClick={() => navigate(item.href)}
            />
          ))}
        </nav>
      </aside>

      <aside
        className={`flex h-full shrink-0 flex-col overflow-hidden bg-[#394040] ${SIDEBAR_TRANSITION} ${
          showSubMenu ? "w-64 p-3 opacity-100" : "w-0 p-0 opacity-0"
        }`}
        aria-label="Project navigation"
        aria-hidden={!showSubMenu}
      >
        {currentProject && (
          <>
            <div className="mb-3 shrink-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-sm text-white tracking-[-0.1px]">{currentProject.name}</p>
                  {currentProject.syntheticEnabled && (
                    <Chip tone="success-solid" size="sm" className="mt-2 gap-1">
                      <Stars className="size-2.5" />
                      Synthetic
                    </Chip>
                  )}
                </div>
                <Info className="mt-0.5 size-4 shrink-0 text-[#aab6b4]" aria-hidden />
              </div>
            </div>

            <div className="mb-2 h-px shrink-0 rounded bg-[#aab6b4]/40" aria-hidden />

            <nav className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-1">
                {PROJECT_SUB_NAV.map((item) => (
                  <ShowcaseNavMenuItem
                    key={item.id}
                    id={item.id === "edit-project" ? "hh-edit-project-nav" : undefined}
                    label={item.label}
                    icon={item.icon}
                    level="submenu"
                    active={activeSubSection === item.id}
                    accentColor={accentColor}
                    onClick={() => {
                      if (item.href && currentProjectId) {
                        navigate(item.href(currentProjectId));
                      }
                    }}
                  />
                ))}
              </div>
            </nav>
          </>
        )}
      </aside>
    </div>
  );
}
