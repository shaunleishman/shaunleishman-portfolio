import svgPaths from "./svg-43eg0hyodk";
type AccordianFilterProps = {
  className?: string;
  accordion?: boolean;
  compAfter?: boolean;
  compBefore?: boolean;
  compRight?: boolean;
};

export default function AccordianFilter({ className, accordion = true, compAfter = true, compBefore = true, compRight = true }: AccordianFilterProps) {
  const isAccordion = accordion;
  const isNotAccordion = !accordion;
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[600px]"}>
      <div className="bg-white relative shrink-0 w-full" data-name="Accordian">
        <div aria-hidden className={`absolute border-b border-solid inset-0 pointer-events-none ${isNotAccordion ? "border-[#f5f6f6]" : "border-[#00a7b5]"}`} />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              {compBefore && (
                <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                  <div className="flex-[1_0_0] h-full min-w-px relative" data-name="image-user">
                    <div className="absolute inset-[4.17%]" data-name="Solid">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                        <g id="Solid">
                          <path d={svgPaths.p12731a00} fill="var(--fill-0, #4A5453)" />
                          <path clipRule="evenodd" d={svgPaths.p3d996e00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="content-stretch flex h-[28px] items-center relative shrink-0">
                <div className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-["Open_Sans:bold",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] tracking-[-0.1px] whitespace-nowrap ${isNotAccordion ? "text-[#4a5453]" : "text-[#00a7b5]"}`}>
                  <p className="leading-[20px]">Category name</p>
                </div>
              </div>
              {compAfter && (
                <div className="bg-[#106c7a] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Chip">
                  <div className="content-stretch flex h-[16px] items-center justify-center relative shrink-0">
                    <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                      <p className="leading-[16px]">2</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="x-close">
                      <div className="absolute inset-[20.83%]" data-name="Solid">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                          <path d={svgPaths.p34f6d300} fill="var(--fill-0, white)" id="Solid" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isAccordion && (
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.p12b6ab00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {isNotAccordion && compRight && (
              <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Icons">
                <div className="flex-[1_0_0] h-full min-w-px relative" data-name="chevron-down">
                  <div className="absolute inset-[33.33%_20.83%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
                      <path clipRule="evenodd" d={svgPaths.pc0a6900} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isAccordion && (
        <div className="bg-[#f5f6f6] relative shrink-0 w-full" data-name="List types">
          <div className="content-stretch flex flex-col items-start p-[36px] relative size-full">
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Multiple item list">
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Single item">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[16px]" data-name="Check box">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                            <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">
                      <p className="leading-[20px]">Checkbox</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Single item">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[16px]" data-name="Check box">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                            <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">
                      <p className="leading-[20px]">Checkbox</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Single item">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[16px]" data-name="Check box">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                            <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">
                      <p className="leading-[20px]">Checkbox</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Single item">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[16px]" data-name="Check box">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                            <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">
                      <p className="leading-[20px]">Checkbox</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Single item">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[16px]" data-name="Check box">
                      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="check">
                        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6.5">
                            <path clipRule="evenodd" d={svgPaths.p26ce6000} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:regular',sans-serif] h-full justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[14px] tracking-[-0.1px]">
                      <p className="leading-[20px]">Checkbox</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}