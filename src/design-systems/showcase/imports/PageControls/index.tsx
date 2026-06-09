import svgPaths from "./svg-4c7t4ezkhf";
type PageControlsProps = {
  className?: string;
  children?: React.ReactNode | null;
  property1?: "Default";
  showDropdownFilter?: boolean;
};

export default function PageControls({ className, children = null, property1 = "Default", showDropdownFilter = true }: PageControlsProps) {
  return (
    <div className={className || "content-stretch flex flex-col gap-[23px] items-start overflow-clip relative w-[1697px]"}>
      {showDropdownFilter && (
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[204px]" data-name="Input field">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Fund</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                      <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                          <div className="absolute inset-[8.33%]" data-name="Solid">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                              <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Select a fund</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                        <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                            <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[191px]" data-name="Input field">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Asset</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="bg-[#e5e8e7] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                      <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Select an asset</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                        <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                            <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
          <div className="[word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[18px] tracking-[-0.2px] whitespace-nowrap">
            <p className="leading-[24px]">4,003 meters</p>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[383px]" data-name="Input field">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                      <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                          <div className="absolute inset-[8.33%]" data-name="Solid">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                              <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Search with asset ID, meter ID or reference</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Slot">
          {children || (
            <>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="filter-funnel-01">
                  <div className="absolute inset-[8.33%_4.17%_9.34%_4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.667 13.1719">
                      <path clipRule="evenodd" d={svgPaths.p920ba80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="edit-05">
                  <div className="absolute inset-[3.66%_3.66%_4.17%_4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7475 14.7475">
                      <path clipRule="evenodd" d={svgPaths.p169f9c80} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Customise columns</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="columns-03">
                  <div className="absolute inset-[8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                      <path clipRule="evenodd" d={svgPaths.pa488400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Move to</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-[16px]" data-name="plus icon">
                  <div className="absolute inset-[16.67%]" data-name="Solid">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                      <path d={svgPaths.pe3c8200} fill="var(--fill-0, #4A5453)" id="Solid" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-[#e5e8e7] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="arrows-right">
                    <div className="absolute inset-[8.33%_12.5%]" data-name="Icon (Stroke)">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.3333">
                        <path clipRule="evenodd" d={svgPaths.p77ae00} fill="var(--fill-0, #AAB6B4)" fillRule="evenodd" id="Icon (Stroke)" />
                      </svg>
                    </div>
                  </div>
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Transfer to</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Input field">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
                  <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center p-[12px] relative rounded-[8px] shrink-0" data-name="Field-all-icons">
                    <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                        <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="calendar">
                          <div className="absolute inset-[4.17%_8.33%]" data-name="Icon (Stroke)">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
                              <path clipRule="evenodd" d={svgPaths.p34ef1200} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center overflow-clip relative shrink-0">
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">dd/mm/yyyy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#00a7b5] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Send</p>
                  </div>
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus icon">
                  <div className="absolute inset-[10.13%_7.16%_10.14%_5.61%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9568 12.7575">
                      <path clipRule="evenodd" d={svgPaths.p11cb5a20} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-[#00a7b5] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Update</p>
                  </div>
                </div>
              </div>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#00a7b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Close</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#ffe6e1] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#d04a21] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
                  <div className="absolute inset-[4.17%_8.33%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
                      <path clipRule="evenodd" d={svgPaths.p17f8c400} fill="var(--fill-0, #D04A21)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center self-stretch">
                <div className="h-full relative shrink-0">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron-left">
                        <div className="absolute inset-[20.83%_33.33%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                            <path clipRule="evenodd" d={svgPaths.p1656a400} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron-right">
                        <div className="absolute inset-[20.83%_33.33%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                            <path clipRule="evenodd" d={svgPaths.p1c6e4d00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}