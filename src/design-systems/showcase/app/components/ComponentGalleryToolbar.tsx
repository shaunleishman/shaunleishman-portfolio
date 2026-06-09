"use client";

import { ContentTabs } from "@/design-systems/arbnco";
import { GALLERY_SECTIONS } from "./component-gallery-meta";

export const GALLERY_CATEGORIES = [
  "All",
  "Actions",
  "Forms",
  "Data",
  "Navigation",
  "Feedback",
  "Layout",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

type ComponentGalleryToolbarProps = {
  category: GalleryCategory;
  onCategoryChange: (value: GalleryCategory) => void;
};

const GALLERY_TABS = GALLERY_CATEGORIES.map((item) => ({
  value: item,
  label: item,
  count:
    item === "All"
      ? GALLERY_SECTIONS.length
      : GALLERY_SECTIONS.filter((section) => section.category === item).length,
}));

export function ComponentGalleryToolbar({ category, onCategoryChange }: ComponentGalleryToolbarProps) {
  return (
    <div className="showcase-gallery-toolbar -mx-4 mb-8 px-4 pb-1 pt-1 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <ContentTabs
        value={category}
        tabs={GALLERY_TABS}
        onChange={(value) => onCategoryChange(value as GalleryCategory)}
        fillRemaining={false}
        className="min-w-0 overflow-x-auto"
      />
    </div>
  );
}
