"use client";

import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";
import { askOrganization } from "@/lib/ask/ask";
import { matchAuthored, materializeAuthored, suggestedQuestions } from "@/lib/graph/scenarios";
import type { AskResult, TrustSettings } from "@/lib/graph/types";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProvenanceDrawer } from "./ProvenanceDrawer";
import { SourceList } from "./SourceList";
import { SystemFlow } from "./SystemFlow";
import { PersonMark } from "./PersonMark";

function defaultAsk(personaId: string, trust: TrustSettings) {
  const q = suggestedQuestions(personaId)[0] ?? "";
  const authored = matchAuthored(q);
  return {
    question: q,
    result: authored ? materializeAuthored(q, authored, trust, personaId) : null,
  };
}

export function AskView() {
  const personaId = useAppStore((s) => s.personaId);
  const trust = useAppStore((s) => s.trust);
  const suggestions = suggestedQuestions(personaId);
  const seed = defaultAsk(personaId, trust);
  const [question, setQuestion] = useState(seed.question);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResult | null>(seed.result);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const next = defaultAsk(personaId, trust);
    setQuestion(next.question);
    setResult(next.result);
  }, [personaId, trust]);

  async function run(q: string) {
    const text = q.trim();
    if (!text) return;
    setQuestion(text);
    setLoading(true);
    try {
      const authored = matchAuthored(text);
      if (authored) {
        setResult(materializeAuthored(text, authored, trust, personaId));
      } else {
        const live = await askOrganization({ data: { question: text, personaId, trust } });
        setResult(live);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy">
          Ask the organization
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Get a cited answer across people, systems, and institutional history — then a recommended
          next step. Not a search box.
        </p>
      </header>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void run(question);
        }}
      >
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Why is this system this way?"
          aria-label="Ask the organization"
        />
        <Button type="submit" disabled={loading} className="sm:w-28">
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : "Ask"}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void run(s)}
            className="rounded-full bg-navy-soft px-3 py-1.5 text-left text-xs font-semibold text-navy hover:bg-navy hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted">
          Reading permissioned sources, then checking for conflicts…
        </p>
      ) : null}

      {result?.refusal ? (
        <div className="rounded-xl bg-amber-soft px-4 py-3 text-sm text-amber">{result.refusal}</div>
      ) : null}

      {result && !result.refusal ? (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>Short answer</Badge>
              {result.live ? (
                <Badge tone="muted">
                  <Sparkles className="mr-1 size-3" />
                  Live over graph
                </Badge>
              ) : (
                <Badge tone="teal">Authored demo</Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed text-ink">{result.shortAnswer}</p>
            <div className="mt-4 rounded-xl border-l-4 border-blue bg-navy-soft/60 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy">
                Recommended next step
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink">{result.nextStep}</p>
            </div>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal"
            >
              <ShieldCheck className="size-4" />
              Why you can trust this
              <ArrowRight className="size-3.5" />
            </button>
          </article>

          <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-base font-semibold text-navy">Confidence & provenance</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone={result.confidence === "high" ? "teal" : "amber"}>
                {result.confidence} confidence
              </Badge>
              <Badge>
                {result.sources.length} source{result.sources.length === 1 ? "" : "s"}
              </Badge>
              {result.sources.some((s) => s.stale) ? (
                <Badge tone="amber">Stale source flagged</Badge>
              ) : null}
            </div>
            {result.conflict ? (
              <p className="mt-3 rounded-lg bg-amber-soft px-3 py-2 text-sm text-amber">
                <span className="font-semibold">Conflict. </span>
                {result.conflict.summary} {result.conflict.authoritative}
              </p>
            ) : null}
            {result.hiddenByTrust.length ? (
              <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-muted">
                {result.hiddenByTrust[0]}
              </p>
            ) : null}
            <div className="mt-4">
              <SourceList sources={result.sources} />
            </div>
          </article>
        </div>
      ) : null}

      {result && !result.refusal && result.systems.length ? (
        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <h2 className="mb-3 font-display text-base font-semibold text-navy">System context</h2>
          <SystemFlow systems={result.systems} />
        </article>
      ) : null}

      {result && !result.refusal && result.people.length ? (
        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <h2 className="mb-3 font-display text-base font-semibold text-navy">People to involve</h2>
          <ul className="divide-y divide-line">
            {result.people.map(({ person, reason }) => (
              <li key={person.id} className="flex items-center gap-3 py-3">
                <PersonMark person={person} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{person.name}</p>
                  <p className="text-xs text-muted">
                    {person.title} · {reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      ) : null}

      <ProvenanceDrawer open={drawer} onOpenChange={setDrawer} result={result} />
    </div>
  );
}
