import { useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

/** A FigJam "section" frame with a coloured name tab. Shows a "Reset notes" button when it holds draggable notes. */
export function Section({ id, title, tab, children }: { id: string; title: string; tab: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [hasDrag, setHasDrag] = useState(false);
  useEffect(() => setHasDrag(!!ref.current?.querySelector("[data-drag]")), []);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="section-frame scroll-mt-8 px-5 pb-10 pt-14 sm:px-10">
      <h2 id={`${id}-title`} className={`absolute -top-4 left-6 rounded-md px-3 py-1 text-sm font-bold text-ink shadow-sticky ${tab}`}>
        {title}
      </h2>
      {hasDrag && (
        <button
          type="button"
          onClick={() => ref.current?.dispatchEvent(new CustomEvent("sticky-reset"))}
          className="absolute -top-4 right-6 inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-1 text-xs font-semibold shadow-sticky hover:-translate-y-0.5"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset notes<span className="sr-only"> in {title}</span>
        </button>
      )}
      {children}
    </section>
  );
}
