import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-foreground/70">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-green hover:underline">
                {item.label}
              </Link>
            ) : (
              <span
                className="max-w-[min(100%,14rem)] truncate font-medium text-charcoal sm:max-w-xs md:max-w-md"
                aria-current="page"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
