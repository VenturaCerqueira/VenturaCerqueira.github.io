// Gera public/og/og-{pt,en,es}.jpg (1200x630) a partir de scripts/og.html.
// Uso: node scripts/build-og.js
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SRC = "file:///" + path.join(__dirname, "og.html").replace(/\\/g, "/");
const OUT = path.join(__dirname, "..", "public", "og");

const VARIANTS = {
  pt: { available: "Disponível para novas oportunidades", role: "Analista de Desenvolvimento", level: "Pleno", tags: "Python|Node.js|SQL|APIs REST|Docker|IA" },
  en: { available: "Open to new opportunities", role: "Software Developer", level: "Mid-Level", tags: "Python|Node.js|SQL|REST APIs|Docker|AI" },
  es: { available: "Disponible para nuevas oportunidades", role: "Analista de Desarrollo", level: "Semi Senior", tags: "Python|Node.js|SQL|APIs REST|Docker|IA" },
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  for (const [lang, v] of Object.entries(VARIANTS)) {
    await page.goto(`${SRC}?${new URLSearchParams(v)}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await page.screenshot({ path: path.join(OUT, `og-${lang}.jpg`), type: "jpeg", quality: 86 }); // JPG leve: WhatsApp só mostra prévia de imagens pequenas
    console.log("gerado:", `public/og/og-${lang}.jpg`);
  }
  await browser.close();
})();
