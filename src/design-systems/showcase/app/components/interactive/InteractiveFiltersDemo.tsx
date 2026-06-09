"use client";

import { useState } from "react";
import { ConnectedAccordionFilter } from "../ConnectedAccordionFilter";
import { ConnectedFilteringDrawer } from "../ConnectedFilteringDrawer";
import FilteringDrawer from "../../../imports/FilteringDrawer";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type FilterPart = "accordion" | "drawer";

export function InteractiveFiltersDemo() {
  const [part, setPart] = useState<FilterPart>("accordion");
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const liveCode = (() => {
    switch (part) {
      case "accordion":
        return `import { ConnectedAccordionFilter } from './ConnectedAccordionFilter';

<ConnectedAccordionFilter defaultOpen />`;
      case "drawer":
        return `import { ConnectedFilteringDrawer } from './ConnectedFilteringDrawer';

<ConnectedFilteringDrawer onStatus={(message) => console.log(message)} />`;
    }
  })();

  useComponentSectionCode(liveCode, !showAll);

  const preview = (() => {
    switch (part) {
      case "accordion":
        return <ConnectedAccordionFilter defaultOpen />;
      case "drawer":
        return (
          <div className="showcase-filtering-drawer-preview mx-auto w-full">
            <ConnectedFilteringDrawer
              onStatus={(message) => {
                setStatus(message);
              }}
            />
          </div>
        );
    }
  })();

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "part",
            label: "Component",
            value: part,
            onChange: (value) => setPart(value as FilterPart),
            options: [
              { value: "accordion", label: "Accordion filter" },
              { value: "drawer", label: "Filtering drawer" },
            ],
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-8">
          <ConnectedAccordionFilter defaultOpen />
          <ConnectedAccordionFilter defaultOpen={false} />
          <ConnectedFilteringDrawer onStatus={setStatus} />
          <div className="showcase-filtering-drawer-preview mx-auto w-full opacity-60">
            <p className="mb-2 text-xs text-[var(--colour-labels-disabled)]">Figma reference export</p>
            <FilteringDrawer />
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={part === "accordion" ? "Accordion filter" : "Filtering drawer"} align="stretch">
            {preview}
          </VariantPreviewFrame>
          {part === "accordion" && (
            <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
              Click the header to expand or collapse. Checkboxes toggle selection and update the filter count chip.
            </p>
          )}
          {part === "drawer" && (
            <>
              <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
                Search narrows checkbox options. Clear all resets every category. Save filter reports the current
                selection count.
              </p>
              {status && (
                <p className="mt-2 text-xs font-medium text-[#106c7a]" role="status">
                  {status}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
