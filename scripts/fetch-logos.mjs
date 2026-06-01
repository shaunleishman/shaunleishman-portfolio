/**
 * Fetches brand SVG logos and normalizes them to white for the dark carousel.
 * Run: node scripts/fetch-logos.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as simpleIcons from "simple-icons";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/companies");

const VIEW_W = 180;
const VIEW_H = 48;

/** @type {{ file: string, name: string, url?: string, slug?: string, wordmark?: string, lines?: string[] }} */
const BRANDS = [
  {
    file: "nhs.svg",
    name: "NHS",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/National_Health_Service_%28England%29_logo.svg",
  },
  {
    file: "omron.svg",
    name: "OMRON",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Omron_Logo.svg",
  },
  {
    file: "public-health-scotland.svg",
    name: "Public Health Scotland",
    lines: ["Public Health", "Scotland"],
  },
  {
    file: "scottish-government.svg",
    name: "Scottish Government",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Scottish_Government_Logo.svg",
  },
  {
    file: "energy-saving-trust.svg",
    name: "Energy Saving Trust",
    lines: ["Energy Saving", "Trust"],
  },
  {
    file: "home-energy-scotland.svg",
    name: "Home Energy Scotland",
    lines: ["Home Energy", "Scotland"],
  },
  {
    file: "peoples-postcode-lottery.svg",
    name: "People's Postcode Lottery",
    lines: ["People's Postcode", "Lottery"],
  },
  {
    file: "natwest.svg",
    name: "NatWest",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/95/NatWest_logo.svg",
  },
  {
    file: "rbs.svg",
    name: "RBS",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Royal_Bank_of_Scotland_logo.svg",
  },
  {
    file: "ulster-bank.svg",
    name: "Ulster Bank",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Ulster_Bank_logo.svg",
  },
  { file: "vodafone.svg", name: "Vodafone", slug: "vodafone" },
  { file: "emirates.svg", name: "Emirates", slug: "emirates" },
  {
    file: "scottish-rugby.svg",
    name: "Scottish Rugby",
    url: "https://upload.wikimedia.org/wikipedia/en/5/55/Scottish_Rugby_Logo.svg",
  },
  { file: "icas.svg", name: "ICAS", wordmark: "ICAS" },
  { file: "aib.svg", name: "AIB", slug: "aib" },
  {
    file: "kbc.svg",
    name: "KBC",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/KBC_Bank_and_Insurance_Holding_Company_logo.svg",
  },
  {
    file: "ey.svg",
    name: "EY",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/EY_logo_2019.svg",
  },
  { file: "tesco.svg", name: "Tesco", slug: "tesco" },
  {
    file: "datalex.svg",
    name: "Datalex",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Datalex.svg",
  },
  {
    file: "tenable.svg",
    name: "Tenable",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tenable_logo.svg",
  },
  {
    file: "workhuman.svg",
    name: "Workhuman",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Workhuman_logo.svg",
  },
  { file: "arbnco.svg", name: "Arbnco", wordmark: "Arbnco" },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function wordmarkSvg(name, lines, fontSize = 12) {
  const textLines = lines ?? [name];
  const lineHeight = fontSize + 3;
  const startY = (VIEW_H - (textLines.length - 1) * lineHeight) / 2 + fontSize * 0.35;
  const textEls = textLines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="${VIEW_W / 2}" y="${y}" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`;
    })
    .join("\n    ");
  return wrapSvg(name, textEls);
}

function simpleIconSvg(slug, title) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = simpleIcons[key];
  if (!icon) return null;

  const pad = 6;
  const size = VIEW_H - pad * 2;
  const scale = size / 24;
  const offsetX = (VIEW_W - 24 * scale) / 2;
  const offsetY = (VIEW_H - 24 * scale) / 2;

  const inner = `<g transform="translate(${offsetX}, ${offsetY}) scale(${scale})"><path d="${icon.path}" fill="#FFFFFF"/></g>`;
  return wrapSvg(title, inner);
}

function wrapSvg(label, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="${escapeXml(label)}">\n    ${inner}\n  </svg>`;
}

function normalizeExternalSvg(raw, label) {
  if (!raw.includes("<svg")) return null;

  let svg = raw
    .replace(/<\?xml[^?]*\?>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/\s(fill|stroke)="(?!none)[^"]*"/gi, ' $1="#FFFFFF"')
    .replace(/\s(fill|stroke):(?!none)\s*[^;"]+/gi, " $1:#FFFFFF")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "");

  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/i);
  const vb = viewBoxMatch ? viewBoxMatch[1] : `0 0 ${VIEW_W} ${VIEW_H}`;

  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${VIEW_W}" height="${VIEW_H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${escapeXml(label)}">
  <g fill="#FFFFFF" stroke="#FFFFFF">
    ${inner}
  </g>
</svg>`;
}

async function fetchSvg(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "shaunleishman-portfolio/1.0" },
  });
  if (!res.ok) return null;
  const text = await res.text();
  if (!text.includes("<svg")) return null;
  return text;
}

async function buildLogo(brand) {
  if (brand.url) {
    try {
      const raw = await fetchSvg(brand.url);
      const normalized = raw ? normalizeExternalSvg(raw, brand.name) : null;
      if (normalized) return normalized;
      console.warn(`  ↳ fetch failed or invalid: ${brand.name}`);
    } catch {
      console.warn(`  ↳ network error: ${brand.name}`);
    }
  }

  if (brand.slug) {
    const icon = simpleIconSvg(brand.slug, brand.name);
    if (icon) return icon;
  }

  if (brand.wordmark) {
    return wordmarkSvg(brand.wordmark, [brand.wordmark], brand.wordmark.length <= 4 ? 20 : 14);
  }

  return wordmarkSvg(brand.name, brand.lines ?? [brand.name], brand.lines ? 11 : 13);
}

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const brand of BRANDS) {
  const svg = await buildLogo(brand);
  fs.writeFileSync(path.join(OUT, brand.file), svg);
  const source = brand.url ? "web" : brand.slug ? "icon" : "wordmark";
  console.log(`✓ ${brand.file} (${source})`);
  ok++;
}

console.log(`\nProcessed ${ok}/${BRANDS.length} logos.`);
