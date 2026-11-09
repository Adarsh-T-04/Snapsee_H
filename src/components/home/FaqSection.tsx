"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { initialFAQs } from "@/lib/data-store";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = initialFAQs.slice(0, 5);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-agency-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-orange">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Frequently Asked <span className="text-gradient-agency">Questions</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Clear, transparent answers on budgets, contract lengths, and our working style.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="card-glass rounded-2xl overflow-hidden border border-white/10 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-agency-orange bg-agency-orange/10" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-agency-orange hover:underline"
          >
            <span>Have more questions? Read our full Knowledge Base &amp; FAQ</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

