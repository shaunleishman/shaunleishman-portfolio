"use client";

import { useEffect, useState } from "react";
import Modal, { ModalBody } from "@/design-systems/showcase/imports/Modal";
import { Dropdown, Input } from "@/design-systems/arbnco";

export type GenerateReportPayload = {
  reportType: string;
  from: string;
  to: string;
};

const REPORT_OPTIONS = [
  { value: "energy-summary", label: "Energy consumption summary" },
  { value: "operational-patterns", label: "Operational patterns" },
  { value: "carbon-emissions", label: "Carbon emissions" },
  { value: "disaggregation", label: "Disaggregation & wastage" },
  { value: "full-building", label: "Full building report" },
];

type GenerateReportModalProps = {
  open: boolean;
  onClose: () => void;
  onGenerate: (payload: GenerateReportPayload) => void;
};

export function GenerateReportModal({ open, onClose, onGenerate }: GenerateReportModalProps) {
  const [reportType, setReportType] = useState("energy-summary");
  const [from, setFrom] = useState("2023-01-01");
  const [to, setTo] = useState("2023-12-31");
  const [rangeError, setRangeError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  function handleGenerate() {
    if (from > to) {
      setRangeError("The start date must be before the end date.");
      return;
    }

    setRangeError(null);
    onGenerate({ reportType, from, to });
  }

  const selectedLabel = REPORT_OPTIONS.find((option) => option.value === reportType)?.label ?? "Report";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-[530px]"
        role="dialog"
        aria-modal="true"
        aria-label="Generate report"
      >
        <Modal
          title="Generate report"
          importLabel="Generate report"
          onClose={onClose}
          onCancel={onClose}
          onImport={handleGenerate}
        >
          <ModalBody>
            <Dropdown
              label="Report type"
              options={REPORT_OPTIONS}
              value={reportType}
              onChange={setReportType}
              className="!w-full"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="From"
                type="date"
                value={from}
                onChange={(event) => {
                  setFrom(event.target.value);
                  setRangeError(null);
                }}
              />
              <Input
                label="To"
                type="date"
                value={to}
                onChange={(event) => {
                  setTo(event.target.value);
                  setRangeError(null);
                }}
              />
            </div>

            <p className="text-xs text-[#666]">
              A {selectedLabel.toLowerCase()} will be prepared for the selected date range.
            </p>

            {rangeError && (
              <p className="text-xs text-[#d32f2f]" role="alert">
                {rangeError}
              </p>
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
