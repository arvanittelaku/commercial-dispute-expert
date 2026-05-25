import { notFound } from "next/navigation";
import { PageContainer } from "@/components/page-container";
import { ServicePageTemplate } from "@/components/service-page-template";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug, allServiceSlugs } from "@/lib/services-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.path,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <PageContainer size="lg">
      <ServicePageTemplate service={service} />
    </PageContainer>
  );
}
