"use client";

import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NHS_PERSONA_SPECTRUM,
  type NhsPersona,
  nhsPersonas,
} from "@/content/nhs-personas";

const KEY_TIME_LABELS = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"] as const;

type NhsPersonasInteractiveProps = {
  className?: string;
};

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
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%`, backgroundColor: accentColor }}
        />
        <div
          className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-500 ease-out"
          style={{ left: `calc(${value}% - 7px)`, backgroundColor: accentColor }}
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
      <div className="flex h-24 items-end gap-1.5" role="img" aria-label="Call frequency through the day">
        {values.map((value, index) => (
          <div key={KEY_TIME_LABELS[index]} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md transition-all duration-500 ease-out"
              style={{
                height: `${(value / max) * 100}%`,
                minHeight: value > 0 ? "4px" : "2px",
                backgroundColor: value >= max * 0.7 ? accentColor : "#93c5fd",
              }}
              title={`${KEY_TIME_LABELS[index]}: ${value}% relative volume`}
            />
            <span className="text-[0.6rem] text-[var(--color-text-muted)]">{KEY_TIME_LABELS[index]}</span>
          </div>
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

function PersonaBoard({ persona }: { persona: NhsPersona }) {
  const accent = "#005eb8";

  return (
    <div
      key={persona.id}
      className="grid gap-6 lg:grid-cols-3 motion-safe:animate-[fade-in_0.25s_ease-out]"
    >
      <div className="space-y-5">
        <blockquote className="rounded-xl border border-[#005eb8]/20 bg-white px-4 py-3 text-body-sm italic text-[#005eb8]">
          &ldquo;{persona.quote}&rdquo;
        </blockquote>

        <div>
          <h4 className="mb-2 text-body-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Caller situation
          </h4>
          <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
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

export function NhsPersonasInteractive({ className }: NhsPersonasInteractiveProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(nhsPersonas[0]?.id ?? "connection-seeker");

  const activePersona = nhsPersonas.find((persona) => persona.id === activeId) ?? nhsPersonas[0];

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <div className={cn("not-prose", className)}>
      <div className="mb-6 rounded-2xl border border-[var(--color-border)] bg-[#f5f8fa] px-4 py-5 md:px-6">
        <div className="mb-4 flex flex-col gap-1 text-center text-body-sm text-[var(--color-text-muted)] sm:flex-row sm:justify-between sm:text-left">
          <span>{NHS_PERSONA_SPECTRUM.uncertain}</span>
          <span className="hidden sm:inline" aria-hidden>
            →
          </span>
          <span>{NHS_PERSONA_SPECTRUM.certain}</span>
        </div>

        <div
          className="relative mb-2 hidden h-1 rounded-full bg-[#dbeafe] sm:block"
          aria-hidden
        >
          <div className="absolute inset-y-0 left-[10%] right-[10%] rounded-full bg-[#93c5fd]/60" />
        </div>

        <div
          role="tablist"
          aria-label="NHS 111 caller personas"
          className="flex flex-wrap justify-center gap-2 sm:justify-between"
        >
          {nhsPersonas.map((persona) => {
            const isActive = persona.id === activeId;
            const tabId = `${baseId}-tab-${persona.id}`;
            const panelId = `${baseId}-panel-${persona.id}`;

            return (
              <button
                key={persona.id}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => handleSelect(persona.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-body-sm font-medium transition-colors min-h-[44px]",
                  isActive
                    ? "bg-[#005eb8] text-white shadow-sm"
                    : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[#005eb8]/40 hover:text-[#005eb8]",
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
        id={`${baseId}-panel-${activePersona.id}`}
        aria-labelledby={`${baseId}-tab-${activePersona.id}`}
        className="rounded-2xl border border-[var(--color-border)] bg-[#f5f8fa] p-5 md:p-8"
      >
        <header className="mb-6 border-b border-[var(--color-border)] pb-5">
          <p className="text-label uppercase tracking-widest text-[#005eb8] mb-1">NHS 111 persona</p>
          <h3 className="text-h3 font-semibold text-[var(--color-text-primary)]">{activePersona.name}</h3>
          <p className="mt-1 text-body text-[var(--color-text-muted)]">{activePersona.tagline}</p>
        </header>

        <PersonaBoard persona={activePersona} />
      </div>

      <p className="mt-3 text-body-sm text-[var(--color-text-muted)]">
        Select a persona above to explore caller motivations, traits, call patterns, and frustrations.
      </p>
    </div>
  );
}
