import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Legacy expert URLs — roster is anonymous; no individual profile pages. */
export default async function ExpertSlugRedirect({ params }: Props) {
  await params;
  redirect("/experts");
}
