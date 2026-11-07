"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type SidebarHoverValue = {
  hovered: boolean;
  setHovered: (value: boolean) => void;
};

const SidebarHoverContext = createContext<SidebarHoverValue | null>(null);

/**
 * Hover lives on the prototype root, not on the sidebar and not in a module flag.
 * In-app navigation remounts the sidebar while the pointer is still over it, so the
 * open rail has to survive that remount. A module flag would do that, and it would
 * also expand every other prototype mounted on the same page.
 */
export function HalfHourlySidebarHoverProvider({ children }: { children: ReactNode }) {
  const [hovered, setHoveredState] = useState(false);
  const setHovered = useCallback((value: boolean) => {
    setHoveredState((current) => (current === value ? current : value));
  }, []);
  const value = useMemo(() => ({ hovered, setHovered }), [hovered, setHovered]);

  return <SidebarHoverContext.Provider value={value}>{children}</SidebarHoverContext.Provider>;
}

export function useSidebarHovered(): SidebarHoverValue {
  const context = useContext(SidebarHoverContext);
  const [localHovered, setLocalHovered] = useState(false);
  const setLocalHoveredStable = useCallback((value: boolean) => {
    setLocalHovered((current) => (current === value ? current : value));
  }, []);

  if (context) return context;

  return { hovered: localHovered, setHovered: setLocalHoveredStable };
}
