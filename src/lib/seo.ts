import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const siteUrl = siteConfig.domain.replace(/\/$/, "");

/** Canonical URL — homepage has no trailing slash (matches sitemap) */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return siteUrl;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized.replace(/\/+$/, "")}`;
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    path === "/"
      ? `${title} | ${siteConfig.businessName}`
      : `${title} | ${siteConfig.businessName}`;

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: path.startsWith("/insights/") ? "article" : "website",
      locale: "en",
      url,
      siteName: siteConfig.businessName,
      title: fullTitle,
      description,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: siteConfig.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export function buildNotFoundMetadata(): Metadata {
  return buildMetadata({
    title: "Page not found",
    description: "The page you requested could not be found on Commercial Dispute Expert.",
    path: "/404",
    noIndex: true,
  });
}

export const defaultKeywords = [
  "commercial dispute expert witness",
  "forensic accounting expert witness",
  "loss of profits expert witness",
  "CPR Part 35 expert report",
];
