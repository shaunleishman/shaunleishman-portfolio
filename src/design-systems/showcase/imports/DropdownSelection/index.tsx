import svgPaths from "./svg-56ob9skgku";
type DropdownSelectionProps = {
  className?: string;
  allOptions?: boolean;
  dropdown?: "Multiple" | "Single select";
  item1?: boolean;
  item2?: boolean;
  item3?: boolean;
  item4?: boolean;
  item5?: boolean;
  /** Enables a max-height options panel with native overflow scrolling (no decorative scrollbar). */
  scroll?: boolean;
  search?: boolean;
  showDropdownField?: boolean;
  topInput?: boolean;
};

export default function DropdownSelection({ className, allOptions = true, dropdown = "Multiple", item1 = true, item2 = true, item3 = true, item4 = true, item5 = true, scroll = false, search = true, showDropdownField = true, topInput = true }: DropdownSelectionProps) {
  const isMultiple = dropdown === "Multiple";
  const isSingleSelect = dropdown === "Single select";
  return (
    <div className={className || "content-stretch flex flex-col gap-[8px] items-start relative rounded-[16px]"}>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        {isMultiple && showDropdownField && (
          <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-[252px]" data-name="Input field">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-between p-[12px] relative size-full">
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
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">+ 2 more</p>
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
        )}
        {isMultiple && allOptions && (
          <div className={`bg-[#f5f6f6] drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] relative rounded-[8px] shrink-0 w-full${scroll ? " dropdown-selection-scroll max-h-[220px] overflow-y-auto" : ""}`}>
            <div className="flex flex-col items-center size-full">
              <div className="content-stretch flex flex-col gap-[4px] items-center p-[4px] relative size-full">
                {search && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Search</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {topInput && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">Add</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item1 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 1</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item2 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 2</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item3 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 3</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item4 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 4</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item5 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 5</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isSingleSelect && showDropdownField && (
          <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-[252px]" data-name="Input field">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-between p-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                      <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                        <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Choose an option</p>
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
        )}
        {isSingleSelect && allOptions && (
          <div className={`bg-[#f5f6f6] drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] relative rounded-[8px] shrink-0 w-full${scroll ? " dropdown-selection-scroll max-h-[220px] overflow-y-auto" : ""}`}>
            <div className="flex flex-col items-center size-full">
              <div className="content-stretch flex flex-col gap-[4px] items-center p-[4px] relative size-full">
                {search && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">Search</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {topInput && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
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
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">Add</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item1 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                              <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 1</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item2 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                              <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 2</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item3 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                              <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 3</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item4 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                              <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 4</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {item5 && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Input field">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
                        <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                              <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                                <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">Dropdown 5</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}