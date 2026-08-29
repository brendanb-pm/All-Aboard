"use client";

import type { ReactNode } from "react";
import {
  Bell,
  Calendar,
  Files,
  Grid3x3,
  Hash,
  Home,
  MessageSquare,
  MoreHorizontal,
  Search,
  Video,
} from "lucide-react";
import { personById } from "@/lib/graph/data";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HostShell({ children }: { children: ReactNode }) {
  const host = useAppStore((s) => s.host);
  const persona = personById[useAppStore((s) => s.personaId)];
  const name = persona?.name ?? "";

  if (host === "teams") {
    return (
      <div className="flex min-h-0 flex-1" data-host="teams">
        <aside className="hidden w-[68px] shrink-0 flex-col items-center gap-1 bg-teams-rail py-3 text-white md:flex">
          <RailIcon icon={MessageSquare} label="Chat" />
          <RailIcon icon={Hash} label="Teams" />
          <RailIcon icon={Calendar} label="Calendar" />
          <RailIcon icon={Video} label="Meet" />
          <RailIcon icon={Files} label="Files" />
          <div className="mt-1 flex w-full flex-col items-center border-l-[3px] border-teams bg-white/10 py-1.5">
            <div className="grid size-8 place-items-center rounded-md bg-navy font-display text-[10px] font-bold">
              AA
            </div>
            <span className="mt-1 text-[9px] font-semibold text-white/90">All-Aboard</span>
          </div>
          <div className="mt-auto">
            <RailIcon icon={MoreHorizontal} label="More" />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-12 items-center justify-between gap-3 border-b border-line bg-card px-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                Microsoft Teams · Tab
              </p>
              <p className="text-sm font-semibold text-ink">All-Aboard</p>
            </div>
            <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-md bg-paper px-3 py-1.5 text-sm text-muted lg:flex">
              <Search className="size-3.5" />
              Search
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Bell className="size-4" />
              <span className="hidden sm:inline">{name}</span>
            </div>
          </header>
          <div className="flex min-h-0 flex-1 overflow-hidden bg-paper">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-host={host}>
      {host === "workday" ? (
        <header className="flex h-12 items-center gap-4 bg-workday-deep px-3 text-white sm:px-5">
          <Grid3x3 className="size-4 opacity-80" />
          <span className="font-display text-sm font-semibold tracking-tight">Workday</span>
          <nav className="hidden items-center gap-1 md:flex">
            {["Home", "Inbox", "Team", "Time", "All-Aboard"].map((item) => (
              <span
                key={item}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold",
                  item === "All-Aboard" ? "bg-white/15" : "text-white/75",
                )}
              >
                {item}
              </span>
            ))}
          </nav>
          <span className="ml-auto truncate text-xs text-white/80">{name}</span>
        </header>
      ) : (
        <header className="flex h-12 items-center gap-3 bg-sap-deep px-3 text-white sm:px-5">
          <Home className="size-4 opacity-80" />
          <span className="font-display text-sm font-semibold">SAP</span>
          <span className="text-white/40">/</span>
          <span className="text-sm font-semibold">All-Aboard</span>
          <div className="ml-auto hidden items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/70 sm:flex">
            <Search className="size-3.5" />
            Search
          </div>
          <span className="truncate text-xs text-white/80">{name}</span>
        </header>
      )}
      <div className="flex min-h-0 flex-1 overflow-hidden bg-paper">{children}</div>
    </div>
  );
}

function RailIcon({ icon: Icon, label }: { icon: typeof Search; label: string }) {
  return (
    <div className="flex w-full flex-col items-center py-1.5 text-white/70">
      <Icon className="size-5" />
      <span className="mt-0.5 text-[9px] font-medium">{label}</span>
    </div>
  );
}
