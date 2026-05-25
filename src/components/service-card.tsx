import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex min-h-[44px] flex-col rounded-lg border border-border bg-white p-5 shadow-sm transition hover:border-brand-green/30"
    >
      <h3 className="font-semibold break-words text-charcoal">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{description}</p>
    </Link>
  );
}
