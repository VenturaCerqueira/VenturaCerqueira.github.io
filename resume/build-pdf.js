// Gera os PDFs do currículo (pt, en, es) a partir de resume/curriculo-{pt,en,es}.html usando o Chrome instalado.
// Uso: python resume/translate.py   (gera en/es a partir do pt)
//      node resume/build-pdf.js
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PUBLIC = path.join(__dirname, "..", "public");
const FILES = {
  pt: "curriculo-anderson-ventura.pdf",
  en: "resume-anderson-ventura-en.pdf",
  es: "cv-anderson-ventura-es.pdf",
};

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  for (const [lang, out] of Object.entries(FILES)) {
    const src = path.join(__dirname, `curriculo-${lang}.html`);
    if (!fs.existsSync(src)) { console.log("pulado (não existe):", src); continue; }
    await page.goto("file:///" + src.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await page.pdf({ path: path.join(PUBLIC, out), format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log("PDF gerado:", `public/${out}`);
  }
  await browser.close();
})();
