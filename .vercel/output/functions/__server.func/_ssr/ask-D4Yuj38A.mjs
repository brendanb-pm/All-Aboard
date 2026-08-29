import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as documentById, l as systemById, o as personById, r as compactGraphForModel } from "./retrieve-DPUMcNPg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-D4Yuj38A.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askOrganization_createServerFn_handler = createServerRpc({
	id: "0788b4d2e50df0653ffede4ddca8ffb6f77612db0cc2b7a105344da20fee307b",
	name: "askOrganization",
	filename: "src/lib/ask/ask.ts"
}, (opts) => askOrganization.__executeServer(opts));
var askOrganization = createServerFn({ method: "POST" }).validator((input) => input).handler(askOrganization_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		question: data.question,
		shortAnswer: "",
		nextStep: "",
		confidence: "insufficient",
		sources: [],
		people: [],
		systems: [],
		hiddenByTrust: [],
		live: true,
		refusal: "Live organizational answers are unavailable in this environment. Use one of the scripted demo questions, or try again later."
	};
	const graph = compactGraphForModel(data.trust);
	const viewer = personById[data.personaId];
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 900,
			temperature: .2,
			messages: [{
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
}`
			}, {
				role: "user",
				content: JSON.stringify({
					viewer: viewer ? {
						id: viewer.id,
						name: viewer.name,
						title: viewer.title,
						team: viewer.team
					} : null,
					question: data.question,
					graph
				})
			}]
		})
	});
	if (!res.ok) return {
		question: data.question,
		shortAnswer: "",
		nextStep: "",
		confidence: "insufficient",
		sources: [],
		people: [],
		systems: [],
		hiddenByTrust: [],
		live: true,
		refusal: `The reasoning service returned ${res.status}. Try a scripted demo question.`
	};
	const raw = (await res.json()).choices[0]?.message.content ?? "";
	const jsonText = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
	let parsed;
	try {
		parsed = JSON.parse(jsonText);
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
			live: true
		};
	}
	return {
		question: data.question,
		shortAnswer: parsed.shortAnswer,
		nextStep: parsed.nextStep,
		confidence: parsed.confidence,
		sources: (parsed.sourceIds ?? []).map((id) => documentById[id]).filter(Boolean),
		people: (parsed.people ?? []).map((p) => {
			const person = personById[p.id];
			if (!person) return null;
			return {
				person,
				reason: p.reason,
				fit: "Internal"
			};
		}).filter(Boolean),
		systems: (parsed.systemIds ?? []).map((id) => systemById[id]).filter(Boolean),
		conflict: parsed.conflict ?? void 0,
		hiddenByTrust: [],
		live: true,
		refusal: parsed.confidence === "insufficient" ? parsed.refusal ?? parsed.shortAnswer : void 0
	};
});
//#endregion
export { askOrganization_createServerFn_handler };
