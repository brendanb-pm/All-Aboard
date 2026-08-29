export type TrustType =
  | "authoritative"
  | "source-grounded"
  | "employee-opt-in"
  | "ai-inferred";

export type EdgeKind =
  | "manages"
  | "teammate"
  | "owns"
  | "contributed"
  | "prior-employer"
  | "reference"
  | "collaborated"
  | "depends-on";

export type PersonColor = "teal" | "blue" | "navy" | "amber" | "sap";

export type TrustSettings = {
  shareCareerHistory: boolean;
  shareReferences: boolean;
  shareExternalProfiles: boolean;
};

export type PriorCareer = {
  employer: string;
  role: string;
  years: string;
  expertise: string[];
};

export type Person = {
  id: string;
  name: string;
  initials: string;
  title: string;
  team: string;
  org: string;
  location: string;
  startDate: string;
  color: PersonColor;
  bio: string;
  expertise: string[];
  priorCareer?: PriorCareer;
  isPersona?: boolean;
  personaLabel?: string;
  managerId?: string;
};

export type SystemNode = {
  id: string;
  name: string;
  summary: string;
  owners: string[];
  teams: string[];
  vendors?: string[];
};

export type Document = {
  id: string;
  title: string;
  kind: string;
  trustType: TrustType;
  updated: string;
  owner: string;
  excerpt: string;
  stale?: boolean;
  conflictsWith?: string;
  systems: string[];
  people: string[];
};

export type GraphEdge = {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
  label: string;
  optIn?: "career" | "reference" | "external";
};

export type AuthoredAnswer = {
  id: string;
  match: string[];
  shortAnswer: string;
  nextStep: string;
  confidence: "high" | "medium" | "low";
  sourceIds: string[];
  peopleIds: string[];
  systemIds: string[];
  conflict?: { summary: string; authoritative: string };
  historical?: string;
};

export type AskResult = {
  question: string;
  shortAnswer: string;
  nextStep: string;
  confidence: "high" | "medium" | "low" | "insufficient";
  sources: Document[];
  people: Array<{ person: Person; reason: string; fit: string }>;
  systems: SystemNode[];
  conflict?: { summary: string; authoritative: string };
  historical?: string;
  hiddenByTrust: string[];
  live: boolean;
  refusal?: string;
};

export type ExpertHit = {
  person: Person;
  fit: "High fit" | "Internal" | "Warm path" | "Role match";
  reason: string;
  evidence: string[];
  hiddenNotes: string[];
};

export type PathHop = {
  fromId: string;
  toId: string;
  label: string;
  kind: EdgeKind;
};

export type ImpactResult = {
  question: string;
  summary: string;
  counts: { systems: number; teams: number; contracts: number; privacy: number; decisions: number };
  systems: SystemNode[];
  teams: string[];
  owners: Person[];
  conversations: string[];
  historical: string;
  sourceIds: string[];
};

export type OnboardingPlan = {
  title: string;
  subtitle: string;
  phases: Array<{ when: string; what: string; progress: number }>;
  peopleToMeet: Array<{ personId: string; why: string }>;
  acronyms: Array<{ term: string; meaning: string }>;
  note: string;
};
