"use client";

import { useEffect, useRef, useState } from "react";
import { NavIcon } from "@/components/NavIcon";
import { TechIcon } from "@/components/TechIcon";
import type { Job } from "@/data/profile";
import type { UI } from "@/data/i18n";

/*
  Linha do tempo animada da experiência:
  - linha central que se preenche com a rolagem; cada marco "acende" quando a linha chega nele;
  - cards alternados (desktop), com brilho que segue o mouse;
  - tempo de casa calculado a partir do período; selo de promoção; tópicos entrando em sequência.
*/

function duration(period: string, x: UI["xp"]): string | null {
  const m = [...period.matchAll(/(\d{2})\/(\d{4})/g)].map((r) => Number(r[2]) * 12 + Number(r[1]) - 1);
  if (!m.length) return null;
  const now = new Date();
  const end = m[1] ?? now.getFullYear() * 12 + now.getMonth();
  const total = Math.max(1, end - m[0] + 1);
  const y = Math.floor(total / 12), mo = total % 12;
  const ys = y ? `${y} ${y === 1 ? x.year : x.years}` : "";
  const ms = mo ? `${mo} ${mo === 1 ? x.month : x.months}` : "";
  return [ys, ms].filter(Boolean).join(` ${x.and} `);
}

export function ExperienceTimeline({ jobs, ui }: { jobs: Job[]; ui: UI }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [lit, setLit] = useState<boolean[]>(() => jobs.map(() => false));

  useEffect(() => {
    const list = listRef.current!;
    const nodes = [...list.querySelectorAll<HTMLElement>("[data-node]")];
    const onScroll = () => {
      const r = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6; // ponto da tela que "puxa" a linha
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      setProgress(p);
      setLit(nodes.map((n) => n.getBoundingClientRect().top + 20 < anchor));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const spotlight = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <ol ref={listRef} className="relative mx-auto max-w-5xl">
      {/* trilho + preenchimento */}
      <div className="absolute bottom-0 left-5 top-0 w-1 -translate-x-1/2 rounded-full bg-border lg:left-1/2" aria-hidden>
        <div className="xp-fill w-full rounded-full bg-gradient-to-b from-accent via-accent-2 to-teal" style={{ height: `${progress * 100}%` }} />
        <span className="xp-head absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: `${progress * 100}%` }} />
      </div>

      {jobs.map((j, i) => {
        const left = i % 2 === 0;
        const dur = duration(j.period, ui.xp);
        const on = lit[i];
        return (
          <li key={j.role + j.period} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-10 last:pb-0 lg:grid-cols-[1fr_4rem_1fr] lg:gap-x-6">
            {/* marco na linha */}
            <div data-node className="relative col-start-1 row-start-1 flex justify-center lg:col-start-2">
              <span className={`xp-node relative z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-bg-alt transition-all duration-500 ${
                on ? "scale-110 bg-gradient-to-br from-accent to-accent-2 text-white shadow-lg shadow-accent/40" : "bg-surface text-muted"
              }`}>
                {on && j.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" aria-hidden />}
                <NavIcon name={j.icon} size={18} className="relative" />
              </span>
            </div>

            {/* lado oposto (desktop): período grande */}
            <div className={`hidden lg:row-start-1 lg:flex lg:flex-col lg:justify-start lg:pt-1 ${left ? "lg:col-start-3 lg:items-start" : "lg:col-start-1 lg:items-end lg:text-right"}`}>
              <span className={`reveal ${left ? "reveal-right" : "reveal-left"}`}>
                <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-500 ${on ? "text-gradient" : "text-muted/50"}`}>{j.period}</span>
              </span>
              {dur && <span className="reveal mt-1 text-sm font-medium text-muted">{dur}</span>}
            </div>

            {/* card */}
            {/* invólucro com classe fixa: a animação de entrada (.reveal/.in) não é apagada quando o marco acende */}
            <div className={`reveal ${left ? "reveal-left lg:col-start-1" : "reveal-right lg:col-start-3"} col-start-2 row-start-1`}>
            <article
              onMouseMove={spotlight}
              className={`xp-card group relative overflow-hidden rounded-2xl border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/15 ${
                on ? "border-accent/40" : "border-border"
              }`}>
              <span className="xp-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              {/* seta apontando para a linha (desktop) */}
              <span className={`absolute top-5 hidden h-3 w-3 rotate-45 border bg-surface lg:block ${left ? "-right-1.5 border-b-0 border-l-0" : "-left-1.5 border-r-0 border-t-0"} ${on ? "border-accent/40" : "border-border"}`} aria-hidden />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  {j.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-2.5 py-0.5 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> {ui.current}
                    </span>
                  )}
                  {j.promotion && (
                    <span className="xp-promo inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#f5a524] to-[#f2706b] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                      {ui.xp.promotion}
                    </span>
                  )}
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent lg:hidden">
                    {j.period}{dur ? ` · ${dur}` : ""}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug">{j.role}</h3>
                <p className="mt-0.5 text-sm font-semibold text-accent">
                  {j.company}{j.location ? <span className="font-normal text-muted"> · {j.location}</span> : null}
                </p>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {j.bullets.map((b, bi) => (
                    <li key={b} className="xp-bullet flex gap-2.5" style={{ animationDelay: `${250 + bi * 110}ms` }}>
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {j.tags && j.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {j.tags.map((t) => (
                      <li key={t} className="group/tech flex items-center gap-1.5 rounded-lg border border-border bg-bg px-2 py-1 text-xs font-medium transition hover:-translate-y-0.5 hover:border-accent">
                        <TechIcon name={t} size={14} />
                        {ui.techNames[t] ?? t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
