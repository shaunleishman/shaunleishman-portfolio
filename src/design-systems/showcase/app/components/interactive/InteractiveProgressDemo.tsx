"use client";

import { useState } from "react";
import ProgressBar from "../../../imports/ProgressBar";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type ProgressVariant = "Half" | "Full" | "Progress medium";

const PROGRESS_OPTIONS: { value: ProgressVariant; label: string }[] = [
  { value: "Half", label: "Half" },
  { value: "Full", label: "Full" },
  { value: "Progress medium", label: "Medium" },
];

export function InteractiveProgressDemo() {
  const [variant, setVariant] = useState<ProgressVariant>("Half");
  const [showAll, setShowAll] = useState(false);

  const liveCode = `import ProgressBar from './imports/ProgressBar';

<ProgressBar progressBar="${variant}" className="w-full" />`;

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "variant",
            label: "Progress",
            value: variant,
            onChange: (value) => setVariant(value as ProgressVariant),
            options: PROGRESS_OPTIONS,
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-6">
          {PROGRESS_OPTIONS.map(({ value, label }) => (
            <div key={value}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">{label}</p>
              <ProgressBar progressBar={value} className="w-full" />
            </div>
          ))}
        </div>
      ) : (
        <VariantPreviewFrame label={variant}>
          <div className="w-full max-w-md">
            <ProgressBar progressBar={variant} className="w-full" />
          </div>
        </VariantPreviewFrame>
      )}
    </div>
  );
}
