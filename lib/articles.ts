import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/*
  Artigos em Markdown, em content/artigos/*.md, com cabeçalho:
    ---
    title: ...
    description: ...
    date: 2026-11-13
    tags: Python, IA
    ---
  Pastas:
    content/rascunhos/  rascunhos: só nesta máquina (fora do git) e só no localhost (npm run dev).
    content/artigos/    publicados: vão para o site no próximo git push.
  Para publicar um rascunho: mova o arquivo de content/rascunhos/ para content/artigos/ e faça git push.
*/

export type Article = { slug: string; title: string; description: string; date: string; tags: string[]; draft: boolean; html: string; minutes: number };

const DIR = path.join(process.cwd(), "content", "artigos");
const DRAFTS = path.join(process.cwd(), "content", "rascunhos");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function parse(dir: string, file: string, isDraft: boolean): Article {
  const raw = fs.readFileSync(path.join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  (m?.[1] ?? "").split("\n").forEach((l) => {
    const i = l.indexOf(":");
    if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  });
  const body = m?.[2] ?? raw;
  const words = body.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    description: meta.description ?? "",
    date: meta.date ?? "",
    tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    draft: isDraft || meta.draft === "true",
    html: marked.parse(body, { async: false }) as string,
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getArticles(): Article[] {
  const read = (dir: string, isDraft: boolean) =>
    fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => parse(dir, f, isDraft)) : [];
  return [...read(DIR, false), ...(SHOW_DRAFTS ? read(DRAFTS, true) : [])]
    .filter((a) => SHOW_DRAFTS || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}
