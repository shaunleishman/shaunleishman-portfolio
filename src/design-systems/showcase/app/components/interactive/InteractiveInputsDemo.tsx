"use client";

import { useMemo, useState } from "react";
import { ConnectedInputField } from "../ConnectedInputField";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type InputState =
  | "Default"
  | "Hover"
  | "Selected"
  | "Disabled"
  | "Validation"
  | "Warning";

const INPUT_STATES: { value: InputState; label: string }[] = [
  { value: "Default", label: "Default" },
  { value: "Hover", label: "Hover" },
  { value: "Selected", label: "Selected (focus)" },
  { value: "Disabled", label: "Disabled" },
  { value: "Validation", label: "Validation (success)" },
  { value: "Warning", label: "Warning" },
];

const INPUT_PROPS: Record<
  InputState,
  { labelText: string; inputText: string; notifierText?: string }
> = {
  Default: { labelText: "Email", inputText: "Enter your email" },
  Hover: { labelText: "Email", inputText: "Enter your email" },
  Selected: { labelText: "Email", inputText: "user@example.com" },
  Disabled: { labelText: "Email", inputText: "Disabled input" },
  Validation: {
    labelText: "Email",
    inputText: "Enter your email",
    notifierText: "Email is valid",
  },
  Warning: {
    labelText: "Password",
    inputText: "Enter your password",
    notifierText: "Password is weak",
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function InputsAllVariants() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {INPUT_STATES.map(({ value, label }) => {
        const props = INPUT_PROPS[value];
        return (
          <div key={value}>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              {label}
            </p>
            <ConnectedInputField
              label={props.labelText}
              value={value === "Selected" ? "user@example.com" : value === "Disabled" ? props.inputText : ""}
              onChange={() => {}}
              placeholder={props.inputText}
              required
              disabled={value === "Disabled"}
              forcedState={value}
              notifier={
                props.notifierText
                  ? { text: props.notifierText, tone: value === "Validation" ? "success" : "warning" }
                  : null
              }
              className={value === "Hover" ? "connected-input-field--demo-hover" : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export function InteractiveInputsDemo() {
  const [inputState, setInputState] = useState<InputState>("Default");
  const [showAll, setShowAll] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const props = INPUT_PROPS[inputState];
  const isDisabled = inputState === "Disabled";
  const isWarning = inputState === "Warning";
  const isValidation = inputState === "Validation";
  const value = isWarning ? password : email;
  const onChange = isWarning ? setPassword : setEmail;

  const notifier = useMemo(() => {
    if (isValidation && EMAIL_PATTERN.test(email)) {
      return { text: "Email is valid", tone: "success" as const };
    }
    if (isWarning && password.length > 0 && password.length < 8) {
      return { text: "Password is weak", tone: "warning" as const };
    }
    return null;
  }, [email, isValidation, isWarning, password]);

  const liveCode = `import { ConnectedInputField } from './ConnectedInputField';

<ConnectedInputField
  label="${props.labelText}"
  type="${isWarning ? "password" : "email"}"
  value={value}
  onChange={setValue}
  placeholder="${props.inputText}"${
    isDisabled ? "\n  disabled" : ""
  }${
    isValidation || isWarning
      ? `\n  notifier={notifier} // shown when ${isValidation ? "email is valid" : "password is weak"}`
      : ""
  }
/>`;

  useComponentSectionCode(liveCode, !showAll);

  const previewLabel =
    inputState === "Selected"
      ? "Focused input"
      : inputState === "Validation"
        ? "Validation — type a valid email"
        : inputState === "Warning"
          ? "Warning — type a short password"
          : inputState;

  const hint =
    inputState === "Validation"
      ? "Type a complete email address to see the success notifier."
      : inputState === "Warning"
        ? "Type fewer than 8 characters to see the warning notifier."
        : inputState === "Disabled"
          ? "This field cannot be edited."
          : "Click the field to type. Hover and focus styles apply automatically.";

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all states"
        collapseLabel="Show focused view"
        filters={[
          {
            id: "state",
            label: "State",
            value: inputState,
            onChange: (value) => {
              const next = value as InputState;
              setInputState(next);
              if (next === "Default" || next === "Hover") {
                setEmail("");
                setPassword("");
              }
            },
            options: INPUT_STATES,
          },
        ]}
      />

      {showAll ? (
        <InputsAllVariants />
      ) : (
        <>
          <VariantPreviewFrame label={previewLabel}>
            <ConnectedInputField
              label={props.labelText}
              value={value}
              onChange={onChange}
              placeholder={props.inputText}
              required
              disabled={isDisabled}
              notifier={notifier}
              type={isWarning ? "password" : "email"}
              className={inputState === "Hover" ? "connected-input-field--demo-hover" : undefined}
            />
          </VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">{hint}</p>
        </>
      )}
    </div>
  );
}
