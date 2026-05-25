/**
 * Verifies static app routes have page modules with metadata (buildMetadata or metadata export).
 * Run: npm run seo:verify:ssr
 */
import fs from "fs";
import path from "path";
import { APP_STATIC_PATHS } from "../src/lib/seo/publicUrlInventory";

function routeToPageFile(pathname: string): string {
  if (pathname === "/") {
    return path.join(process.cwd(), "src/app/page.tsx");
  }
  const segments = pathname.replace(/^\//, "").split("/");
  return path.join(process.cwd(), "src/app", ...segments, "page.tsx");
}

function hasMetadataExport(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  const source = fs.readFileSync(filePath, "utf8");
  return (
    source.includes("export const metadata") ||
    source.includes("buildMetadata(") ||
    source.includes("generateMetadata(")
  );
}

function main(): void {
  const failures: string[] = [];

  const layoutFile = path.join(process.cwd(), "src/app/layout.tsx");

  for (const route of APP_STATIC_PATHS) {
    const pageFile = routeToPageFile(route);
    if (!fs.existsSync(pageFile)) {
      failures.push(`${route} — missing ${path.relative(process.cwd(), pageFile)}`);
      continue;
    }
    const metadataInPage = hasMetadataExport(pageFile);
    const metadataInLayout = route === "/" && hasMetadataExport(layoutFile);
    if (!metadataInPage && !metadataInLayout) {
      failures.push(`${route} — no metadata export in ${path.relative(process.cwd(), pageFile)}`);
    }
  }

  if (failures.length === 0) {
    console.log(`OK: ${APP_STATIC_PATHS.length} static routes have page files with metadata.`);
    process.exit(0);
  }

  console.error("SSR/metadata verification failed:");
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

main();
