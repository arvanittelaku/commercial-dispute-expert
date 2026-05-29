"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { CategoryToggle } from "@/components/cookies/category-toggle";
import {
  COOKIE_CATEGORIES,
  type CookieCategoryKey,
  type CookiePreferences,
} from "@/lib/cookies/types";

type CookiePreferencesModalProps = {
  draft: CookiePreferences;
  setDraft: React.Dispatch<React.SetStateAction<CookiePreferences>>;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onClose: () => void;
  /** When true, user already consented - Escape / backdrop closes without forcing a choice */
  showClose: boolean;
};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CookiePreferencesModal({
  draft,
  setDraft,
  onSave,
  onAcceptAll,
  onRejectNonEssential,
  onClose,
  showClose,
}: CookiePreferencesModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleCategoryChange = (key: CookieCategoryKey, checked: boolean) => {
    setDraft((prev) => ({ ...prev, [key]: checked }));
  };

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (showClose && closeBtnRef.current) {
      closeBtnRef.current.focus();
    } else if (panel) {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", trapFocus);
      prev?.focus();
    };
  }, [trapFocus, showClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showClose) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, showClose]);

  return (
    <div className="cde-cookie-overlay-enter fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px]"
        aria-label="Close cookie preferences"
        tabIndex={showClose ? 0 : -1}
        onClick={showClose ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cde-cookie-modal-title"
        className="cde-cookie-modal-enter relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
      >
        <div className="h-1 shrink-0 bg-brand-green" aria-hidden />
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="cde-cookie-modal-title" className="text-lg font-bold text-charcoal">
            Cookie preferences
          </h2>
          {showClose && (
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-foreground/70 hover:bg-muted hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              aria-label="Close"
            >
              <span aria-hidden className="text-xl leading-none">
                ×
              </span>
            </button>
          )}
        </div>
        <div className="overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-foreground/90">
            Choose which optional cookies we may use. Necessary cookies are always active. Read our{" "}
            <Link href="/cookie-policy" className="font-medium text-brand-green underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-4 space-y-3">
            {COOKIE_CATEGORIES.map((cat) => (
              <CategoryToggle
                key={cat.key}
                category={cat}
                checked={
                  cat.key === "necessary"
                    ? true
                    : draft[cat.key as CookieCategoryKey]
                }
                disabled={cat.key === "necessary"}
                onChange={(on) => {
                  if (cat.key !== "necessary") {
                    handleCategoryChange(cat.key as CookieCategoryKey, on);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border bg-muted/30 p-5 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            Reject non-essential
          </button>
          {!showClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green sm:ml-auto"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
