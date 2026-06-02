"use client";

import Image from "next/image";
import { useCallback, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type OmronPractitioner, omronPractitioners } from "@/content/omron-practitioners";

const MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOTION_MS = 650;

type OmronPractitionerBoardsInteractiveProps = {
  className?: string;
};

function motionStyle(property: string) {
  return {
    transitionProperty: property,
    transitionDuration: `${MOTION_MS}ms`,
    transitionTimingFunction: MOTION_EASE,
  } as const;
}

function CrossfadeLayer({
  active,
  children,
  className,
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "motion-safe:transition-opacity motion-safe:duration-[650ms] motion-safe:ease-in-out",
        active ? "relative z-10 opacity-100" : "pointer-events-none absolute inset-0 z-0 opacity-0",
        className,
      )}
      style={motionStyle("opacity")}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function PractitionerIdentity({ practitioner }: { practitioner: OmronPractitioner }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center rounded-xl px-4 py-6 text-center sm:w-44 md:w-48"
      style={{ backgroundColor: practitioner.accentBg }}
    >
      <div className="relative mb-4 h-28 w-full overflow-hidden rounded-lg">
        <Image
          src={practitioner.boardSrc}
          alt={practitioner.boardAlt}
          fill
          className="object-cover object-left"
          sizes="192px"
        />
      </div>
      <p className="text-body font-semibold leading-snug" style={{ color: practitioner.accentColor }}>
        {practitioner.name}
      </p>
    </div>
  );
}

function PractitionerBoard({ practitioner }: { practitioner: OmronPractitioner }) {
  return (
    <div className="min-w-0 flex-1 space-y-5">
      <div>
        <h4
          className="mb-2 text-body-sm font-semibold uppercase tracking-wide"
          style={{ color: practitioner.headingColor }}
        >
          Role
        </h4>
        <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
          {practitioner.role}
        </p>
      </div>

      <div>
        <h4
          className="mb-2 text-body-sm font-semibold uppercase tracking-wide"
          style={{ color: practitioner.headingColor }}
        >
          Key tasks
        </h4>
        <ul className="list-disc space-y-1.5 pl-4 text-body-sm text-[var(--color-text-secondary)]">
          {practitioner.keyTasks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4
          className="mb-2 text-body-sm font-semibold uppercase tracking-wide"
          style={{ color: practitioner.headingColor }}
        >
          Interaction with others
        </h4>
        <ul className="space-y-2 text-body-sm text-[var(--color-text-secondary)]">
          {practitioner.interactions.map(({ label, description }) => (
            <li key={label}>
              <span className="font-medium text-[var(--color-text-primary)]">{label}:</span>{" "}
              {description}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-white/80 px-4 py-3 border border-[var(--color-border)]">
        <h4
          className="mb-2 text-body-sm font-semibold"
          style={{ color: practitioner.headingColor }}
        >
          Usage of OMRON system
        </h4>
        <ul className="list-disc space-y-1.5 pl-4 text-body-sm text-[var(--color-text-secondary)]">
          {practitioner.visoUsage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OmronPractitionerBoardsInteractive({
  className,
}: OmronPractitionerBoardsInteractiveProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(omronPractitioners[0]?.id ?? "general-practitioner");

  const activePractitioner =
    omronPractitioners.find((practitioner) => practitioner.id === activeId) ?? omronPractitioners[0];

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <div className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#f5f8fa] shadow-sm">
        <div className="border-b border-[#003da5]/15 bg-[#eef2f9] px-4 py-5 md:px-6">
          <p className="mb-4 text-body-sm text-[var(--color-text-muted)]">
            Four practitioner groups from co-design workshops — select a role to explore tasks,
            interactions, and how they use OMRON VISO.
          </p>

          <div
            role="tablist"
            aria-label="OMRON practitioner personas"
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {omronPractitioners.map((practitioner) => {
              const isActive = practitioner.id === activeId;
              const tabId = `${baseId}-tab-${practitioner.id}`;

              return (
                <button
                  key={practitioner.id}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => handleSelect(practitioner.id)}
                  className={cn(
                    "relative px-4 py-2.5 text-body-sm font-medium min-h-[44px] motion-safe:transition-all motion-safe:duration-300",
                    isActive
                      ? [
                          "rounded-full bg-[#003da5] text-white",
                          "sm:rounded-b-none sm:rounded-t-xl sm:bg-[#f5f8fa] sm:text-[#003da5]",
                          "sm:z-10 sm:-mb-px sm:border sm:border-[var(--color-border)] sm:border-b-[#f5f8fa]",
                          "sm:after:absolute sm:after:inset-x-3 sm:after:bottom-0 sm:after:h-0.5 sm:after:rounded-full sm:after:bg-[#003da5]",
                        ]
                      : [
                          "rounded-full border border-transparent bg-white/70 text-[var(--color-text-secondary)]",
                          "hover:border-[#003da5]/25 hover:bg-white hover:text-[#003da5]",
                          "sm:rounded-xl",
                        ],
                  )}
                >
                  {practitioner.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${activePractitioner.id}`}
          className="p-5 md:p-8"
        >
          <div className="relative mb-6 min-h-[4rem]">
            {omronPractitioners.map((practitioner) => (
              <CrossfadeLayer key={practitioner.id} active={practitioner.id === activeId}>
                <p className="text-label uppercase tracking-widest text-[#003da5] mb-1">
                  OMRON practitioner persona
                </p>
                <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
                  {practitioner.name}
                </h3>
                <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
                  {practitioner.tagline}
                </p>
              </CrossfadeLayer>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="relative mx-auto w-full max-w-[12rem] shrink-0 sm:mx-0">
              {omronPractitioners.map((practitioner) => (
                <CrossfadeLayer
                  key={practitioner.id}
                  active={practitioner.id === activeId}
                  className="w-full"
                >
                  <PractitionerIdentity practitioner={practitioner} />
                </CrossfadeLayer>
              ))}
            </div>

            <PractitionerBoard practitioner={activePractitioner} />
          </div>
        </div>
      </div>

      <p className="mt-3 text-body-sm text-[var(--color-text-muted)]">
        Select a practitioner role above to explore how each group uses VISO in practice.
      </p>
    </div>
  );
}
