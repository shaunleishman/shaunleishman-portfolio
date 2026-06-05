"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { KanoCategoryOverview } from "./kano/KanoCategoryOverview";
import { KanoCurveExplorer } from "./kano/KanoCurveExplorer";
import { KanoExpectationShift } from "./kano/KanoExpectationShift";
import { RouteCheckCalculator } from "./route-check/RouteCheckCalculator";
import { Reveal } from "@/components/ui/Reveal";

const VIZ_MARKERS: Record<string, ReactNode> = {
  "kano-overview": <KanoCategoryOverview />,
  "kano-curve": <KanoCurveExplorer />,
  "kano-shift": <KanoExpectationShift />,
  "route-check": <RouteCheckCalculator />,
};

function renderMarkdownBlock(block: string, key: number) {
  const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    return (
      <Reveal key={key} variant="fade">
        <figure className="my-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)]">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </figure>
      </Reveal>
    );
  }

  if (block.startsWith("## ")) {
    return (
      <Reveal key={key} variant="up">
        <h2 className="text-h3 font-semibold mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      </Reveal>
    );
  }
  if (block.startsWith("- ")) {
    const items = block.split("\n").filter((l) => l.startsWith("- "));
    return (
      <Reveal key={key} variant="up">
        <ul className="list-disc pl-5 space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j}>{item.replace("- ", "")}</li>
          ))}
        </ul>
      </Reveal>
    );
  }
  const withLinks = block.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[var(--color-accent)] hover:underline">$1</a>',
  );
  return (
    <Reveal key={key} variant="fade">
      <p
        className="text-body-lg text-[var(--color-text-secondary)] my-4"
        dangerouslySetInnerHTML={{ __html: withLinks }}
      />
    </Reveal>
  );
}

/** Renders markdown with optional <!-- viz:id --> embed markers */
export function BlogContent({ content }: { content: string }) {
  const segments = content.split(/<!--\s*viz:([\w-]+)\s*-->/);
  const nodes: ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 1) {
      const vizId = segments[i];
      const viz = VIZ_MARKERS[vizId];
      if (viz) {
        nodes.push(
          <Reveal key={`viz-${key++}`} variant="scale" delay={40}>
            <div>{viz}</div>
          </Reveal>,
        );
      }
      continue;
    }

    const text = segments[i].trim();
    if (!text) continue;

    text.split("\n\n").forEach((block) => {
      const trimmed = block.trim();
      if (!trimmed) return;
      nodes.push(renderMarkdownBlock(trimmed, key++));
    });
  }

  return <>{nodes}</>;
}
