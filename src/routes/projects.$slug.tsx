import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImagePlus, Target, Users, Map, Workflow, Layers, Smartphone, Sparkles, Lightbulb, ClipboardCheck, ScanEye } from "lucide-react";
import type { ReactNode } from "react";
import { MultiCursor } from "@/components/canvas/MultiCursor";
import { Section } from "@/components/canvas/Section";
import { Draggable } from "@/components/canvas/Draggable";
import { TopBar } from "@/components/canvas/TopBar";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const i = PROJECTS.findIndex((p) => p.slug === params.slug);
    if (i < 0) throw notFound();
    return { index: i };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? PROJECTS[loaderData.index] : undefined;
    const title = p ? `${p.title} case study — Ana Luisa Silva` : "Case study — Ana Luisa Silva";
    const desc = p ? p.summary : "A case study by Ana Luisa Silva.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center p-8 text-center">
      <div className="sticky-note bg-sticky-yellow p-8">
        <p className="font-hand text-3xl">This folder is empty</p>
        <Link to="/" className="mt-4 inline-block font-semibold underline">Back to the board</Link>
      </div>
    </main>
  ),
  errorComponent: () => <main className="p-8">Something went wrong. <Link to="/" className="underline">Back to the board</Link></main>,
});

/** Screenshot slot: shows the image when given, otherwise a dashed "drop here" frame. */
function Shot({ label, img, ratio = "aspect-video" }: { label: string; img?: string | undefined; ratio?: string }) {
  return (
    <figure>
      <div className={`${ratio} grid place-items-center overflow-hidden rounded-lg border-2 border-dashed border-ink/25 bg-card`}>
        {img ? <img src={img} alt={label} loading="lazy" className="size-full object-cover" /> : (
          <span className="flex flex-col items-center gap-1 p-3 text-center text-muted-foreground"><ImagePlus className="h-6 w-6" aria-hidden="true" /><span className="font-hand text-xl">{label}</span><span className="text-xs">screenshot here</span></span>
        )}
      </div>
      <figcaption className="mt-2 text-sm font-medium text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

function Heading({ Icon, children }: { Icon: typeof Target; children: ReactNode }) {
  return <h3 className="mb-4 flex items-center gap-2 text-xl font-bold"><Icon className="h-5 w-5" aria-hidden="true" />{children}</h3>;
}

const CLUSTER_COLORS = ["bg-sticky-pink", "bg-sticky-green", "bg-sticky-blue", "bg-sticky-violet"];

function CaseStudy() {
  const { index } = Route.useLoaderData();
   const p = PROJECTS[index];
   const next = PROJECTS[(index + 1) % PROJECTS.length];
   if (!p || !next) return null;

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <MultiCursor />
      <TopBar name="Ana Luisa Silva" base="/" />

      <main id="main" className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-32 pt-10 sm:px-8">
        <Link to="/" hash="projects" className="inline-flex w-fit items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-sticky hover:-translate-y-0.5"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects</Link>

        {/* Overview */}
        <Section id="overview" title={`📁 ${p.title}`} tab={p.color}>
          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <img src={p.img} alt={`Cover of ${p.title}`} width={944} height={704} className="w-full -rotate-1 rounded-lg object-cover shadow-float" />
            <div>
              <p className="font-hand text-2xl text-cursor">Case study · {p.year}</p>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">{p.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{p.summary}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {[["Role", p.role], ["Timeline", p.timeline], ["Team", p.team]].map(([k, v]) => (
                  <div key={k} className="sticky-note bg-sticky-yellow p-3"><dt className="text-xs font-bold uppercase">{k}</dt><dd className="mt-1 text-sm">{v}</dd></div>
                ))}
              </dl>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used">{p.stack.map((s) => <li key={s} className="rounded-full bg-card px-3 py-1 text-xs font-semibold shadow-sticky">{s}</li>)}</ul>
            </div>
          </div>
        </Section>

        {/* Problem */}
        <Section id="problem" title="🎯 Problem statement" tab="bg-sticky-orange">
          <div className="grid gap-6 md:grid-cols-2">
            <Draggable label="The problem" rotate={-1.5} className="bg-sticky-orange p-6"><p className="font-hand text-2xl">The problem</p><p className="mt-2">{p.problem}</p></Draggable>
            <Draggable label="How might we" rotate={1.5} className="bg-sticky-yellow p-6"><p className="font-hand text-2xl">How might we…</p><p className="mt-2 text-lg font-semibold">{p.hmw}</p></Draggable>
          </div>
        </Section>

        {/* Research */}
        <Section id="research" title="🧠 User research" tab="bg-sticky-pink">
          <Heading Icon={Lightbulb}>What I learned from users</Heading>
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <li key={i}>
                <Draggable label={`User insight ${i + 1}`} rotate={i % 2 ? 1.5 : -1.5} className={`${CLUSTER_COLORS[i % CLUSTER_COLORS.length]} min-h-40 p-5`}>
                  <span className="sr-only">User insight {i + 1}</span>
                </Draggable>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="heuristics" title="📋 Heuristic evaluation" tab="bg-sticky-orange">
          <Heading Icon={ClipboardCheck}>Heuristic evaluation</Heading>
          <div className="grid gap-6 md:grid-cols-2">
            <Shot label="Evaluation findings & severity" />
            <Shot label="Annotated screens & recommendations" />
          </div>
        </Section>

        <Section id="competitive-analysis" title="🔎 Visual competitive analysis" tab="bg-sticky-blue">
          <Heading Icon={ScanEye}>Visual competitive analysis</Heading>
          <div className="grid gap-6 sm:grid-cols-3">
            <Shot label="Competitor 01" />
            <Shot label="Competitor 02" />
            <Shot label="Competitor 03" />
          </div>
          <div className="mt-8"><Shot label="Visual comparison & key takeaways" /></div>
        </Section>

        {/* Personas */}
        <Section id="personas" title="👤 User personas" tab="bg-sticky-violet">
          <Heading Icon={Users}>Who I designed for</Heading>
          <div className="grid gap-6 md:grid-cols-2">
            {p.personas.map((pe, i) => (
              <article key={i} className="rounded-xl bg-card p-5 shadow-sticky">
                <div className="flex items-center gap-4">
                  <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-muted font-hand text-lg text-muted-foreground">{pe.img ? <img src={pe.img} alt={pe.name} className="size-full object-cover" /> : "photo"}</div>
                  <div><h4 className="text-lg font-bold">{pe.name}</h4><p className="text-sm text-muted-foreground">{pe.age} · {pe.job}</p></div>
                </div>
                <blockquote className="mt-4 font-hand text-2xl">“{pe.quote}”</blockquote>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="sticky-note bg-sticky-green p-3"><p className="text-xs font-bold uppercase">Goals</p><ul className="mt-1 list-disc pl-4 text-sm">{pe.goals.map((g) => <li key={g}>{g}</li>)}</ul></div>
                  <div className="sticky-note bg-sticky-pink p-3"><p className="text-xs font-bold uppercase">Frustrations</p><ul className="mt-1 list-disc pl-4 text-sm">{pe.frustrations.map((g) => <li key={g}>{g}</li>)}</ul></div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Journey */}
        <Section id="journey" title="🗺️ User journey" tab="bg-sticky-blue">
          <Heading Icon={Map}>The journey, step by step</Heading>
          <div className="overflow-x-auto" tabIndex={0} aria-label="User journey table, scroll sideways">
            <table className="w-full min-w-[720px] border-separate border-spacing-2 text-sm">
              <thead><tr><th className="w-28" />{p.journey.map((j) => <th key={j.stage} scope="col" className="rounded-md bg-ink p-2 text-card">{j.stage}</th>)}</tr></thead>
              <tbody>
                {([["Doing", "doing", "bg-sticky-yellow"], ["Thinking", "thinking", "bg-sticky-blue"], ["Feeling", "feeling", "bg-card"], ["Opportunity", "opportunity", "bg-sticky-green"]] as const).map(([label, key, c]) => (
                  <tr key={key}>
                    <th scope="row" className="text-left font-bold">{label}</th>
                    {p.journey.map((j) => <td key={j.stage} className={`sticky-note p-3 align-top ${c} ${key === "feeling" ? "text-center text-3xl" : ""}`}>{j[key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Flow */}
        <Section id="flow" title="🔀 User flow" tab="bg-sticky-green">
          <Heading Icon={Workflow}>The main path</Heading>
          <ol className="flex flex-wrap items-center gap-3">
            {p.flow.map((s, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`px-4 py-3 font-semibold shadow-sticky ${i === 0 || i === p.flow.length - 1 ? "rounded-full bg-sticky-violet" : "rounded-md bg-card"}`}>{s}</span>
                {i < p.flow.length - 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="mt-8"><Shot label="Full user flow diagram" /></div>
        </Section>

        {/* Mid-fi */}
        <Section id="midfi" title="✏️ Mid-fi wireframes" tab="bg-sticky-yellow">
          <Heading Icon={Layers}>Sketching the structure</Heading>
          <div className="grid gap-6 sm:grid-cols-3">{p.midfi.map((s) => <Shot key={s.label} label={s.label} img={s.img} ratio="aspect-[9/16]" />)}</div>
        </Section>

        {/* Hi-fi */}
        <Section id="hifi" title="✨ Hi-fi prototype" tab="bg-sticky-pink">
          <Heading Icon={Smartphone}>The final design</Heading>
          <div className="grid gap-8 sm:grid-cols-3">
            {p.hifi.map((s) => (
              <div key={s.label} className="rounded-[2rem] bg-ink p-2 shadow-float"><div className="overflow-hidden rounded-[1.6rem]"><Shot label={s.label} img={s.img} ratio="aspect-[9/19]" /></div></div>
            ))}
          </div>
          <a href={p.prototypeUrl ?? "#"} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Open the prototype <ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only">(opens in new tab)</span></a>
        </Section>

        {/* Outcomes */}
        <Section id="outcomes" title="🏁 Results & learnings" tab="bg-sticky-violet">
          <div className="grid gap-8 md:grid-cols-2">
            <div><Heading Icon={Sparkles}>Outcomes</Heading><ul className="grid gap-3">{p.outcomes.map((o, i) => <li key={i}><Draggable label={o} rotate={i % 2 ? 1 : -1} className="bg-sticky-green p-4">{o}</Draggable></li>)}</ul></div>
            <div><Heading Icon={Target}>What I learned</Heading><ul className="grid gap-3">{p.learnings.map((o, i) => <li key={i}><Draggable label={o} rotate={i % 2 ? -1 : 1} className="bg-sticky-yellow p-4">{o}</Draggable></li>)}</ul></div>
          </div>
        </Section>

        <Link to="/projects/$slug" params={{ slug: next.slug }} className={`sticky-note group flex items-center justify-between gap-4 p-6 ${next.color}`}>
          <span><span className="font-hand text-2xl">Next folder</span><span className="block text-2xl font-bold">{next.title}</span></span>
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </main>
    </>
  );
}
