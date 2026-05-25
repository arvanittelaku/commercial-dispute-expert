import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const siteUrl = siteConfig.domain.replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
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
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: path === "/" ? "website" : "article",
      locale: "en_GB",
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
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const defaultKeywords = [
  "commercial dispute expert witness",
  "forensic accounting expert witness UK",
  "loss of profits expert witness",
  "CPR Part 35 expert report",
];
