import type { Project } from "@/data/profile";
import type { UI } from "@/data/i18n";

// paleta de capas geradas para projetos sem print
const gradients = [
  "from-[#5b3df5] to-[#2f6bdc]",
  "from-[#0f8a7e] to-[#2f6bdc]",
  "from-[#8f5bd8] to-[#f2706b]",
  "from-[#2f6bdc] to-[#12a594]",
  "from-[#f5a524] to-[#f2706b]",
];

function hostOf(href?: string) {
  try { return href ? new URL(href).host.replace(/^www\./, "") : ""; } catch { return ""; }
}

export function ProjectCard({ p, index = 0, ui }: { p: Project; index?: number; ui: UI }) {
  const site = p.links.find((l) => !l.href.includes("github.com"));
  const main = site ?? p.links[0];

  return (
    <article data-cats={(p.cats ?? []).join(" ")} className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-2xl hover:shadow-accent/15"
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}>
      {/* capa */}
      <a href={main.href} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden" aria-label={`${ui.card.open} ${p.title}`}>
        {p.cover ? (
          <div className="bg-bg-alt">
            {/* barra de navegador */}
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f2706b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5a524]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#12a594]" />
              <span className="ml-2 truncate rounded-md bg-bg-alt px-2 py-0.5 font-mono text-[10px] text-muted">{hostOf(site?.href)}</span>
            </div>
            <div className="aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt={`${ui.card.screenshot} ${p.title}`} loading="lazy"
                className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-110" />
            </div>
          </div>
        ) : (
          <div className={`gen-cover relative flex aspect-[16/11] items-end bg-gradient-to-br ${gradients[index % gradients.length]} p-5`}>
            <div className="gen-grid absolute inset-0 opacity-30" />
            <pre className="relative min-w-0 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/85 transition duration-500 group-hover:-translate-y-1">
{`${site ? `$ open ${hostOf(site.href)}` : `$ git clone ${main.href.replace("https://", "")}`}
> ${p.stack.slice(0, 3).join(" · ")}`}
            </pre>
            <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
              {p.stack[0]}
            </span>
          </div>
        )}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-accent/0 opacity-0 transition duration-300 group-hover:bg-accent/25 group-hover:opacity-100">
          <span className="translate-y-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent shadow-lg transition duration-300 group-hover:translate-y-0">
            {site ? ui.card.viewSystem : ui.card.viewCode}
          </span>
        </span>
      </a>

      <div className="flex flex-1 flex-col p-6">
        {p.tag && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> {p.tag}
          </span>
        )}
        <h3 className="text-lg font-bold">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition group-hover:border-accent/40">{s}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm font-semibold text-accent">
              {ui.linkLabels[l.label] ?? l.label} <span aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
