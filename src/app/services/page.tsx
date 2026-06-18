import { Breadcrumb } from "@/components/breadcrumb";
import { ServiceCard } from "@/components/service-card";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Commercial Dispute Expert Services",
  description:
    "Expert witness and forensic accounting services for commercial disputes: quantum, valuations, litigation support and CPR Part 35 reports.",
  path: "/services",
});

export default function ServicesHubPage() {
  return (
    <>
      <ContentSection className="!py-10">
        <Breadcrumb
          currentPath="/services"
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />
        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">Our services</h1>
        <p className="mt-6 max-w-3xl text-lg text-foreground">
          {siteConfig.brandShort} matches legal professionals with credentialed forensic accountants and
          commercial dispute expert witnesses. Each area below has a dedicated page for scope and
          instruction.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {siteConfig.navigation.services.map((s) => (
            <ServiceCard key={s.href} title={s.title} description={s.description} href={s.href} />
          ))}
        </div>
      </ContentSection>
      <CTABanner />
    </>
  );
}
