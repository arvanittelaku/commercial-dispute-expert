/**
 * Central site configuration.
 * Replace [PLACEHOLDER] values with verified expert/firm details before go-live.
 */

export const siteConfig = {
  businessName: "Commercial Dispute Expert",
  legalEntityName: "[PLACEHOLDER] Legal entity name Ltd",
  companyNumber: "[PLACEHOLDER]",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://commercialdisputeexpert.com",
  brandShort: "CommercialDisputeExpert",
  tagline: "Commercial disputes. Financial clarity. Court-ready evidence.",
  connectorPitch:
    "CommercialDisputeExpert.com connects UK solicitors and barristers with qualified commercial dispute expert witnesses - forensic accounting, quantum analysis and CPR Part 35 compliant, court-ready reports.",
  description:
    "We connect legal professionals with independent commercial dispute expert witnesses and forensic accountants across England & Wales. Not a law firm - we do not provide legal advice.",

  expert: {
    slug: "lead-expert",
    name: "[PLACEHOLDER] Expert Full Name",
    title: "Commercial Dispute Expert Witness",
    credentials: [
      "[PLACEHOLDER] FCA / ACA / ACCA",
      "[PLACEHOLDER] MAE - Member, Academy of Experts",
      "[PLACEHOLDER] CFF - Certified in Financial Forensics",
    ],
    jurisdictions: ["England & Wales", "[PLACEHOLDER] International arbitration"],
    yearsExperience: "[PLACEHOLDER]",
    expertAppointments: "[PLACEHOLDER]",
    bioSummary:
      "[PLACEHOLDER] Forensic accountant and commercial dispute expert witness with extensive experience quantifying economic damages, preparing CPR Part 35 compliant reports, and giving testimony in court and arbitration.",
    photoPath: "/images/expert-placeholder.jpg",
  },

  contact: {
    phone: "[PLACEHOLDER] +44 20 XXXX XXXX",
    phoneTel: "+4420XXXXXXXX",
    email: "info@commercialdisputeexpert.com",
    address: {
      line1: "[PLACEHOLDER] Office address line 1",
      line2: "[PLACEHOLDER] City, Postcode",
      country: "United Kingdom",
    },
  },

  regulatoryBodies: [
    "[PLACEHOLDER] ICAEW / ACCA member firm",
    "[PLACEHOLDER] Professional indemnity insurance in place",
  ],

  trustMetrics: {
    yearsPractice: "[PLACEHOLDER] 25+",
    expertInstructions: "[PLACEHOLDER] 200+",
    regulated: "ICAEW / ACCA regulated practice",
  },

  socialLinks: {
    linkedin: "[PLACEHOLDER] https://linkedin.com/company/...",
  },

  testimonials: [
    {
      quote:
        "[PLACEHOLDER] Testimonial from solicitor or barrister - replace with approved quote before publication.",
      author: "[PLACEHOLDER] Name",
      role: "[PLACEHOLDER] Solicitor / Barrister",
      firm: "[PLACEHOLDER] Firm name",
    },
    {
      quote:
        "[PLACEHOLDER] Second testimonial - clear, concise expert reports and responsive turnaround.",
      author: "[PLACEHOLDER] Name",
      role: "[PLACEHOLDER] Partner",
      firm: "[PLACEHOLDER] Law firm",
    },
  ],

  navigation: {
    resources: [
      { href: "/insights", label: "Insights" },
      { href: "/how-to-instruct", label: "How to Instruct" },
      { href: "/about", label: "About" },
    ],
    services: [
      {
        title: "Commercial Dispute Expert Witness",
        href: "/services/commercial-dispute-expert-witness",
        description: "Core expert witness appointments for commercial litigation.",
      },
      {
        title: "Litigation Support",
        href: "/services/litigation-support",
        description: "Privileged advisory work behind the scenes for legal teams.",
      },
      {
        title: "Loss of Profits & Quantum",
        href: "/services/loss-of-profits-quantum",
        description: "Quantification of financial loss and damages.",
      },
      {
        title: "Breach of Contract Damages",
        href: "/services/breach-of-contract-damages",
        description: "Contractual breach and consequential loss analysis.",
      },
      {
        title: "Shareholder & Partnership Disputes",
        href: "/services/shareholder-partnership-disputes",
        description: "Corporate and ownership dispute valuations.",
      },
      {
        title: "Business Valuation",
        href: "/services/business-valuation",
        description: "Valuations for litigation and dispute resolution.",
      },
      {
        title: "Business Interruption",
        href: "/services/business-interruption",
        description: "BI claims and interruption loss quantification.",
      },
      {
        title: "Professional Negligence",
        href: "/services/professional-negligence",
        description: "Financial quantum in professional negligence matters.",
      },
      {
        title: "Expert Reports & Testimony",
        href: "/services/expert-reports-testimony",
        description: "CPR Part 35 reports, joint statements and court attendance.",
      },
      {
        title: "Arbitration & Mediation",
        href: "/services/arbitration-mediation",
        description: "Expert evidence in ADR forums.",
      },
    ],
  },
} as const;

export type ServiceNavItem = (typeof siteConfig.navigation.services)[number];
