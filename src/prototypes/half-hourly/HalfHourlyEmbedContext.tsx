"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type HalfHourlyEmbedContextValue = {
  embedded: true;
  navigate: (to: string | number) => void;
  base: string;
  pathname: string;
};

const HalfHourlyEmbedContext = createContext<HalfHourlyEmbedContextValue | null>(null);

export function useHalfHourlyEmbedContext() {
  return useContext(HalfHourlyEmbedContext);
}

export function useHalfHourlyPathname() {
  const embed = useHalfHourlyEmbedContext();
  const nextPathname = usePathname();
  return embed?.pathname ?? nextPathname;
}

export function HalfHourlyEmbedProvider({
  children,
  initialPathname = "/",
  interactive = true,
}: {
  children: ReactNode;
  initialPathname?: string;
  interactive?: boolean;
}) {
  const [pathname, setPathname] = useState(initialPathname);

  const navigate = useCallback(
    (to: string | number) => {
      if (!interactive) return;

      if (to === -1) {
        setPathname((current) => {
          if (current === "/" || current.startsWith("/project/")) {
            return "/";
          }
          return "/";
        });
        return;
      }

      if (typeof to === "string") {
        const next = to === "/" ? "/" : to.startsWith("/") ? to : `/${to}`;
        setPathname(next);
      }
    },
    [interactive],
  );

  const value = useMemo(
    () => ({ embedded: true as const, navigate, base: "", pathname }),
    [navigate, pathname],
  );

  return (
    <HalfHourlyEmbedContext.Provider value={value}>{children}</HalfHourlyEmbedContext.Provider>
  );
}
