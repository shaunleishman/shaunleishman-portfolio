/**
 * Static accessibility audit — checks codebase patterns without a browser.
 * Run: npm run a11y:audit
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../src");

const issues = [];
const passes = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx|jsx|html)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = walk(SRC);

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const rel = path.relative(path.join(__dirname, ".."), file);

  // Images without alt
  const imgs = content.match(/<img[^>]*>/g) ?? [];
  imgs.forEach((img) => {
    if (!/alt=/.test(img)) {
      issues.push(`${rel}: <img> missing alt attribute`);
    }
  });

  // Buttons without accessible name
  const buttons = content.match(/<button[^>]*>[\s]*<\/button>/g) ?? [];
  if (buttons.length) {
    issues.push(`${rel}: empty <button> without accessible name`);
  }

  // Links with href="#"
  if (/href="#"/.test(content) && !rel.includes("skip")) {
    issues.push(`${rel}: placeholder href="#" found`);
  }
}

// Layout checks
const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
if (layout.includes('lang="en-GB"')) passes.push("HTML lang attribute set (en-GB)");
else issues.push("layout.tsx: missing lang attribute");

if (layout.includes("skip-link")) passes.push("Skip to main content link present");
else issues.push("layout.tsx: missing skip link");

if (layout.includes('id="main-content"')) passes.push("Main landmark with id present");
else issues.push("layout.tsx: missing main#main-content");

const globals = fs.readFileSync(path.join(SRC, "app/globals.css"), "utf-8");
if (globals.includes("prefers-reduced-motion")) passes.push("Reduced motion media query");
else issues.push("globals.css: missing prefers-reduced-motion");

if (globals.includes(":focus-visible")) passes.push("Focus-visible styles defined");
else issues.push("globals.css: missing :focus-visible styles");

if (globals.includes("clamp(")) passes.push("Fluid typography with clamp()");
else issues.push("globals.css: missing fluid type scale");

// Heading hierarchy — each page should have one h1
const pages = files.filter((f) => f.includes("/app/") && f.endsWith("page.tsx"));
for (const page of pages) {
  const content = fs.readFileSync(page, "utf-8");
  const rel = path.relative(path.join(__dirname, ".."), page);
  const h1Count = (content.match(/<h1/g) ?? []).length;
  if (h1Count === 0) issues.push(`${rel}: no <h1> found`);
  else if (h1Count > 1) issues.push(`${rel}: multiple <h1> elements (${h1Count})`);
  else passes.push(`${rel}: single h1 ✓`);
}

console.log("\n=== Accessibility Audit ===\n");
console.log(`Files scanned: ${files.length}`);
console.log(`\nPasses (${passes.length}):`);
passes.forEach((p) => console.log(`  ✓ ${p}`));

if (issues.length) {
  console.log(`\nIssues (${issues.length}):`);
  issues.forEach((i) => console.log(`  ✗ ${i}`));
  process.exit(1);
} else {
  console.log("\nNo issues found.");
}
