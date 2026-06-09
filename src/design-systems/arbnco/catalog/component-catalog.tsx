"use client";

import type { ReactNode } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Chip } from "../components/Chip";
import { Input } from "../components/Input";
import { PageControls } from "../components/PageControls";
import { Radio } from "../components/Radio";
import { Select } from "../components/Select";
import { Toggle } from "../components/Toggle";

export type ComponentCatalogEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  importName: string;
  preview: ReactNode;
  example: string;
};

export const COMPONENT_CATEGORIES = [
  "Actions",
  "Forms",
  "Selection",
  "Data display",
  "Page controls",
] as const;

export const COMPONENT_CATALOG: ComponentCatalogEntry[] = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description: "Primary, secondary, and tertiary actions in three sizes.",
    importName: "Button",
    preview: (
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
    example: `<Button variant="primary" size="md">Save</Button>`,
  },
  {
    id: "input",
    name: "Input",
    category: "Forms",
    description: "Text fields with label, validation, and optional leading icon.",
    importName: "Input",
    preview: (
      <div className="grid max-w-md gap-4">
        <Input label="Email" required placeholder="you@company.com" />
        <Input label="Reference" error="Reference is required" defaultValue="" />
      </div>
    ),
    example: `<Input label="Email" required placeholder="you@company.com" />`,
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description: "Single-select dropdown with label and placeholder — uses the same custom panel as Dropdown.",
    importName: "Select",
    preview: (
      <Select
        className="max-w-xs"
        label="Fund"
        required
        placeholder="Select a fund"
        options={[
          { value: "a", label: "Fund A" },
          { value: "b", label: "Fund B" },
        ]}
      />
    ),
    example: `<Select label="Fund" options={[{ value: 'a', label: 'Fund A' }]} />`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Selection",
    description: "Single or grouped boolean selection.",
    importName: "Checkbox",
    preview: (
      <div className="flex flex-col gap-2">
        <Checkbox label="Remember me" defaultChecked />
        <Checkbox label="Send notifications" />
      </div>
    ),
    example: `<Checkbox label="Remember me" />`,
  },
  {
    id: "radio",
    name: "Radio",
    category: "Selection",
    description: "Mutually exclusive options within a set.",
    importName: "Radio",
    preview: (
      <div className="flex flex-col gap-2">
        <Radio name="demo" label="Electricity" defaultChecked />
        <Radio name="demo" label="Gas" />
      </div>
    ),
    example: `<Radio name="fuel" label="Electricity" />`,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "Selection",
    description: "On/off switch for settings and feature flags.",
    importName: "Toggle",
    preview: <Toggle label="Synthetic hourly data" defaultChecked />,
    example: `<Toggle label="Synthetic hourly data" checked={on} onCheckedChange={setOn} />`,
  },
  {
    id: "chip",
    name: "Chip",
    category: "Data display",
    description: "Compact labels for filters, tags, and metadata.",
    importName: "Chip",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Chip>Neutral</Chip>
        <Chip tone="primary">Primary</Chip>
        <Chip tone="success">Success</Chip>
        <Chip tone="warning">Warning</Chip>
      </div>
    ),
    example: `<Chip tone="success">Synthetic</Chip>`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data display",
    description: "Status indicators for alerts and system states.",
    importName: "Badge",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    ),
    example: `<Badge variant="warning">Review</Badge>`,
  },
  {
    id: "page-controls",
    name: "Page controls",
    category: "Page controls",
    description: "Fund/asset filters, meter count, search, and bulk table actions.",
    importName: "PageControls",
    preview: <PageControls />,
    example: `<PageControls meterCount={4003} onSend={handleSend} />`,
  },
];

export const COMPONENT_COUNT = COMPONENT_CATALOG.length;
