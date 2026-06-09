import svgPaths from "./svg-e5031dtwa0";
type CounterProps = {
  className?: string;
  counter?: "Large" | "Medium" | "Small" | "Actionable" | "Disabled";
  showCompAfter?: boolean;
  showLabel?: boolean;
};

export default function Counter({ className, counter = "Small", showCompAfter = true, showLabel = true }: CounterProps) {
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