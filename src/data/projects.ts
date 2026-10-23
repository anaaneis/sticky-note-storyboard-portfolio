import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

/** Add real screenshots by importing images and setting the `img` fields below. */
export type Persona = { name: string; age: string; job: string; quote: string; goals: string[]; frustrations: string[]; img?: string };
export type JourneyStage = { stage: string; doing: string; thinking: string; feeling: "😀" | "🙂" | "😐" | "😕" | "😣"; opportunity: string };
export type Cluster = { title: string; notes: string[] };

export type Project = {
  slug: string; title: string; year: string; img: string; summary: string; stack: string[]; color: string;
  role: string; timeline: string; team: string;
  problem: string; hmw: string;
  clusters: Cluster[];
  personas: Persona[];
  journey: JourneyStage[];
  flow: string[];
  midfi: { label: string; img?: string }[];
  hifi: { label: string; img?: string }[];
  prototypeUrl?: string;
  outcomes: string[];
  learnings: string[];
};

const template = {
  role: "UX/UI Designer", timeline: "8 weeks", team: "Solo project",
  problem: "Describe the problem in one or two sentences: who is struggling, with what, and why it matters.",
  hmw: "How might we help [user] do [goal] without [pain point]?",
  clusters: [
    { title: "Pain points", notes: ["Insight from interview", "Something users repeated", "A frustrating moment"] },
    { title: "Needs", notes: ["What users want", "A must-have", "A nice-to-have"] },
    { title: "Behaviours", notes: ["How they do it today", "Workaround they use", "Tool they rely on"] },
    { title: "Quotes", notes: ["\u201cA real quote\u201d", "\u201cAnother quote\u201d"] },
  ],
  personas: [
    { name: "Persona name", age: "28", job: "Occupation", quote: "A quote that sums up how they feel.", goals: ["Main goal", "Secondary goal"], frustrations: ["Main frustration", "Another one"] },
    { name: "Persona name", age: "45", job: "Occupation", quote: "A quote that sums up how they feel.", goals: ["Main goal", "Secondary goal"], frustrations: ["Main frustration", "Another one"] },
  ],
  journey: [
    { stage: "Discover", doing: "What they do", thinking: "What they think", feeling: "🙂", opportunity: "Design opportunity" },
    { stage: "Explore", doing: "What they do", thinking: "What they think", feeling: "😐", opportunity: "Design opportunity" },
    { stage: "Decide", doing: "What they do", thinking: "What they think", feeling: "😣", opportunity: "Design opportunity" },
    { stage: "Use", doing: "What they do", thinking: "What they think", feeling: "😕", opportunity: "Design opportunity" },
    { stage: "Return", doing: "What they do", thinking: "What they think", feeling: "😀", opportunity: "Design opportunity" },
  ] as JourneyStage[],
  flow: ["Open app", "Sign in", "Home", "Choose task", "Confirm", "Done 🎉"],
  midfi: [{ label: "Home wireframe" }, { label: "Detail wireframe" }, { label: "Checkout wireframe" }],
  hifi: [{ label: "Home screen" }, { label: "Detail screen" }, { label: "Success screen" }],
  outcomes: ["A result with a number, e.g. 30% faster task time", "What users said in testing", "What shipped"],
  learnings: ["Something you'd do differently", "A skill you grew", "A surprise from research"],
};

export const PROJECTS: Project[] = [
  { slug: "project-one", title: "Project One", year: "2026", img: p1, summary: "A dashboard that helps teams track their work at a glance.", stack: ["Figma", "React", "TypeScript"], color: "bg-sticky-yellow", ...template },
  { slug: "project-two", title: "Project Two", year: "2025", img: p2, summary: "A friendly wellness app designed mobile-first.", stack: ["Figma", "Tailwind"], color: "bg-sticky-pink", ...template },
  { slug: "project-three", title: "Project Three", year: "2025", img: p3, summary: "A full brand identity for a small sustainable business.", stack: ["Figma", "Photography"], color: "bg-sticky-green", ...template },
  { slug: "project-four", title: "Project Four", year: "2024", img: p4, summary: "Turning messy data into clear, accessible charts.", stack: ["React", "Node.js", "Git"], color: "bg-sticky-blue", ...template },
];
