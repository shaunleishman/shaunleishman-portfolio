/**
 * Generates crisp white SVG wordmarks and icon logos for companies
 * without a suitable PNG source. Run: node scripts/generate-logos.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as simpleIcons from "simple-icons";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/companies");

const VIEW_W = 180;
const VIEW_H = 48;

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function wordmark(name, lines, fontSize = 13, fontWeight = 600) {
  const textLines = lines ?? [name];
  const lineHeight = fontSize + 3;
  const startY = (VIEW_H - (textLines.length - 1) * lineHeight) / 2 + fontSize * 0.35;
  const textEls = textLines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="${VIEW_W / 2}" y="${y}" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}">${escapeXml(line)}</text>`;
    })
    .join("\n    ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="${escapeXml(name.replace("\n", " "))}">\n    ${textEls}\n  </svg>`;
}

function iconLogo(slug, title) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = simpleIcons[key];
  if (!icon) return wordmark(title, [title]);

  const pad = 6;
  const size = VIEW_H - pad * 2;
  const scale = size / 24;
  const offsetX = (VIEW_W - 24 * scale) / 2;
  const offsetY = (VIEW_H - 24 * scale) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="${escapeXml(title)}">
    <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})"><path d="${icon.path}" fill="#FFFFFF"/></g>
  </svg>`;
}

function eyLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" role="img" aria-label="EY">
    <text x="90" y="32" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="700" letter-spacing="-0.08em">EY</text>
  </svg>`;
}

function kbcLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" role="img" aria-label="KBC">
    <text x="90" y="30" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="26" font-weight="800" letter-spacing="0.12em">KBC</text>
    <rect x="62" y="36" width="56" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9"/>
  </svg>`;
}

const logos = [
  { file: "aib.svg", content: iconLogo("aib", "AIB") },
  { file: "vodafone.svg", content: iconLogo("vodafone", "Vodafone") },
  { file: "emirates.svg", content: iconLogo("emirates", "Emirates") },
  { file: "tesco.svg", content: iconLogo("tesco", "Tesco") },
  { file: "ey.svg", content: eyLogo() },
  { file: "kbc.svg", content: kbcLogo() },
  { file: "datalex.svg", content: wordmark("Datalex", ["Datalex"], 18, 700) },
  { file: "tenable.svg", content: wordmark("Tenable", ["Tenable"], 17, 700) },
  { file: "workhuman.svg", content: wordmark("Workhuman", ["Workhuman"], 15, 700) },
  { file: "arbnco.svg", content: wordmark("Arbnco", ["Arbnco"], 18, 700) },
];

for (const { file, content } of logos) {
  fs.writeFileSync(path.join(OUT, file), content);
  console.log(`✓ ${file}`);
}
