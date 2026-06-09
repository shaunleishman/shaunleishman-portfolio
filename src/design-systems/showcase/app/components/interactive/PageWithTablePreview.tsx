"use client";

import ButtonMedium from "../../../imports/ButtonMedium";
import CheckBox from "../../../imports/CheckBox";
import ColumnHeader from "../../../imports/ColumnHeader";
import Header from "../../../imports/Header";
import PageControls from "../../../imports/PageControls";
import SideMenuFullNew from "../../../imports/SideMenuFullNew";
import TableField from "../../../imports/TableField";
import { useLayoutEffect, useRef, useState } from "react";
import { ConnectedContentTabs } from "../ConnectedContentTabs";
import { ConnectedPageTabs } from "../ConnectedPageTabs";
import { CONTENT_TABS, PAGE_TABS } from "../tab-demo-data";

const DATA_COLUMNS = 7;
const TABLE_ROWS = 8;

function TableCell({ children }: { children: string }) {
  return (
    <span className="truncate font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] tracking-[-0.1px] text-[#4a5453]">
      {children}
    </span>
  );
}

function TableCheckbox({
  checked,
  hovered = false,
  indeterminate = false,
  label,
  onToggle,
}: {
  checked: boolean;
  hovered?: boolean;
  indeterminate?: boolean;
  label: string;
  onToggle: () => void;
}) {
  const state = checked ? "On" : indeterminate ? "Indeterminate" : hovered ? "Hover off" : "Off";

  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className="inline-flex cursor-pointer border-0 bg-transparent p-0"
    >
      <CheckBox checkBox={state} comp={false} />
    </button>
  );
}

function PageHeaderBlock() {
  return (
    <div className="border-b border-[var(--colour-outlines-neutral)] bg-white px-10 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e0f7fa] text-[#00a7b5]">
              <span className="text-lg leading-none">+</span>
            </div>
            <div>
              <h3 className="font-['Open_Sans:semi-bold',sans-serif] text-[24px] leading-[32px] tracking-[-0.2px] text-[#4a5453]">
                Page header
              </h3>
              <p className="font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] text-[#aab6b4]">
                Insert key information here
              </p>
            </div>
          </div>
          <p className="max-w-3xl font-['Open_Sans:regular',sans-serif] text-[14px] leading-[20px] text-[#4a5453]">
            This is a description of the page. It should be used to provide context and guidance for the user about
            what they can do on this page and what information they will find here.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ButtonMedium buttonMd="Secondary" buttonText="Button" iconLeftVis={false} iconRightVis={false} />
          <ButtonMedium buttonMd="Primary" buttonText="Button" iconLeftVis={false} iconRightVis={false} />
        </div>
      </div>
    </div>
  );
}

export function FullPageDataTable({ preview = false }: { preview?: boolean }) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(() => new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const allSelected = selectedRows.size === TABLE_ROWS;
  const someSelected = selectedRows.size > 0 && !allSelected;

  useLayoutEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    table.scrollLeft = 0;
    table.scrollTop = 0;
  }, []);

  const toggleRow = (rowIndex: number) => {
    setSelectedRows((current) => {
      const next = new Set(current);
      if (next.has(rowIndex)) {
        next.delete(rowIndex);
      } else {
        next.add(rowIndex);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedRows((current) =>
      current.size === TABLE_ROWS ? new Set() : new Set(Array.from({ length: TABLE_ROWS }, (_, index) => index)),
    );
  };

  const headerCellClass =
    "relative flex !h-10 !min-w-0 !w-full items-center justify-between bg-[#f5f6f6] px-3 py-2 !rounded-none";
  const bodyCellClass = "relative flex !h-10 !min-w-0 !w-full items-center px-3 py-2 gap-1 !rounded-none";

  return (
    <div
      ref={tableRef}
      className={[
        "showcase-page-table showcase-connected-table overflow-x-auto rounded-[8px] border border-[#aab6b4] bg-white",
        preview ? "showcase-page-table--preview" : "",
      ].join(" ")}
    >
      <div className={`showcase-page-table__grid ${preview ? "" : "min-w-[56rem]"}`}>
        <div className="showcase-page-table__header-row">
          <div className="showcase-page-table__checkbox-cell flex items-center justify-center bg-[#f5f6f6] px-3 py-2">
            <TableCheckbox
              checked={allSelected}
              indeterminate={someSelected}
              label={allSelected ? "Deselect all rows" : "Select all rows"}
              onToggle={toggleAll}
            />
          </div>
          {Array.from({ length: DATA_COLUMNS }, (_, index) => (
            <ColumnHeader
              key={`header-${index}`}
              className={headerCellClass}
              columnHeader="Centre"
              columnText="Column name"
              showCompLeft={false}
            />
          ))}
          <ColumnHeader
            className={headerCellClass}
            columnHeader="Centre"
            columnText="Status"
            showCompLeft={false}
            showCompRight={false}
          />
        </div>

        {Array.from({ length: TABLE_ROWS }, (_, rowIndex) => {
          const isSelected = selectedRows.has(rowIndex);
          const isHovered = hoveredRow === rowIndex;

          return (
            <div
              key={`row-${rowIndex}`}
              className={[
                "showcase-page-table__body-row",
                rowIndex % 2 === 1 ? "showcase-page-table__body-row--alt" : "",
                isSelected ? "showcase-page-table__body-row--selected" : "",
                isHovered && !isSelected ? "showcase-page-table__body-row--hover" : "",
              ].join(" ")}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="showcase-page-table__checkbox-cell flex items-center justify-center px-3 py-2">
                <TableCheckbox
                  checked={isSelected}
                  hovered={isHovered}
                  label={isSelected ? `Deselect row ${rowIndex + 1}` : `Select row ${rowIndex + 1}`}
                  onToggle={() => toggleRow(rowIndex)}
                />
              </div>
              {Array.from({ length: DATA_COLUMNS }, (_, colIndex) => (
                <TableField
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={bodyCellClass}
                  field="Centre"
                  showCompRight={false}
                >
                  <TableCell>Field</TableCell>
                </TableField>
              ))}
              <TableField className={bodyCellClass} field="Centre" showCompRight={false}>
                <TableCell>Field</TableCell>
              </TableField>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PageWithTablePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [pageTab, setPageTab] = useState(PAGE_TABS[0].value);
  const [contentTab, setContentTab] = useState(CONTENT_TABS[0].value);

  useLayoutEffect(() => {
    const scroll = scrollRef.current;
    const table = tableRef.current;
    if (!scroll || !table) return;

    scroll.scrollTop = Math.max(0, table.offsetTop - 16);
  }, []);

  return (
    <div className="showcase-page-with-table w-full">
      <div className="showcase-page-with-table__shell">
        <SideMenuFullNew
          className="showcase-page-with-table__sidebar h-full shrink-0"
          sideMenu="Open"
          subMenu
        />

        <div className="showcase-page-with-table__main">
          <Header header="Insight" className="!w-full shrink-0" />

          <div ref={scrollRef} className="showcase-page-with-table__scroll">
            <ConnectedPageTabs
              value={pageTab}
              tabs={PAGE_TABS}
              onChange={setPageTab}
              className="showcase-page-with-table__tabs shrink-0"
            />
            <PageHeaderBlock />

            <div className="border-b border-[var(--colour-outlines-neutral)] bg-white px-10 pb-2 pt-4">
              <ConnectedContentTabs
                value={contentTab}
                tabs={CONTENT_TABS}
                onChange={setContentTab}
                className="showcase-page-with-table__tabs"
              />
            </div>

            <div className="space-y-6 bg-[var(--colour-surfaces-bg)] px-10 py-6">
              <div className="showcase-page-controls w-full">
                <PageControls showDropdownFilter={false} className="!w-full !max-w-full" />
              </div>
              <div ref={tableRef}>
                <FullPageDataTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideMenuPagePreview() {
  return (
    <div className="showcase-page-with-table w-full">
      <div className="showcase-page-with-table__shell showcase-page-with-table__shell--menu-only">
        <SideMenuFullNew className="showcase-page-with-table__sidebar h-full shrink-0" sideMenu="Open" subMenu />
        <div className="showcase-page-with-table__main flex items-center justify-center bg-[var(--colour-surfaces-bg)]">
          <p className="font-['Open_Sans:regular',sans-serif] text-sm text-[var(--colour-labels-disabled)]">
            Main content area
          </p>
        </div>
      </div>
    </div>
  );
}
