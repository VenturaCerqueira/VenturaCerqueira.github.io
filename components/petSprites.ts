// Gera os sprites do mascote a partir de formas (elipses, triângulos, retângulos) rasterizadas
// numa grade de pixels, com sombreamento e contorno automáticos. Resultado: pixel art arredondada.

type Grid = string[][];

const PALETTE: Record<string, string> = {
  O: "#2a2152", // contorno
  B: "#7b6cf6", // corpo
  H: "#a99dfd", // luz
  D: "#5a49d8", // sombra
  L: "#ffe8c4", // barriga
  l: "#f6d29f", // sombra da barriga
  S: "#34d3b6", // espinhos
  s: "#16a58f", // sombra dos espinhos
  G: "#2a2152", // armação dos óculos
  N: "#e6f6ff", // lente
  E: "#2a2152", // pupila
  W: "#ffffff", // brilho / dentes
  P: "#ff8fab", // bochecha / língua
  M: "#7a1f3d", // boca aberta
  R: "#ff5d6c", // bug
  r: "#ff9aa3", // luz do bug
  w: "rgba(255,255,255,0.85)", // asas
};

const grid = (w: number, h: number): Grid => Array.from({ length: h }, () => Array(w).fill("."));
const inb = (g: Grid, x: number, y: number) => y >= 0 && y < g.length && x >= 0 && x < g[0].length;
const empty = (g: Grid, x: number, y: number) => !inb(g, x, y) || g[y][x] === ".";

function ellipse(g: Grid, cx: number, cy: number, rx: number, ry: number, ch: string, only?: string) {
  for (let y = 0; y < g.length; y++)
    for (let x = 0; x < g[0].length; x++) {
      const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
      if (dx * dx + dy * dy <= 1 && (!only || only.includes(g[y][x]))) g[y][x] = ch;
    }
}
function rect(g: Grid, x0: number, y0: number, x1: number, y1: number, ch: string) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (inb(g, x, y)) g[y][x] = ch;
}
function tri(g: Grid, ax: number, ay: number, bx: number, by: number, cx: number, cy: number, ch: string) {
  const s = (px: number, py: number, qx: number, qy: number, rx: number, ry: number) => (px - rx) * (qy - ry) - (qx - rx) * (py - ry);
  for (let y = 0; y < g.length; y++)
    for (let x = 0; x < g[0].length; x++) {
      const px = x + 0.5, py = y + 0.5;
      const d1 = s(px, py, ax, ay, bx, by), d2 = s(px, py, bx, by, cx, cy), d3 = s(px, py, cx, cy, ax, ay);
      const neg = d1 < 0 || d2 < 0 || d3 < 0, pos = d1 > 0 || d2 > 0 || d3 > 0;
      if (!(neg && pos)) g[y][x] = ch;
    }
}
const set = (g: Grid, pts: [number, number][], ch: string) => pts.forEach(([x, y]) => inb(g, x, y) && (g[y][x] = ch));

/** luz em cima/esquerda, sombra embaixo */
function shade(g: Grid, base: string, light: string, dark: string) {
  const src = g.map((r) => [...r]);
  for (let y = 0; y < g.length; y++)
    for (let x = 0; x < g[0].length; x++) {
      if (src[y][x] !== base) continue;
      if (empty(src, x, y + 1) || empty(src, x, y + 2)) g[y][x] = dark;
      else if (empty(src, x, y - 1) || (empty(src, x - 1, y - 1) && empty(src, x, y - 2))) g[y][x] = light;
    }
}
/** contorno: pixels vazios encostados (4-vizinhos) em pixels pintados */
function outline(g: Grid, ch = "O") {
  const src = g.map((r) => [...r]);
  for (let y = 0; y < g.length; y++)
    for (let x = 0; x < g[0].length; x++)
      if (src[y][x] === "." && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => !empty(src, x + a, y + b) && src[y + b][x + a] !== "w"))
        g[y][x] = ch;
}

export const DINO_W = 34;
export const DINO_H = 30;
/** caixa da boca (olhando para a direita), em unidades da grade */
export const MOUTH = { x: 26, y: 10, w: 8, h: 8 };

export type DinoPose = { leg: 0 | 1; mouth: boolean; blink: boolean };

export function dinoGrid({ leg, mouth, blink }: DinoPose): Grid {
  const g = grid(DINO_W, DINO_H);
  // pernas (atrás do corpo)
  if (leg === 0) { rect(g, 9, 24, 12, 28, "B"); rect(g, 17, 24, 20, 28, "B"); }
  else { rect(g, 10, 24, 13, 27, "B"); rect(g, 16, 24, 19, 28, "B"); }
  // espinhos nas costas (atrás do corpo)
  const bodyTop = (x: number) => 19.5 - 7 * Math.sqrt(Math.max(0, 1 - ((x - 15) / 9) ** 2));
  for (const x of [7.5, 10.5, 13.5]) { const t = bodyTop(x); tri(g, x - 1.7, t + 1.8, x + 1.7, t + 1.8, x, t - 2.3, "S"); }
  tri(g, 15.6, 6.5, 18.6, 5, 16, 2.2, "S");
  // cauda, corpo, cabeça, focinho
  tri(g, 1.2, 13.5, 9.5, 16, 8.5, 23, "B");
  ellipse(g, 15, 19.5, 9, 7, "B");
  ellipse(g, 24, 10, 8, 7, "B");
  ellipse(g, 29.4, 12.6, 3.1, 3.3, "B");
  // barriga
  ellipse(g, 19, 20.5, 3.9, 4.2, "L", "B");
  shade(g, "B", "H", "D");
  shade(g, "L", "L", "l");
  shade(g, "S", "S", "s");
  // bracinho
  ellipse(g, 22.6, 19.6, 1.9, 1.3, "D");
  set(g, [[24, 20]], "O");
  // óculos: haste + armação + lente
  rect(g, 17, 8, 21, 8, "G");
  rect(g, 22, 6, 28, 11, "G");
  rect(g, 23, 7, 27, 10, "N");
  if (blink) rect(g, 23, 9, 27, 9, "E");
  else { rect(g, 25, 7, 26, 9, "E"); set(g, [[25, 7]], "W"); set(g, [[23, 7]], "W"); }
  // bochecha e narina
  set(g, [[27, 13], [28, 13]], "P");
  set(g, [[31, 10]], "D");
  // boca
  if (mouth) {
    ellipse(g, 30.2, 15.6, 3.2, 2.2, "M");
    set(g, [[28, 14], [30, 14], [32, 14]], "W");
    set(g, [[29, 16], [30, 16]], "P");
  } else {
    set(g, [[27, 15], [28, 16], [29, 16], [30, 16], [31, 15]], "O");
  }
  outline(g);
  return g;
}

export const BUG_W = 13;
export const BUG_H = 11;
export function bugGrid(wingUp: boolean): Grid {
  const g = grid(BUG_W, BUG_H);
  if (wingUp) { ellipse(g, 4.5, 2.6, 2.6, 1.8, "w"); ellipse(g, 7.6, 2.4, 2.3, 1.6, "w"); }
  else { ellipse(g, 3.8, 4.2, 3.2, 1.3, "w"); ellipse(g, 7.8, 4.1, 2.8, 1.2, "w"); }
  ellipse(g, 5.8, 6.4, 3.9, 2.9, "R");
  shade(g, "R", "r", "R");
  ellipse(g, 10, 6.4, 1.9, 1.9, "O");
  set(g, [[4, 5], [6, 7], [3, 7], [7, 5]], "O");
  set(g, [[10, 5]], "W");
  set(g, [[11, 3], [12, 2]], "O");
  set(g, [[4, 9], [6, 9], [8, 9]], "O");
  outline(g);
  return g;
}

/** desenha a grade num canvas fora da tela, em escala px */
export function toCanvas(g: Grid, px: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = g[0].length * px;
  c.height = g.length * px;
  const ctx = c.getContext("2d")!;
  for (let y = 0; y < g.length; y++)
    for (let x = 0; x < g[0].length; x++) {
      const ch = g[y][x];
      if (ch === ".") continue;
      ctx.fillStyle = PALETTE[ch] ?? "#000";
      ctx.fillRect(x * px, y * px, px, px);
    }
  return c;
}
