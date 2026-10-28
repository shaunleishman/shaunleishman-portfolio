"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Tab state for the About background section.
 * Copy arrives as props so this client module does not import the project catalog.
 */

export type AboutBackgroundViewId = "professional" | "personal";

export type AboutBackgroundSwitchProps = {
  viewOrder: readonly AboutBackgroundViewId[];
  views: Record<
    AboutBackgroundViewId,
    { label: string; heading: string; paragraphs: readonly string[] }
  >;
  photos: Record<AboutBackgroundViewId, { src: string; alt: string }>;
  personalLead: { before: string; after: string };
  band: { name: string; instagramUrl: string };
  cvUrl: string;
  linkedIn: string;
};

const tabButtonClass =
  "relative z-10 inline-flex min-h-[40px] w-full items-center justify-center rounded-full px-6 py-2 text-body-sm font-medium motion-safe:transition-[color] motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";

function nextTabIndex(current: number, count: number, key: string) {
  if (key === "ArrowRight") return (current + 1) % count;
  if (key === "ArrowLeft") return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}

export function AboutBackgroundSwitch({
  viewOrder,
  views,
  photos,
  personalLead,
  band,
  cvUrl,
  linkedIn,
}: AboutBackgroundSwitchProps) {
  const [activeView, setActiveView] = useState<AboutBackgroundViewId>("professional");
  const tabRefs = useRef(new Map<AboutBackgroundViewId, HTMLButtonElement>());
  const panel = views[activeView];
  const activeTabIndex = viewOrder.indexOf(activeView);
  const tabCount = viewOrder.length;

  function selectView(viewId: AboutBackgroundViewId, moveFocus: boolean) {
    setActiveView(viewId);
    if (moveFocus) tabRefs.current.get(viewId)?.focus();
  }

  function onTabListKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const nextIndex = nextTabIndex(activeTabIndex, tabCount, event.key);
    if (nextIndex === null) return;

    event.preventDefault();
    const nextView = viewOrder[nextIndex];
    if (nextView && nextView !== activeView) selectView(nextView, true);
  }

  return (
    <section
      data-analytics-section="about-background"
      className="section-padding bg-white"
    >
      <div className="container-site">
        <Reveal delay={80}>
          <div className="mb-10 flex justify-center md:mb-12">
            <div
              role="tablist"
              aria-label="About me views"
              aria-orientation="horizontal"
              onKeyDown={onTabListKeyDown}
              className="relative grid min-w-[17.5rem] grid-cols-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-1 sm:min-w-[19rem]"
            >
              <div
                aria-hidden="true"
                className="absolute bottom-1 top-1 rounded-full bg-white shadow-sm motion-safe:transition-[left] motion-safe:duration-300 motion-safe:ease-out"
                style={{
                  width: `calc((100% - 0.5rem) / ${tabCount})`,
                  left: `calc(0.25rem + ${activeTabIndex} * ((100% - 0.5rem) / ${tabCount}))`,
                }}
              />
              {viewOrder.map((viewId) => {
                const selected = activeView === viewId;
                const tab = views[viewId];

                return (
                  <button
                    key={viewId}
                    type="button"
                    role="tab"
                    id={`about-tab-${viewId}`}
                    ref={(node) => {
                      if (node) tabRefs.current.set(viewId, node);
                      else tabRefs.current.delete(viewId);
                    }}
                    aria-selected={selected}
                    aria-controls={`about-panel-${viewId}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectView(viewId, false)}
                    className={cn(
                      tabButtonClass,
                      selected
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal variant="scale" delay={100}>
            <div className="relative aspect-square max-w-[280px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100">
              {viewOrder.map((viewId) => {
                const photo = photos[viewId];
                const visible = activeView === viewId;

                return (
                  <Image
                    key={viewId}
                    src={photo.src}
                    alt={visible ? photo.alt : ""}
                    width={1024}
                    height={1024}
                    preload={viewId === "professional"}
                    sizes="280px"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out",
                      visible ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    aria-hidden={visible ? undefined : true}
                  />
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div
              key={activeView}
              role="tabpanel"
              id={`about-panel-${activeView}`}
              aria-labelledby={`about-tab-${activeView}`}
              className="motion-safe:animate-[about-panel-in_0.45s_ease-out_both]"
            >
              <SectionLabel>Background</SectionLabel>
              <h2 className="mb-6 mt-3 text-h2 font-semibold">{panel.heading}</h2>
              <div className="prose prose-neutral max-w-none space-y-4 text-body-lg text-[var(--color-text-secondary)]">
                {activeView === "personal" ? (
                  <>
                    <p>
                      {personalLead.before}
                      <a
                        href={band.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                      >
                        {band.name}
                      </a>
                      {personalLead.after}
                    </p>
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </>
                ) : (
                  panel.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                )}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Get in touch</Button>
                <Button href={cvUrl} variant="secondary">
                  View CV
                </Button>
                <Button href={linkedIn} variant="secondary" external>
                  LinkedIn
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
