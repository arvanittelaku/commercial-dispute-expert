"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { siteConfig } from "@/config/site";

const caseTypes = [
  "Commercial dispute expert witness",
  "Litigation support",
  "Loss of profits / quantum",
  "Breach of contract",
  "Shareholder / partnership dispute",
  "Business valuation",
  "Business interruption",
  "Professional negligence",
  "Arbitration / mediation",
  "Other",
];

type ContactFormProps = {
  formType?: "contact" | "instruct";
  title?: string;
};

/**
 * On submit: POST lead (fullName, email, phone) to /api/submit-lead, then send full enquiry via server action.
 */
export function ContactForm({ formType = "contact", title }: ContactFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="relative min-w-0 space-y-6"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setPending(true);

        const form = e.currentTarget;
        const fd = new FormData(form);

        const fullName = String(fd.get("name") ?? "").trim();
        const email = String(fd.get("email") ?? "").trim();
        const phone = String(fd.get("phone") ?? "").trim();

        if (!fullName || !email) {
          setError("Please enter your name and email.");
          setPending(false);
          return;
        }

        const leadPayload = {
          fullName,
          email,
          phone,
          lawFirm: String(fd.get("firm") ?? "").trim(),
          formType: String(fd.get("formType") ?? "contact").trim(),
          caseType: String(fd.get("caseType") ?? "").trim(),
          message: String(fd.get("message") ?? "").trim(),
        };

        try {
          const leadRes = await fetch("/api/submit-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leadPayload),
          });

          if (!leadRes.ok) {
            const errJson = (await leadRes.json().catch(() => null)) as {
              error?: string;
              message?: string;
            } | null;
            const code = errJson?.error;

            // No Sheets/webhook configured - still allow Resend-only path
            if (leadRes.status === 503 && code === "LEAD_DESTINATION_MISSING") {
              // continue to email action below
            } else if (code === "SHEETS_WRITE_FAILED") {
              setError(
                "We could not save your submission. Please try again or email us directly.",
              );
              setPending(false);
              return;
            } else if (code === "WEBHOOK_UNREACHABLE" || code === "WEBHOOK_REJECTED") {
              setError(
                "We could not notify our team right now. Please try again or email us directly.",
              );
              setPending(false);
              return;
            } else if (leadRes.status !== 503) {
              setError(
                errJson?.message ||
                  "Something went wrong. Please try again or email us directly.",
              );
              setPending(false);
              return;
            }
          }

          const emailResult = await submitContactForm(fd);
          if (!emailResult.ok) {
            setError(emailResult.message);
            setPending(false);
            return;
          }

          router.push(emailResult.thankYouPath);
        } catch {
          setError("Network error. Check your connection and try again.");
          setPending(false);
        }
      }}
    >
      <input type="hidden" name="formType" value={formType} />
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {title && (
        <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">{title}</h2>
      )}

      {error ? (
        <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
          {error}{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-brand-green underline"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal">
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        </div>
        <div>
          <label htmlFor="firm" className="block text-sm font-medium text-charcoal">
            Law firm / company *
          </label>
          <input
            id="firm"
            name="firm"
            type="text"
            required
            autoComplete="organization"
            className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="caseType" className="block text-sm font-medium text-charcoal">
          Case type *
        </label>
        <select
          id="caseType"
          name="caseType"
          required
          className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        >
          <option value="">Select case type</option>
          {caseTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={
            formType === "instruct"
              ? "Brief description of the dispute, forum, timetable and whether party-appointed or SJE..."
              : "How can we help?"
          }
          className="mt-1 w-full rounded-md border border-border px-4 py-3 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="confidentiality"
          name="confidentiality"
          type="checkbox"
          required
          value="yes"
          className="mt-1 h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
        />
        <label htmlFor="confidentiality" className="text-sm text-foreground/80">
          I understand this enquiry is confidential and does not create an expert appointment until
          formally agreed in writing. I am a legal professional or authorised representative. *
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-brand-green px-6 py-4 font-medium text-white hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Sending…" : formType === "instruct" ? "Submit instruction enquiry" : "Send message"}
      </button>
    </form>
  );
}
