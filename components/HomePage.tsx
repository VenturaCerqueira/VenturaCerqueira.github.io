import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Header } from "@/components/Header";
import { SectionDots } from "@/components/SectionDots";
import { BackToTop } from "@/components/BackToTop";
import { PixelPet } from "@/components/PixelPet";
import { SocialIcon } from "@/components/Social";
import { NavIcon } from "@/components/NavIcon";
import { TechIcon } from "@/components/TechIcon";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CodeIntro } from "@/components/CodeIntro";
import { Footer } from "@/components/Footer";
import { CaseStudies } from "@/components/CaseStudies";
import { CASES } from "@/data/content/cases";
import { Terminal, TerminalTrigger } from "@/components/Terminal";
import { getArticles } from "@/lib/articles";
import { Icon } from "@/components/Icon";
import { CountUp, RevealObserver, Typewriter } from "@/components/Motion";
import { Photo, hasPublicFile } from "@/components/Photo";
import { Flag } from "@/components/Flag";
import { getContent } from "@/data/content";
import type { Lang } from "@/data/i18n";


const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:opacity-95";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Marquee({ items, slow, variant }: { items: string[]; slow?: boolean; variant: "text" | "chip" }) {
  const list = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <ul className={`marquee ${slow ? "marquee-slow" : ""} gap-3`} aria-hidden>
        {list.map((t, i) =>
          variant === "text" ? (
            <li key={i} className="whitespace-nowrap px-6 text-xl font-bold text-muted">{t}</li>
          ) : (
            <li key={i} className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  const {
    ui, aiExperience, careerSteps, company, courses, education, experience, featuredProjects, highlights, languages,
    levelEvidence, marqueeOrgs, marqueeTech, openSource, profile, recruiterSummary, services, skills,
  } = t;
  const DOT_ICONS = { inicio: "terminal", projetos: "rocket", casos: "book", ia: "sparkles", nivel: "trend", devtis: "building", experiencia: "briefcase", stack: "layers", sobre: "user", contato: "mail" } as const;
  const sectionDots = (Object.keys(DOT_ICONS) as (keyof typeof DOT_ICONS)[]).map((id) => ({ id, label: ui.dots[id], icon: DOT_ICONS[id] }));
  const articles = getArticles();
  const c = profile.contacts;
  const hasResume = hasPublicFile(profile.resumePath);
  const contactCards = [
    { label: ui.emailLabel, value: c.email, href: `mailto:${c.email}`, external: false, icon: "mail" as const, wide: true },
    { label: "WhatsApp", value: c.whatsappDisplay, href: c.whatsappHref, external: true, icon: "whatsapp" as const },
    { label: "LinkedIn", value: "in/anderson-ventura", href: c.linkedin, external: true, icon: "linkedin" as const },
    { label: "GitHub", value: "VenturaCerqueira", href: c.github, external: true, icon: "github" as const },
    { label: `${company.name} ${ui.companySuffix}`, value: company.handle, href: company.instagram, external: true, icon: "instagram" as const },
    { label: "Instagram", value: "@andersonventuracerqueira", href: c.instagram, external: true, icon: "instagram" as const, wide: true },
  ];
  const secondaryCta = hasResume
    ? <a href={profile.resumePath} download data-goatcounter-click="curriculo-hero" className={btnGhost}>{ui.downloadCvPdf}</a>
    : <a href={c.linkedin} {...ext} data-goatcounter-click="linkedin-hero" className={btnGhost}><SocialIcon name="linkedin" className="text-[#0a66c2]" /> {ui.seeLinkedin}</a>;

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        {ui.skip}
      </a>
      <div className="scroll-progress" aria-hidden />
      <RevealObserver />

      <Header t={t} />
      <SectionDots items={sectionDots} label={ui.search.groups.sections} />
      <BackToTop label={ui.backToTop} />
      <PixelPet t={ui.pet} />
      <Terminal data={{
        lang, name: profile.name, role: profile.role, location: profile.location, summary: profile.summary,
        email: c.email, whatsapp: c.whatsappDisplay, whatsappHref: c.whatsappHref, linkedin: c.linkedin, github: c.github,
        resume: hasResume ? profile.resumePath : null,
        projects: [...featuredProjects, ...openSource].map((p) => ({ title: p.title, href: p.links[0].href, stack: p.stack })),
        cases: CASES[lang].map((cs) => cs.title),
        skills: skills.map((s) => ({ group: s.group, items: s.items.map((i) => ui.techNames[i] ?? i) })),
        jobs: experience.map((j) => ({ role: j.role, company: j.company, period: j.period })),
        sections: sectionDots.map((d) => ({ id: d.id, label: d.label })),
      }} />

      <main id="conteudo">
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden">
          <div className="hero-bg hero-bg-fade absolute inset-0 -z-10 opacity-60" />
          <div className="blob -z-10 left-[-120px] top-10 h-80 w-80 bg-accent" />
          <div className="blob -z-10 right-[-80px] top-1/2 h-72 w-72 bg-teal [animation-delay:-6s]" />

          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-20">
            <div>
              <span className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                {ui.available}
              </span>

              <h1 className="reveal mt-6 [transition-delay:80ms]">
                <span className="block text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{profile.shortName}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-bold sm:text-2xl">
                  {ui.roleTitle}
                  <span className="rounded-lg bg-gradient-to-r from-accent to-accent-2 px-3 py-0.5 text-white shadow-md shadow-accent/30">{ui.levelBadge}</span>
                </span>
              </h1>

              <p className="reveal mt-5 flex flex-wrap gap-2 [transition-delay:140ms]">
                {ui.heroTags.map((t, i) => (
                  <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 2 ? "ai-border bg-accent-soft text-accent" : "border border-border bg-surface text-muted"}`}>
                    {i === 2 && <Icon name="sparkles" className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />}{t}
                  </span>
                ))}
              </p>

              <p className="reveal mt-6 min-h-[2.75em] text-2xl font-bold leading-snug tracking-tight [transition-delay:200ms] sm:text-3xl">
                {ui.heroLead}{" "}
                <span className="relative inline-block">
                  <Typewriter className="text-gradient" words={ui.heroWords} />
                  <svg className="absolute -bottom-1.5 left-0 w-full text-accent" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                    <path className="underline-draw" d="M2 9 C 80 2, 220 2, 298 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </p>
              <p className="reveal mt-5 max-w-xl leading-relaxed text-muted [transition-delay:260ms]">
                {ui.heroText}
              </p>

              <div className="reveal mt-8 flex flex-wrap gap-3 [transition-delay:320ms]">
                <a href="#projetos" className={btnPrimary}>{ui.seeProjects} <span className="arrow-nudge" aria-hidden>→</span></a>
                {secondaryCta}
              </div>
              <p className="reveal mt-4 flex items-center gap-2 text-xs text-muted [transition-delay:360ms]">
                <Icon name="pin" className="h-4 w-4 text-accent" /> {profile.location} · {ui.workMode}
              </p>
            </div>

            {/* foto */}
            <div className="reveal reveal-zoom relative mx-auto w-full max-w-sm [transition-delay:200ms]">
              <div className="ring rounded-[2rem] p-[3px] shadow-2xl shadow-accent/30">
                <div className="aspect-[4/5] overflow-hidden rounded-[calc(2rem-3px)] bg-surface">
                  <Photo src={profile.photo} alt={`${ui.photoAlt} ${profile.shortName}`} initials="AV" className="object-[50%_25%] transition duration-700 hover:scale-105" />
                </div>
              </div>
              <span className="float absolute right-2 -top-4 flex sm:-right-6 items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold shadow-lg">
                <Icon name="sparkles" className="h-4 w-4 text-accent" /> {ui.badgeAi}
              </span>
              <div className="float absolute left-2 bottom-28 rounded-xl sm:-left-8 border border-border bg-surface px-4 py-3 shadow-xl [animation-delay:1.5s]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">{ui.inProduction}</p>
                <p className="flex items-center gap-1.5 text-sm font-bold">
                  <Icon name="check" className="h-4 w-4 text-teal" /> {ui.systemsLive}
                </p>
              </div>
              <div className="float absolute -bottom-6 -right-6 hidden rounded-xl border border-white/15 bg-[#0f1222]/90 px-4 py-3 font-mono text-[11px] leading-relaxed text-white/90 shadow-xl backdrop-blur [animation-delay:3s] sm:block">
                <p><span className="text-[#93c5fd]">def</span> consultar(id):</p>
                <p className="pl-3"><span className="text-[#93c5fd]">return</span> db.buscar(id)</p>
              </div>
            </div>
          </div>

          {/* RESUMO PARA RECRUTADORES */}
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <div className="reveal rounded-3xl border border-border bg-surface/90 p-6 shadow-xl shadow-accent/5 backdrop-blur sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  <Icon name="check" className="h-5 w-5" /> {ui.summaryTitle}
                </h2>
                <div className="grid w-full grid-cols-3 gap-4 sm:flex sm:w-auto sm:gap-8">
                  {highlights.map((h) => (
                    <div key={h.label} className="text-center sm:text-right">
                      <p className="text-2xl font-extrabold"><CountUp to={Number(h.value)} /><span className="text-teal">+</span></p>
                      <p className="mx-auto max-w-[9rem] text-[11px] leading-tight text-muted sm:mx-0">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {recruiterSummary.map((r, ri) => (
                  <div key={r.label} className="group/item flex items-start gap-3 bg-surface p-4 transition hover:bg-accent-soft/40">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition duration-300 group-hover/item:rotate-6 group-hover/item:bg-accent group-hover/item:text-white">
                      <NavIcon name={r.icon} size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">{r.label}</p>
                      <p className={`mt-0.5 font-bold ${ri === 0 ? "text-accent" : ""}`}>{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="border-y border-border bg-surface/60 py-10" aria-label={ui.marqueeAria}>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {ui.marqueeTitle}
          </p>
          <Marquee items={marqueeOrgs} variant="text" />
          <div className="mt-5"><Marquee items={marqueeTech} variant="chip" slow /></div>
        </section>

        {/* PROJETOS */}
        <Section id="projetos" kicker={ui.projKicker} title={<>{ui.projTitleA}<span className="text-gradient">{ui.projTitleB}</span></>}
          intro={ui.projIntro}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} ui={ui} />)}
          </div>

          <div id="open-source" className="reveal mx-auto mb-10 mt-20 max-w-2xl scroll-mt-28 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{ui.osKicker}</p>
            <h3 className="text-2xl font-extrabold sm:text-3xl">{ui.osTitle}</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {openSource.map((p, i) => <ProjectCard key={p.title} p={p} index={i} ui={ui} />)}
          </div>
          <div className="mt-10 text-center">
            <a href={`${c.github}?tab=repositories`} {...ext} className={btnGhost}>{ui.allRepos}</a>
          </div>
        </Section>

        {/* ESTUDOS DE CASO */}
        <Section id="casos" alt kicker={ui.cases.kicker} title={<>{ui.cases.titleA}<span className="text-gradient">{ui.cases.titleB}</span></>} intro={ui.cases.intro}>
          <CaseStudies cases={CASES[lang]} ui={ui} />
        </Section>

        {/* IA */}
        <section id="ia" className="relative overflow-hidden bg-[#0d0f22] text-white">
          <div className="hero-bg absolute inset-0 opacity-[0.07]" />
          <div className="blob left-1/4 top-0 h-72 w-72 bg-accent opacity-40" />
          <div className="blob bottom-0 right-10 h-64 w-64 bg-teal opacity-30 [animation-delay:-8s]" />
          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="reveal mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a99bff]">
                <Icon name="sparkles" className="h-4 w-4" /> {ui.aiKicker}
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {ui.aiTitleA}<span className="bg-gradient-to-r from-[#a99bff] to-[#5eead4] bg-clip-text text-transparent">{ui.aiTitleB}</span>
              </h2>
              <p className="mt-4 text-white/70">
                {ui.aiIntro}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {aiExperience.map((a, i) => (
                <article key={a.title} style={{ transitionDelay: `${(i % 2) * 120}ms` }}
                  className="reveal group ai-border rounded-2xl bg-white/[0.04] p-6 backdrop-blur transition hover:bg-white/[0.07]">
                  <div className="flex items-start gap-4">
                    <span className="ico-box grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#8b7bff]/20 text-[#c4b8ff]">
                      <Icon name={a.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{a.text}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => <li key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/75">{t}</li>)}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* NÍVEL */}
        <Section id="nivel" kicker={ui.levelKicker} title={<>{ui.levelTitleA}<span className="text-gradient">{ui.levelBadge}</span>{ui.levelTitleC}</>}
          intro={ui.levelIntro}>
          <div className="reveal mb-14 rounded-3xl border border-border bg-surface p-6 sm:p-10">
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-[20px] h-1 rounded-full bg-border" />
              <div className="career-fill absolute left-[10%] right-[10%] top-[20px] h-1 rounded-full bg-gradient-to-r from-accent via-accent-2 to-teal" />
              <ol className="relative grid grid-cols-5 gap-2">
                {careerSteps.map((s, i) => {
                  const last = i === careerSteps.length - 1;
                  return (
                    <li key={s.year} className="flex flex-col items-center text-center">
                      <span style={{ animationDelay: `${0.3 + i * 0.35}s` }}
                        className={`career-dot group/item relative grid h-11 w-11 place-items-center rounded-full border-4 border-surface text-white shadow-lg transition hover:scale-110 ${last ? "bg-teal shadow-teal/40" : "bg-accent shadow-accent/30"}`}>
                        {last && <span className="absolute inset-0 animate-ping rounded-full bg-teal/40" aria-hidden />}
                        <NavIcon name={s.icon} size={18} className="relative" />
                      </span>
                      <span className={`mt-3 text-xs font-bold ${last ? "text-teal" : "text-accent"}`}>{s.year}</span>
                      <span className={`mt-1 text-[11px] leading-tight sm:text-sm ${last ? "font-bold" : "text-muted"}`}>{s.role}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {levelEvidence.map((e, i) => (
              <div key={e.title} style={{ transitionDelay: `${i * 90}ms` }} className="reveal group rounded-2xl border border-border bg-surface p-6 hover:border-accent">
                <span className="ico-box grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={e.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* DEVTI'S */}
        <section id="devtis" className="px-4 pb-8 sm:px-6">
          <div className="reveal reveal-zoom relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-xl shadow-accent/5 sm:p-12">
            <div className="blob -right-10 -top-10 h-56 w-56 bg-accent opacity-20" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                  <Icon name="sparkles" className="h-4 w-4" /> {ui.devtisBadge}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {ui.devtisTitle}<span className="text-gradient">{company.name}</span>
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">{company.pitch}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {ui.devtisNote}
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { href: company.instagram, title: company.name, sub: `${company.handle} · ${ui.igCompany}` },
                  { href: "https://www.instagram.com/agendaaiapp/", title: "AgendaAI", sub: `@agendaaiapp · ${ui.igProduct}` },
                  { href: profile.contacts.instagram, title: "Anderson Ventura", sub: `@andersonventuracerqueira · ${ui.igPersonal}` },
                ].map((ig) => (
                  <a key={ig.href} href={ig.href} {...ext}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-bg p-4 transition hover:-translate-y-0.5 hover:border-accent">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white transition group-hover:rotate-6 group-hover:scale-110">
                      <SocialIcon name="instagram" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold">{ig.title}</span>
                      <span className="block truncate text-xs text-muted">{ig.sub}</span>
                    </span>
                    <span className="link-arrow ml-auto text-accent"><span aria-hidden>→</span></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIÊNCIA */}
        <Section id="experiencia" alt kicker={ui.expKicker} title={<>{ui.expTitleA}<span className="text-gradient">{ui.expTitleB}</span></>}>
          <ExperienceTimeline jobs={experience} ui={ui} />
        </Section>

        {/* STACK */}
        <Section id="stack" kicker={ui.stackKicker} title={<>{ui.stackTitleA}<span className="text-gradient">{ui.stackTitleB}</span></>}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.title} style={{ transitionDelay: `${(i % 3) * 90}ms` }} className="reveal group rounded-2xl border border-border bg-surface p-6 hover:border-accent">
                <span className="ico-box grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 grid gap-6 rounded-3xl border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group} className="group">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <span className="ico-box grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  {s.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="group/tech flex cursor-default items-center gap-2 rounded-xl border border-border bg-bg py-1.5 pl-2 pr-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md hover:shadow-accent/10">
                      <TechIcon name={i} />
                      {ui.techNames[i] ?? i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* SOBRE */}
        <Section id="sobre" alt kicker={ui.aboutKicker} title={<>{ui.aboutTitleA}<span className="text-gradient">Anderson</span></>}>
          {/* código + história */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div className="reveal reveal-left">
              <CodeIntro role={profile.role} location={profile.location} studying={`${education[0].title} · UCSAL`} />
              <TerminalTrigger label={ui.footer.terminalHint}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-3 py-2 font-mono text-xs text-muted transition hover:border-accent hover:text-accent" />
            </div>
            <div className="reveal reveal-right">
              {hasPublicFile(profile.photoAbout) && (
                <div className="group mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                  <Photo src={profile.photoAbout} alt={`${profile.shortName} ${ui.photoAboutAlt}`} initials="AV" className="transition duration-700 group-hover:scale-105" />
                </div>
              )}
              {(() => {
                const cut = profile.summary.indexOf(". ");
                const sentences = cut > 0 ? [profile.summary.slice(0, cut + 1), profile.summary.slice(cut + 2)] : [profile.summary, ""];
                const terms = ["Python", "Node.js", "SQL", "APIs REST", "REST APIs", "Docker", "backend"];
                const mark = (text: string) =>
                  text.split(new RegExp(`(${terms.map((x) => x.replace(".", "\\.")).join("|")})`, "g")).map((part, k) =>
                    terms.includes(part)
                      ? <span key={k} className="rounded-md bg-accent-soft px-1.5 py-0.5 font-semibold text-accent">{part}</span>
                      : part,
                  );
                return (
                  <>
                    <p className="text-xl font-semibold leading-relaxed tracking-tight">{mark(sentences[0].trim())}</p>
                    <p className="mt-4 leading-relaxed text-muted">{mark(sentences.slice(1).join(" ").trim())}</p>
                  </>
                );
              })()}
              <ul className="mt-6 flex flex-wrap gap-2">
                {([
                  ["pin", profile.location],
                  ["clock", ui.aboutFacts[0]],
                  ["cap", ui.aboutFacts[1]],
                  ["building", ui.aboutFacts[2]],
                  ["globe", ui.aboutFacts[3]],
                ] as const).map(([icon, label], fi) => (
                  <li key={label} style={{ animationDelay: `${fi * 120}ms` }}
                    className="about-chip group/item flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                    <NavIcon name={icon} size={15} className="text-accent" /> {label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#contato" className={btnPrimary}>{ui.aboutCta} <span className="arrow-nudge" aria-hidden>→</span></a>
                <a href={c.linkedin} {...ext} className={btnGhost}><SocialIcon name="linkedin" className="text-[#0a66c2]" /> LinkedIn</a>
              </div>
            </div>
          </div>

          {/* como eu trabalho */}
          <h3 className="reveal mb-6 mt-20 text-center text-2xl font-extrabold tracking-tight">{ui.aboutValuesTitle}</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ui.aboutValues.map((v, vi) => (
              <div key={v.title} style={{ transitionDelay: `${vi * 90}ms` }}
                className="reveal group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10">
                <span className="absolute -right-2 -top-4 select-none text-7xl font-extrabold text-accent/[0.07] transition duration-500 group-hover:text-accent/15" aria-hidden>
                  {String(vi + 1).padStart(2, "0")}
                </span>
                <span className="ico-box relative grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={(["compass", "automation", "chart", "sparkles"] as const)[vi]} className="h-6 w-6" />
                </span>
                <h4 className="relative mt-4 font-bold">{v.title}</h4>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>

          {/* formação + cursos e idiomas */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal reveal-left rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent"><NavIcon name="cap" size={18} /></span>
                {ui.educationTitle}
              </h3>
              <ol className="relative space-y-6 border-l-2 border-dashed border-border pl-7">
                {education.map((e) => (
                  <li key={e.title} className="group/item relative">
                    <span className={`absolute -left-[41px] top-0 grid h-7 w-7 place-items-center rounded-full border-4 border-surface text-white ${e.done ? "bg-teal" : "bg-accent"}`}>
                      {!e.done && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" aria-hidden />}
                      {e.done
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                        : <NavIcon name="cap" size={12} className="relative" />}
                    </span>
                    <h4 className="font-bold transition group-hover/item:text-accent">{e.title}</h4>
                    <p className="text-sm text-muted">{e.school}</p>
                    <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${e.done ? "bg-teal/10 text-teal" : "bg-accent-soft text-accent"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${e.done ? "bg-teal" : "animate-pulse bg-accent"}`} />{e.status}
                    </p>
                    {!e.done && <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-accent-soft"><div className="edu-progress h-full w-1/3 rounded-full bg-gradient-to-r from-accent to-accent-2" /></div>}
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal reveal-right grid gap-6">
              <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent"><NavIcon name="book" size={18} /></span>
                  {ui.courses}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {courses.map((x) => (
                    <li key={x} className="cursor-default rounded-xl border border-border bg-bg px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">{x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <span className="group grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent"><NavIcon name="globe" size={18} /></span>
                  {ui.languages}
                </h3>
                <ul className="space-y-4">
                  {languages.map((l) => (
                    <li key={l.name} className="group/lang flex items-center gap-3">
                      <Flag code={l.flag} width={30} className="transition duration-300 group-hover/lang:-rotate-6 group-hover/lang:scale-110" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{l.name}</span>
                        <span className="block text-sm text-muted">{l.level}</span>
                      </span>
                      <span className="flex gap-1" aria-hidden>
                        {[1, 2, 3].map((d) => (
                          <span key={d} className={`h-2.5 w-2.5 rounded-full transition duration-300 group-hover/lang:scale-125 ${d <= l.dots ? "bg-gradient-to-br from-accent to-teal" : "bg-border"}`} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ARTIGOS (aparece só quando há artigos; rascunhos só no localhost) */}
        {articles.length > 0 && (
          <Section id="artigos" kicker={ui.articles.kicker} title={<>{ui.articles.titleA}<span className="text-gradient">{ui.articles.titleB}</span></>} intro={ui.articles.intro}>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((a, i) => (
                <a key={a.slug} href={`/artigos/${a.slug}/`} style={{ transitionDelay: `${i * 90}ms` }}
                  className="reveal group flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.draft && <span className="rounded-full bg-[#f5a524]/15 px-2.5 py-0.5 text-xs font-bold text-[#b26b00]">{ui.articles.draft}</span>}
                    {ui.articles.pt && <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">{ui.articles.pt}</span>}
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted">{a.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-accent">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
                  <p className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-muted">{a.minutes} {ui.articles.min}</span>
                    <span className="link-arrow font-semibold text-accent">{ui.articles.read} <span aria-hidden>→</span></span>
                  </p>
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* CONTATO */}
        <section id="contato" className="px-4 py-24 sm:px-6">
          <div className="cta-shine reveal reveal-zoom relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-2 p-8 text-white shadow-2xl shadow-accent/30 sm:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{ui.contactTitle}</h2>
                <p className="mt-4 text-white/85">{ui.contactText}</p>
                <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/75">{ui.hiring.title}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {([
                      [ui.hiring.role, ui.hiring.roleV], [ui.hiring.contract, ui.hiring.contractV],
                      [ui.hiring.mode, ui.hiring.modeV], [ui.hiring.start, ui.hiring.startV],
                    ] as const).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-white/70">{k}</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {profile.calLink && (
                    <a href={profile.calLink} {...ext} data-goatcounter-click="agendar-conversa" className="group inline-flex items-center gap-2 rounded-full bg-[#0f1222] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
                      <NavIcon name="clock" size={16} className="text-[#5eead4]" /> {ui.hiring.schedule}
                    </a>
                  )}
                  <a href={c.whatsappHref} {...ext} data-goatcounter-click="whatsapp-contato" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent shadow-lg transition hover:-translate-y-0.5"><SocialIcon name="whatsapp" className="text-[#25D366] transition group-hover:scale-110" /> {ui.contactWhatsapp} <span className="arrow-nudge" aria-hidden>→</span></a>
                  <a href={`mailto:${c.email}`} className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"><SocialIcon name="mail" className="transition group-hover:scale-110" /> {ui.contactEmail}</a>
                  {hasResume && <a href={profile.resumePath} download data-goatcounter-click="curriculo-contato" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">{ui.contactCv}</a>}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {contactCards.map((k) => (
                  <a key={k.label} href={k.href} {...(k.external ? ext : {})}
                    className={`${"wide" in k && k.wide ? "sm:col-span-2" : ""} group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20`}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 transition group-hover:rotate-6 group-hover:scale-110 group-hover:bg-white group-hover:text-accent">
                      <SocialIcon name={k.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/75">{k.label}</span>
                      <span className="mt-0.5 block text-sm font-semibold [overflow-wrap:anywhere]">{k.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />

      <a href={c.whatsappHref} {...ext} data-goatcounter-click="whatsapp-flutuante" aria-label={ui.whatsappAria}
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.2-.3-.2-.5-.3z" />
        </svg>
      </a>
    </>
  );
}
