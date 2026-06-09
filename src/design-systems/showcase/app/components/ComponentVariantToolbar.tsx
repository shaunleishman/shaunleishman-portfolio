"use client";

import type { ReactNode } from "react";
import { ConnectedDropdownSelection } from "./ConnectedDropdownSelection";
import { ShowcaseChromeButton } from "./ShowcaseChromeButton";

export type VariantFilterOption = {
  value: string;
  label: string;
};

export type VariantFilter = {
  id: string;
  label: string;
  value: string;
  options: VariantFilterOption[];
  onChange: (value: string) => void;
};

type ComponentVariantToolbarProps = {
  filters: VariantFilter[];
  showAll: boolean;
  onShowAllChange: (value: boolean) => void;
  expandLabel?: string;
  collapseLabel?: string;
};

export function ComponentVariantToolbar({
  filters,
  showAll,
  onShowAllChange,
  expandLabel = "Expand all variants",
  collapseLabel = "Show single variant",
}: ComponentVariantToolbarProps) {
  return (
    <div
      className="showcase-variant-toolbar mb-4 flex w-full flex-col gap-4 rounded-lg border p-3 sm:mb-6 sm:p-4 lg:flex-row lg:flex-wrap lg:items-end"
      style={{ borderColor: "#aab6b4", backgroundColor: "#ffffff" }}
    >
      {filters.map((filter) => (
        <ConnectedDropdownSelection
          key={filter.id}
          label={filter.label}
          value={filter.value}
          options={filter.options}
          onChange={filter.onChange}
          disabled={showAll}
        />
      ))}

      <div className="lg:ml-auto lg:pb-0">
        <ShowcaseChromeButton
          variant={showAll ? "secondary" : "ghost"}
          onClick={() => onShowAllChange(!showAll)}
        >
          {showAll ? collapseLabel : expandLabel}
        </ShowcaseChromeButton>
      </div>
    </div>
  );
}

export function VariantPreviewFrame({
  children,
  label,
  className,
  contentClassName,
  align = "center",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
  contentClassName?: string;
  align?: "center" | "stretch";
}) {
  return (
    <div
      className={`showcase-preview-frame min-w-0 rounded-lg border p-4 sm:p-8 ${className ?? ""}`}
      style={{ borderColor: "#aab6b4", backgroundColor: "#ffffff" }}
    >
      {label && (
        <p className="showcase-preview-label mb-4 text-center text-xs font-semibold uppercase tracking-wide">
          {label}
        </p>
      )}
      <div
        className={`showcase-component-preview min-h-[5rem] py-4 ${contentClassName ?? ""}`}
      >
        {align === "stretch" ? (
          <div className="w-full min-w-0">{children}</div>
        ) : (
          <div className="flex w-full min-w-0 items-center justify-center">{children}</div>
        )}
      </div>
    </div>
  );
}
