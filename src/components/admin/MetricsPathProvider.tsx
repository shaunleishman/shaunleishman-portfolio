"use client";

import { createContext, useContext } from "react";

const MetricsPathContext = createContext<string>("/internal/site-insights-k9m2");

export function MetricsPathProvider({
  metricsPath,
  children,
}: {
  metricsPath: string;
  children: React.ReactNode;
}) {
  return <MetricsPathContext.Provider value={metricsPath}>{children}</MetricsPathContext.Provider>;
}

export function useMetricsPathContext(): string {
  return useContext(MetricsPathContext);
}
