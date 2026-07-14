import Image from "next/image";
import type { BlogCollaborator } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogCollaborationProps = {
  collaborator: BlogCollaborator;
  variant?: "dark" | "light";
  className?: string;
};

export function BlogCollaboration({
  collaborator,
  variant = "dark",
  className,
}: BlogCollaborationProps) {
  const isDark = variant === "dark";
  const content = (
    <>
      <Image
        src={collaborator.image}
        alt={collaborator.name}
        width={48}
        height={48}
        className="size-12 rounded-full object-cover"
      />
      <span className="min-w-0">
        <span
          className={cn(
            "block text-label",
            isDark ? "text-neutral-400" : "text-[var(--color-text-muted)]",
          )}
        >
          In collaboration with
        </span>
        <span
          className={cn(
            "block text-body-sm font-semibold",
            isDark ? "text-white" : "text-[var(--color-text-primary)]",
          )}
        >
          {collaborator.name}
        </span>
        <span
          className={cn(
            "block text-body-sm",
            isDark ? "text-neutral-300" : "text-[var(--color-text-secondary)]",
          )}
        >
          {collaborator.role}
        </span>
      </span>
    </>
  );

  const classNames = cn("inline-flex items-center gap-3", className);

  if (collaborator.linkedInUrl) {
    return (
      <a
        href={collaborator.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(classNames, "transition-opacity hover:opacity-90")}
      >
        {content}
      </a>
    );
  }

  return <div className={classNames}>{content}</div>;
}
