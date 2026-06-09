import svgPaths from "./svg-prac7141i6";
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
type TabProps = {
  className?: string;
  editText?: string;
  showCounter?: boolean;
  showSelectionIndicator?: boolean;
  tab?: "Active" | "Disabled" | "Hover" | "Inactive";
  type?: "Page" | "Content";
};

function Tab({ className, editText = "Tab 1", showCounter = true, showSelectionIndicator = true, tab = "Active", type = "Content" }: TabProps) {
  const isActive = tab === "Active";
  const isDisabledAndContent = tab === "Disabled" && type === "Content";
  const isHoverAndContent = tab === "Hover" && type === "Content";
  return (
    <div className={className || `content-stretch flex flex-col items-center relative w-[253px] ${tab === "Active" && type === "Page" ? "bg-white rounded-[8px]" : isHoverAndContent ? "bg-[#f5f6f6]" : isDisabledAndContent ? "bg-[#e5e8e7]" : ""}`}>
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative size-full">
            {(isDisabledAndContent || isHoverAndContent || tab === "Inactive") && (
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                <p className="leading-[20px]">{editText}</p>
              </div>
            )}
            {isActive && (
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] tracking-[-0.1px] whitespace-nowrap">
                <p className="leading-[20px]">{editText}</p>
              </div>
            )}
            {isActive && showCounter && (
              <div className="bg-[#e0f7fa] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[10px] text-center tracking-[-0.1px] whitespace-nowrap">
                  <p className="leading-[16px]">10000</p>
                </div>
              </div>
            )}
            {(isDisabledAndContent || (tab === "Inactive" && type === "Page")) && showCounter && (
              <div className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Counter">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[10px] text-center tracking-[-0.1px] w-[12px]">
                  <p className="leading-[16px]">10</p>
                </div>
              </div>
            )}
            {type === "Content" && ["Hover", "Inactive"].includes(tab) && showCounter && <Counter className="bg-[#e5e8e7] content-stretch flex h-[20px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" counter="Disabled" />}
          </div>
        </div>
      </div>
      {type === "Content" && ["Disabled", "Hover", "Inactive"].includes(tab) && showSelectionIndicator && <div className="bg-[#aab6b4] h-px relative shrink-0 w-full" />}
      {tab === "Active" && type === "Content" && showSelectionIndicator && <div className="bg-[#00a7b5] h-[2px] relative shrink-0 w-full" />}
    </div>
  );
}
type PageTabulationProps = {
  className?: string;
  page1?: boolean;
  page2?: boolean;
  page3?: boolean;
  page4?: boolean;
  page5?: boolean;
  state?: "Default" | "Page1" | "Page2" | "Page3" | "Page4" | "Page5";
  type?: "Old" | "New";
};

export default function PageTabulation({ className, page1 = true, page2 = true, page3 = true, page4 = true, page5 = true, state = "Default", type = "Old" }: PageTabulationProps) {
  const isNewAndPage1 = type === "New" && state === "Page1";
  const isNewAndPage2 = type === "New" && state === "Page2";
  const isNewAndPage3 = type === "New" && state === "Page3";
  const isNewAndPage4 = type === "New" && state === "Page4";
  const isOldAndDefault = type === "Old" && state === "Default";
  return (
    <div className={className || `content-stretch flex items-end relative w-[1618px] ${type === "New" && ["Page1", "Page2", "Page3", "Page4", "Page5"].includes(state) ? "bg-[#e5e8e7] p-[4px] rounded-[8px]" : ""}`}>
      {type === "New" && ["Page2", "Page3", "Page4", "Page5"].includes(state) && page1 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 1" tab="Inactive" type="Page" />}
      {type === "New" && ["Page3", "Page4", "Page5"].includes(state) && page2 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 2" tab="Inactive" type="Page" />}
      {type === "New" && ["Page4", "Page5"].includes(state) && page3 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 3" tab="Inactive" type="Page" />}
      {isOldAndDefault && page1 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 1" />}
      {isOldAndDefault && page2 && <Tab className="bg-[#e5e8e7] content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 2" tab="Disabled" />}
      {isOldAndDefault && page3 && <Tab className="bg-[#e5e8e7] content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 3" tab="Disabled" />}
      {isOldAndDefault && page4 && <Tab className="bg-[#e5e8e7] content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 4" tab="Disabled" />}
      {isOldAndDefault && page5 && <Tab className="bg-[#e5e8e7] content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 5" tab="Disabled" />}
      {isNewAndPage1 && page1 && <Tab className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative rounded-[4px]" editText="Sub menu 1" type="Page" />}
      {isNewAndPage1 && page2 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 2" tab="Inactive" type="Page" />}
      {isNewAndPage1 && page3 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 3" tab="Inactive" type="Page" />}
      {type === "New" && ["Page1", "Page5"].includes(state) && page4 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 4" tab="Inactive" type="Page" />}
      {isNewAndPage1 && page5 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 5" tab="Inactive" type="Page" />}
      {isNewAndPage2 && page2 && <Tab className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative rounded-[8px]" editText="Sub menu 2" type="Page" />}
      {isNewAndPage2 && page3 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 3" tab="Inactive" type="Page" />}
      {isNewAndPage2 && page4 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 4" tab="Inactive" type="Page" />}
      {isNewAndPage2 && page5 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 5" tab="Inactive" type="Page" />}
      {isNewAndPage3 && page3 && <Tab className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative rounded-[8px]" editText="Sub menu 3" type="Page" />}
      {isNewAndPage3 && page4 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 4" tab="Inactive" type="Page" />}
      {isNewAndPage3 && page5 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 5" tab="Inactive" type="Page" />}
      {isNewAndPage4 && page4 && <Tab className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative rounded-[8px]" editText="Sub menu 4" type="Page" />}
      {isNewAndPage4 && page5 && <Tab className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative" editText="Sub menu 5" tab="Inactive" type="Page" />}
      {type === "New" && state === "Page5" && page5 && <Tab className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative rounded-[8px]" editText="Sub menu 5" type="Page" />}
    </div>
  );
}