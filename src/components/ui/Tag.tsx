import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

const tagColors: Record<string, string> = {
  "UI design": "bg-blue-100 text-blue-800",
  "Co-design": "bg-purple-100 text-purple-800",
  "Usability testing": "bg-green-100 text-green-800",
  Interviews: "bg-orange-100 text-orange-800",
  UX: "bg-neutral-100 text-neutral-800",
  Surveys: "bg-neutral-100 text-neutral-700",
  "Service Design": "bg-teal-100 text-teal-800",
  "Product Design": "bg-indigo-100 text-indigo-800",
};

const tagPillClass =
  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-body-sm font-medium leading-none min-h-8 whitespace-nowrap";

export function Tag({ children, className }: TagProps) {
  const colorClass = tagColors[children as string] ?? "bg-neutral-100 text-neutral-700";

  return <span className={cn(tagPillClass, colorClass, className)}>{children}</span>;
}

type TagListProps = {
  tags: readonly string[];
  className?: string;
  "aria-label"?: string;
};

export function TagList({ tags, className, "aria-label": ariaLabel = "Tags" }: TagListProps) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap items-center gap-2 p-0", className)} aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li key={tag} className="flex items-center">
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
