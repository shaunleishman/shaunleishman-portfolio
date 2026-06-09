import svgPaths from "./svg-5s2xg9xp9r";
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
type TableFieldProps = {
  className?: string;
  children?: React.ReactNode | null;
  columnText?: string;
  field?: "Centre" | "Right" | "Left" | "Right hover" | "Centre hover" | "Left hover" | "Right pushed" | "Centre pushed" | "Left pushed" | "Selected right" | "Selected centre" | "Selected left" | "Right edit" | "Centre edit" | "Left edit";
  showCompRight?: boolean;
  showText?: boolean;
};

export default function TableField({ className, children = null, columnText = "Field", field = "Left", showCompRight = true, showText = true }: TableFieldProps) {
  const isLeftEditOrCentreEditOrRightEdit = ["Left edit", "Centre edit", "Right edit"].includes(field);
  const isLeftOrCentreOrRightOrLeftHoverOrCentreHoverOrRightHoverOr = ["Left", "Centre", "Right", "Left hover", "Centre hover", "Right hover", "Selected left", "Selected centre", "Selected right", "Left pushed", "Centre pushed"].includes(field);
  const isRightPushed = field === "Right pushed";
  return (
    <div className={className || `content-stretch flex h-[40px] items-center px-[12px] py-[8px] relative w-[326px] ${isLeftEditOrCentreEditOrRightEdit ? "bg-white" : ["Left pushed", "Centre pushed", "Right pushed"].includes(field) ? "bg-[#b2ebf2] gap-[4px]" : ["Selected left", "Selected centre", "Selected right"].includes(field) ? "bg-[#e0f7fa] gap-[4px]" : ["Left hover", "Centre hover", "Right hover"].includes(field) ? "bg-[#f5f6f6] gap-[4px]" : "bg-white gap-[4px]"}`}>
      <div aria-hidden className={`absolute border-[#aab6b4] border-b border-solid inset-0 pointer-events-none ${["Right", "Right hover", "Selected right", "Right pushed", "Right edit"].includes(field) ? "border-r" : ["Centre", "Centre hover", "Selected centre", "Centre pushed", "Centre edit"].includes(field) ? "" : "border-l"}`} />
      {isLeftOrCentreOrRightOrLeftHoverOrCentreHoverOrRightHoverOr && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Slot">
          {children || (
            <>
              {showText && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">{columnText}</p>}
              <Counter className="bg-[#e5e8e7] content-stretch flex gap-[4px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Actionable" />
            </>
          )}
        </div>
      )}
      {isLeftOrCentreOrRightOrLeftHoverOrCentreHoverOrRightHoverOr && showCompRight && <Counter className="bg-[#e5e8e7] content-stretch flex gap-[4px] h-[24px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Actionable" />}
      {isLeftEditOrCentreEditOrRightEdit && (
        <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-name="Slot">
          {children || <Counter className="bg-[#e5e8e7] content-stretch flex gap-[4px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Actionable" />}
        </div>
      )}
      {isRightPushed && (
        <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Slot">
          {children || (
            <>
              {showText && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">{columnText}</p>}
              <Counter className="bg-[#e5e8e7] content-stretch flex gap-[4px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Actionable" showCompAfter={false} />
            </>
          )}
        </div>
      )}
      {isRightPushed && showCompRight && <Counter className="bg-[#e5e8e7] content-stretch flex gap-[4px] h-[24px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Actionable" />}
    </div>
  );
}