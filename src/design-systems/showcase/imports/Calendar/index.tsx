import svgPaths from "./svg-oocw9yiq2y";
type CalendarCompDaysProps = {
  className?: string;
  property1?: "Inactive" | "Day-active" | "Start" | "End" | "Null" | "Day-inactive" | "Inactive disabled" | "Current" | "Single-active";
};

function CalendarCompDays({ className, property1 = "Inactive" }: CalendarCompDaysProps) {
  return (
    <div className={className || `relative size-[36px] ${property1 === "Null" ? "" : property1 === "Single-active" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-[4px]" : property1 === "End" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-br-[4px] rounded-tr-[4px]" : property1 === "Start" ? "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] rounded-bl-[8px] rounded-tl-[8px]" : property1 === "Day-active" ? "bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px]" : "content-stretch flex flex-col items-center justify-center p-[8px]"}`}>
      {["Inactive", "Day-active", "Day-inactive", "Inactive disabled", "Current", "Start", "End", "Single-active"].includes(property1) && (
        <div className={`[word-break:break-word] flex flex-col h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] w-full ${["Start", "End", "Single-active"].includes(property1) ? 'font-["Open_Sans:regular",sans-serif] text-white' : property1 === "Current" ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a]' : property1 === "Inactive disabled" ? 'font-["Open_Sans:regular",sans-serif] text-[#aab6b4]' : 'font-["Open_Sans:regular",sans-serif] text-[#4a5453]'}`}>
          <p className="leading-[20px]">1</p>
        </div>
      )}
    </div>
  );
}
type CalendarProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

export default function Calendar({ className, property1 = "Default" }: CalendarProps) {
  const isDefault = property1 === "Default";
  const isVariant2 = property1 === "Variant2";
  return (
    <div className={className || "bg-white content-stretch drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] w-[369px]"}>
      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
        <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
          <div className="absolute inset-[16.67%]" data-name="Solid">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p34110f80} fill="var(--fill-0, #4A5453)" id="Solid" />
            </svg>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">{isVariant2 ? "2017" : "August 2017"}</p>
        </div>
        <div className="relative shrink-0 size-[24px]" data-name="arrow-narrow-right">
          <div className="absolute inset-[20.83%_12.5%]" data-name="Solid">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 14">
              <path d={svgPaths.p3e472980} fill="var(--fill-0, #4A5453)" id="Solid" />
            </svg>
          </div>
        </div>
      </div>
      {isDefault && (
        <div className="[word-break:break-word] content-stretch flex items-center justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] w-full" data-name="Days">
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Sun</p>
          </div>
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Mon</p>
          </div>
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-['Open_Sans:bold',sans-serif] justify-center relative shrink-0 text-[#106c7a] w-[36px]">
            <p className="leading-[20px]">Tue</p>
          </div>
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Wed</p>
          </div>
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Thu</p>
          </div>
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Fri</p>
          </div>
          <div className="flex flex-col font-['Open_Sans:regular',sans-serif] justify-center relative shrink-0 text-[#4a5453] w-[36px]">
            <p className="leading-[20px]">Sat</p>
          </div>
        </div>
      )}
      <div className="content-center flex flex-wrap gap-0 items-center relative shrink-0 w-[252px]" data-name="Dates">
        {isDefault && <CalendarCompDays className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" property1="Inactive disabled" />}
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "bg-[#106c7a] rounded-[4px]" : ""}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "text-white whitespace-nowrap" : "h-[11px] text-[#aab6b4] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Jan" : "2"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "text-[#4a5453] whitespace-nowrap" : "h-[11px] text-[#aab6b4] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Feb" : "3"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "text-[#4a5453] whitespace-nowrap" : "h-[11px] text-[#aab6b4] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Mar" : "4"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "text-[#4a5453] whitespace-nowrap" : "h-[11px] text-[#aab6b4] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Apr" : "5"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a] whitespace-nowrap' : 'font-["Open_Sans:regular",sans-serif] h-[11px] text-[#aab6b4] w-full'}`}>
            <p className="leading-[20px]">{isVariant2 ? "May" : "6"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Jun" : "7"}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Jul" : "8"}</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "" : "bg-[#106c7a] rounded-bl-[8px] rounded-tl-[8px]"}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "text-[#4a5453] whitespace-nowrap" : "h-[11px] text-white w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Aug" : "9"}</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "" : "bg-[#b2ebf2]"}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Sept" : "10"}</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "" : "bg-[#b2ebf2]"}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Oct" : "11"}</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "" : "bg-[#b2ebf2]"}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Nov" : "12"}</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] ${isVariant2 ? "" : "bg-[#b2ebf2]"}`} data-name="Calendar-comp-days">
          <div className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] ${isVariant2 ? "whitespace-nowrap" : "h-[11px] w-full"}`}>
            <p className="leading-[20px]">{isVariant2 ? "Dec" : "13"}</p>
          </div>
        </div>
        {isDefault && (
          <>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">14</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">15</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">16</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">17</p>
              </div>
            </div>
            <div className="bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] w-full">
                <p className="leading-[20px]">18</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">19</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">20</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">21</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">22</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">23</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:bold',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#106c7a] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">24</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">25</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">26</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">27</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">28</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">29</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">30</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">31</p>
              </div>
            </div>
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
          </>
        )}
        {isVariant2 && (
          <>
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
            <CalendarCompDays className="relative shrink-0 size-[36px]" property1="Null" />
          </>
        )}
      </div>
    </div>
  );
}