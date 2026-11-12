// Ícones SVG animados (CSS em globals.css: .ico-*). Movimento sutil contínuo, acelera no hover do card (.group).

export type IconName =
  | "api" | "automation" | "database" | "chart" | "design" | "compass" | "pin" | "check"
  | "sparkles" | "agents" | "bot" | "users";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  switch (name) {
    case "api": // chaves com pacotes trafegando
      return (
        <svg {...base} className={`ico ico-api ${className}`}>
          <path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3" />
          <path d="M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3" />
          <circle className="dot d1" cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle className="dot d2" cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle className="dot d3" cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "automation": // engrenagem girando
      return (
        <svg {...base} className={`ico ico-automation ${className}`}>
          <g className="spin">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
          </g>
        </svg>
      );
    case "database": // camadas acendendo em sequência
      return (
        <svg {...base} className={`ico ico-database ${className}`}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path className="layer l1" d="M4 10c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          <path className="layer l2" d="M4 15c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "chart": // barras crescendo
      return (
        <svg {...base} className={`ico ico-chart ${className}`}>
          <path d="M3 3v18h18" />
          <rect className="bar b1" x="6.5" y="12" width="3" height="6" rx="0.5" />
          <rect className="bar b2" x="11.5" y="8" width="3" height="10" rx="0.5" />
          <rect className="bar b3" x="16.5" y="5" width="3" height="13" rx="0.5" />
        </svg>
      );
    case "design": // caneta desenhando um traço
      return (
        <svg {...base} className={`ico ico-design ${className}`}>
          <path className="stroke-draw" d="M3 20c3-1 5-4 8-4s3 3 6 3 3-1 4-2" />
          <g className="pen">
            <path d="M15 3l4 4-8 8H7v-4z" />
            <path d="M13 5l4 4" />
          </g>
        </svg>
      );
    case "compass": // agulha oscilando
      return (
        <svg {...base} className={`ico ico-compass ${className}`}>
          <circle cx="12" cy="12" r="10" />
          <g className="needle">
            <path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z" fill="currentColor" fillOpacity="0.25" />
          </g>
        </svg>
      );
    case "pin": // marcador quicando
      return (
        <svg {...base} className={`ico ico-pin ${className}`}>
          <g className="bounce">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </g>
        </svg>
      );
    case "sparkles": // brilhos de IA piscando
      return (
        <svg {...base} className={`ico ico-sparkles ${className}`}>
          <path className="spk s1" d="M10 3l1.8 4.7L16.5 9.5l-4.7 1.8L10 16l-1.8-4.7L3.5 9.5l4.7-1.8z" />
          <path className="spk s2" d="M18 14l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
          <path className="spk s3" d="M18 2.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
        </svg>
      );
    case "agents": // nós conectados com sinal trafegando
      return (
        <svg {...base} className={`ico ico-agents ${className}`}>
          <path className="wire" d="M6 6l6 6m0 0l6-6m-6 6v6" />
          <circle cx="5" cy="5" r="2.5" />
          <circle cx="19" cy="5" r="2.5" />
          <circle cx="12" cy="19.5" r="2.5" />
          <circle className="core" cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      );
    case "bot": // robô piscando os olhos
      return (
        <svg {...base} className={`ico ico-bot ${className}`}>
          <g className="bounce">
            <rect x="4" y="8" width="16" height="12" rx="3" />
            <path d="M12 4v4" />
            <circle className="antenna" cx="12" cy="3" r="1.2" fill="currentColor" />
            <g className="eyes">
              <circle cx="9" cy="14" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="15" cy="14" r="1.3" fill="currentColor" stroke="none" />
            </g>
          </g>
        </svg>
      );
    case "users": // pessoas, a de trás surgindo
      return (
        <svg {...base} className={`ico ico-users ${className}`}>
          <g className="back">
            <circle cx="17" cy="8" r="3" />
            <path d="M21 20v-1a4 4 0 0 0-3-3.9" />
          </g>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" />
        </svg>
      );
    case "check": // check sendo desenhado
      return (
        <svg {...base} className={`ico ico-check ${className}`}>
          <circle cx="12" cy="12" r="10" />
          <path className="stroke-draw" d="M7.5 12.5l3 3 6-6.5" />
        </svg>
      );
  }
}
