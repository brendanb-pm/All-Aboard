import type { SystemNode } from "@/lib/graph/types";

export function SystemFlow({ systems }: { systems: SystemNode[] }) {
  if (!systems.length) return null;
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {systems.map((s) => (
        <article key={s.id} className="rounded-xl bg-card p-3.5 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-sm font-semibold text-navy">{s.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">{s.summary}</p>
        </article>
      ))}
    </div>
  );
}
