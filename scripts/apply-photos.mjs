#!/usr/bin/env node
// Read tmp/doener-photos/classifications.json and copy the best-matching
// hi-res photos into public/assets/ as WebP files.
//
// Run from doenerpalast/ root: node scripts/apply-photos.mjs

import { readFile, copyFile, readdir, stat, mkdir } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";

const RAW_DIR   = path.resolve("tmp/doener-photos/raw");
const ASSET_DIR = path.resolve("public/assets");
const CLASS     = path.resolve("tmp/doener-photos/classifications.json");

await mkdir(ASSET_DIR, { recursive: true });

// Slot → filter (in order of priority — first slot wins the best match).
// Each slot ends up as a WebP file in public/assets/
// Order matters: high-value placements are listed first so they grab the best photos.
const SLOTS = [
  // ── Über Uns story — most iconic shot (owner at spit with Audi Forum) ───────
  { file: "about-story.webp",   match: ["doenerspies"],                                        hero: true  },

  // ── Homepage gallery heroes ─────────────────────────────────────────────────
  { file: "about-gallery-1.webp", match: ["interior_dining"],                                  hero: true  },
  { file: "gallery-1.webp",     match: ["exterior"],                                           hero: true  },

  // ── DishesCarousel food shots ───────────────────────────────────────────────
  { file: "featured-1.webp",    match: ["pide", "lahmacun", "doenerspies"],                    hero: false },
  { file: "featured-2.webp",    match: ["iskender"],                                           hero: false },
  { file: "featured-3.webp",    match: ["pide", "lahmacun"],                                   hero: false },
  { file: "featured-4.webp",    match: ["lahmacun"],                                           hero: false },
  { file: "featured-5.webp",    match: ["collage", "pizza", "koefteplatte"],                   hero: false },

  // ── Homepage gallery remaining ──────────────────────────────────────────────
  { file: "gallery-2.webp",     match: ["pide", "lahmacun", "doenerspies"],                    hero: false },
  { file: "gallery-3.webp",     match: ["exterior", "interior_dining", "interior_counter"],    hero: false },
  { file: "gallery-4.webp",     match: ["collage", "koefteplatte", "pide", "lahmacun"],        hero: false },

  // ── Über Uns Einblicke remaining ────────────────────────────────────────────
  { file: "about-gallery-2.webp", match: ["doenerspies", "collage", "pide"],                   hero: false },
  { file: "about-gallery-3.webp", match: ["exterior", "interior_dining", "interior_counter", "pide"], hero: false },

  // ── Über Uns culture / Speisekarte hero ─────────────────────────────────────
  { file: "about-culture.webp",  match: ["pide", "lahmacun", "doenerspies", "collage"],        hero: false },
  { file: "menu-hero.webp",      match: ["pide", "doenerspies", "iskender"],                   hero: true  },
];

function score(c) {
  const q = { high: 3, medium: 2, low: 1 }[c.quality] ?? 0;
  return q + (c.hero_candidate ? 1 : 0);
}

const entries = JSON.parse(await readFile(CLASS, "utf8"));
const rawFiles = await readdir(RAW_DIR);
const rawByBase = new Map(rawFiles.map((f) => [path.parse(f).name, f]));

const used = new Set();

const QUALITY_RANK = { high: 3, medium: 2, low: 1 };

function pick(slot, minQuality = "medium") {
  const minRank = QUALITY_RANK[minQuality] ?? 1;
  const cands = entries
    .filter((c) => !used.has(c.file) && slot.match.includes(c.category))
    .filter((c) => (QUALITY_RANK[c.quality] ?? 0) >= minRank)
    .filter((c) => !slot.hero || c.hero_candidate)
    .sort((a, b) => score(b) - score(a));
  return cands[0] ?? null;
}

let filled = 0;
for (const slot of SLOTS) {
  let hit = pick(slot);
  if (!hit && slot.hero) hit = pick({ ...slot, hero: false }); // relax hero req
  if (!hit) {
    console.log(`✗ ${slot.file.padEnd(32)} ← no match (${slot.match.join("/")})`);
    continue;
  }

  used.add(hit.file);
  const thumbBase = path.parse(hit.file).name;
  const rawName   = rawByBase.get(thumbBase);
  if (!rawName) { console.log(`✗ ${slot.file} → raw missing for ${hit.file}`); continue; }

  const src = path.join(RAW_DIR, rawName);
  const dst = path.join(ASSET_DIR, slot.file); // already ends in .webp

  // Convert to WebP via cwebp (quality 82)
  execSync(`cwebp -q 82 -quiet "${src}" -o "${dst}"`);

  const size = (await stat(src)).size;
  console.log(
    `✓ ${slot.file.padEnd(32)} ← ${hit.file}  [${hit.category}/${hit.quality}, ${(size / 1024).toFixed(0)} KB]`,
  );
  filled++;
}

console.log(`\n${filled}/${SLOTS.length} slots filled.`);
console.log(`Unused photos: ${entries.length - used.size}`);
