"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/DropdownSelection/svg-56ob9skgku";
import {
  CHIP_FILLED_CLASS,
  CHIP_OVERFLOW_CLASS,
  ChipRemoveButton,
  ConnectedChip,
} from "./ConnectedChip";
import { SHOWCASE_CHEVRON_PX, ShowcaseChevron } from "./ShowcaseChevron";
import { cn } from "@/lib/utils";

export type ConnectedDropdownOption = {
  value: string;
  label: string;
};

type ConnectedDropdownBaseProps = {
  label?: string;
  required?: boolean;
  "aria-label"?: string;
  options: ConnectedDropdownOption[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  accentColor?: string;
  menuPlacement?: "above" | "below";
  size?: "md" | "sm";
};

function getDropdownAccentStyle(accentColor?: string): CSSProperties {
  const isGreen = accentColor === "#14a35c";
  return {
    "--dropdown-accent": accentColor ?? "#00a7b5",
    "--dropdown-accent-surface": isGreen ? "#f0f9f4" : "#e0f7fa",
    "--dropdown-accent-surface-hover": isGreen ? "#d4edda" : "#b2ebf2",
    "--dropdown-accent-surface-active": isGreen ? "#b8dfc4" : "#80deea",
  } as CSSProperties;
}

type ConnectedDropdownSingleProps = ConnectedDropdownBaseProps & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type ConnectedDropdownMultiProps = ConnectedDropdownBaseProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type ConnectedDropdownSelectionProps = ConnectedDropdownSingleProps | ConnectedDropdownMultiProps;

const SCROLL_THRESHOLD = 5;
const SEARCH_THRESHOLD = 10;
const CHIP_GAP = 4;
const TRIGGER_FONT_CLASS =
  "font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px]";

type SelectedItem = { value: string; label: string };

type TriggerPart =
  | { type: "label"; item: SelectedItem }
  | { type: "more"; text: string; hiddenItems: SelectedItem[] };

function SearchIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Icons">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="search-md">
        <div className="absolute inset-[8.33%]" data-name="Solid">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
            <path clipRule="evenodd" d={svgPaths.p202b24c0} fill="var(--fill-0, #4A5453)" fillRule="evenodd" id="Solid" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function OptionCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`connected-dropdown-checkbox relative flex size-4 shrink-0 items-center justify-center rounded-[4px] ${checked ? "connected-dropdown-checkbox--checked" : ""}`}
      data-name="Check box"
    >
      <span
        aria-hidden
        className="connected-dropdown-checkbox-border pointer-events-none absolute inset-0 rounded-[4px] border border-solid"
      />
      {checked && (
        <svg className="relative size-2.5" viewBox="0 0 9 7" fill="none" aria-hidden>
          <path
            clipRule="evenodd"
            d="M8.03033 0.96967C8.32322 1.26256 8.32322 1.73744 8.03033 2.03033L3.53033 6.53033C3.23744 6.82322 2.76256 6.82322 2.46967 6.53033L0.46967 4.53033C0.176777 4.23744 0.176777 3.76256 0.46967 3.46967C0.762563 3.17678 1.23744 3.17678 1.53033 3.46967L3 4.93934L6.96967 0.96967C7.26256 0.676777 7.73744 0.676777 8.03033 0.96967Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      )}
    </span>
  );
}

function OptionRow({
  label,
  selected,
  onSelect,
  showCheckbox = false,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  showCheckbox?: boolean;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      data-name="Field-all-icons"
      className={[
        "connected-dropdown-option flex h-10 w-full shrink-0 items-center rounded-[8px] border border-solid px-3 text-left",
        showCheckbox ? "gap-2" : "",
        TRIGGER_FONT_CLASS,
        "text-[#4a5453] transition-[background-color,border-color] duration-150",
        selected ? "connected-dropdown-option--selected" : "",
      ].join(" ")}
    >
      {showCheckbox && <OptionCheckbox checked={selected} />}
      <span className="min-w-0 truncate">{label}</span>
    </button>
  );
}

function MultiSelectChip({
  item,
  onRemove,
}: {
  item: SelectedItem;
  onRemove: (value: string) => void;
}) {
  return <ConnectedChip label={item.label} onRemove={() => onRemove(item.value)} />;
}

function rowWidth(items: number[], gap: number) {
  if (items.length === 0) return 0;
  return items.reduce((sum, width) => sum + width, 0) + gap * (items.length - 1);
}

function fitSelectedLabels(
  items: SelectedItem[],
  availableWidth: number,
  measureChip: (label: string) => number,
  measureMore: (text: string) => number,
): TriggerPart[] {
  if (items.length === 0 || availableWidth <= 0) return [];

  const chipWidths = items.map((item) => measureChip(item.label));
  const safeWidth = Math.max(0, availableWidth - 4);

  if (rowWidth(chipWidths, CHIP_GAP) <= safeWidth) {
    return items.map((item) => ({ type: "label", item }));
  }

  for (let visibleCount = items.length - 1; visibleCount >= 0; visibleCount -= 1) {
    const hiddenItems = items.slice(visibleCount);
    const hiddenCount = hiddenItems.length;
    const moreText = `+ ${hiddenCount} more`;
    const moreWidth = measureMore(moreText);

    if (visibleCount === 0) {
      if (moreWidth <= safeWidth) {
        return [{ type: "more", text: moreText, hiddenItems }];
      }
      continue;
    }

    const visibleWidths = chipWidths.slice(0, visibleCount);
    const totalWidth = rowWidth(visibleWidths, CHIP_GAP) + CHIP_GAP + moreWidth;

    if (totalWidth <= safeWidth) {
      return [
        ...items.slice(0, visibleCount).map((item) => ({ type: "label" as const, item })),
        { type: "more", text: moreText, hiddenItems },
      ];
    }
  }

  const moreText = `+ ${items.length} more`;
  return [{ type: "more", text: moreText, hiddenItems: items }];
}

function OverflowMoreIndicator({
  text,
  hiddenItems,
  onRemove,
}: {
  text: string;
  hiddenItems: SelectedItem[];
  onRemove: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLSpanElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const tooltipId = useId();

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setPosition({ top: rect.bottom + 6, left: rect.left });
  }, []);

  const show = useCallback(() => {
    clearCloseTimer();
    updatePosition();
    setOpen(true);
  }, [clearCloseTimer, updatePosition]);

  const hide = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const tooltip =
    open &&
    hiddenItems.length > 0 &&
    typeof document !== "undefined" &&
    createPortal(
      <span
        id={tooltipId}
        role="tooltip"
        style={{ top: position.top, left: position.left }}
        className="connected-dropdown-overflow-tooltip fixed z-[9999] min-w-[10rem] rounded-[8px] border border-[#aab6b4] bg-white p-2 shadow-[0px_8px_12px_rgba(28,42,42,0.05)]"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <span className="flex flex-col gap-1">
          {hiddenItems.map((item) => (
            <span key={item.value} className={`${CHIP_FILLED_CLASS} w-full justify-between`}>
              <span className="min-w-0 truncate whitespace-nowrap">{item.label}</span>
              <ChipRemoveButton label={item.label} tone="filled" onRemove={() => onRemove(item.value)} />
            </span>
          ))}
        </span>
      </span>,
      document.body,
    );

  return (
    <>
      <span
        ref={anchorRef}
        className="relative shrink-0"
        onMouseEnter={(event) => {
          event.stopPropagation();
          show();
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          hide();
        }}
      >
        <span
          tabIndex={0}
          className={`${CHIP_OVERFLOW_CLASS} cursor-default whitespace-nowrap`}
          aria-describedby={open ? tooltipId : undefined}
          onFocus={(event) => {
            event.stopPropagation();
            show();
          }}
          onBlur={(event) => {
            event.stopPropagation();
            hide();
          }}
        >
          {text}
        </span>
      </span>
      {tooltip}
    </>
  );
}

function MultiSelectTriggerValue({
  items,
  placeholder,
  measureChip,
  measureMore,
  onRemove,
}: {
  items: SelectedItem[];
  placeholder: string;
  measureChip: (label: string) => number;
  measureMore: (text: string) => number;
  onRemove: (value: string) => void;
}) {
  const contentRef = useRef<HTMLSpanElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [widthAdjustment, setWidthAdjustment] = useState(0);

  useLayoutEffect(() => {
    setWidthAdjustment(0);
  }, [items]);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const updateWidth = () => {
      const row = node.parentElement;
      if (!row) {
        setAvailableWidth(node.clientWidth);
        return;
      }

      const chevron = row.lastElementChild as HTMLElement | null;
      const rowGap = 8;
      const chevronWidth = chevron?.offsetWidth ?? SHOWCASE_CHEVRON_PX.sm;
      setAvailableWidth(Math.max(0, row.clientWidth - chevronWidth - rowGap));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    if (node.parentElement) observer.observe(node.parentElement);
    return () => observer.disconnect();
  }, [items]);

  const effectiveWidth = Math.max(0, availableWidth - widthAdjustment);

  const parts = useMemo(
    () => (items.length === 0 ? [] : fitSelectedLabels(items, effectiveWidth, measureChip, measureMore)),
    [effectiveWidth, items, measureChip, measureMore],
  );

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node || items.length === 0) return;

    const overflow = node.scrollWidth - node.clientWidth;
    if (overflow > 1) {
      setWidthAdjustment((current) => current + overflow + 4);
    }
  }, [items, parts]);

  if (items.length === 0) {
    return (
      <span ref={contentRef} className={`min-w-0 flex-1 truncate text-left text-[#aab6b4] ${TRIGGER_FONT_CLASS}`}>
        {placeholder}
      </span>
    );
  }

  return (
    <span ref={contentRef} className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
      {availableWidth > 0 &&
        parts.map((part, index) =>
          part.type === "label" ? (
            <MultiSelectChip key={`${part.type}-${part.item.value}-${index}`} item={part.item} onRemove={onRemove} />
          ) : (
            <OverflowMoreIndicator
              key={`${part.type}-${part.text}-${index}`}
              text={part.text}
              hiddenItems={part.hiddenItems}
              onRemove={onRemove}
            />
          ),
        )}
    </span>
  );
}

export function ConnectedDropdownSelection(props: ConnectedDropdownSelectionProps) {
  const {
    label,
    required = false,
    options,
    disabled = false,
    className,
    placeholder = "Choose an option",
    searchPlaceholder = "Search",
    multiple = false,
    accentColor,
    menuPlacement = "below",
    size = "md",
  } = props;
  const ariaLabel = props["aria-label"];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const measureChipRef = useRef<HTMLSpanElement>(null);
  const measureMoreRef = useRef<HTMLSpanElement>(null);
  const listId = useId();
  const showScroll = options.length > SCROLL_THRESHOLD;
  const showSearch = options.length > SEARCH_THRESHOLD;

  const measureChip = useCallback((label: string) => {
    const node = measureChipRef.current;
    if (!node) return label.length * 8 + 36;
    const labelNode = node.querySelector("[data-measure-chip-label]");
    if (labelNode) labelNode.textContent = label;
    return node.offsetWidth;
  }, []);

  const measureMore = useCallback((text: string) => {
    const node = measureMoreRef.current;
    if (!node) return text.length * 8 + 16;
    node.textContent = text;
    return node.offsetWidth;
  }, []);

  const filteredOptions = useMemo(() => {
    if (!showSearch) return options;
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((option) => option.label.toLowerCase().includes(trimmed));
  }, [options, query, showSearch]);

  const selectedItems = useMemo(() => {
    if (!multiple) return [];
    const values = (props as ConnectedDropdownMultiProps).value;
    const seen = new Set<string>();
    return values
      .filter((value) => {
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      })
      .map((value) => {
        const option = options.find((item) => item.value === value);
        return { value, label: option?.label ?? value };
      });
  }, [multiple, options, props]);

  function handleRemove(value: string) {
    if (!multiple) return;
    const values = (props as ConnectedDropdownMultiProps).value;
    (props as ConnectedDropdownMultiProps).onChange(values.filter((item) => item !== value));
  }

  const singleTrigger = useMemo(() => {
    if (multiple) return null;
    const selected = options.find((option) => option.value === (props as ConnectedDropdownSingleProps).value);
    return {
      text: selected?.label ?? placeholder,
      muted: !selected,
    };
  }, [multiple, options, placeholder, props]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function isSelected(optionValue: string) {
    if (multiple) {
      return (props as ConnectedDropdownMultiProps).value.includes(optionValue);
    }
    return (props as ConnectedDropdownSingleProps).value === optionValue;
  }

  function handleSelect(optionValue: string) {
    if (multiple) {
      const values = (props as ConnectedDropdownMultiProps).value;
      const next = values.includes(optionValue)
        ? values.filter((item) => item !== optionValue)
        : [...values, optionValue];
      (props as ConnectedDropdownMultiProps).onChange(next);
      return;
    }
    (props as ConnectedDropdownSingleProps).onChange(optionValue);
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "connected-dropdown-selection relative shrink-0",
        !className?.match(/\bw-/) && "w-full",
        size === "sm" && "connected-dropdown-selection--sm",
        className,
      )}
      style={getDropdownAccentStyle(accentColor)}
    >
      <div aria-hidden className="connected-dropdown-measure">
        <span ref={measureChipRef} data-measure-chip className={CHIP_FILLED_CLASS}>
          <span data-measure-chip-label className="whitespace-nowrap" />
          <span className="inline-flex size-4 shrink-0" aria-hidden />
        </span>
        <span ref={measureMoreRef} data-measure-more className={CHIP_OVERFLOW_CLASS} />
      </div>
      {label ? (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#aab6b4]">
          {label}
          {required && <span className="text-[var(--colour-states-error,#d04a21)]"> *</span>}
        </p>
      ) : null}

      <div className="relative flex w-full flex-col items-start rounded-[16px]">
        <div className="relative w-full shrink-0">
          <button
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-label={ariaLabel ?? label}
            onClick={() => !disabled && setOpen((current) => !current)}
            className={[
              "connected-dropdown-trigger relative h-10 w-full shrink-0 rounded-[8px] border border-solid p-0 text-left transition-[background-color,border-color] duration-150",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            ].join(" ")}
            data-name="Field-all-icons"
          >
            <span className="flex h-full w-full items-center justify-between gap-2 p-2">
              {multiple ? (
                <MultiSelectTriggerValue
                  items={selectedItems}
                  placeholder={placeholder}
                  measureChip={measureChip}
                  measureMore={measureMore}
                  onRemove={handleRemove}
                />
              ) : (
                <span
                  className={`min-w-0 flex-1 truncate text-left ${TRIGGER_FONT_CLASS} ${
                    singleTrigger?.muted ? "text-[#aab6b4]" : "text-[#4a5453]"
                  }`}
                >
                  {singleTrigger?.text}
                </span>
              )}
              <ShowcaseChevron size="sm" direction={open ? "up" : "down"} />
            </span>
          </button>

          {open && !disabled && (
            <div
              id={listId}
              role="listbox"
              aria-label={ariaLabel ?? label ?? "Options"}
              aria-multiselectable={multiple || undefined}
              className={[
                "connected-dropdown-panel shrink-0 rounded-[8px] bg-[#f5f6f6] drop-shadow-[0px_8px_12px_rgba(28,42,42,0.05)]",
                menuPlacement === "above" ? "connected-dropdown-panel--above" : "",
              ].join(" ")}
            >
              <div className="flex w-full flex-col items-center">
                <div className="relative flex w-full flex-col gap-1 p-1">
                  {showSearch && (
                    <div className="relative w-full shrink-0" data-name="Input field">
                      <div
                        className="relative h-10 w-full shrink-0 rounded-[8px] border border-solid border-[#aab6b4] bg-white"
                        data-name="Field-all-icons"
                      >
                        <label className="relative flex h-full w-full items-center gap-3 px-3 py-2">
                          <span className="sr-only">Search {label}</span>
                          <SearchIcon />
                          <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={searchPlaceholder}
                            className={`min-w-0 flex-1 border-0 bg-transparent ${TRIGGER_FONT_CLASS} text-[#4a5453] outline-none placeholder:text-[#aab6b4]`}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <div
                    className={`connected-dropdown-options flex w-full flex-col gap-1 ${showScroll ? "max-h-[220px] overflow-y-auto pr-0.5" : ""}`}
                  >
                    {filteredOptions.length === 0 ? (
                      <p className="px-3 py-2 text-xs text-[#aab6b4]">No matches</p>
                    ) : (
                      filteredOptions.map((option) => (
                        <OptionRow
                          key={option.value}
                          label={option.label}
                          selected={isSelected(option.value)}
                          onSelect={() => handleSelect(option.value)}
                          showCheckbox={multiple}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use ConnectedDropdownSelection */
export const ShowcaseSingleSelectDropdown = ConnectedDropdownSelection;
