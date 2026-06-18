# SEO architecture (Commercial Dispute Expert)

## URL inventory

- **Source of truth:** `src/lib/seo/publicUrlInventory.ts`
- **Regenerate:** `npm run seo:generate` → `public/sitemap.xml`, `public/robots.txt`
- **Verify:** `npm run seo:verify:all`

## Metadata

- `src/lib/seo.ts` — `buildMetadata()` (title, description, canonical, OG, Twitter, robots)
- Homepage canonical: `https://commercialdisputeexpert.com` (no trailing slash; matches sitemap)

## Structured data (JSON-LD)

| Schema | Where |
|--------|--------|
| ProfessionalService | Global (`layout`) |
| WebSite | Global |
| BreadcrumbList | All pages with `Breadcrumb` + `currentPath` |
| Service | Each service page |
| FAQPage | Service pages |
| Article | Insight articles |
| Blog | `/insights` index |

Placeholders (`[PLACEHOLDER]`) are omitted from Organization address/phone/sameAs until replaced in `src/config/site.ts`.

## Insights

- Add `modified: "YYYY-MM-DD"` in MDX frontmatter when updating a post (drives sitemap `lastmod` and Article `dateModified`).
- Related posts: auto-linked by shared tags via `RelatedInsights`.

## Pre-launch checklist

1. Replace `[PLACEHOLDER]` in `site.ts` and MDX authors.
2. Set `NEXT_PUBLIC_SITE_URL` to production host on Netlify.
3. Run `npm run seo:generate` and commit `public/sitemap.xml` / `robots.txt`.
4. Submit sitemap in Google Search Console and Bing.
5. Publish 8–12 insight articles (see `POST_LAUNCH_SEO.md`).
