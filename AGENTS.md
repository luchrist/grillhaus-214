<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Data layer (factory bridge)

All restaurant data flows through a single bridge: `src/config/locations/default.ts`
assembles the `LocationConfig` that every component reads via `defaultLocation`
(`@/config/locations`). It is built from the factory-generated modules:

- `lib/restaurant.ts` — profile, address, hours, SEO (written by the factory)
- `lib/reviews-data.ts` — Google reviews (written by the factory)
- `lib/menu-data.ts` — menu categories and items (written by the factory)
- `lib/gallery-data.ts` — 5 curated gallery photos (set by the content pipeline)
- `lib/dish-carousel-data.ts` — featured dish carousel (set by the content pipeline)

Components must keep importing `defaultLocation`; do not hardcode restaurant data
inside components. Editorial copy without an acquisition source (the philosophy
block) lives in `src/config/locations/default.ts` and may be rewritten.
