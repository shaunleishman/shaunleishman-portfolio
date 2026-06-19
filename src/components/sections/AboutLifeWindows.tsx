"use client";

import { useState } from "react";
import Image from "next/image";
import { Gamepad2, Guitar, Mountain, Plane, Waves, type LucideIcon } from "lucide-react";
import { aboutLifeWindows, type AboutLifeWindow } from "@/content/about";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/utils";

const lifeWindowIcons: Record<AboutLifeWindow["icon"], LucideIcon> = {
  music: Guitar,
  diving: Waves,
  skiing: Mountain,
  travel: Plane,
  gaming: Gamepad2,
};

export function AboutLifeWindows() {
  return (
    <section
      aria-labelledby="about-life-heading"
      data-analytics-section="about-life"
      className="section-padding border-t border-[var(--color-border)] bg-[var(--color-bg-muted)]"
    >
      <div className="container-site">
        <SectionIntro
          label={<SectionLabel>Beyond the screen</SectionLabel>}
          title={
            <h2 id="about-life-heading" className="text-h2 font-semibold mb-4 max-w-2xl">
              Small windows into my world
            </h2>
          }
          description={
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl">
              Not a highlight reel. Just the things that keep me grounded when the work gets heavy.
            </p>
          }
        />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {aboutLifeWindows.map((window, index) => (
            <li key={window.id}>
              <Reveal delay={index * 60}>
                <LifeWindow {...window} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LifeWindow({
  label,
  alt,
  src,
  icon,
  accent,
}: AboutLifeWindow) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;
  const Icon = lifeWindowIcons[icon];

  return (
    <figure
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--color-border)]",
        "bg-white shadow-sm motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.02]",
      )}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
          className="object-cover object-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(145deg, color-mix(in srgb, ${accent} 18%, white), color-mix(in srgb, ${accent} 42%, #171717))`,
          }}
          aria-hidden
        >
          <Icon className="size-8 text-white/90" strokeWidth={1.5} />
        </div>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-3 pb-3 pt-10">
        <span className="text-body-sm font-semibold text-white">{label}</span>
      </figcaption>
    </figure>
  );
}
