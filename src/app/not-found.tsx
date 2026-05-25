import Link from "next/link";
import { ContentSection } from "@/components/content-section";

export default function NotFound() {
  return (
    <ContentSection className="!py-20">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-green">404</p>
        <h1 className="mt-4 text-3xl font-bold text-charcoal md:text-4xl">Page not found</h1>
        <p className="mt-4 text-lg text-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green/90"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded border border-border px-6 py-3 text-sm font-semibold text-charcoal hover:bg-muted"
          >
            Contact us
          </Link>
        </div>
        <p className="mt-8 text-sm text-foreground/80">
          <Link href="/services" className="font-medium text-brand-green hover:underline">
            Browse services
          </Link>
          {" · "}
          <Link href="/case-types" className="font-medium text-brand-green hover:underline">
            Case types
          </Link>
        </p>
      </div>
    </ContentSection>
  );
}
