"use client";

export type ConnectedContentTab = {
  value: string;
  label: string;
  /** Optional count badge (matches ContentTabulation counter chips). */
  count?: number;
};

type ConnectedContentTabsProps = {
  value: string;
  tabs: ConnectedContentTab[];
  onChange: (value: string) => void;
  className?: string;
  /** Stretch trailing space like the Figma ContentTabulation export. */
  fillRemaining?: boolean;
};

function TabCount({ active, count }: { active: boolean; count: number }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1.5 text-[10px] font-semibold leading-4 tracking-[-0.1px]"
      style={{
        backgroundColor: active ? "#e0f7fa" : "#e5e8e7",
        color: active ? "#106c7a" : "#4a5453",
      }}
    >
      {count}
    </span>
  );
}

export function ConnectedContentTabs({
  value,
  tabs,
  onChange,
  className,
  fillRemaining = true,
}: ConnectedContentTabsProps) {
  return (
    <div
      className={`flex w-full max-w-full items-end ${className ?? ""}`}
      role="tablist"
      aria-label="Content tabs"
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
            className="flex shrink-0 flex-col items-stretch border-0 bg-transparent p-0 text-left"
          >
            <span className="flex items-center justify-center gap-3 px-4 py-3">
              <span
                className="whitespace-nowrap text-sm tracking-[-0.1px]"
                style={{
                  color: active ? "#00a7b5" : "#4a5453",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {tab.label}
              </span>
              {tab.count !== undefined && <TabCount active={active} count={tab.count} />}
            </span>
            <span
              className="block w-full"
              style={{
                height: active ? 2 : 1,
                backgroundColor: active ? "#00a7b5" : "#aab6b4",
              }}
              aria-hidden
            />
          </button>
        );
      })}

      {fillRemaining && (
        <div className="flex min-w-0 flex-1 flex-col self-stretch" aria-hidden>
          <div className="flex-1" />
          <div className="h-px w-full bg-[#aab6b4]" />
        </div>
      )}
    </div>
  );
}
