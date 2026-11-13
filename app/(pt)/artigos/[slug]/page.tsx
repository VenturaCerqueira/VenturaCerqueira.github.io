import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/articles";
import { ThemeToggle } from "@/components/ThemeToggle";

export const dynamicParams = false;

export function generateStaticParams() {
  const list = getArticles().map((a) => ({ slug: a.slug }));
  // export estático exige ao menos uma página; "em-breve" vira um aviso sem indexação
  return list.length ? list : [{ slug: "em-breve" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return { title: "Artigos em breve | Anderson Ventura", robots: { index: false } };
  return {
    title: `${a.title} | Anderson Ventura`,
    description: a.description,
    robots: a.draft ? { index: false } : undefined,
    alternates: { canonical: `/artigos/${a.slug}/` },
    openGraph: { title: a.title, description: a.description, type: "article", images: [{ url: "/og/og-pt.jpg", width: 1200, height: 630 }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a && slug !== "em-breve") notFound();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/#artigos" className="text-sm font-semibold text-accent hover:underline">← Voltar ao portfólio</a>
          <ThemeToggle label="Alternar tema claro/escuro" />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {!a ? (
          <p className="text-muted">Os artigos estão chegando. Volte em breve.</p>
        ) : (
          <article>
            {a.draft && (
              <p className="mb-6 rounded-xl border border-dashed border-[#f5a524] bg-[#f5a524]/10 px-4 py-2 text-sm font-semibold text-[#b26b00]">
                Rascunho: só existe nesta máquina. Para publicar, mova o arquivo de <code>content/rascunhos/</code> para <code>content/artigos/</code>.
              </p>
            )}
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{a.tags.join(" · ")}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{a.title}</h1>
            <p className="mt-3 text-lg text-muted">{a.description}</p>
            <p className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">AV</span>
              Anderson Ventura · {new Date(a.date + "T12:00:00").toLocaleDateString("pt-BR")} · {a.minutes} min de leitura
            </p>
            <div className="prose-av mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />
            <div className="mt-14 rounded-2xl border border-border bg-surface p-6">
              <p className="font-bold">Gostou? Vamos conversar.</p>
              <p className="mt-1 text-sm text-muted">Sou Analista de Desenvolvimento Pleno, com foco em backend, automação e IA.</p>
              <a href="/#contato" className="mt-4 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">Falar com o Anderson →</a>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
