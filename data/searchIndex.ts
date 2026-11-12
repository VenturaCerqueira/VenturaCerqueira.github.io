import type { Content } from "@/data/content";

// Índice da busca (Ctrl+K), gerado a partir do conteúdo do idioma atual.
export type SearchItem = { group: string; title: string; subtitle?: string; href: string; keywords: string };

// palavras-chave extras por seção (em todos os idiomas, para achar mesmo digitando em outra língua)
const SECTION_KEYWORDS: Record<string, string> = {
  inicio: "inicio topo resumo recrutador home top summary recruiter",
  projetos: "portfolio portafolio sites sistemas systems proyectos projects",
  "open-source": "github repositorios repositories codigo code",
  ia: "ia ai llm agentes agents prompt claude chatgpt inteligencia",
  nivel: "nivel level senioridade seniority pleno mid semi senior carreira career promocao promotion",
  devtis: "empresa company mei devtis empreendedor entrepreneur emprendedor",
  experiencia: "experiencia experience trabalho work emprego job keep",
  stack: "stack tecnologias technologies habilidades skills competencias",
  sobre: "sobre about formacao education faculdade university cursos courses idiomas languages ingles english",
  contato: "contato contact contacto contratar hire vaga job",
};

export function buildSearchIndex(t: Content): SearchItem[] {
  const g = t.ui.search.groups;
  const c = t.profile.contacts;
  return [
    ...Object.entries(t.ui.search.sections).map(([id, [title, subtitle]]) => ({
      group: g.sections, title, subtitle, href: `#${id}`, keywords: `${subtitle} ${SECTION_KEYWORDS[id] ?? ""}`,
    })),
    ...[...t.featuredProjects, ...t.openSource].map((p) => ({
      group: g.projects, title: p.title, subtitle: p.stack.join(" · "), href: p.links[0].href,
      keywords: `${p.description} ${p.tag ?? ""} ${p.stack.join(" ")}`,
    })),
    ...t.aiExperience.map((a) => ({ group: g.ai, title: a.title, subtitle: a.tags.join(" · "), href: "#ia", keywords: `${a.text} ${a.tags.join(" ")}` })),
    ...t.experience.map((j) => ({ group: g.experience, title: j.role, subtitle: `${j.company} · ${j.period}`, href: "#experiencia", keywords: j.bullets.join(" ") })),
    ...t.services.map((s) => ({ group: g.skills, title: s.title, subtitle: s.text, href: "#stack", keywords: s.text })),
    ...t.skills.map((s) => ({
      group: g.skills, title: s.group, subtitle: s.items.map((i) => t.ui.techNames[i] ?? i).join(" · "), href: "#stack", keywords: s.items.join(" "),
    })),
    ...([
      ["WhatsApp", c.whatsappDisplay, c.whatsappHref],
      [t.ui.emailLabel, c.email, `mailto:${c.email}`],
      ["LinkedIn", "in/anderson-ventura", c.linkedin],
      ["GitHub", "VenturaCerqueira", c.github],
      ["Instagram", "@andersonventuracerqueira", c.instagram],
      [`Instagram ${t.company.name}`, t.company.handle, t.company.instagram],
      ["Instagram AgendaAI", "@agendaaiapp", "https://www.instagram.com/agendaaiapp/"],
    ] as const).map(([title, subtitle, href]) => ({ group: g.contact, title, subtitle, href, keywords: "contato contact contacto rede social" })),
  ];
}
