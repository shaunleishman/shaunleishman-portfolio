import type { GalleryCategory } from "./ComponentGalleryToolbar";

export type GallerySectionMeta = {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  keywords: string[];
  code: string;
};

export const GALLERY_SECTIONS: GallerySectionMeta[] = [
  {
    id: "buttons",
    title: "Buttons",
    description: "Small, medium, and large buttons — pick size, type, and state, or view all variants.",
    category: "Actions",
    keywords: ["button", "primary", "secondary"],
    code: `import ButtonMedium from './imports/ButtonMedium';\n\n<ButtonMedium buttonMd="Primary" buttonText="Save changes" />`,
  },
  {
    id: "inputs",
    title: "Input fields",
    description: "Text inputs with labels, validation, and state variants.",
    category: "Forms",
    keywords: ["input", "field", "validation"],
    code: `import { ConnectedInputField } from './ConnectedInputField';\n\n<ConnectedInputField label="Email" value={value} onChange={setValue} placeholder="Enter your email" />`,
  },
  {
    id: "dropdowns",
    title: "Dropdown selection",
    description: "Connected single-select dropdown used in gallery filters, plus the Figma multiple-select export.",
    category: "Forms",
    keywords: ["dropdown", "select"],
    code: `import { ConnectedDropdownSelection } from './ConnectedDropdownSelection';\n\n<ConnectedDropdownSelection\n  label="Single select"\n  value={value}\n  options={options}\n  onChange={setValue}\n/>`,
  },
  {
    id: "form-controls",
    title: "Form controls",
    description: "Checkboxes, radio buttons, toggles, and sliders.",
    category: "Forms",
    keywords: ["checkbox", "radio", "toggle", "slider"],
    code: `import CheckBox from './imports/CheckBox';\nimport Toggle from './imports/Toggle';\n\n<CheckBox checkBox="On" />\n<Toggle toggle="On" />`,
  },
  {
    id: "progress",
    title: "Progress bar",
    description: "Visual indicator of progress or completion.",
    category: "Feedback",
    keywords: ["progress"],
    code: `import ProgressBar from './imports/ProgressBar';\n\n<ProgressBar progressBar="Half" className="w-full" />`,
  },
  {
    id: "calendars",
    title: "Calendar components",
    description: "Date selection and calendar views.",
    category: "Forms",
    keywords: ["calendar", "date"],
    code: `import { ConnectedCalendar } from './ConnectedCalendar';\n\nconst [viewDate, setViewDate] = useState(new Date(2017, 7, 1));\nconst [range, setRange] = useState({ start: new Date(2017, 7, 9), end: new Date(2017, 7, 18) });\n\n<ConnectedCalendar\n  mode="days"\n  viewDate={viewDate}\n  onViewDateChange={setViewDate}\n  range={range}\n  onRangeChange={setRange}\n/>`,
  },
  {
    id: "filters",
    title: "Filters & accordions",
    description: "Collapsible filter sections for organising options.",
    category: "Layout",
    keywords: ["filter", "accordion", "drawer"],
    code: `import { ConnectedAccordionFilter } from './ConnectedAccordionFilter';\n\n<ConnectedAccordionFilter defaultOpen />`,
  },
  {
    id: "badges",
    title: "Badges & chips",
    description: "Counters, tags, and compact labels.",
    category: "Data",
    keywords: ["chip", "badge", "counter"],
    code: `import Chip from './imports/Chip';\n\n<Chip size="Small" colour="Success" type="Fill" />`,
  },
  {
    id: "tables",
    title: "Tables & page controls",
    description: "Full Insight page with sidebar, filters, toolbar, and wide data table — or inspect parts separately.",
    category: "Data",
    keywords: ["table", "column", "page controls", "sidebar", "page"],
    code: `import SideMenuFullNew from './imports/SideMenuFullNew';
import Header from './imports/Header';
import PageControls from './imports/PageControls';

<SideMenuFullNew sideMenu="Open" subMenu />
<Header header="Insight" />
<PageControls showDropdownFilter={false} />`,
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Header, sidebar menu items, and full side navigation.",
    category: "Navigation",
    keywords: ["navigation", "sidebar", "menu", "header"],
    code: `import { ShowcaseNavMenuItem } from './ShowcaseNavSidebar';\nimport { CirclePlus } from 'lucide-react';\n\n<ShowcaseNavMenuItem label="Menu item 1" icon={CirclePlus} level="menu" active onClick={() => {}} />`,
  },
  {
    id: "tabs",
    title: "Tabs & navigation",
    description: "Page-level and content-level tab patterns.",
    category: "Navigation",
    keywords: ["tabs", "tabulation"],
    code: `import { ConnectedPageTabs } from './ConnectedPageTabs';
import { ConnectedContentTabs } from './ConnectedContentTabs';

<ConnectedPageTabs value={pageTab} tabs={PAGE_TABS} onChange={setPageTab} />
<ConnectedContentTabs value={contentTab} tabs={CONTENT_TABS} onChange={setContentTab} />`,
  },
  {
    id: "cards",
    title: "Cards & tiles",
    description: "Dashboard tiles and card layouts.",
    category: "Layout",
    keywords: ["card", "tile"],
    code: `import LargeTileDesignNew from './imports/LargeTileDesignNew';\n\n<LargeTileDesignNew cardLg="Default" position="None" type="Single" />`,
  },
  {
    id: "steps",
    title: "Step headers",
    description: "Multi-step flow navigation headers.",
    category: "Navigation",
    keywords: ["step", "wizard"],
    code: `import { ConnectedStepNavigation } from './ConnectedStepNavigation';

<ConnectedStepNavigation steps={DEMO_STEPS} currentStep={0} onStepChange={setCurrentStep} />`,
  },
  {
    id: "modals",
    title: "Modals & notifications",
    description: "Dialogs, toast notifications, and overlays.",
    category: "Feedback",
    keywords: ["modal", "notification", "dialog"],
    code: `import Modal, { ModalBody, ModalDropZone, UploadStatus } from './imports/Modal';

<Modal title="Upload file" onClose={close} onCancel={reset} onImport={save}>
  <ModalBody>
    <UploadStatus uploadStatus={uploadStatus} />
    <ModalDropZone inputId={inputId} onChooseFile={openFilePicker} />
  </ModalBody>
</Modal>`,
  },
  {
    id: "tooltips",
    title: "Tooltips",
    description: "Contextual help on hover or focus.",
    category: "Feedback",
    keywords: ["tooltip"],
    code: `import ToolTip from './imports/ToolTip';

<ToolTip toolTip="Light" pointerSide="bottom" />`,
  },
  {
    id: "drawers",
    title: "Drawers & panels",
    description: "Side panels for editing and detail views.",
    category: "Layout",
    keywords: ["drawer", "panel"],
    code: `import Drawer, { DrawerBody } from './imports/Drawer';
import { ConnectedInputField } from './ConnectedInputField';

<Drawer title="Edit" onClose={close} onCancel={reset} onImport={save}>
  <DrawerBody>
    <ConnectedInputField label="Default" value={name} onChange={setName} />
  </DrawerBody>
</Drawer>`,
  },
  {
    id: "charts",
    title: "Data visualisation",
    description: "Consumption line chart with year toggle, tooltips, and hover states.",
    category: "Data",
    keywords: ["chart", "graph", "line", "visualisation"],
    code: `import { InteractiveLineGraph } from './interactive/InteractiveLineGraph';\n\n<InteractiveLineGraph />`,
  },
  {
    id: "accordions",
    title: "Accordions",
    description: "Expandable content sections for meter and asset details.",
    category: "Layout",
    keywords: ["accordion", "expand"],
    code: `import { ConnectedAccordion } from './ConnectedAccordion';\n\n<ConnectedAccordion defaultOpen />`,
  },
  {
    id: "icons",
    title: "Icons & avatars",
    description: "Icon states, containers, and avatar sizes.",
    category: "Layout",
    keywords: ["icon", "avatar"],
    code: `import Icons from './imports/Icons';\nimport Avatar from './imports/Avatar';\n\n<Icons icon="Primary" size="Medium" />\n<Avatar colour="Primary" size="Medium" shape="Circle" type="Text" />`,
  },
];

export function matchesGallerySection(section: GallerySectionMeta, category: GalleryCategory): boolean {
  if (category === "All") return true;
  return section.category === category;
}
