/**
 * Ensures sitemap homepage URL matches absoluteUrl("/") (no trailing-slash drift).
 * Run: npm run seo:verify:canonical
 */
import fs from "fs";
import path from "path";
import { absoluteUrl } from "../src/lib/seo";

function parseHomeLoc(xml: string): string | null {
  const match = xml.match(/<loc>([^<]+)<\/loc>/);
  return match ? match[1].trim() : null;
}

function main(): void {
  const sitemapPath = path.join(process.cwd(), "public/sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.error("Missing public/sitemap.xml");
    process.exit(1);
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const homeLoc = parseHomeLoc(xml);
  const canonical = absoluteUrl("/");

  if (homeLoc === canonical) {
    console.log(`OK: Homepage sitemap and canonical both use ${canonical}`);
    process.exit(0);
  }

  console.error(`Homepage URL mismatch:\n  sitemap:   ${homeLoc}\n  canonical: ${canonical}`);
  process.exit(1);
}

main();
