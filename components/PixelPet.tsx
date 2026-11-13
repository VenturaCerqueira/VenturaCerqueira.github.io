"use client";

import { useEffect, useRef, useState } from "react";
import type { UI } from "@/data/i18n";
import { BUG_H, BUG_W, DINO_H, DINO_W, MOUTH, bugGrid, dinoGrid, toCanvas } from "@/components/petSprites";

/*
  Mascote original em pixel art que acompanha o visitante pela página inteira.
  - Fixo na parte de baixo da tela e totalmente autônomo: escolhe sozinho para onde ir
    na largura toda da tela, caminha, às vezes corre, para, pisca e segue de novo.
  - Quando o visitante rola a página, ele "acompanha" e anda na direção da rolagem.
  - Come os bugs que passam voando ("bugs corrigidos"); pula sozinho para pegar os altos.
  - Clique nele para pular. Pode ser ocultado pelo rodapé (preferência salva no navegador).
  - Não bloqueia cliques na página; com "reduzir movimento" ativo, fica parado.
*/

type Bug = { x: number; y: number; vx: number; phase: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };

const CANVAS_H = 150;
const STORAGE_KEY = "pet-hidden";

export function PixelPet({ t }: { t: UI["pet"] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<() => void>(() => {});
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try { setHidden(localStorage.getItem(STORAGE_KEY) === "1"); } catch {}
    const onToggle = () => setHidden((h) => {
      const next = !h;
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch {}
      return next;
    });
    window.addEventListener("pet:toggle", onToggle);
    return () => window.removeEventListener("pet:toggle", onToggle);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const canvas = canvasRef.current!;
    const hit = hitRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- sprites (gerados uma vez por escala) ----------
    let PX = 3, BPX = 2;
    type Frames = { walk: HTMLCanvasElement[]; chomp: HTMLCanvasElement; blink: HTMLCanvasElement[]; bug: HTMLCanvasElement[] };
    let fr: Frames;
    const build = () => {
      fr = {
        walk: [dinoGrid({ leg: 0, mouth: false, blink: false }), dinoGrid({ leg: 1, mouth: false, blink: false })].map((g) => toCanvas(g, PX)),
        blink: [dinoGrid({ leg: 0, mouth: false, blink: true }), dinoGrid({ leg: 1, mouth: false, blink: true })].map((g) => toCanvas(g, PX)),
        chomp: toCanvas(dinoGrid({ leg: 0, mouth: true, blink: false }), PX),
        bug: [bugGrid(true), bugGrid(false)].map((g) => toCanvas(g, BPX)),
      };
    };

    let W = 0, H = 0, rightLimit = 0;
    const groundY = () => H - 6;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      const newPX = W < 640 ? 2 : 3;
      if (newPX !== PX || !fr) { PX = newPX; BPX = W < 640 ? 2 : 2; build(); }
      rightLimit = W - DINO_W * PX - (W < 640 ? 84 : 100); // não passa por cima dos botões flutuantes
    };
    resize();

    // no tema escuro, um brilho leve em volta destaca o contorno
    let dark = false;
    const readTheme = () => {
      const t = document.documentElement.dataset.theme;
      dark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    readTheme();
    const themeObs = new MutationObserver(readTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const blit = (img: HTMLCanvasElement, x: number, y: number, flip: boolean) => {
      x = Math.round(x); y = Math.round(y);
      if (!flip) { ctx.drawImage(img, x, y); return; }
      ctx.save();
      ctx.translate(x + img.width, y);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    };

    // ---------- estado ----------
    let dx = 24, dir = 1, vy = 0, jumpY = 0, step = 0, chomp = 0, nextBug = 120, eaten = 0;
    let blink = 0, nextBlink = 120, bob = 0;
    // passeio autônomo: alvo aleatório na tela toda, pausas e corridas
    let target = 200, pause = 60, pace = 1.4;
    const bugs: Bug[] = [];
    const sparks: Spark[] = [];
    const SPARK_COLORS = ["#34d3b6", "#ffd166", "#a99dfd", "#ff8fab", "#ffffff"];

    // cartão "bug corrigido" (DOM, para ter texto nítido e animação CSS)
    const toastText = t.toast;
    const toast = (x: number, y: number, n: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const el = document.createElement("div");
      el.className = "pet-toast";
      const left = Math.max(8, Math.min(W - 196, x - 90));
      el.style.left = `${left}px`;
      el.style.top = `${Math.max(0, y - 58)}px`;
      el.innerHTML = `
        <span class="pet-toast-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
        <span class="pet-toast-text"><strong>${toastText.replace("{n}", String(n))}</strong><code>fix: bug-${String(n).padStart(3, "0")} · deploy ok</code></span>`;
      wrap.appendChild(el);
      el.addEventListener("animationend", (e) => { if (e.target === el) el.remove(); });
    };
    const burst = (x: number, y: number) => {
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        const v = 1.5 + Math.random() * 2.5;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2, life: 30 + Math.random() * 20, color: SPARK_COLORS[i % SPARK_COLORS.length], size: Math.random() < 0.3 ? 4 : 3 });
      }
    };
    let raf = 0, frame = 0;

    const jump = () => { if (jumpY === 0) vy = -7.2; };
    jumpRef.current = jump;

    const pickTarget = () => {
      // prefere ir longe: atravessa boa parte da tela
      let t = 8 + Math.random() * Math.max(1, rightLimit - 8);
      if (Math.abs(t - dx) < W * 0.25) t = dx < W / 2 ? rightLimit - Math.random() * W * 0.2 : 8 + Math.random() * W * 0.2;
      target = Math.min(rightLimit, Math.max(8, t));
      pace = reduced ? 0.8 : Math.random() < 0.25 ? 3.2 : 1.2 + Math.random() * 0.8; // às vezes corre (nunca no modo calmo)
    };

    // rolagem: ele acompanha, andando na direção em que o visitante rola
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (Math.abs(delta) < 2) return;
      target = Math.min(rightLimit, Math.max(8, dx + Math.sign(delta) * Math.min(260, 80 + Math.abs(delta))));
      pace = reduced ? 1.2 : 3;
      pause = 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      frame++;
      target = Math.min(rightLimit, Math.max(8, target));
      const diff = target - dx;
      let speed = 0;
      if (pause > 0) pause--;
      else if (Math.abs(diff) < 1) {
        // chegou: descansa um pouco (às vezes vira para olhar o outro lado) e escolhe outro destino
        pause = 50 + Math.random() * 160;
        if (Math.random() < 0.35) dir *= -1;
        pickTarget();
      } else {
        speed = Math.sign(diff) * Math.min(pace, Math.abs(diff) * 0.15 + 0.3);
        dir = speed > 0 ? 1 : -1;
        if (!reduced && pace > 2.5 && Math.random() < 0.006) jump(); // pulinho de alegria quando corre
      }
      dx += speed;

      if (vy !== 0 || jumpY < 0) { vy += 0.45; jumpY += vy; if (jumpY >= 0) { jumpY = 0; vy = 0; } }
      const moving = Math.abs(speed) > 0.05;
      const stepEvery = Math.max(4, Math.round(11 - Math.abs(speed) * 1.6));
      if (moving && frame % stepEvery === 0) step ^= 1;
      if (!moving) step = 0;
      bob = moving && jumpY === 0 ? (step ? 1 : 0) : Math.sin(frame / 25) * 0.6; // respira quando parado
      if (chomp > 0) chomp--;
      if (blink > 0) blink--; else if (--nextBlink <= 0) { blink = 7; nextBlink = 150 + Math.random() * 200; }

      if (--nextBug <= 0) {
        const fromRight = dir > 0;
        const high = Math.random() < 0.3;
        bugs.push({
          x: fromRight ? Math.min(W, rightLimit + DINO_W * PX + 40) : -40,
          y: groundY() - DINO_H * PX + (high ? -6 : 10 + Math.random() * 12),
          vx: (fromRight ? -1 : 1) * (1 + Math.random() * 0.8),
          phase: Math.random() * 6,
        });
        nextBug = 240 + Math.random() * 300;
      }

      const top = groundY() - DINO_H * PX + jumpY;
      const mx = dir > 0 ? dx + MOUTH.x * PX : dx + (DINO_W - MOUTH.x - MOUTH.w) * PX;
      const m = { x: mx, y: top + MOUTH.y * PX, w: MOUTH.w * PX, h: MOUTH.h * PX };
      const bw = BUG_W * BPX, bh = BUG_H * BPX;
      for (let i = bugs.length - 1; i >= 0; i--) {
        const b = bugs[i];
        b.x += b.vx; b.phase += 0.12;
        const by = b.y + Math.sin(b.phase) * 4;
        const ahead = dir > 0 ? b.x - (dx + DINO_W * PX) : dx - (b.x + bw);
        if (by + bh < m.y && ahead > 0 && ahead < 70) jump();
        if (b.x + bw > m.x && b.x < m.x + m.w && by + bh > m.y && by < m.y + m.h) {
          bugs.splice(i, 1);
          chomp = 16;
          eaten++;
          burst(m.x + m.w / 2, m.y + m.h / 2);
          toast(m.x + m.w / 2, top, eaten);
        } else if (b.x < -90 || b.x > W + 90) bugs.splice(i, 1);
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.12; sp.vx *= 0.97;
        if (--sp.life <= 0) sparks.splice(i, 1);
      }

      hit.style.transform = `translate(${Math.round(dx)}px, ${Math.round(top)}px)`;
      hit.style.width = `${DINO_W * PX}px`;
      hit.style.height = `${DINO_H * PX}px`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const gy = groundY();
      const top = gy - DINO_H * PX + jumpY + bob;

      // sombra macia (encolhe quando pula)
      const k = 1 + jumpY / 110;
      ctx.fillStyle = "rgba(42,33,82,0.22)";
      ctx.beginPath();
      ctx.ellipse(dx + DINO_W * PX * 0.47, gy - 1, Math.max(10, DINO_W * PX * 0.36 * k), 4 * k + 1, 0, 0, Math.PI * 2);
      ctx.fill();

      const img = chomp > 0 ? fr.chomp : blink > 0 ? fr.blink[step] : fr.walk[jumpY < 0 ? 0 : step];
      if (dark) ctx.filter = "drop-shadow(0 0 1.5px rgba(200,190,255,.9))";
      blit(img, dx, top, dir < 0);
      ctx.filter = "none";

      for (const b of bugs) blit(fr.bug[Math.floor(b.phase * 2) % 2], b.x, b.y + Math.sin(b.phase) * 4, b.vx > 0);

      for (const sp of sparks) {
        ctx.globalAlpha = Math.min(1, sp.life / 15);
        ctx.fillStyle = sp.color;
        ctx.fillRect(Math.round(sp.x), Math.round(sp.y), sp.size, sp.size);
      }
      ctx.globalAlpha = 1;
    };

    // Passo fixo de 60 Hz: se o navegador entregar menos quadros (Modo de Pouca Energia, celular lento),
    // roda mais passos por quadro e o mascote anda na mesma velocidade.
    const STEP = 1000 / 60;
    let last = performance.now(), acc = 0;
    const loop = (now: number) => {
      if (!document.hidden) {
        acc += Math.min(250, now - last);
        let n = 0;
        while (acc >= STEP && n < 15) { tick(); acc -= STEP; n++; }
        draw();
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    const start = () => { raf = requestAnimationFrame((t) => { last = t; loop(t); }); };
    let startTimer = 0;
    if (document.readyState === "complete") startTimer = window.setTimeout(start, 1200);
    else window.addEventListener("load", () => { startTimer = window.setTimeout(start, 1200); }, { once: true });

    const onResize = () => { resize(); dx = Math.min(dx, rightLimit); draw(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      themeObs.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, t.toast]);

  if (hidden) return null;

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-x-0 bottom-0 z-20" style={{ height: CANVAS_H }}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
      <button
        ref={hitRef}
        type="button"
        onClick={() => jumpRef.current()}
        aria-label={t.aria}
        title={t.title}
        data-pet
        className="pointer-events-auto absolute left-0 top-0 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-accent"
      />
    </div>
  );
}
