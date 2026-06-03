"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  caseStudyContentFadeClass,
  useCaseStudyTransition,
} from "@/lib/useCaseStudyTransition";
import { type OmronPractitioner, omronPractitioners } from "@/content/omron-practitioners";

const PRACTITIONER_ILLUSTRATION_FRAME =
  "h-[6.5rem] w-[4.5rem] shrink-0 sm:h-[7rem] sm:w-[4.875rem] md:h-[7.25rem] md:w-[5rem]";
const UNIFORM_ILLUSTRATION_WIDTH = 400;
const UNIFORM_ILLUSTRATION_HEIGHT = 480;
const PROFILE_DUO_CARD_CLASS = "flex h-full flex-col lg:col-span-6 lg:min-h-[12rem]";

type OmronPractitionerBoardsInteractiveProps = {
  className?: string;
};

function PractitionerSection({
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

function PractitionerNavItem({
  practitioner,
  active,
  onSelect,
}: {
  practitioner: OmronPractitioner;
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
          {practitioner.name}
        </span>
        <span className="mt-0.5 block text-[0.75rem] leading-snug text-[var(--color-text-muted)]">
          {practitioner.tagline}
        </span>
      </span>
    </button>
  );
}

function PractitionerSwitcher({
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
      aria-label="Switch user group"
    >
      {omronPractitioners.map((practitioner) => {
        const selected = practitioner.id === activeId;
        return (
          <button
            key={practitioner.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(practitioner.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-[0.75rem] font-medium whitespace-nowrap motion-safe:transition-[border-color,background-color,color,box-shadow] motion-safe:duration-300 motion-safe:ease-out",
              selected
                ? "border-[var(--case-study-accent)]/35 bg-white text-[var(--case-study-accent)] shadow-sm"
                : "border-[var(--color-border)] bg-white/70 text-[var(--color-text-secondary)] hover:border-[var(--case-study-accent)]/20 hover:text-[var(--color-text-primary)]",
            )}
          >
            {practitioner.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

function PractitionerIllustration({ practitioner }: { practitioner: OmronPractitioner }) {
  return (
    <div className="flex h-full w-full items-end justify-center">
      <Image
        src={practitioner.illustrationSrc}
        alt={practitioner.illustrationAlt}
        width={UNIFORM_ILLUSTRATION_WIDTH}
        height={UNIFORM_ILLUSTRATION_HEIGHT}
        className="max-h-full w-auto max-w-full object-contain object-bottom"
        sizes="(max-width: 768px) 72px, 80px"
      />
    </div>
  );
}

function PractitionerIllustrationStack({ activeId }: { activeId: string }) {
  return (
    <div
      className={cn(
        "grid [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:h-full",
        PRACTITIONER_ILLUSTRATION_FRAME,
      )}
    >
      {omronPractitioners.map((practitioner) => (
        <div
          key={practitioner.id}
          className={cn(
            "w-full motion-safe:transition-opacity motion-safe:duration-[650ms] motion-safe:ease-in-out",
            practitioner.id === activeId ? "z-10 opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={practitioner.id !== activeId}
        >
          <PractitionerIllustration practitioner={practitioner} />
        </div>
      ))}
    </div>
  );
}

function PractitionerHeader({
  displayPractitioner,
  contentVisible,
  illustrationId,
}: {
  displayPractitioner: OmronPractitioner;
  contentVisible: boolean;
  illustrationId: string;
}) {
  return (
    <header className="mb-3 flex flex-col gap-2.5 border-b border-[var(--color-border)] pb-3 sm:flex-row sm:items-end sm:justify-between">
      <div className={cn("min-w-0 flex-1", caseStudyContentFadeClass(contentVisible))}>
        <p className="mb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--case-study-accent)]">
          OMRON user group
        </p>
        <h3 className="text-h4 font-semibold text-[var(--color-text-primary)]">
          {displayPractitioner.name}
        </h3>
        <p className="mt-0.5 text-[0.8125rem] text-[var(--color-text-muted)]">
          {displayPractitioner.tagline}
        </p>
      </div>
      <PractitionerIllustrationStack activeId={illustrationId} />
    </header>
  );
}

function PractitionerProfile({
  displayPractitioner,
  contentVisible,
}: {
  displayPractitioner: OmronPractitioner;
  contentVisible: boolean;
}) {
  const textFade = caseStudyContentFadeClass(contentVisible);

  return (
    <div className="grid items-stretch gap-2 sm:gap-2.5 lg:grid-cols-12">
      <PractitionerSection title="Role" fill className={cn("lg:col-span-8", textFade)}>
        <p className="text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
          {displayPractitioner.role}
        </p>
      </PractitionerSection>

      <PractitionerSection title="Key tasks" fill className={cn("lg:col-span-4", textFade)}>
        <ul className="list-disc space-y-1 pl-4 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
          {displayPractitioner.keyTasks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PractitionerSection>

      <PractitionerSection title="Interaction with others" fill className={cn(PROFILE_DUO_CARD_CLASS, textFade)}>
        <ul className="space-y-2 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
          {displayPractitioner.interactions.map(({ label, description }) => (
            <li key={label}>
              <span className="font-medium text-[var(--color-text-primary)]">{label}:</span>{" "}
              {description}
            </li>
          ))}
        </ul>
      </PractitionerSection>

      <PractitionerSection title="Usage of OMRON VISO" fill className={cn(PROFILE_DUO_CARD_CLASS, textFade)}>
        <ul className="list-disc space-y-1 pl-4 text-[0.8125rem] leading-snug text-[var(--color-text-secondary)]">
          {displayPractitioner.visoUsage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PractitionerSection>
    </div>
  );
}

export function OmronPractitionerBoardsInteractive({
  className,
}: OmronPractitionerBoardsInteractiveProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(omronPractitioners[0]?.id ?? "general-practitioner");
  const { displayItem, contentVisible } = useCaseStudyTransition(activeId, omronPractitioners);

  return (
    <div className={cn("not-prose", className)}>
      <div
        id={`${baseId}-explorer`}
        className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-neutral-50"
      >
        <div className="flex flex-col md:flex-row">
          <aside className="hidden shrink-0 border-b border-[var(--color-border)] bg-neutral-50 md:flex md:w-56 md:flex-col md:border-b-0 md:border-r">
            <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="User groups">
              {omronPractitioners.map((practitioner) => (
                <PractitionerNavItem
                  key={practitioner.id}
                  practitioner={practitioner}
                  active={practitioner.id === activeId}
                  onSelect={() => setActiveId(practitioner.id)}
                />
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="border-b border-[var(--color-border)] bg-neutral-50 px-4 py-2.5 md:hidden">
              <PractitionerSwitcher activeId={activeId} onSelect={setActiveId} />
            </div>

            <div id={`${baseId}-panel`} className="bg-white p-4 md:p-5">
              <PractitionerHeader
                displayPractitioner={displayItem}
                contentVisible={contentVisible}
                illustrationId={activeId}
              />
              <PractitionerProfile
                displayPractitioner={displayItem}
                contentVisible={contentVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
