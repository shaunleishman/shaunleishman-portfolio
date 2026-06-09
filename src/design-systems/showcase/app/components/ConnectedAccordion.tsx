"use client";

import { useState } from "react";
import CheckBox from "../../imports/CheckBox";
import { ShowcaseChevron } from "./ShowcaseChevron";

type ConnectedAccordionProps = {
  defaultOpen?: boolean;
  defaultChecked?: boolean;
};

export function ConnectedAccordion({ defaultOpen = true, defaultChecked = false }: ConnectedAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [checked, setChecked] = useState(defaultChecked);

  const toggleOpen = () => setOpen((current) => !current);

  return (
    <div
      className={`showcase-connected-accordion relative flex w-full flex-col items-stretch justify-center gap-4 rounded-[16px] p-4 ${checked ? "bg-white" : "bg-white"}`}
      data-name="Accordian"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[16px] border border-solid ${checked ? "border-2 border-[#00a7b5]" : "border border-[#aab6b4]"}`}
      />

      <div className="relative flex w-full min-w-0 items-start gap-4">
        <button
          type="button"
          aria-pressed={checked}
          aria-label={checked ? "Deselect meter" : "Select meter"}
          onClick={(event) => {
            event.stopPropagation();
            setChecked((current) => !current);
          }}
          className="shrink-0 cursor-pointer border-0 bg-transparent p-0"
        >
          <CheckBox checkBox={checked ? "On" : "Off"} comp={false} />
        </button>

        <button
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent p-0 text-left"
          data-name="Heading-three-caption-medium"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="min-w-0 flex-1 break-words font-['Open_Sans:semi-bold',sans-serif] text-[18px] leading-[24px] tracking-[-0.2px] text-[#4a5453]">
                9 Church Lane, Leeds
              </p>
              <p className="shrink-0 font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                100kWh
              </p>
            </div>
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="min-w-0 font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
                Electric • Active
              </p>
              <p className="shrink-0 text-right font-['Open_Sans:semi-bold',sans-serif] text-[11px] leading-[16px] tracking-[-0.1px] text-[#aab6b4]">
                Last reading: 43 days ago
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Collapse section" : "Expand section"}
          onClick={toggleOpen}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          data-name="Icons"
        >
          <ShowcaseChevron direction={open ? "up" : "down"} size="md" />
        </button>
      </div>

      {open && (
        <div className="relative w-full shrink-0 rounded-[4px] bg-[#f5f6f6]" data-name="Upload status">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[4px] border-0 border-dashed border-[#26c6da]" />
          <div className="p-4">
            <p className="font-['Open_Sans:semi-bold',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
              Insert content here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
