"use client";

import { useMemo, useState } from "react";
import svgPaths from "../../imports/CalandarLargeTemplate/svg-dxj9egd1lg";
import { ConnectedCalendar } from "./ConnectedCalendar";
import {
  addMonths,
  formatDateRange,
  type DateRange,
} from "./calendar-utils";

type ConnectedCalendarLargeTemplateProps = {
  className?: string;
  initialViewDate?: Date;
  initialRange?: DateRange;
  highlightDate?: Date | null;
};

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

export function ConnectedCalendarLargeTemplate({
  className,
  initialViewDate = new Date(2017, 7, 1),
  initialRange = { start: new Date(2017, 7, 9), end: new Date(2017, 7, 18) },
  highlightDate = new Date(2017, 7, 24),
}: ConnectedCalendarLargeTemplateProps) {
  const [leftViewDate, setLeftViewDate] = useState(initialViewDate);
  const [range, setRange] = useState<DateRange>(initialRange);

  const rightViewDate = useMemo(() => addMonths(leftViewDate, 1), [leftViewDate]);

  function handleLeftViewChange(date: Date) {
    setLeftViewDate(date);
  }

  function handleRightViewChange(date: Date) {
    setLeftViewDate(addMonths(date, -1));
  }

  return (
    <div
      className={
        className ??
        "connected-calendar-large content-stretch flex flex-col items-start relative rounded-[4px] w-[684px]"
      }
      data-name="Calandar-large-template"
    >
      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />

      <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Modal header">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center pb-[8px] pt-[24px] px-[24px] relative size-full">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4a5453] text-[18px] tracking-[-0.2px]">
                <p className="leading-[24px]">{formatDateRange(range)}</p>
              </div>
              <button
                type="button"
                aria-label="Clear selected range"
                onClick={() => setRange({ start: null, end: null })}
                className="connected-calendar-large__clear bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0 cursor-pointer border-0"
                data-name="Button-medium"
              >
                <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <XClose className="overflow-clip relative shrink-0 size-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-stretch flex items-start relative shrink-0">
        <ConnectedCalendar
          viewDate={leftViewDate}
          onViewDateChange={handleLeftViewChange}
          range={range}
          onRangeChange={setRange}
          highlightDate={highlightDate}
          className="connected-calendar connected-calendar--embedded bg-white content-stretch flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] shrink-0 w-[342px] drop-shadow-none"
          widthClass="w-[342px]"
        />
        <ConnectedCalendar
          viewDate={rightViewDate}
          onViewDateChange={handleRightViewChange}
          range={range}
          onRangeChange={setRange}
          highlightDate={highlightDate}
          className="connected-calendar connected-calendar--embedded bg-white content-stretch flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] shrink-0 w-[342px] drop-shadow-none"
          widthClass="w-[342px]"
        />
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
                <button
                  type="button"
                  onClick={() => setRange({ start: null, end: null })}
                  className="connected-calendar-large__cancel bg-white content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0 cursor-pointer border-0"
                  data-name="Button-medium"
                >
                  <div aria-hidden className="absolute border border-[#00a7b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                    <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00a7b5] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
                      <p className="leading-[20px]">Cancel</p>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  className="connected-calendar-large__import bg-[#00a7b5] content-stretch flex gap-[12px] h-[40px] items-center justify-center p-[12px] relative rounded-[8px] shrink-0 cursor-pointer border-0"
                  data-name="Button-medium"
                >
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Button-text-icon">
                    <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-['Open_Sans:semi-bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1px] whitespace-nowrap">
                      <p className="leading-[20px]">Import</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
