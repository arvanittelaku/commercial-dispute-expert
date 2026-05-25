import Link from "next/link";

const clusters = [
  { href: "/services", label: "Expert witness services" },
  { href: "/case-types", label: "Case types requiring an expert" },
  { href: "/insights", label: "Insights for solicitors" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/fees", label: "Fees guide (industry benchmarks)" },
  { href: "/experts", label: "Our experts" },
  { href: "/contact", label: "Instruct an expert witness" },
] as const;

export function ContentClusterNav() {
  return (
    <nav aria-label="Explore our UK expert witness resources" className="rounded-lg border border-border bg-white p-6">
      <h2 className="text-xl font-bold text-charcoal">Explore our UK expert witness resources</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {clusters.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="text-sm font-medium text-brand-green hover:underline">
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
