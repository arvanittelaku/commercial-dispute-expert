import { Breadcrumb } from "@/components/breadcrumb";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { StatsTable } from "@/components/stats-table";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commercial Dispute Expert Witness Fees UK",
  description:
    "Indicative UK expert witness fees and costs for commercial dispute forensic accounting — industry benchmarks, not a firm price list.",
  path: "/fees",
  keywords: ["expert witness fees UK", "forensic accountant expert witness cost"],
});

export default function FeesPage() {
  return (
    <>
      <ContentSection className="!py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Fees guide" }]} />
        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">
          Commercial dispute expert witness fees (UK)
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-foreground">
          This guide sets out <strong>indicative industry ranges</strong> to help solicitors budget
          and plan instructions. It is not a quote from Commercial Dispute Expert — actual fees are
          agreed between you and the appointed expert based on scope, urgency and complexity.
        </p>
      </ContentSection>

      <ContentSection alt className="!pt-0">
        <StatsTable />
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl font-bold text-charcoal">What affects the fee?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground">
          <li>Volume and quality of financial disclosure</li>
          <li>Number of expert reports (primary, reply, supplemental)</li>
          <li>Expert meeting, joint statement and court attendance</li>
          <li>Party-appointed vs Single Joint Expert process</li>
          <li>International arbitration and multi-currency matters</li>
        </ul>
        <p className="mt-6 text-foreground">
          For scope and instruction process, see{" "}
          <a href="/how-to-instruct" className="font-medium text-brand-green underline">
            how to instruct
          </a>
          .
        </p>
      </ContentSection>

      <CTABanner />
    </>
  );
}
