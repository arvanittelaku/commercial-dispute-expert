export type AnonymisedExpert = {
  id: string;
  title: string;
  credentials: string;
  location: string;
  specialisms: string[];
  summary: string;
};

export const ANONYMISED_EXPERTS: AnonymisedExpert[] = [
  {
    id: "senior-forensic",
    title: "Senior Forensic Accounting Expert",
    credentials: "FCA, MAE, CFF",
    location: "London, UK",
    specialisms: ["Loss of profits", "Breach of contract", "CPR Part 35 reports"],
    summary:
      "Chartered forensic accountant with extensive commercial litigation and arbitration experience. Regular appointments in Business and Property Court quantum disputes.",
  },
  {
    id: "quantum-specialist",
    title: "Commercial Quantum Specialist",
    credentials: "ACA, ACCA",
    location: "England & Wales",
    specialisms: ["Business interruption", "Consequential loss", "Rebuttal reports"],
    summary:
      "Focus on damages modelling, mitigation analysis and critique of opposing quantum schedules in high-value contract disputes.",
  },
  {
    id: "valuation-disputes",
    title: "Valuation & Shareholder Disputes Expert",
    credentials: "FCA, CVA",
    location: "UK-wide",
    specialisms: ["Shareholder disputes", "Business valuation", "Partnership dissolution"],
    summary:
      "Experience in unfair prejudice petitions, buy-out quantum and valuation methodology disputes for legal teams and tribunals.",
  },
];
