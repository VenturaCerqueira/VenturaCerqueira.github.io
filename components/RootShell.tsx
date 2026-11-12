import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getContent } from "@/data/content";
import { LOCALES, type Lang } from "@/data/i18n";
import "@/app/globals.css";

// Estrutura <html> compartilhada pelos 3 idiomas (cada idioma tem seu root layout para ter o <html lang> correto).

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

// aplica o tema salvo antes da pintura (evita flash)
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

// Defina NEXT_PUBLIC_SITE_URL no deploy (ex.: https://andersonventura.dev) para links absolutos corretos.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const OG_LOCALE: Record<Lang, string> = { pt: "pt_BR", en: "en_US", es: "es_ES" };

export function buildMetadata(lang: Lang): Metadata {
  const { profile, ui } = getContent(lang);
  const title = `${profile.shortName} | ${profile.role}`;
  const description = `${profile.role}. ${profile.headline}. ${ui.meta.description}`;
  const path = LOCALES.find((l) => l.lang === lang)!.path;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: profile.name }],
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/foto-anderson.jpg" },
    keywords: ["Backend", "Python", "Node.js", "SQL", "REST APIs", "AI", "Salvador", "Bahia", profile.role],
    alternates: {
      canonical: path,
      languages: Object.fromEntries(LOCALES.map((l) => [l.htmlLang, l.path])),
    },
    openGraph: {
      title, description, type: "website", url: path, locale: OG_LOCALE[lang],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[lang]),
      images: [{ url: profile.photo, width: 612, height: 918, alt: profile.name }],
    },
  };
}

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const htmlLang = LOCALES.find((l) => l.lang === lang)!.htmlLang;
  return (
    <html lang={htmlLang} className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
