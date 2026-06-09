"use client";

import { useState } from "react";
import { ConnectedContentTabs } from "../ConnectedContentTabs";
import { CONTENT_TABS } from "../tab-demo-data";

/** Kept for direct imports; prefer InteractiveTabsDemo in the gallery. */
export function InteractiveContentTabsDemo() {
  const [value, setValue] = useState(CONTENT_TABS[0].value);

  return (
    <ConnectedContentTabs
      value={value}
      tabs={CONTENT_TABS}
      onChange={setValue}
      className="min-w-0"
    />
  );
}
