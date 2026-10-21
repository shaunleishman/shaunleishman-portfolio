import type { ReactNode } from "react";
import Image from "next/image";
import { renderInlineHtml } from "@/lib/blog-markdown";
import { Reveal } from "@/components/ui/Reveal";
import { BlogViz } from "./BlogViz";
import { isBlogVizId } from "./blog-viz-ids";

/**
 * Renders article markdown on the server.
 *
 * Blocks are split on blank lines. A line `<!-- viz:id -->` mounts one
 * interactive section (see `blog-viz-ids.ts`). Headings are `## `, lists are
 * lines that start with `- `, and images are `![alt](/path)`.
 */
export function BlogContent({ content }: { content: string }) {
  const segments = content.split(/<!--\s*viz:([\w-]+)\s*-->/);
  const nodes: ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 1) {
      const vizId = segments[i];
      if (isBlogVizId(vizId)) {
        nodes.push(
          <Reveal key={`viz-${key++}`} variant="scale" delay={40}>
            <div>
              <BlogViz id={vizId} />
            </div>
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
      const node = renderMarkdownBlock(trimmed, key++);
      if (node) nodes.push(node);
    });
  }

  return <>{nodes}</>;
}

function renderMarkdownBlock(block: string, key: number) {
  const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    if (!src.startsWith("/")) {
      return null;
    }
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
    const heading = block.replace(/^## /, "");
    return (
      <Reveal key={key} variant="up">
        <h2 className="text-h3 font-semibold text-[var(--color-text-primary)] mt-10 mb-4">
          {heading}
        </h2>
      </Reveal>
    );
  }

  if (block.startsWith("- ")) {
    const items = block.split("\n").filter((line) => line.startsWith("- "));
    return (
      <Reveal key={key} variant="up">
        <ul className="list-disc pl-5 space-y-2 my-4">
          {items.map((item, itemIndex) => {
            const text = item.replace(/^- /, "");
            const html = renderInlineHtml(text);
            return (
              <li key={itemIndex}>
                {html === text ? (
                  text
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: html }} />
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    );
  }

  return (
    <Reveal key={key} variant="fade">
      <p
        className="text-body-lg text-[var(--color-text-secondary)] my-4"
        dangerouslySetInnerHTML={{ __html: renderInlineHtml(block) }}
      />
    </Reveal>
  );
}
