"use client";

import { onboardingByPersona, personById } from "@/lib/graph/data";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { PersonMark } from "./PersonMark";

export function LearnView() {
  const personaId = useAppStore((s) => s.personaId);
  const plan = onboardingByPersona[personaId] ?? onboardingByPersona.mc;
  const persona = personById[personaId];

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy">{plan.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">{plan.subtitle}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            For {persona?.name} · {persona?.personaLabel}
          </p>
          <ol className="space-y-4">
            {plan.phases.map((p) => (
              <li key={p.when} className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="font-display text-sm font-semibold text-navy">{p.when}</span>
                <div>
                  <p className="text-sm text-ink">{p.what}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full origin-left rounded-full bg-blue"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-base font-semibold text-navy">Suggested people to meet</h2>
          <ul className="mt-3 space-y-3">
            {plan.peopleToMeet.map((m) => {
              const person = personById[m.personId];
              if (!person) return null;
              return (
                <li key={m.personId} className="flex items-start gap-3">
                  <PersonMark person={person} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{person.name}</p>
                    <p className="text-xs text-muted">{m.why}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 rounded-xl bg-amber-soft px-3 py-2.5 text-xs leading-relaxed text-amber">
            {plan.note}
          </p>
        </article>
      </div>

      <article className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-base font-semibold text-navy">Acronym glossary</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {plan.acronyms.map((a) => (
            <Badge key={a.term} tone="navy">
              {a.term}
            </Badge>
          ))}
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {plan.acronyms.map((a) => (
            <div key={a.term} className="rounded-xl bg-paper px-3 py-2.5">
              <dt className="text-sm font-semibold text-navy">{a.term}</dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-muted">{a.meaning}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}
