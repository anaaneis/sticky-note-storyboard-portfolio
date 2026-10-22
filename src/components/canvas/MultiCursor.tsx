import { useEffect, useRef, useState } from "react";

type Stamp = { id: number; x: number; y: number; emoji: string };
const EMOJIS = ["✨", "💖", "👍", "🎉", "⭐", "🔥"];

/** Decorative name-tag cursor. Label: "you" by default, "click" over clickable things,
 *  or any element's data-cursor value (e.g. "that's me"). Off for touch / reduced motion. */
export function MultiCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("you");
  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(!reduced);
    let id = 0;
    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target as HTMLElement | null;
      const custom = t?.closest<HTMLElement>("[data-cursor]")?.dataset["cursor"];
      setLabel(custom ?? (t?.closest("a,button,[role=button]") ? "click" : t?.closest("[data-drag]") ? "drag me" : "you"));
    };
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,input,[role=button],[data-drag]")) return;
      const s = { id: ++id, x: e.clientX, y: e.clientY, emoji: EMOJIS[id % EMOJIS.length] ?? "✨" };
      setStamps((p) => [...p.slice(-8), s]);
      setTimeout(() => setStamps((p) => p.filter((x) => x.id !== s.id)), 1200);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      {enabled && (
        <div ref={ref} className="absolute left-0 top-0 transition-transform duration-100 ease-out">
          <svg width="18" height="20" viewBox="0 0 18 20" className="text-cursor drop-shadow">
            <path d="M1 1l15 7-7 2-3 8z" fill="currentColor" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="ml-4 inline-block rounded-full rounded-tl-none bg-cursor px-2.5 py-0.5 text-xs font-semibold text-cursor-foreground shadow">
            {label}
          </span>
        </div>
      )}
      {stamps.map((s) => (
        <span key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl" style={{ left: s.x, top: s.y }}>
          <span className="block animate-pop">
            <span className="block" style={{ animation: "fade-up 0.8s 0.4s ease-in forwards" }}>{s.emoji}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
