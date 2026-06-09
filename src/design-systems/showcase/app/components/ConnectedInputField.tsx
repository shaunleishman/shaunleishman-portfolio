"use client";

import { useId, useState } from "react";
import svgPaths from "../../imports/InputField/svg-32yx2j8oqg";
import { ShowcaseChevron } from "./ShowcaseChevron";

export type ConnectedInputFieldState =
  | "Default"
  | "Hover"
  | "Selected"
  | "Disabled"
  | "Validation"
  | "Warning";

type ConnectedInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  forcedState?: ConnectedInputFieldState;
  notifierText?: string;
  notifier?: { text: string; tone: "success" | "warning" | "error" } | null;
  showTooltip?: boolean;
  compBefore?: boolean;
  compAfter?: boolean;
  type?: string;
  className?: string;
};

function HelpCircleIcon({ size = 20, fill = "#4A5453" }: { size?: number; fill?: string }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: size, height: size }} data-name="help-circle">
      <div className="absolute inset-[4.17%]" data-name="Icon (Stroke)">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
          <path clipRule="evenodd" d={svgPaths.p1ed09300} fill={`var(--fill-0, ${fill})`} fillRule="evenodd" id="Icon (Stroke)" />
        </svg>
      </div>
    </div>
  );
}

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

function resolveVisualState({
  forcedState,
  disabled,
  focused,
  hovered,
}: {
  forcedState?: ConnectedInputFieldState;
  disabled?: boolean;
  focused: boolean;
  hovered: boolean;
}): ConnectedInputFieldState {
  if (disabled || forcedState === "Disabled") return "Disabled";
  if (forcedState && forcedState !== "Default") return forcedState;
  if (focused) return "Selected";
  if (hovered) return "Hover";
  return "Default";
}

function fieldSurfaceClasses(state: ConnectedInputFieldState): string {
  switch (state) {
    case "Hover":
      return "bg-[#e0f7fa] border border-[#aab6b4]";
    case "Selected":
      return "bg-white border-2 border-[#00a7b5] -m-px";
    case "Disabled":
      return "bg-[#e5e8e7] border-0";
    case "Validation":
    case "Warning":
    case "Default":
    default:
      return "bg-white border border-[#aab6b4]";
  }
}

function NotifierFoot({
  tone,
  text,
}: {
  tone: "success" | "warning" | "error";
  text: string;
}) {
  const styles =
    tone === "success"
      ? { bg: "bg-[#4ca843]", text: "text-white", icon: "white" }
      : tone === "warning"
        ? { bg: "bg-[#fff4e5]", text: "text-[#f5a50d]", icon: "#F5A50D" }
        : { bg: "bg-[#d04a21]", text: "text-white", icon: "white" };

  return (
    <div className={`relative rounded-[8px] shrink-0 w-full ${styles.bg}`}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
            <p
              className={`[word-break:break-word] font-['Open_Sans:semi-bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] tracking-[-0.1px] whitespace-nowrap ${styles.text}`}
            >
              {text}
            </p>
          </div>
          <div className="content-stretch flex flex-col items-end justify-center relative shrink-0">
            <HelpCircleIcon size={16} fill={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConnectedInputField({
  label,
  value,
  onChange,
  placeholder = "Placeholder",
  required = true,
  disabled = false,
  forcedState,
  notifierText,
  notifier = null,
  showTooltip = true,
  compBefore = false,
  compAfter = false,
  type = "text",
  className,
}: ConnectedInputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputId = useId();

  const isDisabled = disabled || forcedState === "Disabled";
  const visualState = resolveVisualState({
    forcedState,
    disabled: isDisabled,
    focused,
    hovered,
  });

  const resolvedNotifier =
    notifier ??
    (notifierText && (forcedState === "Validation" || forcedState === "Warning")
      ? {
          text: notifierText,
          tone: forcedState === "Validation" ? ("success" as const) : ("warning" as const),
        }
      : null);

  const showLabelRow = Boolean(label.trim());

  const placeholderActive = !value;
  const textColor =
    visualState === "Disabled"
      ? "text-[#aab6b4]"
      : placeholderActive
        ? "text-[#aab6b4]"
        : "text-[#4a5453]";

  return (
    <div
      className={`connected-input-field content-stretch flex flex-col items-start relative w-full max-w-sm ${showLabelRow ? "gap-[8px]" : "gap-0"} ${className ?? ""}`}
    >
      {showLabelRow ? (
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
          <label
            htmlFor={inputId}
            className="content-stretch flex gap-[4px] h-[11px] items-center relative shrink-0 cursor-default"
            data-name="label-required-icon"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5453] text-[14px] tracking-[-0.1px] whitespace-nowrap">
              {label}
            </span>
            {required && (
              <span
                className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#d04a21] text-[14px] whitespace-nowrap"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                *
              </span>
            )}
            {showTooltip && <HelpCircleIcon />}
          </label>
        </div>
      ) : null}

      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <div
          className={`relative h-[40px] rounded-[8px] shrink-0 w-full transition-[background-color,border-color] duration-150 ${fieldSurfaceClasses(visualState)}`}
          data-name="Field-all-icons"
          onMouseEnter={() => !isDisabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex h-full w-full flex-row items-center">
            <label
              htmlFor={inputId}
              className="relative flex h-full min-w-0 w-full flex-1 cursor-text items-center gap-2 p-3"
            >
              <div className="relative flex min-w-0 flex-1 items-center gap-2 self-stretch">
                {compBefore && <SearchIcon />}
                <input
                  id={inputId}
                  type={type}
                  value={value}
                  disabled={isDisabled}
                  placeholder={placeholder}
                  onChange={(event) => onChange(event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className={`min-w-0 w-full flex-1 border-0 bg-transparent font-['Open_Sans:regular',sans-serif] leading-[20px] not-italic text-[14px] tracking-[-0.1px] outline-none placeholder:text-[#aab6b4] disabled:cursor-not-allowed ${textColor}`}
                />
              </div>
              {compAfter && <ShowcaseChevron size="sm" direction="up" />}
            </label>
          </div>
        </div>

        {resolvedNotifier && (
          <NotifierFoot tone={resolvedNotifier.tone} text={resolvedNotifier.text} />
        )}
      </div>
    </div>
  );
}
