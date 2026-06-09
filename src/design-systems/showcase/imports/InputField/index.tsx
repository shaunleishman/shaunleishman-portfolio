import svgPaths from "./svg-32yx2j8oqg";
type InputFieldProps = {
  className?: string;
  body?: boolean;
  compAfter?: boolean;
  compBefore?: boolean;
  foot?: boolean;
  head?: boolean;
  input?: boolean;
  inputField?: "Default" | "Hover" | "Selected" | "Disabled" | "Validation" | "Inputted" | "Warning";
  inputText?: string;
  labelText?: string;
  moreInfo?: boolean;
  moreInfo2?: boolean;
  notifierText?: string;
  required?: boolean;
  swapTooltip?: React.ReactNode | null;
  tooltip?: boolean;
};

export default function InputField({ className, body = true, compAfter = true, compBefore = true, foot = true, head = true, input = true, inputField = "Default", inputText = "Placeholder", labelText = "Label", moreInfo = true, moreInfo2 = true, notifierText = "Message goes here", required = true, swapTooltip = null, tooltip = true }: InputFieldProps) {
  const isDisabled = inputField === "Disabled";
  const isHover = inputField === "Hover";
  const isSelected = inputField === "Selected";
  return (
    <div className={className || "content-stretch flex flex-col gap-[8px] items-start relative w-[191px]"}>
      {head && (
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0" data-name="label-required-icon">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">{labelText}</p>
            {required && (
              <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#d04a21] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                *
              </p>
            )}
            {tooltip &&
              (swapTooltip || (
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="help-circle">
                  <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                      <path clipRule="evenodd" d={svgPaths.p1ed09300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                    </svg>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        {["Inputted", "Validation", "Warning"].includes(inputField) && body && (
          <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
            <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                  {compBefore && (
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                        <div className="absolute inset-[8.33%]" data-name="Solid">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">{input && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">{inputText}</p>}</div>
                </div>
                {compAfter && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                      <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                          <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {inputField === "Default" && body && (
          <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
            <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                  {compBefore && (
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                        <div className="absolute inset-[8.33%]" data-name="Solid">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">{input && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">{inputText}</p>}</div>
                </div>
                {compAfter && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                      <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                          <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {["Default", "Inputted"].includes(inputField) && foot && (
          <div className="bg-[#d04a21] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  {moreInfo2 &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {isHover && body && (
          <div className="bg-[#e0f7fa] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
            <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                  {compBefore && (
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                        <div className="absolute inset-[8.33%]" data-name="Solid">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">{input && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">{inputText}</p>}</div>
                </div>
                {compAfter && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                      <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                          <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isHover && foot && (
          <div className="bg-[#d04a21] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  {moreInfo2 &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {isSelected && body && (
          <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
            <div aria-hidden className="absolute border-2 border-[#00a7b5] border-solid inset-[-2px] pointer-events-none rounded-[10px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                  {compBefore && (
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                        <div className="absolute inset-[8.33%]" data-name="Solid">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">{input && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">{inputText}</p>}</div>
                </div>
                {compAfter && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                      <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                          <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isSelected && foot && (
          <div className="bg-[#d04a21] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex items-center justify-end relative shrink-0">
                  {moreInfo &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {isDisabled && body && (
          <div className="bg-[#e5e8e7] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Field-all-icons">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
                  {compBefore && (
                    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
                        <div className="absolute inset-[8.33%]" data-name="Solid">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">{input && <p className="[word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#aab6b4] text-[14px] tracking-[-0.1px] whitespace-nowrap">{inputText}</p>}</div>
                </div>
                {compAfter && (
                  <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
                    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="chevron-up">
                      <div className="absolute inset-[33.33%_20.83%]" data-name="Icon (Stroke)">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
                          <path clipRule="evenodd" d={svgPaths.p3730b300} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {isDisabled && foot && (
          <div className="bg-[#d04a21] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  {moreInfo2 &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {inputField === "Validation" && foot && (
          <div className="bg-[#4ca843] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  {moreInfo2 &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {inputField === "Warning" && foot && (
          <div className="bg-[#fff4e5] relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
                  <p className="[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#f5a50d] text-[12px] tracking-[-0.1px] whitespace-nowrap">{notifierText}</p>
                </div>
                <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
                  {moreInfo2 &&
                    (swapTooltip || (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="help-circle">
                        <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPaths.p543e580} fill="var(--fill-0, #F5A50D)" fillRule="evenodd" id="Icon (Stroke)" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}