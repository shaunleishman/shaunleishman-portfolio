"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMetricsAuth } from "@/hooks/useMetricsAuth";
import { cn } from "@/lib/utils";

type AdminShellBodyProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  hideHeader?: boolean;
};

export function AdminShellBody({
  title,
  description,
  children,
  fullWidth = false,
  hideHeader = false,
}: AdminShellBodyProps) {
  const auth = useMetricsAuth();

  if (auth.authenticated === null || (auth.loading && auth.authenticated !== false)) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading admin…</p>
      </div>
    );
  }

  if (!auth.authenticated) {
    return (
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="section-padding container-site mx-auto max-w-md py-8">
          <div className="mb-8">
            <p className="text-label text-[var(--color-text-muted)] mb-2">Private admin</p>
            <h1 className="text-h2 font-semibold mb-2">Sign in</h1>
            <p className="text-body text-[var(--color-text-secondary)]">
              Enter your admin password to access the dashboard, site metrics, and prototypes.
            </p>
          </div>

          <form
            onSubmit={auth.login}
            className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-6"
          >
            {auth.configured === false && (
              <p
                role="alert"
                className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-body-sm text-amber-900"
              >
                Admin login is not configured on this deployment. Add{" "}
                <strong>METRICS_PASSWORD</strong> in Vercel, then redeploy.
              </p>
            )}
            <label htmlFor="admin-password" className="block text-body-sm font-medium">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={auth.password}
              onChange={(e) => auth.setPassword(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              autoComplete="current-password"
            />
            {auth.error && (
              <p role="alert" className="text-body-sm text-red-600">
                {auth.error}
              </p>
            )}
            <button
              type="submit"
              disabled={auth.loading || !auth.password}
              className="min-h-[44px] rounded-full bg-[var(--color-accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <AdminSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {!hideHeader && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] bg-white px-6 py-4">
            <div className="min-w-0">
              <h1 className="text-h4 font-semibold">{title}</h1>
              {description && (
                <p className="mt-0.5 text-body-sm text-[var(--color-text-muted)]">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void auth.logout()}
              className="min-h-[44px] rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium hover:border-[var(--color-accent)]/40"
            >
              Sign out
            </button>
          </div>
        )}

        <div
          className={cn(
            "min-h-0 flex-1",
            fullWidth ? "flex min-h-0 flex-col overflow-hidden" : "overflow-y-auto overscroll-contain p-6",
          )}
        >
          <div
            className={
              fullWidth ? "flex min-h-0 flex-1 flex-col overflow-hidden" : "container-site max-w-6xl"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
