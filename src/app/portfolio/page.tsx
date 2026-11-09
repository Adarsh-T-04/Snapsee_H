"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { initialProjects } from "@/lib/data-store";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = [
    "ALL",
    "Meta Ads & Creative Testing",
    "Lead Generation & Performance Marketing",
    "Google Ads & B2B SEO",
    "Branding & Video Reels",
    "Performance Marketing",
  ];

  const filtered = activeCategory === "ALL"
    ? initialProjects
    : initialProjects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-purple/10 border border-agency-purple/30 text-xs font-bold text-agency-purple mb-6">
            <Sparkles size={14} /> Real Numbers. Real Revenue.
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Case Studies &amp; <br />
            <span className="text-gradient-agency">Performance Results</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Explore how we help modern DTC brands, real estate giants, SaaS companies, and high-ticket service businesses scale through performance marketing.
          </p>

          {/* Transparent Demo Projects Disclaimer Banner */}
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3 text-left">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Agency Integrity Notice:</span> All featured case studies showcase realistic demo benchmark models and anonymized campaigns developed under our testing frameworks. We never present fictional results as real client results.
            </div>
          </div>

          {/* Filters */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-agency-gradient text-white shadow-lg shadow-agency-orange/20 scale-105"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "ALL" ? "All Case Studies" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              id={proj.slug}
              className="card-glass rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between card-glass-hover group"
            >
              <div>
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agency-card via-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/80 text-white backdrop-blur-md border border-white/10">
                      {proj.category}
                    </span>
                  </div>
                  {proj.isDemo && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                        Demo Benchmark Model
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-agency-orange">
                      Brand / Client: {proj.clientName}
                    </span>
                    <h2 className="text-2xl font-black text-white mt-1 group-hover:text-agency-orange transition-colors">
                      {proj.title}
                    </h2>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Campaign Objective:
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {proj.objective}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Creative Execution:
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {proj.creativeWork}
                    </p>
                  </div>

                  {/* Results Metrics */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-agency-orange" />
                      Key Performance Metrics Achieved:
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {proj.resultsMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-white/5 border border-white/5"
                        >
                          <div className="text-xl font-black text-gradient-agency">
                            {m.metric}
                          </div>
                          <div className="text-[11px] text-zinc-400 uppercase tracking-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {proj.caseStudy && (
                    <div className="p-4 rounded-xl bg-agency-purple/10 border border-agency-purple/20 text-xs text-zinc-300 leading-relaxed">
                      <span className="font-bold text-agency-purple">Strategic Breakthrough: </span>
                      {proj.caseStudy}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  href={`/contact?service=${encodeURIComponent(proj.category)}`}
                  className="w-full py-3.5 rounded-xl bg-agency-gradient text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-agency-orange/20 hover:opacity-95 transition-all"
                >
                  <span>Replicate These Results For Your Brand</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

