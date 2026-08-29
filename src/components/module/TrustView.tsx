"use client";

import { useAppStore } from "@/lib/store";
import { Switch } from "@/components/ui/switch";

const BLOCKED = [
  "No individual collaboration scores.",
  "No hidden engagement rankings.",
  "No raw message-count exposure.",
  "No management dashboard that rates employee networking.",
  "No retrieval of sensitive content before permission checks.",
];

export function TrustView() {
  const trust = useAppStore((s) => s.trust);
  const setTrust = useAppStore((s) => s.setTrust);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy">
          Employee data controls
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Use organizational data to increase employee agency, not to rank, monitor, or evaluate
          people. These toggles change Find Expert, warm paths, and Ask answers in this demo.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <ClassCard
          title="Employer-authoritative"
          body="Role, manager, team, permissions, application ownership. Always available to permissioned employees."
        />
        <ClassCard
          title="Employee-contributed"
          body="Resume, prior employers, references, external profile imports. Opt-in, labeled, minimum useful insight."
        />
        <ClassCard
          title="AI-inferred"
          body="Likely expertise, source confidence, possible relationship paths. Always labeled as inferred."
        />
      </div>

      <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-base font-semibold text-navy">Visibility for contributed data</h2>
        <ul className="mt-4 divide-y divide-line">
          <ToggleRow
            title="Prior-career history"
            body="Nautilus tenure, connected-device expertise, internal transfers’ previous teams."
            checked={trust.shareCareerHistory}
            onCheckedChange={(v) => setTrust({ shareCareerHistory: v })}
          />
          <ToggleRow
            title="References and referrals"
            body="Allows “Robert listed Brendan as a reference.” Never exposes the reference letter."
            checked={trust.shareReferences}
            onCheckedChange={(v) => setTrust({ shareReferences: v })}
          />
          <ToggleRow
            title="External profile imports"
            body="LinkedIn-style imports. Off by default in production; on here so you can see the control."
            checked={trust.shareExternalProfiles}
            onCheckedChange={(v) => setTrust({ shareExternalProfiles: v })}
          />
        </ul>
        <p className="mt-4 rounded-xl bg-navy-soft px-4 py-3 text-sm text-navy">
          Visibility rule: career history and references must be opt-in, label provenance, and expose
          the minimum useful relationship insight.
        </p>
      </article>

      <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-base font-semibold text-navy">Blocked product behaviors</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink">
          {BLOCKED.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-0.5 text-teal">—</span>
              {b}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function ClassCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
      <h2 className="font-display text-sm font-semibold text-navy">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}

function ToggleRow({
  title,
  body,
  checked,
  onCheckedChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
    </li>
  );
}
