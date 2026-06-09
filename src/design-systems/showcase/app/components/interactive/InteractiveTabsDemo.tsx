"use client";

import { useState } from "react";
import { ConnectedContentTabs } from "../ConnectedContentTabs";
import { ConnectedPageTabs } from "../ConnectedPageTabs";
import { CONTENT_TABS, PAGE_TABS } from "../tab-demo-data";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type TabPart = "page" | "content";

export function InteractiveTabsDemo() {
  const [part, setPart] = useState<TabPart>("page");
  const [pageTab, setPageTab] = useState(PAGE_TABS[0].value);
  const [contentTab, setContentTab] = useState(CONTENT_TABS[0].value);
  const [showAll, setShowAll] = useState(false);

  const liveCode = (() => {
    switch (part) {
      case "page":
        return `import { ConnectedPageTabs } from './ConnectedPageTabs';

const [value, setValue] = useState('sub-1');

<ConnectedPageTabs value={value} tabs={PAGE_TABS} onChange={setValue} />`;
      case "content":
        return `import { ConnectedContentTabs } from './ConnectedContentTabs';

const [value, setValue] = useState('tab-1');

<ConnectedContentTabs
  value={value}
  tabs={CONTENT_TABS}
  onChange={setValue}
/>`;
    }
  })();

  useComponentSectionCode(liveCode, !showAll);

  const preview = (() => {
    switch (part) {
      case "page":
        return (
          <ConnectedPageTabs value={pageTab} tabs={PAGE_TABS} onChange={setPageTab} className="min-w-0" />
        );
      case "content":
        return (
          <ConnectedContentTabs
            value={contentTab}
            tabs={CONTENT_TABS}
            onChange={setContentTab}
            className="min-w-0"
          />
        );
    }
  })();

  const label = part === "page" ? "Page tabs" : "Content tabs";

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
            onChange: (value) => setPart(value as TabPart),
            options: [
              { value: "page", label: "Page tabs" },
              { value: "content", label: "Content tabs" },
            ],
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-[#aab6b4]">Page tabs</p>
            <ConnectedPageTabs value={pageTab} tabs={PAGE_TABS} onChange={setPageTab} />
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-[#aab6b4]">Content tabs</p>
            <ConnectedContentTabs value={contentTab} tabs={CONTENT_TABS} onChange={setContentTab} />
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={label}>{preview}</VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Click a tab to change the selected state.
          </p>
        </>
      )}
    </div>
  );
}
