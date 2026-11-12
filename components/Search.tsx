"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SearchItem } from "@/data/searchIndex";
import type { UI } from "@/data/i18n";

// Busca estilo "command palette": Ctrl/Cmd+K ou "/" abre; setas navegam; Enter abre; Esc fecha.

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function score(item: SearchItem, terms: string[]) {
  const title = norm(item.title);
  const hay = norm(`${item.title} ${item.subtitle ?? ""} ${item.keywords} ${item.group}`);
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0; // todos os termos precisam aparecer
    s += title.startsWith(t) ? 5 : title.includes(t) ? 3 : 1;
  }
  return s;
}

const suggestions = ["Python", "API", "NFS-e", "Docker", "WhatsApp"];

export function Search({ items, t }: { items: SearchItem[]; t: UI["search"] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((i) => i.group === t.groups.sections);
    return items
      .map((i) => ({ i, s: score(i, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.i);
  }, [q, items, t.groups.sections]);

  // atalhos globais
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing && !open)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ao abrir: foco no campo e trava a rolagem
  useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 30);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => setSel(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const go = (item: SearchItem) => {
    setOpen(false);
    if (item.href.startsWith("#")) {
      setTimeout(() => document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }), 50);
      history.replaceState(null, "", item.href);
    } else if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
    } else {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results[sel]) { e.preventDefault(); go(results[sel]); }
    else if (e.key === "Escape") setOpen(false);
  };

  // agrupa mantendo a ordem
  let idx = -1;
  const groups = results.reduce<Record<string, SearchItem[]>>((acc, r) => ((acc[r.group] ??= []).push(r), acc), {});

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={t.button}
        className="group flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-3 text-sm text-muted transition hover:border-accent hover:text-accent">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden
          className="transition group-hover:rotate-12 group-hover:scale-110">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="hidden 2xl:inline">{t.label}</span>
        <kbd className="hidden whitespace-nowrap rounded-md border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] font-semibold xl:inline">Ctrl K</kbd>
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[#0b0d18]/50 px-4 pt-[12vh] backdrop-blur-sm animate-[fade_.15s_ease-out]"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label={t.dialog}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-[pop-in_.2s_ease-out]">
            <div className="flex items-center gap-3 border-b border-border px-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="shrink-0 text-accent" aria-hidden>
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
              </svg>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onInputKey}
                placeholder={t.placeholder}
                role="combobox" aria-expanded="true" aria-controls="search-results"
                aria-activedescendant={results[sel] ? `sr-${sel}` : undefined}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted" />
              <kbd onClick={() => setOpen(false)} className="cursor-pointer rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
            </div>

            {!q && (
              <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-3">
                <span className="mr-1 self-center text-xs text-muted">{t.suggestions}</span>
                {[...suggestions.slice(0, 1), t.groups.ai, ...suggestions.slice(1)].map((s) => (
                  <button key={s} type="button" onClick={() => setQ(s)}
                    className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent transition hover:bg-accent hover:text-white">{s}</button>
                ))}
              </div>
            )}

            <ul id="search-results" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-10 text-center text-sm text-muted">{t.none} “{q}”.</li>
              )}
              {Object.entries(groups).map(([group, list]) => (
                <li key={group} role="presentation">
                  <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-muted">{group}</p>
                  <ul role="presentation">
                    {list.map((r) => {
                      idx += 1;
                      const i = idx;
                      const active = i === sel;
                      const external = !r.href.startsWith("#");
                      return (
                        <li key={r.group + r.title + r.href} id={`sr-${i}`} data-idx={i} role="option" aria-selected={active}
                          onMouseMove={() => setSel(i)} onClick={() => go(r)}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition ${active ? "bg-accent text-white" : "hover:bg-accent-soft"}`}>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">{r.title}</span>
                            {r.subtitle && <span className={`block truncate text-xs ${active ? "text-white/80" : "text-muted"}`}>{r.subtitle}</span>}
                          </span>
                          <span className={`shrink-0 text-xs ${active ? "text-white/90" : "text-muted"}`} aria-hidden>{external ? "↗" : "↵"}</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted">
              <span><kbd className="font-mono">↑↓</kbd> {t.navigate}</span>
              <span><kbd className="font-mono">Enter</kbd> {t.open}</span>
              <span><kbd className="font-mono">Esc</kbd> {t.close}</span>
              <span className="ml-auto">{results.length} {results.length === 1 ? t.result : t.results}</span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
