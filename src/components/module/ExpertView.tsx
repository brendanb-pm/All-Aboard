"use client";

import { useMemo, useState } from "react";
import { searchExperts, warmPath } from "@/lib/graph/retrieve";
import { personById } from "@/lib/graph/data";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PersonMark } from "./PersonMark";
import { WarmPathMap } from "./WarmPathMap";

const DEFAULT_Q = "Who understands connected-device telemetry and utility digital platforms?";

export function ExpertView() {
  const personaId = useAppStore((s) => s.personaId);
  const trust = useAppStore((s) => s.trust);
  const [query, setQuery] = useState(DEFAULT_Q);
  const [active, setActive] = useState(DEFAULT_Q);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { hits, hiddenByTrust } = useMemo(
    () => searchExperts(active, trust, personaId),
    [active, trust, personaId],
  );

  const selected = hits.find((h) => h.person.id === selectedId) ?? hits[0];
  const path = selected ? warmPath(personaId, selected.person.id, trust) : { hops: [], hiddenByTrust: [] };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy">
          Find relevant expertise
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Expertise from current work, documents, and opted-in prior history. Fit labels are
          qualitative — never a score.
        </p>
      </header>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setActive(query);
          setSelectedId(null);
        }}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Find expertise"
        />
        <Button type="submit" className="sm:w-28">
          Find
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {[
          DEFAULT_Q,
          "Who owns OMS integration?",
          "Who should review customer-visible outage copy?",
        ].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setQuery(q);
              setActive(q);
              setSelectedId(null);
            }}
            className="rounded-full bg-navy-soft px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white"
          >
            {q}
          </button>
        ))}
      </div>

      {hiddenByTrust.length ? (
        <p className="rounded-xl bg-paper px-4 py-3 text-sm text-muted">{hiddenByTrust[0]}</p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-2xl bg-card p-2 shadow-[var(--shadow-border)] sm:p-4">
          {hits.length === 0 ? (
            <p className="px-3 py-8 text-sm text-muted">No permissioned matches for that query.</p>
          ) : (
            <ul>
              {hits.map((hit) => (
                <li key={hit.person.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(hit.person.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left hover:bg-paper"
                  >
                    <PersonMark person={hit.person} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">{hit.person.name}</p>
                      <p className="text-xs text-muted">{hit.reason}</p>
                    </div>
                    <Badge tone={hit.fit === "Warm path" ? "amber" : "teal"}>{hit.fit}</Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-base font-semibold text-navy">
            Recommended introduction path
          </h2>
          <p className="mt-1 text-xs text-muted">
            Named people and why the edge exists. No dates, no message counts, no strength scores.
          </p>
          <div className="mt-4">
            {selected ? (
              <WarmPathMap
                hops={path.hops}
                viewerId={personaId}
                emptyHint={`No warm path from ${personById[personaId]?.name ?? "you"} to ${selected.person.name} under current opt-in settings.`}
              />
            ) : null}
          </div>
          {selected?.evidence.length ? (
            <ul className="mt-4 space-y-1 text-xs text-muted">
              {selected.evidence.map((e) => (
                <li key={e}>· {e}</li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </div>
  );
}
