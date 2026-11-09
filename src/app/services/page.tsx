"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Zap, 
  ChevronRight, 
  Filter 
} from "lucide-react";
import { initialServices } from "@/lib/data-store";
import { DynamicIcon } from "@/components/ui/Icon";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All 14 Services" },
    { id: "PAID", label: "Paid Media & Ads" },
    { id: "CREATIVE", label: "Branding & Video Reels" },
    { id: "ORGANIC", label: "SEO & Content" },
    { id: "TECH", label: "Web Dev & Automation" },
  ];

  const filterService = (srv: typeof initialServices[0]) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "PAID") {
      return ["meta-ads", "google-ads", "performance-marketing", "lead-generation"].includes(srv.slug);
    }
    if (activeCategory === "CREATIVE") {
      return ["branding-and-identity", "graphic-design", "video-editing-reels", "influencer-marketing"].includes(srv.slug);
    }
    if (activeCategory === "ORGANIC") {
      return ["social-media-marketing", "search-engine-optimization", "content-marketing"].includes(srv.slug);
    }
    if (activeCategory === "TECH") {
      return ["website-development", "marketing-automation", "complete-digital-management"].includes(srv.slug);
    }
    return true;
  };

  const filtered = initialServices.filter(filterService);

  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-6">
            <Sparkles size={14} /> Full-Funnel Growth Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Our Digital Marketing &amp; <br />
            <span className="text-gradient-agency">Advertising Services</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Every growth discipline executed by specialized experts. We engineer end-to-end client acquisition funnels that scale your business predictably.
          </p>

          {/* Filter Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-agency-gradient text-white shadow-lg shadow-agency-orange/20 scale-105"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {filtered.map((service, index) => (
          <div
            key={service.id}
            id={service.slug}
            className="card-glass rounded-3xl p-8 sm:p-12 relative overflow-hidden scroll-mt-32 border border-white/10 hover:border-agency-orange/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Info & Description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-agency-gradient flex items-center justify-center text-white shadow-lg shadow-agency-orange/20">
                    <DynamicIcon name={service.icon} size={28} />
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-agency-purple/10 text-agency-purple border border-agency-purple/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-agency-orange uppercase tracking-widest">
                    Service #{index + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Benefits */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
                    Business Benefits:
                  </div>
                  {service.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-agency-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-agency-orange/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Enquire For This Service</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Deliverables & Process */}
              <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-8">
                {/* Deliverables */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                    <Layers size={16} className="text-agency-orange" />
                    Tangible Deliverables Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-agency-orange mt-1.5 shrink-0"></span>
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Process */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                    <Zap size={16} className="text-agency-purple" />
                    Our Working Process
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.process.map((step) => (
                      <div
                        key={step.step}
                        className="p-4 rounded-xl bg-black/40 border border-white/5 relative group hover:border-agency-purple/30 transition-colors"
                      >
                        <div className="text-xs font-extrabold text-agency-purple mb-1">
                          Step 0{step.step}: {step.title}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="card-glass rounded-3xl p-10 border border-agency-orange/20">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a tailor-made combination of services?
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Tell us about your business goals and our strategists will assemble a bespoke multi-channel growth retainer.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-agency-gradient text-white text-sm font-bold shadow-xl shadow-agency-orange/25"
            >
              <span>Build Custom Package</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

