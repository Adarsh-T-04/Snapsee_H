"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { initialFAQs } from "@/lib/data-store";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [openIdx, setOpenIdx] = useState<string | null>(initialFAQs[0].id);

  const categories = ["ALL", "General", "Pricing", "Ad Spend", "Onboarding", "Services"];

  const filtered = initialFAQs.filter((faq) => {
    const matchesCat = selectedCategory === "ALL" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggle = (id: string) => {
    setOpenIdx(openIdx === id ? null : id);
  };

  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-6">
            <Sparkles size={14} /> Clear Answers, Zero Obfuscation
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Frequently Asked <br />
            <span className="text-gradient-agency">Questions &amp; Knowledge Base</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about our fee structures, ad budget ownership, campaign timelines, and working processes.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic (e.g. ad spend, GST, timeline, ROAS)..."
              className="w-full bg-black/60 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-agency-gradient text-white shadow-md shadow-agency-orange/20"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {cat === "ALL" ? "All Questions" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {filtered.length === 0 ? (
          <div className="card-glass rounded-3xl p-12 text-center text-zinc-400 text-sm">
            No questions matching &ldquo;{search}&rdquo;. Ask our directors directly on WhatsApp.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((faq) => {
              const isOpen = openIdx === faq.id;
              return (
                <div
                  key={faq.id}
                  className="card-glass rounded-2xl overflow-hidden border border-white/10 transition-colors"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white pr-2">
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
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* WhatsApp Assist Box */}
        <div className="mt-16 card-glass rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Still have a specific question?</h3>
            <p className="text-xs text-zinc-400">Our strategy team answers directly on WhatsApp in under 5 minutes.</p>
          </div>
          <a
            href="https://wa.me/919695478967"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0 transition-all"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}

