import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TrustSettings } from "@/lib/graph/types";

export type HostId = "teams" | "workday" | "sap";
export type TabId = "ask" | "expert" | "impact" | "learn" | "trust";

type AppState = {
  host: HostId;
  personaId: string;
  tab: TabId;
  trust: TrustSettings;
  setHost: (host: HostId) => void;
  setPersonaId: (id: string) => void;
  setTab: (tab: TabId) => void;
  setTrust: (patch: Partial<TrustSettings>) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      host: "teams",
      personaId: "bb",
      tab: "ask",
      trust: {
        shareCareerHistory: true,
        shareReferences: true,
        shareExternalProfiles: true,
      },
      setHost: (host) => set({ host }),
      setPersonaId: (personaId) => set({ personaId }),
      setTab: (tab) => set({ tab }),
      setTrust: (patch) => set((s) => ({ trust: { ...s.trust, ...patch } })),
    }),
    {
      name: "all-aboard-demo",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    },
  ),
);
