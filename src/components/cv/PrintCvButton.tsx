"use client";

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full bg-white text-[#0a0a0a] text-body-sm font-medium hover:bg-neutral-100 transition-colors"
    >
      Save as PDF
    </button>
  );
}
