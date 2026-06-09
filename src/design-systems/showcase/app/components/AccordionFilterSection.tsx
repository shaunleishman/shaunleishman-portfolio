"use client";

import CheckBox from "../../imports/CheckBox";
import { ConnectedChip } from "./ConnectedChip";
import { ShowcaseChevron } from "./ShowcaseChevron";
import svgPaths from "../../imports/AccordianFilter/svg-43eg0hyodk";

const FILTER_OPTIONS = ["Checkbox", "Checkbox", "Checkbox", "Checkbox", "Checkbox"];

function UserIcon() {
  return (
    <div className="relative size-6 shrink-0" data-name="image-user">
      <svg className="block size-full" fill="none" viewBox="0 0 22 22" aria-hidden>
        <path d={svgPaths.p12731a00} fill="#4A5453" />
        <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="#4A5453" fillRule="evenodd" />
      </svg>
    </div>
  );
}

export type AccordionFilterSectionProps = {
  title?: string;
  options?: string[];
  selected: Set<number>;
  onToggleOption: (index: number) => void;
  onClearCategory: () => void;
  open: boolean;
  onToggleOpen: () => void;
  showUserIcon?: boolean;
  searchQuery?: string;
};

export function AccordionFilterSection({
  title = "Category name",
  options = FILTER_OPTIONS,
  selected,
  onToggleOption,
  onClearCategory,
  open,
  onToggleOpen,
  showUserIcon = false,
  searchQuery = "",
}: AccordionFilterSectionProps) {
  const selectedCount = selected.size;
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const visibleOptions = options
    .map((label, index) => ({ label, index }))
    .filter(({ label }) => !normalizedSearch || label.toLowerCase().includes(normalizedSearch));

  return (
    <div className="showcase-accordion-filter w-full border-t border-[#f5f6f6]">
      <div
        className={`bg-white ${open ? "border-b border-[#00a7b5]" : "border-b border-[#f5f6f6]"}`}
        data-name="Accordian"
      >
        <div className="showcase-accordion-filter__header flex w-full items-center justify-between gap-4 px-8 py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              aria-expanded={open}
              onClick={onToggleOpen}
              className="flex min-w-0 cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-left"
            >
              {showUserIcon && <UserIcon />}
              <span
                className={`truncate text-sm font-bold leading-5 tracking-[-0.1px] ${open ? "text-[#00a7b5]" : "text-[#4a5453]"}`}
              >
                {title}
              </span>
            </button>

            {selectedCount > 0 && (
              <ConnectedChip
                label={String(selectedCount)}
                removeAriaLabel={`${title} filters`}
                onRemove={onClearCategory}
              />
            )}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
            onClick={onToggleOpen}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          >
            <ShowcaseChevron direction={open ? "up" : "down"} size="sm" />
          </button>
        </div>
      </div>

      {open && visibleOptions.length > 0 && (
        <div className="bg-[#f5f6f6] px-8 py-6" data-name="List types">
          <ul className="flex w-full flex-col items-start gap-6" data-name="Multiple item list">
            {visibleOptions.map(({ label, index }) => {
              const checked = selected.has(index);
              return (
                <li key={index} className="w-full" data-name="Single item">
                  <button
                    type="button"
                    aria-pressed={checked}
                    onClick={() => onToggleOption(index)}
                    className="flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-left"
                  >
                    <CheckBox checkBox={checked ? "On" : "Off"} comp={false} />
                    <span className="text-sm leading-5 tracking-[-0.1px] text-[#4a5453]">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {open && visibleOptions.length === 0 && normalizedSearch && (
        <div className="bg-[#f5f6f6] px-8 py-6 text-sm text-[#aab6b4]">No options match your search.</div>
      )}
    </div>
  );
}
