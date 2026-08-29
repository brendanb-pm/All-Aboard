"use client";

import type { AskResult } from "@/lib/graph/types";
import { Sheet } from "@/components/ui/sheet";
import { SourceList } from "./SourceList";

export function ProvenanceDrawer({
  open,
  onOpenChange,
  result,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  result: AskResult | null;
}) {
  if (!result) return null;
  const stale = result.sources.filter((s) => s.stale).length;
  const auth = result.sources.filter((s) => s.trustType === "authoritative").length;
  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Why you can trust this">
      <div className="space-y-5 text-sm text-ink">
        <p className="leading-relaxed text-muted">
          All-Aboard filters permissions before retrieval. Answers show provenance, confidence, and
          conflicts. The product will not rank, monitor, or score employees.
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Sources" value={String(result.sources.length)} />
          <Stat label="Authoritative" value={String(auth)} />
          <Stat label="Stale flagged" value={String(stale)} />
        </div>
        <section>
          <h3 className="mb-2 font-display text-sm font-semibold text-navy">Sources used</h3>
          <SourceList sources={result.sources} />
        </section>
        {result.conflict ? (
          <section className="rounded-lg bg-amber-soft px-3 py-2.5 text-amber">
            <p className="font-semibold">Conflict</p>
            <p className="mt-1 text-sm">{result.conflict.summary}</p>
            <p className="mt-1 text-sm font-semibold">{result.conflict.authoritative}</p>
          </section>
        ) : null}
        {result.hiddenByTrust.length ? (
          <section>
            <h3 className="mb-2 font-display text-sm font-semibold text-navy">Held back by opt-in</h3>
            <ul className="list-disc space-y-1 pl-4 text-muted">
              {result.hiddenByTrust.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <h3 className="mb-2 font-display text-sm font-semibold text-navy">Never used</h3>
          <ul className="space-y-1 text-muted">
            <li>Raw message counts or mailbox telemetry</li>
            <li>Hidden engagement or networking rankings</li>
            <li>Individual collaboration scores</li>
            <li>Content the viewer is not permissioned to see</li>
          </ul>
        </section>
        <p className="text-xs text-muted">
          {result.live
            ? "This answer was generated live over the synthetic graph."
            : "This answer is an authored demo scenario grounded in the synthetic graph."}
        </p>
      </div>
    </Sheet>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-paper px-3 py-2">
      <p className="font-display text-lg font-semibold text-navy">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
