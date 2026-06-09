"use client";

import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from "react";
import CheckBox from "../../imports/CheckBox";
import { cn } from "@/lib/utils";

export type ConnectedCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  indeterminate?: boolean;
};

function resolveVisualState(
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean,
): "On" | "Off" | "Indeterminate" | "Disabled-on" | "Disabled-off" {
  if (disabled) return checked || indeterminate ? "Disabled-on" : "Disabled-off";
  if (indeterminate) return "Indeterminate";
  return checked ? "On" : "Off";
}

export function ConnectedCheckbox({
  label,
  className,
  id,
  indeterminate = false,
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  ...props
}: ConnectedCheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : generatedId);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked));

  const isChecked = isControlled ? Boolean(checked) : uncontrolledChecked;
  const visualState = resolveVisualState(isChecked, indeterminate, disabled);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-[var(--measurement-spacing-xs)]",
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <input
        ref={inputRef}
        id={checkboxId}
        type="checkbox"
        className="sr-only"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={(event) => {
          if (!isControlled) {
            setUncontrolledChecked(event.target.checked);
          }
          onChange?.(event);
        }}
        {...props}
      />
      <CheckBox checkBox={visualState} comp={false} aria-hidden />
      {label && (
        <span className="text-[var(--typography-font-size-xs)] text-[var(--colour-labels-neutral)]">{label}</span>
      )}
    </label>
  );
}
