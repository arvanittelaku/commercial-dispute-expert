import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { ANONYMISED_EXPERTS } from "@/lib/anonymised-experts";

export const metadata = buildMetadata({
  title: "Our Commercial Dispute Expert Witnesses",
  description:
    "UK forensic accounting and commercial dispute experts. Profiles available upon instruction — submit case details for a matched introduction.",
  path: "/experts",
});

export default function ExpertsPage() {
  return (
    <>
      <ContentSection className="!py-10">
        <Breadcrumb
          currentPath="/experts"
          items={[{ label: "Home", href: "/" }, { label: "Experts" }]}
        />
        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">
          Our commercial dispute expert witnesses
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-foreground">
          UK chartered accountants and forensic specialists. Profiles available upon instruction —
          submit your case details for a matched introduction.
        </p>
      </ContentSection>

      <ContentSection alt className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ANONYMISED_EXPERTS.map((expert) => (
            <article
              key={expert.id}
              className="rounded-lg border border-border bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-charcoal">{expert.title}</h2>
              <p className="mt-1 text-sm font-medium text-foreground/80">{expert.credentials}</p>
              <p className="text-sm text-foreground/70">{expert.location}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {expert.specialisms.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-charcoal"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{expert.summary}</p>
              <p className="mt-4 text-sm font-medium text-brand-green">
                Profiles available upon instruction
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green/90"
          >
            Instruct an Expert Witness
          </Link>
        </p>
      </ContentSection>

      <CTABanner />
    </>
  );
}
