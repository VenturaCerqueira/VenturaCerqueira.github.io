"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Cartão de "editor" que digita uma apresentação em forma de objeto TypeScript quando entra na tela. */

type Tok = [cls: string, text: string];

const C = {
  kw: "text-[#c792ea]", v: "text-[#82aaff]", k: "text-[#e6edf3]", s: "text-[#c3e88d]",
  b: "text-[#f78c6c]", p: "text-[#89ddff]", c: "text-[#637777] italic",
};

export function CodeIntro({ role, location, studying }: { role: string; location: string; studying: string }) {
  const lines: Tok[][] = useMemo(() => {
    const str = (t: string): Tok => [C.s, `"${t}"`];
    const arr = (items: string[]): Tok[] => [[C.p, "["], ...items.flatMap((x, i) => [str(x), ...(i < items.length - 1 ? [[C.p, ", "] as Tok] : [])]), [C.p, "]"]];
    const prop = (key: string, value: Tok[]): Tok[] => [[C.k, `  ${key}`], [C.p, ": "], ...value, [C.p, ","]];
    return [
      [[C.c, "// anderson.ts"]],
      [[C.kw, "const "], [C.v, "anderson"], [C.p, " = {"]],
      prop("role", [str(role)]),
      prop("location", [str(location)]),
      prop("stack", arr(["Python", "Node.js", "SQL", "Docker"])),
      prop("ai", arr(["Claude Code", "agents", "prompts"])),
      prop("company", [str("DevTI's")]),
      prop("studying", [str(studying)]),
      prop("openToWork", [[C.b, "true"]]),
      [[C.p, "};"]],
    ];
  }, [role, location, studying]);

  const total = useMemo(() => lines.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0), [lines]);
  const [count, setCount] = useState(total); // SSR/sem JS: texto completo
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCount(0);
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = window.setInterval(() => setCount((c) => {
        if (c >= total) { window.clearInterval(timer); return c; }
        return c + 2;
      }), 22);
    }, { threshold: 0.3 });
    io.observe(ref.current!);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, [total]);

  // recorta os tokens até "count" caracteres
  let left = count;
  const done = count >= total;

  return (
    <div ref={ref} className="code-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1222] shadow-2xl shadow-accent/20 transition duration-500 hover:-translate-y-1 hover:rotate-[-0.6deg]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-white/60">anderson.ts</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-[#28c840]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" /> TypeScript
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 sm:text-[13px]" aria-label="const anderson">
        {lines.map((line, li) => {
          const lineLen = line.reduce((m, [, t]) => m + t.length, 0) + 1;
          const visible = left > 0;
          const out = line.map(([cls, text], ti) => {
            const shown = text.slice(0, Math.max(0, left));
            left -= text.length;
            return shown ? <span key={ti} className={cls}>{shown}</span> : null;
          });
          left -= 1;
          const cursorHere = !done && left < 0 && left > -lineLen - 1 && visible;
          return (
            <div key={li} className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">{li + 1}</span>
              <span className="whitespace-pre-wrap break-words">
                {out}
                {cursorHere && <span className="caret-block" aria-hidden />}
              </span>
            </div>
          );
        })}
        {done && (
          <div className="flex">
            <span className="mr-4 w-5 shrink-0 select-none text-right text-white/25">{lines.length + 1}</span>
            <span className="caret-block" aria-hidden />
          </div>
        )}
      </pre>
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/30 blur-3xl transition duration-700 group-hover:bg-teal/30" aria-hidden />
    </div>
  );
}
