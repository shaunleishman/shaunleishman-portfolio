import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudyTwoColumnProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
};

/** Side-by-side columns from md breakpoint upward. */
export function CaseStudyTwoColumn({
  children,
  className,
  reverse = false,
}: CaseStudyTwoColumnProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 md:gap-8 md:items-start",
        reverse && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

type CaseStudyPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

/** Bordered panel for scannable list blocks in a column. */
export function CaseStudyPanel({ title, children, className }: CaseStudyPanelProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-6 not-prose",
        className,
      )}
    >
      <h3 className="text-body font-semibold text-[var(--color-text-primary)] mb-3">{title}</h3>
      {children}
    </div>
  );
}

type CaseStudyPointGridItem = {
  title?: string;
  text: string;
  icon?: LucideIcon;
};

type CaseStudyPointGridProps = {
  items: readonly CaseStudyPointGridItem[] | readonly string[];
  columns?: 1 | 2 | 3;
  /** Evenly fill column height — use beside a matched-height visual. */
  stretch?: boolean;
  className?: string;
};

/** Short points as cards instead of long paragraphs or bullet walls. */
export function CaseStudyPointGrid({
  items,
  columns = 2,
  stretch = false,
  className,
}: CaseStudyPointGridProps) {
  const normalized: CaseStudyPointGridItem[] = items.map((item) =>
    typeof item === "string" ? { text: item } : item,
  );

  const columnClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? normalized.length === 3
          ? "sm:grid-cols-2 md:grid-cols-3 md:items-stretch"
          : "sm:grid-cols-2 sm:items-stretch"
        : "";

  return (
    <ul
      className={cn(
        "not-prose m-0 list-none p-0",
        stretch ? "flex h-full flex-col gap-4" : cn("grid gap-4", columnClass),
        className,
      )}
    >
      {normalized.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={item.title ?? item.text}
            className={cn(
              "flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-neutral-50 px-4 py-4 sm:gap-5",
              stretch && "min-h-0 flex-1",
            )}
          >
            {Icon && (
              <span
                className="inline-flex size-5 shrink-0 items-center justify-center text-[var(--case-study-accent)]"
                aria-hidden
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
            )}
            <div className="min-w-0">
              {item.title && (
                <p className="text-body-sm font-semibold text-[var(--color-text-primary)] mb-1">
                  {item.title}
                </p>
              )}
              <p className="text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type CaseStudyFlowStage = {
  stage: string;
  action: string;
  response: string;
};

type CaseStudyFlowTableProps = {
  stages: readonly CaseStudyFlowStage[];
  className?: string;
};

/** User-flow stages as a line-by-line table. */
export function CaseStudyFlowTable({ stages, className }: CaseStudyFlowTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-[var(--color-border)] not-prose",
        className,
      )}
    >
      <table className="w-full min-w-[640px] text-left text-body-sm">
        <thead className="bg-neutral-50 border-b border-[var(--color-border)]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Stage
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              User action
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Design response
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {stages.map((row) => (
            <tr key={row.stage} className="align-top">
              <td className="px-4 py-3 font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                {row.stage}
              </td>
              <td className="px-4 py-3">{row.action}</td>
              <td className="px-4 py-3">{row.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type CaseStudyFlowCardsProps = {
  stages: readonly CaseStudyFlowStage[];
  className?: string;
};

/** @deprecated Prefer CaseStudyFlowTable for user-flow sections. */
export function CaseStudyFlowCards({ stages, className }: CaseStudyFlowCardsProps) {
  return (
    <ol className={cn("grid gap-4 sm:grid-cols-2 not-prose list-none m-0 p-0", className)}>
      {stages.map((row, index) => (
        <li
          key={row.stage}
          className="flex flex-col rounded-xl border border-[var(--color-border)] bg-white overflow-hidden"
        >
          <div className="border-b border-[var(--color-border)] bg-neutral-50 px-4 py-3">
            <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">
              {row.stage}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-3 px-4 py-4">
            <div>
              <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
                User action
              </p>
              <p className="text-body-sm text-[var(--color-text-secondary)]">{row.action}</p>
            </div>
            <div className="mt-auto border-t border-[var(--color-border)] pt-3">
              <p className="text-label uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
                Design response
              </p>
              <p className="text-body-sm text-[var(--color-text-secondary)]">{row.response}</p>
            </div>
          </div>
          <span className="sr-only">Step {index + 1} of {stages.length}</span>
        </li>
      ))}
    </ol>
  );
}

type CaseStudyRoleSplitProps = {
  teamTogetherItems: readonly string[];
  roleItems: readonly string[];
  impact?: string;
};

/** My role: team vs personal contribution in two equal columns. */
export function CaseStudyRoleSplit({
  teamTogetherItems,
  roleItems,
  impact,
}: CaseStudyRoleSplitProps) {
  return (
    <div className="not-prose">
      <div className="grid gap-4 md:grid-cols-2 md:gap-5 md:items-stretch">
        <CaseStudyPanel title="What we did together">
          <ul className="list-disc pl-5 space-y-1.5 text-body-sm text-[var(--color-text-secondary)]">
            {teamTogetherItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudyPanel>
        <CaseStudyPanel title="What I owned">
          <ul className="list-disc pl-5 space-y-1.5 text-body-sm text-[var(--color-text-secondary)]">
            {roleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudyPanel>
      </div>
      {impact && (
        <p className="mt-4 text-body-sm text-[var(--color-text-muted)] max-w-2xl">{impact}</p>
      )}
    </div>
  );
}

type CaseStudyCompactListProps = {
  items: readonly string[];
  className?: string;
};

/** Tighter bullet list for side panels. */
export function CaseStudyCompactList({ items, className }: CaseStudyCompactListProps) {
  return (
    <ul className={cn("list-disc pl-5 space-y-2 text-body-sm text-[var(--color-text-secondary)]", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
