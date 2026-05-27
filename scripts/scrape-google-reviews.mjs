#!/usr/bin/env node
// Scrape real reviews from Google Maps for XOXO Stadtrestaurant
// Run: node scripts/scrape-google-reviews.mjs [temp-profile-path]

import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const OUTPUT_FILE = path.resolve("tmp/google-reviews.json");
const TEMP_PROFILE = process.argv[2] || "/tmp/chrome-xoxo-temp";

async function scrapeReviews() {
  console.log("🍽️  Scraping Google Reviews for XOXO Stadtrestaurant...");

  const context = await chromium.launchPersistentContext(TEMP_PROFILE, {
    headless: false,
    channel: "chrome",
    locale: "de-DE",
    args: ["--no-first-run", "--no-default-browser-check", "--disable-sync"],
  });

  const page = await context.newPage();

  try {
    // Navigate with German locale forced
    console.log("📍 Opening Google Maps (de)...");
    await page.goto(
      "https://www.google.com/maps/search/XOXO+Frankenthal+Speyerer+Stra%C3%9Fe+29?hl=de",
      { waitUntil: "domcontentloaded", timeout: 30000 }
    );
    await page.waitForTimeout(4000);

    // Accept consent if shown
    for (const label of ["Alle akzeptieren", "Accept all", "Zustimmen"]) {
      const btn = page.getByRole("button", { name: label }).first();
      if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(2000);
        console.log(`✅ Consent: "${label}"`);
        break;
      }
    }

    await page.waitForTimeout(2000);

    // Click first result
    const firstResult = page.locator(".hfpxzc, [aria-label*='XOXO'], .fontHeadlineSmall").first();
    if (await firstResult.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstResult.click();
      await page.waitForTimeout(3000);
      console.log("✅ Opened business panel");
    }

    // Read overall rating
    let overallRating = 4.8;
    let totalRatings = 0;

    const ratingText = await page.evaluate(() => {
      // Try to grab both the numeric rating and total count from the details panel
      const ratingEl =
        document.querySelector('div.F7nice span span[aria-hidden]') ||
        document.querySelector('span.ceNzKf') ||
        document.querySelector('[class*="fontDisplayLarge"]');
      const countEl =
        document.querySelector('button[aria-label*="Rez"]') ||
        document.querySelector('span[aria-label*="Rez"]') ||
        document.querySelector('[jslog*="rating"]');
      return {
        rating: ratingEl?.textContent?.trim() || "",
        count: countEl?.getAttribute("aria-label") || countEl?.textContent?.trim() || "",
      };
    });

    const rVal = parseFloat(ratingText.rating.replace(",", "."));
    if (rVal >= 1 && rVal <= 5) overallRating = rVal;
    const countMatch = ratingText.count.match(/(\d[\d\.]+)/);
    if (countMatch) totalRatings = parseInt(countMatch[1].replace(".", ""));

    console.log(`⭐ ${overallRating} Sterne, ${totalRatings} Bewertungen`);

    // Click the reviews tab
    console.log("📋 Opening reviews tab...");
    const reviewsTabClicked = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll('button[role="tab"]')];
      const reviewTab = tabs.find(t => t.textContent?.includes("Rezension") || t.textContent?.includes("Review") || t.getAttribute("aria-label")?.includes("Rez"));
      if (reviewTab) { reviewTab.click(); return true; }
      return false;
    });
    if (!reviewsTabClicked) {
      // Try clicking the star rating summary area to jump to reviews
      await page.locator('button[aria-label*="Rez"], div.F7nice').first().click().catch(() => {});
    }
    await page.waitForTimeout(3000);
    console.log("✅ Reviews section opened");

    // Sort by "Neueste"
    const sortBtn = page.locator('button[aria-label*="Sortier"], button:has-text("Sortieroption"), button:has-text("Relevant")').first();
    if (await sortBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await sortBtn.click();
      await page.waitForTimeout(800);
      const neuste = page.locator('[role="menuitem"]:has-text("Neueste"), [role="option"]:has-text("Neueste")').first();
      if (await neuste.isVisible({ timeout: 1500 }).catch(() => false)) {
        await neuste.click();
        await page.waitForTimeout(1500);
        console.log("✅ Sorted by newest");
      }
    }

    // Scroll reviews pane deeply to load many reviews
    console.log("📜 Scrolling reviews pane...");
    for (let i = 0; i < 12; i++) {
      await page.evaluate(() => {
        const pane =
          document.querySelector('[aria-label*="Ergebnisse"]') ||
          document.querySelector(".m6QErb.DxyBCb") ||
          document.querySelector(".m6QErb[role='feed']") ||
          document.querySelector(".m6QErb");
        if (pane) pane.scrollTop += 800;
      });
      await page.waitForTimeout(600);
    }

    // Expand all "Mehr" / "Mehr lesen" buttons
    const moreBtns = await page.locator("button.w8nwRe, button[aria-expanded='false'][aria-label*='Rez'], button:has-text('Mehr')").all();
    for (const btn of moreBtns.slice(0, 15)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(100);
    }

    // Extract review data
    console.log("🎯 Extracting review data...");
    const reviews = await page.evaluate(() => {
      const results = [];
      const containers = [
        ...document.querySelectorAll('[data-review-id]'),
        ...document.querySelectorAll('.jftiEf'),
      ];
      const seen = new WeakSet();
      for (const el of containers) {
        if (seen.has(el)) continue;
        seen.add(el);
        try {
          const author =
            el.querySelector('.d4r55')?.textContent?.trim() ||
            el.querySelector('.X43Kjb')?.textContent?.trim() ||
            "";
          if (!author) continue;

          const ratingEl =
            el.querySelector('span[role="img"][aria-label]') ||
            el.querySelector('.kvMYJc') ||
            el.querySelector('[aria-label*="Stern"]');
          const ratingLabel = ratingEl?.getAttribute("aria-label") || "5";
          const ratingNum = parseInt(ratingLabel.match(/(\d)/)?.[1] || "5");

          const textEl =
            el.querySelector('.wiI7pd') ||
            el.querySelector('span[data-expandable-section]') ||
            el.querySelector('.MyEned span:not(:empty)') ||
            el.querySelector('span[jscontroller]');
          const text = textEl?.textContent?.trim() || "";

          const timeEl = el.querySelector('.rsqaWe') || el.querySelector('.dehysf');
          const time = timeEl?.textContent?.trim() || "Vor kurzem";

          if (text.length > 15) {
            results.push({ author, rating: ratingNum, text, time });
          }
        } catch {}
      }
      return results;
    });

    const unique = [...new Map(reviews.map(r => [r.author + r.text.slice(0, 20), r])).values()];
    const topReviews = unique.filter(r => r.rating >= 4).slice(0, 10);

    console.log(`✅ ${unique.length} unique reviews, ${topReviews.length} shown (≥4★)`);

    if (unique.length === 0) {
      await page.screenshot({ path: "tmp/maps-debug.png" });
      console.log("⚠️  Debug screenshot → tmp/maps-debug.png");
    }

    const result = {
      scraped_at: new Date().toISOString(),
      restaurant: "XOXO Frankenthal",
      overallRating,
      totalRatings,
      reviews: topReviews,
    };

    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`\n✨ Saved → ${OUTPUT_FILE}`);
    if (topReviews.length) {
      console.log(`\n📊 ${overallRating}★ | ${totalRatings} Bewertungen\n`);
      topReviews.slice(0, 6).forEach((r, i) => {
        console.log(`${i + 1}. ${r.author} ${"⭐".repeat(r.rating)} · ${r.time}`);
        console.log(`   "${r.text.slice(0, 100)}"\n`);
      });
    }

  } finally {
    await page.waitForTimeout(500);
    await context.close();
  }
}

scrapeReviews().catch(e => {
  console.error("❌", e.message);
  process.exit(1);
});
