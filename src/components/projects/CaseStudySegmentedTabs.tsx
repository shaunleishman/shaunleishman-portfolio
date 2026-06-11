import { cn } from "@/lib/utils";

export type CaseStudySegmentedTab = {
  id: string;
  label: string;
};

const accentStyles = {
  nhs: {
    active:
      "bg-[#f5f8fa] font-semibold text-[#005eb8] shadow-[inset_0_2px_0_0_#005eb8]",
    inactive:
      "bg-[#eef4f9] text-[var(--color-text-secondary)] hover:bg-[#e4edf5] hover:text-[#005eb8]",
    divider: "border-[#005eb8]/10",
  },
  omron: {
    active:
      "bg-[#f5f8fa] font-semibold text-[#003153] shadow-[inset_0_2px_0_0_#003153]",
    inactive:
      "bg-[#eef2f9] text-[var(--color-text-secondary)] hover:bg-[#e4edf5] hover:text-[#003153]",
    divider: "border-[#003153]/10",
  },
} as const;

type CaseStudySegmentedTabsProps = {
  tabs: CaseStudySegmentedTab[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  idPrefix: string;
  panelId: string;
  accent?: keyof typeof accentStyles;
};

export function CaseStudySegmentedTabs({
  tabs,
  activeId,
  onSelect,
  ariaLabel,
  idPrefix,
  panelId,
  accent = "nhs",
}: CaseStudySegmentedTabsProps) {
  const styles = accentStyles[accent];

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex w-full">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${idPrefix}-${tab.id}`}
            aria-selected={isActive}
            aria-controls={panelId}
            onClick={() => onSelect(tab.id)}
            className={cn(
              "relative min-w-0 flex-1 whitespace-nowrap border-r px-1.5 py-3 text-center text-[11px] font-medium leading-tight min-h-[44px] motion-safe:transition-colors motion-safe:duration-300 last:border-r-0 sm:px-2 sm:text-body-sm",
              styles.divider,
              isActive ? styles.active : styles.inactive,
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
