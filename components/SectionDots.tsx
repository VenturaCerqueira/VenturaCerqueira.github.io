"use client";

import { useEffect, useRef, useState } from "react";
import { NavIcon, type NavIconName } from "@/components/NavIcon";

/*
  Navegação lateral de progresso com tema de desenvolvimento:
  - cada seção é um ícone de dev; a atual fica destacada e pulsando;
  - seções já lidas ganham um check verde ("bug corrigido");
  - um bug desce (ou sobe) pelo trilho acompanhando a leitura, mexendo as patinhas.
*/
type Item = { id: string; label: string; icon: NavIconName };

export function SectionDots({ items, label = "Seções da página" }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(items[0].id);
  const [progress, setProgress] = useState(0);
  const [goingUp, setGoingUp] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = items[0].id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.offsetTop <= y) current = it.id;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      if (Math.abs(window.scrollY - lastY.current) > 2) setGoingUp(window.scrollY < lastY.current);
      lastY.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [items]);

  const activeIdx = items.findIndex((i) => i.id === active);

  return (
    <nav aria-label={label} className="fixed right-1 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:right-3">
      <div className="relative rounded-full border border-border/70 bg-surface/85 px-1 py-2 shadow-lg shadow-black/5 backdrop-blur-xl">
        {/* trilho + preenchimento */}
        <div className="absolute bottom-5 left-1/2 top-5 w-0.5 -translate-x-1/2 rounded-full bg-border" aria-hidden>
          <div className="w-full rounded-full bg-gradient-to-b from-accent to-teal transition-[height] duration-150" style={{ height: `${progress * 100}%` }} />
        </div>

        <ol className="relative flex flex-col items-center gap-2">
          {items.map((it, i) => {
            const isActive = it.id === active;
            const passed = i < activeIdx;
            return (
              <li key={it.id} className="group relative flex items-center justify-center">
                <a href={`#${it.id}`} aria-label={it.label} aria-current={isActive ? "true" : undefined}
                  className={`relative grid place-items-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? "h-7 w-7 border-accent bg-accent text-white shadow-md shadow-accent/40"
                      : passed
                        ? "h-6 w-6 border-teal/40 bg-surface text-teal hover:scale-110"
                        : "h-6 w-6 border-border bg-surface text-muted/60 hover:scale-110 hover:text-accent"
                  }`}>
                  {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" aria-hidden />}
                  <NavIcon name={it.icon} size={isActive ? 14 : 12} className="relative" />
                  {passed && (
                    <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full bg-teal text-white ring-2 ring-surface" aria-hidden>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                  )}
                </a>
                <span className={`pointer-events-none absolute right-9 flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#1e1b4b] px-2.5 py-1 text-xs font-bold text-white shadow-lg transition-all duration-300 ${
                  isActive ? "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 xl:translate-x-0 xl:opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}>
                  <NavIcon name={it.icon} size={12} /> {it.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* bug andando pelo trilho */}
          <span aria-hidden className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-150" style={{ top: `calc(20px + (100% - 40px) * ${progress})` }}>
            <svg width="14" height="16" viewBox="0 0 14 16" style={{ transform: `rotate(${goingUp ? 0 : 180}deg)` }} className="transition-transform duration-300 drop-shadow">
              <g className="rail-bug-legs" stroke="#2a2152" strokeWidth="1.2" strokeLinecap="round">
                <path d="M3 6 0.8 4.5M3 9 0.5 9M3 12 0.8 13.5M11 6l2.2-1.5M11 9h2.5M11 12l2.2 1.5" />
              </g>
              <path d="M5 2.6 3.8.8M9 2.6 10.2.8" stroke="#2a2152" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="7" cy="4" r="2.4" fill="#2a2152" />
              <ellipse cx="7" cy="9.6" rx="4.4" ry="5" fill="#ff5d6c" stroke="#2a2152" strokeWidth="1" />
              <path d="M7 4.8v9.6" stroke="#2a2152" strokeWidth="0.9" />
              <circle cx="5" cy="8.5" r="0.9" fill="#2a2152" />
              <circle cx="9.2" cy="10.8" r="0.9" fill="#2a2152" />
              <circle cx="5.3" cy="12" r="0.7" fill="#2a2152" />
            </svg>
          </span>
      </div>
    </nav>
  );
}
