import { SocialIcon } from "@/components/Social";
import { NavIcon } from "@/components/NavIcon";
import { Flag } from "@/components/Flag";
import { LocalClock } from "@/components/LocalClock";
import { PetToggle, TerminalTrigger } from "@/components/Triggers";
import { LOCALES } from "@/data/i18n";
import type { Content } from "@/data/content";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer({ t }: { t: Content }) {
  const { ui, profile, company, featuredProjects } = t;
  const f = ui.footer;
  const c = profile.contacts;
  const htmlLang = LOCALES.find((l) => l.lang === t.lang)!.htmlLang;

  const navLinks = (["projetos", "casos", "ia", "nivel", "devtis", "experiencia", "stack", "sobre", "contato"] as const).map((id) => ({ href: `#${id}`, label: ui.dots[id] }));
  const socials = [
    { icon: "linkedin" as const, href: c.linkedin, label: "LinkedIn" },
    { icon: "github" as const, href: c.github, label: "GitHub" },
    { icon: "instagram" as const, href: c.instagram, label: "Instagram" },
    { icon: "whatsapp" as const, href: c.whatsappHref, label: "WhatsApp" },
    { icon: "mail" as const, href: `mailto:${c.email}`, label: ui.emailLabel },
  ];
  const colTitle = "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted";
  const linkCls = "group/l inline-flex items-center gap-1.5 text-sm text-text/80 transition hover:text-accent";

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/60 pb-40">
      {/* borda superior em gradiente animado */}
      <div className="footer-line absolute inset-x-0 top-0 h-[2px]" aria-hidden />
      <div className="hero-bg absolute inset-0 -z-10 opacity-40" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        {/* topo: marca + status */}
        <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <a href="#inicio" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-extrabold text-white shadow-lg shadow-accent/30">AV</span>
              <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">Anderson <span className="text-gradient">Ventura</span></span>
            </a>
            <p className="mt-4 text-muted">{f.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} {...(s.href.startsWith("http") ? ext : {})}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-muted transition duration-300 hover:-translate-y-1 hover:rotate-6 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30">
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[26rem]">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                Status
              </p>
              <p className="mt-1 text-sm font-bold">{ui.available}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-muted"><NavIcon name="clock" size={13} /> {f.localTime}</p>
              <p className="mt-1 text-sm font-bold"><LocalClock locale={htmlLang} /></p>
            </div>
          </div>
        </div>

        {/* colunas */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[0.9fr_1fr_1.35fr_1fr]">
          <div>
            <h3 className={colTitle}>{f.nav}</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    <span className="h-1 w-1 rounded-full bg-accent/50 transition-all group-hover/l:w-3 group-hover/l:bg-accent" />{l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={colTitle}>{f.projects}</h3>
            <ul className="space-y-2.5">
              {featuredProjects.slice(0, 5).map((p) => (
                <li key={p.title}>
                  <a href={p.links[0].href} {...ext} className={linkCls}>
                    {p.title.split(":")[0]}
                    <span className="opacity-0 transition group-hover/l:translate-x-0.5 group-hover/l:opacity-100" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`${c.github}?tab=repositories`} {...ext} className={`${linkCls} font-semibold text-accent`}>GitHub ↗</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={colTitle}>{f.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li><a href={`mailto:${c.email}`} className={`${linkCls} [overflow-wrap:anywhere]`}><NavIcon name="mail" size={15} className="text-accent" /> {c.email}</a></li>
              <li><a href={c.whatsappHref} {...ext} className={linkCls}><SocialIcon name="whatsapp" className="h-[15px] w-[15px] text-[#25D366]" /> {c.whatsappDisplay}</a></li>
              <li className="flex items-center gap-1.5 text-text/80"><NavIcon name="pin" size={15} className="text-accent" /> {profile.location}</li>
              <li><a href={company.instagram} {...ext} className={linkCls}><NavIcon name="building" size={15} className="text-accent" /> {company.name} · {company.handle}</a></li>
            </ul>
          </div>

          <div>
            <h3 className={colTitle}>{f.language}</h3>
            <ul className="space-y-2">
              {LOCALES.map((l) => (
                <li key={l.lang}>
                  <a href={l.path} hrefLang={l.htmlLang} aria-current={l.lang === t.lang ? "true" : undefined}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent ${l.lang === t.lang ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface"}`}>
                    <Flag code={l.flag} width={22} /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* barra inferior */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name} · {company.name} (MEI). {f.rights}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5"><NavIcon name="code" size={13} /> {f.builtWith}</span>
            <TerminalTrigger label={`>_ ${f.terminal}`} className="font-mono underline decoration-dotted underline-offset-4 transition hover:text-accent" />
            <PetToggle label={ui.pet.toggle} />
            <a href="#inicio" className="group/l inline-flex items-center gap-1 font-semibold text-accent">
              {ui.backToTop}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition group-hover/l:-translate-y-0.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* marca d'água gigante */}
      <p className="footer-watermark pointer-events-none absolute inset-x-0 bottom-2 select-none text-center font-extrabold leading-none tracking-tighter" aria-hidden>
        ANDERSON
      </p>
    </footer>
  );
}
