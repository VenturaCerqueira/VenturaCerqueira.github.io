"use client";

import { useEffect, useState } from "react";
import { Flag } from "@/components/Flag";
import { LOCALES, type Lang } from "@/data/i18n";

/*
  Sugere a versão no idioma do navegador (ex.: recrutador com navegador em inglês abrindo a versão em português).
  Aparece uma vez; ao escolher ou fechar, não aparece de novo.
*/
const MSG: Record<Lang, { text: string; go: string; close: string }> = {
  pt: { text: "Ver este portfólio em português?", go: "Português", close: "Fechar" },
  en: { text: "View this portfolio in English?", go: "English", close: "Close" },
  es: { text: "¿Ver este portafolio en español?", go: "Español", close: "Cerrar" },
};
const KEY = "lang-suggest-dismissed";

export function LangSuggest({ current }: { current: Lang }) {
  const [target, setTarget] = useState<Lang | null>(null);

  useEffect(() => {
    try { if (localStorage.getItem(KEY)) return; } catch {}
    const prefs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => l.toLowerCase().slice(0, 2));
    const first = prefs.find((l): l is Lang => l === "pt" || l === "en" || l === "es");
    if (first && first !== current) {
      const show = window.setTimeout(() => setTarget(first), 1500);
      // some sozinha depois de 12s para não cobrir o conteúdo (e não volta a aparecer)
      const hide = window.setTimeout(() => { setTarget(null); try { localStorage.setItem(KEY, "1"); } catch {} }, 13500);
      return () => { window.clearTimeout(show); window.clearTimeout(hide); };
    }
  }, [current]);

  if (!target) return null;
  const m = MSG[target];
  const loc = LOCALES.find((l) => l.lang === target)!;
  const dismiss = () => { try { localStorage.setItem(KEY, "1"); } catch {} setTarget(null); };

  return (
    <div role="dialog" aria-label={m.text} lang={loc.htmlLang}
      className="lang-suggest fixed inset-x-3 top-20 z-[45] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border bg-surface/95 p-3 pl-4 shadow-2xl shadow-black/15 backdrop-blur sm:top-24">
      <Flag code={loc.flag} width={26} />
      <p className="flex-1 text-sm font-medium">{m.text}</p>
      <a href={loc.path} onClick={dismiss} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">{m.go}</a>
      <button type="button" onClick={dismiss} aria-label={m.close} className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}
