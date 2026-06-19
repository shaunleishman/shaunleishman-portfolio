"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import {
  caseStudyContentFadeClass,
  useCaseStudyTransition,
} from "@/lib/useCaseStudyTransition";
import {
  type NhsPersona,
  nhsPersonas,
} from "@/content/nhs-personas";
import { ChoiceOutlinePill } from "@/components/projects/CaseStudyChartControls";
import { NhsPersonaJourneyMap } from "@/components/projects/NhsPersonaJourneyMap";

/** Native dimensions of the persona infographic screenshots. */
const INFOGRAPHIC_WIDTH = 1024;
const INFOGRAPHIC_HEIGHT = 614;

type NhsPersonasInteractiveProps = {
  className?: string;
};

type DetailView = "profile" | "journey";

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

function PersonaInfographic({
  displayPersona,
  contentVisible,
}: {
  displayPersona: NhsPersona;
  contentVisible: boolean;
}) {
  return (
    <div className={caseStudyContentFadeClass(contentVisible)}>
      <Image
        src={displayPersona.infographicSrc}
        alt={`${displayPersona.name} persona overview`}
        width={INFOGRAPHIC_WIDTH}
        height={INFOGRAPHIC_HEIGHT}
        className="h-auto w-full rounded-lg border border-[var(--color-border)]"
        sizes="(min-width: 768px) 640px, 100vw"
      />
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
              <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Persona detail view">
                <ChoiceOutlinePill
                  label="Persona"
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
                <PersonaInfographic displayPersona={displayPersona} contentVisible={contentVisible} />
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
