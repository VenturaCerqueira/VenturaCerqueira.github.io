// Conteúdo em espanhol. Links, ícones, capas e datas vêm do português (data/profile.ts); aqui só os textos.
// Os arrays seguem a MESMA ORDEM do arquivo em português.
import * as pt from "@/data/profile";

const zip = <T extends object, P>(base: T[], tr: P[]) => base.map((b, i) => ({ ...b, ...tr[i] }));
const period = (p: string) => p.replace("Atual", "Actual").replace("Em paralelo", "En curso");

export const profile = {
  ...pt.profile,
  resumePath: "/cv-anderson-ventura-es.pdf",
  role: "Analista de Desarrollo Semi Senior",
  headline: "Backend · Automatización · Inteligencia Artificial",
  location: "Candeias, BA, Brasil",
  summary:
    "Analista de Sistemas con más de 5 años de experiencia en tecnología, enfocado en desarrollo backend e ingeniería de software. Sólida experiencia en automatización de procesos, integración de sistemas y análisis de requisitos, con Python, Node.js, SQL y APIs REST en entornos corporativos. Experiencia con Docker, bases de datos relacionales, equipos ágiles y documentación técnica. También trabajo como mentor tecnológico, apoyando a equipos en el desarrollo de proyectos innovadores.",
};

export const company = {
  ...pt.company,
  pitch: "Mi propia empresa de desarrollo: sistemas, sitios web y automatizaciones a medida para otras empresas, desde el levantamiento de requisitos hasta la entrega y el soporte.",
};

export const highlights = zip(pt.highlights, [
  { label: "años de experiencia en tecnología" },
  { label: "repositorios públicos en GitHub" },
  { label: "sistemas y sitios web en producción" },
]);

export const marqueeOrgs = pt.marqueeOrgs.map((o) => (o === "Prefeituras municipais" ? "Municipios" : o));
export const marqueeTech = pt.marqueeTech;

export const services = zip(pt.services, [
  { title: "Backend y APIs REST", text: "Servicios en Python y Node.js, integraciones entre sistemas y APIs documentadas y probadas." },
  { title: "Automatización de procesos", text: "Scripts y bots que eliminan el trabajo manual: scraping, extracción de PDFs, rutinas SQL." },
  { title: "Bases de datos", text: "Modelado, optimización de consultas y documentación en MySQL, SQL Server y Firebird." },
  { title: "Dashboards y BI", text: "Informes estratégicos en Power BI para apoyar la toma de decisiones." },
  { title: "Interfaces web", text: "Diseño y rediseño de pantallas de sistemas, como las pantallas de acceso de NFS-e y KeepFolha." },
  { title: "Requisitos y Product Owner", text: "Levantamiento de requisitos con el cliente, priorización del backlog y documentación técnica." },
]);

export const recruiterSummary = zip(pt.recruiterSummary, [
  { label: "Nivel", value: "Semi Senior" },
  { label: "Experiencia", value: "Más de 5 años en TI · más de 3 en desarrollo" },
  { label: "Stack principal", value: "Python · Node.js · SQL · APIs REST" },
  { label: "IA", value: "Desarrollo asistido por IA y agentes de IA" },
  { label: "Modalidad", value: "Remoto o híbrido · Salvador, Brasil" },
  { label: "Empresa propia", value: "DevTI's (MEI) · sistemas para empresas" },
]);

export const aiExperience = zip(pt.aiExperience, [
  {
    title: "Desarrollo asistido por IA",
    text: "Uso diario de asistentes y agentes de código (Claude Code, ChatGPT) para acelerar la implementación, la refactorización, las pruebas y la documentación, siempre con revisión técnica del resultado.",
    tags: ["Claude Code", "ChatGPT", "Code review"],
  },
  {
    title: "Agentes e ingeniería de prompts",
    text: "Diseño de prompts estructurados y flujos multiagente, eligiendo el modelo adecuado para cada tarea (costo × calidad) y controlando el contexto enviado.",
    tags: ["Prompt engineering", "Multiagente", "LLMs"],
  },
  {
    title: "Asistentes virtuales en productos",
    text: "Participación en productos con asistentes inteligentes en producción, como AgendaAI (agendamiento por WhatsApp) y el asistente Keeper de los portales e-Contrib.",
    tags: ["Chatbots", "WhatsApp", "UX conversacional"],
  },
  {
    title: "Automatización + IA sobre datos",
    text: "Pipelines de extracción de datos en Python (PDFs, facturas, eSocial) que alimentan análisis, dashboards e integraciones con modelos de IA.",
    tags: ["Python", "Extracción de datos", "BI"],
  },
]);

export const levelEvidence = zip(pt.levelEvidence, [
  { title: "Autonomía de punta a punta", text: "Levanta requisitos con el cliente como Product Owner, modela, desarrolla, prueba y publica." },
  { title: "Sistemas críticos en producción", text: "Gestión tributaria municipal: facturas de servicios (NFS-e), deuda tributaria y recaudación de municipios." },
  { title: "Mentoría y liderazgo técnico", text: "Guió a 6 equipos en proyectos de software y Arduino; capacita a usuarios y compañeros." },
  { title: "Visión de negocio", text: "Dashboards en Power BI y automatizaciones que reducen el trabajo manual y apoyan las decisiones." },
]);

export const careerSteps = zip(pt.careerSteps, [
  { role: "Pasantía en Soporte" },
  { role: "Soporte Técnico" },
  { role: "Analista de Soporte" },
  { role: "Analista de Sistemas" },
  { year: "Hoy", role: "Analista de Desarrollo Semi Senior" },
]);

export const featuredProjects = zip(pt.featuredProjects, [
  {
    tag: "Producto SaaS · IA",
    description:
      "Plataforma de agendamiento en línea y por WhatsApp para salones, barberías, clínicas y profesionales independientes, con asistente inteligente. Recordatorios automáticos, agenda del equipo, cupones de descuento y atención en línea.",
    stack: ["Web", "WhatsApp", "SaaS", "IA"],
  },
  {
    title: "e-Contrib: Gestión Tributaria Municipal",
    tag: "Keep Informática",
    description:
      "Sistema de gestión tributaria municipal: tributos, factura electrónica de servicios nacional (NFS-e), deuda tributaria e integración con SIAFIC. Trabajo en requisitos (PO), backend, scripts SQL/Python, APIs y mantenimiento evolutivo.",
  },
  {
    title: "NFS-e: Pantalla de Login",
    tag: "Diseño de UI",
    description: "Diseño de la interfaz de acceso al módulo de factura electrónica de servicios (NFS-e) de e-Contrib.",
  },
  {
    title: "Portal del Contribuyente de Iaçu",
    tag: "Sector público",
    description: "Portal municipal para que el contribuyente emita boletas de pago y certificados y valide documentos, con asistente virtual (Keeper).",
    stack: ["JavaScript", "Web", "Asistente virtual"],
  },
  {
    title: "KeepFolha: Pantalla de acceso",
    tag: "Rediseño de UI",
    description: "Rediseño de la pantalla de acceso de KeepFolha, sistema de nómina municipal con BI, eSocial y SIAFIC.",
  },
  {
    tag: "Sitio institucional",
    description: "Sitio web del sistema de gestión para la cría de camarón (tecnología biofloc).",
  },
]);

export const openSource = zip(pt.openSource, [
  {
    title: "API CNAE del IBGE",
    description: "API que consume y formatea los datos de la Clasificación Nacional de Actividades Económicas (CNAE) del IBGE, devolviendo clases y subclases con códigos concatenados.",
  },
  {
    title: "Scraping de eSocial",
    description: "Extracción automatizada de datos de eSocial con navegación por varias páginas, reanudación del progreso mediante JSON, tolerancia a fallos y exportación a CSV.",
  },
  {
    title: "Generador de Esquema MySQL → Markdown",
    description: "Se conecta a MySQL, extrae los metadatos de tablas y columnas y genera documentación en Markdown. Credenciales mediante .env.",
  },
  {
    title: "API de Extracción de Facturas",
    description: "API en Python para extraer datos de facturas.",
  },
  {
    title: "Extractor de Servidores Públicos (PDF → Excel)",
    description: "Extrae nombres y CPF (identificación fiscal) de servidores públicos desde PDFs y genera una hoja de cálculo limpia, registrando las líneas fuera del patrón.",
  },
  {
    title: "Consulta de Monedas en Google",
    description: "Consulta la cotización de monedas mediante solicitudes GET, devolviendo el nombre oficial, el valor en reales, la fecha y la hora.",
  },
]);

export const experience = zip(pt.experience, [
  {
    role: "Fundador y Desarrollador",
    company: "DevTI's (MEI), empresa propia",
    bullets: [
      "Desarrollo de sistemas, sitios web y automatizaciones a medida para otras empresas.",
      "Atención directa al cliente: requisitos, propuesta, desarrollo, entrega y soporte.",
      "Productos propios, como AgendaAI (agendamiento en línea y por WhatsApp).",
    ],
  },
  {
    role: "Analista de Sistemas",
    bullets: [
      "Rol de Product Owner, liderando el levantamiento y análisis de requisitos con los clientes.",
      "Desarrollo y optimización de scripts en Python y SQL para la automatización de procesos y el rendimiento.",
      "Mantenimiento, refactorización y corrección de errores, garantizando estabilidad y escalabilidad.",
      "Dashboards e informes estratégicos en Power BI para apoyar la toma de decisiones.",
      "Implementación y pruebas de APIs REST; uso de Docker en entornos en contenedores.",
    ],
  },
  {
    role: "Mentor Tech (Proyecto Educativo)",
    company: "Colegio Luiz Viana Filho",
    bullets: [
      "Guía de 6 equipos en la creación de sitios web, sistemas y soluciones digitales.",
      "Apoyo a proyectos con Arduino que integran hardware y software.",
      "Enseñanza de lógica de programación y buenas prácticas de desarrollo.",
    ],
  },
  {
    role: "Analista de Soporte",
    bullets: [
      "Diagnóstico y resolución de incidentes en sistemas corporativos.",
      "Pruebas funcionales y de rendimiento; mantenimiento y ajustes en el código fuente.",
      "Documentación técnica y capacitación de usuarios en seguridad de la información.",
    ],
  },
  {
    role: "Soporte Técnico",
    bullets: [
      "Soporte a clientes internos y externos con foco en alta disponibilidad.",
      "Análisis de fallas y pruebas para identificar cuellos de botella de rendimiento.",
      "Documentación de procesos y monitoreo de indicadores.",
    ],
  },
  {
    role: "Pasante de Soporte Técnico",
    bullets: ["Help desk / service desk, copias de seguridad y restauración de datos, monitoreo de redes."],
  },
]).map((j) => ({ ...j, period: period(j.period) }));

export const skills = zip(pt.skills, [
  { group: "Backend" },
  { group: "Bases de Datos" },
  { group: "APIs e Integraciones" },
  { group: "DevOps y Automatización" },
  { group: "Datos y BI" },
  { group: "Gestión y Métodos" },
]);

export const education = zip(pt.education, [
  { title: "Licenciatura en Ingeniería de Software", school: "UCSAL, Universidad Católica de Salvador", status: "Finalización prevista: 07/2029" },
  { title: "Posgrado en BI, Big Data y Analytics", school: "UNOPAR, Universidad Norte de Paraná", status: "Finalizado" },
  { title: "Tecnicatura en Análisis y Desarrollo de Sistemas", school: "Faculdade São Salvador", status: "Finalizada" },
]);

export const courses = [
  "Proyectos Ágiles con Scrum",
  "PHP y Laravel (Udemy)",
  "Algoritmos y Estructuras de Datos",
  "Introducción a Git y GitHub",
  "Modelado de Datos",
  "Fundamentos de Redes (Cisco / SENAI)",
];

export const languages = zip(pt.languages, [
  { name: "Portugués", level: "Nativo" },
  { name: "Inglés", level: "Técnico (lectura de documentación)" },
  { name: "Español", level: "Básico (lectura)" },
]);
