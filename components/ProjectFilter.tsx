"use client";

import { useRef, useState } from "react";
import { NavIcon, type NavIconName } from "@/components/NavIcon";

/* Barra de filtros da seção de projetos. Marca data-filter na seção; o CSS esconde os cards. */

type Key = "all" | "gestao" | "produto" | "design" | "opensource";
const ORDER: { key: Key; icon: NavIconName }[] = [
  { key: "all", icon: "layers" },
  { key: "gestao", icon: "building" },
  { key: "produto", icon: "rocket" },
  { key: "design", icon: "sparkles" },
  { key: "opensource", icon: "code" },
];

export function ProjectFilter({ labels, counts }: { labels: Record<Key | "label", string>; counts: Record<Key, number> }) {
  const [active, setActive] = useState<Key>("all");
  const ref = useRef<HTMLDivElement>(null);

  const choose = (k: Key) => {
    setActive(k);
    const section = ref.current?.closest("section");
    if (section) section.dataset.filter = k;
  };

  return (
    <div ref={ref} role="toolbar" aria-label={labels.label} className="reveal mb-8 flex flex-wrap justify-center gap-2">
      {ORDER.map(({ key, icon }) => (
        <button key={key} type="button" aria-pressed={active === key} onClick={() => choose(key)}
          className={`group/item inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            active === key
              ? "border-transparent bg-gradient-to-r from-accent to-accent-2 text-white shadow-md shadow-accent/30"
              : "border-border bg-surface text-muted hover:border-accent hover:text-accent"
          }`}>
          <NavIcon name={icon} size={15} />
          {labels[key]}
          <span className={`rounded-full px-1.5 text-xs ${active === key ? "bg-white/25" : "bg-accent-soft text-accent"}`}>{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
