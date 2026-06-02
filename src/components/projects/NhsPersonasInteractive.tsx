"use client";

import Image from "next/image";
import { useCallback, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  NHS_PERSONA_SPECTRUM,
  type NhsPersona,
  nhsPersonas,
} from "@/content/nhs-personas";
import { ZoomableScreenshot } from "@/components/projects/ZoomableScreenshot";
import { CaseStudySubheading } from "@/components/projects/CaseStudySubsection";

const KEY_TIME_LABELS = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"] as const;
const KEY_TIMES_CHART_HEIGHT_PX = 72;
const MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOTION_MS = 650;

type NhsPersonasInteractiveProps = {
  className?: string;
};

function motionStyle(property: string) {
  return {
    transitionProperty: property,
    transitionDuration: `${MOTION_MS}ms`,
    transitionTimingFunction: MOTION_EASE,
  } as const;
}

function TraitBar({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: number;
  accentColor: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-body-sm">
        <span className="font-medium text-[var(--color-text-primary)]">{label}</span>
        <span className="text-[var(--color-text-muted)] tabular-nums">{value}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[#dbeafe]">
        <div
          className="absolute inset-y-0 left-0 rounded-full motion-safe:transition-[width] motion-safe:duration-[650ms] motion-safe:ease-in-out"
          style={{ width: `${value}%`, backgroundColor: accentColor, ...motionStyle("width") }}
        />
        <div
          className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white shadow-sm motion-safe:transition-[left] motion-safe:duration-[650ms] motion-safe:ease-in-out"
          style={{
            left: `calc(${value}% - 7px)`,
            backgroundColor: accentColor,
            ...motionStyle("left"),
          }}
          aria-hidden
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-wide text-[var(--color-text-muted)]">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

function KeyTimesChart({ values, accentColor }: { values: number[]; accentColor: string }) {
  const max = Math.max(...values, 1);

  return (
    <div className="mt-3">
      <div
        className="flex items-end gap-1.5"
        style={{ height: KEY_TIMES_CHART_HEIGHT_PX }}
        role="img"
        aria-label="Call frequency through the day"
      >
        {values.map((value, index) => {
          const barHeight = Math.max(6, Math.round((value / max) * KEY_TIMES_CHART_HEIGHT_PX));
          const isPeak = value >= max * 0.85;

          return (
            <div
              key={KEY_TIME_LABELS[index]}
              className="w-full flex-1 rounded-t-md motion-safe:transition-[height,background-color] motion-safe:duration-[650ms] motion-safe:ease-in-out"
              style={{
                height: barHeight,
                backgroundColor: isPeak ? accentColor : "#93c5fd",
                ...motionStyle("height, background-color"),
              }}
              title={`${KEY_TIME_LABELS[index]}: relative call volume ${value}`}
            />
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        {KEY_TIME_LABELS.map((label) => (
          <span
            key={label}
            className="flex-1 text-center text-[0.6rem] text-[var(--color-text-muted)]"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] text-[var(--color-text-muted)]">
        <span>Midnight</span>
        <span>Midday</span>
        <span>Midnight</span>
      </div>
    </div>
  );
}

function PersonaIllustration({ persona }: { persona: NhsPersona }) {
  if (persona.illustrationCropBoard) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#005eb8]/15 bg-white shadow-sm">
        <Image
          src={persona.illustrationSrc}
          alt={persona.illustrationAlt}
          width={1400}
          height={900}
          className="absolute left-0 top-0 w-[120%] max-w-none h-auto"
          sizes="224px"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#005eb8]/15 bg-[#005eb8] shadow-sm">
      <Image
        src={persona.illustrationSrc}
        alt={persona.illustrationAlt}
        fill
        className="object-cover"
        sizes="224px"
      />
    </div>
  );
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

function PersonaHeader({ activePersona }: { activePersona: NhsPersona }) {
  return (
    <header className="mb-6 border-b border-[var(--color-border)] pb-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="relative w-full max-w-md shrink-0 pt-8 sm:pt-10">
          {nhsPersonas.map((persona) => (
            <CrossfadeLayer key={persona.id} active={persona.id === activePersona.id}>
              <p className="mb-3 rounded-xl border border-[#005eb8]/20 bg-white px-3 py-2 text-body-sm italic leading-snug text-[#005eb8] shadow-sm">
                &ldquo;{persona.quote}&rdquo;
              </p>
            </CrossfadeLayer>
          ))}

          <div className="relative h-44 w-56">
            {nhsPersonas.map((persona) => (
              <CrossfadeLayer key={persona.id} active={persona.id === activePersona.id} className="h-full w-full">
                <PersonaIllustration persona={persona} />
              </CrossfadeLayer>
            ))}
          </div>
        </div>

        <div className="relative min-h-[7rem] min-w-0 flex-1 lg:max-w-md lg:text-right">
          {nhsPersonas.map((persona) => (
            <CrossfadeLayer key={persona.id} active={persona.id === activePersona.id}>
              <p className="text-label uppercase tracking-widest text-[#005eb8] mb-1">NHS 111 persona</p>
              <h3 className="text-h3 font-semibold text-[var(--color-text-primary)]">{persona.name}</h3>
              <p className="mt-1 text-body text-[var(--color-text-muted)]">{persona.tagline}</p>
            </CrossfadeLayer>
          ))}
        </div>
      </div>
    </header>
  );
}

function PersonaBoard({ persona }: { persona: NhsPersona }) {
  const accent = "#005eb8";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5">
        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Caller situation
          </h4>
          <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)] motion-safe:transition-opacity motion-safe:duration-[650ms]">
            {persona.callerSituation}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Traits
          </h4>
          <TraitBar label="Emotional" value={persona.traits.emotional} accentColor={accent} />
          <TraitBar label="Thankful" value={persona.traits.thankful} accentColor={accent} />
          <TraitBar label="Aggravated" value={persona.traits.aggravated} accentColor={accent} />
        </div>

        <div className="rounded-xl bg-[#e8f4fc] px-4 py-3">
          <h4 className="mb-2 text-body-sm font-semibold text-[var(--color-text-primary)]">Expectations</h4>
          <ul className="list-disc space-y-1 pl-4 text-body-sm text-[var(--color-text-secondary)]">
            {persona.expectations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            How they heard about us
          </h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">{persona.heardAbout}</p>
        </div>

        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Motivations
          </h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">{persona.motivations}</p>
        </div>

        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            When they tend to call
          </h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">{persona.whenTheyCall}</p>
        </div>

        <div>
          <h4 className="mb-1 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Key times
          </h4>
          <KeyTimesChart values={persona.keyTimes} accentColor={accent} />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Positives
          </h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">{persona.positives}</p>
        </div>

        {persona.pullQuotes.length > 0 && (
          <div className="space-y-2">
            {persona.pullQuotes.map((quote) => (
              <p key={quote} className="text-body-sm italic text-[#005eb8]">
                &ldquo;{quote}&rdquo;
              </p>
            ))}
          </div>
        )}

        <div className="rounded-xl bg-[#e8f4fc] px-4 py-3">
          <h4 className="mb-2 text-body-sm font-semibold text-[var(--color-text-primary)]">Frustrations</h4>
          <ul className="list-disc space-y-1 pl-4 text-body-sm text-[var(--color-text-secondary)]">
            {persona.frustrations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PersonaJourneyMaps({ activeId }: { activeId: string }) {
  return (
    <div className="mt-10 border-t border-[var(--color-border)] pt-8">
      <CaseStudySubheading withLead>Journey map</CaseStudySubheading>
      <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
        End-to-end journey from first hearing about 111 through to after the call — with frustrations,
        quotes, and emotional peaks highlighted.
      </p>
      <div className="relative">
        {nhsPersonas.map((persona) => (
          <div
            key={persona.id}
            className={cn(
              "motion-safe:transition-opacity motion-safe:duration-[650ms] motion-safe:ease-in-out",
              persona.id === activeId ? "opacity-100" : "pointer-events-none absolute inset-x-0 top-0 opacity-0",
            )}
            style={persona.id === activeId ? undefined : motionStyle("opacity")}
            aria-hidden={persona.id !== activeId}
          >
            <ZoomableScreenshot
              src={persona.journeyMapSrc}
              alt={`${persona.name} journey map for NHS 111`}
              caption={`${persona.name} journey`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NhsPersonasInteractive({ className }: NhsPersonasInteractiveProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(nhsPersonas[0]?.id ?? "connection-seeker");

  const activePersona = nhsPersonas.find((persona) => persona.id === activeId) ?? nhsPersonas[0];
  const activeIndex = nhsPersonas.findIndex((persona) => persona.id === activeId);
  const spectrumMarkerLeft =
    activeIndex <= 0
      ? "10%"
      : activeIndex >= nhsPersonas.length - 1
        ? "90%"
        : `${10 + (activeIndex / (nhsPersonas.length - 1)) * 80}%`;

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <div className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#f5f8fa] shadow-sm">
        <div className="border-b border-[#005eb8]/15 bg-[#eef4f9] px-4 py-5 md:px-6">
          <div className="mb-4 flex flex-col gap-1 text-center text-body-sm text-[var(--color-text-muted)] sm:flex-row sm:justify-between sm:text-left">
            <span>{NHS_PERSONA_SPECTRUM.uncertain}</span>
            <span className="hidden sm:inline" aria-hidden>
              →
            </span>
            <span>{NHS_PERSONA_SPECTRUM.certain}</span>
          </div>

          <div className="relative mb-5 hidden h-1 rounded-full bg-[#dbeafe] sm:block" aria-hidden>
            <div className="absolute inset-y-0 left-[10%] right-[10%] rounded-full bg-[#93c5fd]/60" />
            <div
              className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#005eb8] shadow-sm motion-safe:transition-[left] motion-safe:duration-[650ms] motion-safe:ease-in-out"
              style={{ left: spectrumMarkerLeft, ...motionStyle("left") }}
            />
          </div>

          <div
            role="tablist"
            aria-label="NHS 111 caller personas"
            className="flex flex-wrap justify-center gap-1.5 sm:justify-between sm:gap-2"
          >
            {nhsPersonas.map((persona) => {
              const isActive = persona.id === activeId;
              const tabId = `${baseId}-tab-${persona.id}`;

              return (
                <button
                  key={persona.id}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => handleSelect(persona.id)}
                  className={cn(
                    "relative px-4 py-2.5 text-body-sm font-medium min-h-[44px] motion-safe:transition-all motion-safe:duration-300",
                    isActive
                      ? [
                          "rounded-full bg-[#005eb8] text-white shadow-sm",
                          "sm:rounded-b-none sm:rounded-t-xl sm:bg-[#f5f8fa] sm:text-[#005eb8] sm:shadow-[0_-1px_0_0_rgba(0,94,184,0.08)]",
                          "sm:z-10 sm:-mb-px sm:border sm:border-[var(--color-border)] sm:border-b-[#f5f8fa]",
                          "sm:after:absolute sm:after:inset-x-3 sm:after:bottom-0 sm:after:h-0.5 sm:after:rounded-full sm:after:bg-[#005eb8]",
                        ]
                      : [
                          "rounded-full border border-transparent bg-white/70 text-[var(--color-text-secondary)]",
                          "hover:border-[#005eb8]/25 hover:bg-white hover:text-[#005eb8]",
                          "sm:rounded-xl",
                        ],
                  )}
                >
                  {persona.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${activePersona.id}`}
          className="p-5 md:p-8"
        >
          <PersonaHeader activePersona={activePersona} />
          <PersonaBoard persona={activePersona} />
          <PersonaJourneyMaps activeId={activeId} />
        </div>
      </div>

      <p className="mt-3 text-body-sm text-[var(--color-text-muted)]">
        Select a persona above to explore caller profile, journey map, traits, call patterns, and frustrations.
      </p>
    </div>
  );
}
