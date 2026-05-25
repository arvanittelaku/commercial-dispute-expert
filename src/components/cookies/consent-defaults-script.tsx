import { CONSENT_DEFAULTS_INLINE_SCRIPT } from "@/lib/cookies/google-consent-mode";

/**
 * Google Consent Mode v2 defaults — denied until user opts in.
 * Inlined in the initial HTML so it runs before any consented third-party script.
 */
export function ConsentDefaultsScript() {
  return (
    <script
      id="cde-consent-defaults"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_INLINE_SCRIPT }}
    />
  );
}
