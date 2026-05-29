"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  firm: z.string().min(2, "Firm or company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  caseType: z.string().min(1, "Please select a case type"),
  message: z.string().min(20, "Please provide more detail in your message"),
  confidentiality: z.literal("yes"),
  formType: z.enum(["contact", "instruct"]).optional(),
  website: z.string().max(0).optional(),
});

export type ContactSubmitResult =
  | { ok: true; thankYouPath: string; skipped?: boolean }
  | { ok: false; message: string };

/** Sends the full enquiry via Resend (or logs in dev). Lead webhook is handled client-side first. */
export async function submitContactForm(formData: FormData): Promise<ContactSubmitResult> {
  const raw = {
    name: formData.get("name"),
    firm: formData.get("firm"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    caseType: formData.get("caseType"),
    message: formData.get("message"),
    confidentiality: formData.get("confidentiality"),
    formType: formData.get("formType") ?? "contact",
    website: formData.get("website") ?? "",
  };

  const thankYouPath =
    raw.formType === "instruct" ? "/thank-you?type=instruct" : "/thank-you";

  if (raw.website) {
    return { ok: true, thankYouPath, skipped: true };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return { ok: false, message: first };
  }

  const data = parsed.data;
  const recipient = process.env.CONTACT_EMAIL ?? "info@commercialdisputeexpert.com";
  const subject = `[${data.formType === "instruct" ? "Instruction" : "Contact"}] ${data.caseType} - ${data.firm}`;

  const body = `
New enquiry from commercialdisputeexpert.com

Type: ${data.formType}
Name: ${data.name}
Firm: ${data.firm}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Case type: ${data.caseType}

Message:
${data.message}
`.trim();

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [recipient],
          reply_to: data.email,
          subject,
          text: body,
        }),
      });
      if (!res.ok) {
        console.error("Resend error", await res.text());
        return {
          ok: false,
          message:
            "Unable to send your message. Please email info@commercialdisputeexpert.com directly.",
        };
      }
    } catch (e) {
      console.error("Resend fetch failed", e);
      return {
        ok: false,
        message:
          "Unable to send your message. Please email info@commercialdisputeexpert.com directly.",
      };
    }
  } else {
    console.info("[Contact form submission]", { subject, body });
  }

  return { ok: true, thankYouPath };
}
