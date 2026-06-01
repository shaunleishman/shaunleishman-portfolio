import type { ReactNode } from "react";
import { KanoCategoryOverview } from "./kano/KanoCategoryOverview";
import { KanoCurveExplorer } from "./kano/KanoCurveExplorer";
import { KanoExpectationShift } from "./kano/KanoExpectationShift";

const VIZ_MARKERS: Record<string, ReactNode> = {
  "kano-overview": <KanoCategoryOverview />,
  "kano-curve": <KanoCurveExplorer />,
  "kano-shift": <KanoExpectationShift />,
};

function renderMarkdownBlock(block: string, key: number) {
  if (block.startsWith("## ")) {
    return (
      <h2 key={key} className="text-h3 font-semibold mt-10 mb-4">
        {block.replace("## ", "")}
      </h2>
    );
  }
  if (block.startsWith("- ")) {
    const items = block.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={key} className="list-disc pl-5 space-y-2 my-4">
        {items.map((item, j) => (
          <li key={j}>{item.replace("- ", "")}</li>
        ))}
      </ul>
    );
  }
  const withLinks = block.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[var(--color-accent)] hover:underline">$1</a>',
  );
  return (
    <p
      key={key}
      className="text-body-lg text-[var(--color-text-secondary)] my-4"
      dangerouslySetInnerHTML={{ __html: withLinks }}
    />
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
      if (viz) nodes.push(<div key={`viz-${key++}`}>{viz}</div>);
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
