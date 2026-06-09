"use client";

import { useState } from "react";
import { AccordionFilterSection } from "./AccordionFilterSection";

type ConnectedAccordionFilterProps = {
  defaultOpen?: boolean;
  className?: string;
};

export function ConnectedAccordionFilter({
  defaultOpen = true,
  className,
}: ConnectedAccordionFilterProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState<Set<number>>(() => new Set([0, 1]));

  const toggleOption = (index: number) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className={className}>
      <AccordionFilterSection
        selected={selected}
        open={open}
        onToggleOpen={() => setOpen((current) => !current)}
        onToggleOption={toggleOption}
        onClearCategory={() => setSelected(new Set())}
        showUserIcon
      />
    </div>
  );
}
