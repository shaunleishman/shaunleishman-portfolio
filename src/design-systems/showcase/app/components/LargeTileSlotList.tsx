"use client";

import svgPaths from "../../imports/LargeTileDesignNew/svg-xoyoudsrdw";
import { ConnectedButtonMedium } from "./ConnectedButtonMedium";

const ROW_COUNT = 5;

function RowAddButton({ disabled, onClick }: { disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="Add item"
      onClick={onClick}
      className="relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center overflow-clip border-0 bg-transparent p-0 disabled:cursor-not-allowed"
    >
      <svg className="size-full" fill="none" viewBox="0 0 16 16" aria-hidden>
        <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="#4A5453" fillRule="evenodd" />
      </svg>
    </button>
  );
}

type LargeTileSlotListProps = {
  disabled?: boolean;
  muted?: boolean;
  onRowButtonClick?: (rowIndex: number) => void;
  onRowAddClick?: (rowIndex: number) => void;
};

export function LargeTileSlotList({
  disabled = false,
  muted = false,
  onRowButtonClick,
  onRowAddClick,
}: LargeTileSlotListProps) {
  const rowBg = muted ? "bg-[#e5e8e7]" : "bg-white";

  return (
    <>
      {Array.from({ length: ROW_COUNT }, (_, index) => (
        <div
          key={index}
          className={`${rowBg} h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full`}
          data-name="Button-large"
        >
          <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
            <div className="relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
              <div className="flex shrink-0 items-center gap-[12px]" data-name="Button-text-icon">
                <ConnectedButtonMedium
                  disabled={disabled}
                  onClick={() => onRowButtonClick?.(index + 1)}
                />
                <span className="whitespace-nowrap text-base font-semibold leading-6 tracking-[-0.1px] text-[#4a5453]">
                  Label
                </span>
              </div>
              <RowAddButton disabled={disabled} onClick={() => onRowAddClick?.(index + 1)} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
