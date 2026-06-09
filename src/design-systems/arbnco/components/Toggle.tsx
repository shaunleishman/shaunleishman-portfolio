"use client";

import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function Toggle({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  disabled,
  className,
}: ToggleProps) {
  return (
    <label className={cn("inline-flex items-center gap-[var(--measurement-spacing-xs)]", className)}>
      <Switch.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="relative h-6 w-11 rounded-full bg-[var(--colour-surfaces-disabled)] transition-colors data-[state=checked]:bg-[var(--accents-growth)] disabled:opacity-50"
      >
        <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-[var(--colour-surfaces-neutral)] shadow transition-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
      {label && (
        <span className="text-[var(--typography-font-size-xs)] text-[var(--colour-labels-neutral)]">{label}</span>
      )}
    </label>
  );
}
