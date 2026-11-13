import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NotFoundScene } from "@/components/NotFoundScene";
import "./globals.css";

// Página 404 global (o site tem um layout raiz por idioma). GitHub Pages serve o 404.html gerado daqui.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = { title: "404 | Anderson Ventura", robots: { index: false }, icons: { icon: "/favicon.svg" } };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <NotFoundScene />
      </body>
    </html>
  );
}
