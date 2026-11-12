"use client";

import { useEffect, useState } from "react";

// Botão "voltar ao topo" com anel de progresso de leitura. Aparece após rolar 600px.
const R = 22;
const CIRC = 2 * Math.PI * R;

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > 600);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <button type="button" onClick={toTop} aria-label={label} tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-full border border-border bg-surface text-accent shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
        <circle cx="28" cy="28" r={R} fill="none" stroke="var(--border)" strokeWidth="3" />
        <circle cx="28" cy="28" r={R} fill="none" stroke="url(#ttg)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)} className="transition-[stroke-dashoffset] duration-150" />
        <defs>
          <linearGradient id="ttg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" /><stop offset="1" stopColor="var(--teal)" />
          </linearGradient>
        </defs>
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:animate-[nudge-up_1s_ease-in-out_infinite]">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
