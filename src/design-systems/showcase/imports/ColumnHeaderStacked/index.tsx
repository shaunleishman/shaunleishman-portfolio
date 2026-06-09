import svgPaths from "./svg-t3czd300bg";
import { cn } from "@/lib/utils";

type CounterProps = {
  className?: string;
  counter?: "Large" | "Medium" | "Small" | "Actionable" | "Disabled";
  showCompAfter?: boolean;
  showLabel?: boolean;
};

function Counter({ className, counter = "Small", showCompAfter = true, showLabel = true }: CounterProps) {
  const isActionable = counter === "Actionable";
  const isDisabled = counter === "Disabled";
  const isLarge = counter === "Large";
  return (
    <div
      className={
        className ||
        `content-stretch flex items-center justify-center relative rounded-[8px] ${isDisabled ? "bg-[#e5e8e7] h-[20px] p-[6px]" : isActionable ? "bg-[#e5e8e7] gap-[4px] h-[24px] p-[6px]" : isLarge ? "bg-[#e0f7fa] h-[48px] px-[10px] py-[4px]" : "bg-[#e0f7fa] h-[20px] p-[6px]"}`
      }
    >
      {["Small", "Large", "Medium", "Disabled"].includes(counter) && (
        <div
          className={`flex flex-col font-["Open_Sans:semi-bold",sans-serif] h-full justify-center not-italic relative shrink-0 text-center tracking-[-0.1px] ${isDisabled ? "text-[#4a5453] text-[10px] w-[12px]" : counter === "Medium" ? "text-[#106c7a] text-[10px] w-[17px]" : isLarge ? "text-[#106c7a] text-[14px] w-[28px]" : "text-[#106c7a] text-[10px] w-[12px]"}`}
        >
          <p className={isLarge ? "leading-[20px]" : "leading-[16px]"}>
            {["Large", "Medium"].includes(counter) ? "100" : isDisabled ? "10" : "10"}
          </p>
        </div>
      )}
      {isActionable && showLabel && (
        <div className="flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center not-italic relative shrink-0 text-[#4a5453] text-[10px] tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">100000</p>
        </div>
      )}
      {isActionable && showCompAfter && (
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="x-close">
          <div className="absolute inset-[20.83%]" data-name="Icon (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
              <path
                clipRule="evenodd"
                d={svgPaths.p36a7c230}
                fill="var(--fill-0, #4A5453)"
                fillRule="evenodd"
                id="Icon (Stroke)"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

type ColumnHeaderProps = {
  className?: string;
  columnText?: string;
  showCompLeft?: boolean;
  showCompRight?: boolean;
  showText?: boolean;
};

function SortIcon() {
  return (
    <div className="relative shrink-0 size-4" data-name="chevron-selector-vertical" aria-hidden>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
        <path clipRule="evenodd" d={svgPaths.p2fad9100} fill="#4A5453" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function ColumnHeaderCell({
  className,
  columnText = "Column name",
  showCompLeft = true,
  showCompRight = true,
  showText = true,
  centered = false,
}: ColumnHeaderProps & { centered?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-10 min-w-0 flex-1 items-center bg-[#f5f6f6] px-3 py-2",
        centered ? "justify-center" : "justify-between gap-2",
        className,
      )}
    >
      <div className={cn("flex min-w-0 items-center gap-2", centered && "justify-center")}>
        {showText && (
          <p className="truncate font-['Open_Sans:bold',sans-serif] text-sm font-bold leading-5 tracking-[-0.1px] text-[#4a5453]">
            {columnText}
          </p>
        )}
        {showCompLeft && (
          <Counter
            className="bg-[#e5e8e7] content-stretch flex gap-[4px] h-[24px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0"
            counter="Actionable"
          />
        )}
      </div>
      {!centered && showCompRight && <SortIcon />}
    </div>
  );
}

type ColumnHeaderStackedProps = {
  className?: string;
  header?: "Stacked";
  level2Left?: boolean;
  level2Right?: boolean;
  level3Left?: boolean;
  level3Mid?: boolean;
  level3Right?: boolean;
  showLevel1?: boolean;
  showLevel2?: boolean;
  showLevel3?: boolean;
};

export default function ColumnHeaderStacked({
  className,
  level2Left = true,
  level2Right = true,
  level3Left = true,
  level3Mid = true,
  level3Right = true,
  showLevel1 = true,
  showLevel2 = true,
  showLevel3 = true,
}: ColumnHeaderStackedProps) {
  return (
    <div
      className={cn(
        "w-full min-w-[640px] overflow-hidden rounded-t-lg border border-[#aab6b4] bg-[#f5f6f6]",
        className,
      )}
    >
      {showLevel1 && (
        <ColumnHeaderCell centered showCompLeft={false} showCompRight={false} className="border-b border-[#aab6b4]" />
      )}

      {showLevel2 && (
        <div className="flex divide-x divide-[#aab6b4] border-b border-[#aab6b4]">
          {level2Left && <ColumnHeaderCell centered showCompLeft={false} showCompRight={false} />}
          {level2Right && <ColumnHeaderCell centered showCompLeft={false} showCompRight={false} />}
        </div>
      )}

      {showLevel3 && (
        <div className="flex divide-x divide-[#aab6b4]">
          {level3Left && <ColumnHeaderCell showCompLeft={false} />}
          {level3Mid && <ColumnHeaderCell showCompLeft={false} />}
          {level3Right && <ColumnHeaderCell showCompLeft={false} />}
        </div>
      )}
    </div>
  );
}
