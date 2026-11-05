"use client";

import { useId, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { ConnectedInputField } from "@/design-systems/showcase/app/components/ConnectedInputField";
import { cn } from "@/lib/utils";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
  showTooltip?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  label = "",
  required,
  hint,
  error,
  className,
  disabled,
  type = "text",
  value,
  defaultValue,
  onChange,
  placeholder,
  leadingIcon,
  showTooltip = false,
  id,
  name,
  readOnly,
  tabIndex,
  autoComplete,
  maxLength,
  min,
  max,
  inputMode,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: InputProps) {
  const hintId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? String(value) : uncontrolledValue;
  const describedBy =
    [hint && !error ? hintId : undefined, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  function handleValue(next: string) {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <ConnectedInputField
        label={label}
        value={resolvedValue}
        onChange={handleValue}
        onInputChange={onChange}
        required={required ?? false}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        min={min}
        max={max}
        inputMode={inputMode}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={error ? true : ariaInvalid}
        showTooltip={showTooltip}
        compBefore={Boolean(leadingIcon)}
        className="max-w-none"
        forcedState={error ? "Validation" : undefined}
        notifier={error ? { text: error, tone: "error" } : null}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1 text-[length:var(--typography-font-size-xxs)] text-[var(--colour-labels-disabled)]">
          {hint}
        </p>
      )}
    </div>
  );
}
