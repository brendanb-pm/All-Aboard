import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as onboardingByPersona, c as searchExperts, d as warmPath, i as documentById, l as systemById, n as analyzeImpact, o as personById, s as personas, t as COMPANY, u as visibleExpertise } from "./retrieve-DPUMcNPg.mjs";
import { _ as Compass, a as Sparkles, b as ArrowRight, c as MessageSquare, d as Hash, f as Grid3x3, g as Ellipsis, h as Files, l as LoaderCircle, m as GitBranch, n as Video, o as ShieldCheck, p as GraduationCap, r as Users, s as Search, t as X, u as House, v as Calendar, y as Bell } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DzA0oeOr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useAppStore = create()(persist((set) => ({
	host: "teams",
	personaId: "bb",
	tab: "ask",
	trust: {
		shareCareerHistory: true,
		shareReferences: true,
		shareExternalProfiles: true
	},
	setHost: (host) => set({ host }),
	setPersonaId: (personaId) => set({ personaId }),
	setTab: (tab) => set({ tab }),
	setTrust: (patch) => set((s) => ({ trust: {
		...s.trust,
		...patch
	} }))
}), {
	name: "all-aboard-demo",
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var HOSTS = [
	{
		id: "teams",
		label: "Teams"
	},
	{
		id: "workday",
		label: "Workday"
	},
	{
		id: "sap",
		label: "SAP"
	}
];
function DemoToolbar() {
	const host = useAppStore((s) => s.host);
	const setHost = useAppStore((s) => s.setHost);
	const personaId = useAppStore((s) => s.personaId);
	const setPersonaId = useAppStore((s) => s.setPersonaId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 border-b border-line bg-card px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4 shrink-0 text-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-navy",
						children: "All-Aboard module"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1.5 text-line",
						children: "·"
					}),
					COMPANY.disclaimer
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex rounded-md bg-paper p-0.5",
				children: HOSTS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setHost(h.id),
					className: cn("h-8 rounded-[6px] px-2.5 text-xs font-semibold", host === h.id ? "bg-card text-navy shadow-sm" : "text-muted hover:text-ink"),
					children: h.label
				}, h.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: "View as"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: personaId,
					onChange: (e) => setPersonaId(e.target.value),
					className: "h-8 rounded-md border border-line bg-card px-2 text-xs font-semibold text-ink",
					children: personas.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: p.id,
						children: [
							p.name,
							" · ",
							p.personaLabel
						]
					}, p.id))
				})]
			})]
		})]
	});
}
function HostShell({ children }) {
	const host = useAppStore((s) => s.host);
	const name = personById[useAppStore((s) => s.personaId)]?.name ?? "";
	if (host === "teams") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1",
		"data-host": "teams",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-[68px] shrink-0 flex-col items-center gap-1 bg-teams-rail py-3 text-white md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
					icon: MessageSquare,
					label: "Chat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
					icon: Hash,
					label: "Teams"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
					icon: Calendar,
					label: "Calendar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
					icon: Video,
					label: "Meet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
					icon: Files,
					label: "Files"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex w-full flex-col items-center border-l-[3px] border-teams bg-white/10 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 place-items-center rounded-md bg-navy font-display text-[10px] font-bold",
						children: "AA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-[9px] font-semibold text-white/90",
						children: "All-Aboard"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailIcon, {
						icon: Ellipsis,
						label: "More"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-12 items-center justify-between gap-3 border-b border-line bg-card px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-muted",
						children: "Microsoft Teams · Tab"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-ink",
						children: "All-Aboard"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden max-w-sm flex-1 items-center gap-2 rounded-md bg-paper px-3 py-1.5 text-sm text-muted lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), "Search"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: name
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 overflow-hidden bg-paper",
				children
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		"data-host": host,
		children: [host === "workday" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-12 items-center gap-4 bg-workday-deep px-3 text-white sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-semibold tracking-tight",
					children: "Workday"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: [
						"Home",
						"Inbox",
						"Team",
						"Time",
						"All-Aboard"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("rounded-md px-2.5 py-1 text-xs font-semibold", item === "All-Aboard" ? "bg-white/15" : "text-white/75"),
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto truncate text-xs text-white/80",
					children: name
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-12 items-center gap-3 bg-sap-deep px-3 text-white sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-semibold",
					children: "SAP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white/40",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: "All-Aboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto hidden items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/70 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), "Search"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-xs text-white/80",
					children: name
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 overflow-hidden bg-paper",
			children
		})]
	});
}
function RailIcon({ icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col items-center py-1.5 text-white/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 text-[9px] font-medium",
			children: label
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askOrganization = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0788b4d2e50df0653ffede4ddca8ffb6f77612db0cc2b7a105344da20fee307b"));
var authored = [
	{
		id: "outage-map",
		match: [
			"outage map",
			"outage-map",
			"four teams",
			"4 teams",
			"why does changing the outage",
			"coordination with four"
		],
		shortAnswer: "Outage-map changes cross Customer Web, OMS, GIS, IAM, and customer communications. The web team owns the experience, but outage state originates in OMS, location context comes from GIS, authenticated flows depend on IAM, and customer messaging has regulatory/customer operations review.",
		nextStep: "Involve the OMS integration owner (Priya Shah), GIS data steward (Chris Okonkwo), Digital PM (Nina Patel), IAM architect (Hannah Lee), and Customer Communications (Aisha Rahman) before architecture review.",
		confidence: "high",
		sourceIds: [
			"app-registry",
			"adr-014",
			"comms-sop",
			"oms-runbook",
			"outage-diagram-2023"
		],
		peopleIds: [
			"np",
			"ps",
			"co",
			"hl",
			"ar",
			"bb"
		],
		systemIds: [
			"portal",
			"oms",
			"gis",
			"iam"
		],
		conflict: {
			summary: "The 2023 outage-map diagram lists Team A as owner; Application Registry lists Customer Digital.",
			authoritative: "Use the Application Registry as authoritative."
		}
	},
	{
		id: "telemetry-expert",
		match: [
			"telemetry",
			"connected-device",
			"connected device",
			"device telemetry",
			"utility digital platforms",
			"who understands connected"
		],
		shortAnswer: "For connected-device telemetry in a utility context, start with internal privacy review, then the AMI telemetry owner, then a warm introduction to prior-career device expertise.",
		nextStep: "Consult Sarah Jones (internal telemetry privacy SME) first. Ask Robert Jacobson for an introduction to Brendan Brown if you need connected-device plus utility-platform context.",
		confidence: "high",
		sourceIds: ["adr-022", "c2m-overview"],
		peopleIds: [
			"bb",
			"sj",
			"rj"
		],
		systemIds: ["ami", "c2m"]
	},
	{
		id: "notify-vendor",
		match: [
			"notification vendor",
			"vendor api",
			"replace the customer notification",
			"sms",
			"notification broker"
		],
		shortAnswer: "Replacing the customer notification vendor API potentially affects 6 systems, 4 teams, 2 vendor contracts, 1 privacy review, and 3 historical decisions. It closely resembles the 2024 notification retry redesign.",
		nextStep: "Talk to the integration owner, privacy reviewer, customer communications, and vendor manager. Review INC-2417 before any architecture review.",
		confidence: "high",
		sourceIds: [
			"inc-2417",
			"vendor-notify",
			"pr-441",
			"change-gate"
		],
		peopleIds: [
			"lo",
			"sj",
			"ar",
			"mw"
		],
		systemIds: [
			"portal",
			"c2m",
			"oms",
			"notify",
			"dwh",
			"mobile"
		],
		historical: "Prior vendor change failed UAT due to duplicate SMS retry behavior. Review incident INC-2417."
	},
	{
		id: "reonboard",
		match: [
			"moved from",
			"internal transfer",
			"hardware to cloud",
			"field to cloud",
			"re-onboard",
			"reonboard"
		],
		shortAnswer: "Internal transfers should skip generic onboarding. Use prior field/OMS context as an asset and learn how those events land in Cloud Platform systems.",
		nextStep: "Meet Grace Kim (new manager), Tom Brennan (C2M bridge from meters you already know), Priya Shah (OMS integration), and Devon Walsh (event patterns).",
		confidence: "high",
		sourceIds: [
			"glossary",
			"c2m-overview",
			"change-gate"
		],
		peopleIds: [
			"gk",
			"tb",
			"ps",
			"dw"
		],
		systemIds: [
			"dwh",
			"c2m",
			"oms"
		]
	}
];
function matchAuthored(question) {
	const q = question.toLowerCase();
	let best = null;
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
function materializeAuthored(question, answer, trust, viewerId) {
	const hiddenByTrust = [];
	const people = answer.peopleIds.map((id) => personById[id]).filter(Boolean).map((person) => {
		const skills = visibleExpertise(person, trust);
		if (!trust.shareCareerHistory && person.priorCareer && answer.id === "telemetry-expert" && person.id === "bb") hiddenByTrust.push("Brendan Brown’s connected-device expertise is prior-career (Nautilus) and is hidden while career history is off.");
		return {
			person,
			reason: skills[0] ? skills.slice(0, 2).join(", ") : person.team,
			fit: person.id === "sj" ? "Internal" : "High fit"
		};
	});
	if (answer.id === "telemetry-expert" && !trust.shareCareerHistory) return {
		question,
		shortAnswer: "Internal telemetry privacy expertise is available without prior-career data. Connected-device platform history is employee-contributed and currently hidden.",
		nextStep: "Start with Sarah Jones (internal privacy SME) and Tom Brennan (C2M architect). Warm paths that depend on prior employers are not shown.",
		confidence: "medium",
		sources: answer.sourceIds.map((id) => documentById[id]).filter(Boolean),
		people: people.filter((p) => p.person.id !== "bb" && p.person.id !== "rj"),
		systems: answer.systemIds.map((id) => systemById[id]).filter(Boolean),
		hiddenByTrust,
		live: false
	};
	if (answer.id === "telemetry-expert" && !trust.shareReferences) hiddenByTrust.push("Reference/referral path between Robert and Brendan is hidden.");
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
		live: false
	};
}
function suggestedQuestions(personaId) {
	if (personaId === "mc") return [
		"Why does changing the outage map require coordination with four teams?",
		"What is OMS, and who owns it?",
		"Who should I meet in my first 30 days?"
	];
	if (personaId === "jp") return [
		"I moved from field operations to the cloud platform team. What should I learn?",
		"How do OMS events land in the data warehouse?",
		"Who understands C2M in Cloud Platform terms?"
	];
	if (personaId === "dw") return [
		"We want to replace the customer notification vendor API.",
		"What broke last time we changed the notification vendor?",
		"Who owns the OMS integration contract?"
	];
	if (personaId === "ev") return [
		"Who needs to review customer-visible outage copy?",
		"What is the impact of replacing the notification vendor?",
		"Who actually knows OMS storm-mode operations?"
	];
	return [
		"Why does changing the outage map require coordination with four teams?",
		"Who understands connected-device telemetry and utility digital platforms?",
		"We want to replace the customer notification vendor API."
	];
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight", {
	variants: { tone: {
		navy: "bg-navy-soft text-navy",
		teal: "bg-teal-soft text-teal",
		amber: "bg-amber-soft text-amber",
		danger: "bg-danger-soft text-danger",
		muted: "bg-paper text-muted"
	} },
	defaultVariants: { tone: "navy" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-navy text-white hover:bg-navy-deep",
			teal: "bg-teal text-white hover:opacity-90",
			outline: "bg-card text-ink shadow-[var(--shadow-border)] hover:bg-navy-soft",
			ghost: "text-ink hover:bg-navy-soft",
			host: "bg-white/10 text-white hover:bg-white/16"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-card px-3.5 text-sm text-ink placeholder:text-muted shadow-[inset_0_1px_0_rgba(18,32,51,0.02)] outline-none transition-[box-shadow,border-color] duration-150 focus:border-blue focus:ring-2 focus:ring-blue/20", className),
		...props
	});
}
function Sheet({ open, onOpenChange, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/30 data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-xl", "data-[state=open]:animate-in data-[state=open]:slide-in-from-right"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-base font-semibold text-navy",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
					className: "rounded-md p-2 text-muted hover:bg-paper hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-5 py-4",
				children
			})]
		})] })
	});
}
function SourceList({ sources }) {
	if (!sources.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-2 sm:grid-cols-2",
		children: sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-lg bg-paper px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-navy",
					children: s.title
				}), s.stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "amber",
					children: "Stale"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "teal",
					children: label(s.trustType)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-[11px] text-muted",
				children: [
					s.kind,
					" · updated ",
					s.updated,
					" · ",
					s.owner
				]
			})]
		}, s.id))
	});
}
function label(t) {
	if (t === "authoritative") return "Authoritative";
	if (t === "source-grounded") return "Source-grounded";
	if (t === "employee-opt-in") return "Opt-in";
	return "AI-inferred";
}
function ProvenanceDrawer({ open, onOpenChange, result }) {
	if (!result) return null;
	const stale = result.sources.filter((s) => s.stale).length;
	const auth = result.sources.filter((s) => s.trustType === "authoritative").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		title: "Why you can trust this",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 text-sm text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-muted",
					children: "All-Aboard filters permissions before retrieval. Answers show provenance, confidence, and conflicts. The product will not rank, monitor, or score employees."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Sources",
							value: String(result.sources.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Authoritative",
							value: String(auth)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Stale flagged",
							value: String(stale)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-display text-sm font-semibold text-navy",
					children: "Sources used"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sources: result.sources })] }),
				result.conflict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg bg-amber-soft px-3 py-2.5 text-amber",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Conflict"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: result.conflict.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold",
							children: result.conflict.authoritative
						})
					]
				}) : null,
				result.hiddenByTrust.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-display text-sm font-semibold text-navy",
					children: "Held back by opt-in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-1 pl-4 text-muted",
					children: result.hiddenByTrust.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: h }, h))
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-display text-sm font-semibold text-navy",
					children: "Never used"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Raw message counts or mailbox telemetry" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hidden engagement or networking rankings" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Individual collaboration scores" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Content the viewer is not permissioned to see" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: result.live ? "This answer was generated live over the synthetic graph." : "This answer is an authored demo scenario grounded in the synthetic graph."
				})
			]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-semibold text-navy",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
function SystemFlow({ systems }) {
	if (!systems.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
		children: systems.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl bg-card p-3.5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold text-navy",
				children: s.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: s.summary
			})]
		}, s.id))
	});
}
var colors = {
	teal: "bg-teal",
	blue: "bg-blue",
	navy: "bg-navy",
	amber: "bg-amber",
	sap: "bg-sap"
};
function PersonMark({ person, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid shrink-0 place-items-center rounded-md font-display font-bold text-white", colors[person.color], size === "sm" && "size-8 text-[10px] rounded-[8px]", size === "md" && "size-11 text-sm rounded-[10px]", size === "lg" && "size-14 text-base rounded-xl"),
		children: person.initials
	});
}
function AskView() {
	const personaId = useAppStore((s) => s.personaId);
	const trust = useAppStore((s) => s.trust);
	const suggestions = suggestedQuestions(personaId);
	const [question, setQuestion] = (0, import_react.useState)(suggestions[0] ?? "");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		run(suggestions[0] ?? question);
	}, [
		personaId,
		trust.shareCareerHistory,
		trust.shareReferences
	]);
	async function run(q) {
		const text = q.trim();
		if (!text) return;
		setQuestion(text);
		setLoading(true);
		setResult(null);
		try {
			const authored = matchAuthored(text);
			if (authored) setResult(materializeAuthored(text, authored, trust, personaId));
			else {
				const live = await askOrganization({ data: {
					question: text,
					personaId,
					trust
				} });
				setResult(live);
			}
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-navy",
				children: "Ask the organization"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Get a cited answer across people, systems, and institutional history — then a recommended next step. Not a search box."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					run(question);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "Why is this system this way?",
					"aria-label": "Ask the organization"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "sm:w-28",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Ask"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void run(s),
					className: "rounded-full bg-navy-soft px-3 py-1.5 text-left text-xs font-semibold text-navy hover:bg-navy hover:text-white",
					children: s
				}, s))
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Reading permissioned sources, then checking for conflicts…"
			}) : null,
			result?.refusal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-amber-soft px-4 py-3 text-sm text-amber",
				children: result.refusal
			}) : null,
			result && !result.refusal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Short answer" }), result.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1 size-3" }), "Live over graph"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "teal",
								children: "Authored demo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] leading-relaxed text-ink",
							children: result.shortAnswer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border-l-4 border-blue bg-navy-soft/60 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wide text-navy",
								children: "Recommended next step"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-ink",
								children: result.nextStep
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDrawer(true),
							className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }),
								"Why you can trust this",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold text-navy",
							children: "Confidence & provenance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: result.confidence === "high" ? "teal" : "amber",
									children: [result.confidence, " confidence"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
									result.sources.length,
									" source",
									result.sources.length === 1 ? "" : "s"
								] }),
								result.sources.some((s) => s.stale) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "amber",
									children: "Stale source flagged"
								}) : null
							]
						}),
						result.conflict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 rounded-lg bg-amber-soft px-3 py-2 text-sm text-amber",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Conflict. "
								}),
								result.conflict.summary,
								" ",
								result.conflict.authoritative
							]
						}) : null,
						result.hiddenByTrust.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-muted",
							children: result.hiddenByTrust[0]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sources: result.sources })
						})
					]
				})]
			}) : null,
			result && !result.refusal && result.systems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-base font-semibold text-navy",
					children: "System context"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemFlow, { systems: result.systems })]
			}) : null,
			result && !result.refusal && result.people.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-base font-semibold text-navy",
					children: "People to involve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: result.people.map(({ person, reason }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, { person }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-ink",
								children: person.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									person.title,
									" · ",
									reason
								]
							})]
						})]
					}, person.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceDrawer, {
				open: drawer,
				onOpenChange: setDrawer,
				result
			})
		]
	});
}
function WarmPathMap({ hops, viewerId, emptyHint }) {
	if (!hops.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl bg-paper px-4 py-6 text-sm text-muted",
		children: emptyHint ?? "No permissioned warm path. You can still request an introduction through the person’s manager."
	});
	const nodes = [hops[0].fromId, ...hops.map((h) => h.toId)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2 lg:flex-row lg:items-stretch",
			children: nodes.map((id, i) => {
				const person = personById[id];
				const hop = hops[i];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-border)]",
						children: [person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {
							person,
							size: "sm"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold text-navy",
								children: id === viewerId ? "You" : person?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] text-muted",
								children: person?.title
							})]
						})]
					}), hop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-1 text-[11px] font-semibold text-muted lg:max-w-[140px] lg:flex-col lg:text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 shrink-0 rotate-90 lg:rotate-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hop.label })]
					}) : null]
				}, `${id}-${i}`);
			})
		})
	});
}
var DEFAULT_Q$1 = "Who understands connected-device telemetry and utility digital platforms?";
function ExpertView() {
	const personaId = useAppStore((s) => s.personaId);
	const trust = useAppStore((s) => s.trust);
	const [query, setQuery] = (0, import_react.useState)(DEFAULT_Q$1);
	const [active, setActive] = (0, import_react.useState)(DEFAULT_Q$1);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const { hits, hiddenByTrust } = (0, import_react.useMemo)(() => searchExperts(active, trust, personaId), [
		active,
		trust,
		personaId
	]);
	const selected = hits.find((h) => h.person.id === selectedId) ?? hits[0];
	const path = selected ? warmPath(personaId, selected.person.id, trust) : {
		hops: [],
		hiddenByTrust: []
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-navy",
				children: "Find relevant expertise"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Expertise from current work, documents, and opted-in prior history. Fit labels are qualitative — never a score."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					setActive(query);
					setSelectedId(null);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					"aria-label": "Find expertise"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "sm:w-28",
					children: "Find"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					DEFAULT_Q$1,
					"Who owns OMS integration?",
					"Who should review customer-visible outage copy?"
				].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setQuery(q);
						setActive(q);
						setSelectedId(null);
					},
					className: "rounded-full bg-navy-soft px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white",
					children: q
				}, q))
			}),
			hiddenByTrust.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-paper px-4 py-3 text-sm text-muted",
				children: hiddenByTrust[0]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "rounded-2xl bg-card p-2 shadow-[var(--shadow-border)] sm:p-4",
					children: hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-8 text-sm text-muted",
						children: "No permissioned matches for that query."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelectedId(hit.person.id),
						className: "flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left hover:bg-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, { person: hit.person }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-ink",
									children: hit.person.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: hit.reason
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: hit.fit === "Warm path" ? "amber" : "teal",
								children: hit.fit
							})
						]
					}) }, hit.person.id)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold text-navy",
							children: "Recommended introduction path"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Named people and why the edge exists. No dates, no message counts, no strength scores."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmPathMap, {
								hops: path.hops,
								viewerId: personaId,
								emptyHint: `No warm path from ${personById[personaId]?.name ?? "you"} to ${selected.person.name} under current opt-in settings.`
							}) : null
						}),
						selected?.evidence.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-1 text-xs text-muted",
							children: selected.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", e] }, e))
						}) : null
					]
				})]
			})
		]
	});
}
var DEFAULT_Q = "We want to replace the customer notification vendor API.";
function ImpactView() {
	const [query, setQuery] = (0, import_react.useState)(DEFAULT_Q);
	const [active, setActive] = (0, import_react.useState)(DEFAULT_Q);
	const result = (0, import_react.useMemo)(() => analyzeImpact(active), [active]);
	const sources = result.sourceIds.map((id) => documentById[id]).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-navy",
				children: "Impact analysis"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "See systems, teams, owners, and historical decisions before you act."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					setActive(query);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					"aria-label": "Analyze impact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "sm:w-28",
					children: "Analyze"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					DEFAULT_Q,
					"We want to change the outage map legend and ETR copy.",
					"Add a new connected-device telemetry class."
				].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setQuery(q);
						setActive(q);
					},
					className: "rounded-full bg-navy-soft px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white",
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] leading-relaxed text-ink",
							children: result.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
									n: result.counts.systems,
									label: "Systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
									n: result.counts.teams,
									label: "Teams"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
									n: result.counts.contracts,
									label: "Contracts"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
									n: result.counts.privacy,
									label: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
									n: result.counts.decisions,
									label: "Decisions"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									title: "Systems",
									body: result.systems.map((s) => s.name).join(", ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									title: "Teams",
									body: result.teams.join(", ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
									title: "Owners",
									body: result.owners.map((o) => o.name.split(" ")[0]).join(", ")
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold text-navy",
							children: "Required conversations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1.5 text-sm text-muted",
							children: result.conversations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", c] }, c))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-amber-soft p-5 text-amber",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold",
							children: "Historical context"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: result.historical
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-base font-semibold text-navy",
						children: "Affected systems"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemFlow, { systems: result.systems }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 mt-6 font-display text-base font-semibold text-navy",
						children: "Owners"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2",
						children: result.owners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl bg-paper px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {
								person: p,
								size: "sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-ink",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: p.title
							})] })]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "navy",
							children: "Sources"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sources })
						})]
					})
				]
			})
		]
	});
}
function Count({ n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-navy-soft px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold tabular-nums text-navy",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
function Fact({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-navy",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-ink",
			children: body
		})]
	});
}
function LearnView() {
	const personaId = useAppStore((s) => s.personaId);
	const plan = onboardingByPersona[personaId] ?? onboardingByPersona.mc;
	const persona = personById[personaId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-navy",
				children: plan.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: plan.subtitle
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-4 text-xs font-semibold uppercase tracking-wide text-muted",
						children: [
							"For ",
							persona?.name,
							" · ",
							persona?.personaLabel
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-4",
						children: plan.phases.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[7rem_1fr] gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold text-navy",
								children: p.when
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ink",
								children: p.what
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 overflow-hidden rounded-full bg-paper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full origin-left rounded-full bg-blue",
									style: { width: `${p.progress}%` }
								})
							})] })]
						}, p.when))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold text-navy",
							children: "Suggested people to meet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: plan.peopleToMeet.map((m) => {
								const person = personById[m.personId];
								if (!person) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {
										person,
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-ink",
										children: person.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: m.why
									})] })]
								}, m.personId);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-xl bg-amber-soft px-3 py-2.5 text-xs leading-relaxed text-amber",
							children: plan.note
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold text-navy",
						children: "Acronym glossary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: plan.acronyms.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "navy",
							children: a.term
						}, a.term))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: plan.acronyms.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-paper px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-sm font-semibold text-navy",
								children: a.term
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-0.5 text-xs leading-relaxed text-muted",
								children: a.meaning
							})]
						}, a.term))
					})
				]
			})
		]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-line transition-colors data-[state=checked]:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[22px]" })
	});
}
var BLOCKED = [
	"No individual collaboration scores.",
	"No hidden engagement rankings.",
	"No raw message-count exposure.",
	"No management dashboard that rates employee networking.",
	"No retrieval of sensitive content before permission checks."
];
function TrustView() {
	const trust = useAppStore((s) => s.trust);
	const setTrust = useAppStore((s) => s.setTrust);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-navy",
				children: "Employee data controls"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Use organizational data to increase employee agency, not to rank, monitor, or evaluate people. These toggles change Find Expert, warm paths, and Ask answers in this demo."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassCard, {
						title: "Employer-authoritative",
						body: "Role, manager, team, permissions, application ownership. Always available to permissioned employees."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassCard, {
						title: "Employee-contributed",
						body: "Resume, prior employers, references, external profile imports. Opt-in, labeled, minimum useful insight."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassCard, {
						title: "AI-inferred",
						body: "Likely expertise, source confidence, possible relationship paths. Always labeled as inferred."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold text-navy",
						children: "Visibility for contributed data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 divide-y divide-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "Prior-career history",
								body: "Nautilus tenure, connected-device expertise, internal transfers’ previous teams.",
								checked: trust.shareCareerHistory,
								onCheckedChange: (v) => setTrust({ shareCareerHistory: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "References and referrals",
								body: "Allows “Robert listed Brendan as a reference.” Never exposes the reference letter.",
								checked: trust.shareReferences,
								onCheckedChange: (v) => setTrust({ shareReferences: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "External profile imports",
								body: "LinkedIn-style imports. Off by default in production; on here so you can see the control.",
								checked: trust.shareExternalProfiles,
								onCheckedChange: (v) => setTrust({ shareExternalProfiles: v })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl bg-navy-soft px-4 py-3 text-sm text-navy",
						children: "Visibility rule: career history and references must be opt-in, label provenance, and expose the minimum useful relationship insight."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold text-navy",
					children: "Blocked product behaviors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-ink",
					children: BLOCKED.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 text-teal",
							children: "—"
						}), b]
					}, b))
				})]
			})
		]
	});
}
function ClassCard({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-sm font-semibold text-navy",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function ToggleRow({ title, body, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start justify-between gap-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-ink",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-relaxed text-muted",
			children: body
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange,
			"aria-label": title
		})]
	});
}
var NAV = [
	{
		id: "ask",
		label: "Ask",
		icon: MessageSquare
	},
	{
		id: "expert",
		label: "Find Expert",
		icon: Users
	},
	{
		id: "impact",
		label: "Impact Map",
		icon: GitBranch
	},
	{
		id: "learn",
		label: "Onboarding",
		icon: GraduationCap
	},
	{
		id: "trust",
		label: "Trust Controls",
		icon: ShieldCheck
	}
];
function ModuleShell() {
	const tab = useAppStore((s) => s.tab);
	const setTab = useAppStore((s) => s.setTab);
	const persona = personById[useAppStore((s) => s.personaId)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 min-w-0 flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "relative hidden w-[232px] shrink-0 flex-col bg-navy px-3 py-5 text-white lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold leading-none tracking-tight",
							children: "All-Aboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-white/70",
							children: "Organizational navigation"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-6 flex flex-col gap-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTab(item.id),
							className: cn("flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold", tab === item.id ? "bg-white text-navy" : "text-white/85 hover:bg-white/10"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto border-t border-white/20 px-2 pt-4 text-[11px] leading-relaxed text-white/75",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-white",
								children: "Employee Trust Principle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Use organizational data to increase employee agency, not to rank, monitor, or evaluate employees."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold text-navy sm:text-base",
							children: "Northline Energy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: "Synthetic utility · module hosted in your enterprise platform"
						})]
					}), persona ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {
							person: persona,
							size: "sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold leading-tight text-ink",
								children: persona.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted",
								children: [
									persona.title,
									" · ",
									persona.team
								]
							})]
						})]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-24 sm:px-6 lg:pb-8",
					children: [
						tab === "ask" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskView, {}) : null,
						tab === "expert" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertView, {}) : null,
						tab === "impact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactView, {}) : null,
						tab === "learn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnView, {}) : null,
						tab === "trust" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustView, {}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-card lg:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTab(item.id),
					className: cn("flex h-14 min-h-11 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold", tab === item.id ? "text-navy" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label.split(" ")[0]]
				}, item.id))
			})
		]
	});
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 200,
		children
	});
}
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoToolbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShell, {}) })]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
