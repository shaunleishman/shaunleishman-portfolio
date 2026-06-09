"use client";

import { useMemo, useState } from "react";
import Drawer, { DrawerBody } from "../../../imports/Drawer";
import { ConnectedInputField } from "../ConnectedInputField";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

const INITIAL = {
  locked: "Column content goes here",
  columnName: "",
  selectedPreview: "Column content goes here",
  inputted: "Column content goes here",
};

function ConnectedEditDrawer({
  onStatus,
}: {
  onStatus: (message: string) => void;
}) {
  const [fields, setFields] = useState(INITIAL);

  const resetFields = () => setFields(INITIAL);

  return (
    <Drawer
      title="Edit"
      onClose={() => onStatus("Drawer closed")}
      onCancel={() => {
        resetFields();
        onStatus("Changes cancelled — fields reset");
      }}
      onImport={() =>
        onStatus(
          fields.columnName.trim()
            ? `Imported "${fields.columnName.trim()}"`
            : "Import — add a column name in the Default field first",
        )
      }
    >
      <DrawerBody>
        <ConnectedInputField
          label="Disabled"
          value={fields.locked}
          onChange={() => {}}
          disabled
          required={false}
          showTooltip={false}
          placeholder="Column content goes here"
          className="w-full !max-w-none"
        />
        <ConnectedInputField
          label="Default"
          value={fields.columnName}
          onChange={(value) => setFields((current) => ({ ...current, columnName: value }))}
          placeholder="Column content goes here"
          required={false}
          showTooltip={false}
          className="w-full !max-w-none"
        />
        <ConnectedInputField
          label="Selected"
          value={fields.selectedPreview}
          onChange={(value) => setFields((current) => ({ ...current, selectedPreview: value }))}
          forcedState="Selected"
          required={false}
          showTooltip={false}
          className="w-full !max-w-none"
        />
        <ConnectedInputField
          label="Inputted"
          value={fields.inputted}
          onChange={(value) => setFields((current) => ({ ...current, inputted: value }))}
          required={false}
          showTooltip={false}
          className="w-full !max-w-none"
        />
      </DrawerBody>
    </Drawer>
  );
}

export function InteractiveDrawerDemo() {
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const liveCode = useMemo(
    () => `import Drawer, { DrawerBody } from './imports/Drawer';
import { ConnectedInputField } from './ConnectedInputField';

<Drawer
  title="Edit"
  onClose={() => setOpen(false)}
  onCancel={() => resetFields()}
  onImport={() => saveFields()}
>
  <DrawerBody>
    <ConnectedInputField label="Disabled" value={locked} onChange={() => {}} disabled />
    <ConnectedInputField label="Default" value={name} onChange={setName} />
    <ConnectedInputField label="Selected" value={selected} onChange={setSelected} forcedState="Selected" />
    <ConnectedInputField label="Inputted" value={inputted} onChange={setInputted} />
  </DrawerBody>
</Drawer>`,
    [],
  );

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar
        showAll={showAll}
        onShowAllChange={setShowAll}
        expandLabel="Expand all views"
        collapseLabel="Show focused view"
        filters={[]}
      />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Interactive edit drawer
            </p>
            <div className="showcase-drawer-preview mx-auto w-full max-w-[443px]">
              <ConnectedEditDrawer onStatus={setStatus} />
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[var(--colour-labels-disabled)]">
              Figma reference export
            </p>
            <div className="showcase-drawer-preview mx-auto w-full max-w-[443px]">
              <Drawer />
            </div>
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame label="Edit drawer">
            <div className="showcase-drawer-preview mx-auto w-full max-w-[443px]">
              <ConnectedEditDrawer onStatus={setStatus} />
            </div>
          </VariantPreviewFrame>
          {status && (
            <p className="mt-4 text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
          <p className="mt-4 text-xs text-[var(--colour-labels-disabled)]">
            Edit the nested fields, then try Cancel or Import. Close resets via the header button.
          </p>
        </>
      )}
    </div>
  );
}
