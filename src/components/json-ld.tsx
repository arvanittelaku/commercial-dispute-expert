import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import type { ServiceFaq } from "@/lib/services-content";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.businessName,
    description: siteConfig.connectorPitch,
    url: siteConfig.domain,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.line1,
      addressLocality: siteConfig.contact.address.line2,
      addressCountry: siteConfig.contact.address.country,
    },
    areaServed: siteConfig.expert.jurisdictions.map((j) => ({
      "@type": "AdministrativeArea",
      name: j,
    })),
    knowsAbout: [
      "Commercial dispute expert witness",
      "Forensic accounting",
      "Loss of profits quantum",
      "CPR Part 35 expert reports",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.businessName,
    url: siteConfig.domain,
    description: siteConfig.connectorPitch,
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageJsonLd({ faqs }: { faqs: ServiceFaq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  slug,
  author,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
    },
    mainEntityOfPage: absoluteUrl(`/insights/${slug}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
