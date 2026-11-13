"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/data/i18n";

/*
  "Modo terminal": um terminal escondido para explorar o portfólio por comandos.
  Abre com a tecla ` (crase), pelo link no rodapé ou pelo evento "terminal:open".
  Comandos em pt/en/es (help, sobre, projetos, contato, cv, idioma, tema, sudo contratar...).
*/

export type TerminalData = {
  lang: Lang;
  name: string;
  role: string;
  location: string;
  summary: string;
  email: string;
  whatsapp: string;
  whatsappHref: string;
  linkedin: string;
  github: string;
  resume: string | null;
  projects: { title: string; href: string; stack: string[] }[];
  cases: string[];
  skills: { group: string; items: string[] }[];
  jobs: { role: string; company: string; period: string }[];
  sections: { id: string; label: string }[];
};

type Line = { kind: "in" | "out" | "err" | "ok" | "accent" | "link"; text: string; href?: string };

const T = {
  pt: {
    title: "terminal · anderson@portfolio", hint: "digite help e aperte Enter", unknown: "comando não encontrado:", tryHelp: "digite help para ver os comandos",
    welcome: "Bem-vindo ao terminal do portfólio do Anderson. Digite help para começar.",
    help: [
      ["help", "lista os comandos"], ["sobre", "quem é o Anderson"], ["projetos", "projetos em produção"], ["casos", "estudos de caso"],
      ["stack", "tecnologias"], ["experiencia", "carreira"], ["contato", "como falar comigo"], ["cv", "baixa o currículo"],
      ["ls", "lista as seções"], ["cd <seção>", "vai até uma seção"], ["idioma <pt|en|es>", "troca o idioma"], ["tema", "claro/escuro"],
      ["mascote", "mostra/oculta o dinossauro"], ["neofetch", "resumo em estilo dev"], ["sudo contratar", "🤫"], ["clear", "limpa a tela"], ["exit", "fecha o terminal"],
    ],
    openCv: "abrindo o currículo...", noCv: "currículo indisponível no momento.", theme: "tema alternado.", pet: "mascote alternado.",
    sudo: ["[sudo] senha para recrutador: ********", "Permissão concedida. Iniciando contratação...", "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%", "Abrindo o WhatsApp do Anderson. Boa conversa!"],
    sudoPlain: "use: sudo contratar", cdUsage: "use: cd <seção>  (veja ls)", langUsage: "use: idioma pt | en | es", going: "indo para",
  },
  en: {
    title: "terminal · anderson@portfolio", hint: "type help and press Enter", unknown: "command not found:", tryHelp: "type help to see the commands",
    welcome: "Welcome to Anderson's portfolio terminal. Type help to get started.",
    help: [
      ["help", "list commands"], ["about", "who Anderson is"], ["projects", "projects in production"], ["cases", "case studies"],
      ["stack", "technologies"], ["experience", "career"], ["contact", "how to reach me"], ["cv", "download the résumé"],
      ["ls", "list sections"], ["cd <section>", "jump to a section"], ["lang <pt|en|es>", "change language"], ["theme", "light/dark"],
      ["mascot", "show/hide the dinosaur"], ["neofetch", "dev-style summary"], ["sudo hire", "🤫"], ["clear", "clear the screen"], ["exit", "close the terminal"],
    ],
    openCv: "opening the résumé...", noCv: "résumé not available right now.", theme: "theme toggled.", pet: "mascot toggled.",
    sudo: ["[sudo] password for recruiter: ********", "Permission granted. Starting hiring process...", "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%", "Opening Anderson's WhatsApp. Have a great chat!"],
    sudoPlain: "usage: sudo hire", cdUsage: "usage: cd <section>  (see ls)", langUsage: "usage: lang pt | en | es", going: "going to",
  },
  es: {
    title: "terminal · anderson@portfolio", hint: "escribe help y presiona Enter", unknown: "comando no encontrado:", tryHelp: "escribe help para ver los comandos",
    welcome: "Bienvenido a la terminal del portafolio de Anderson. Escribe help para empezar.",
    help: [
      ["help", "lista los comandos"], ["sobre", "quién es Anderson"], ["proyectos", "proyectos en producción"], ["casos", "casos de estudio"],
      ["stack", "tecnologías"], ["experiencia", "trayectoria"], ["contacto", "cómo hablar conmigo"], ["cv", "descarga el CV"],
      ["ls", "lista las secciones"], ["cd <sección>", "va a una sección"], ["idioma <pt|en|es>", "cambia el idioma"], ["tema", "claro/oscuro"],
      ["mascota", "muestra/oculta el dinosaurio"], ["neofetch", "resumen estilo dev"], ["sudo contratar", "🤫"], ["clear", "limpia la pantalla"], ["exit", "cierra la terminal"],
    ],
    openCv: "abriendo el CV...", noCv: "CV no disponible por ahora.", theme: "tema cambiado.", pet: "mascota cambiada.",
    sudo: ["[sudo] contraseña para reclutador: ********", "Permiso concedido. Iniciando contratación...", "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%", "Abriendo el WhatsApp de Anderson. ¡Buena charla!"],
    sudoPlain: "uso: sudo contratar", cdUsage: "uso: cd <sección>  (ver ls)", langUsage: "uso: idioma pt | en | es", going: "yendo a",
  },
} as const;

// apelidos de comandos nos 3 idiomas
const ALIAS: Record<string, string> = {
  ajuda: "help", "?": "help", sobre: "about", about: "about", whoami: "about", quem: "about",
  projetos: "projects", projects: "projects", proyectos: "projects", casos: "cases", cases: "cases",
  stack: "stack", skills: "stack", tecnologias: "stack", experiencia: "experience", experience: "experience", carreira: "experience",
  contato: "contact", contact: "contact", contacto: "contact", cv: "cv", curriculo: "cv", resume: "cv",
  ls: "ls", cd: "cd", idioma: "lang", lang: "lang", language: "lang", tema: "theme", theme: "theme",
  mascote: "pet", mascot: "pet", mascota: "pet", neofetch: "neofetch", sudo: "sudo", clear: "clear", limpar: "clear", cls: "clear",
  exit: "exit", sair: "exit", salir: "exit", quit: "exit", help: "help",
};

const PATHS: Record<string, string> = { pt: "/", en: "/en/", es: "/es/" };

export function Terminal({ data }: { data: TerminalData }) {
  const t = T[data.lang];
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "");
      if (e.key === "`" && !typing) { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("terminal:open", onOpen); };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!lines.length) setLines([{ kind: "accent", text: t.welcome }]);
    setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { bodyRef.current?.scrollTo({ top: 1e6 }); }, [lines]);

  const out = (...ls: Line[]) => setLines((p) => [...p, ...ls]);

  const run = (raw: string) => {
    const cmdLine = raw.trim();
    out({ kind: "in", text: cmdLine });
    if (!cmdLine) return;
    setHist((h) => [cmdLine, ...h].slice(0, 50));
    const [c0, ...args] = cmdLine.split(/\s+/);
    const cmd = ALIAS[c0.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")];

    switch (cmd) {
      case "help":
        out(...t.help.map(([k, v]) => ({ kind: "out" as const, text: `${k.padEnd(18)} ${v}` })));
        break;
      case "about":
        out({ kind: "accent", text: `${data.name} · ${data.role}` }, { kind: "out", text: data.location }, { kind: "out", text: data.summary });
        break;
      case "projects":
        out(...data.projects.map((p) => ({ kind: "link" as const, text: `▸ ${p.title}  [${p.stack.slice(0, 3).join(", ")}]`, href: p.href })));
        break;
      case "cases":
        out(...data.cases.map((c) => ({ kind: "out" as const, text: `▸ ${c}` })), { kind: "ok", text: `cd casos` });
        break;
      case "stack":
        out(...data.skills.map((s) => ({ kind: "out" as const, text: `${(s.group + ":").padEnd(22)} ${s.items.join(", ")}` })));
        break;
      case "experience":
        out(...data.jobs.map((j) => ({ kind: "out" as const, text: `${j.period.padEnd(18)} ${j.role} · ${j.company}` })));
        break;
      case "contact":
        out(
          { kind: "link", text: `email     ${data.email}`, href: `mailto:${data.email}` },
          { kind: "link", text: `whatsapp  ${data.whatsapp}`, href: data.whatsappHref },
          { kind: "link", text: `linkedin  ${data.linkedin.replace("https://www.", "")}`, href: data.linkedin },
          { kind: "link", text: `github    ${data.github.replace("https://", "")}`, href: data.github },
        );
        break;
      case "cv":
        if (data.resume) { out({ kind: "ok", text: t.openCv }); window.open(data.resume, "_blank"); }
        else out({ kind: "err", text: t.noCv });
        break;
      case "ls":
        out({ kind: "out", text: data.sections.map((s) => s.id).join("   ") });
        break;
      case "cd": {
        const target = data.sections.find((s) => s.id === args[0] || s.label.toLowerCase() === (args[0] ?? "").toLowerCase());
        if (!target) { out({ kind: "err", text: t.cdUsage }); break; }
        out({ kind: "ok", text: `${t.going} #${target.id}` });
        setTimeout(() => { setOpen(false); document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" }); }, 350);
        break;
      }
      case "lang": {
        const l = (args[0] ?? "").toLowerCase();
        if (!PATHS[l]) { out({ kind: "err", text: t.langUsage }); break; }
        out({ kind: "ok", text: `→ ${l}` });
        setTimeout(() => { window.location.href = PATHS[l]; }, 300);
        break;
      }
      case "theme": {
        const root = document.documentElement;
        const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
        root.dataset.theme = dark ? "light" : "dark";
        try { localStorage.setItem("theme", root.dataset.theme); } catch {}
        out({ kind: "ok", text: t.theme });
        break;
      }
      case "pet":
        window.dispatchEvent(new Event("pet:toggle"));
        out({ kind: "ok", text: t.pet });
        break;
      case "neofetch":
        out(
          { kind: "accent", text: "   ▄▀▀▄ █   █    anderson@portfolio" },
          { kind: "accent", text: "   █▄▄█ ▀▄ ▄▀    ------------------" },
          { kind: "accent", text: "   █  █   ▀      " + data.role },
          { kind: "out", text: `   OS: ${data.location}` },
          { kind: "out", text: `   Stack: Python, Node.js, SQL, Docker` },
          { kind: "out", text: `   AI: Claude Code, agents, prompts` },
          { kind: "out", text: `   Company: DevTI's (MEI)` },
          { kind: "out", text: `   Uptime: 5+ years in tech` },
        );
        break;
      case "sudo":
        if (!args.length) { out({ kind: "err", text: t.sudoPlain }); break; }
        t.sudo.forEach((txt, i) => setTimeout(() => out({ kind: i === 2 ? "accent" : i === 3 ? "ok" : "out", text: txt }), i * 550));
        setTimeout(() => window.open(data.whatsappHref, "_blank"), t.sudo.length * 550 + 200);
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      default:
        out({ kind: "err", text: `${t.unknown} ${c0}` }, { kind: "out", text: t.tryHelp });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); setHi(-1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (hist[n]) { setHi(n); setInput(hist[n]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setInput(n >= 0 ? hist[n] : ""); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const m = Object.keys(ALIAS).find((k) => k.startsWith(input.toLowerCase()) && input);
      if (m) setInput(m + " ");
    }
  };

  if (!open) return null;

  const color: Record<Line["kind"], string> = { in: "text-white", out: "text-[#c9d1e8]", err: "text-[#ff7b8a]", ok: "text-[#5eead4]", accent: "text-[#b9adff]", link: "text-[#82aaff] underline-offset-2 hover:underline" };

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label={t.title}
        className="term-in flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d18] font-mono text-[13px] shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
          <button type="button" aria-label="Fechar" onClick={() => setOpen(false)} className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate text-xs text-white/60">{t.title}</span>
          <span className="ml-auto hidden text-[11px] text-white/35 sm:inline">{t.hint}</span>
        </div>
        <div ref={bodyRef} className="flex-1 space-y-1 overflow-y-auto p-4" onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
              {l.kind === "in" && <span className="text-[#5eead4]">anderson@portfolio:~$ </span>}
              {l.href ? <a href={l.href} target="_blank" rel="noopener noreferrer">{l.text}</a> : l.text}
            </div>
          ))}
          <div className="flex items-center text-white">
            <span className="shrink-0 text-[#5eead4]">anderson@portfolio:~$&nbsp;</span>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
              aria-label={t.hint} autoCapitalize="off" autoCorrect="off" spellCheck={false}
              className="w-full bg-transparent text-white caret-[#5eead4] outline-none" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Botão/link que abre o terminal. */
export function TerminalTrigger({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("terminal:open"))} className={className}>
      {label}
    </button>
  );
}
