import type { Document } from "@/lib/graph/types";
import { Badge } from "@/components/ui/badge";

export function SourceList({ sources }: { sources: Document[] }) {
  if (!sources.length) return null;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {sources.map((s) => (
        <li key={s.id} className="rounded-lg bg-paper px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-navy">{s.title}</p>
            {s.stale ? <Badge tone="amber">Stale</Badge> : <Badge tone="teal">{label(s.trustType)}</Badge>}
          </div>
          <p className="mt-1 text-[11px] text-muted">
            {s.kind} · updated {s.updated} · {s.owner}
          </p>
        </li>
      ))}
    </ul>
  );
}

function label(t: Document["trustType"]) {
  if (t === "authoritative") return "Authoritative";
  if (t === "source-grounded") return "Source-grounded";
  if (t === "employee-opt-in") return "Opt-in";
  return "AI-inferred";
}
