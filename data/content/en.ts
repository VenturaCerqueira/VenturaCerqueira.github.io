// Conteúdo em inglês. Links, ícones, capas e datas vêm do português (data/profile.ts); aqui só os textos.
// Os arrays seguem a MESMA ORDEM do arquivo em português.
import * as pt from "@/data/profile";

const zip = <T extends object, P>(base: T[], tr: P[]) => base.map((b, i) => ({ ...b, ...tr[i] }));
const period = (p: string) => p.replace("Atual", "Present").replace("Em paralelo", "Ongoing");

export const profile = {
  ...pt.profile,
  role: "Mid-Level Software Developer",
  headline: "Backend · Automation · Artificial Intelligence",
  location: "Candeias, BA, Brazil",
  summary:
    "Systems Analyst with more than 5 years of experience in technology, focused on backend development and software engineering. Solid background in process automation, systems integration and requirements analysis, using Python, Node.js, SQL and REST APIs in corporate environments. Hands-on experience with Docker, relational databases, agile teams and technical documentation. I also work as a tech mentor, helping teams build innovative projects.",
};

export const company = {
  ...pt.company,
  pitch: "My own development company: custom systems, websites and automation for other businesses, from requirements gathering to delivery and support.",
};

export const highlights = zip(pt.highlights, [
  { label: "years of experience in technology" },
  { label: "public repositories on GitHub" },
  { label: "systems and websites in production" },
]);

export const marqueeOrgs = pt.marqueeOrgs.map((o) => (o === "Prefeituras municipais" ? "City governments" : o));
export const marqueeTech = pt.marqueeTech.map((t) => ({ "APIs REST": "REST APIs", "IA Generativa": "Generative AI" })[t] ?? t);

export const services = zip(pt.services, [
  { title: "Backend and REST APIs", text: "Services in Python and Node.js, system integrations, and documented, tested APIs." },
  { title: "Process automation", text: "Scripts and bots that eliminate manual work: scraping, PDF extraction, SQL routines." },
  { title: "Databases", text: "Data modeling, query optimization and documentation in MySQL, SQL Server and Firebird." },
  { title: "Dashboards and BI", text: "Strategic Power BI reports to support decision-making." },
  { title: "Web interfaces", text: "Design and redesign of system screens, such as the NFS-e login page and the KeepFolha events area." },
  { title: "Requirements and Product Owner", text: "Requirements gathering with clients, backlog prioritization and technical documentation." },
]);

export const recruiterSummary = zip(pt.recruiterSummary, [
  { label: "Level", value: "Mid-level" },
  { label: "Experience", value: "5+ years in IT · 3+ in development" },
  { label: "Main stack", value: "Python · Node.js · SQL · REST APIs" },
  { label: "AI", value: "AI-assisted development and AI agents" },
  { label: "Work model", value: "Remote or hybrid · Salvador, Brazil" },
  { label: "Own company", value: "DevTI's (MEI) · systems for businesses" },
]);

export const aiExperience = zip(pt.aiExperience, [
  {
    title: "AI-assisted development",
    text: "Daily use of coding assistants and agents (Claude Code, ChatGPT) to speed up implementation, refactoring, testing and documentation, always with technical review of the output.",
    tags: ["Claude Code", "ChatGPT", "Code review"],
  },
  {
    title: "Agents and prompt engineering",
    text: "Designing structured prompts and multi-agent workflows, choosing the right model for each task (cost × quality) and controlling the context that is sent.",
    tags: ["Prompt engineering", "Multi-agent", "LLMs"],
  },
  {
    title: "Virtual assistants in products",
    text: "Contributions to products with intelligent assistants in production, such as AgendaAI (scheduling via WhatsApp) and the Keeper assistant on the e-Contrib portals.",
    tags: ["Chatbots", "WhatsApp", "Conversational UX"],
  },
  {
    title: "Automation + AI on data",
    text: "Python data extraction pipelines (PDFs, invoices, eSocial) that feed analyses, dashboards and integrations with AI models.",
    tags: ["Python", "Data extraction", "BI"],
  },
]);

export const levelEvidence = zip(pt.levelEvidence, [
  { title: "End-to-end ownership", text: "Gathers requirements with clients as Product Owner, then models, builds, tests and deploys." },
  { title: "Critical systems in production", text: "Municipal tax management: electronic service invoices (NFS-e), tax debt and city revenue." },
  { title: "Mentoring and technical leadership", text: "Mentored 6 teams on software and Arduino projects; trains users and colleagues." },
  { title: "Business mindset", text: "Power BI dashboards and automation that reduce manual work and support decisions." },
]);

export const careerSteps = zip(pt.careerSteps, [
  { role: "Support Intern" },
  { role: "Technical Support" },
  { role: "Support Analyst" },
  { role: "Systems Analyst" },
  { year: "Today", role: "Mid-Level Software Developer" },
]);

export const featuredProjects = zip(pt.featuredProjects, [
  {
    tag: "SaaS product · AI",
    description:
      "Online and WhatsApp scheduling platform for salons, barbershops, clinics and independent professionals, with an intelligent assistant. Automatic reminders, team calendar, discount coupons and online service.",
    stack: ["Web", "WhatsApp", "SaaS", "AI"],
  },
  {
    title: "e-Contrib: Municipal Tax Management",
    tag: "Keep Informática",
    description:
      "Municipal tax management system: taxes, national electronic service invoices (NFS-e), tax debt and integration with SIAFIC. Work on requirements (PO), backend, SQL/Python scripts, APIs and ongoing maintenance.",
  },
  {
    title: "NFS-e: Login Page",
    tag: "UI design",
    description: "Interface design for the login page of the e-Contrib electronic service invoice (NFS-e) module.",
  },
  {
    title: "Iaçu Taxpayer Portal",
    tag: "Public sector",
    description: "City portal where taxpayers issue payment slips and certificates and validate documents, with a virtual assistant (Keeper).",
    stack: ["JavaScript", "Web", "Virtual assistant"],
  },
  {
    title: "KeepFolha: Events",
    tag: "UI redesign",
    description: "Redesign of the events area of the KeepFolha system.",
  },
  {
    tag: "Institutional website",
    description: "Website for a management system for shrimp farming (biofloc technology).",
  },
]);

export const openSource = zip(pt.openSource, [
  {
    title: "IBGE CNAE API",
    description: "API that consumes and formats IBGE's National Classification of Economic Activities (CNAE) data, returning classes and subclasses with concatenated codes.",
  },
  {
    title: "eSocial Scraping",
    description: "Automated data extraction from eSocial with multi-page navigation, progress resume via JSON, fault tolerance and CSV export.",
  },
  {
    title: "MySQL Schema → Markdown Generator",
    description: "Connects to MySQL, extracts table and column metadata and generates Markdown documentation. Credentials via .env.",
  },
  {
    title: "Invoice Data Extraction API",
    description: "Python API for extracting data from invoices.",
  },
  {
    title: "Public Employee Extractor (PDF → Excel)",
    description: "Extracts names and CPFs (tax IDs) of public employees from PDFs and generates a clean spreadsheet, logging lines that don't match the pattern.",
  },
  {
    title: "Google Currency Lookup",
    description: "Looks up currency exchange rates via GET requests, returning the official name, value in BRL, date and time.",
  },
]);

export const experience = zip(pt.experience, [
  {
    role: "Founder and Developer",
    company: "DevTI's (MEI), my own company",
    bullets: [
      "Development of custom systems, websites and automation for other businesses.",
      "Direct client relationship: requirements, proposal, development, delivery and support.",
      "Own products, such as AgendaAI (online and WhatsApp scheduling).",
    ],
  },
  {
    role: "Systems Analyst",
    bullets: [
      "Product Owner role, leading requirements gathering and analysis with clients.",
      "Development and optimization of Python and SQL scripts for process automation and performance.",
      "Maintenance, refactoring and bug fixing, ensuring stability and scalability.",
      "Strategic Power BI dashboards and reports to support decision-making.",
      "Implementation and testing of REST APIs; use of Docker in containerized environments.",
    ],
  },
  {
    role: "Tech Mentor (Educational Project)",
    company: "Luiz Viana Filho School",
    bullets: [
      "Mentored 6 teams building websites, systems and digital solutions.",
      "Supported Arduino projects integrating hardware and software.",
      "Taught programming logic and development best practices.",
    ],
  },
  {
    role: "Support Analyst",
    bullets: [
      "Diagnosis and resolution of incidents in corporate systems.",
      "Functional and performance testing; source code maintenance and adjustments.",
      "Technical documentation and user training on information security.",
    ],
  },
  {
    role: "Technical Support",
    bullets: [
      "Support for internal and external clients with a focus on high availability.",
      "Failure analysis and testing to identify performance bottlenecks.",
      "Process documentation and KPI monitoring.",
    ],
  },
  {
    role: "Technical Support Intern",
    bullets: ["Help desk / service desk, data backup and restore, network monitoring."],
  },
]).map((j) => ({ ...j, period: period(j.period) }));

export const skills = zip(pt.skills, [
  { group: "Backend" },
  { group: "Databases" },
  { group: "APIs & Integrations" },
  { group: "DevOps & Automation" },
  { group: "Data & BI" },
  { group: "Management & Methods" },
]);

export const education = zip(pt.education, [
  { title: "Bachelor's degree in Software Engineering", school: "UCSAL, Catholic University of Salvador", status: "Expected completion: 07/2029" },
  { title: "Postgraduate degree in BI, Big Data and Analytics", school: "UNOPAR, Northern Paraná University", status: "Completed" },
  { title: "Associate degree in Systems Analysis and Development", school: "Faculdade São Salvador", status: "Completed" },
]);

export const courses = [
  "Agile Projects with Scrum",
  "PHP and Laravel (Udemy)",
  "Algorithms and Data Structures",
  "Introduction to Git and GitHub",
  "Data Modeling",
  "Networking Fundamentals (Cisco / SENAI)",
];

export const languages = zip(pt.languages, [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Technical (reading documentation)" },
  { name: "Spanish", level: "Basic (reading)" },
]);
