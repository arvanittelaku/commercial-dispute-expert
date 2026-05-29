"use client";

import { CookieConsentProvider } from "@/context/cookie-consent-context";

/** Client boundary for consent UI - wrap layout children or place alongside footer */
export function CookieConsentRoot({ children }: { children?: React.ReactNode }) {
  return <CookieConsentProvider>{children}</CookieConsentProvider>;
}
