import svgPaths from "./svg-q62nnlulqm";
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
type MediumTileDesignNewProps = {
  className?: string;
  cardMd?: "Default" | "Hover" | "Disabled";
  position?: "Top" | "None" | "Middle" | "Bottom";
  showCompAfter1?: boolean;
  showCompAfter2?: boolean;
  showDescription?: boolean;
  showHeading?: boolean;
  showIconBefore?: boolean;
  type?: "Single" | "List";
};

export default function MediumTileDesignNew({ className, cardMd = "Default", position = "None", showCompAfter1 = true, showCompAfter2 = true, showDescription = true, showHeading = true, showIconBefore = true, type = "Single" }: MediumTileDesignNewProps) {
  const isDefaultAndListAndBottom = cardMd === "Default" && type === "List" && position === "Bottom";
  const isDefaultAndListAndMiddle = cardMd === "Default" && type === "List" && position === "Middle";
  const isDefaultAndListAndTop = cardMd === "Default" && type === "List" && position === "Top";
  const isDefaultAndSingleAndNone = cardMd === "Default" && type === "Single" && position === "None";
  const isDisabledAndIsSingleAndNoneOrListAndTopOrListAndMiddleOrListAnd = cardMd === "Disabled" && ((type === "Single" && position === "None") || (type === "List" && position === "Top") || (type === "List" && position === "Middle") || (type === "List" && position === "Bottom"));
  const isHoverAndListAndBottom = cardMd === "Hover" && type === "List" && position === "Bottom";
  const isHoverAndListAndMiddle = cardMd === "Hover" && type === "List" && position === "Middle";
  const isHoverAndListAndTop = cardMd === "Hover" && type === "List" && position === "Top";
  const isHoverAndSingleAndNone = cardMd === "Hover" && type === "Single" && position === "None";
  const baseClassName = `content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] relative w-[457.667px] max-w-full shrink-0 ${cardMd === "Disabled" && type === "List" && position === "Bottom" ? "bg-[#e5e8e7] rounded-bl-[16px] rounded-br-[16px]" : isHoverAndListAndBottom ? "bg-[#e0f7fa] rounded-bl-[16px] rounded-br-[16px]" : isDefaultAndListAndBottom ? "bg-white drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] rounded-bl-[16px] rounded-br-[16px]" : cardMd === "Disabled" && type === "List" && position === "Middle" ? "bg-[#e5e8e7]" : isHoverAndListAndMiddle ? "bg-[#e0f7fa]" : isDefaultAndListAndMiddle ? "bg-white drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)]" : cardMd === "Disabled" && type === "List" && position === "Top" ? "bg-[#e5e8e7] rounded-tl-[16px] rounded-tr-[16px]" : isHoverAndListAndTop ? "bg-[#e0f7fa] rounded-tl-[16px] rounded-tr-[16px]" : isDefaultAndListAndTop ? "bg-white drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] rounded-tl-[16px] rounded-tr-[16px]" : cardMd === "Disabled" && type === "Single" && position === "None" ? "bg-[#e5e8e7] rounded-[16px]" : isHoverAndSingleAndNone ? "bg-[#e0f7fa] rounded-[16px]" : "bg-white drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] rounded-[16px]"}`;
  return (
    <div className={className ? `${baseClassName} ${className}` : baseClassName}>
      <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none ${type === "List" && position === "Bottom" ? "border-[#aab6b4] border-b border-l border-r rounded-bl-[16px] rounded-br-[16px]" : type === "List" && position === "Middle" ? "border-[#aab6b4] border-b border-l border-r" : type === "List" && position === "Top" ? "border border-[#aab6b4] rounded-tl-[16px] rounded-tr-[16px]" : isHoverAndSingleAndNone ? "border border-[#26c6da] rounded-[16px]" : "border border-[#aab6b4] rounded-[16px]"}`} />
      <div className="content-center flex flex-wrap gap-[16px] items-center relative shrink-0 w-full">
        {(isDefaultAndSingleAndNone || isHoverAndSingleAndNone || isDefaultAndListAndTop || isHoverAndListAndTop || isDefaultAndListAndMiddle || isHoverAndListAndMiddle || isDefaultAndListAndBottom || isHoverAndListAndBottom) && showIconBefore && (
          <div className="overflow-clip relative shrink-0 size-[36px]" data-name="building-04">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 30">
                <path clipRule="evenodd" d={svgPaths.p16710740} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        )}
        {(isDefaultAndSingleAndNone || isHoverAndSingleAndNone || isDefaultAndListAndTop || isHoverAndListAndTop || isDefaultAndListAndMiddle || isHoverAndListAndMiddle || isDefaultAndListAndBottom || isHoverAndListAndBottom) && (
          <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px relative" data-name="Heading-three-caption-medium">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px relative">
              <div className="content-stretch flex items-center relative shrink-0 w-full">{showHeading && <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">This is the headline</p>}</div>
              <div className="content-stretch flex items-center relative shrink-0 w-full">{showDescription && <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">This is the description</p>}</div>
            </div>
            <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0">
              {showCompAfter1 && <Counter className="bg-[#e0f7fa] content-stretch flex h-[48px] items-center justify-center px-[10px] py-[4px] relative rounded-[8px] shrink-0" counter="Large" />}
              {showCompAfter2 && (
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron-right">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                      <path clipRule="evenodd" d={svgPaths.p1c6e4d00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {isDisabledAndIsSingleAndNoneOrListAndTopOrListAndMiddleOrListAnd && showIconBefore && (
          <div className="overflow-clip relative shrink-0 size-[36px]" data-name="building-04">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon (Stroke)">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 30">
                <path clipRule="evenodd" d={svgPaths.p16710740} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
              </svg>
            </div>
          </div>
        )}
        {isDisabledAndIsSingleAndNoneOrListAndTopOrListAndMiddleOrListAnd && (
          <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px relative" data-name="Heading-three-caption-medium">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative">
              <div className="content-stretch flex items-center relative shrink-0 w-full">{showHeading && <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:semi-bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[#aab6b4] text-[18px] tracking-[-0.2px]">This is the headline</p>}</div>
              <div className="content-stretch flex items-center relative shrink-0 w-full">{showDescription && <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#aab6b4] text-[14px] tracking-[-0.1px]">This is the description</p>}</div>
            </div>
            <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0">
              {showCompAfter1 && (
                <div className="bg-[#aab6b4] content-stretch flex h-[48px] items-center justify-center px-[10px] py-[4px] relative rounded-[8px] shrink-0" data-name="Counter">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#e5e8e7] text-[14px] text-center tracking-[-0.1px] w-[28px]">
                    <p className="leading-[20px]">100</p>
                  </div>
                </div>
              )}
              {showCompAfter2 && (
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron-right">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                      <path clipRule="evenodd" d={svgPaths.p1c6e4d00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}