import type { ReactNode } from "react";

/** A FigJam "section" frame with a coloured name tab. */
export function Section({ id, title, tab, children }: { id: string; title: string; tab: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-frame scroll-mt-8 px-5 pb-10 pt-14 sm:px-10">
      <h2 id={`${id}-title`} className={`absolute -top-4 left-6 rounded-md px-3 py-1 text-sm font-bold text-ink shadow-sticky ${tab}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}
