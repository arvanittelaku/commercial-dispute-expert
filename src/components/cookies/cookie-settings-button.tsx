"use client";

import { useCookieConsentOptional } from "@/context/cookie-consent-context";

type CookieSettingsButtonProps = {
  className?: string;
};

/** Footer control — reopens the preferences modal at any time */
export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const consent = useCookieConsentOptional();

  if (!consent) return null;

  return (
    <button
      type="button"
      onClick={consent.openPreferences}
      className={
        className ??
        "hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      }
    >
      Cookie settings
    </button>
  );
}
