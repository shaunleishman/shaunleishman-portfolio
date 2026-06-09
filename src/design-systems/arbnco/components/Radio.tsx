import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Radio({ label, className, id, ...props }: RadioProps) {
  const radioId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <label
      htmlFor={radioId}
      className={cn("inline-flex cursor-pointer items-center gap-[var(--measurement-spacing-xs)]", className)}
    >
      <input
        id={radioId}
        type="radio"
        className="size-4 accent-[var(--colour-surfaces-primary)]"
        {...props}
      />
      {label && (
        <span className="text-[var(--typography-font-size-xs)] text-[var(--colour-labels-neutral)]">{label}</span>
      )}
    </label>
  );
}
