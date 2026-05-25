import Link from "next/link";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Your enquiry has been received. We will respond shortly.",
  path: "/thank-you",
  noIndex: true,
});

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const isInstruction = type === "instruct";

  return (
    <ContentSection className="!py-20">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2
          className="mx-auto h-14 w-14 text-brand-green"
          aria-hidden
        />
        <h1 className="mt-6 text-3xl font-bold text-charcoal md:text-4xl">Thank you</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          {isInstruction
            ? "Your instruction enquiry has been received. We will review your case details and respond within one business day with next steps."
            : "Your message has been received. We aim to respond within one business day."}
        </p>
        <p className="mt-4 text-sm text-foreground/80">
          A confirmation is not sent by email automatically. If your matter is urgent, email{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-brand-green hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green/90"
          >
            Return home
          </Link>
          <Link
            href="/how-to-instruct"
            className="inline-flex min-h-[44px] items-center rounded border border-border px-6 py-3 text-sm font-semibold text-charcoal hover:bg-muted"
          >
            How to instruct
          </Link>
        </div>
      </div>
    </ContentSection>
  );
}
