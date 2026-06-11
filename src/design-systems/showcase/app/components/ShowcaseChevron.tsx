"use client";

import { cn } from "@/lib/utils";
import accordionSvgPaths from "../../imports/AccordianFilter/svg-43eg0hyodk";
import tileSvgPaths from "../../imports/LargeTileDesignNew/svg-xoyoudsrdw";

/** sm (16px hit area): dropdowns, inputs. md (24px hit area): accordions, tiles. Glyph size matches Figma inset icons. */
export type ShowcaseChevronSize = "sm" | "md";

export type ShowcaseChevronDirection = "up" | "down" | "left" | "right";

export const SHOWCASE_CHEVRON_PX: Record<ShowcaseChevronSize, number> = {
  sm: 16,
  md: 24,
};

const CONTAINER_CLASS: Record<ShowcaseChevronSize, string> = {
  sm: "size-4",
  md: "size-6",
};

/** Visual glyph sizes: centred inside the hit-area container, matching Figma icon insets. */
const UP_DOWN_GLYPH_CLASS: Record<ShowcaseChevronSize, string> = {
  sm: "h-[5px] w-[9px]",
  md: "h-2 w-3.5",
};

const RIGHT_GLYPH_CLASS: Record<ShowcaseChevronSize, string> = {
  sm: "h-[9px] w-[5px]",
  md: "h-3.5 w-2",
};

type ShowcaseChevronProps = {
  direction: ShowcaseChevronDirection;
  size?: ShowcaseChevronSize;
  className?: string;
  fill?: string;
};

export function ShowcaseChevron({
  direction,
  size = "md",
  className,
  fill = "#4A5453",
}: ShowcaseChevronProps) {
  if (direction === "left" || direction === "right") {
    return (
      <span
        className={cn("inline-flex shrink-0 items-center justify-center overflow-clip", CONTAINER_CLASS[size], className)}
        aria-hidden
        data-name={`chevron-${direction}`}
      >
        <svg
          className={cn("block shrink-0", RIGHT_GLYPH_CLASS[size], direction === "left" && "rotate-180")}
          fill="none"
          viewBox="0 0 8 14"
        >
          <path clipRule="evenodd" d={tileSvgPaths.p1c6e4d00} fill={fill} fillRule="evenodd" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center overflow-clip", CONTAINER_CLASS[size], className)}
      aria-hidden
      data-name={`chevron-${direction}`}
    >
      <svg className={cn("block shrink-0", UP_DOWN_GLYPH_CLASS[size])} fill="none" viewBox="0 0 14 8">
        <path
          clipRule="evenodd"
          d={direction === "up" ? accordionSvgPaths.p12b6ab00 : accordionSvgPaths.pc0a6900}
          fill={fill}
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
}
