import { ArrowRight } from "lucide-react";
import { personById } from "@/lib/graph/data";
import type { PathHop } from "@/lib/graph/types";
import { PersonMark } from "./PersonMark";

export function WarmPathMap({
  hops,
  viewerId,
  emptyHint,
}: {
  hops: PathHop[];
  viewerId: string;
  emptyHint?: string;
}) {
  if (!hops.length) {
    return (
      <p className="rounded-xl bg-paper px-4 py-6 text-sm text-muted">
        {emptyHint ??
          "No permissioned warm path. You can still request an introduction through the person’s manager."}
      </p>
    );
  }

  const nodes = [hops[0]!.fromId, ...hops.map((h) => h.toId)];
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {nodes.map((id, i) => {
          const person = personById[id];
          const hop = hops[i];
          return (
            <div key={`${id}-${i}`} className="flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
                {person ? <PersonMark person={person} size="sm" /> : null}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-navy">
                    {id === viewerId ? "You" : person?.name}
                  </p>
                  <p className="truncate text-[11px] text-muted">{person?.title}</p>
                </div>
              </div>
              {hop ? (
                <div className="flex items-center gap-2 px-1 text-[11px] font-semibold text-muted lg:max-w-[140px] lg:flex-col lg:text-center">
                  <ArrowRight className="size-3.5 shrink-0 rotate-90 lg:rotate-0" />
                  <span>{hop.label}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
