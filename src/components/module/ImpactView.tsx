"use client";

import { useMemo, useState } from "react";
import { documentById } from "@/lib/graph/data";
import { analyzeImpact } from "@/lib/graph/retrieve";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PersonMark } from "./PersonMark";
import { SourceList } from "./SourceList";
import { SystemFlow } from "./SystemFlow";

const DEFAULT_Q = "We want to replace the customer notification vendor API.";

export function ImpactView() {
  const [query, setQuery] = useState(DEFAULT_Q);
  const [active, setActive] = useState(DEFAULT_Q);
  const result = useMemo(() => analyzeImpact(active), [active]);
  const sources = result.sourceIds.map((id) => documentById[id]).filter(Boolean);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy">
          Impact analysis
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          See systems, teams, owners, and historical decisions before you act.
        </p>
      </header>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setActive(query);
        }}
      >
        <Input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Analyze impact" />
        <Button type="submit" className="sm:w-28">
          Analyze
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {[
          DEFAULT_Q,
          "We want to change the outage map legend and ETR copy.",
          "Add a new connected-device telemetry class.",
        ].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setQuery(q);
              setActive(q);
            }}
            className="rounded-full bg-navy-soft px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="text-[15px] leading-relaxed text-ink">{result.summary}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Count n={result.counts.systems} label="Systems" />
            <Count n={result.counts.teams} label="Teams" />
            <Count n={result.counts.contracts} label="Contracts" />
            <Count n={result.counts.privacy} label="Privacy" />
            <Count n={result.counts.decisions} label="Decisions" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Fact title="Systems" body={result.systems.map((s) => s.name).join(", ")} />
            <Fact title="Teams" body={result.teams.join(", ")} />
            <Fact title="Owners" body={result.owners.map((o) => o.name.split(" ")[0]).join(", ")} />
          </div>
        </article>
        <article className="space-y-3">
          <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-sm font-semibold text-navy">Required conversations</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {result.conversations.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-amber-soft p-5 text-amber">
            <h2 className="font-display text-sm font-semibold">Historical context</h2>
            <p className="mt-2 text-sm leading-relaxed">{result.historical}</p>
          </div>
        </article>
      </div>

      <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="mb-3 font-display text-base font-semibold text-navy">Affected systems</h2>
        <SystemFlow systems={result.systems} />
        <h2 className="mb-3 mt-6 font-display text-base font-semibold text-navy">Owners</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {result.owners.map((p) => (
            <li key={p.id} className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2">
              <PersonMark person={p} size="sm" />
              <div>
                <p className="text-sm font-semibold text-ink">{p.name}</p>
                <p className="text-[11px] text-muted">{p.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <Badge tone="navy">Sources</Badge>
          <div className="mt-3">
            <SourceList sources={sources} />
          </div>
        </div>
      </article>
    </div>
  );
}

function Count({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl bg-navy-soft px-3 py-2">
      <p className="font-display text-xl font-semibold tabular-nums text-navy">{n}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}
