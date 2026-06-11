"use client";

import { useState } from "react";
import { PRIMITIVE_TOKEN_COUNT, SEMANTIC_TOKEN_COUNT } from "@/design-systems/arbnco/tokens-data";
import type { TokenEntry, TokenGroup } from "@/design-systems/arbnco/tokens-data";
import { PRIMITIVE_TOKEN_GROUPS, SEMANTIC_TOKEN_GROUPS } from "@/design-systems/arbnco/tokens-data";
import { ConnectedContentTabs } from "./ConnectedContentTabs";
import { ShowcasePageShell } from "./ShowcasePageShell";

type TokenLayer = "primitives" | "semantic";

function TokenSwatch({ token }: { token: TokenEntry }) {
  return (
    <div
      className="size-12 shrink-0 rounded-[var(--radius-medium-radius)] border border-[var(--colour-outlines-neutral)]"
      style={{ backgroundColor: `var(${token.name})` }}
    />
  );
}

function TokenRow({ token }: { token: TokenEntry }) {
  return (
    <div className="flex items-start gap-4 border-b border-[var(--grey-n100)] py-3 last:border-0">
      {token.swatch ? (
        <TokenSwatch token={token} />
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-medium-radius)] bg-[var(--colour-surfaces-bg)] text-[10px] font-semibold text-[var(--colour-labels-disabled)]">
          -
        </div>
      )}
      <div className="min-w-0 flex-1">
        <code className="text-sm font-semibold text-[var(--colour-labels-neutral)]">{token.name}</code>
        <p className="mt-0.5 font-mono text-xs text-[var(--colour-labels-disabled)]">{token.value}</p>
        {token.usage && (
          <p className="mt-1 text-xs text-[var(--colour-labels-neutral)]">{token.usage}</p>
        )}
      </div>
    </div>
  );
}

function TokenGroupSection({ group }: { group: TokenGroup }) {
  return (
    <section className="min-w-0 rounded-[var(--radius-large-radius)] border border-[var(--colour-outlines-neutral)] bg-[var(--colour-surfaces-neutral)] p-4 sm:p-5">
      <h3 className="text-base font-semibold text-[var(--colour-labels-neutral)]">{group.title}</h3>
      {group.description && (
        <p className="mt-1 text-sm text-[var(--colour-labels-disabled)]">{group.description}</p>
      )}
      <div className="mt-4">
        {group.tokens.map((token) => (
          <TokenRow key={token.name} token={token} />
        ))}
      </div>
    </section>
  );
}

export default function Tokens() {
  const [layer, setLayer] = useState<TokenLayer>("primitives");
  const groups = layer === "primitives" ? PRIMITIVE_TOKEN_GROUPS : SEMANTIC_TOKEN_GROUPS;

  return (
    <ShowcasePageShell maxWidth="6xl" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[var(--colour-labels-neutral)] sm:text-2xl">Design tokens</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--colour-labels-neutral)]">
          {PRIMITIVE_TOKEN_COUNT} primitives and {SEMANTIC_TOKEN_COUNT} semantic variables. Primitives are the raw
          scales; semantics map them to UI roles used by components.
        </p>
      </div>

      <ConnectedContentTabs
        value={layer}
        onChange={(next) => setLayer(next as TokenLayer)}
        tabs={[
          { value: "primitives", label: "Primitives", count: PRIMITIVE_TOKEN_COUNT },
          { value: "semantic", label: "Semantic", count: SEMANTIC_TOKEN_COUNT },
        ]}
      />

      <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2">
        {groups.map((group) => (
          <TokenGroupSection key={group.id} group={group} />
        ))}
      </div>
    </ShowcasePageShell>
  );
}
