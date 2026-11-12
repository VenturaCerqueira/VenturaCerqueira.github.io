// Gera public/curriculo-anderson-ventura.pdf a partir de resume/curriculo-pt.html usando o Chrome instalado.
// Uso: node resume/build-pdf.js   (requer: npm i -D puppeteer-core)
const path = require("path");
const puppeteer = require("puppeteer-core");

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SRC = path.join(__dirname, "curriculo-pt.html");
const OUT = path.join(__dirname, "..", "public", "curriculo-anderson-ventura.pdf");

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await page.goto("file:///" + SRC.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({ path: OUT, format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("PDF gerado:", OUT);
})();
