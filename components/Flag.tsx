// Bandeiras em SVG (o Windows não exibe emoji de bandeira). Proporção 3:2, cantos arredondados.

export type FlagCode = "br" | "us" | "es";

export function Flag({ code, width = 22, className = "" }: { code: FlagCode; width?: number; className?: string }) {
  const h = Math.round((width * 2) / 3);
  const common = { width, height: h, viewBox: "0 0 30 20", className: `shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10 ${className}`, "aria-hidden": true } as const;

  if (code === "br")
    return (
      <svg {...common}>
        <rect width="30" height="20" fill="#009c3b" />
        <path d="M15 2.2 27.6 10 15 17.8 2.4 10z" fill="#ffdf00" />
        <circle cx="15" cy="10" r="4.6" fill="#002776" />
        <path d="M10.5 9.1c3-.8 6.4-.4 9.1 1.1" stroke="#fff" strokeWidth="0.9" fill="none" />
      </svg>
    );

  if (code === "us")
    return (
      <svg {...common}>
        <rect width="30" height="20" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
        ))}
        <rect width="13" height={(20 / 13) * 7} fill="#3c3b6e" />
        {[1.6, 4.2, 6.8, 9.4].map((y, r) =>
          [1.5, 4, 6.5, 9, 11.5].slice(0, r % 2 ? 4 : 5).map((x) => (
            <circle key={`${x}-${y}`} cx={r % 2 ? x + 1.25 : x} cy={y} r="0.55" fill="#fff" />
          )),
        )}
      </svg>
    );

  return (
    <svg {...common}>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
      <rect x="7" y="7.2" width="3.4" height="5.6" rx="0.6" fill="#aa151b" opacity="0.85" />
    </svg>
  );
}
