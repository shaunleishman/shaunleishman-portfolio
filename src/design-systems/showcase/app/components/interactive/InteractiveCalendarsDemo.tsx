"use client";

import { useState } from "react";
import CalendarCompDays from "../../../imports/CalendarCompDays";
import { ConnectedCalendar } from "../ConnectedCalendar";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import type { DateRange } from "../calendar-utils";

type CalendarView = "day-states" | "date-range" | "month";

const DAY_STATES = [
  "Inactive",
  "Day-active",
  "Current",
  "Start",
  "End",
  "Single-active",
  "Inactive disabled",
] as const;

const DEMO_VIEW_DATE = new Date(2017, 7, 1);
const DEMO_RANGE: DateRange = {
  start: new Date(2017, 7, 9),
  end: new Date(2017, 7, 18),
};
const DEMO_HIGHLIGHT = new Date(2017, 7, 24);

function useCalendarDemoState() {
  const [viewDate, setViewDate] = useState(DEMO_VIEW_DATE);
  const [range, setRange] = useState<DateRange>(DEMO_RANGE);
  const [selectedMonth, setSelectedMonth] = useState<number>(DEMO_VIEW_DATE.getMonth());

  return {
    viewDate,
    setViewDate,
    range,
    setRange,
    selectedMonth,
    setSelectedMonth,
    highlightDate: DEMO_HIGHLIGHT,
  };
}

export function InteractiveCalendarsDemo() {
  const [view, setView] = useState<CalendarView>("date-range");
  const [dayState, setDayState] = useState<(typeof DAY_STATES)[number]>("Current");
  const [showAll, setShowAll] = useState(false);
  const calendarState = useCalendarDemoState();

  const viewFilters = [
    {
      id: "view",
      label: "View",
      value: view,
      onChange: (value: string) => setView(value as CalendarView),
      options: [
        { value: "day-states", label: "Day cell states" },
        { value: "date-range", label: "Date range calendar" },
        { value: "month", label: "Month selection" },
      ],
    },
  ];

  const filters =
    view === "day-states"
      ? [
          ...viewFilters,
          {
            id: "dayState",
            label: "Day state",
            value: dayState,
            onChange: (value: string) => setDayState(value as (typeof DAY_STATES)[number]),
            options: DAY_STATES.map((state) => ({ value: state, label: state.replace(/-/g, " ") })),
          },
        ]
      : viewFilters;

  const liveCode = (() => {
    switch (view) {
      case "day-states":
        return `import CalendarCompDays from './imports/CalendarCompDays';

<CalendarCompDays property1="${dayState}" />`;
      case "date-range":
        return `import { ConnectedCalendar } from './ConnectedCalendar';

const [viewDate, setViewDate] = useState(new Date(2017, 7, 1));
const [range, setRange] = useState({
  start: new Date(2017, 7, 9),
  end: new Date(2017, 7, 18),
});

<ConnectedCalendar
  mode="days"
  viewDate={viewDate}
  onViewDateChange={setViewDate}
  range={range}
  onRangeChange={setRange}
  highlightDate={new Date(2017, 7, 24)}
/>`;
      case "month":
        return `import { ConnectedCalendar } from './ConnectedCalendar';

const [viewDate, setViewDate] = useState(new Date(2017, 0, 1));
const [selectedMonth, setSelectedMonth] = useState(0);

<ConnectedCalendar
  mode="months"
  viewDate={viewDate}
  onViewDateChange={setViewDate}
  range={{ start: null, end: null }}
  selectedMonth={selectedMonth}
  onMonthSelect={setSelectedMonth}
/>`;
    }
  })();

  const preview = (() => {
    switch (view) {
      case "day-states":
        return <CalendarCompDays property1={dayState} />;
      case "date-range":
        return (
          <ConnectedCalendar
            mode="days"
            viewDate={calendarState.viewDate}
            onViewDateChange={calendarState.setViewDate}
            range={calendarState.range}
            onRangeChange={calendarState.setRange}
            highlightDate={calendarState.highlightDate}
          />
        );
      case "month":
        return (
          <ConnectedCalendar
            mode="months"
            viewDate={calendarState.viewDate}
            onViewDateChange={calendarState.setViewDate}
            range={{ start: null, end: null }}
            selectedMonth={calendarState.selectedMonth}
            onMonthSelect={calendarState.setSelectedMonth}
            highlightDate={calendarState.highlightDate}
          />
        );
    }
  })();

  const label =
    view === "day-states"
      ? `Day cell · ${dayState.replace(/-/g, " ")}`
      : view === "date-range"
        ? "Date range calendar"
        : "Month selection";

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar showAll={showAll} onShowAllChange={setShowAll} filters={filters} />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Day cell states</h3>
            <div className="flex flex-wrap gap-6">
              {DAY_STATES.map((state) => (
                <div key={state} className="flex flex-col items-center gap-2">
                  <CalendarCompDays property1={state} />
                  <span className="text-xs text-[var(--colour-labels-disabled)]">{state}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Calendar views</h3>
            <div className="space-y-6">
              <ConnectedCalendar
                mode="days"
                viewDate={calendarState.viewDate}
                onViewDateChange={calendarState.setViewDate}
                range={calendarState.range}
                onRangeChange={calendarState.setRange}
                highlightDate={calendarState.highlightDate}
              />
              <ConnectedCalendar
                mode="months"
                viewDate={calendarState.viewDate}
                onViewDateChange={calendarState.setViewDate}
                range={{ start: null, end: null }}
                selectedMonth={calendarState.selectedMonth}
                onMonthSelect={calendarState.setSelectedMonth}
                highlightDate={calendarState.highlightDate}
              />
            </div>
          </div>
        </div>
      ) : (
        <VariantPreviewFrame label={label}>{preview}</VariantPreviewFrame>
      )}
    </div>
  );
}
