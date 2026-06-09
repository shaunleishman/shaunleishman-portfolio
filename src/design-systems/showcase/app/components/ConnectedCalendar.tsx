"use client";

import { useMemo } from "react";
import svgPaths from "../../imports/Calendar/svg-oocw9yiq2y";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  addMonths,
  addYears,
  buildMonthGrid,
  formatMonthYear,
  formatYear,
  nextRangeSelection,
  resolveDayCellVisual,
  type DateRange,
  type DayCellVisual,
} from "./calendar-utils";

type ConnectedCalendarMode = "days" | "months";

type ConnectedCalendarProps = {
  mode?: ConnectedCalendarMode;
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  range: DateRange;
  onRangeChange?: (range: DateRange) => void;
  selectedMonth?: number | null;
  onMonthSelect?: (month: number) => void;
  highlightDate?: Date | null;
  className?: string;
  widthClass?: string;
};

function NavArrow({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  return (
    <div className={`relative shrink-0 size-[24px] ${isLeft ? "" : ""}`} data-name={isLeft ? "arrow-left" : "arrow-narrow-right"}>
      <div className={`absolute ${isLeft ? "inset-[16.67%]" : "inset-[20.83%_12.5%]"}`} data-name="Solid">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isLeft ? "0 0 16 16" : "0 0 18 14"}>
          <path d={isLeft ? svgPaths.p34110f80 : svgPaths.p3e472980} fill="var(--fill-0, #4A5453)" id="Solid" />
        </svg>
      </div>
    </div>
  );
}

function dayCellClass(state: DayCellVisual): string {
  switch (state) {
    case "Null":
      return "relative shrink-0 size-[36px]";
    case "Single-active":
      return "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 size-[36px]";
    case "End":
      return "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[36px]";
    case "Start":
      return "bg-[#106c7a] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[36px]";
    case "Day-active":
      return "bg-[#b2ebf2] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]";
    case "Inactive disabled":
      return "content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]";
    case "Current":
    case "Inactive":
    default:
      return "content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px]";
  }
}

function dayLabelClass(state: DayCellVisual): string {
  const base =
    '[word-break:break-word] flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px]';

  switch (state) {
    case "Start":
    case "End":
    case "Single-active":
      return `${base} font-["Open_Sans:regular",sans-serif] text-white h-[11px] w-full`;
    case "Current":
      return `${base} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a] h-[11px] w-full`;
    case "Inactive disabled":
      return `${base} font-["Open_Sans:regular",sans-serif] text-[#aab6b4] h-[11px] w-full`;
    case "Day-active":
    case "Inactive":
      return `${base} font-["Open_Sans:regular",sans-serif] text-[#4a5453] h-[11px] w-full`;
    default:
      return base;
  }
}

function DayCell({
  date,
  state,
  onSelect,
}: {
  date: Date;
  state: DayCellVisual;
  onSelect?: () => void;
}) {
  if (state === "Null") {
    return <div aria-hidden className={dayCellClass(state)} data-name="Calendar-comp-days" />;
  }

  const interactive = Boolean(onSelect);

  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={onSelect}
      aria-label={interactive ? `Select ${date.toDateString()}` : undefined}
      aria-pressed={
        interactive && ["Start", "End", "Single-active", "Day-active"].includes(state)
          ? true
          : undefined
      }
      className={[
        dayCellClass(state),
        "connected-calendar__day-btn border-0 p-0",
        interactive ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      data-name="Calendar-comp-days"
    >
      <div className={dayLabelClass(state)}>
        <p className="leading-[20px]">{date.getDate()}</p>
      </div>
    </button>
  );
}

function MonthCell({
  label,
  selected,
  current,
  onSelect,
}: {
  label: string;
  selected: boolean;
  current: boolean;
  onSelect?: () => void;
}) {
  const interactive = Boolean(onSelect);

  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={onSelect}
      aria-label={interactive ? `Select ${label}` : undefined}
      aria-pressed={selected || undefined}
      className={[
        "connected-calendar__month-btn content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[36px] border-0",
        selected ? "bg-[#106c7a] rounded-[4px]" : "bg-transparent",
        interactive ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      data-name="Calendar-comp-days"
    >
      <div
        className={`[word-break:break-word] flex flex-col font-["Open_Sans:regular",sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] ${
          selected
            ? "text-white whitespace-nowrap"
            : current
              ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a] whitespace-nowrap'
              : "text-[#4a5453] whitespace-nowrap"
        }`}
      >
        <p className="leading-[20px]">{label}</p>
      </div>
    </button>
  );
}

export function ConnectedCalendar({
  mode = "days",
  viewDate,
  onViewDateChange,
  range,
  onRangeChange,
  selectedMonth = null,
  onMonthSelect,
  highlightDate = null,
  className,
  widthClass = "w-[369px]",
}: ConnectedCalendarProps) {
  const monthGrid = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  function handlePrev() {
    onViewDateChange(mode === "days" ? addMonths(viewDate, -1) : addYears(viewDate, -1));
  }

  function handleNext() {
    onViewDateChange(mode === "days" ? addMonths(viewDate, 1) : addYears(viewDate, 1));
  }

  function handleDaySelect(date: Date) {
    if (!onRangeChange) return;
    onRangeChange(nextRangeSelection(range, date));
  }

  const headerLabel = mode === "days" ? formatMonthYear(viewDate) : formatYear(viewDate);
  const today = highlightDate ?? new Date();
  const currentMonthIndex = today.getFullYear() === viewDate.getFullYear() ? today.getMonth() : -1;

  return (
    <div
      className={
        className ??
        `connected-calendar bg-white content-stretch drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)] flex flex-col gap-[12px] items-center justify-center p-[24px] relative rounded-[8px] ${widthClass}`
      }
      data-name="Calendar"
    >
      <div aria-hidden className="absolute border border-[#aab6b4] border-solid inset-0 pointer-events-none rounded-[8px]" />

      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
        <button
          type="button"
          aria-label={mode === "days" ? "Previous month" : "Previous year"}
          onClick={handlePrev}
          className="connected-calendar__nav-btn relative shrink-0 size-[24px] cursor-pointer border-0 bg-transparent p-0"
        >
          <NavArrow direction="left" />
        </button>
        <div className="[word-break:break-word] flex flex-col font-['Open_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5453] text-[14px] text-center tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[20px]">{headerLabel}</p>
        </div>
        <button
          type="button"
          aria-label={mode === "days" ? "Next month" : "Next year"}
          onClick={handleNext}
          className="connected-calendar__nav-btn relative shrink-0 size-[24px] cursor-pointer border-0 bg-transparent p-0"
        >
          <NavArrow direction="right" />
        </button>
      </div>

      {mode === "days" && (
        <div
          className="[word-break:break-word] content-stretch flex items-center justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center tracking-[-0.1px] w-full"
          data-name="Days"
        >
          {WEEKDAY_LABELS.map((label, index) => (
            <div
              key={label}
              className={`flex flex-col justify-center relative shrink-0 w-[36px] ${
                index === 2
                  ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-["Open_Sans:bold",sans-serif] text-[#106c7a]'
                  : "font-['Open_Sans:regular',sans-serif] text-[#4a5453]"
              }`}
            >
              <p className="leading-[20px]">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="content-center flex flex-wrap gap-0 items-center relative shrink-0 w-[252px]" data-name="Dates">
        {mode === "days"
          ? monthGrid.map((date) => {
              const state = resolveDayCellVisual(date, viewDate, range, highlightDate);
              const inTrailingNull = state === "Null";
              return (
                <DayCell
                  key={date.toISOString()}
                  date={date}
                  state={state}
                  onSelect={inTrailingNull || !onRangeChange ? undefined : () => handleDaySelect(date)}
                />
              );
            })
          : MONTH_LABELS.map((label, monthIndex) => (
              <MonthCell
                key={label}
                label={label}
                selected={selectedMonth === monthIndex}
                current={monthIndex === currentMonthIndex}
                onSelect={
                  onMonthSelect
                    ? () => {
                        onMonthSelect(monthIndex);
                        onViewDateChange(new Date(viewDate.getFullYear(), monthIndex, 1));
                      }
                    : undefined
                }
              />
            ))}
        {mode === "months" && (
          <>
            <div aria-hidden className="relative shrink-0 size-[36px]" />
            <div aria-hidden className="relative shrink-0 size-[36px]" />
          </>
        )}
      </div>
    </div>
  );
}
