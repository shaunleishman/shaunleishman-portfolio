"use client";

import { useMemo, useState } from "react";
import { AccordionFilterSection } from "./AccordionFilterSection";
import drawerSvgPaths from "../../imports/FilteringDrawer/svg-yt9cbczai6";

const CATEGORY_COUNT = 4;
const BASE_PROJECT_COUNT = 100;

type CategoryState = {
  open: boolean;
  selected: Set<number>;
};

function SearchIcon() {
  return (
    <svg className="block size-4 shrink-0" fill="none" viewBox="0 0 13.3333 13.3333" aria-hidden>
      <path clipRule="evenodd" d={drawerSvgPaths.p202b24c0} fill="#4A5453" fillRule="evenodd" />
    </svg>
  );
}

function createInitialCategories(): CategoryState[] {
  return Array.from({ length: CATEGORY_COUNT }, (_, index) => ({
    open: index === 0,
    selected: index === 0 ? new Set([0, 1]) : new Set<number>(),
  }));
}

type ConnectedFilteringDrawerProps = {
  className?: string;
  onStatus?: (message: string) => void;
};

export function ConnectedFilteringDrawer({ className, onStatus }: ConnectedFilteringDrawerProps) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<CategoryState[]>(createInitialCategories);

  const totalSelected = useMemo(
    () => categories.reduce((sum, category) => sum + category.selected.size, 0),
    [categories],
  );

  const displayedProjects = Math.max(12, BASE_PROJECT_COUNT - totalSelected * 4);

  const toggleCategoryOpen = (index: number) => {
    setCategories((current) =>
      current.map((category, categoryIndex) => ({
        ...category,
        open: categoryIndex === index ? !category.open : false,
      })),
    );
  };

  const toggleOption = (categoryIndex: number, optionIndex: number) => {
    setCategories((current) =>
      current.map((category, index) => {
        if (index !== categoryIndex) return category;
        const next = new Set(category.selected);
        if (next.has(optionIndex)) next.delete(optionIndex);
        else next.add(optionIndex);
        return { ...category, selected: next };
      }),
    );
  };

  const clearCategory = (categoryIndex: number) => {
    setCategories((current) =>
      current.map((category, index) =>
        index === categoryIndex ? { ...category, selected: new Set() } : category,
      ),
    );
  };

  const clearAll = () => {
    setCategories((current) => current.map((category) => ({ ...category, selected: new Set() })));
    onStatus?.("All filters cleared");
  };

  const saveFilter = () => {
    onStatus?.(
      totalSelected > 0
        ? `Saved filter with ${totalSelected} selection${totalSelected === 1 ? "" : "s"}`
        : "Add at least one filter selection before saving",
    );
  };

  return (
    <div
      className={`showcase-filtering-drawer flex w-full max-w-[443px] flex-col bg-white ${className ?? ""}`}
      data-name="Filtering drawer"
    >
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold leading-6 tracking-[-0.3px] text-[#4a5453]">Filters</h2>
      </div>

      <div className="px-6 py-4">
        <label className="sr-only" htmlFor="filter-drawer-search">
          Search filters
        </label>
        <div className="relative flex h-10 w-full items-center gap-2 rounded-lg border border-[#aab6b4] bg-white px-3">
          <SearchIcon />
          <input
            id="filter-drawer-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Placeholder"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm leading-5 text-[#4a5453] outline-none placeholder:text-[#aab6b4]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 px-6 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={clearAll}
            className="h-10 cursor-pointer rounded-lg border border-[#00a7b5] bg-white px-3 text-sm font-semibold leading-5 text-[#00a7b5]"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={saveFilter}
            className="h-10 cursor-pointer rounded-lg bg-[#00a7b5] px-3 text-sm font-semibold leading-5 text-white"
          >
            Save filter
          </button>
        </div>
        <p className="min-w-0 flex-1 text-base text-[#4a5453]">Displaying {displayedProjects} projects</p>
      </div>

      <div className="relative w-full border-t border-[#f5f6f6]" aria-hidden />

      <div className="relative w-full">
        {categories.map((category, index) => (
          <AccordionFilterSection
            key={index}
            selected={category.selected}
            open={category.open}
            onToggleOpen={() => toggleCategoryOpen(index)}
            onToggleOption={(optionIndex) => toggleOption(index, optionIndex)}
            onClearCategory={() => clearCategory(index)}
            searchQuery={search}
          />
        ))}
      </div>
    </div>
  );
}
