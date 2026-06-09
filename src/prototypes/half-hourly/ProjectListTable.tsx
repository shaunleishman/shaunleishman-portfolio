"use client";

import { useMemo, useState } from "react";
import { Checkbox, Chip, Select } from "@/design-systems/arbnco";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-systems/arbnco";
import { useHalfHourlyNav } from "./useHalfHourlyNav";
import { BULK_SYNTHESISED_LABEL } from "./HalfHourlyBulkDemoPlayback";
import { cn } from "@/lib/utils";

function isSyntheticResolution(label: string) {
  return label === "Synthetic" || label === BULK_SYNTHESISED_LABEL;
}

type ProjectRow = {
  id: string;
  name: string;
  dataResolution: string;
};

const RESOLUTION_CHIP_STYLE: Record<string, string> = {
  High: "bg-[#9c27b0] text-white",
  Mixed: "bg-[#00838f] text-white",
  Low: "bg-[#0288d1] text-white",
};

function getResolutionChipClass(resolution: string) {
  return RESOLUTION_CHIP_STYLE[resolution] ?? "bg-[#666] text-white";
}

type ProjectListTableProps = {
  projects: ProjectRow[];
  selectedIds?: Set<string>;
  onSelectedIdsChange?: (ids: Set<string>) => void;
  disableRowNavigation?: boolean;
  compact?: boolean;
};

export function ProjectListTable({
  projects,
  selectedIds: controlledSelectedIds,
  onSelectedIdsChange,
  disableRowNavigation = false,
  compact = false,
}: ProjectListTableProps) {
  const { navigate } = useHalfHourlyNav();
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(() => new Set());
  const selectedIds = controlledSelectedIds ?? internalSelectedIds;

  const setSelectedIds = (updater: Set<string> | ((current: Set<string>) => Set<string>)) => {
    const next = typeof updater === "function" ? updater(selectedIds) : updater;
    if (onSelectedIdsChange) {
      onSelectedIdsChange(next);
    } else {
      setInternalSelectedIds(next);
    }
  };

  const allSelected = projects.length > 0 && selectedIds.size === projects.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const selectedCountLabel = useMemo(() => {
    if (selectedIds.size === 0) return `${projects.length} results shown`;
    return `${selectedIds.size} selected, ${projects.length} results shown`;
  }, [projects.length, selectedIds.size]);

  function toggleAll() {
    setSelectedIds((current) =>
      current.size === projects.length ? new Set() : new Set(projects.map((project) => project.id)),
    );
  }

  function toggleRow(projectId: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  }

  return (
    <>
      <TableContainer className="mx-0 overflow-x-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#e0e0e0] hover:bg-transparent">
              <TableHead className={cn("w-12", compact && "py-2")}>
                <Checkbox
                  id="project-list-select-all"
                  aria-label={allSelected ? "Deselect all projects" : "Select all projects"}
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                />
              </TableHead>
              <TableHead className={compact ? "py-2" : undefined}>Name</TableHead>
              <TableHead className={compact ? "py-2" : undefined}>Data resolution</TableHead>
              <TableHead className={cn("hidden lg:table-cell", compact && "py-2")}>Address</TableHead>
              <TableHead className={cn("hidden lg:table-cell", compact && "py-2")}>Area</TableHead>
              <TableHead className={cn("hidden lg:table-cell", compact && "py-2")}>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const isSelected = selectedIds.has(project.id);

              return (
                <TableRow
                  key={project.id}
                  data-selected={isSelected}
                  className={disableRowNavigation ? undefined : "cursor-pointer"}
                  onClick={
                    disableRowNavigation
                      ? undefined
                      : () => navigate(`/project/${project.id}`)
                  }
                >
                  <TableCell className={compact ? "py-2" : undefined} onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      id={`project-list-select-${project.id}`}
                      aria-label={isSelected ? `Deselect ${project.name}` : `Select ${project.name}`}
                      checked={isSelected}
                      onChange={() => toggleRow(project.id)}
                    />
                  </TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>{project.name}</TableCell>
                  <TableCell className={compact ? "py-2" : undefined}>
                    <Chip
                      tone={isSyntheticResolution(project.dataResolution) ? "success-solid" : "neutral"}
                      size="sm"
                      className={`whitespace-nowrap ${isSyntheticResolution(project.dataResolution) ? "" : getResolutionChipClass(project.dataResolution)}`}
                    >
                      {project.dataResolution}
                    </Chip>
                  </TableCell>
                  <TableCell className={cn("hidden text-[#666] lg:table-cell", compact && "py-2")}>123 Sample St</TableCell>
                  <TableCell className={cn("hidden text-[#666] lg:table-cell", compact && "py-2")}>5000 m²</TableCell>
                  <TableCell className={cn("hidden text-[#666] lg:table-cell", compact && "py-2")}>Office</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <p className="sr-only" aria-live="polite">
        {selectedCountLabel}
      </p>
    </>
  );
}

const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

export function ProjectListPagination({
  resultCount,
  compact = false,
  pageSizeDisabled = false,
  menuPlacement = "below",
}: {
  resultCount: number;
  compact?: boolean;
  pageSizeDisabled?: boolean;
  menuPlacement?: "above" | "below";
}) {
  return (
    <div
      className={cn(
        "flex w-full max-w-full items-center justify-between gap-2 border-t border-[#e0e0e0]",
        compact ? "mt-3 pt-3" : "mt-4 pt-4",
      )}
    >
      <p className="shrink-0 text-xs text-[#666]">
        <span className="font-semibold text-[#404040]">{resultCount}</span> results
      </p>

      <div className="flex min-w-0 shrink items-center gap-2 text-xs text-[#666]">
        <span className="whitespace-nowrap">Page 1 of 1</span>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="whitespace-nowrap">Per page</span>
          <Select
            placeholder={false}
            aria-label="Rows per page"
            menuPlacement={menuPlacement}
            size="sm"
            disabled={pageSizeDisabled}
            options={PAGE_SIZE_OPTIONS}
            defaultValue="10"
            className="w-[2.75rem] shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
