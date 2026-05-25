/**
 * Which third-party trackers are configured via environment variables.
 * Scripts only load when the matching category is consented AND the ID is set.
 */
export type TrackerId =
  | "ga4"
  | "gtm"
  | "plausible"
  | "meta-pixel"
  | "linkedin"
  | "hotjar";

export type TrackerDefinition = {
  id: TrackerId;
  category: "analytics" | "marketing" | "preferences";
  envKey: string;
  getValue: () => string | undefined;
};

export const TRACKERS: TrackerDefinition[] = [
  {
    id: "gtm",
    category: "analytics",
    envKey: "NEXT_PUBLIC_GTM_ID",
    getValue: () => process.env.NEXT_PUBLIC_GTM_ID,
  },
  {
    id: "ga4",
    category: "analytics",
    envKey: "NEXT_PUBLIC_GA_MEASUREMENT_ID",
    getValue: () => process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  {
    id: "plausible",
    category: "analytics",
    envKey: "NEXT_PUBLIC_PLAUSIBLE_DOMAIN",
    getValue: () => process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  },
  {
    id: "hotjar",
    category: "analytics",
    envKey: "NEXT_PUBLIC_HOTJAR_ID",
    getValue: () => process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  {
    id: "meta-pixel",
    category: "marketing",
    envKey: "NEXT_PUBLIC_META_PIXEL_ID",
    getValue: () => process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  {
    id: "linkedin",
    category: "marketing",
    envKey: "NEXT_PUBLIC_LINKEDIN_PARTNER_ID",
    getValue: () => process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  },
];

export function getActiveTrackers(
  category: "analytics" | "marketing" | "preferences",
): TrackerDefinition[] {
  return TRACKERS.filter((t) => t.category === category && Boolean(t.getValue()?.trim()));
}
