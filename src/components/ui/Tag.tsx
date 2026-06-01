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

export function Tag({ children, className }: TagProps) {
  const colorClass = tagColors[children as string] ?? "bg-neutral-100 text-neutral-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-body-sm font-medium",
        colorClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
