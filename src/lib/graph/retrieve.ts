import { documents, edges, people, personById, systems } from "./data";
import type {
  Document,
  ExpertHit,
  GraphEdge,
  ImpactResult,
  PathHop,
  Person,
  TrustSettings,
} from "./types";

export function edgeAllowed(edge: GraphEdge, trust: TrustSettings) {
  if (edge.optIn === "career" && !trust.shareCareerHistory) return false;
  if (edge.optIn === "reference" && !trust.shareReferences) return false;
  if (edge.optIn === "external" && !trust.shareExternalProfiles) return false;
  return true;
}

export function visibleExpertise(person: Person, trust: TrustSettings): string[] {
  const current = [...person.expertise];
  if (trust.shareCareerHistory && person.priorCareer) {
    return [...current, ...person.priorCareer.expertise];
  }
  return current;
}

export function visiblePerson(person: Person, trust: TrustSettings): Person {
  if (trust.shareCareerHistory) return person;
  const { priorCareer: _ignored, ...rest } = person;
  return rest;
}

function tokenize(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9+/#\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "need",
  "someone",
  "understand",
  "understands",
  "who",
  "what",
  "why",
  "how",
  "does",
  "want",
  "replace",
  "into",
  "about",
  "should",
  "review",
  "owns",
  "owner",
]);

const GENERIC = new Set([
  "digital",
  "utility",
  "platform",
  "platforms",
  "customer",
  "system",
  "systems",
  "team",
  "teams",
  "experience",
  "program",
]);

function haystack(person: Person, trust: TrustSettings) {
  const bits = [
    person.name,
    person.title,
    person.team,
    person.org,
    person.bio,
    ...visibleExpertise(person, trust),
  ];
  if (trust.shareCareerHistory && person.priorCareer) {
    bits.push(person.priorCareer.employer, person.priorCareer.role);
  }
  return bits.join(" ").toLowerCase();
}

export function searchExperts(
  query: string,
  trust: TrustSettings,
  viewerId: string,
): { hits: ExpertHit[]; hiddenByTrust: string[] } {
  const tokens = tokenize(query);
  const hiddenByTrust: string[] = [];
  const scored = people
    .filter((p) => p.id !== viewerId)
    .map((p) => {
      const text = haystack(p, trust);
      let score = 0;
      const evidence: string[] = [];
      const specific = tokens.filter((t) => !GENERIC.has(t));
      const generic = tokens.filter((t) => GENERIC.has(t));
      for (const t of generic) {
        if (text.includes(t)) score += 1;
      }
      for (const t of specific) {
        if (text.includes(t)) score += 3;
      }
      for (const skill of visibleExpertise(p, trust)) {
        const sl = skill.toLowerCase();
        if (specific.some((t) => sl.includes(t))) {
          score += 8;
          evidence.push(skill);
        }
      }
      for (const doc of documents) {
        if (!doc.people.includes(p.id)) continue;
        if (specific.some((t) => `${doc.title} ${doc.excerpt}`.toLowerCase().includes(t))) {
          score += 3;
          evidence.push(`Contributed to ${doc.title}`);
        }
      }
      const careerBlocked =
        !trust.shareCareerHistory &&
        p.priorCareer &&
        tokens.some((t) =>
          `${p.priorCareer!.expertise.join(" ")} ${p.priorCareer!.employer}`
            .toLowerCase()
            .includes(t),
        );
      if (careerBlocked) {
        hiddenByTrust.push(
          `${p.name}'s prior-career expertise is hidden until career history is opted in.`,
        );
      }
      return { person: p, score, evidence: unique(evidence) };
    })
    .filter((x) => x.score >= 8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const hits: ExpertHit[] = scored.map((s, i) => {
    const path = warmPath(viewerId, s.person.id, trust);
    let fit: ExpertHit["fit"] = i === 0 ? "High fit" : "Internal";
    if (path.hops.some((h) => h.kind === "prior-employer" || h.kind === "reference")) {
      fit = i === 0 ? "High fit" : "Warm path";
    }
    if (s.person.team === personById[viewerId]?.team) fit = "Role match";
    const reason = s.evidence[0]
      ? `${s.person.title} · ${s.evidence[0]}`
      : `${s.person.title} · ${s.person.team}`;
    return {
      person: visiblePerson(s.person, trust),
      fit,
      reason,
      evidence: s.evidence.slice(0, 3),
      hiddenNotes: [],
    };
  });

  return { hits, hiddenByTrust: unique(hiddenByTrust) };
}

export function warmPath(
  fromId: string,
  toId: string,
  trust: TrustSettings,
): { hops: PathHop[]; hiddenByTrust: string[] } {
  const hiddenByTrust: string[] = [];
  const allowed = edges.filter((e) => {
    if (e.kind === "depends-on" || e.kind === "owns") return false;
    if (!edgeAllowed(e, trust)) {
      hiddenByTrust.push(e.label);
      return false;
    }
    return true;
  });

  const adj = new Map<string, GraphEdge[]>();
  for (const e of allowed) {
    const list = adj.get(e.from) ?? [];
    list.push(e);
    adj.set(e.from, list);
    const back: GraphEdge = { ...e, from: e.to, to: e.from, id: `${e.id}-r` };
    const list2 = adj.get(e.to) ?? [];
    list2.push(back);
    adj.set(e.to, list2);
  }

  const queue: string[][] = [[fromId]];
  const seen = new Set([fromId]);
  let found: string[] | null = null;
  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1]!;
    if (last === toId) {
      found = path;
      break;
    }
    if (path.length > 4) continue;
    for (const e of adj.get(last) ?? []) {
      if (seen.has(e.to)) continue;
      seen.add(e.to);
      queue.push([...path, e.to]);
    }
  }

  if (!found) return { hops: [], hiddenByTrust: unique(hiddenByTrust) };

  const hops: PathHop[] = [];
  for (let i = 0; i < found.length - 1; i++) {
    const a = found[i]!;
    const b = found[i + 1]!;
    const e =
      allowed.find((x) => (x.from === a && x.to === b) || (x.from === b && x.to === a)) ??
      allowed[0]!;
    hops.push({ fromId: a, toId: b, label: e.label, kind: e.kind });
  }
  return { hops, hiddenByTrust: unique(hiddenByTrust) };
}

export function relatedDocuments(systemIds: string[], personIds: string[]): Document[] {
  const set = new Set<string>();
  const out: Document[] = [];
  for (const d of documents) {
    const hit =
      d.systems.some((s) => systemIds.includes(s)) || d.people.some((p) => personIds.includes(p));
    if (hit && !set.has(d.id)) {
      set.add(d.id);
      out.push(d);
    }
  }
  return out;
}

export function analyzeImpact(query: string): ImpactResult {
  const q = query.toLowerCase();
  const notify = /notif|sms|vendor|api|message|alert/.test(q);
  const outage = /outage|map|oms|gis/.test(q);
  const telemetry = /telemetr|ami|device|c2m/.test(q);

  let systemIds = ["portal", "oms", "gis", "iam"];
  let teamSet = ["Digital", "Integration"];
  let ownerIds = ["np", "ps", "co", "hl"];
  let conversations = [
    "OMS integration owner",
    "GIS data steward",
    "Digital PM",
    "Customer Communications",
  ];
  let historical = "Review Outage Digital ADR-014 and the Application Registry before architecture review.";
  let summary =
    "This change crosses customer experience and operational systems of record. Involve owners before architecture review.";
  let counts = { systems: 4, teams: 2, contracts: 0, privacy: 0, decisions: 2 };

  if (notify) {
    systemIds = ["portal", "c2m", "oms", "notify", "dwh", "mobile"];
    teamSet = ["Digital", "Customer Ops", "Integration", "Privacy"];
    ownerIds = ["lo", "mw", "sj", "ar"];
    conversations = [
      "Integration owner (Luis Ortega)",
      "Privacy reviewer (Sarah Jones)",
      "Customer communications (Aisha Rahman)",
      "Vendor manager / contract owner",
    ];
    historical =
      "Prior vendor change failed UAT due to duplicate SMS retry behavior. Review incident INC-2417 before proceeding.";
    summary =
      "Potential impact: 6 systems, 4 teams, 2 vendor contracts, 1 privacy review, and 3 historical decisions. This resembles the 2024 notification retry redesign.";
    counts = { systems: 6, teams: 4, contracts: 2, privacy: 1, decisions: 3 };
  } else if (telemetry) {
    systemIds = ["ami", "c2m", "dwh", "portal"];
    teamSet = ["Integration", "Privacy", "Cloud Platform"];
    ownerIds = ["rj", "tb", "sj", "gk"];
    conversations = ["AMI telemetry owner", "C2M architect", "Privacy partner", "Data platform lead"];
    historical = "Telemetry retention is governed by ADR-022. New device classes require privacy review.";
    summary =
      "Telemetry changes hit AMI head-end, C2M association, warehouse landing, and privacy retention rules.";
    counts = { systems: 4, teams: 3, contracts: 0, privacy: 1, decisions: 1 };
  } else if (outage) {
    systemIds = ["portal", "oms", "gis", "iam", "comms"];
    teamSet = ["Digital", "Integration", "Customer Ops"];
    ownerIds = ["np", "ps", "co", "hl", "ar"];
    conversations = [
      "OMS integration owner",
      "GIS data steward",
      "IAM architect",
      "Customer Communications",
    ];
    historical =
      "Conflict: the 2023 outage-map diagram lists Team A as owner; Application Registry lists Customer Digital. Use the registry.";
    summary =
      "Outage-map changes cross Customer Web, OMS, GIS, IAM, and customer communications.";
    counts = { systems: 5, teams: 3, contracts: 0, privacy: 0, decisions: 2 };
  }

  const sys = systems.filter((s) => systemIds.includes(s.id));
  const owners = ownerIds.map((id) => personById[id]).filter(Boolean) as Person[];
  const sourceIds = relatedDocuments(systemIds, ownerIds).map((d) => d.id);

  return {
    question: query,
    summary,
    counts,
    systems: sys,
    teams: teamSet,
    owners,
    conversations,
    historical,
    sourceIds,
  };
}

function unique(arr: string[]) {
  return [...new Set(arr)];
}

export function compactGraphForModel(trust: TrustSettings) {
  return {
    company: "Northline Energy (synthetic utility)",
    people: people.map((p) => ({
      id: p.id,
      name: p.name,
      title: p.title,
      team: p.team,
      org: p.org,
      expertise: visibleExpertise(p, trust),
      priorCareer: trust.shareCareerHistory ? p.priorCareer ?? null : null,
    })),
    systems: systems.map((s) => ({
      id: s.id,
      name: s.name,
      summary: s.summary,
      owners: s.owners,
      teams: s.teams,
      vendors: s.vendors ?? [],
    })),
    documents: documents.map((d) => ({
      id: d.id,
      title: d.title,
      trustType: d.trustType,
      updated: d.updated,
      stale: !!d.stale,
      conflictsWith: d.conflictsWith ?? null,
      excerpt: d.excerpt,
    })),
    relationships: edges.filter((e) => edgeAllowed(e, trust)).map((e) => ({
      from: e.from,
      to: e.to,
      kind: e.kind,
      label: e.label,
    })),
    blocked: [
      "No individual collaboration scores",
      "No hidden engagement rankings",
      "No raw message-count exposure",
      "No management dashboard that rates employee networking",
    ],
  };
}
