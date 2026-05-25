/**
 * Local Google Sheets connection test. Run: npx tsx scripts/test-sheets.ts
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { appendLeadToGoogleSheet } = await import("../src/lib/lead-sheet");
  const { isGoogleSheetsConfigured } = await import("../src/lib/google-sheets");

  if (!isGoogleSheetsConfigured()) {
    console.error("❌ Google Sheets env vars missing in .env.local");
    console.error(
      "   Required: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID",
    );
    process.exit(1);
  }

  try {
    await appendLeadToGoogleSheet({
      fullName: "Test Entry",
      email: "test@example.com",
      phone: "+44 20 0000 0000",
      lawFirm: "Test Firm LLP",
      formType: "contact",
      caseType: "Commercial dispute expert witness",
      message: "Test row from scripts/test-sheets.ts — safe to delete.",
    });
    console.log("✅ Row appended to Google Sheet");
  } catch (error) {
    console.error("❌ Sheets write failed:", error);
    process.exit(1);
  }
}

main();
