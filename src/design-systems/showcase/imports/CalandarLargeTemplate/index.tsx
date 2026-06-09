import svgPaths from "./svg-dxj9egd1lg";

function HelpCircle({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-name="help-circle">
      <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path clipRule="evenodd" d={svgPaths.p178d6b00} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Icon (Stroke)" />
        </svg>
      </div>
    </div>
  );
}
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

function XClose({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="x-close">
      <div className="absolute inset-[20.83%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path clipRule="evenodd" d={svgPaths.p34ceb700} fill="var(--fill-0, black)" fillRule="evenodd" id="Icon (Stroke)" />
        </svg>
      </div>
    </div>
  );
}

export default function CalandarLargeTemplate({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative rounded-[4px] w-[684px]"} data-name="Calandar-large-template">
      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Modal header">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center pb-[8px] pt-[24px] px-[24px] relative size-full">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">
                <p className="leading-[24px]">9th Aug - 18th Aug</p>
              </div>
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <XClose className="overflow-clip relative shrink-0 size-[24px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0">
        <div className="bg-white content-stretch flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Calendar">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
            <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
              <div className="absolute inset-[16.67%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p34110f80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">August 2017</p>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="arrow-narrow-right">
              <div className="absolute inset-[20.83%_12.5%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 14">
                  <path d={svgPaths.p3e472980} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
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
          <div className="content-center flex flex-wrap gap-0 items-center relative shrink-0 w-[252px]" data-name="Dates">
            <CalendarCompDays className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" property1="Inactive disabled" />
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">2</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">3</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">4</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">5</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">6</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">7</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">8</p>
              </div>
            </div>
            <div className="bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] w-full">
                <p className="leading-[20px]">9</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">10</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">11</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">12</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">13</p>
              </div>
            </div>
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
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Calendar">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
            <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
              <div className="absolute inset-[16.67%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p34110f80} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
              <p className="leading-[20px]">August 2017</p>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="arrow-narrow-right">
              <div className="absolute inset-[20.83%_12.5%]" data-name="Solid">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 14">
                  <path d={svgPaths.p3e472980} fill="var(--fill-0, #4A5453)" id="Solid" />
                </svg>
              </div>
            </div>
          </div>
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
          <div className="content-center flex flex-wrap gap-0 items-center relative shrink-0 w-[252px]" data-name="Dates">
            <CalendarCompDays className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" property1="Inactive disabled" />
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">2</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">3</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">4</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">5</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#aab6b4] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">6</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">7</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">8</p>
              </div>
            </div>
            <div className="bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] w-full">
                <p className="leading-[20px]">9</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">10</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">11</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">12</p>
              </div>
            </div>
            <div className="bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]" data-name="Calendar-comp-days">
              <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] w-full">
                <p className="leading-[20px]">13</p>
              </div>
            </div>
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
          </div>
        </div>
      </div>
      <div className="bg-white relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Modal footer">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center pb-[24px] pt-[8px] px-[24px] relative size-full">
            <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0 w-full">
              <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                <div aria-hidden className="absolute border-0 border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                  <HelpCircle className="relative shrink-0 size-[24px]" />
                  <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                    <p className="leading-[20px]">Help</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px relative">
                <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                  <div aria-hidden className="absolute border border-[#00a7b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                    <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                      <p className="leading-[20px]">Cancel</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#00a7b5] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-name="Button-medium">
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                    <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                      <p className="leading-[20px]">Import</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}