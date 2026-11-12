"use client";

import { useEffect, useRef, useState } from "react";

// "Reduzir movimento" não desliga estes efeitos: são suaves (fade, contagem, digitação).
const reduced = () => false;

/** Observa todos os .reveal da página e adiciona .in quando entram na tela. Renderize uma vez. */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Número que conta de 0 até `to` quando aparece na tela. */
export function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to); // SSR mostra o valor final (sem JS também funciona)

  useEffect(() => {
    if (reduced()) return;
    const el = ref.current!;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}

/** Digita e apaga frases em loop. */
export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(words[0].length);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduced()) return;
    const word = words[i];
    let ms = del ? 35 : 75;
    if (!del && len === word.length) ms = 2200;
    if (del && len === 0) ms = 300;
    const t = setTimeout(() => {
      if (!del && len === word.length) setDel(true);
      else if (del && len === 0) { setDel(false); setI((i + 1) % words.length); }
      else setLen(len + (del ? -1 : 1));
    }, ms);
    return () => clearTimeout(t);
  }, [i, len, del, words]);

  return (
    <span className={className}>
      {words[i].slice(0, len)}
      <span className="caret" aria-hidden>|</span>
    </span>
  );
}
