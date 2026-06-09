"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { ConnectedInputField } from "@/design-systems/showcase/app/components/ConnectedInputField";
import { cn } from "@/lib/utils";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
  showTooltip?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
}: InputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? String(value) : uncontrolledValue;

  function handleChange(next: string) {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onChange?.({ target: { value: next } } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <div className={cn("w-full", className)}>
      <ConnectedInputField
        label={label}
        value={resolvedValue}
        onChange={handleChange}
        required={required ?? false}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        showTooltip={showTooltip}
        compBefore={Boolean(leadingIcon)}
        className="max-w-none"
        forcedState={error ? "Validation" : undefined}
        notifierText={error}
      />
      {hint && !error && (
        <p className="mt-1 text-[length:var(--typography-font-size-xxs)] text-[var(--colour-labels-disabled)]">
          {hint}
        </p>
      )}
    </div>
  );
}
