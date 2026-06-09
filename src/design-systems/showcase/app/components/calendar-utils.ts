export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBetweenInclusive(date: Date, start: Date, end: Date): boolean {
  const value = startOfDay(date).getTime();
  const from = startOfDay(start).getTime();
  const to = startOfDay(end).getTime();
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return value >= min && value <= max;
}

export function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function addYears(date: Date, count: number): Date {
  return new Date(date.getFullYear() + count, date.getMonth(), 1);
}

export function formatMonthYear(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatYear(date: Date): string {
  return String(date.getFullYear());
}

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatShortDate(date: Date): string {
  const day = date.getDate();
  return `${day}${ordinalSuffix(day)} ${MONTH_LABELS[date.getMonth()]}`;
}

export function formatDateRange(range: DateRange): string {
  if (!range.start) return "Select a date range";
  if (!range.end || sameDay(range.start, range.end)) {
    return formatShortDate(range.start);
  }
  const start = range.start.getTime() <= range.end.getTime() ? range.start : range.end;
  const end = range.start.getTime() <= range.end.getTime() ? range.end : range.start;
  return `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

export function buildMonthGrid(viewDate: Date): Date[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    return new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
  });
}

export type DayCellVisual =
  | "Null"
  | "Inactive disabled"
  | "Inactive"
  | "Day-active"
  | "Start"
  | "End"
  | "Single-active"
  | "Current";

export function resolveDayCellVisual(
  date: Date,
  viewDate: Date,
  range: DateRange,
  highlightDate: Date | null,
): DayCellVisual {
  const inViewMonth = date.getMonth() === viewDate.getMonth();
  const isTrailingPadding =
    !inViewMonth && date.getTime() > new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getTime();

  if (!inViewMonth && isTrailingPadding) {
    return "Null";
  }

  const { start, end } = range;
  const hasRange = Boolean(start);
  const rangeComplete = Boolean(start && end);

  if (hasRange && start) {
    if (rangeComplete && end) {
      if (sameDay(date, start) && sameDay(date, end)) return "Single-active";
      if (sameDay(date, start)) return "Start";
      if (sameDay(date, end)) return "End";
      if (isBetweenInclusive(date, start, end)) return "Day-active";
    } else if (!rangeComplete && sameDay(date, start)) {
      return "Single-active";
    }
  }

  if (highlightDate && sameDay(date, highlightDate)) {
    return "Current";
  }

  if (!inViewMonth) {
    return "Inactive disabled";
  }

  return "Inactive";
}

export function nextRangeSelection(current: DateRange, selected: Date): DateRange {
  const { start, end } = current;

  if (!start || (start && end)) {
    return { start: startOfDay(selected), end: null };
  }

  if (sameDay(selected, start)) {
    return { start: startOfDay(selected), end: startOfDay(selected) };
  }

  if (selected.getTime() < start.getTime()) {
    return { start: startOfDay(selected), end: start };
  }

  return { start, end: startOfDay(selected) };
}
