// Estudos de caso nos 3 idiomas. Baseados em fatos do currículo, dos sites e dos READMEs.
// Quando tiver números reais (horas economizadas, prefeituras atendidas etc.), acrescente em "outcome".
import type { Lang } from "@/data/i18n";

export type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  cover?: string;
  context: string;
  challenge: string;
  solution: string[];
  role: string;
  outcome: string;
  stack: string[]; // nomes de components/TechIcon.tsx
  links: { label: string; href: string }[];
};

const L = {
  econtrib: "https://www.e-contrib.com.br/",
  nfse: "https://www.e-contrib.com.br/nfs-e/login",
  iacu: "https://www.e-contrib.com.br/portal-contribuinte/iacu",
  agenda: "https://www.agendaaiweb.com.br/",
  agendaIg: "https://www.instagram.com/agendaaiapp/",
  esocial: "https://github.com/VenturaCerqueira/Scraping-eSocial",
};

const pt: CaseStudy[] = [
  {
    id: "econtrib",
    tag: "Keep Informática · Gestão pública",
    title: "e-Contrib: gestão tributária municipal em produção",
    cover: "/projects/econtrib.webp",
    context: "Sistema da Keep Informática usado por prefeituras para lançar e arrecadar tributos, emitir NFS-e, controlar a dívida ativa e integrar com o SIAFIC.",
    challenge: "Atender regras tributárias que mudam por município e por lei, como a NFS-e no padrão nacional, sem parar quem depende do sistema para arrecadar.",
    solution: [
      "Levantamento de requisitos direto com as prefeituras, atuando como Product Owner e priorizando o backlog.",
      "Scripts em Python e SQL para automatizar rotinas e otimizar consultas no banco de dados.",
      "APIs REST para integrar portais e serviços, testadas no Postman e executadas em Docker.",
      "Dashboards no Power BI para acompanhar a arrecadação e apoiar a gestão.",
      "Redesign da tela de login da NFS-e e portais do contribuinte com assistente virtual.",
    ],
    role: "Product Owner e desenvolvedor backend",
    outcome: "Sistema em produção em municípios, com NFS-e no padrão nacional e portais onde o contribuinte emite guias, certidões e valida documentos sozinho.",
    stack: ["Python", "Node.js", "APIs REST", "Docker", "Power BI", "Postman"],
    links: [
      { label: "Site do e-Contrib", href: L.econtrib },
      { label: "Login NFS-e", href: L.nfse },
      { label: "Portal de Iaçu", href: L.iacu },
    ],
  },
  {
    id: "agendaai",
    tag: "DevTI's · Produto SaaS",
    title: "AgendaAI: agendamento online com atendente no WhatsApp",
    cover: "/projects/agendaai.webp",
    context: "Produto SaaS da DevTI's para salões, barbearias, clínicas e profissionais autônomos.",
    challenge: "Clientes querem marcar horário a qualquer hora, inclusive de madrugada, e o profissional perde tempo respondendo mensagens, confirmando e lembrando horários.",
    solution: [
      "Página de agendamento online e atendente no WhatsApp que marca, confirma e lembra os horários.",
      "Lembretes automáticos, agenda da equipe e cupons de desconto.",
      "Assistente inteligente que apresenta o produto e tira dúvidas do visitante.",
    ],
    role: "Fundador: produto, desenvolvimento e atendimento ao cliente",
    outcome: "Produto no ar em agendaaiweb.com.br, com demonstração interativa e planos para diferentes segmentos.",
    stack: ["SaaS", "WhatsApp", "IA", "Web"],
    links: [
      { label: "Acessar o AgendaAI", href: L.agenda },
      { label: "Instagram", href: L.agendaIg },
    ],
  },
  {
    id: "esocial",
    tag: "Open source · Automação",
    title: "Scraping eSocial: coleta automatizada e resiliente",
    context: "Uma rotina exigia navegar página por página no portal do eSocial para coletar dados de remuneração.",
    challenge: "Processo manual, repetitivo e sujeito a quedas de sessão no meio da coleta, o que obrigava a recomeçar.",
    solution: [
      "Automação da navegação com pyautogui e extração do HTML com BeautifulSoup.",
      "Controle de progresso em JSON para retomar exatamente da página onde parou.",
      "Tentativas automáticas e nova sessão anônima em caso de falha.",
      "Exportação em CSV com pandas e finalização da competência ao terminar.",
    ],
    role: "Desenvolvedor (projeto open source)",
    outcome: "A coleta passou a rodar sozinha e a se recuperar de falhas, sem perder o que já tinha sido extraído.",
    stack: ["Python", "pandas", "Web Scraping"],
    links: [{ label: "Código no GitHub", href: L.esocial }],
  },
];

const en: CaseStudy[] = [
  {
    ...pt[0],
    tag: "Keep Informática · Public sector",
    title: "e-Contrib: municipal tax management in production",
    context: "Keep Informática's system used by Brazilian city governments to assess and collect taxes, issue electronic service invoices (NFS-e), manage tax debt and integrate with SIAFIC.",
    challenge: "Keeping up with tax rules that change by city and by law, such as the national NFS-e standard, without stopping the people who depend on the system to collect revenue.",
    solution: [
      "Requirements gathering directly with city governments, working as Product Owner and prioritizing the backlog.",
      "Python and SQL scripts to automate routines and optimize database queries.",
      "REST APIs to integrate portals and services, tested in Postman and running on Docker.",
      "Power BI dashboards to track revenue and support management.",
      "Redesign of the NFS-e login page and taxpayer portals with a virtual assistant.",
    ],
    role: "Product Owner and backend developer",
    outcome: "System in production in several cities, with NFS-e in the national standard and portals where taxpayers issue payment slips and certificates and validate documents on their own.",
    links: [
      { label: "e-Contrib website", href: L.econtrib },
      { label: "NFS-e login", href: L.nfse },
      { label: "Iaçu portal", href: L.iacu },
    ],
  },
  {
    ...pt[1],
    tag: "DevTI's · SaaS product",
    title: "AgendaAI: online scheduling with a WhatsApp assistant",
    context: "DevTI's SaaS product for salons, barbershops, clinics and independent professionals.",
    challenge: "Clients want to book at any time, even late at night, while professionals lose time answering messages, confirming and reminding appointments.",
    solution: [
      "Online booking page and a WhatsApp assistant that books, confirms and reminds appointments.",
      "Automatic reminders, team calendar and discount coupons.",
      "Intelligent assistant that presents the product and answers visitors' questions.",
    ],
    role: "Founder: product, development and customer support",
    outcome: "Product live at agendaaiweb.com.br, with an interactive demo and plans for different segments.",
    links: [
      { label: "Visit AgendaAI", href: L.agenda },
      { label: "Instagram", href: L.agendaIg },
    ],
  },
  {
    ...pt[2],
    tag: "Open source · Automation",
    title: "eSocial Scraping: automated and resilient data collection",
    context: "A routine required browsing the eSocial portal page by page to collect payroll data.",
    challenge: "A manual, repetitive process prone to session drops in the middle of the collection, forcing it to start over.",
    solution: [
      "Browser automation with pyautogui and HTML parsing with BeautifulSoup.",
      "Progress tracking in JSON to resume exactly from the last page.",
      "Automatic retries and a new private session on failure.",
      "CSV export with pandas and closing of the period when finished.",
    ],
    role: "Developer (open source project)",
    outcome: "The collection now runs on its own and recovers from failures without losing what was already extracted.",
    links: [{ label: "Code on GitHub", href: L.esocial }],
  },
];

const es: CaseStudy[] = [
  {
    ...pt[0],
    tag: "Keep Informática · Sector público",
    title: "e-Contrib: gestión tributaria municipal en producción",
    context: "Sistema de Keep Informática utilizado por municipios de Brasil para liquidar y recaudar tributos, emitir facturas electrónicas de servicios (NFS-e), controlar la deuda tributaria e integrarse con SIAFIC.",
    challenge: "Cumplir reglas tributarias que cambian según el municipio y la ley, como la NFS-e en el estándar nacional, sin detener a quienes dependen del sistema para recaudar.",
    solution: [
      "Levantamiento de requisitos directamente con los municipios, como Product Owner y priorizando el backlog.",
      "Scripts en Python y SQL para automatizar rutinas y optimizar consultas en la base de datos.",
      "APIs REST para integrar portales y servicios, probadas en Postman y ejecutadas en Docker.",
      "Dashboards en Power BI para seguir la recaudación y apoyar la gestión.",
      "Rediseño de la pantalla de login de la NFS-e y portales del contribuyente con asistente virtual.",
    ],
    role: "Product Owner y desarrollador backend",
    outcome: "Sistema en producción en municipios, con NFS-e en el estándar nacional y portales donde el contribuyente emite boletas y certificados y valida documentos por su cuenta.",
    links: [
      { label: "Sitio de e-Contrib", href: L.econtrib },
      { label: "Login NFS-e", href: L.nfse },
      { label: "Portal de Iaçu", href: L.iacu },
    ],
  },
  {
    ...pt[1],
    tag: "DevTI's · Producto SaaS",
    title: "AgendaAI: agendamiento en línea con asistente en WhatsApp",
    context: "Producto SaaS de DevTI's para salones, barberías, clínicas y profesionales independientes.",
    challenge: "Los clientes quieren reservar a cualquier hora, incluso de madrugada, y el profesional pierde tiempo respondiendo mensajes, confirmando y recordando citas.",
    solution: [
      "Página de reservas en línea y un asistente en WhatsApp que agenda, confirma y recuerda las citas.",
      "Recordatorios automáticos, agenda del equipo y cupones de descuento.",
      "Asistente inteligente que presenta el producto y responde las dudas de los visitantes.",
    ],
    role: "Fundador: producto, desarrollo y atención al cliente",
    outcome: "Producto en línea en agendaaiweb.com.br, con demostración interactiva y planes para distintos segmentos.",
    links: [
      { label: "Visitar AgendaAI", href: L.agenda },
      { label: "Instagram", href: L.agendaIg },
    ],
  },
  {
    ...pt[2],
    tag: "Código abierto · Automatización",
    title: "Scraping de eSocial: recolección automatizada y resiliente",
    context: "Una rutina exigía navegar página por página en el portal de eSocial para recolectar datos de remuneración.",
    challenge: "Proceso manual, repetitivo y expuesto a caídas de sesión a mitad de la recolección, lo que obligaba a empezar de nuevo.",
    solution: [
      "Automatización de la navegación con pyautogui y extracción del HTML con BeautifulSoup.",
      "Control del progreso en JSON para reanudar exactamente desde la última página.",
      "Reintentos automáticos y nueva sesión privada en caso de fallo.",
      "Exportación a CSV con pandas y cierre del período al terminar.",
    ],
    role: "Desarrollador (proyecto de código abierto)",
    outcome: "La recolección pasó a ejecutarse sola y a recuperarse de fallos sin perder lo que ya se había extraído.",
    links: [{ label: "Código en GitHub", href: L.esocial }],
  },
];

export const CASES: Record<Lang, CaseStudy[]> = { pt, en, es };
