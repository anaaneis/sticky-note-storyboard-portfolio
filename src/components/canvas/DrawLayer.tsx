import { useEffect, useRef, useState } from "react";
import { Pencil, Eraser, Trash2, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "off" | "pen" | "eraser";
const COLORS = ["#1e1e1e", "#f24822", "#0d99ff", "#14ae5c", "#9747ff"];

/** Page-wide drawing canvas with a floating FigJam-style toolbar (pen, eraser, clear). */
export function DrawLayer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("off");
  const [color, setColor] = useState(COLORS[0]!);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const w = document.documentElement.scrollWidth, h = document.documentElement.scrollHeight;
      if (c.width >= w && c.height >= h) return;
      const copy = document.createElement("canvas");
      copy.width = c.width; copy.height = c.height;
      copy.getContext("2d")?.drawImage(c, 0, 0);
      c.width = Math.max(w, c.width); c.height = Math.max(h, c.height);
      c.style.width = c.width + "px"; c.style.height = c.height + "px";
      c.getContext("2d")?.drawImage(copy, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMode("off");
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const pt = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const draw = (e: React.PointerEvent) => {
    if (!last.current) return;
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const p = pt(e);
    ctx.globalCompositeOperation = mode === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = mode === "eraser" ? 28 : 4;
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };
  const clear = () => {
    const c = canvas.current;
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  };

  const tool = (m: Mode, label: string, Icon: typeof Pencil) => (
    <button type="button" aria-label={label} aria-pressed={mode === m} title={label} onClick={() => setMode(m)}
      className={cn("grid h-10 w-10 place-items-center rounded-lg hover:bg-muted", mode === m && "bg-primary text-primary-foreground hover:bg-primary")}>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );

  return (
    <>
      <canvas
        ref={canvas}
        aria-hidden="true"
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); last.current = pt(e); draw(e); }}
        onPointerMove={draw}
        onPointerUp={() => (last.current = null)}
        className={cn("absolute left-0 top-0 z-30 touch-none", mode === "off" ? "pointer-events-none" : mode === "pen" ? "cursor-crosshair" : "cursor-cell")}
      />
      <div role="toolbar" aria-label="Drawing tools" className="fixed bottom-24 left-4 z-50 flex flex-col items-center gap-1 rounded-xl border bg-card p-1.5 shadow-float">
        {tool("off", "Select (stop drawing)", MousePointer2)}
        {tool("pen", "Pen: draw on the canvas", Pencil)}
        {tool("eraser", "Eraser", Eraser)}
        {mode === "pen" && (
          <div className="flex flex-col gap-1 py-1" role="radiogroup" aria-label="Pen colour">
            {COLORS.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={`Colour ${c}`} onClick={() => setColor(c)}
                className={cn("h-6 w-6 rounded-full border-2", color === c ? "border-ink" : "border-card")} style={{ background: c }} />
            ))}
          </div>
        )}
        <span className="my-0.5 h-px w-6 bg-border" aria-hidden="true" />
        <button type="button" aria-label="Clear all drawings" title="Clear all drawings" onClick={clear} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-muted">
          <Trash2 className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
