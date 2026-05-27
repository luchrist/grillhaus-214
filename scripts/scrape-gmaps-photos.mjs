#!/usr/bin/env node
// Scrape ALL photos from a Google Business profile via Google Maps.
// Must be run from the xoxo directory (has playwright installed):
//   cd ~/Dev/Kunden-Projekte/xoxo
//   node ../doenerpalast/scripts/scrape-gmaps-photos.mjs
//
// Or run from doenerpalast after `npm install playwright`:
//   node scripts/scrape-gmaps-photos.mjs

import { chromium } from "playwright";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const QUERY = process.argv[2] ?? "Dönerpalast Neckarsulm Gottlieb-Daimler-Straße 35";
const OUT_DIR = path.resolve(process.argv[3] ?? "../doenerpalast/tmp/doener-photos/raw");

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  locale: "de-DE",
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(QUERY)}`;
console.log("→ open", mapsUrl);
await page.goto(mapsUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });

try {
  const consent = page.getByRole("button", { name: /alle akzeptieren|accept all|akzeptieren/i });
  if (await consent.first().isVisible({ timeout: 4_000 }).catch(() => false)) {
    await consent.first().click();
    await page.waitForTimeout(1_500);
  }
} catch {}

await page.waitForTimeout(3_000);

try {
  const firstResult = page.locator('a[href*="/maps/place/"]').first();
  if (await firstResult.isVisible({ timeout: 4_000 }).catch(() => false)) {
    await firstResult.click();
    await page.waitForTimeout(2_500);
  }
} catch {}

const photoButtonSelectors = [
  'button[aria-label*="Foto"]',
  'button[aria-label*="Photo"]',
  'a[aria-label*="Foto"]',
  'a[aria-label*="Photo"]',
  'div[role="button"][aria-label*="Foto"]',
  'div[role="button"][aria-label*="Photo"]',
  'button:has-text("Fotos")',
  'button:has-text("Photos")',
];

let opened = false;
for (const sel of photoButtonSelectors) {
  const btn = page.locator(sel).first();
  if (await btn.isVisible({ timeout: 1_000 }).catch(() => false)) {
    console.log("→ click photo trigger:", sel);
    await btn.click();
    opened = true;
    break;
  }
}
if (!opened) {
  const img = page.locator('button img[src*="googleusercontent"]').first();
  if (await img.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await img.click();
    opened = true;
  }
}
await page.waitForTimeout(2_500);

for (const name of [/alle ansehen/i, /see all/i, /alle fotos/i]) {
  const link = page.getByRole("link", { name }).first();
  if (await link.isVisible({ timeout: 1_500 }).catch(() => false)) {
    await link.click();
    await page.waitForTimeout(1_500);
    break;
  }
}

async function getImageUrls() {
  return page.evaluate(() => {
    const urls = new Set();
    for (const el of document.querySelectorAll('[style*="background-image"]')) {
      const m = /url\("?(https:\/\/[^)"']+)"?\)/.exec(el.getAttribute("style") ?? "");
      if (m) urls.add(m[1]);
    }
    for (const img of document.querySelectorAll("img")) {
      const src = img.getAttribute("src") || img.getAttribute("data-src");
      if (src && /googleusercontent|ggpht/.test(src)) urls.add(src);
    }
    return [...urls];
  });
}

async function scrollFeed(maxRounds = 40) {
  let previous = 0;
  for (let i = 0; i < maxRounds; i++) {
    const urls = await getImageUrls();
    console.log(`  · round ${i + 1}: ${urls.length} unique urls`);
    if (urls.length > 0 && urls.length === previous && i > 4) break;
    previous = urls.length;
    await page.evaluate(() => {
      const scrollers = document.querySelectorAll('[role="main"], div[aria-label*="Fotos"], div.m6QErb');
      for (const s of scrollers) s.scrollBy(0, 2000);
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(900);
  }
}

await scrollFeed();

const thumbUrls = await getImageUrls();
console.log(`Found ${thumbUrls.length} thumbnail urls`);

function upscale(url) {
  return url
    .replace(/=w\d+-h\d+(-[pk]-no)?$/, "=s2048-k-no")
    .replace(/=s\d+(-[pk]-no)?$/, "=s2048-k-no")
    .replace(/=s\d+-c(-[pk])?$/, "=s2048");
}

const highRes = [...new Set(thumbUrls.filter((u) => /googleusercontent|ggpht/.test(u)).map(upscale))];
console.log(`Upscaled to ${highRes.length} unique hi-res urls`);

const seen = new Set();
let saved = 0;
for (const [, url] of highRes.entries()) {
  try {
    const res = await ctx.request.get(url);
    if (!res.ok()) { console.warn(`  ✗ ${res.status()} ${url}`); continue; }
    const buf = Buffer.from(await res.body());
    if (buf.length < 5_000) continue;
    const hash = createHash("md5").update(buf).digest("hex");
    if (seen.has(hash)) continue;
    seen.add(hash);
    const ext = /image\/png/.test(res.headers()["content-type"] ?? "") ? "png" : "jpg";
    const name = `photo-${String(saved + 1).padStart(3, "0")}-${hash.slice(0, 8)}.${ext}`;
    await writeFile(path.join(OUT_DIR, name), buf);
    console.log(`  ✓ ${name} · ${(buf.length / 1024).toFixed(0)} KB`);
    saved++;
  } catch (e) {
    console.warn(`  ✗ ${url} → ${e.message}`);
  }
}

const final = await readdir(OUT_DIR);
console.log(`\nDone — ${saved} new · ${final.length} total files in ${OUT_DIR}`);

await browser.close();
