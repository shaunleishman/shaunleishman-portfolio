import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(
  __dirname,
  "../Desktop/Portfolio files/Project prototypes/Design System Showcase Platform/src/app/components/Components.tsx",
);
const OUT = path.join(
  __dirname,
  "../src/design-systems/showcase/app/components/Components.tsx",
);

const SECTION_META = {
  Buttons: "buttons",
  "Input Fields": "inputs",
  Dropdown: "dropdowns",
  "Form Controls": "form-controls",
  "Progress Bar": "progress",
  "Calendar Components": "calendars",
  "Filters & Accordions": "filters",
  "Badges & Chips": "badges",
  "Table Components": "tables",
  "Navigation Components": "navigation",
  "Tabs & Page Navigation": "tabs",
  "Cards & Tiles": "cards",
  "Steppers & Progress": "steps",
  "Modals & Dialogs": "modals",
  "Notifications & Alerts": "modals",
  Tooltips: "tooltips",
  "Drawers & Panels": "drawers",
  "Data Visualization": "charts",
  Accordions: "accordions",
  "Additional Cards": "cards",
  "Icons & Avatars": "icons",
};

const SECTION_ORDER = [
  "buttons",
  "inputs",
  "dropdowns",
  "form-controls",
  "progress",
  "calendars",
  "filters",
  "badges",
  "tables",
  "navigation",
  "tabs",
  "cards",
  "steps",
  "modals",
  "tooltips",
  "drawers",
  "charts",
  "accordions",
  "icons",
];

const source = fs.readFileSync(SRC, "utf8");

function stripSectionHeader(body) {
  return body.replace(/^\s*<h2[\s\S]*?<\/p>\s*\n/m, "");
}

function stripButtonSectionExtras(body) {
  return body
    .replace(
      /\s*<div className="flex items-center justify-between mb-6">[\s\S]*?<\/button>\s*\n\s*<\/div>\s*\n/m,
      "\n",
    )
    .replace(/\s*\{showButtonCode && [\s\S]*?\)\}\s*\n/m, "\n");
}

function softenInnerCards(body) {
  return body.replace(
    /bg-white p-6 rounded-\[12px\] border border-\[#E5E8E7\]/g,
    "rounded-[var(--radius-medium-radius)] bg-white p-4 shadow-sm",
  );
}

function addScrollClass(body) {
  return body.replace(/overflow-x-auto/g, "showcase-component-scroll overflow-x-auto");
}

function parseSections(src) {
  const re = /      \{\/\* ([^*]+) \*\/\}\n      <section>([\s\S]*?)      <\/section>\n/g;
  const sections = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    sections.push({ name: m[1].trim(), body: m[2] });
  }
  return sections;
}

function navigationBody() {
  return `
<div className="mb-8 space-y-4">
  <h3 className="text-base font-semibold text-[var(--colour-labels-neutral)]">Header</h3>
  <div className="showcase-component-scroll overflow-x-auto space-y-4">
    <Header header="Carbon Reporting" />
    <Header header="Insight" />
  </div>
</div>
<div className="mb-8">
  <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Navigation items</h3>
  <NavigationItemDemo />
</div>
<div>
  <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Complete side menu</h3>
  <SideMenuDemo />
</div>`;
}

const parsed = parseSections(source);
const merged = new Map();

for (const section of parsed) {
  const key = SECTION_META[section.name];
  if (!key) continue;

  let body = stripSectionHeader(section.body);
  if (section.name === "Buttons") body = stripButtonSectionExtras(body);
  if (section.name === "Form Controls") body = "<InteractiveFormControlsDemo />";
  if (section.name === "Table Components") body = "<InteractiveTableDemo />";
  if (section.name === "Navigation Components") body = navigationBody();
  if (section.name === "Data Visualization") body = "<InteractiveLineGraph />";
  if (section.name === "Accordions") body = "<InteractiveAccordionDemo />";

  body = softenInnerCards(body);
  body = addScrollClass(body);

  if (merged.has(key)) {
    merged.set(key, `${merged.get(key)}\n${body}`);
  } else {
    merged.set(key, body);
  }
}

const sectionsJsx = SECTION_ORDER.filter((id) => merged.has(id))
  .map((id) => {
    const body = merged.get(id);
    const indented = body
      .split("\n")
      .map((line) => (line.trim() ? `        ${line}` : ""))
      .join("\n");

    return `      <ComponentSection
        id="${id}"
        title={sectionMeta("${id}").title}
        description={sectionMeta("${id}").description}
        code={sectionMeta("${id}").code}
        hidden={!visible("${id}")}
      >
${indented}
      </ComponentSection>`;
  })
  .join("\n\n");

const output = `// @ts-nocheck — Figma-exported component previews
"use client";

import { useMemo, useState } from "react";
import ButtonLarge from "../../imports/ButtonLarge";
import ButtonMedium from "../../imports/ButtonMedium";
import ButtonSmall from "../../imports/ButtonSmall";
import InputField from "../../imports/InputField";
import DropdownSelection from "../../imports/DropdownSelection";
import ProgressBar from "../../imports/ProgressBar";
import Calendar from "../../imports/Calendar";
import CalendarCompDays from "../../imports/CalendarCompDays";
import CalandarLargeTemplate from "../../imports/CalandarLargeTemplate";
import FilteringDrawer from "../../imports/FilteringDrawer";
import AccordianFilter from "../../imports/AccordianFilter";
import Counter from "../../imports/Counter";
import Chip from "../../imports/Chip";
import Header from "../../imports/Header";
import PageTabulation from "../../imports/PageTabulation";
import ContentTabulation from "../../imports/ContentTabulation";
import LargeTileDesignNew from "../../imports/LargeTileDesignNew";
import MediumTileDesignNew from "../../imports/MediumTileDesignNew";
import StepHeaderNavigation from "../../imports/StepHeaderNavigation";
import StepHeader from "../../imports/StepHeader";
import Modal from "../../imports/Modal";
import Notification from "../../imports/Notification";
import Drawer from "../../imports/Drawer";
import ToolTip from "../../imports/ToolTip";
import LargeCardDesignNew from "../../imports/LargeCardDesignNew";
import Icons from "../../imports/Icons";
import IconSquareRounded from "../../imports/IconSquareRounded";
import Avatar from "../../imports/Avatar";
import { ComponentSection } from "./ComponentSection";
import { ComponentGalleryToolbar, type GalleryCategory } from "./ComponentGalleryToolbar";
import { GALLERY_SECTIONS, matchesGallerySection } from "./component-gallery-meta";
import { InteractiveLineGraph } from "./interactive/InteractiveLineGraph";
import { InteractiveTableDemo } from "./interactive/InteractiveTableDemo";
import {
  InteractiveAccordionDemo,
  NavigationItemDemo,
  SideMenuDemo,
} from "./interactive/InteractiveNavDemo";
import { InteractiveFormControlsDemo } from "./interactive/InteractiveFormControlsDemo";

function sectionMeta(id: string) {
  return GALLERY_SECTIONS.find((s) => s.id === id)!;
}

export default function Components() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("All");

  const visibleSections = useMemo(
    () => GALLERY_SECTIONS.filter((s) => matchesGallerySection(s, query, category)),
    [query, category],
  );

  const visible = (id: string) => visibleSections.some((s) => s.id === id);

  return (
    <div className="max-w-7xl space-y-12">
      <ComponentGalleryToolbar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        visibleCount={visibleSections.length}
        totalCount={GALLERY_SECTIONS.length}
      />

${sectionsJsx}
    </div>
  );
}
`;

fs.writeFileSync(OUT, output);
console.log("Generated Components.tsx with", merged.size, "sections");
