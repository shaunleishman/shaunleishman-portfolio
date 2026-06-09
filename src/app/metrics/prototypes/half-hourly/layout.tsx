"use client";

import { ProjectProvider } from "@/prototypes/half-hourly/context";
import { HalfHourlyRoot } from "@/prototypes/half-hourly/HalfHourlyRoot";

export default function HalfHourlyPrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <HalfHourlyRoot>
      <ProjectProvider>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </ProjectProvider>
    </HalfHourlyRoot>
  );
}
