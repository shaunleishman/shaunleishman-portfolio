"use client";

export type ConnectedPageTab = {
  value: string;
  label: string;
  count?: number;
};

type ConnectedPageTabsProps = {
  value: string;
  tabs: ConnectedPageTab[];
  onChange: (value: string) => void;
  className?: string;
};

function PageTabCount({ active, count }: { active: boolean; count: number }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1.5 text-[10px] font-semibold leading-4 tracking-[-0.1px]"
      style={{
        backgroundColor: active ? "#e0f7fa" : "#e5e8e7",
        color: active ? "#106c7a" : "#4a5453",
        border: active ? undefined : "1px solid #aab6b4",
      }}
    >
      {count}
    </span>
  );
}

export function ConnectedPageTabs({ value, tabs, onChange, className }: ConnectedPageTabsProps) {
  return (
    <div
      className={`showcase-connected-page-tabs flex w-full max-w-full items-end rounded-lg bg-[#e5e8e7] p-1 ${className ?? ""}`}
      role="tablist"
      aria-label="Page tabs"
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={[
              "flex min-w-0 flex-1 flex-col items-stretch border-0 p-0 text-left",
              active ? "rounded bg-white" : "bg-transparent",
            ].join(" ")}
          >
            <span className="flex items-center justify-center gap-3 px-4 py-3">
              <span
                className="truncate whitespace-nowrap text-sm tracking-[-0.1px]"
                style={{
                  color: active ? "#00a7b5" : "#4a5453",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {tab.label}
              </span>
              {tab.count !== undefined && <PageTabCount active={active} count={tab.count} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
