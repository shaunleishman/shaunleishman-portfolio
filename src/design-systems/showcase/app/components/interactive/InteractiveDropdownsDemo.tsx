"use client";

import { useEffect, useMemo, useState } from "react";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import { ConnectedDropdownSelection } from "../ConnectedDropdownSelection";

type DropdownMode = "single" | "multiple";

const LIST_SIZE_PRESETS = [
  { value: "4", label: "Less than 5 items" },
  { value: "8", label: "More than 5 items" },
  { value: "15", label: "More than 10 items" },
] as const;

function buildDemoOptions(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    value: `option-${index + 1}`,
    label: `Dropdown ${index + 1}`,
  }));
}

export function InteractiveDropdownsDemo() {
  const [mode, setMode] = useState<DropdownMode>("single");
  const [listSize, setListSize] = useState("4");
  const [singleValue, setSingleValue] = useState("option-1");
  const [multiValue, setMultiValue] = useState<string[]>(["option-1", "option-2"]);
  const [showAll, setShowAll] = useState(false);
  const [expandSingleValue, setExpandSingleValue] = useState("medium");
  const [expandMultiValue, setExpandMultiValue] = useState<string[]>(["option-1", "option-2"]);

  const demoOptions = useMemo(() => buildDemoOptions(Number(listSize)), [listSize]);
  const optionValues = useMemo(() => new Set(demoOptions.map((option) => option.value)), [demoOptions]);

  useEffect(() => {
    setSingleValue((current) => (optionValues.has(current) ? current : demoOptions[0]?.value ?? ""));
    setMultiValue((current) => current.filter((value) => optionValues.has(value)));
  }, [demoOptions, optionValues]);

  const liveCode =
    mode === "single"
      ? `import { ConnectedDropdownSelection } from './ConnectedDropdownSelection';

<ConnectedDropdownSelection
  label="Single select"
  value={selected}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  onChange={setSelected}
/>`
      : `import { ConnectedDropdownSelection } from './ConnectedDropdownSelection';

<ConnectedDropdownSelection
  multiple
  label="Multiple select"
  value={selected}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  onChange={setSelected}
/>`;

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "mode",
            label: "Type",
            value: mode,
            onChange: (value) => setMode(value as DropdownMode),
            options: [
              { value: "single", label: "Single select" },
              { value: "multiple", label: "Multiple select" },
            ],
          },
          {
            id: "listSize",
            label: "List size",
            value: listSize,
            onChange: setListSize,
            options: LIST_SIZE_PRESETS.map(({ value, label }) => ({ value, label })),
          },
        ]}
      />

      {showAll ? (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="showcase-dropdown-preview w-[252px]">
            <ConnectedDropdownSelection
              label="Single select"
              value={expandSingleValue}
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
              onChange={setExpandSingleValue}
            />
          </div>
          <div className="showcase-dropdown-preview w-[252px]">
            <ConnectedDropdownSelection
              multiple
              label="Multiple select"
              value={expandMultiValue}
              options={demoOptions}
              onChange={setExpandMultiValue}
            />
          </div>
        </div>
      ) : mode === "single" ? (
        <VariantPreviewFrame label="Connected single select" contentClassName="showcase-dropdown-preview">
          <div className="mx-auto w-[252px]">
            <ConnectedDropdownSelection
              label="Single select"
              value={singleValue}
              options={demoOptions}
              onChange={setSingleValue}
            />
          </div>
        </VariantPreviewFrame>
      ) : (
        <VariantPreviewFrame label="Connected multiple select" contentClassName="showcase-dropdown-preview">
          <div className="mx-auto w-[252px]">
            <ConnectedDropdownSelection
              multiple
              label="Multiple select"
              value={multiValue}
              options={demoOptions}
              onChange={setMultiValue}
              placeholder="Choose options"
            />
          </div>
        </VariantPreviewFrame>
      )}
    </div>
  );
}
