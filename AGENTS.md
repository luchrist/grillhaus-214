<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Restaurant Site Generator — Learnings & Standards

This template is reused for many restaurant clients. Apply these standards from the start so we never have to retrofit them later.

## Git Workflow

- **Always push immediately after every commit.** Never leave a commit sitting locally — `git push` is part of the commit step, not a separate ask.

## Media Assets — Format & Compression

All media must be web-optimized from the start. Never commit `.jpg`, `.jpeg`, `.png`, or `.mp4` files for site assets.

- **Images:** WebP only, compressed with `cwebp -q 80 input.jpg -o output.webp`
- **Videos:** WebM only (VP9), compressed with `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -c:a libopus output.webm`
- After conversion: update all code references and **delete the originals** — no legacy files left in `public/assets/`.
- All `<video>` elements need `poster` attributes pointing to a WebP frame.
- Use `<BackgroundVideo>` (components/BackgroundVideo.tsx) instead of raw `<video>` — it handles iOS Low Power Mode, autoplay retries, and the poster/fade-in pattern correctly.

## Hero Sections — What Goes Where

Each page's hero has a specific media expectation. Don't reuse food shots everywhere.

| Page            | Hero Media                                                                                |
| --------------- | ----------------------------------------------------------------------------------------- |
| **Startseite**  | Cinematic **video** of Turkey/Istanbul — `istanbul-bridge.webm` (Bosphorus aerial).      |
| **Speisekarte** | High-quality **image of a signature dish** as background.                                 |
| **Kontakt**     | **Video of food being prepared** — Turkish cuisine (kebab, pide from the oven).           |
| **Über Uns**    | Video or high-quality image — atmospheric, professional, **not just another food shot**. |

### Turkish cuisine cooking videos (for Kontakt / CTA sections)

- Women rolling out yufka / lahmacun dough
- Turning döner on the spit
- Pide sliding into a stone oven
- General rule: **show hands and craft**, not the finished plate.

## Available Turkey Videos (in `public/assets/`)

| File | Content | Best Use |
|------|---------|----------|
| `istanbul-bridge.webm` | Bosphorus Bridge aerial, Istanbul | Startseite hero |
| `antalya-coast.webm` | Antalya old harbour cliffs, Mediterranean | CTA / atmospheric sections |
| `istanbul-city.webm` | Turkish city/mosque at sunrise | Über Uns hero, culture sections |

## Image Content Guidelines

### Specialties / signature dishes
- Use **real photos from the actual restaurant**, not stock or generic.
- One dish per image, well-lit, on the restaurant's actual tableware.

### Gallery / "Atmosphäre" / "Einblicke" sections (Startseite + Über Uns)
Always real photos from the restaurant. Mix of:
- Full tables loaded with food
- Interior shots (dining room, lighting)
- Exterior / storefront / terrace
- Single-dish food shots (acceptable, but mix with the above — don't make it 100% food)

### Über Uns / Kontakt supporting imagery
- Must look **professionally shot**, high quality, intentional composition.
- Never pad with random food photos. Pick something that fits the section's narrative.

## Google Reviews — Always Use Real Ones

- Never ship with placeholder reviews. Always pull real Google reviews before launch.
- Use the existing scraper: `node scripts/scrape-google-reviews.mjs [temp-profile-path]`
  - Outputs to `tmp/google-reviews.json`
  - Adapt the search query in the script for the target restaurant
- Drop the results into `components/GoogleReviews.tsx` → `SAMPLE_REVIEWS` (used as fallback when API keys aren't set).
- Update `overallRating` and `totalRatings` to match the live Google profile.
- Keep only 5★ reviews in the carousel.
- If the client provides `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`, the API path takes over automatically — the scraped reviews remain as the offline fallback.

## Social Media — Always Add the Footer Links

- Every restaurant gets Instagram, Facebook, and TikTok footer links from day one — even if the client hasn't given us the handles yet.
- Add placeholder URLs to `lib/restaurant.ts` under `socialMedia` so the markup is in place; client can swap the handle later.
- Icons live in the Footer's "Folgen Sie uns" section.

### ⚠️ lucide-react v1+ has NO brand icons

Don't try to import `Instagram`, `Facebook`, or `TikTok` from `lucide-react` — they were all removed in v1. **Use inline SVG paths for all three** (already wired in `components/Footer.tsx`).

## Favicon / Browser Tab Logo

**Always do this immediately when setting up a new restaurant site — never ship with the default Next.js favicon.**

- Drop the logo into `app/` using Next.js's file-based icon convention:
  - `app/icon.png` (512×512) — main favicon, automatically picked up by Next.js
  - `app/apple-icon.png` (180×180) — for iOS home screen
- Delete the default `app/favicon.ico` once real icons are in place.
- If there is no logo image yet, generate one from the brand glyph (`restaurant.logoGlyph`) using `sharp`.

## Single Source of Truth

- All restaurant-specific data (name, hours, address, phone, social, URLs) belongs in `lib/restaurant.ts`. No hardcoded strings in components.
- When generating a new restaurant site, **`lib/restaurant.ts` is the only file you should need to fully edit** for content swaps.
