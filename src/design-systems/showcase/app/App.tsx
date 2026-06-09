"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Overview from "./components/Overview";
import Tokens from "./components/Tokens";
import Components from "./components/Components";
import UsageExamples from "./components/UsageExamples";
import {
  ShowcaseNavSidebar,
  type ShowcaseNavSection,
} from "./components/ShowcaseNavSidebar";

const SECTION_TITLES: Record<ShowcaseNavSection, string> = {
  overview: "Overview",
  tokens: "Design Tokens",
  components: "Components",
  patterns: "Usage Patterns",
};

export default function App() {
  const [activeSection, setActiveSection] = useState<ShowcaseNavSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 w-full overflow-hidden">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`z-30 shrink-0 overflow-hidden transition-all duration-700 ease-in-out max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:shadow-lg ${
          sidebarOpen ? "w-auto max-md:w-64 max-md:translate-x-0" : "w-0 max-md:-translate-x-full"
        }`}
      >
        <ShowcaseNavSidebar
          fillHeight
          collapsibleOnHover
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            if (window.matchMedia("(max-width: 767px)").matches) {
              setSidebarOpen(false);
            }
          }}
          className="h-full max-md:shadow-lg"
        />
      </div>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center gap-3 border-b border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0 rounded-[var(--radius-medium-radius)] p-2 transition-colors hover:bg-[var(--colour-surfaces-tertiary-hover)]"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="size-5 text-[var(--colour-labels-neutral)]" />
          </button>
          <h2 className="min-w-0 truncate text-[var(--typography-font-size-md)] font-semibold">
            {SECTION_TITLES[activeSection]}
          </h2>
        </header>

        <div className="showcase-scroll-root h-0 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-[var(--colour-surfaces-bg)] p-4 sm:p-6 lg:p-8">
          {activeSection === "overview" && (
            <Overview onNavigate={(section) => setActiveSection(section === "components" ? "components" : "tokens")} />
          )}
          {activeSection === "tokens" && <Tokens />}
          {activeSection === "components" && <Components />}
          {activeSection === "patterns" && <UsageExamples />}
        </div>
      </main>
    </div>
  );
}
