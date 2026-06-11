"use client";

import { useMemo, useState, type MouseEvent as ReactMouseEvent } from "react";
import ToolTip from "../../../imports/ToolTip";
import type { TooltipPointerSide } from "../../../imports/ToolTip/tooltip-shape";
import { cn } from "@/lib/utils";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

const TOOLTIP_VARIANTS = ["Dark", "Light", "Error"] as const;
const POINTER_SIDES: { value: TooltipPointerSide; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const TOOLTIP_ANCHOR_POSITION: Record<TooltipPointerSide, string> = {
  bottom: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  top: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "left-full top-1/2 ml-2 -translate-y-1/2",
  right: "right-full top-1/2 mr-2 -translate-y-1/2",
};

function resolvePointerSide(event: ReactMouseEvent<HTMLButtonElement>): TooltipPointerSide {
  const rect = event.currentTarget.getBoundingClientRect();
  const relativeX = (event.clientX - rect.left) / rect.width;
  const relativeY = (event.clientY - rect.top) / rect.height;
  const horizontalOffset = Math.abs(relativeX - 0.5);
  const verticalOffset = Math.abs(relativeY - 0.5);

  if (horizontalOffset > verticalOffset) {
    return relativeX < 0.5 ? "left" : "right";
  }

  return relativeY < 0.5 ? "top" : "bottom";
}

type TooltipVariant = (typeof TOOLTIP_VARIANTS)[number];

export function InteractiveTooltipsDemo() {
  const [variant, setVariant] = useState<TooltipVariant>("Light");
  const [pointerSide, setPointerSide] = useState<TooltipPointerSide>("bottom");
  const [showAll, setShowAll] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const updateTooltipSide = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setShowTooltip(true);
    setPointerSide(resolvePointerSide(event));
  };

  const liveCode = useMemo(
    () => `import ToolTip from './imports/ToolTip';

<ToolTip toolTip="${variant}" pointerSide="${pointerSide}" />`,
    [variant, pointerSide],
  );

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        filters={[
          {
            id: "variant",
            label: "Type",
            value: variant,
            onChange: (value) => setVariant(value as TooltipVariant),
            options: TOOLTIP_VARIANTS.map((item) => ({ value: item, label: item })),
          },
          {
            id: "pointerSide",
            label: "Pointer",
            value: pointerSide,
            onChange: (value) => setPointerSide(value as TooltipPointerSide),
            options: POINTER_SIDES,
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-8">
          {TOOLTIP_VARIANTS.map((item) => (
            <div key={item}>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">{item}</p>
              <div className="flex justify-center py-6">
                <ToolTip toolTip={item} pointerSide={pointerSide} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={`${variant} tooltip · ${pointerSide} pointer`}>
            <div className="relative flex flex-col items-center gap-4 py-6">
              <div className="relative">
                <button
                  type="button"
                  className="rounded-[8px] border border-[#aab6b4] bg-white px-4 py-2 text-sm text-[#4a5453]"
                  onMouseMove={updateTooltipSide}
                  onMouseEnter={updateTooltipSide}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => {
                    setPointerSide("bottom");
                    setShowTooltip(true);
                  }}
                  onBlur={() => setShowTooltip(false)}
                >
                  Hover or focus me
                </button>
                {showTooltip && (
                  <div className={cn("absolute z-10", TOOLTIP_ANCHOR_POSITION[pointerSide])}>
                    <ToolTip toolTip={variant} pointerSide={pointerSide} />
                  </div>
                )}
              </div>
            </div>
          </VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Move the pointer over the button: the tooltip opens on the opposite side (left edge → right, top →
            bottom, and so on). Use the Type filter to preview tooltip styles.
          </p>
        </>
      )}
    </div>
  );
}
