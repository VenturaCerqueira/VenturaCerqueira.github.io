"use client";

import { useState } from "react";
import { NavIcon } from "@/components/NavIcon";
import { TechIcon } from "@/components/TechIcon";
import type { CaseStudy } from "@/data/content/cases";
import type { UI } from "@/data/i18n";

/* Estudos de caso em abas. Todo o conteúdo fica no HTML (bom para SEO); só a aba ativa aparece. */

const ICONS = { econtrib: "building", agendaai: "rocket", esocial: "code" } as const;

export function CaseStudies({ cases, ui }: { cases: CaseStudy[]; ui: UI }) {
  const [active, setActive] = useState(0);
  const t = ui.cases;

  return (
    <div className="reveal">
      {/* abas */}
      <div role="tablist" aria-label={t.kicker} className="mx-auto mb-8 grid w-full max-w-3xl grid-cols-3 gap-1.5 rounded-2xl border border-border bg-surface p-1.5 shadow-sm">
        {cases.map((c, i) => (
          <button key={c.id} role="tab" type="button" aria-selected={i === active} aria-controls={`case-${c.id}`} id={`tab-${c.id}`}
            onClick={() => setActive(i)}
            className={`group/item flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center text-xs font-semibold leading-tight transition sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
              i === active ? "bg-gradient-to-r from-accent to-accent-2 text-white shadow-md shadow-accent/30" : "text-muted hover:bg-accent-soft hover:text-accent"
            }`}>
            <NavIcon name={ICONS[c.id as keyof typeof ICONS] ?? "folder"} size={16} />
            {c.title.split(":")[0]}
          </button>
        ))}
      </div>

      {cases.map((c, i) => (
        <div key={c.id} id={`case-${c.id}`} role="tabpanel" aria-labelledby={`tab-${c.id}`} hidden={i !== active}
          className="case-panel grid gap-8 rounded-3xl border border-border bg-surface p-4 shadow-xl shadow-accent/5 sm:p-8 lg:grid-cols-[1fr_1.15fr]">
          {/* lado visual */}
          <div className="flex flex-col gap-4">
            {c.cover ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-bg-alt">
                <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f2706b]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f5a524]" /><span className="h-2.5 w-2.5 rounded-full bg-[#12a594]" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.cover} alt={c.title} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1222] p-4 font-mono text-[11px] leading-6 text-white/85 [overflow-wrap:anywhere] sm:p-5 sm:text-[12px]">
                <p className="text-white/40"># scraping_esocial.py</p>
                <p><span className="text-[#c792ea]">for</span> pagina <span className="text-[#c792ea]">in</span> retomar_de(<span className="text-[#c3e88d]">&quot;progresso.json&quot;</span>):</p>
                <p className="pl-4"><span className="text-[#c792ea]">try</span>:</p>
                <p className="pl-8">html = copiar_pagina(pagina)</p>
                <p className="pl-8">dados += extrair(BeautifulSoup(html))</p>
                <p className="pl-8">salvar_progresso(pagina)</p>
                <p className="pl-4"><span className="text-[#c792ea]">except</span> Falha:</p>
                <p className="pl-8">nova_sessao_anonima(); tentar_de_novo()</p>
                <p>pd.DataFrame(dados).to_csv(<span className="text-[#c3e88d]">&quot;remuneracao.csv&quot;</span>)</p>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-bg p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">{t.role}</p>
                <p className="mt-1 text-sm font-semibold">{c.role}</p>
              </div>
              <div className="rounded-2xl border border-border bg-bg p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted">{t.stack}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <li key={s} className="group/tech flex items-center gap-1 rounded-lg border border-border bg-surface px-1.5 py-0.5 text-xs font-medium">
                      <TechIcon name={s} size={13} /> {ui.techNames[s] ?? s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* narrativa */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{c.tag}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{c.title}</h3>

            <div className="mt-6 space-y-5">
              {([
                ["globe", t.context, c.context],
                ["compass", t.challenge, c.challenge],
              ] as const).map(([icon, label, text]) => (
                <div key={label} className="case-step flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><NavIcon name={icon === "compass" ? "trend" : icon} size={15} /></span>
                  <div>
                    <p className="text-sm font-bold">{label}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}

              <div className="case-step flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><NavIcon name="wrench" size={15} /></span>
                <div>
                  <p className="text-sm font-bold">{t.solution}</p>
                  <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-muted">
                    {c.solution.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="case-step rounded-2xl border border-teal/30 bg-teal/[0.07] p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-teal"><NavIcon name="rocket" size={15} /> {t.outcome}</p>
                <p className="mt-1 text-sm leading-relaxed">{c.outcome}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {c.links.map((l, li) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  className={li === 0
                    ? "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/30 transition hover:-translate-y-0.5"
                    : "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"}>
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
