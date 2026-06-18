import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { siteConfig } from "@/config/site";
import { CASE_TYPES } from "@/lib/case-types";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.navigation.services.slice(0, 6).map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-medium text-white hover:underline">
                  View all services →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Case types</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {CASE_TYPES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/case-types/${c.slug}`} className="hover:text-white">
                    {c.hubLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/case-types" className="font-medium text-white hover:underline">
                  View all →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Resources</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/insights" className="hover:text-white">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/how-to-instruct" className="hover:text-white">
                  How to instruct
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Instruct an expert
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 px-2 pt-8 text-center text-xs leading-relaxed text-white/60 sm:px-0">
          <p>{siteConfig.description}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.{" "}
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            {" · "}
            <Link href="/cookie-policy" className="hover:text-white">
              Cookies
            </Link>
            {" · "}
            <CookieSettingsButton className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
          </p>
        </div>
      </div>
    </footer>
  );
}
