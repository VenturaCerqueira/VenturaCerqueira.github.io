"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { TerminalData } from "@/components/Terminal";
import type { UI } from "@/data/i18n";

/*
  Carregamento sob demanda (desempenho no celular):
  - mascote: baixado e iniciado só depois que a página terminou de carregar;
  - terminal: o código só é baixado quando alguém abre (tecla ` ou link "Abrir o terminal").
*/

const PixelPet = dynamic(() => import("@/components/PixelPet").then((m) => m.PixelPet), { ssr: false });
const Terminal = dynamic(() => import("@/components/Terminal").then((m) => m.Terminal), { ssr: false });

export function LazyPixelPet({ t }: { t: UI["pet"] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if (document.readyState === "complete") { const id = window.setTimeout(go, 800); return () => window.clearTimeout(id); }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);
  return ready ? <PixelPet t={t} /> : null;
}

export function LazyTerminal({ data }: { data: TerminalData }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) return;
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "");
      if (e.key === "`" && !typing) { e.preventDefault(); setLoad(true); }
    };
    const onOpen = () => setLoad(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("terminal:open", onOpen); };
  }, [load]);
  return load ? <Terminal data={data} startOpen /> : null;
}
