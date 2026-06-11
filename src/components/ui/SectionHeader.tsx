"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared horizontal gap between section icon and text. */
export const SECTION_HEADER_ICON_GAP = "gap-x-4 sm:gap-x-5";

/** Shared gap for inline icon + text rows (flex). */
export const SECTION_HEADER_INLINE_GAP = "gap-4 sm:gap-5";

/** Shared vertical gap between section title and lead. */
export const SECTION_HEADER_LEAD_GAP = "gap-y-1";

/** Fixed icon box — matches one heading line + one lead line so every section aligns. */
export const SECTION_HEADER_ICON_BOX = "size-16";
export const SECTION_HEADER_TEXT_MIN_H = "min-h-16";
export const SECTION_HEADER_ICON_INNER = "size-7";

type SectionHeaderProps = {
  id?: string;
  title: string;
  lead?: string;
  icon?: LucideIcon;
  accentColor?: string;
  /** Primary = main section (h2 / text-h3). Secondary = subsection (h3 / text-h4). */
  variant?: "primary" | "secondary";
  className?: string;
  titleClassName?: string;
  as?: "header" | "div";
};

export function SectionHeader({
  id,
  title,
  lead,
  icon: Icon,
  accentColor = "var(--color-accent)",
  variant = "primary",
  className,
  titleClassName,
  as: Wrapper = "header",
}: SectionHeaderProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const TitleTag = variant === "primary" ? "h2" : "h3";
  const hasIcon = Boolean(Icon);

  const titleEl = (
    <TitleTag
      id={headingId}
      className={cn(
        variant === "primary" ? "text-h3" : "text-h4",
        "font-semibold text-[var(--color-text-primary)]",
        titleClassName,
      )}
    >
      {title}
    </TitleTag>
  );

  const leadEl = lead ? (
    <p
      className="min-w-0 text-body-sm leading-snug text-[var(--color-text-secondary)] line-clamp-1"
      title={lead}
    >
      {lead}
    </p>
  ) : null;

  return (
    <Wrapper className={cn("not-prose", className)}>
      {hasIcon ? (
        <div className="flex items-stretch gap-x-4 sm:gap-x-5">
          <span
            className="inline-flex size-16 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: accentColor }}
            aria-hidden
          >
            {Icon ? (
              <Icon className="size-7" strokeWidth={1.75} aria-hidden />
            ) : null}
          </span>
          <div className="flex min-h-16 min-w-0 flex-1 flex-col justify-center gap-y-1">
            {titleEl}
            {leadEl}
          </div>
        </div>
      ) : (
        <div className={cn("flex flex-col", lead && "gap-y-1")}>
          {titleEl}
          {leadEl}
        </div>
      )}
    </Wrapper>
  );
}
