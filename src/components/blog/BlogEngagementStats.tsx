import { Eye, Heart, Share2 } from "lucide-react";
import { formatEngagementCount, type BlogEngagementStats } from "@/lib/blog-engagement-shared";
import { cn } from "@/lib/utils";

type BlogEngagementStatsProps = {
  stats: BlogEngagementStats;
  className?: string;
  compact?: boolean;
  dark?: boolean;
};

export function BlogEngagementStatsDisplay({
  stats,
  className,
  compact = false,
  dark = false,
}: BlogEngagementStatsProps) {
  const items = [
    { id: "views", icon: Eye, label: stats.views === 1 ? "view" : "views", value: stats.views },
    { id: "likes", icon: Heart, label: stats.likes === 1 ? "like" : "likes", value: stats.likes },
    { id: "shares", icon: Share2, label: stats.shares === 1 ? "share" : "shares", value: stats.shares },
  ] as const;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm",
        dark ? "text-neutral-400" : "text-[var(--color-text-muted)]",
        compact && "gap-x-3",
        className,
      )}
      aria-label="Article engagement"
    >
      {items.map(({ id, icon: Icon, label, value }) => (
        <li key={id} className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
          <span className="tabular-nums">{formatEngagementCount(value)}</span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
