/** Must match `BRAND_NAME` in netlify/functions/submit-lead.js */
export const LEAD_BRAND_NAME = "Commercial Dispute Expert";

export function getLeadWebhookUrl(): string {
  return (
    process.env.Lead_notification_url ||
    process.env.LEAD_NOTIFICATION_URL ||
    ""
  );
}

export type LeadWebhookPayload = {
  fullName: string;
  email: string;
  phone: string;
};

/** Outbound n8n / webhook body (exactly four keys). */
export function buildLeadWebhookBody(lead: LeadWebhookPayload) {
  return {
    "Full Name": lead.fullName,
    Email: lead.email,
    "Phone Number": lead.phone,
    "Brand name": LEAD_BRAND_NAME,
  };
}

export async function forwardLeadToWebhook(
  webhookUrl: string,
  lead: LeadWebhookPayload,
): Promise<Response> {
  return fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildLeadWebhookBody(lead)),
    signal: AbortSignal.timeout(12_000),
  });
}
