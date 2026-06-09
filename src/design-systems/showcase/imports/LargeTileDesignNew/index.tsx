import svgPaths from "./svg-xoyoudsrdw";

function PieChartMedium({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[80px]"} data-name="Pie-chart-medium">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="Pie-chart-segment-circle-stroke">
          <circle cx="40" cy="40" id="Circle-stroke" r="33.3611" stroke="var(--stroke-0, #F5F6F6)" strokeWidth="13.2778" />
          <path d={svgPaths.p1638f580} fill="var(--fill-0, #D04A21)" id="Segment" />
        </g>
      </svg>
      <p className="[word-break:break-word] absolute font-['Open_Sans:semi-bold',sans-serif] inset-[33.75%_16.25%_36.25%_16.25%] leading-[24px] not-italic text-[#4a5453] text-[18px] text-center tracking-[-0.2px]">10%</p>
    </div>
  );
}
type IconSquareRoundedProps = {
  className?: string;
  icon?: "Square" | "Circle" | "Icon3" | "Icon4";
};

function IconSquareRounded({ className, icon = "Square" }: IconSquareRoundedProps) {
  return (
    <div className={className || `bg-[#00a7b5] content-stretch flex items-center justify-center p-[12px] relative ${icon === "Icon4" ? "rounded-[8px] size-[36px]" : icon === "Icon3" ? "rounded-[57px] size-[36px]" : icon === "Circle" ? "rounded-[57px] size-[52px]" : "rounded-[8px] size-[52px]"}`}>
      <div className={`overflow-clip relative shrink-0 ${["Icon3", "Icon4"].includes(icon) ? "size-[16px]" : "size-[24px]"}`} data-name="alert-circle">
        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path clipRule="evenodd" d={svgPaths.pfeca300} fill={["Circle", "Icon3", "Icon4"].includes(icon) ? "var(--fill-0, black)" : "var(--fill-0, white)"} fillRule="evenodd" id="Icon (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type LargeTileDesignNewProps = {
  className?: string;
  cardLg?: "Default" | "Hover" | "Card-lg3";
  children?: React.ReactNode | null;
  compAfterLeft?: boolean;
  dText?: string;
  hText?: string;
  showAllRows?: boolean;
  showCompRight?: boolean;
  showDescription?: boolean;
  showDivide?: boolean;
  showHeading?: boolean;
  showIcon?: boolean;
  swapComp?: React.ReactNode | null;
  swapCompRight?: React.ReactNode | null;
  swapCompTop?: React.ReactNode | null;
};

export default function LargeTileDesignNew({ className, cardLg = "Default", children = null, compAfterLeft = true, dText = "Description", hText = "Heading", showAllRows = true, showCompRight = true, showDescription = true, showDivide = true, showHeading = true, showIcon = true, swapComp = null, swapCompRight = null, swapCompTop = null }: LargeTileDesignNewProps) {
  const isCardLg3 = cardLg === "Card-lg3";
  const baseClassName = `content-stretch drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] w-[560px] max-w-full shrink-0 ${isCardLg3 ? "bg-[#e5e8e7]" : "bg-white"}`;
  return (
    <div className={className ? `${baseClassName} ${className}` : baseClassName}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${cardLg === "Hover" ? "border-[#26c6da]" : "border-[#aab6b4]"}`} />
      <div className="content-center flex flex-wrap gap-[16px] items-center relative shrink-0 w-full" data-name="Frame-icon-heading-caption-medium">
        {showIcon && (swapCompTop || <IconSquareRounded className="bg-[#00a7b5] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0 size-[52px]" />)}
        <div className="content-center flex flex-[1_0_0] flex-wrap gap-[24px] items-center min-w-px relative" data-name="Heading-three-caption-medium">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative">
            <div className="content-stretch flex items-center relative shrink-0 w-full">{showHeading && <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Open_Sans:bold',sans-serif] leading-[24px] min-w-px not-italic relative text-[#4a5453] text-[24px] tracking-[-0.3px]">{hText}</p>}</div>
            <div className="content-stretch flex items-center relative shrink-0 w-full">{showDescription && <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">{dText}</p>}</div>
          </div>
          <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0">
            {compAfterLeft && (swapComp || <PieChartMedium className="relative shrink-0 size-[80px]" />)}
            {showCompRight &&
              (swapCompRight || (
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron-right">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                      <path clipRule="evenodd" d={svgPaths.p1c6e4d00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showDivide && <div className="bg-[#aab6b4] h-px relative rounded-[4px] shrink-0 w-full" />}
      {["Default", "Hover"].includes(cardLg) && showAllRows && (
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Slot">
          {children || (
            <>
              <div className="bg-white h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isCardLg3 && showAllRows && (
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Slot">
          {children || (
            <>
              <div className="bg-[#e5e8e7] h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#e5e8e7] h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#e5e8e7] h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#e5e8e7] h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#e5e8e7] h-[52px] min-w-[230px] relative rounded-[16px] shrink-0 w-full" data-name="Button-large">
                <div className="flex h-full w-full min-w-[inherit] flex-row items-center">
                  <div className="content-stretch relative flex h-full w-full min-w-[inherit] items-center justify-between px-[12px] py-[16px]">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                      <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-md=Tertiary">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                            <p className="leading-[20px]">Button</p>
                          </div>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                          <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                              <path clipRule="evenodd" d={svgPaths.p1a739400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[16px] text-center tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[24px]">Label</p>
                      </div>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus icon">
                      <div className="absolute inset-[16.67%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p16b5cf80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}