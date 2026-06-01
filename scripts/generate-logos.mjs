/**
 * Generates unified white SVG logos (180×48) for the company carousel.
 * Run: node scripts/generate-logos.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as simpleIcons from "simple-icons";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/companies");

const VIEW_W = 180;
const VIEW_H = 48;

function wordmark(name, fontSize = 13) {
  const lines = name.includes("\n") ? name.split("\n") : [name];
  const lineHeight = fontSize + 4;
  const startY = (VIEW_H - (lines.length - 1) * lineHeight) / 2 + fontSize * 0.35;

  const textEls = lines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="${VIEW_W / 2}" y="${y}" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="600" letter-spacing="0.04em">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="${escapeXml(name.replace("\n", " "))}">
    ${textEls}
  </svg>`;
}

function iconLogo(slug, title) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = simpleIcons[key];
  if (!icon) return wordmark(title);

  const pad = 8;
  const size = VIEW_H - pad * 2;
  const scale = size / 24;
  const offsetX = (VIEW_W - 24 * scale) / 2;
  const offsetY = (VIEW_H - 24 * scale) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="${escapeXml(title)}">
    <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
      <path d="${icon.path}" fill="#FFFFFF"/>
    </g>
  </svg>`;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

/** NHS-style italic wordmark approximation */
function nhsLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="NHS">
    <text x="${VIEW_W / 2}" y="32" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" font-style="italic" letter-spacing="-0.02em">NHS</text>
  </svg>`;
}

const logos = [
  { file: "nhs.svg", svg: nhsLogo() },
  { file: "omron.svg", svg: wordmark("OMRON", 18) },
  { file: "public-health-scotland.svg", svg: wordmark("Public Health\nScotland", 11) },
  { file: "scottish-government.svg", svg: wordmark("Scottish\nGovernment", 11) },
  { file: "energy-saving-trust.svg", svg: wordmark("Energy Saving Trust", 10) },
  { file: "home-energy-scotland.svg", svg: wordmark("Home Energy\nScotland", 11) },
  { file: "peoples-postcode-lottery.svg", svg: wordmark("People's Postcode\nLottery", 10) },
  { file: "natwest.svg", svg: wordmark("NatWest", 16) },
  { file: "rbs.svg", svg: wordmark("RBS", 20) },
  { file: "ulster-bank.svg", svg: wordmark("Ulster Bank", 13) },
  { file: "vodafone.svg", svg: iconLogo("vodafone", "Vodafone") },
  { file: "emirates.svg", svg: iconLogo("emirates", "Emirates") },
  { file: "scottish-rugby.svg", svg: wordmark("Scottish Rugby", 12) },
  { file: "icas.svg", svg: wordmark("ICAS", 18) },
  { file: "aib.svg", svg: iconLogo("aib", "AIB") },
  { file: "kbc.svg", svg: wordmark("KBC", 20) },
  { file: "ey.svg", svg: wordmark("EY", 22) },
  { file: "tesco.svg", svg: iconLogo("tesco", "Tesco") },
  { file: "datalex.svg", svg: wordmark("Datalex", 15) },
  { file: "tenable.svg", svg: wordmark("Tenable", 15) },
  { file: "workhuman.svg", svg: wordmark("Workhuman", 13) },
  { file: "arbnco.svg", svg: wordmark("Arbnco", 16) },
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

for (const { file, svg } of logos) {
  fs.writeFileSync(path.join(OUT, file), svg);
  console.log(`✓ ${file}`);
}

console.log(`\nGenerated ${logos.length} unified SVG logos.`);
