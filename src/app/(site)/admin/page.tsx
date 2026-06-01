"use client";

import { useState } from "react";
import type { AnalyticsSummary } from "@/lib/analytics";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");

  async function fetchAnalytics(pwd: string) {
    const res = await fetch("/api/analytics", {
      headers: { Authorization: `Bearer ${pwd}` },
    });
    if (!res.ok) {
      setError("Invalid password");
      setAuthenticated(false);
      return;
    }
    setData(await res.json());
    setAuthenticated(true);
    setError("");
    sessionStorage.setItem("admin_password", pwd);
  }

  return (
    <div className={`section-padding container-site ${authenticated ? "" : "max-w-md mx-auto"}`}>
      <h1 className="text-h2 font-semibold mb-2">Analytics dashboard</h1>
      <p className="text-body text-[var(--color-text-secondary)] mb-10">
        {authenticated
          ? "Visitor insights — what gets attention and where people leave."
          : "Enter your admin password to view visitor insights."}
      </p>

      {!authenticated ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAnalytics(password);
          }}
          className="space-y-4"
        >
          <label htmlFor="admin-password" className="block text-body-sm font-medium">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            autoComplete="current-password"
          />
          {error && (
            <p role="alert" className="text-red-600 text-body-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-medium min-h-[44px] hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            View analytics
          </button>
        </form>
      ) : data ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <StatCard label="Total pageviews" value={String(data.totalPageviews)} />
            <StatCard label="Unique sessions" value={String(data.uniqueSessions)} />
            <StatCard label="Top page views" value={String(data.topPages[0]?.views ?? 0)} />
            <StatCard
              label="Exit events"
              value={String(data.exitPages.reduce((a, b) => a + b.count, 0))}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <DataTable
              title="Most viewed pages"
              headers={["Page", "Views"]}
              rows={data.topPages.map((p) => [p.path, String(p.views)])}
            />
            <DataTable
              title="Most viewed sections"
              headers={["Section", "Views"]}
              rows={data.topSections.map((s) => [s.section, String(s.views)])}
            />
            <DataTable
              title="Scroll depth"
              headers={["Depth", "Count"]}
              rows={data.scrollDepth.map((s) => [s.depth, String(s.count)])}
            />
            <DataTable
              title="Exit pages (where people leave)"
              headers={["Page", "Exits"]}
              rows={data.exitPages.map((p) => [p.path, String(p.count)])}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] p-6">
      <p className="text-label text-[var(--color-text-muted)] mb-2">{label}</p>
      <p className="text-h3 font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function DataTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  const id = title.replace(/\s/g, "-").toLowerCase();
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-h4 font-semibold mb-4">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-body-sm text-[var(--color-text-muted)]">No data yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-muted)]">
                {headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-[var(--color-text-secondary)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
