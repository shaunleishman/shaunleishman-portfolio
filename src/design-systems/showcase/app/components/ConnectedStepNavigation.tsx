"use client";

import { Fragment } from "react";
import svgPaths from "../../imports/StepHeaderNavigation/svg-ey42xntbzl";

export type StepNavItem = {
  id: string;
  label: string;
};

type ConnectedStepNavigationProps = {
  steps: StepNavItem[];
  currentStep: number;
  onStepChange: (index: number) => void;
  className?: string;
};

type StepVisualState = "complete" | "current" | "incomplete";

function getStepState(stepIndex: number, currentStep: number): StepVisualState {
  if (stepIndex < currentStep) return "complete";
  if (stepIndex === currentStep) return "current";
  return "incomplete";
}

function EditIcon() {
  return (
    <div className="relative size-4 shrink-0" data-name="edit-02">
      <div className="absolute inset-[4.88%_4.88%_6.25%_6.25%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.219 14.219">
          <path clipRule="evenodd" d={svgPaths.p3738b800} fill="white" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative size-4 shrink-0" data-name="check">
      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8.66667">
          <path clipRule="evenodd" d={svgPaths.pfa54200} fill="white" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function StepConnector({ state }: { state: StepVisualState }) {
  if (state === "complete") {
    return <div className="h-[3px] min-w-[1.5rem] flex-1 rounded-[8px] bg-[#4ca843]" aria-hidden />;
  }

  if (state === "current") {
    return (
      <div className="h-[3px] min-w-[1.5rem] flex-1 rounded-[8px] bg-[#e5e8e7] pr-6" aria-hidden>
        <div className="h-full w-full rounded-[8px] bg-[#00a7b5]" />
      </div>
    );
  }

  return <div className="h-[3px] min-w-[1.5rem] flex-1 rounded-[8px] bg-[#e5e8e7]" aria-hidden />;
}

function StepBadge({ state, stepNumber }: { state: StepVisualState; stepNumber: number }) {
  const bg =
    state === "complete" ? "bg-[#4ca843]" : state === "current" ? "bg-[#00a7b5]" : "bg-[#e5e8e7]";

  return (
    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full p-2 ${bg}`}>
      {state === "complete" && <CheckIcon />}
      {state === "current" && <EditIcon />}
      {state === "incomplete" && (
        <span className="text-[14px] font-semibold leading-5 text-[#4a5453]">{stepNumber}</span>
      )}
    </span>
  );
}

export function ConnectedStepNavigation({
  steps,
  currentStep,
  onStepChange,
  className,
}: ConnectedStepNavigationProps) {
  return (
    <div
      className={`showcase-connected-step-nav flex w-full min-w-0 items-center overflow-x-auto ${className ?? ""}`}
      role="tablist"
      aria-label="Step navigation"
    >
      {steps.map((step, index) => {
        const state = getStepState(index, currentStep);
        const isLast = index === steps.length - 1;

        return (
          <Fragment key={step.id}>
            <button
              type="button"
              role="tab"
              aria-selected={index === currentStep}
              aria-current={index === currentStep ? "step" : undefined}
              onClick={() => onStepChange(index)}
              className="flex shrink-0 cursor-pointer items-center gap-4 border-0 bg-transparent p-4 text-left"
            >
              <StepBadge state={state} stepNumber={index + 1} />
              <span className="whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[-0.1px] text-[#4a5453]">
                {step.label}
              </span>
            </button>
            {!isLast && <StepConnector state={getStepState(index, currentStep)} />}
          </Fragment>
        );
      })}
    </div>
  );
}
