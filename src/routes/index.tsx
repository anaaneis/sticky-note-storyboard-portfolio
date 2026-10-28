import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Folder, Hand, StickyNote, Square, Type, Mail, Linkedin, Github, ArrowUpRight, X, BookOpen, Camera, PawPrint, Coffee, Code2, PenTool, PencilRuler, Users, FlaskConical, Network, Heart, Triangle, type LucideIcon } from "lucide-react";
import { MultiCursor } from "@/components/canvas/MultiCursor";
import { DrawLayer } from "@/components/canvas/DrawLayer";
import { Draggable } from "@/components/canvas/Draggable";
import { Section } from "@/components/canvas/Section";
import { Polaroid } from "@/components/canvas/Polaroid";
import { TopBar } from "@/components/canvas/TopBar";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ana Luisa Silva — Portfolio board" },
      { name: "description", content: "Ana Luisa Silva's interactive whiteboard portfolio: projects, story, photography, tools, experience and contact." },
      { property: "og:title", content: "Ana Luisa Silva — Portfolio board" },
      { property: "og:description", content: "An interactive whiteboard-style portfolio by Ana Luisa Silva." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "Ana Luisa Silva";

const TOOL_GROUPS: {
  group: string;
  tab: string;
  items: { name: string; note: string; slug?: string; Icon?: LucideIcon; c: string }[];
}[] = [
  {
    group: "CODE",
    tab: "bg-sticky-blue",
    items: [
      { name: "React", slug: "react", note: "Front-end", c: "bg-sticky-blue" },
      { name: "HTML", slug: "html5", note: "Markup", c: "bg-sticky-orange" },
      { name: "CSS", slug: "css", note: "Styling", c: "bg-sticky-orange" },
      { name: "JavaScript", slug: "javascript", note: "Language", c: "bg-sticky-yellow" },
      { name: "Tailwind", slug: "tailwindcss", note: "Styling", c: "bg-sticky-green" },
      { name: "Git", slug: "git", note: "Versioning", c: "bg-sticky-pink" },
      { name: "VS Code", Icon: Code2, note: "Editor", c: "bg-sticky-violet" },
    ],
  },
  {
    group: "DESIGN",
    tab: "bg-sticky-pink",
    items: [
      { name: "Figma", slug: "figma", note: "Design tool", c: "bg-sticky-pink" },
      { name: "Framer", slug: "framer", note: "Design & build", c: "bg-sticky-violet" },
      { name: "Prototyping", Icon: PenTool, note: "Click & flow", c: "bg-sticky-yellow" },
      { name: "Wireframing", Icon: PencilRuler, note: "Low-fi first", c: "bg-sticky-blue" },
      { name: "User research & personas", Icon: Users, note: "Understand people", c: "bg-sticky-green" },
      { name: "Usability testing", Icon: FlaskConical, note: "Test with users", c: "bg-sticky-orange" },
      { name: "Information architecture", Icon: Network, note: "Structure", c: "bg-sticky-violet" },
    ],
  },
  {
    group: "AI tools",
    tab: "bg-sticky-green",
    items: [
      { name: "Claude", slug: "claude", note: "AI assistant", c: "bg-sticky-yellow" },
      { name: "Lovable", Icon: Heart, note: "App building", c: "bg-sticky-pink" },
      { name: "v0 by Vercel", Icon: Triangle, note: "AI UI generation", c: "bg-sticky-blue" },
    ],
  },
];

const EXPERIENCE = [
  { role: "Your role", org: "Company name", when: "2024 — now", text: "What you did, what you learned, an achievement you are proud of.", c: "bg-sticky-yellow", skills: ["Communication", "Teamwork", "Problem solving"] },
  { role: "Your role", org: "Company name", when: "2022 — 2024", text: "What you did, what you learned, an achievement you are proud of.", c: "bg-sticky-blue", skills: ["Time management", "Presentation skills", "Feedback"] },
  { role: "Internship / Studies", org: "School or company", when: "2020 — 2022", text: "What you did, what you learned, an achievement you are proud of.", c: "bg-sticky-pink", skills: ["Adaptability", "Research", "Collaboration"] },
];

const NAV = [
  { href: "#hi", label: "Hi", Icon: Hand },
  { href: "#projects", label: "Projects", Icon: Folder },
  { href: "#about", label: "About", Icon: StickyNote },
  { href: "#tech", label: "Tools", Icon: Square },
  { href: "#experience", label: "Experience", Icon: Type },
  { href: "#contact", label: "Contact", Icon: Mail },
];

function Index() {
  const [open, setOpen] = useState<number | null>(null);
  const [waves, setWaves] = useState(0);
  const proj = open !== null ? PROJECTS[open] : undefined;

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <MultiCursor />
      <DrawLayer />
      <TopBar name={NAME} />

      <main id="main" className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-40 pt-14 sm:px-8">
        {/* HI */}
        <Section id="hi" title="👋 Say hi" tab="bg-sticky-yellow">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <Polaroid caption="that's me!" cursor="that's me" rotate={-3} className="mx-auto w-60" />
            <div>
              <p className="font-hand text-3xl text-cursor">Hi there, I'm</p>
              <h1 className="mt-1 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">{NAME}</h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">Designer, developer & photographer who loves turning messy ideas into clear, friendly and accessible products.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button onClick={() => setWaves((w) => w + 1)} className="rounded-full bg-sticky-yellow px-5 py-2.5 font-semibold text-ink shadow-sticky transition-transform hover:-translate-y-0.5">
                  Wave back <span className="animate-wave" aria-hidden="true">👋</span>
                </button>
                <span aria-live="polite" className="font-hand text-2xl text-muted-foreground">{waves > 0 && `${waves} wave${waves > 1 ? "s" : ""} received — thank you!`}</span>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Tip: click anywhere on the board to drop a reaction, and drag the sticky notes around.</p>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="📁 Projects" tab="bg-sticky-orange">
          <p className="mb-10 text-muted-foreground">Hover a folder to peek inside, click to open it.</p>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((p, i) => (
              <li key={p.title}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls="project-detail" className="group block w-full text-left">
                  <span className="relative block aspect-[4/3.2]">
                    {/* back + tab */}
                    <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-2/5 rounded-t-lg bg-folder-tab" />
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-4 rounded-lg rounded-tl-none bg-folder-tab" />
                    {/* peeking picture */}
                    <img src={p.img} alt="" width={944} height={704} loading="lazy"
                      className="absolute inset-x-4 top-7 h-3/5 w-[calc(100%-2rem)] rounded-md object-cover shadow-sticky transition-transform duration-300 group-hover:-translate-y-5 group-hover:-rotate-2 group-aria-expanded:-translate-y-5" />
                    {/* front */}
                    <span className="absolute inset-x-0 bottom-0 flex h-[55%] flex-col justify-end rounded-lg bg-folder p-3 shadow-sticky transition-transform duration-300 group-hover:skew-x-[-3deg] group-aria-expanded:ring-4 group-aria-expanded:ring-ring">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-ink">{p.title}</span>
                        <span className="text-xs font-medium text-ink/70">{p.year}</span>
                      </span>
                      <span className="mt-1 line-clamp-2 text-xs text-ink/80">{p.summary}</span>
                    </span>
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => <span key={s} className="rounded-full bg-card px-2 py-0.5 text-[11px] font-semibold shadow-sticky">{s}</span>)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div id="project-detail" aria-live="polite">
            {proj && (
              <article className={`sticky-note mt-10 grid animate-pop gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] ${proj.color}`}>
                <img src={proj.img} alt={`Preview of ${proj.title}`} width={944} height={704} className="w-full rounded-md object-cover shadow-sticky" />
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <button onClick={() => setOpen(null)} aria-label="Close project" className="grid h-9 w-9 place-items-center rounded-full bg-card"><X className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                  <p className="mt-2 text-sm font-medium">{proj.year}</p>
                  <h4 className="mt-4 text-sm font-bold uppercase tracking-wide">Quick summary</h4>
                  <p className="mt-1">{proj.summary}</p>
                  <h4 className="mt-4 text-sm font-bold uppercase tracking-wide">What I used</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">{proj.stack.map((t) => <li key={t} className="rounded-full bg-card px-3 py-1 text-xs font-semibold">{t}</li>)}</ul>
                  <Link to="/projects/$slug" params={{ slug: proj.slug }} className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 font-semibold text-card">Open case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </article>
            )}
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about" title="📝 About me" tab="bg-sticky-pink">
          <div className="grid gap-12">
            {/* Story + baby photo */}
            <div className="grid items-start gap-10 lg:grid-cols-[auto_1fr]">
              <div className="relative mx-auto">
                <Polaroid caption="baby me" cursor="baby me 🍼" rotate={-4} tape="bg-sticky-pink/80" className="w-56" />
                <span aria-hidden="true" className="absolute -right-10 -top-6 rotate-12 font-hand text-2xl text-cursor">where it all began ↙</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Draggable label="My story" rotate={-1.5} className="bg-sticky-yellow p-6 sm:col-span-2">
                  <h3 className="font-hand text-3xl">My story</h3>
                  <p className="mt-2">A few lines about where you grew up, how you got curious about design and technology, and the moment you knew this was your thing.</p>
                </Draggable>
                <Draggable label="What I care about" rotate={1.5} className="bg-sticky-violet p-6">
                  <h3 className="font-hand text-3xl">What I care about</h3>
                  <p className="mt-2">People, clarity, inclusion and craft.</p>
                </Draggable>
                <Draggable label="Right now" rotate={-1} className="bg-sticky-green p-6">
                  <h3 className="font-hand text-3xl">Right now</h3>
                  <p className="mt-2">What you are learning or working on at the moment.</p>
                </Draggable>
              </div>
            </div>

            {/* Photography */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold"><Camera className="h-5 w-5" aria-hidden="true" /> Through my lens</h3>
              <p className="mt-1 text-muted-foreground">I'm also a professional photographer — a few favourites.</p>
              <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {["Portrait", "Street", "Landscape", "Event", "Detail", "Travel", "Golden hour", "Film"].map((c, i) => (
                  <li key={c}><Polaroid caption={c} rotate={((i * 47) % 9) - 4} /></li>
                ))}
              </ul>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              {/* Hobbies */}
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold"><BookOpen className="h-5 w-5" aria-hidden="true" /> Things I love doing</h3>
                <ul className="mt-6 grid grid-cols-2 gap-5">
                  {[
                    { t: "Reading", d: "Currently reading: your book here.", Icon: BookOpen, c: "bg-sticky-orange", r: -2 },
                    { t: "Photography", d: "Always with a camera in my bag.", Icon: Camera, c: "bg-sticky-blue", r: 2 },
                    { t: "My animals", d: "Cuddles are mandatory.", Icon: PawPrint, c: "bg-sticky-pink", r: 1 },
                    { t: "Coffee walks", d: "Or your favourite hobby.", Icon: Coffee, c: "bg-sticky-yellow", r: -1.5 },
                  ].map(({ t, d, Icon, c, r }) => (
                    <li key={t}>
                      <Draggable label={t} rotate={r} className={`${c} h-full p-5`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                        <p className="mt-2 font-hand text-2xl">{t}</p>
                        <p className="text-sm">{d}</p>
                      </Draggable>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Animals */}
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold"><PawPrint className="h-5 w-5" aria-hidden="true" /> The loves of my life</h3>
                <p className="mt-1 text-muted-foreground">My animals — more than anything in the world. 💛</p>
                <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {["Pet name", "Pet name", "Pet name"].map((n, i) => (
                    <li key={i}><Polaroid caption={n} cursor="so cute 🐾" rotate={[3, -2, 4][i] ?? 0} tape="bg-sticky-yellow/80" /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* TECH — affinity diagram */}
        <Section id="tech" title="🧰 Tools & technologies" tab="bg-sticky-blue">
          <p className="mb-10 text-muted-foreground">An affinity diagram of my tools — big groups on the board, and every note can be dragged around.</p>
          <div className="grid gap-12 lg:grid-cols-3">
            {TOOL_GROUPS.map((g, gi) => (
              <div key={g.group} className="section-frame relative p-4 pt-10 sm:p-5">
                <h3 className={`sticky-note absolute -top-5 left-4 rounded-md px-4 py-1.5 font-hand text-2xl ${g.tab} ${gi % 2 ? "rotate-[1.5deg]" : "-rotate-2"}`}>{g.group}</h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {g.items.map((t, i) => (
                    <li key={t.name}>
                      <Draggable label={t.name} rotate={((i * 29) % 5) - 2} className={`${t.c} flex h-full flex-col items-center gap-2 p-4 text-center`}>
                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-sticky">
                          {t.slug ? (
                            <img src={`https://cdn.simpleicons.org/${t.slug}`} alt="" width={32} height={32} loading="lazy" draggable={false} className="h-8 w-8" />
                          ) : (
                            t.Icon && <t.Icon className="h-7 w-7" aria-hidden="true" />
                          )}
                        </span>
                        <span className="text-sm font-bold leading-tight">{t.name}</span>
                        <span className="-mt-1.5 text-[11px] text-ink/70">{t.note}</span>
                      </Draggable>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="🚀 Experience" tab="bg-sticky-green">
          <p className="mb-10 text-muted-foreground">Each role is a card on the board — inside, the soft skills I picked up there. Drag the little skill notes around.</p>
          <ol className="relative ml-3 border-l-2 border-dashed border-ink/30">
            {EXPERIENCE.map((e, i) => (
              <li key={e.when} className="relative mb-10 ml-8 last:mb-0">
                <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-card bg-primary shadow" />
                <div className="sticky-note relative rounded-xl bg-card p-5 pt-8 shadow-sticky sm:p-6 sm:pt-9">
                  <h3 className={`absolute -top-5 left-5 sticky-note rounded-md px-3 py-1 font-hand text-xl shadow-sticky ${e.c} ${i % 2 ? "rotate-[1.5deg]" : "-rotate-2"}`}>{e.when}</h3>
                  <p className="text-lg font-bold">{e.role} · <span className="font-medium text-muted-foreground">{e.org}</span></p>
                  <p className="mt-1 text-muted-foreground">{e.text}</p>
                  <h4 className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Soft skills I learned here</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {e.skills.map((s, si) => (
                      <li key={s}>
                        <Draggable label={s} rotate={((si * 7) % 5) - 2} className={`sticky-note rounded-lg px-3 py-1.5 text-xs font-semibold ${["bg-sticky-yellow", "bg-sticky-green", "bg-sticky-pink", "bg-sticky-blue", "bg-sticky-violet"][(si + i) % 5]}`}>
                          {s}
                        </Draggable>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          {/* Certifications */}
          <div className="section-frame relative mt-16 p-5 pt-12">
            <h3 className="sticky-note absolute -top-5 left-5 rounded-md bg-sticky-violet px-4 py-1.5 font-hand text-2xl shadow-sticky -rotate-2">🎓 Certifications</h3>
            <p className="mt-1 text-muted-foreground">Courses and certificates I collected along the way.</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[{ n: "Certificate name", org: "Who issued it", when: "2026", c: "bg-sticky-yellow" }, { n: "Certificate name", org: "Who issued it", when: "2025", c: "bg-sticky-blue" }, { n: "Certificate name", org: "Who issued it", when: "2025", c: "bg-sticky-pink" }, { n: "Certificate name", org: "Who issued it", when: "2024", c: "bg-sticky-green" }].map((cert, i) => (
                <li key={i}>
                  <Draggable label={cert.n} rotate={((i * 13) % 5) - 2} className={`${cert.c} h-full p-4`}>
                    <span aria-hidden="true" className="flex aspect-video items-center justify-center rounded-md border-2 border-dashed border-ink/30 bg-card/60">
                      <span className="px-2 text-center text-[11px] font-semibold text-ink/60">certificate image here</span>
                    </span>
                    <p className="mt-3 text-sm font-bold leading-tight">{cert.n}</p>
                    <p className="text-xs text-ink/70">{cert.org} · {cert.when}</p>
                  </Draggable>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="💌 Get in touch" tab="bg-sticky-violet">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-4xl font-extrabold tracking-tight">Let's make something together.</p>
              <p className="mt-3 text-muted-foreground">Open to new projects, collaborations and a good chat.</p>
            </div>
            <ul className="grid gap-3">
              {[
                { href: "mailto:hello@example.com", label: "hello@example.com", Icon: Mail, c: "bg-sticky-yellow" },
                { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin, c: "bg-sticky-blue" },
                { href: "https://github.com", label: "GitHub", Icon: Github, c: "bg-sticky-green" },
              ].map(({ href, label, Icon, c }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`sticky-note flex items-center gap-3 p-4 font-semibold transition-transform hover:-translate-y-0.5 hover:rotate-1 ${c}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" /> {label}
                    {href.startsWith("http") && <span className="sr-only">(opens in new tab)</span>}
                    <ArrowUpRight className="ml-auto h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <nav aria-label="Quick jump" className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <ul className="flex items-center gap-1 rounded-2xl bg-card p-1.5 shadow-float">
          {NAV.map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} className="flex min-h-11 min-w-11 flex-col items-center justify-center rounded-xl px-2 text-[11px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="hidden sm:block">{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
