#!/usr/bin/env node
// Classify every photo in tmp/doener-photos/raw using Claude Vision (Haiku).
// Run from doenerpalast/ root: node scripts/classify-photos.mjs
// Env: ANTHROPIC_API_KEY required

import Anthropic from "@anthropic-ai/sdk";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAW_DIR   = path.resolve("tmp/doener-photos/raw");
const THUMB_DIR = path.resolve("tmp/doener-photos/thumbs");
const OUT       = path.resolve("tmp/doener-photos/classifications.json");

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is required.");
  process.exit(1);
}

await mkdir(THUMB_DIR, { recursive: true });

// Generate 400px-wide thumbs for API efficiency
const rawFiles = (await readdir(RAW_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
for (const f of rawFiles) {
  const dst = path.join(THUMB_DIR, f.replace(/\.(png)$/i, ".jpg"));
  if (existsSync(dst)) continue;
  await sharp(path.join(RAW_DIR, f)).resize(400).jpeg({ quality: 75 }).toFile(dst);
}

const client = new Anthropic();

const CATEGORIES = [
  "doenerspies",     // döner meat on the rotating spit, sliced döner
  "pide",            // Turkish flatbread boat (pide), filled pide
  "lahmacun",        // thin Turkish pizza / lahmacun
  "pizza",           // Italian-style pizza (Turkish variant)
  "iskender",        // Iskender kebap with tomato sauce and butter
  "koefteplatte",    // köfte (meat balls) platter or mixed grill
  "salat",           // salad, vegetable side dishes
  "suppe",           // soup (lentil, etc.)
  "pommes_box",      // döner box, chips box, takeaway packaging
  "interior_dining", // dining room, seating area, tables
  "interior_counter",// service counter, checkout area
  "exterior",        // storefront, entrance, outdoor terrace, Audi Forum view
  "menu_printed",    // printed menu, price board, paper menu
  "people",          // staff or customers (skip for web)
  "logo_sign",       // logo, illuminated sign, neon sign
  "collage",         // multiple dishes in one photo
  "other",
];

const SYSTEM = `You classify photos from a Turkish döner restaurant ("Dönerpalast") in Neckarsulm, Germany, for use on their website.

Reply with ONE JSON object per image, no prose. For each image return:
{
  "file": "<the filename>",
  "category": "<one of: ${CATEGORIES.join(", ")}>",
  "subcategory": "<optional short label, e.g. 'Kalbsscheiben Döner', 'Lahmacun Spezial'>",
  "quality": "high" | "medium" | "low",
  "hero_candidate": true | false,
  "description": "<one short German sentence, max 12 words>"
}

Quality rules:
- "high": sharp, well-composed, good lighting, appetising. Usable as a hero image.
- "medium": acceptable but cropped oddly, slightly blurry, busy background, or phone snapshot quality.
- "low": blurry, dark, heavy compression, watermark, screenshot, or photo of a receipt.

hero_candidate = true only for "high" quality food shots or atmospheric interior/exterior shots that would work as a 1920×1080 banner.

Category rules:
- Classify by the dominant subject.
- Döner meat rotating on the spit OR sliced onto bread = "doenerspies".
- Pide (boat-shaped flatbread) = "pide".
- Lahmacun (thin round flatbread with meat) = "lahmacun".
- Döner in a box with fries = "pommes_box".
- Iskender (döner on bread with tomato sauce and butter) = "iskender".
- A printed/handwritten price list = "menu_printed".
- Storefront, terrace with Audi Forum view = "exterior".
- Multiple dishes in one image = "collage".`;

function userPrompt(files) {
  return `Classify these ${files.length} photos. Reply with a JSON array of ${files.length} objects, in the same order as the images. Filenames: ${files.join(", ")}`;
}

async function loadImage(file) {
  const buf = await readFile(path.join(THUMB_DIR, file));
  return {
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: buf.toString("base64") },
  };
}

async function classifyBatch(files) {
  const content = [];
  for (const f of files) {
    content.push({ type: "text", text: f });
    content.push(await loadImage(f));
  }
  content.push({ type: "text", text: userPrompt(files) });

  const res = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{ role: "user", content }],
  });

  const raw = res.content.find((c) => c.type === "text")?.text ?? "[]";
  const m = raw.match(/\[[\s\S]*\]/);
  if (!m) { console.warn("  ⚠ no JSON array:", raw.slice(0, 120)); return []; }
  try { return JSON.parse(m[0]); } catch (e) { console.warn("  ⚠ JSON parse failed:", e.message); return []; }
}

const thumbFiles = (await readdir(THUMB_DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();
console.log(`Classifying ${thumbFiles.length} thumbnails …`);

let existing = {};
try {
  existing = JSON.parse(await readFile(OUT, "utf8")).reduce((a, x) => ({ ...a, [x.file]: x }), {});
} catch {}

const BATCH = Number(process.env.BATCH_SIZE ?? 8);
for (let i = 0; i < thumbFiles.length; i += BATCH) {
  const batch = thumbFiles.slice(i, i + BATCH).filter((f) => !existing[f]);
  if (batch.length === 0) continue;
  process.stdout.write(`[${i + 1}-${Math.min(i + BATCH, thumbFiles.length)}/${thumbFiles.length}] `);
  try {
    const rows = await classifyBatch(batch);
    for (const r of rows) { if (r?.file) existing[r.file] = r; }
    console.log(`+${rows.length}`);
  } catch (e) {
    console.warn("batch failed:", e.message);
  }
  await writeFile(OUT, JSON.stringify(Object.values(existing), null, 2));
}

const results = Object.values(existing);
await writeFile(OUT, JSON.stringify(results, null, 2));

const byCat = results.reduce((a, r) => ((a[r.category] = (a[r.category] ?? 0) + 1), a), {});
console.log("\nDone →", OUT);
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(26)} ${v}`);
}
