import svgPaths from "./svg-hhoxcynuhr";
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
    <div className={className || `content-stretch flex items-center justify-center relative rounded-[8px] ${isDisabled ? "bg-[#e5e8e7] h-[20px] p-[6px]" : isActionable ? "bg-[#e5e8e7] gap-[4px] h-[24px] p-[6px]" : isLarge ? "bg-[#e0f7fa] h-[48px] px-[10px] py-[4px]" : "bg-[#e0f7fa] h-[20px] p-[6px]"}`}>
      {["Small", "Large", "Medium", "Disabled"].includes(counter) && (
        <div className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-["Open_Sans:semi-bold",sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-center tracking-[-0.1px] ${isDisabled ? "text-[#4a5453] text-[10px] w-[12px]" : counter === "Medium" ? "text-[#106c7a] text-[10px] w-[17px]" : isLarge ? "text-[#106c7a] text-[14px] w-[28px]" : "text-[#106c7a] text-[10px] w-[12px]"}`}>
          <p className={isLarge ? "leading-[20px]" : "leading-[16px]"}>{["Large", "Medium"].includes(counter) ? "100" : isDisabled ? "10" : "10"}</p>
        </div>
      )}
      {isActionable && showLabel && (
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[16px]">100000</p>
        </div>
      )}
      {isActionable && showCompAfter && (
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="x-close">
          <div className="absolute inset-[20.83%]" data-name="Icon (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
              <path clipRule="evenodd" d={svgPaths.p36a7c230} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
type LargeCardDesignNewProps = {
  className?: string;
  cardMd?: "Default" | "Selected" | "Card-md3";
  children?: React.ReactNode | null;
  showCompAfter1?: boolean;
  showDescription?: boolean;
  showHeading?: boolean;
};

export default function LargeCardDesignNew({ className, cardMd = "Default", children = null, showCompAfter1 = true, showDescription = true, showHeading = true }: LargeCardDesignNewProps) {
  const baseClassName = `content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] relative rounded-[16px] w-[424px] max-w-full shrink-0 ${cardMd === "Card-md3" ? "bg-[#e5e8e7]" : "bg-white"}`;
  return (
    <div className={className ? `${baseClassName} ${className}` : baseClassName}>
      <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none rounded-[16px] ${cardMd === "Selected" ? "border-2 border-[#00a7b5]" : "border border-[#aab6b4]"}`} />
      <div className="content-stretch flex items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-name="Heading-three-caption-medium">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Slot">
            {children || (
              <>
                {showHeading && <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] w-full">Heading</p>}
                {showHeading && <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:bold',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#4a5453] text-[36px] tracking-[-0.3px] w-full">20%</p>}
                <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">{showDescription && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Description</p>}</div>
              </>
            )}
          </div>
          {showCompAfter1 && <Counter className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Medium" />}
        </div>
      </div>
    </div>
  );
}