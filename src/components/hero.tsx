import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({
  title,
  description,
  ctaLabel = "Instruct an Expert Witness",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="bg-charcoal text-white">
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h1 className="text-2xl font-bold tracking-tight text-balance break-words sm:text-3xl md:text-4xl lg:text-[2.35rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green/90 sm:mt-8 sm:w-auto"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
