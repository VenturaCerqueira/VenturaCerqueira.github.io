import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";
import { buildSearchIndex } from "@/data/searchIndex";
import { SocialIcon } from "@/components/Social";
import { NavIcon, type NavIconName } from "@/components/NavIcon";
import { Flag } from "@/components/Flag";
import { LOCALES } from "@/data/i18n";
import type { Content } from "@/data/content";

// Menu flutuante em "pílula" (estilo AgendaAI). Dropdowns abrem no hover e no foco do teclado, sem JS.

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden
      className="transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Dropdown({ label, icon, children, align = "left", width = "w-72" }: {
  label: React.ReactNode; icon?: NavIconName; children: React.ReactNode; align?: "left" | "right"; width?: string;
}) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true"
        className="group/item flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-accent-soft/60 hover:text-accent focus-visible:text-accent">
        {icon && <NavIcon name={icon} />} {label} <Chevron />
      </button>
      <div className={`invisible absolute top-full z-50 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${align === "right" ? "right-0" : "left-0"}`}>
        <div className={`${width} translate-y-1 rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-black/10 transition group-hover:translate-y-0`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Header({ t }: { t: Content }) {
  const n = t.ui.nav;
  const c = t.profile.contacts;
  const current = LOCALES.find((l) => l.lang === t.lang)!;

  const projectsMenu: { href: string; label: string; desc: string; icon: NavIconName }[] = [
    { href: "#projetos", label: n.inProduction, desc: n.inProductionDesc, icon: "rocket" },
    { href: "#open-source", label: n.openSource, desc: n.openSourceDesc, icon: "code" },
    { href: "#devtis", label: n.company, desc: n.companyDesc, icon: "building" },
  ];
  const links: { href: string; label: string; icon: NavIconName }[] = [
    { href: "#ia", label: n.ai, icon: "sparkles" },
    { href: "#nivel", label: n.level, icon: "trend" },
    { href: "#experiencia", label: n.experience, icon: "briefcase" },
    { href: "#stack", label: n.stack, icon: "layers" },
  ];
  const mobileLinks = [
    ...projectsMenu.map(({ href, label, icon }) => ({ href, label, icon })),
    ...links,
    { href: "#sobre", label: n.about, icon: "user" as const },
    { href: "#contato", label: n.contact, icon: "mail" as const },
  ];
  const socials = [
    { href: c.linkedin, label: "LinkedIn", icon: "linkedin" as const },
    { href: c.github, label: "GitHub", icon: "github" as const },
    { href: c.instagram, label: n.personalInstagram, icon: "instagram" as const },
    { href: t.company.instagram, label: `${t.company.name} ${t.ui.companySuffix}`, icon: "instagram" as const },
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-6">
      <nav aria-label={({ pt: "Principal", en: "Main", es: "Principal" } as const)[t.lang]}
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border/70 bg-surface/85 py-2 pl-3 pr-2 shadow-lg shadow-black/5 backdrop-blur-xl sm:pl-5">
        {/* logo */}
        <a href="#inicio" className="flex min-w-0 items-center gap-2.5 text-lg font-extrabold tracking-tight">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-extrabold text-white shadow-md shadow-accent/30">AV</span>
          <span className="hidden whitespace-nowrap min-[400px]:inline">Anderson<span className="text-gradient">Ventura</span></span>
        </a>

        {/* links desktop */}
        <div className="hidden items-center text-[15px] font-medium text-muted lg:ml-2 lg:flex">
          <Dropdown label={n.projects} icon="folder">
            {projectsMenu.map((m) => (
              <a key={m.href} href={m.href} className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-accent-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <NavIcon name={m.icon} size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">{m.label}</span>
                  <span className="block text-xs text-muted">{m.desc}</span>
                </span>
              </a>
            ))}
          </Dropdown>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group/item flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 transition hover:bg-accent-soft/60 hover:text-accent xl:px-3">
              <NavIcon name={l.icon} /> {l.label}
            </a>
          ))}
        </div>

        {/* ações */}
        <div className="flex items-center gap-1.5">
          <div className="hidden text-[15px] font-semibold 2xl:block">
            <Dropdown label={n.social} icon="share" align="right">
              {socials.map((s) => (
                <a key={s.href} href={s.href} {...ext} className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-accent-soft hover:text-accent">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition group-hover/item:scale-110">
                    <SocialIcon name={s.icon} />
                  </span>
                  {s.label}
                </a>
              ))}
            </Dropdown>
          </div>

          {/* idioma */}
          <div className="hidden text-sm font-semibold sm:block">
            <Dropdown align="right" width="w-52"
              label={<span className="flex items-center gap-1.5" aria-label={`${n.language}: ${current.label}`}><Flag code={current.flag} width={20} /> {current.short}</span>}>
              {LOCALES.map((l) => (
                <a key={l.lang} href={l.path} hrefLang={l.htmlLang} lang={l.htmlLang} aria-current={l.lang === t.lang ? "true" : undefined}
                  className={`group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-accent-soft hover:text-accent ${l.lang === t.lang ? "bg-accent-soft/60 text-accent" : ""}`}>
                  <Flag code={l.flag} width={24} className="transition group-hover/item:scale-110" />
                  <span className="flex-1">{l.label}</span>
                  {l.lang === t.lang && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                </a>
              ))}
            </Dropdown>
          </div>

          <Search items={buildSearchIndex(t)} t={t.ui.search} />
          <ThemeToggle label={t.ui.theme} />
          <a href="#contato" className="group/item hidden items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent-2 to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/30 transition hover:-translate-y-0.5 md:inline-flex">
            <NavIcon name="mail" /> {n.hire}
          </a>

          {/* menu mobile */}
          <details className="group/menu relative lg:hidden">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-accent [&::-webkit-details-marker]:hidden" aria-label={n.openMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path className="origin-center transition group-open/menu:translate-y-[5px] group-open/menu:rotate-45" d="M4 7h16" />
                <path className="transition group-open/menu:opacity-0" d="M4 12h16" />
                <path className="origin-center transition group-open/menu:-translate-y-[5px] group-open/menu:-rotate-45" d="M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-3 max-h-[75vh] w-[min(18rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-2xl">
              <div className="mb-2 grid grid-cols-3 gap-1 border-b border-border pb-2">
                {LOCALES.map((l) => (
                  <a key={l.lang} href={l.path} hrefLang={l.htmlLang} aria-label={l.label}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold ${l.lang === t.lang ? "bg-accent-soft text-accent" : "text-muted hover:bg-accent-soft/60"}`}>
                    <Flag code={l.flag} width={20} /> {l.short}
                  </a>
                ))}
              </div>
              {mobileLinks.map((l) => (
                <a key={l.href} href={l.href} className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent-soft hover:text-accent">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <NavIcon name={l.icon} />
                  </span>
                  {l.label}
                </a>
              ))}
              <a href="#contato" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 to-accent px-4 py-3 text-sm font-semibold text-white md:hidden">
                <NavIcon name="mail" /> {n.hire}
              </a>
              <div className="mt-2 flex justify-around border-t border-border pt-3">
                {socials.map((s) => (
                  <a key={s.href} href={s.href} {...ext} aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-accent-soft hover:text-accent">
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
