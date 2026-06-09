"use client";

import { useState } from "react";
import { ConnectedStepNavigation, type StepNavItem } from "../ConnectedStepNavigation";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

export const DEMO_STEPS: StepNavItem[] = [
  { id: "select-meters", label: "Select meters" },
  { id: "asset-allocation", label: "Asset allocation" },
  { id: "edit-consent", label: "Edit customer consent" },
];

function ExpandAllStepRow({ index }: { index: number }) {
  const [step, setStep] = useState(index);
  return (
    <ConnectedStepNavigation steps={DEMO_STEPS} currentStep={step} onStepChange={setStep} />
  );
}

export function InteractiveStepsDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const liveCode = `import { ConnectedStepNavigation } from './ConnectedStepNavigation';

const [currentStep, setCurrentStep] = useState(${currentStep});

<ConnectedStepNavigation
  steps={DEMO_STEPS}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
/>`;

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "currentStep",
            label: "Active step",
            value: String(currentStep),
            onChange: (value) => setCurrentStep(Number(value)),
            options: DEMO_STEPS.map((step, index) => ({
              value: String(index),
              label: `Step ${index + 1} · ${step.label}`,
            })),
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-8">
          {DEMO_STEPS.map((_, index) => (
            <div key={index}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
                Step {index + 1} active
              </p>
              <ExpandAllStepRow index={index} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={`Step ${currentStep + 1} · ${DEMO_STEPS[currentStep].label}`} align="stretch">
            <ConnectedStepNavigation
              steps={DEMO_STEPS}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Click a step or use the Active step filter to preview incomplete, current, and complete states.
          </p>
        </>
      )}
    </div>
  );
}
