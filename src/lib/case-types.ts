export type CaseType = {
  slug: string;
  hubLabel: string;
  title: string;
  summary: string;
  metaDescription: string;
};

export const CASE_TYPES: CaseType[] = [
  {
    slug: "breach-of-contract",
    hubLabel: "Breach of contract",
    title: "Breach of Contract Disputes",
    summary:
      "Quantum and forensic accounting for contractual breach, delayed performance and consequential loss claims.",
    metaDescription:
      "Commercial dispute expert witness for breach of contract damages and loss quantification in commercial litigation.",
  },
  {
    slug: "shareholder-partnership",
    hubLabel: "Shareholder & partnership",
    title: "Shareholder & Partnership Disputes",
    summary:
      "Unfair prejudice, buy-out valuations and partnership account-taking supported by independent financial evidence.",
    metaDescription:
      "Expert witness support for shareholder disputes and partnership dissolution quantum in commercial litigation.",
  },
  {
    slug: "professional-negligence",
    hubLabel: "Professional negligence",
    title: "Professional Negligence",
    summary:
      "Financial quantum in accountant, auditor and corporate adviser negligence litigation.",
    metaDescription:
      "Forensic accounting expert witness for professional negligence damages in commercial disputes.",
  },
  {
    slug: "business-interruption",
    hubLabel: "Business interruption",
    title: "Business Interruption & Insurance",
    summary:
      "BI loss quantification and insurance-related financial disputes with transparent methodology.",
    metaDescription:
      "Business interruption expert witness and quantum analysis for commercial and insurance disputes.",
  },
  {
    slug: "fraud-asset-tracing",
    hubLabel: "Fraud & asset tracing",
    title: "Fraud & Asset Tracing",
    summary:
      "Forensic investigation, misappropriation analysis and asset tracing in contentious matters.",
    metaDescription:
      "Forensic accountant expert witness for fraud allegations and asset tracing in commercial litigation.",
  },
  {
    slug: "international-arbitration",
    hubLabel: "International arbitration",
    title: "International Arbitration",
    summary:
      "Expert reports and testimony for LCIA, ICC and ad hoc arbitration.",
    metaDescription:
      "Commercial dispute expert witness for international arbitration and cross-border quantum issues.",
  },
];

export function getCaseTypeBySlug(slug: string): CaseType | undefined {
  return CASE_TYPES.find((c) => c.slug === slug);
}
