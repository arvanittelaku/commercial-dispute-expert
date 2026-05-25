/**
 * Fails if public/sitemap.xml <loc> entries drift from buildPublicUrlInventory().
 * Run: npm run seo:verify
 */
import fs from "fs";
import path from "path";
import { buildPublicUrlInventory } from "../src/lib/seo/publicUrlInventory";

function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

function main(): void {
  const sitemapPath = path.join(process.cwd(), "public/sitemap.xml");

  if (!fs.existsSync(sitemapPath)) {
    console.error("Missing public/sitemap.xml — run: npm run seo:generate");
    process.exit(1);
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const committed = new Set(parseSitemapLocs(xml));
  const inventory = buildPublicUrlInventory();
  const expected = new Set(inventory.allUrls);

  const missing = inventory.allUrls.filter((url) => !committed.has(url));
  const extra = [...committed].filter((url) => !expected.has(url));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`OK: sitemap.xml matches inventory (${expected.size} URLs).`);
    process.exit(0);
  }

  if (missing.length > 0) {
    console.error("Sitemap missing URLs (run npm run seo:generate):");
    missing.forEach((u) => console.error(`  - ${u}`));
  }

  if (extra.length > 0) {
    console.error("Sitemap has extra URLs not in inventory:");
    extra.forEach((u) => console.error(`  - ${u}`));
  }

  process.exit(1);
}

main();
