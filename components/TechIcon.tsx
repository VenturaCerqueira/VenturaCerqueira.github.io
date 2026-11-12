import { NavIcon, type NavIconName } from "@/components/NavIcon";

/*
  Logo oficial de cada tecnologia (SVGs do projeto open source Devicon, em /public/tech).
  Para o que não tem logo (conceitos ou marcas fora do Devicon), usa um ícone de linha na cor da marca.
  Para adicionar uma tecnologia: coloque o SVG em /public/tech e registre o nome aqui.
*/

type Logo = { src: string };
type Glyph = { icon: NavIconName; color: string };

const TECH: Record<string, Logo | Glyph> = {
  Python: { src: "/tech/python-original.svg" },
  "Node.js": { src: "/tech/nodejs-original.svg" },
  TypeScript: { src: "/tech/typescript-original.svg" },
  PHP: { src: "/tech/php-original.svg" },
  MySQL: { src: "/tech/mysql-original.svg" },
  "SQL Server": { src: "/tech/microsoftsqlserver-plain.svg" },
  Postman: { src: "/tech/postman-original.svg" },
  Swagger: { src: "/tech/swagger-original.svg" },
  Docker: { src: "/tech/docker-original.svg" },
  Git: { src: "/tech/git-original.svg" },
  GitHub: { src: "/tech/github-original.svg" },
  pandas: { src: "/tech/pandas-original.svg" },
  Jira: { src: "/tech/jira-original.svg" },
  "Scripts automatizados": { src: "/tech/bash-original.svg" },
  "Documentação técnica": { src: "/tech/markdown-original.svg" },
  // sem logo no Devicon: ícone na cor da marca
  Firebird: { icon: "database", color: "#f2602b" },
  "Power BI": { icon: "trend", color: "#e8b100" },
  Arduino: { src: "/tech/arduino-original.svg" },
  WhatsApp: { icon: "chat", color: "#25D366" },
  SaaS: { icon: "rocket", color: "#5b3df5" },
  IA: { icon: "sparkles", color: "#8b5cf6" },
  Web: { icon: "globe", color: "#2f6bdc" },
  // conceitos
  "Modelagem de Dados": { icon: "layers", color: "#7b6cf6" },
  "APIs REST": { icon: "code", color: "#16a58f" },
  "Web Scraping": { icon: "globe", color: "#2f6bdc" },
  Dashboards: { icon: "trend", color: "#5b3df5" },
  Scrum: { icon: "clock", color: "#16a58f" },
  "Product Owner": { icon: "user", color: "#5b3df5" },
};

export function TechIcon({ name, size = 18 }: { name: string; size?: number }) {
  const t = TECH[name];
  if (!t) return null;
  if ("src" in t) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <span className="tech-logo grid shrink-0 place-items-center rounded-md transition-transform duration-300 group-hover/tech:scale-125 group-hover/tech:-rotate-6">
        <img src={t.src} alt="" width={size} height={size} loading="lazy" />
      </span>
    );
  }
  return (
    <span style={{ color: t.color }} className="grid shrink-0 place-items-center transition-transform duration-300 group-hover/tech:scale-125 group-hover/tech:-rotate-6">
      <NavIcon name={t.icon} size={size} />
    </span>
  );
}
