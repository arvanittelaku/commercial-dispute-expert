import { NextResponse } from "next/server";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { appendLeadToGoogleSheet, type LeadFields } from "@/lib/lead-sheet";
import { forwardLeadToWebhook, getLeadWebhookUrl } from "@/lib/lead-webhook";

type LeadBody = {
  fullName?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  lawFirm?: unknown;
  law_firm?: unknown;
  formType?: unknown;
  form_type?: unknown;
  caseType?: unknown;
  case_type?: unknown;
  message?: unknown;
};

function trimField(v: unknown, max = 8000): string {
  const s = v != null ? String(v).trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

function parseLeadBody(body: LeadBody): LeadFields {
  return {
    fullName: trimField(body.fullName ?? body.full_name, 300),
    email: trimField(body.email, 320),
    phone: trimField(body.phone, 80),
    lawFirm: trimField(body.lawFirm ?? body.law_firm, 300),
    formType: trimField(body.formType ?? body.form_type, 40) || "contact",
    caseType: trimField(body.caseType ?? body.case_type, 200),
    message: trimField(body.message, 8000),
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

/**
 * POST /api/submit-lead — Google Sheets row + optional n8n webhook (Full Name, Email, Phone, Brand).
 */
export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lead = parseLeadBody(body);

  if (!lead.fullName || !lead.email) {
    return NextResponse.json(
      { error: "fullName and email are required" },
      { status: 400 },
    );
  }

  const webhookUrl = getLeadWebhookUrl();
  const sheetsConfigured = isGoogleSheetsConfigured();

  if (!webhookUrl && !sheetsConfigured) {
    return NextResponse.json(
      {
        error: "LEAD_DESTINATION_MISSING",
        message:
          "Configure Google Sheets (GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY) or Lead_notification_url.",
      },
      { status: 503 },
    );
  }

  if (sheetsConfigured) {
    try {
      await appendLeadToGoogleSheet(lead);
    } catch (error: unknown) {
      const err = error as { message?: string; code?: number };
      console.error("Google Sheets error:", {
        message: err?.message,
        code: err?.code,
        spreadsheetId: `${process.env.GOOGLE_SHEET_ID?.slice(0, 8)}...`,
        timestamp: new Date().toISOString(),
      });

      if (!webhookUrl) {
        return NextResponse.json(
          { error: "SHEETS_WRITE_FAILED", message: "Could not save your submission." },
          { status: 502 },
        );
      }
    }
  }

  if (webhookUrl) {
    let upstream: Response;
    try {
      upstream = await forwardLeadToWebhook(webhookUrl, {
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
      });
    } catch {
      return NextResponse.json({ error: "WEBHOOK_UNREACHABLE" }, { status: 502 });
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "WEBHOOK_REJECTED", status: upstream.status },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
