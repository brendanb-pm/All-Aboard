"use client";

import {
  Compass,
  GitBranch,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { personById } from "@/lib/graph/data";
import { useAppStore, type TabId } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AskView } from "./AskView";
import { ExpertView } from "./ExpertView";
import { ImpactView } from "./ImpactView";
import { LearnView } from "./LearnView";
import { PersonMark } from "./PersonMark";
import { TrustView } from "./TrustView";

const NAV: { id: TabId; label: string; icon: typeof Compass }[] = [
  { id: "ask", label: "Ask", icon: MessageSquare },
  { id: "expert", label: "Find Expert", icon: Users },
  { id: "impact", label: "Impact Map", icon: GitBranch },
  { id: "learn", label: "Onboarding", icon: GraduationCap },
  { id: "trust", label: "Trust Controls", icon: ShieldCheck },
];

export function ModuleShell() {
  const tab = useAppStore((s) => s.tab);
  const setTab = useAppStore((s) => s.setTab);
  const persona = personById[useAppStore((s) => s.personaId)];

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <aside className="relative hidden w-[232px] shrink-0 flex-col bg-navy px-3 py-5 text-white lg:flex">
        <div className="flex items-center gap-2 px-2">
          <Compass className="size-5" />
          <div>
            <p className="font-display text-lg font-semibold leading-none tracking-tight">
              All-Aboard
            </p>
            <p className="mt-1 text-[11px] text-white/70">Organizational navigation</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold",
                tab === item.id ? "bg-white text-navy" : "text-white/85 hover:bg-white/10",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <p className="mt-auto border-t border-white/20 px-2 pt-4 text-[11px] leading-relaxed text-white/75">
          <span className="font-semibold text-white">Employee Trust Principle</span>
          <br />
          Use organizational data to increase employee agency, not to rank, monitor, or evaluate
          employees.
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h2 className="font-display text-sm font-semibold text-navy sm:text-base">
              Northline Energy
            </h2>
            <p className="truncate text-xs text-muted">
              Synthetic utility · module hosted in your enterprise platform
            </p>
          </div>
          {persona ? (
            <div className="flex items-center gap-2">
              <PersonMark person={persona} size="sm" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight text-ink">{persona.name}</p>
                <p className="text-[11px] text-muted">
                  {persona.title} · {persona.team}
                </p>
              </div>
            </div>
          ) : null}
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-24 sm:px-6 lg:pb-8">
          {tab === "ask" ? <AskView /> : null}
          {tab === "expert" ? <ExpertView /> : null}
          {tab === "impact" ? <ImpactView /> : null}
          {tab === "learn" ? <LearnView /> : null}
          {tab === "trust" ? <TrustView /> : null}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-card lg:hidden">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "flex h-14 min-h-11 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold",
              tab === item.id ? "text-navy" : "text-muted",
            )}
          >
            <item.icon className="size-4" />
            {item.id === "expert" ? "Expert" : item.id === "impact" ? "Impact" : item.id === "learn" ? "Learn" : item.id === "trust" ? "Trust" : "Ask"}
          </button>
        ))}
      </nav>
    </div>
  );
}
