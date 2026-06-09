"use client";

import { ShowcasePrototype } from "./ShowcasePrototype";
import { ArbncoDesignSystemRoot } from "@/design-systems/arbnco";
import "@/design-systems/arbnco/dropdown.css";
import "./showcase-components.css";

export function ShowcaseRoot({ children }: { children: React.ReactNode }) {
  return (
    <ArbncoDesignSystemRoot>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[var(--colour-surfaces-bg)]">
        {children}
      </div>
    </ArbncoDesignSystemRoot>
  );
}

export { ShowcasePrototype };
