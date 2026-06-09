"use client";

import { useState, type ChangeEvent, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ConnectedDropdownSelection } from "@/design-systems/showcase/app/components/ConnectedDropdownSelection";

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value" | "defaultValue" | "placeholder" | "size"
> & {
  label?: string;
  required?: boolean;
  /** Set to `false` when the select always has a valid value and no empty option is needed. */
  placeholder?: string | false;
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  accentColor?: string;
  menuPlacement?: "above" | "below";
  size?: "md" | "sm";
};

export function Select({
  label,
  required,
  placeholder = "Select…",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  className,
  accentColor,
  "aria-label": ariaLabel,
  menuPlacement = "below",
  size = "md",
}: SelectProps) {
  const initialValue =
    defaultValue ?? (placeholder === false ? (options[0]?.value ?? "") : "");
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const value = controlledValue ?? uncontrolledValue;
  const resolvedPlaceholder = placeholder === false ? (options[0]?.label ?? "") : (placeholder ?? "Select…");

  const handleChange = (next: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(next);
    }

    onChange?.({
      target: { value: next },
    } as ChangeEvent<HTMLSelectElement>);
  };

  return (
    <ConnectedDropdownSelection
      label={label}
      required={required}
      aria-label={ariaLabel}
      value={value}
      options={options}
      onChange={handleChange}
      disabled={disabled}
      placeholder={resolvedPlaceholder}
      accentColor={accentColor}
      menuPlacement={menuPlacement}
      size={size}
      className={cn(!className?.match(/\bw-/) && "w-full", className)}
    />
  );
}
