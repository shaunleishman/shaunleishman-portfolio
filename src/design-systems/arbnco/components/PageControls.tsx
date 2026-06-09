"use client";

import { Search } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";

export type PageControlsProps = {
  meterCount?: number;
  onSearch?: (value: string) => void;
  onSend?: () => void;
  onUpdate?: () => void;
  onClose?: () => void;
};

export function PageControls({
  meterCount = 4003,
  onSearch,
  onSend,
  onUpdate,
  onClose,
}: PageControlsProps) {
  return (
    <div className="flex w-full flex-col gap-[var(--measurement-spacing-lg)]">
      <div className="flex flex-wrap gap-[var(--measurement-spacing-xs)]">
        <Select
          className="min-w-[12rem]"
          label="Fund"
          required
          placeholder="Select a fund"
          options={[
            { value: "fund-a", label: "Fund A" },
            { value: "fund-b", label: "Fund B" },
          ]}
        />
        <Select
          className="min-w-[12rem]"
          label="Asset"
          required
          placeholder="Select an asset"
          options={[
            { value: "asset-1", label: "Asset 1" },
            { value: "asset-2", label: "Asset 2" },
          ]}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[var(--measurement-spacing-md)]">
        <div className="flex flex-wrap items-center gap-[var(--measurement-spacing-md)]">
          <p className="text-[var(--typography-font-size-md)] font-semibold tracking-[var(--typography-letter-spacing-md)] text-[var(--colour-labels-neutral)]">
            {meterCount.toLocaleString()} meters
          </p>
          <Input
            className="min-w-[16rem]"
            placeholder="Search with asset ID, meter ID or reference"
            leadingIcon={<Search className="size-4" />}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-[var(--measurement-spacing-xs)]">
          <Button variant="tertiary" size="md">
            Customise columns
          </Button>
          <Button variant="tertiary" size="md">
            Move to
          </Button>
          <Button variant="tertiary" size="md" disabled>
            Transfer to
          </Button>
          <Input type="date" className="min-w-[9rem]" aria-label="Date" />
          <Button variant="primary" size="md" onClick={onSend}>
            Send
          </Button>
          <Button variant="secondary" size="md" onClick={onUpdate}>
            Update
          </Button>
          <Button variant="tertiary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
