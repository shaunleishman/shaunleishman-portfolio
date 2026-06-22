"use client";

import { useState } from "react";
import Image from "next/image";
import {
  aboutBackgroundViewOrder,
  aboutBackgroundViews,
  aboutProfilePhotos,
  eyesOfHome,
  type AboutBackgroundView,
} from "@/content/about";
import { siteConfig } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const tabButtonClass =
  "relative z-10 inline-flex min-h-[40px] w-full items-center justify-center rounded-full px-6 py-2 text-body-sm font-medium motion-safe:transition-[color] motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";

export function AboutBackgroundSection() {
  const [activeView, setActiveView] = useState<AboutBackgroundView>("professional");
  const panel = aboutBackgroundViews[activeView];
  const activeTabIndex = aboutBackgroundViewOrder.indexOf(activeView);
  const tabCount = aboutBackgroundViewOrder.length;

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <Reveal delay={80}>
          <div className="mb-10 flex justify-center md:mb-12">
            <div
              role="tablist"
              aria-label="About me views"
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
              {aboutBackgroundViewOrder.map((viewId) => {
                const selected = activeView === viewId;
                const tab = aboutBackgroundViews[viewId];

                return (
                  <button
                    key={viewId}
                    type="button"
                    role="tab"
                    id={`about-tab-${viewId}`}
                    aria-selected={selected}
                    aria-controls={`about-panel-${viewId}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveView(viewId)}
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
            <div
              className="relative aspect-square max-w-[280px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100"
              role="img"
              aria-label={aboutProfilePhotos[activeView].alt}
            >
              {aboutBackgroundViewOrder.map((viewId) => {
                const photo = aboutProfilePhotos[viewId];
                const visible = activeView === viewId;

                return (
                  <Image
                    key={viewId}
                    src={photo.src}
                    alt={photo.alt}
                    width={1024}
                    height={1024}
                    priority={viewId === "professional"}
                    sizes="280px"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out",
                      visible ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    aria-hidden={!visible}
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
                      I&apos;m based in Edinburgh, and music fills most of my spare time. I write songs,
                      produce, and sing lead in the band{" "}
                      <a
                        href={eyesOfHome.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
                      >
                        {eyesOfHome.name}
                      </a>
                      .
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
                <Button href={siteConfig.cvUrl} variant="secondary">
                  View CV
                </Button>
                <Button href={siteConfig.linkedIn} variant="secondary" external>
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
