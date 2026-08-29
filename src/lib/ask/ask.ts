import { createServerFn } from "@tanstack/react-start";
import { compactGraphForModel } from "@/lib/graph/retrieve";
import { documentById, personById, systemById } from "@/lib/graph/data";
import type { AskResult, TrustSettings } from "@/lib/graph/types";

type Input = {
  question: string;
  personaId: string;
  trust: TrustSettings;
};

type ModelPayload = {
  shortAnswer: string;
  nextStep: string;
  confidence: "high" | "medium" | "low" | "insufficient";
  sourceIds: string[];
  people: Array<{ id: string; reason: string }>;
  systemIds: string[];
  conflict?: { summary: string; authoritative: string } | null;
  refusal?: string | null;
};

export const askOrganization = createServerFn({ method: "POST" })
  .validator((input: Input) => input)
  .handler(async ({ data }): Promise<AskResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        question: data.question,
        shortAnswer: "",
        nextStep: "",
        confidence: "insufficient",
        sources: [],
        people: [],
        systems: [],
        hiddenByTrust: [],
        live: true,
        refusal:
          "Live organizational answers are unavailable in this environment. Use one of the scripted demo questions, or try again later.",
      };
    }

    const graph = compactGraphForModel(data.trust);
    const viewer = personById[data.personaId];
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 900,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `You are All-Aboard, an employee-agency organizational navigation assistant for Northline Energy (synthetic demo). Answer ONLY from the provided graph. Never invent people, systems, or documents. Never produce collaboration scores, rankings, or message counts. If sources are weak, set confidence to insufficient and refuse.

Honor trust flags already applied to the graph (prior career / references / external profiles may be stripped).

Return JSON only:
{
  "shortAnswer": string,
  "nextStep": string,
  "confidence": "high" | "medium" | "low" | "insufficient",
  "sourceIds": string[],
  "people": [{"id": string, "reason": string}],
  "systemIds": string[],
  "conflict": {"summary": string, "authoritative": string} | null,
  "refusal": string | null
}`,
          },
          {
            role: "user",
            content: JSON.stringify({
              viewer: viewer
                ? { id: viewer.id, name: viewer.name, title: viewer.title, team: viewer.team }
                : null,
              question: data.question,
              graph,
            }),
          },
        ],
      }),
    });

    if (!res.ok) {
      return {
        question: data.question,
        shortAnswer: "",
        nextStep: "",
        confidence: "insufficient",
        sources: [],
        people: [],
        systems: [],
        hiddenByTrust: [],
        live: true,
        refusal: `The reasoning service returned ${res.status}. Try a scripted demo question.`,
      };
    }

    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    const raw = body.choices[0]?.message.content ?? "";
    const jsonText = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    let parsed: ModelPayload;
    try {
      parsed = JSON.parse(jsonText) as ModelPayload;
    } catch {
      return {
        question: data.question,
        shortAnswer: raw.slice(0, 1200) || "I could not parse a grounded answer.",
        nextStep: "Try one of the scripted demo questions for a fully cited walkthrough.",
        confidence: "low",
        sources: [],
        people: [],
        systems: [],
        hiddenByTrust: [],
        live: true,
      };
    }

    return {
      question: data.question,
      shortAnswer: parsed.shortAnswer,
      nextStep: parsed.nextStep,
      confidence: parsed.confidence,
      sources: (parsed.sourceIds ?? []).map((id) => documentById[id]).filter(Boolean),
      people: (parsed.people ?? [])
        .map((p) => {
          const person = personById[p.id];
          if (!person) return null;
          return { person, reason: p.reason, fit: "Internal" };
        })
        .filter(Boolean) as AskResult["people"],
      systems: (parsed.systemIds ?? []).map((id) => systemById[id]).filter(Boolean),
      conflict: parsed.conflict ?? undefined,
      hiddenByTrust: [],
      live: true,
      refusal: parsed.confidence === "insufficient" ? parsed.refusal ?? parsed.shortAnswer : undefined,
    };
  });
