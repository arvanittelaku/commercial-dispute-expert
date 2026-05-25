import {
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_DENIED_PREFERENCES,
  type CookiePreferences,
  type StoredConsent,
} from "./types";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isConsentExpired(savedAt: number): boolean {
  return Date.now() - savedAt > CONSENT_MAX_AGE_MS;
}

const LEGACY_STORAGE_KEY = "cde-cookie-consent";

/** Migrate v0 banner choices (accepted / declined strings) */
function migrateLegacyConsent(): StoredConsent | null {
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacy) return null;
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  const preferences =
    legacy === "accepted"
      ? { analytics: true, marketing: true, preferences: true }
      : { analytics: false, marketing: false, preferences: false };
  return writeStoredConsent(preferences);
}

export function readStoredConsent(): StoredConsent | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return migrateLegacyConsent();

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (!parsed.savedAt || !parsed.preferences) return null;
    if (isConsentExpired(parsed.savedAt)) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return {
      version: CONSENT_VERSION,
      savedAt: parsed.savedAt,
      preferences: {
        analytics: Boolean(parsed.preferences.analytics),
        marketing: Boolean(parsed.preferences.marketing),
        preferences: Boolean(parsed.preferences.preferences),
      },
    };
  } catch {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

export function writeStoredConsent(preferences: CookiePreferences): StoredConsent {
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    savedAt: Date.now(),
    preferences: { ...preferences },
  };

  if (isBrowser()) {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  }

  return record;
}

export function clearStoredConsent(): void {
  if (isBrowser()) {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}

export function hasValidConsent(): boolean {
  return readStoredConsent() !== null;
}

export function getInitialPreferences(): CookiePreferences {
  return readStoredConsent()?.preferences ?? { ...DEFAULT_DENIED_PREFERENCES };
}
