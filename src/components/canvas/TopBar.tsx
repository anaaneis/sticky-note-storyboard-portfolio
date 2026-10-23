import { Menu, ChevronDown, Play } from "lucide-react";

const LINKS = [
  { href: "#hi", label: "Hi" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tools" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

/** Figma/FigJam-style file header used as the main navigation. */
export function TopBar({ name, base = "" }: { name: string; base?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-card" aria-hidden="true"><Menu className="h-4 w-4" /></span>
        <div className="flex min-w-0 items-center gap-1 text-sm">
          <span className="hidden text-muted-foreground sm:inline">Drafts /</span>
          <span className="truncate font-semibold">{name}'s portfolio</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>

        <nav aria-label="Main" className="mx-auto hidden md:block">
          <ul className="flex items-center gap-1 rounded-xl bg-muted p-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={base + l.href} className="block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div className="hidden -space-x-2 sm:flex" aria-hidden="true">
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-cursor text-xs font-bold text-cursor-foreground">A</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-sticky-green text-xs font-bold text-ink">you</span>
          </div>
          <span className="hidden rounded-md px-2 py-1 text-xs font-medium text-muted-foreground lg:block" aria-hidden="true">100%</span>
          <a href={base + "#projects"} aria-label="Present: jump to projects" className="hidden h-9 w-9 place-items-center rounded-lg hover:bg-muted sm:grid"><Play className="h-4 w-4" aria-hidden="true" /></a>
          <a href={base + "#contact"} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Share</a>
        </div>
      </div>
    </header>
  );
}
