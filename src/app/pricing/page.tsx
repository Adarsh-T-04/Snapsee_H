"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  HelpCircle, 
  Sliders, 
  ShieldCheck,
  Calculator
} from "lucide-react";
import { initialPricingPlans } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

export default function PricingPage() {
  // Custom package builder state
  const [customPosts, setCustomPosts] = useState(12);
  const [customReels, setCustomReels] = useState(6);
  const [includeMetaAds, setIncludeMetaAds] = useState(true);
  const [includeGoogleAds, setIncludeGoogleAds] = useState(false);
  const [includeSeo, setIncludeSeo] = useState(false);

  // Approximate calculator
  const estimatedCustomCost = 
    (customPosts * 700) + 
    (customReels * 1200) + 
    (includeMetaAds ? 9000 : 0) + 
    (includeGoogleAds ? 12000 : 0) + 
    (includeSeo ? 8000 : 0);

  const comparisonFeatures = [
    { title: "Monthly Social Media Posts", starter: "8 Posts", growth: "12 Posts", premium: "20 Studio Posts" },
    { title: "Instagram Reels & Shorts", starter: "4 Reels", growth: "8 Reels", premium: "12 Viral Reels" },
    { title: "Social Platforms Managed", starter: "1-2 Accounts", growth: "Up to 3 Accounts", premium: "Omnichannel (All Platforms)" },
    { title: "Monthly Content Calendar & Strategy", starter: true, growth: true, premium: true },
    { title: "Meta Ads Management (Facebook & IG)", starter: false, growth: true, premium: true },
    { title: "Google Ads (Search, YouTube & PMax)", starter: false, growth: false, premium: true },
    { title: "SEO Optimization & Content Auditing", starter: false, growth: "Basic On-Page", premium: "Full Technical & Backlinks" },
    { title: "Lead Generation & CRM Webhook Setup", starter: false, growth: "Standard Forms", premium: "Advanced Automated Funnel" },
    { title: "Competitor Analysis & Ad Teardowns", starter: false, growth: true, premium: true },
    { title: "Creative Graphic Design & Brand Polish", starter: "Basic", growth: "Advanced", premium: "Dedicated Creative Squad" },
    { title: "Conversion Rate Optimization (CRO)", starter: false, growth: false, premium: true },
    { title: "Performance Reporting", starter: "Monthly PDF", growth: "Bi-Weekly Calls", premium: "Real-time Live Dashboard" },
    { title: "Direct Communication & Strategy Calls", starter: "Email Support", growth: "Bi-Weekly Sync", premium: "Dedicated Slack Channel" },
  ];

  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-6">
            <Sparkles size={14} /> Clear, High-Value Retainers
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Transparent Pricing Plans. <br />
            <span className="text-gradient-agency">No Surprise Surcharges.</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Choose the package tailored to your current stage of growth. Scale up or adjust anytime as your advertising returns compound.
          </p>
        </div>
      </section>

      {/* 3 Main Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <div
                key={plan.id}
                id={plan.slug}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-agency-card border-2 border-agency-orange shadow-2xl shadow-agency-orange/20 lg:-translate-y-3"
                    : "card-glass border border-white/10 hover:border-white/20"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-agency-gradient text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles size={12} /> Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-black text-white">{plan.name}</h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {plan.billingCycle}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-agency-orange mb-4">
                    Best for: {plan.targetAudience}
                  </div>

                  <p className="text-xs text-zinc-400 mb-8 min-h-[48px]">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                    <span className="text-5xl font-black text-white">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">/ month</span>
                  </div>

                  <div className="space-y-3.5 mb-10">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-4">
                      Plan Deliverables &amp; Inclusions:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs leading-relaxed">
                        <div
                          className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            feat.isIncluded
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-zinc-600 bg-zinc-800"
                          }`}
                        >
                          {feat.isIncluded ? <Check size={12} /> : <X size={12} />}
                        </div>
                        <span className={feat.isIncluded ? "text-zinc-200" : "text-zinc-500 line-through"}>
                          {feat.featureText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? "bg-agency-gradient text-white shadow-xl shadow-agency-orange/30 hover:scale-[1.02] active:scale-95"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <span>
                      {plan.name === "Starter Plan" 
                        ? "Get Started" 
                        : plan.name === "Growth Plan" 
                        ? "Choose Growth" 
                        : "Choose Premium"}
                    </span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Critical Pricing Terms & Notes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl card-glass p-8 border border-agency-orange/20 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-base font-bold text-white mb-4">
            <AlertCircle size={20} className="text-agency-orange" />
            <span>Important Agency Pricing &amp; Billing Notes:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
              <span className="font-bold text-white block">1. Ad Spend Is Separate</span>
              <p className="text-zinc-400 leading-relaxed">
                Advertising budget is paid directly to Meta &amp; Google using your company card, maintaining complete account transparency.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
              <span className="font-bold text-white block">2. Taxes &amp; GST</span>
              <p className="text-zinc-400 leading-relaxed">
                Government GST (18%) is added on top of retainer invoices where applicable. Full GST tax credits are provided.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
              <span className="font-bold text-white block">3. Separate Scope Work</span>
              <p className="text-zinc-400 leading-relaxed">
                Full-scale website development, brand redesigns, and high-budget studio film shoots are quoted on a per-project scope.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
              <span className="font-bold text-white block">4. Custom Packages</span>
              <p className="text-zinc-400 leading-relaxed">
                Need more reels, multi-city influencer outreach, or dedicated media buyers? We build bespoke retainers seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24" id="compare">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-purple">
            Side-by-Side Evaluation
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Package Comparison Table
          </h2>
        </div>

        <div className="card-glass rounded-3xl overflow-x-auto border border-white/10">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-5 font-bold text-white w-2/5">Capabilities &amp; Features</th>
                <th className="p-5 font-bold text-zinc-300 text-center w-1/5">Starter (₹9,999)</th>
                <th className="p-5 font-bold text-agency-orange text-center w-1/5">Growth (₹19,999)</th>
                <th className="p-5 font-bold text-agency-purple text-center w-1/5">Premium (₹39,999)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium text-white">{row.title}</td>

                  {/* Starter */}
                  <td className="p-5 text-center text-zinc-400">
                    {typeof row.starter === "boolean" ? (
                      row.starter ? (
                        <Check size={16} className="text-emerald-400 mx-auto" />
                      ) : (
                        <X size={16} className="text-zinc-600 mx-auto" />
                      )
                    ) : (
                      <span>{row.starter}</span>
                    )}
                  </td>

                  {/* Growth */}
                  <td className="p-5 text-center font-semibold text-zinc-200">
                    {typeof row.growth === "boolean" ? (
                      row.growth ? (
                        <Check size={16} className="text-emerald-400 mx-auto" />
                      ) : (
                        <X size={16} className="text-zinc-600 mx-auto" />
                      )
                    ) : (
                      <span>{row.growth}</span>
                    )}
                  </td>

                  {/* Premium */}
                  <td className="p-5 text-center font-bold text-white">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? (
                        <Check size={16} className="text-emerald-400 mx-auto" />
                      ) : (
                        <X size={16} className="text-zinc-600 mx-auto" />
                      )
                    ) : (
                      <span>{row.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Custom Retainer Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="card-glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-agency-orange mb-2">
            <Calculator size={16} /> Interactive Custom Scope Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Need a Customized Growth Retainer?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Tune your required deliverables below to calculate an approximate monthly retainer.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-2">
                <span>Social Media Posts: {customPosts} / month</span>
                <span className="text-agency-orange">₹{customPosts * 700}</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={customPosts}
                onChange={(e) => setCustomPosts(Number(e.target.value))}
                className="w-full accent-agency-orange h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-2">
                <span>Vertical Reels &amp; Shorts: {customReels} / month</span>
                <span className="text-agency-orange">₹{customReels * 1200}</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={customReels}
                onChange={(e) => setCustomReels(Number(e.target.value))}
                className="w-full accent-agency-orange h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 cursor-pointer text-xs text-zinc-300 hover:border-agency-orange/40">
                <input
                  type="checkbox"
                  checked={includeMetaAds}
                  onChange={(e) => setIncludeMetaAds(e.target.checked)}
                  className="rounded accent-agency-orange"
                />
                <span>Meta Ads Management (+₹9,000)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 cursor-pointer text-xs text-zinc-300 hover:border-agency-orange/40">
                <input
                  type="checkbox"
                  checked={includeGoogleAds}
                  onChange={(e) => setIncludeGoogleAds(e.target.checked)}
                  className="rounded accent-agency-orange"
                />
                <span>Google Ads (+₹12,000)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 cursor-pointer text-xs text-zinc-300 hover:border-agency-orange/40">
                <input
                  type="checkbox"
                  checked={includeSeo}
                  onChange={(e) => setIncludeSeo(e.target.checked)}
                  className="rounded accent-agency-orange"
                />
                <span>SEO Management (+₹8,000)</span>
              </label>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block">Estimated Custom Package Retainer:</span>
                <span className="text-3xl font-black text-white text-gradient-agency">
                  {formatCurrency(estimatedCustomCost)} / month
                </span>
              </div>

              <Link
                href={`/contact?plan=Custom%20Scope%20(${formatCurrency(estimatedCustomCost)})`}
                className="px-8 py-3.5 rounded-xl bg-agency-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-agency-orange/20 hover:opacity-95"
              >
                Request Custom Retainer Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

