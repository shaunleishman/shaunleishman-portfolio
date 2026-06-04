"use client";

import { MetricsNav } from "@/components/metrics/MetricsNav";
import { useMetricsAuth } from "@/hooks/useMetricsAuth";

type MetricsShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function MetricsShell({ title, description, children }: MetricsShellProps) {
  const auth = useMetricsAuth();

  if (auth.authenticated === null || (auth.loading && auth.authenticated !== false)) {
    return (
      <div className="section-padding container-site max-w-md">
        <p className="text-body-sm text-[var(--color-text-muted)]">Loading metrics…</p>
      </div>
    );
  }

  return (
    <div className={`section-padding container-site ${auth.authenticated ? "max-w-6xl" : "max-w-md mx-auto"}`}>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-label text-[var(--color-text-muted)] mb-2">Private</p>
          <h1 className="text-h2 font-semibold mb-2">{title}</h1>
          <p className="text-body text-[var(--color-text-secondary)] max-w-2xl">{description}</p>
        </div>
        {auth.authenticated && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void auth.logout()}
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-body-sm font-medium min-h-[44px] hover:border-[var(--color-accent)]/40"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      {!auth.authenticated ? (
        <form
          onSubmit={auth.login}
          className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-6"
        >
          {auth.configured === false && (
            <p
              role="alert"
              className="rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-body-sm p-3"
            >
              Login is not configured on this deployment yet. Add <strong>METRICS_PASSWORD</strong> in Vercel,
              then redeploy.
            </p>
          )}
          <label htmlFor="metrics-password" className="block text-body-sm font-medium">
            Password
          </label>
          <input
            id="metrics-password"
            type="password"
            value={auth.password}
            onChange={(e) => auth.setPassword(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            autoComplete="current-password"
          />
          {auth.error && (
            <p role="alert" className="text-red-600 text-body-sm">
              {auth.error}
            </p>
          )}
          <button
            type="submit"
            disabled={auth.loading || !auth.password}
            className="rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-medium min-h-[44px] hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-60"
          >
            View metrics
          </button>
        </form>
      ) : (
        <>
          <MetricsNav />
          {children}
        </>
      )}
    </div>
  );
}
