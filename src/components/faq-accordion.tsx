"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceFaq } from "@/lib/services-content";

export function FAQAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-lg border border-border">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full min-h-[44px] items-center justify-between gap-3 px-4 py-4 text-left text-sm font-medium text-charcoal hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-green sm:gap-4 sm:px-6 sm:py-5 sm:text-base"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="min-w-0 flex-1 break-words">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-foreground/50 transition-transform",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "overflow-hidden px-4 transition-all sm:px-6",
                isOpen ? "max-h-[min(120rem,80dvh)] pb-5" : "max-h-0",
              )}
              hidden={!isOpen}
            >
              <p className="leading-relaxed text-foreground">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
