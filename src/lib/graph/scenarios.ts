import { documentById, personById, systemById } from "./data";
import { searchExperts, visibleExpertise, warmPath } from "./retrieve";
import type { AskResult, AuthoredAnswer, TrustSettings } from "./types";

export const authored: AuthoredAnswer[] = [
  {
    id: "outage-map",
    match: [
      "outage map",
      "outage-map",
      "four teams",
      "4 teams",
      "why does changing the outage",
      "coordination with four",
    ],
    shortAnswer:
      "Outage-map changes cross Customer Web, OMS, GIS, IAM, and customer communications. The web team owns the experience, but outage state originates in OMS, location context comes from GIS, authenticated flows depend on IAM, and customer messaging has regulatory/customer operations review.",
    nextStep:
      "Involve the OMS integration owner (Priya Shah), GIS data steward (Chris Okonkwo), Digital PM (Nina Patel), IAM architect (Hannah Lee), and Customer Communications (Aisha Rahman) before architecture review.",
    confidence: "high",
    sourceIds: ["app-registry", "adr-014", "comms-sop", "oms-runbook", "outage-diagram-2023"],
    peopleIds: ["np", "ps", "co", "hl", "ar", "bb"],
    systemIds: ["portal", "oms", "gis", "iam"],
    conflict: {
      summary:
        "The 2023 outage-map diagram lists Team A as owner; Application Registry lists Customer Digital.",
      authoritative: "Use the Application Registry as authoritative.",
    },
  },
  {
    id: "telemetry-expert",
    match: [
      "telemetry",
      "connected-device",
      "connected device",
      "device telemetry",
      "utility digital platforms",
      "who understands connected",
    ],
    shortAnswer:
      "For connected-device telemetry in a utility context, start with internal privacy review, then the AMI telemetry owner, then a warm introduction to prior-career device expertise.",
    nextStep:
      "Consult Sarah Jones (internal telemetry privacy SME) first. Ask Robert Jacobson for an introduction to Brendan Brown if you need connected-device plus utility-platform context.",
    confidence: "high",
    sourceIds: ["adr-022", "c2m-overview"],
    peopleIds: ["bb", "sj", "rj"],
    systemIds: ["ami", "c2m"],
  },
  {
    id: "notify-vendor",
    match: [
      "notification vendor",
      "vendor api",
      "replace the customer notification",
      "sms",
      "notification broker",
    ],
    shortAnswer:
      "Replacing the customer notification vendor API potentially affects 6 systems, 4 teams, 2 vendor contracts, 1 privacy review, and 3 historical decisions. It closely resembles the 2024 notification retry redesign.",
    nextStep:
      "Talk to the integration owner, privacy reviewer, customer communications, and vendor manager. Review INC-2417 before any architecture review.",
    confidence: "high",
    sourceIds: ["inc-2417", "vendor-notify", "pr-441", "change-gate"],
    peopleIds: ["lo", "sj", "ar", "mw"],
    systemIds: ["portal", "c2m", "oms", "notify", "dwh", "mobile"],
    historical:
      "Prior vendor change failed UAT due to duplicate SMS retry behavior. Review incident INC-2417.",
  },
  {
    id: "reonboard",
    match: [
      "moved from",
      "internal transfer",
      "hardware to cloud",
      "field to cloud",
      "re-onboard",
      "reonboard",
    ],
    shortAnswer:
      "Internal transfers should skip generic onboarding. Use prior field/OMS context as an asset and learn how those events land in Cloud Platform systems.",
    nextStep:
      "Meet Grace Kim (new manager), Tom Brennan (C2M bridge from meters you already know), Priya Shah (OMS integration), and Devon Walsh (event patterns).",
    confidence: "high",
    sourceIds: ["glossary", "c2m-overview", "change-gate"],
    peopleIds: ["gk", "tb", "ps", "dw"],
    systemIds: ["dwh", "c2m", "oms"],
  },
];

export function matchAuthored(question: string): AuthoredAnswer | null {
  const q = question.toLowerCase();
  let best: AuthoredAnswer | null = null;
  let bestHits = 0;
  for (const a of authored) {
    const hits = a.match.filter((m) => q.includes(m)).length;
    if (hits > bestHits) {
      bestHits = hits;
      best = a;
    }
  }
  return bestHits > 0 ? best : null;
}

export function materializeAuthored(
  question: string,
  answer: AuthoredAnswer,
  trust: TrustSettings,
  viewerId: string,
): AskResult {
  const hiddenByTrust: string[] = [];
  const people = answer.peopleIds
    .map((id) => personById[id])
    .filter(Boolean)
    .map((person) => {
      const skills = visibleExpertise(person, trust);
      const careerHidden =
        !trust.shareCareerHistory &&
        person.priorCareer &&
        answer.id === "telemetry-expert" &&
        person.id === "bb";
      if (careerHidden) {
        hiddenByTrust.push(
          "Brendan Brown’s connected-device expertise is prior-career (Nautilus) and is hidden while career history is off.",
        );
      }
      const reason = skills[0] ? skills.slice(0, 2).join(", ") : person.team;
      return { person, reason, fit: person.id === "sj" ? "Internal" : "High fit" };
    });

  if (answer.id === "telemetry-expert" && !trust.shareCareerHistory) {
    return {
      question,
      shortAnswer:
        "Internal telemetry privacy expertise is available without prior-career data. Connected-device platform history is employee-contributed and currently hidden.",
      nextStep:
        "Start with Sarah Jones (internal privacy SME) and Tom Brennan (C2M architect). Warm paths that depend on prior employers are not shown.",
      confidence: "medium",
      sources: answer.sourceIds.map((id) => documentById[id]).filter(Boolean),
      people: people.filter((p) => p.person.id !== "bb" && p.person.id !== "rj"),
      systems: answer.systemIds.map((id) => systemById[id]).filter(Boolean),
      hiddenByTrust,
      live: false,
    };
  }

  if (answer.id === "telemetry-expert" && !trust.shareReferences) {
    hiddenByTrust.push("Reference/referral path between Robert and Brendan is hidden.");
  }

  const experts = searchExperts(question, trust, viewerId);
  hiddenByTrust.push(...experts.hiddenByTrust);

  return {
    question,
    shortAnswer: answer.shortAnswer,
    nextStep: answer.nextStep,
    confidence: answer.confidence,
    sources: answer.sourceIds.map((id) => documentById[id]).filter(Boolean),
    people,
    systems: answer.systemIds.map((id) => systemById[id]).filter(Boolean),
    conflict: answer.conflict,
    historical: answer.historical,
    hiddenByTrust: [...new Set(hiddenByTrust)],
    live: false,
  };
}

export function suggestedQuestions(personaId: string): string[] {
  if (personaId === "mc") {
    return [
      "Why does changing the outage map require coordination with four teams?",
      "What is OMS, and who owns it?",
      "Who should I meet in my first 30 days?",
    ];
  }
  if (personaId === "jp") {
    return [
      "I moved from field operations to the cloud platform team. What should I learn?",
      "How do OMS events land in the data warehouse?",
      "Who understands C2M in Cloud Platform terms?",
    ];
  }
  if (personaId === "dw") {
    return [
      "We want to replace the customer notification vendor API.",
      "What broke last time we changed the notification vendor?",
      "Who owns the OMS integration contract?",
    ];
  }
  if (personaId === "ev") {
    return [
      "Who needs to review customer-visible outage copy?",
      "What is the impact of replacing the notification vendor?",
      "Who actually knows OMS storm-mode operations?",
    ];
  }
  return [
    "Why does changing the outage map require coordination with four teams?",
    "Who understands connected-device telemetry and utility digital platforms?",
    "We want to replace the customer notification vendor API.",
  ];
}

export { warmPath };
