import type { ConnectedContentTab } from "./ConnectedContentTabs";
import type { ConnectedPageTab } from "./ConnectedPageTabs";

export const PAGE_TABS: ConnectedPageTab[] = [
  { value: "sub-1", label: "Sub menu 1", count: 10000 },
  { value: "sub-2", label: "Sub menu 2", count: 10 },
  { value: "sub-3", label: "Sub menu 3", count: 10 },
  { value: "sub-4", label: "Sub menu 4", count: 10 },
  { value: "sub-5", label: "Sub menu 5", count: 10 },
];

export const CONTENT_TABS: ConnectedContentTab[] = [
  { value: "tab-1", label: "Tab filter 1", count: 1 },
  { value: "tab-2", label: "Tab filter 2", count: 2 },
  { value: "tab-3", label: "Tab filter 3", count: 3 },
  { value: "tab-4", label: "Tab filter 4", count: 4 },
  { value: "tab-5", label: "Tab filter 5", count: 5 },
];
