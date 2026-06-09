"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import ColumnHeaderStacked from "../../../imports/ColumnHeaderStacked";
import PageControls from "../../../imports/PageControls";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";
import {
  FullPageDataTable,
  PageWithTablePreview,
} from "./PageWithTablePreview";

type TableView = "full-page" | "page-controls" | "table" | "stacked-header";

function PageControlsPreview() {
  return (
    <div className="showcase-page-controls w-full">
      <PageControls showDropdownFilter={false} className="!w-full !max-w-full" />
    </div>
  );
}

function StackedHeaderPreview() {
  return (
    <div className="showcase-stacked-header w-full overflow-x-auto">
      <ColumnHeaderStacked className="!w-full !min-w-[640px] !max-w-full" />
    </div>
  );
}

export function InteractiveTableDemo() {
  const [view, setView] = useState<TableView>("table");
  const [showAll, setShowAll] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    previewRef.current?.scrollIntoView({ block: "nearest" });
  }, [view, showAll]);

  const liveCode = useMemo(() => {
    switch (view) {
      case "page-controls":
        return `import PageControls from './imports/PageControls';

<PageControls showDropdownFilter={false} />`;
      case "stacked-header":
        return `import ColumnHeaderStacked from './imports/ColumnHeaderStacked';

<ColumnHeaderStacked />`;
      case "table":
        return `import ColumnHeader from './imports/ColumnHeader';
import TableField from './imports/TableField';

<ColumnHeader columnHeader="Left" columnText="Column name" showCompLeft={false} />
<TableField field="Left" showCompRight={false}>Field</TableField>`;
      case "full-page":
      default:
        return `import SideMenuFullNew from './imports/SideMenuFullNew';
import Header from './imports/Header';
import { ConnectedPageTabs } from './ConnectedPageTabs';
import { ConnectedContentTabs } from './ConnectedContentTabs';
import PageControls from './imports/PageControls';

<SideMenuFullNew sideMenu="Open" subMenu />
<Header header="Insight" />
<ConnectedPageTabs value={pageTab} tabs={PAGE_TABS} onChange={setPageTab} />
<ConnectedContentTabs value={contentTab} tabs={CONTENT_TABS} onChange={setContentTab} />
<PageControls showDropdownFilter={false} />
{/* data table */}`;
    }
  }, [view]);

  useComponentSectionCode(liveCode, !showAll);

  const preview = (() => {
    switch (view) {
      case "page-controls":
        return <PageControlsPreview />;
      case "table":
        return <FullPageDataTable preview />;
      case "stacked-header":
        return <StackedHeaderPreview />;
      case "full-page":
      default:
        return <PageWithTablePreview />;
    }
  })();

  const label =
    view === "full-page"
      ? "Page with table"
      : view === "page-controls"
        ? "Table toolbar"
        : view === "stacked-header"
          ? "Stacked column headers"
          : "Data table";

  return (
    <div ref={previewRef}>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all parts"
        collapseLabel="Show focused view"
        filters={[
          {
            id: "view",
            label: "Show",
            value: view,
            onChange: (value) => setView(value as TableView),
            options: [
              { value: "full-page", label: "Full page" },
              { value: "page-controls", label: "Toolbar only" },
              { value: "table", label: "Table only" },
              { value: "stacked-header", label: "Stacked headers" },
            ],
          },
        ]}
      />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Full page with table
            </p>
            <PageWithTablePreview />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Table toolbar
            </p>
            <PageControlsPreview />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Stacked column headers
            </p>
            <StackedHeaderPreview />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Data table
            </p>
            <FullPageDataTable preview />
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame
            label={label}
            align={view === "full-page" || view === "table" || view === "stacked-header" ? "stretch" : "center"}
            className={view === "full-page" ? "!p-4" : undefined}
            contentClassName="showcase-table-preview"
          >
            {preview}
          </VariantPreviewFrame>
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            {view === "full-page"
              ? "Full Insight page layout — sidebar, sub-menu tabs, filters, toolbar, and wide data table."
              : "Click row checkboxes to select rows (teal highlight). Hover a row for the grey hover state. Header checkbox selects all."}
          </p>
        </>
      )}
    </div>
  );
}
