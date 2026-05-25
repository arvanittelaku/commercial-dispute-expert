"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { CASE_TYPES } from "@/lib/case-types";
import { NavDropdown } from "@/components/nav-dropdown";

function pathActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(`${href}/`)) return true;
  return false;
}

function resourcesActive(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname.startsWith("/insights") ||
    pathname === "/how-to-instruct" ||
    pathname === "/about"
  );
}

const serviceNavItems = siteConfig.navigation.services.map((s) => ({
  href: s.href,
  label: s.title,
}));

const caseTypeNavItems = CASE_TYPES.map((c) => ({
  href: `/case-types/${c.slug}`,
  label: c.hubLabel,
}));

const mobileGroups = [
  {
    heading: "Services",
    links: [{ href: "/services", label: "All services" }, ...serviceNavItems],
  },
  {
    heading: "Case types",
    links: [{ href: "/case-types", label: "All case types" }, ...caseTypeNavItems],
  },
  {
    heading: "Resources",
    links: [...siteConfig.navigation.resources],
  },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-green focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="min-w-0 shrink truncate text-sm font-bold text-charcoal sm:text-base lg:text-lg"
        >
          {siteConfig.brandShort}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
        >
          <Link
            href="/"
            className={`flex min-h-[44px] items-center whitespace-nowrap rounded px-2 py-2 text-xs font-medium xl:px-2.5 xl:text-sm ${
              pathname === "/"
                ? "bg-muted text-charcoal"
                : "text-foreground hover:bg-muted hover:text-charcoal"
            }`}
          >
            Home
          </Link>
          <NavDropdown
            label="Services"
            href="/services"
            items={serviceNavItems}
            active={pathActive(pathname, "/services")}
          />
          <NavDropdown
            label="Case Types"
            href="/case-types"
            items={caseTypeNavItems}
            active={pathActive(pathname, "/case-types")}
          />
          <NavDropdown
            label="Resources"
            href="/insights"
            items={siteConfig.navigation.resources}
            active={resourcesActive(pathname)}
          />
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded bg-brand-green px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-green/90 lg:hidden"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-[44px] items-center rounded bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green/90 lg:inline-flex"
          >
            Contact us
          </Link>
          <details className="relative lg:hidden" suppressHydrationWarning>
            <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded border border-border bg-white px-3 text-sm font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-50 mt-2 max-h-[min(80dvh,520px)] w-[min(calc(100vw-1.5rem),20rem)] overflow-y-auto overscroll-contain rounded-lg border border-border bg-white py-2 shadow-lg sm:w-72">
              <Link
                href="/"
                className={`flex min-h-[44px] items-center px-4 py-3 text-sm hover:bg-muted ${
                  pathname === "/" ? "font-semibold text-charcoal" : "text-foreground"
                }`}
              >
                Home
              </Link>
              {mobileGroups.map((group) => (
                <div key={group.heading} className="border-t border-border">
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                    {group.heading}
                  </p>
                  {group.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className={`flex min-h-[44px] items-center px-4 py-3 text-sm hover:bg-muted ${
                        pathActive(pathname, link.href)
                          ? "font-semibold text-charcoal"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border px-4 py-3">
                <Link
                  href="/contact"
                  className="flex min-h-[44px] w-full items-center justify-center rounded bg-brand-green text-sm font-semibold text-white hover:bg-brand-green/90"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
