"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type AdminShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Full-bleed content without max-width constraint (e.g. embedded prototypes). */
  fullWidth?: boolean;
  /** Hide page title bar (e.g. embedded prototypes with their own chrome). */
  hideHeader?: boolean;
};

function AdminShellLoading() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <p className="text-body-sm text-[var(--color-text-muted)]">Loading admin…</p>
    </div>
  );
}

const AdminShellBody = dynamic(
  () => import("./AdminShellBody").then((mod) => mod.AdminShellBody),
  {
    ssr: false,
    loading: AdminShellLoading,
  },
);

export function AdminShell(props: AdminShellProps) {
  return <AdminShellBody {...props} />;
}
