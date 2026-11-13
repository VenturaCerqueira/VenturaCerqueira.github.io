"use client";

import { useEffect, useRef, useState } from "react";
import { DINO_H, DINO_W, bugGrid, dinoGrid, toCanvas } from "@/components/petSprites";

/* Página 404 com o mascote procurando o "bug 404". Idioma pelo endereço (/en/, /es/) ou pelo navegador. */

const TXT = {
  pt: { title: "Bug 404: página não encontrada", text: "O dinossauro procurou por todo o código e não achou esta página. Talvez o link tenha mudado.", home: "Voltar ao portfólio", projects: "Ver projetos", contact: "Falar comigo", base: "/" },
  en: { title: "Bug 404: page not found", text: "The dinosaur searched the whole codebase and couldn't find this page. The link may have changed.", home: "Back to portfolio", projects: "See projects", contact: "Contact me", base: "/en/" },
  es: { title: "Bug 404: página no encontrada", text: "El dinosaurio buscó en todo el código y no encontró esta página. Tal vez el enlace cambió.", home: "Volver al portafolio", projects: "Ver proyectos", contact: "Contactarme", base: "/es/" },
};

export function NotFoundScene() {
  const [lang, setLang] = useState<keyof typeof TXT>("pt");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const p = location.pathname;
    const nav = navigator.language.toLowerCase();
    setLang(p.startsWith("/en") ? "en" : p.startsWith("/es") ? "es" : nav.startsWith("en") ? "en" : nav.startsWith("es") ? "es" : "pt");
  }, []);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const PX = 4, W = 420, H = 150, dpr = window.devicePixelRatio || 1;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
    const walk = [dinoGrid({ leg: 0, mouth: false, blink: false }), dinoGrid({ leg: 1, mouth: false, blink: false })].map((g) => toCanvas(g, PX));
    const blink = toCanvas(dinoGrid({ leg: 0, mouth: false, blink: true }), PX);
    const bug = [bugGrid(true), bugGrid(false)].map((g) => toCanvas(g, 3));
    let x = 20, dir = 1, f = 0, raf = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      f++;
      if (!reduced) { x += 1.2 * dir; if (x > W - DINO_W * PX - 10) dir = -1; if (x < 10) dir = 1; }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(42,33,82,.18)";
      ctx.beginPath(); ctx.ellipse(x + DINO_W * PX * 0.47, H - 6, DINO_W * PX * 0.35, 5, 0, 0, Math.PI * 2); ctx.fill();
      const img = f % 180 < 8 ? blink : walk[Math.floor(f / 10) % 2];
      const y = H - 6 - DINO_H * PX;
      if (dir < 0) { ctx.save(); ctx.translate(x + img.width, y); ctx.scale(-1, 1); ctx.drawImage(img, 0, 0); ctx.restore(); }
      else ctx.drawImage(img, x, y);
      // o bug 404 sempre escapando, acima do dinossauro
      const bx = (W - 60) / 2 + Math.sin(f / 40) * (W / 2 - 50), by = 16 + Math.sin(f / 9) * 6;
      ctx.drawImage(bug[Math.floor(f / 6) % 2], bx, by);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const t = TXT[lang];
  return (
    <main className="hero-bg grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-surface/95 p-8 text-center shadow-2xl shadow-accent/10 backdrop-blur sm:p-10">
        <p className="text-gradient text-7xl font-extrabold tracking-tight sm:text-8xl">404</p>
        <canvas ref={canvasRef} className="mx-auto mt-2 h-[150px] w-full max-w-[420px]" aria-hidden />
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-muted">{t.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={t.base} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5">{t.home} →</a>
          <a href={`${t.base}#projetos`} className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent">{t.projects}</a>
          <a href={`${t.base}#contato`} className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent">{t.contact}</a>
        </div>
        <p className="mt-8 font-mono text-xs text-muted">anderson@portfolio:~$ <span className="text-accent">cd /</span></p>
      </div>
    </main>
  );
}
