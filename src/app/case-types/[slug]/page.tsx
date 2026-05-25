import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { CASE_TYPES, getCaseTypeBySlug } from "@/lib/case-types";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_TYPES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const caseType = getCaseTypeBySlug(slug);
  if (!caseType) return {};
  return buildMetadata({
    title: caseType.title,
    description: caseType.metaDescription,
    path: `/case-types/${slug}`,
  });
}

const relatedServices: Record<string, string[]> = {
  "breach-of-contract": [
    "/services/breach-of-contract-damages",
    "/services/loss-of-profits-quantum",
  ],
  "shareholder-partnership": [
    "/services/shareholder-partnership-disputes",
    "/services/business-valuation",
  ],
  "professional-negligence": ["/services/professional-negligence"],
  "business-interruption": ["/services/business-interruption", "/services/loss-of-profits-quantum"],
  "fraud-asset-tracing": ["/services/litigation-support", "/services/commercial-dispute-expert-witness"],
  "international-arbitration": ["/services/arbitration-mediation", "/services/expert-reports-testimony"],
};

export default async function CaseTypePage({ params }: Props) {
  const { slug } = await params;
  const caseType = getCaseTypeBySlug(slug);
  if (!caseType) notFound();

  const services = relatedServices[slug] ?? ["/services/commercial-dispute-expert-witness"];

  return (
    <>
      <ContentSection className="!py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Case types", href: "/case-types" },
            { label: caseType.hubLabel },
          ]}
        />
        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">{caseType.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">{caseType.summary}</p>
        <p className="mt-4 max-w-3xl text-foreground">
          {siteConfig.brandShort} connects your firm with independent experts experienced in this
          type of matter. Submit case details for a confidential introduction — CPR Part 35 compliant
          reporting where required.
        </p>
        <h2 className="mt-10 text-xl font-bold text-charcoal">Related services</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {services.map((href) => {
            const service = siteConfig.navigation.services.find((s) => s.href === href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal hover:border-brand-green/40"
                >
                  {service?.title ?? href}
                </Link>
              </li>
            );
          })}
        </ul>
      </ContentSection>
      <CTABanner />
    </>
  );
}
