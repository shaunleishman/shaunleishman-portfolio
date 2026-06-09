"use client";

import { useState } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ label, hint, className, defaultValue, value, onChange, rows = 4, id, ...props }: TextareaProps) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? String(value) : uncontrolledValue;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block font-['Open_Sans:regular',sans-serif] text-[14px] leading-5 tracking-[-0.1px] text-[#4a5453]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        value={resolvedValue}
        onChange={(event) => {
          if (!isControlled) {
            setUncontrolledValue(event.target.value);
          }
          onChange?.(event);
        }}
        className="w-full rounded-[8px] border border-[#aab6b4] bg-white px-3 py-3 font-['Open_Sans:regular',sans-serif] text-[14px] leading-5 tracking-[-0.1px] text-[#4a5453] outline-none transition-[background-color,border-color] duration-150 focus:border-2 focus:border-[#00a7b5] focus:-m-px"
        {...props}
      />
      {hint && <p className="mt-1 text-[length:var(--typography-font-size-xxs)] text-[var(--colour-labels-disabled)]">{hint}</p>}
    </div>
  );
}
