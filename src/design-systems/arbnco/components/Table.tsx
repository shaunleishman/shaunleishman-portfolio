import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("min-w-full border-collapse", className)} {...props} />;
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-bg)]", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-[#f0f0f0] transition-colors hover:bg-[#f9f9f9] data-[selected=true]:bg-[var(--blue-p100)]",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-[var(--measurement-spacing-sm)] py-3 text-left text-[length:var(--typography-font-size-xs)] font-semibold text-[var(--colour-labels-neutral)]",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-[var(--measurement-spacing-sm)] py-3 text-[length:var(--typography-font-size-xs)] text-[var(--colour-labels-neutral)]",
        className,
      )}
      {...props}
    />
  );
}

export function TableContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-[var(--radius-medium-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)]",
        className,
      )}
      {...props}
    />
  );
}
