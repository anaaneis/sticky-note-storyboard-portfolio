import { cn } from "@/lib/utils";

/** Polaroid frame. Pass `src` once a real photo exists; otherwise shows a placeholder. */
export function Polaroid({ caption, src, alt, rotate = 0, className, cursor, tape = "bg-sticky-blue/70" }: {
  caption: string; src?: string; alt?: string; rotate?: number; className?: string; cursor?: string; tape?: string;
}) {
  return (
    <figure data-cursor={cursor} className={cn("relative bg-card p-2.5 pb-8 shadow-float transition-transform hover:z-10 hover:scale-[1.03]", className)} style={{ rotate: `${rotate}deg` }}>
      <div className="grid aspect-square place-items-center overflow-hidden bg-muted text-center text-muted-foreground">
        {src ? <img src={src} alt={alt ?? caption} loading="lazy" className="size-full object-cover" /> : <span className="px-2 font-hand text-xl leading-tight">{caption}<br />photo here</span>}
      </div>
      <figcaption className="mt-1.5 text-center font-hand text-xl">{caption}</figcaption>
      <span aria-hidden="true" className={cn("absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2", tape)} />
    </figure>
  );
}
