import type { MetadataRoute } from "next";
import { LOCALES } from "@/data/i18n";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Uma entrada por idioma, cada uma apontando para as versões nos outros idiomas (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [l.htmlLang, `${SITE}${l.path}`]));
  return LOCALES.map((l) => ({
    url: `${SITE}${l.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l.lang === "pt" ? 1 : 0.8,
    alternates: { languages },
  }));
}
