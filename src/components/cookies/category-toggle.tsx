"use client";

import type { CookieCategoryMeta } from "@/lib/cookies/types";

type CategoryToggleProps = {
  category: CookieCategoryMeta;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function CategoryToggle({
  category,
  checked,
  disabled = false,
  onChange,
}: CategoryToggleProps) {
  const inputId = `cde-cookie-${category.key}`;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
      <div className="min-w-0 flex-1">
        <label htmlFor={inputId} className="text-sm font-semibold text-charcoal">
          {category.label}
          {category.required && (
            <span className="ml-2 text-xs font-normal uppercase tracking-wide text-foreground/60">
              Always on
            </span>
          )}
        </label>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">{category.description}</p>
      </div>
      <button
        id={inputId}
        type="button"
        role="switch"
        aria-checked={category.required ? true : checked}
        aria-labelledby={inputId}
        disabled={disabled || category.required}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ${
          category.required || checked ? "bg-brand-green" : "bg-border"
        } ${disabled || category.required ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
            category.required || checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="sr-only">
          {category.label} - {category.required || checked ? "on" : "off"}
        </span>
      </button>
    </div>
  );
}
