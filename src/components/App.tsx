"use client";

import { DemoToolbar } from "@/components/host/DemoToolbar";
import { HostShell } from "@/components/host/HostShell";
import { ModuleShell } from "@/components/module/ModuleShell";
import { TooltipProvider } from "@/components/ui/tooltip";

export function App() {
  return (
    <TooltipProvider>
      <div className="flex h-dvh flex-col bg-paper text-ink">
        <DemoToolbar />
        <HostShell>
          <ModuleShell />
        </HostShell>
      </div>
    </TooltipProvider>
  );
}
