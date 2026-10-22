import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Folder, FolderOpen, Hand, MousePointer2, StickyNote, Square, Type, Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { MultiCursor } from "@/components/canvas/MultiCursor";
import { Draggable } from "@/components/canvas/Draggable";
import { Section } from "@/components/canvas/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ana Luisa Silva — Portfolio board" },
      { name: "description", content: "Ana Luisa Silva's interactive whiteboard portfolio: projects, story, tools, experience and contact." },
      { property: "og:title", content: "Ana Luisa Silva — Portfolio board" },
      { property: "og:description", content: "An interactive whiteboard-style portfolio by Ana Luisa Silva." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "Ana Luisa Silva";

const PROJECTS = [
  { title: "Project One", year: "2026", tags: ["Web app", "React"], desc: "A short description of what this project is, the problem it solves and your role in it.", color: "bg-sticky-yellow" },
  { title: "Project Two", year: "2025", tags: ["Design", "Mobile"], desc: "A short description of what this project is, the problem it solves and your role in it.", color: "bg-sticky-pink" },
  { title: "Project Three", year: "2025", tags: ["Branding"], desc: "A short description of what this project is, the problem it solves and your role in it.", color: "bg-sticky-green" },
  { title: "Project Four", year: "2024", tags: ["Data", "Dashboard"], desc: "A short description of what this project is, the problem it solves and your role in it.", color: "bg-sticky-blue" },
];

const TECH = [
  { name: "Figma", c: "bg-sticky-violet" }, { name: "React", c: "bg-sticky-blue" }, { name: "TypeScript", c: "bg-sticky-blue" },
  { name: "HTML & CSS", c: "bg-sticky-orange" }, { name: "Tailwind", c: "bg-sticky-green" }, { name: "Node.js", c: "bg-sticky-green" },
  { name: "Git", c: "bg-sticky-pink" }, { name: "Accessibility", c: "bg-sticky-yellow" },
];

const EXPERIENCE = [
  { role: "Your role", org: "Company name", when: "2024 — now", text: "What you did, what you learned, an achievement you are proud of." },
  { role: "Your role", org: "Company name", when: "2022 — 2024", text: "What you did, what you learned, an achievement you are proud of." },
  { role: "Internship / Studies", org: "School or company", when: "2020 — 2022", text: "What you did, what you learned, an achievement you are proud of." },
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

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <MultiCursor name={NAME.split(" ")[0] ?? NAME} />

      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-sticky">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-cursor text-sm font-bold text-cursor-foreground" aria-hidden="true">A</span>
          <span className="text-sm font-semibold">{NAME} <span className="text-muted-foreground">/ portfolio.jam</span></span>
        </div>
        <a href="#contact" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sticky hover:opacity-90">
          Share
        </a>
      </header>

      <main id="main" className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-40 pt-10 sm:px-8">
        {/* HI */}
        <Section id="hi" title="👋 Say hi" tab="bg-sticky-yellow">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <figure className="relative mx-auto w-60 rotate-[-3deg] bg-card p-3 pb-10 shadow-float">
              <div className="grid aspect-square place-items-center bg-muted text-center text-muted-foreground">
                {/* Replace with: <img src={photo} alt="Portrait of Ana Luisa Silva" className="size-full object-cover" /> */}
                <span className="font-hand text-2xl">your photo<br />goes here</span>
              </div>
              <figcaption className="mt-2 text-center font-hand text-2xl">that's me!</figcaption>
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-sticky-blue/70" />
            </figure>
            <div>
              <p className="font-hand text-3xl text-cursor">Hi there, I'm</p>
              <h1 className="mt-1 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">{NAME}</h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Designer & developer who loves turning messy ideas into clear, friendly and accessible products.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setWaves((w) => w + 1)}
                  className="rounded-full bg-sticky-yellow px-5 py-2.5 font-semibold text-ink shadow-sticky transition-transform hover:-translate-y-0.5"
                >
                  Wave back <span className="animate-wave" aria-hidden="true">👋</span>
                </button>
                <span aria-live="polite" className="font-hand text-2xl text-muted-foreground">
                  {waves > 0 && `${waves} wave${waves > 1 ? "s" : ""} received — thank you!`}
                </span>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Tip: click anywhere on the board to drop a reaction, and drag the sticky notes around.</p>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="📁 Projects" tab="bg-sticky-orange">
          <p className="mb-8 text-muted-foreground">Open a folder to peek inside.</p>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PROJECTS.map((p, i) => {
              const isOpen = open === i;
              return (
                <li key={p.title}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls="project-detail"
                    className="group flex w-full flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-accent aria-expanded:bg-accent"
                  >
                    {isOpen ? (
                      <FolderOpen aria-hidden="true" className="h-20 w-20 fill-folder text-folder-tab" strokeWidth={1.2} />
                    ) : (
                      <Folder aria-hidden="true" className="h-20 w-20 fill-folder text-folder-tab transition-transform group-hover:-translate-y-1" strokeWidth={1.2} />
                    )}
                    <span className="font-semibold">{p.title}</span>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div id="project-detail" aria-live="polite">
            {open !== null && PROJECTS[open] && (() => { const proj = PROJECTS[open]!; return (
              <article className={`sticky-note mt-8 animate-pop p-6 sm:p-8 ${proj.color}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold">{proj.title}</h3>
                  <ul className="flex flex-wrap gap-2" aria-label="Tags">
                    {proj.tags.map((t) => (
                      <li key={t} className="rounded-full bg-card px-3 py-1 text-xs font-semibold">{t}</li>
                    ))}
                  </ul>
                </div>
                <p className="mt-3 max-w-2xl">{proj.desc}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 font-semibold underline underline-offset-4">
                  View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ); })()}
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about" title="📝 About me" tab="bg-sticky-pink">
          <div className="grid gap-8 md:grid-cols-3">
            <Draggable label="Where it started" rotate={-2} className="bg-sticky-yellow p-6">
              <h3 className="font-hand text-3xl">Where it started</h3>
              <p className="mt-2">A few lines about how you got curious about design and technology.</p>
            </Draggable>
            <Draggable label="What I care about" rotate={1.5} className="bg-sticky-pink p-6">
              <h3 className="font-hand text-3xl">What I care about</h3>
              <p className="mt-2">The values behind your work — people, clarity, inclusion, craft.</p>
            </Draggable>
            <Draggable label="Outside work" rotate={-1} className="bg-sticky-green p-6">
              <h3 className="font-hand text-3xl">Outside work</h3>
              <p className="mt-2">Hobbies, places, the little things that make you, you.</p>
            </Draggable>
          </div>
        </Section>

        {/* TECH */}
        <Section id="tech" title="🧰 Tools & technologies" tab="bg-sticky-blue">
          <ul className="flex flex-wrap gap-5">
            {TECH.map((t, i) => (
              <li key={t.name}>
                <Draggable label={t.name} rotate={((i * 37) % 7) - 3} className={`${t.c} grid h-28 w-28 place-items-center p-3 text-center font-semibold`}>
                  {t.name}
                </Draggable>
              </li>
            ))}
          </ul>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="🚀 Experience" tab="bg-sticky-green">
          <ol className="relative ml-3 border-l-2 border-dashed border-ink/30">
            {EXPERIENCE.map((e) => (
              <li key={e.when} className="relative mb-10 ml-8 last:mb-0">
                <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-card bg-primary shadow" />
                <div className="rounded-xl bg-card p-5 shadow-sticky transition-transform hover:-translate-y-0.5">
                  <p className="font-hand text-xl text-cursor">{e.when}</p>
                  <h3 className="text-lg font-bold">{e.role} · <span className="font-medium text-muted-foreground">{e.org}</span></h3>
                  <p className="mt-1 text-muted-foreground">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
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
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className={`sticky-note flex items-center gap-3 p-4 font-semibold transition-transform hover:-translate-y-0.5 hover:rotate-1 ${c}`}>
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

      {/* FigJam-style toolbar as navigation */}
      <nav aria-label="Sections" className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <ul className="flex items-center gap-1 rounded-2xl bg-card p-1.5 shadow-float">
          <li aria-hidden="true" className="hidden px-2 text-primary sm:block"><MousePointer2 className="h-5 w-5" /></li>
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
