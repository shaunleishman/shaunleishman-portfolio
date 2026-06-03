"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  caseStudyContentFadeClass,
  useCaseStudyTransition,
} from "@/lib/useCaseStudyTransition";
import {
  type NhsPersona,
  nhsPersonas,
} from "@/content/nhs-personas";
import { CHART_ACCENTS, ChoiceOutlinePill } from "@/components/projects/CaseStudyChartControls";
import { NhsPersonaJourneyMap } from "@/components/projects/NhsPersonaJourneyMap";

const KEY_TIME_LABELS = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"] as const;
const PERSONA_ILLUSTRATION_WIDTH = "w-[13.5rem] sm:w-[15rem] md:w-[17.5rem]";
const PROFILE_TRIO_CARD_CLASS = "flex h-full flex-col lg:col-span-4 lg:min-h-[14rem]";
const MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOTION_MS = 650;

type NhsPersonasInteractiveProps = {
  className?: string;
};

type DetailView = "profile" | "journey";

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
      <div className="mb-0.5 flex items-center justify-between gap-2 text-[0.8125rem]">
        <span className="font-medium text-[var(--color-text-primary)]">{label}</span>
        <span className="text-[var(--color-text-muted)] tabular-nums motion-safe:transition-[opacity,color] motion-safe:duration-[650ms] motion-safe:ease-in-out">
          {value}%
        </span>
      </div>
      <div className="relative h-1.5 rounded-full" style={{ backgroundColor: CHART_ACCENTS.nhs.trackBg }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full motion-safe:transition-[width] motion-safe:duration-[650ms] motion-safe:ease-in-out"
          style={{ width: `${value}%`, backgroundColor: accentColor, ...motionStyle("width") }}
        />
      </div>
    </div>
  );
}

function KeyTimesChart({ values, accentColor }: { values: number[]; accentColor: string }) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-[6.5rem] flex-1" role="img" aria-label="Call frequency through the day">
        <div className="absolute inset-0 flex gap-0.5">
          {values.map((value, index) => {
            const heightPercent = Math.max(8, (value / max) * 100);
            const isPeak = value >= max * 0.85;

            return (
              <div key={KEY_TIME_LABELS[index]} className="flex min-w-0 flex-1 flex-col justify-end">
                <div
                  className="w-full rounded-t-sm motion-safe:transition-[height,background-color] motion-safe:duration-[650ms] motion-safe:ease-in-out"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isPeak ? accentColor : CHART_ACCENTS.nhs.trackBg,
                    ...motionStyle("height, background-color"),
                  }}
                  title={`${KEY_TIME_LABELS[index]}: relative call volume ${value}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-1.5 flex shrink-0 gap-1">
        {KEY_TIME_LABELS.map((label) => (
          <span
            key={label}
            className="flex-1 text-center text-[0.55rem] text-[var(--color-text-muted)]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PersonaSection({
  title,
  children,
  className,
  fill = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  fill?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-[var(--case-study-accent)]/10 bg-white px-3 py-2.5",
        fill && "flex h-full min-h-0 flex-col",
        className,
      )}
    >
      <h4 className="mb-1.5 shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        {title}
      </h4>
      {fill ? <div className="flex min-h-0 flex-1 flex-col">{children}</div> : children}
    </section>
  );
}

function PersonaText({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">{children}</p>;
}

function PersonaList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PersonaNavItem({
  persona,
  active,
  onSelect,
}: {
  persona: NhsPersona;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left motion-safe:transition-[border-color,background-color,box-shadow,color] motion-safe:duration-300 motion-safe:ease-out",
        active
          ? "border-[var(--case-study-accent)]/30 bg-white shadow-sm"
          : "border-transparent hover:border-[var(--color-border)] hover:bg-white/80",
      )}
    >
      <span className="min-w-0 text-body-sm">
        <span
          className={cn(
            "font-medium motion-safe:transition-colors motion-safe:duration-300 motion-safe:ease-out",
            active ? "text-[var(--case-study-accent)]" : "text-[var(--color-text-primary)]",
          )}
        >
          {persona.name}
        </span>
        <span className="mt-0.5 block text-[0.75rem] leading-snug text-[var(--color-text-muted)]">
          {persona.tagline}
        </span>
      </span>
    </button>
  );
}

function PersonaSwitcher({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-0.5"
      role="tablist"
      aria-label="Switch persona"
    >
      {nhsPersonas.map((persona) => {
        const selected = persona.id === activeId;
        return (
          <button
            key={persona.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(persona.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-[0.75rem] font-medium whitespace-nowrap motion-safe:transition-[border-color,background-color,color,box-shadow] motion-safe:duration-300 motion-safe:ease-out",
              selected
                ? "border-[var(--case-study-accent)]/35 bg-white text-[var(--case-study-accent)] shadow-sm"
                : "border-[var(--color-border)] bg-white/70 text-[var(--color-text-secondary)] hover:border-[var(--case-study-accent)]/20 hover:text-[var(--color-text-primary)]",
            )}
          >
            {persona.name}
          </button>
        );
      })}
    </div>
  );
}

function PersonaIllustration({ persona }: { persona: NhsPersona }) {
  if (persona.illustrationCropBoard) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={persona.illustrationSrc}
          alt={persona.illustrationAlt}
          width={1400}
          height={900}
          className="absolute left-0 top-0 h-auto w-[120%] max-w-none"
          sizes="(min-width: 768px) 280px, 240px"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={persona.illustrationSrc}
        alt={persona.illustrationAlt}
        fill
        className="object-contain object-center"
        sizes="(min-width: 768px) 280px, 240px"
      />
    </div>
  );
}

function PersonaIllustrationStack({ activeId }: { activeId: string }) {
  return (
    <div
      className={cn(
        "grid aspect-[3/2] shrink-0 [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:h-full",
        PERSONA_ILLUSTRATION_WIDTH,
      )}
    >
      {nhsPersonas.map((persona) => (
        <div
          key={persona.id}
          className={cn(
            "w-full motion-safe:transition-opacity motion-safe:duration-[650ms] motion-safe:ease-in-out",
            persona.id === activeId ? "z-10 opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={persona.id !== activeId}
        >
          <PersonaIllustration persona={persona} />
        </div>
      ))}
    </div>
  );
}

function PersonaHeader({
  displayPersona,
  contentVisible,
  illustrationId,
}: {
  displayPersona: NhsPersona;
  contentVisible: boolean;
  illustrationId: string;
}) {
  return (
    <header className="mb-3 flex flex-col gap-2.5 border-b border-[var(--color-border)] pb-3 sm:flex-row sm:items-start sm:justify-between">
      <div className={cn("min-w-0 flex-1", caseStudyContentFadeClass(contentVisible))}>
        <p className="mb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--case-study-accent)]">
          NHS 111 persona
        </p>
        <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">{displayPersona.name}</h3>
        <p className="mt-0.5 text-[0.8125rem] text-[var(--color-text-muted)]">{displayPersona.tagline}</p>
      </div>
      <PersonaIllustrationStack activeId={illustrationId} />
    </header>
  );
}

function PersonaProfile({
  activePersona,
  displayPersona,
  contentVisible,
}: {
  activePersona: NhsPersona;
  displayPersona: NhsPersona;
  contentVisible: boolean;
}) {
  const accent = "var(--case-study-accent)";
  const pullQuote = displayPersona.pullQuotes[0];
  const textFade = caseStudyContentFadeClass(contentVisible);

  return (
    <div className="grid items-stretch gap-2 sm:gap-2.5 lg:grid-cols-12">
      <PersonaSection title="Caller situation" fill className={cn("lg:col-span-8", textFade)}>
        <PersonaText>{displayPersona.callerSituation}</PersonaText>
      </PersonaSection>

      <PersonaSection title="Traits" fill className="lg:col-span-4">
        <div className="flex flex-1 flex-col justify-center space-y-1.5">
          <TraitBar label="Emotional" value={activePersona.traits.emotional} accentColor={accent} />
          <TraitBar label="Thankful" value={activePersona.traits.thankful} accentColor={accent} />
          <TraitBar label="Aggravated" value={activePersona.traits.aggravated} accentColor={accent} />
        </div>
      </PersonaSection>

      <PersonaSection title="Call context" className={cn("lg:col-span-12", textFade)}>
        <dl className="grid gap-2.5 sm:grid-cols-3 sm:gap-3 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
          <div>
            <dt className="font-medium text-[var(--color-text-primary)]">How they heard about 111</dt>
            <dd className="mt-0.5">{displayPersona.heardAbout}</dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--color-text-primary)]">Motivations</dt>
            <dd className="mt-0.5">{displayPersona.motivations}</dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--color-text-primary)]">When they tend to call</dt>
            <dd className="mt-0.5">{displayPersona.whenTheyCall}</dd>
          </div>
        </dl>
      </PersonaSection>

      <PersonaSection title="Key times" fill className={PROFILE_TRIO_CARD_CLASS}>
        <KeyTimesChart values={activePersona.keyTimes} accentColor={accent} />
      </PersonaSection>

      <PersonaSection title="Expectations" fill className={cn(PROFILE_TRIO_CARD_CLASS, textFade)}>
        <PersonaList items={displayPersona.expectations} />
      </PersonaSection>

      <PersonaSection title="Frustrations" fill className={cn(PROFILE_TRIO_CARD_CLASS, textFade)}>
        <PersonaList items={displayPersona.frustrations} />
      </PersonaSection>

      <PersonaSection title="Positives" className={cn("lg:col-span-12", textFade)}>
        {pullQuote && (
          <p className="mb-2 border-l-2 border-[var(--case-study-accent)]/30 pl-2.5 text-[0.8125rem] italic leading-snug text-[var(--case-study-accent)]">
            &ldquo;{pullQuote}&rdquo;
          </p>
        )}
        <PersonaText>{displayPersona.positives}</PersonaText>
      </PersonaSection>
    </div>
  );
}

function PersonaJourneyMap({
  displayPersona,
  contentVisible,
}: {
  displayPersona: NhsPersona;
  contentVisible: boolean;
}) {
  return (
    <div className={caseStudyContentFadeClass(contentVisible)}>
      <NhsPersonaJourneyMap
        personaId={displayPersona.id}
        personaName={displayPersona.name}
      />
    </div>
  );
}

export function NhsPersonasInteractive({ className }: NhsPersonasInteractiveProps) {
  const baseId = useId();
  const [detailView, setDetailView] = useState<DetailView>("profile");
  const [activeId, setActiveId] = useState(nhsPersonas[0]?.id ?? "connection-seeker");
  const { displayItem: displayPersona, contentVisible } = useCaseStudyTransition(activeId, nhsPersonas);

  const activePersona = nhsPersonas.find((persona) => persona.id === activeId) ?? nhsPersonas[0];

  return (
    <div className={cn("not-prose", className)}>
      <div
        id={`${baseId}-explorer`}
        className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-neutral-50"
      >
        <div className="flex flex-col md:flex-row">
          <aside className="hidden shrink-0 border-b border-[var(--color-border)] bg-neutral-50 md:flex md:w-56 md:flex-col md:border-b-0 md:border-r">
            <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Caller personas">
              {nhsPersonas.map((persona) => (
                <PersonaNavItem
                  key={persona.id}
                  persona={persona}
                  active={persona.id === activeId}
                  onSelect={() => setActiveId(persona.id)}
                />
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="border-b border-[var(--color-border)] bg-neutral-50 px-4 py-2.5 md:hidden">
              <PersonaSwitcher activeId={activeId} onSelect={setActiveId} />
            </div>

            <div id={`${baseId}-panel`} className="bg-white p-4 md:p-5">
              <PersonaHeader
                displayPersona={displayPersona}
                contentVisible={contentVisible}
                illustrationId={activeId}
              />

              <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Persona detail view">
                <ChoiceOutlinePill
                  label="Profile"
                  selected={detailView === "profile"}
                  onSelect={() => setDetailView("profile")}
                />
                <ChoiceOutlinePill
                  label="Journey map"
                  selected={detailView === "journey"}
                  onSelect={() => setDetailView("journey")}
                />
              </div>

              {detailView === "profile" ? (
                <PersonaProfile
                  activePersona={activePersona}
                  displayPersona={displayPersona}
                  contentVisible={contentVisible}
                />
              ) : (
                <PersonaJourneyMap displayPersona={displayPersona} contentVisible={contentVisible} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
