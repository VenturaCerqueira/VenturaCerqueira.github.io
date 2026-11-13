// Fonte única de conteúdo do portfólio. Edite aqui; a UI não precisa mudar.
import type { IconName } from "@/components/Icon";
import type { NavIconName } from "@/components/NavIcon";

export type Link = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  stack: string[];
  links: Link[];
  tag?: string;
  cover?: string; // print do sistema em /public/projects
};

export type Job = {
  role: string;
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  promotion?: boolean; // cargo alcançado por promoção
  icon: NavIconName;
  tags?: string[]; // nomes iguais aos de components/TechIcon.tsx (ganham logo)
  bullets: string[];
};

const GH = "https://github.com/VenturaCerqueira";
const repo = (name: string) => `${GH}/${name}`;

export const profile = {
  name: "Anderson Ventura Cerqueira",
  shortName: "Anderson Ventura",
  role: "Analista de Desenvolvimento Pleno",
  headline: "Backend · Automação · Inteligência Artificial",
  location: "Candeias, BA, Brasil",
  summary:
    "Analista de Sistemas com mais de 5 anos de experiência em tecnologia, com foco em desenvolvimento backend e engenharia de software. Atuação sólida em automação de processos, integração de sistemas e análise de requisitos, com Python, Node.js, SQL e APIs REST em ambientes corporativos. Vivência com Docker, bancos relacionais, times ágeis e documentação técnica. Também atuo como mentor tecnológico, apoiando equipes no desenvolvimento de projetos inovadores.",
  contacts: {
    email: "andersonventura2000@gmail.com",
    whatsappDisplay: "+55 71 8146-5381",
    whatsappHref: "https://wa.me/557181465381",
    linkedin: "https://www.linkedin.com/in/anderson-ventura",
    github: GH,
    instagram: "https://www.instagram.com/andersonventuracerqueira/",
  },
  // Coloque o PDF do currículo em /public com este nome.
  resumePath: "/curriculo-anderson-ventura.pdf",
  coverLetterPath: "/carta-apresentacao-anderson-ventura.pdf",
  // Link de agendamento (ex.: "https://cal.com/seu-usuario/30min"). Vazio = botão oculto.
  calLink: "https://cal.com/anderson-ventura-skfgbi/30min",
  // Coloque sua foto em /public com este nome (quadrada ou retrato, min. 800px). Sem o arquivo, aparece um avatar com iniciais.
  photo: "/foto-anderson.webp",
  // Opcional: segunda foto (ex.: palestrando, mentoria) para a seção Sobre.
  photoAbout: "/foto-anderson-2.jpg",
};

// ===== Empresa própria =====
export const company = {
  name: "DevTI's",
  type: "MEI",
  pitch: "Empresa própria de desenvolvimento: sistemas, sites e automações sob medida para outras empresas, do levantamento de requisitos à entrega e suporte.",
  instagram: "https://www.instagram.com/dev.ti.s/",
  handle: "@dev.ti.s",
};

export const highlights = [
  { value: "5", label: "anos de experiência em tecnologia" },
  { value: "50", label: "repositórios públicos no GitHub" },
  { value: "6", label: "sistemas e sites em produção" },
];

export const marqueeOrgs = ["Keep Informática", "DevTI's", "e-Contrib", "Prefeituras municipais", "AgendaAI", "KeepFolha", "BFT Camarão", "Colégio Luiz Viana Filho"];
export const marqueeTech = ["Python", "Node.js", "TypeScript", "SQL Server", "MySQL", "Firebird", "APIs REST", "Docker", "Power BI", "Web Scraping", "IA Generativa", "Claude Code", "Git", "Scrum"];

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "api", title: "Backend e APIs REST", text: "Serviços em Python e Node.js, integrações entre sistemas e APIs documentadas e testadas." },
  { icon: "automation", title: "Automação de processos", text: "Scripts e robôs que eliminam trabalho manual: scraping, extração de PDFs, rotinas SQL." },
  { icon: "database", title: "Banco de dados", text: "Modelagem, otimização de consultas e documentação em MySQL, SQL Server e Firebird." },
  { icon: "chart", title: "Dashboards e BI", text: "Relatórios estratégicos no Power BI para apoiar a tomada de decisão." },
  { icon: "design", title: "Interfaces web", text: "Design e redesign de telas de sistemas, como as telas de acesso da NFS-e e do KeepFolha." },
  { icon: "compass", title: "Requisitos e Product Owner", text: "Levantamento junto ao cliente, priorização de backlog e documentação técnica." },
];

// ===== Resumo rápido para recrutadores (hero) =====
export const recruiterSummary: { label: string; value: string; icon: NavIconName }[] = [
  { label: "Nível", value: "Pleno", icon: "trend" },
  { label: "Experiência", value: "5+ anos em TI · 3+ em desenvolvimento", icon: "clock" },
  { label: "Stack principal", value: "Python · Node.js · SQL · APIs REST", icon: "code" },
  { label: "IA", value: "Desenvolvimento assistido e agentes de IA", icon: "sparkles" },
  { label: "Disponibilidade", value: "Remoto ou híbrido · CLT ou PJ · início imediato", icon: "pin" },
  { label: "Empresa própria", value: "DevTI's (MEI) · sistemas para empresas", icon: "building" },
];

// ===== IA: CONFIRME/AJUSTE estes textos: descreva só o que você realmente fez =====
export const aiExperience: { icon: IconName; title: string; text: string; tags: string[] }[] = [
  {
    icon: "sparkles",
    title: "Desenvolvimento assistido por IA",
    text: "Uso diário de assistentes e agentes de código (Claude Code, ChatGPT) para acelerar implementação, refatoração, testes e documentação, sempre com revisão técnica do resultado.",
    tags: ["Claude Code", "ChatGPT", "Code review"],
  },
  {
    icon: "agents",
    title: "Agentes e engenharia de prompt",
    text: "Desenho de prompts estruturados e fluxos multi-agente, escolhendo o modelo certo para cada tarefa (custo × qualidade) e controlando o contexto enviado.",
    tags: ["Prompt engineering", "Multi-agente", "LLMs"],
  },
  {
    icon: "bot",
    title: "Assistentes virtuais em produtos",
    text: "Participação em produtos com assistentes inteligentes em produção, como o AgendaAI (agendamento via WhatsApp) e o assistente Keeper dos portais e-Contrib.",
    tags: ["Chatbots", "WhatsApp", "UX conversacional"],
  },
  {
    icon: "automation",
    title: "Automação + IA sobre dados",
    text: "Pipelines de extração de dados (PDFs, notas fiscais, eSocial) em Python que alimentam análises, dashboards e integrações com modelos de IA.",
    tags: ["Python", "Extração de dados", "BI"],
  },
];

// ===== Evidências de nível =====
export const levelEvidence: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Autonomia ponta a ponta", text: "Levanta requisitos com o cliente como Product Owner, modela, desenvolve, testa e publica." },
  { icon: "database", title: "Sistemas críticos em produção", text: "Gestão tributária municipal: NFS-e, dívida ativa e arrecadação de prefeituras." },
  { icon: "users", title: "Mentoria e liderança técnica", text: "Orientou 6 equipes em projetos de software e Arduino; treina usuários e colegas." },
  { icon: "chart", title: "Visão de negócio", text: "Dashboards no Power BI e automações que reduzem trabalho manual e apoiam decisões." },
];

export const careerSteps: { year: string; role: string; icon: NavIconName }[] = [
  { year: "2019", role: "Estágio em Suporte", icon: "headset" },
  { year: "2020", role: "Suporte Técnico", icon: "wrench" },
  { year: "2022", role: "Analista de Suporte", icon: "briefcase" },
  { year: "2023", role: "Analista de Sistemas", icon: "code" },
  { year: "Hoje", role: "Analista de Desenvolvimento Pleno", icon: "rocket" },
];

export const featuredProjects: Project[] = [
  {
    title: "AgendaAI",
    cover: "/projects/agendaai.webp",
    tag: "Produto SaaS · IA",
    description:
      "Plataforma de agendamento online e via WhatsApp para salões, barbearias, clínicas e profissionais autônomos, com assistente inteligente. Lembretes automáticos, agenda da equipe, cupons e atendimento online.",
    stack: ["Web", "WhatsApp", "SaaS", "IA"],
    links: [
      { label: "Acessar site", href: "https://www.agendaaiweb.com.br/" },
      { label: "Instagram", href: "https://www.instagram.com/agendaaiapp/" },
    ],
  },
  {
    title: "e-Contrib: Gestão Tributária Municipal",
    cover: "/projects/econtrib.webp",
    tag: "Keep Informática",
    description:
      "Sistema de gestão tributária municipal: tributos, NFS-e nacional, dívida ativa e integração com o SIAFIC. Atuação em requisitos (PO), backend, scripts SQL/Python, APIs e manutenção evolutiva.",
    stack: ["Node.js", "Python", "SQL", "APIs REST"],
    links: [
      { label: "Acessar site", href: "https://www.e-contrib.com.br/" },
      { label: "API (GitHub)", href: repo("API_e-Contrib") },
    ],
  },
  {
    title: "NFS-e: Tela de Login",
    cover: "/projects/nfse.webp",
    tag: "Design de UI",
    description:
      "Design da interface de acesso ao módulo de Nota Fiscal de Serviços eletrônica do e-Contrib.",
    stack: ["UI Design", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Acessar site", href: "https://www.e-contrib.com.br/nfs-e/login" },
      { label: "GitHub", href: repo("NFS-e-novo") },
    ],
  },
  {
    title: "Portal do Contribuinte de Iaçu",
    cover: "/projects/iacu.webp",
    tag: "Gestão pública",
    description:
      "Portal municipal para emissão de guias, certidões e validação de documentos pelo contribuinte, com assistente virtual (Keeper).",
    stack: ["JavaScript", "Web", "Assistente virtual"],
    links: [
      { label: "Acessar site", href: "https://www.e-contrib.com.br/portal-contribuinte/iacu" },
      { label: "GitHub", href: repo("Portal_Contribuinte_web") },
    ],
  },
  {
    title: "KeepFolha: Tela de acesso",
    cover: "/projects/keepfolha.webp",
    tag: "Redesign de UI",
    description: "Remake do design da tela de acesso do KeepFolha, sistema de folha de pagamento municipal com BI, eSocial e SIAFIC.",
    stack: ["UI Design", "Front-end"],
    links: [{ label: "Acessar site", href: "https://www.keepfolha.com.br/evento/index" }],
  },
  {
    title: "BFT Camarão",
    cover: "/projects/bft.webp",
    tag: "Site institucional",
    description: "Site do sistema de gestão para carcinicultura (criação de camarão em bioflocos).",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "Acessar site", href: "https://bftcamarao.vercel.app" },
      { label: "GitHub", href: repo("website") },
    ],
  },
];

export const openSource: Project[] = [
  {
    title: "API CNAE do IBGE",
    description:
      "API que consome e formata dados da Classificação Nacional de Atividades Econômicas (IBGE), retornando classes e subclasses com códigos concatenados.",
    stack: ["TypeScript", "Node.js", "Swagger"],
    links: [{ label: "GitHub", href: repo("API-CNAE-IBGE-TS") }],
  },
  {
    title: "Scraping eSocial",
    description:
      "Extração automatizada de dados do eSocial com navegação multi-página, retomada de progresso via JSON, tolerância a falhas e exportação CSV.",
    stack: ["Python", "BeautifulSoup", "pandas", "pyautogui"],
    links: [{ label: "GitHub", href: repo("Scraping-eSocial") }],
  },
  {
    title: "Gerador de Esquema MySQL → Markdown",
    description:
      "Conecta ao MySQL, extrai metadados de tabelas e colunas e gera documentação em Markdown. Credenciais via .env.",
    stack: ["Python", "MySQL"],
    links: [{ label: "GitHub", href: repo("Scraping-banco-relacao") }],
  },
  {
    title: "API de Extração de Notas Fiscais",
    description: "API em Python para extração de dados de notas fiscais.",
    stack: ["Python", "API"],
    links: [{ label: "GitHub", href: repo("consulta_nota") }],
  },
  {
    title: "Extrator de Servidores (PDF → Excel)",
    description:
      "Extrai nomes e CPFs de servidores públicos de PDFs e gera uma planilha limpa, registrando linhas fora do padrão.",
    stack: ["Python", "PDF", "Excel"],
    links: [{ label: "GitHub", href: repo("leitor-pdf") }],
  },
  {
    title: "Busca Moeda Google",
    description: "Consulta cotação de moedas via requisição GET, retornando nome oficial, valor em reais, data e hora.",
    stack: ["Python", "Web Scraping"],
    links: [{ label: "GitHub", href: repo("Busca_Moeda_Google") }],
  },
];

export const experience: Job[] = [
  {
    role: "Fundador e Desenvolvedor",
    company: "DevTI's (MEI), empresa própria",
    period: "Em paralelo", // AJUSTE: coloque o mês/ano de abertura, ex.: "03/2024 - Atual"
    current: true,
    icon: "building",
    tags: ["SaaS", "WhatsApp", "IA"],
    bullets: [
      "Desenvolvimento de sistemas, sites e automações sob medida para outras empresas.",
      "Atendimento direto ao cliente: requisitos, proposta, desenvolvimento, entrega e suporte.",
      "Produtos próprios, como o AgendaAI (agendamento online e via WhatsApp).",
    ],
  },
  {
    role: "Analista de Sistemas",
    company: "Keep Informática LTDA",
    period: "11/2023 - Atual",
    current: true,
    promotion: true,
    icon: "code",
    tags: ["Python", "SQL Server", "Power BI", "Docker", "APIs REST", "Scrum"],
    location: "Salvador, BA",
    bullets: [
      "Atuação como Product Owner, conduzindo levantamento e análise de requisitos junto aos clientes.",
      "Desenvolvimento e otimização de scripts em Python e SQL para automação de processos e performance.",
      "Manutenção, refatoração e correção de bugs, garantindo estabilidade e escalabilidade.",
      "Dashboards e relatórios estratégicos no Power BI para apoio à decisão.",
      "Implementação e testes de APIs REST; uso de Docker em ambientes conteinerizados.",
    ],
  },
  {
    role: "Mentor Tech (Projeto Educacional)",
    company: "Colégio Luiz Viana Filho",
    period: "2025",
    icon: "users",
    tags: ["Arduino", "Web"],
    location: "Candeias, BA",
    bullets: [
      "Orientação de 6 equipes na criação de sites, sistemas e soluções digitais.",
      "Apoio a projetos com Arduino integrando hardware e software.",
      "Ensino de lógica de programação e boas práticas de desenvolvimento.",
    ],
  },
  {
    role: "Analista de Suporte",
    company: "Keep Informática",
    period: "11/2022 - 08/2023",
    promotion: true,
    icon: "briefcase",
    tags: ["SQL Server", "Documentação técnica"],
    bullets: [
      "Diagnóstico e resolução de incidentes em sistemas corporativos.",
      "Testes funcionais e de desempenho; manutenção e ajustes em código-fonte.",
      "Documentação técnica e treinamento de usuários em segurança da informação.",
    ],
  },
  {
    role: "Suporte Técnico",
    company: "Keep Informática",
    period: "09/2020 - 10/2022",
    icon: "wrench",
    bullets: [
      "Suporte a clientes internos e externos com foco em alta disponibilidade.",
      "Análise de falhas e testes para identificar gargalos de desempenho.",
      "Documentação de processos e monitoramento de indicadores.",
    ],
  },
  {
    role: "Estagiário de Suporte Técnico",
    company: "Chevrolet Retirauto Salvador",
    period: "02/2019 - 06/2019",
    icon: "headset",
    bullets: [
      "Help Desk / Service Desk, backup e restauração de dados, monitoramento de redes.",
    ],
  },
];

export const skills: { group: string; icon: IconName; items: string[] }[] = [
  { group: "Backend", icon: "api", items: ["Python", "Node.js", "TypeScript", "PHP"] },
  { group: "Banco de Dados", icon: "database", items: ["MySQL", "SQL Server", "Firebird", "Modelagem de Dados"] },
  { group: "APIs & Integrações", icon: "agents", items: ["APIs REST", "Postman", "Swagger", "Web Scraping"] },
  { group: "DevOps & Automação", icon: "automation", items: ["Docker", "Scripts automatizados", "Git", "GitHub"] },
  { group: "Dados & BI", icon: "chart", items: ["Power BI", "pandas", "Dashboards"] },
  { group: "Gestão & Métodos", icon: "compass", items: ["Scrum", "Jira", "Product Owner", "Documentação técnica"] },
];

export const education: { title: string; school: string; status: string; done: boolean }[] = [
  { title: "Bacharelado em Engenharia de Software", school: "UCSAL, Universidade Católica do Salvador", status: "Conclusão prevista: 07/2029", done: false },
  { title: "Pós-graduação em BI, Big Data e Analytics", school: "UNOPAR, Universidade Norte do Paraná", status: "Concluída", done: true },
  { title: "Tecnólogo em Análise e Desenvolvimento de Sistemas", school: "Faculdade São Salvador", status: "Concluído", done: true },
];

export const courses = [
  "Projetos Ágeis com Scrum",
  "PHP e Laravel (Udemy)",
  "Algoritmos e Estrutura de Dados",
  "Introdução ao Git e GitHub",
  "Modelagem de Dados",
  "Fundamentos de Redes (Cisco / SENAI)",
];

export const languages: { name: string; level: string; flag: "br" | "us" | "es"; dots: 1 | 2 | 3 }[] = [
  { name: "Português", level: "Nativo", flag: "br", dots: 3 },
  { name: "Inglês", level: "Técnico (leitura de documentação)", flag: "us", dots: 2 },
  { name: "Espanhol", level: "Básico (leitura)", flag: "es", dots: 1 },
];
