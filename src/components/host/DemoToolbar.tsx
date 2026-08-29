"use client";

import { Compass } from "lucide-react";
import { COMPANY, personas } from "@/lib/graph/data";
import { useAppStore, type HostId } from "@/lib/store";
import { cn } from "@/lib/utils";

const HOSTS: { id: HostId; label: string }[] = [
  { id: "teams", label: "Teams" },
  { id: "workday", label: "Workday" },
  { id: "sap", label: "SAP" },
];

export function DemoToolbar() {
  const host = useAppStore((s) => s.host);
  const setHost = useAppStore((s) => s.setHost);
  const personaId = useAppStore((s) => s.personaId);
  const setPersonaId = useAppStore((s) => s.setPersonaId);

  return (
    <div className="flex flex-col gap-2 border-b border-line bg-card px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Compass className="size-4 shrink-0 text-navy" />
        <p className="truncate text-xs text-muted">
          <span className="font-semibold text-navy">All-Aboard module</span>
          <span className="mx-1.5 text-line">·</span>
          {COMPANY.disclaimer}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-md bg-paper p-0.5">
          {HOSTS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setHost(h.id)}
              className={cn(
                "h-8 rounded-[6px] px-2.5 text-xs font-semibold",
                host === h.id ? "bg-card text-navy shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              {h.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          <span className="hidden sm:inline">View as</span>
          <select
            value={personaId}
            onChange={(e) => setPersonaId(e.target.value)}
            className="h-8 rounded-md border border-line bg-card px-2 text-xs font-semibold text-ink"
          >
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.personaLabel}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
