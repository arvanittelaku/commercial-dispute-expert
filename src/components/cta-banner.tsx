import Link from "next/link";

export function CTABanner({
  title = "Ready to instruct a commercial dispute expert witness?",
  description = "Submit your case details and we will match you with a qualified UK expert — CPR Part 35 compliant. Response within one business day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-border bg-muted py-12 sm:py-16">
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
          {description}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green/90 sm:mt-8 sm:w-auto"
        >
          Instruct an Expert Witness
        </Link>
      </div>
    </section>
  );
}
