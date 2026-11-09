import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, AlertCircle, Info } from "lucide-react";
import { initialPricingPlans } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

export function PricingTeaser() {
  return (
    <section className="py-24 bg-agency-dark relative overflow-hidden" id="pricing-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-orange">
            Transparent Retainers
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Scalable Monthly Packages <br />
            <span className="text-gradient-agency">Engineered For Measurable ROI</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            No long lock-ins. No hidden agency commissions. Clear deliverables and relentless weekly optimization.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-agency-card border-2 border-agency-orange shadow-2xl shadow-agency-orange/15 lg:-translate-y-2"
                    : "card-glass border border-white/10 hover:border-white/20"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-agency-gradient text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles size={12} /> Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-tight">
                      {plan.billingCycle}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-6 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-xs text-zinc-400">/ month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                      Package Deliverables:
                    </div>
                    {plan.features.slice(0, 7).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <div
                          className={`mt-0.5 rounded-full p-0.5 ${
                            feat.isIncluded
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-zinc-600 bg-zinc-800"
                          }`}
                        >
                          <Check size={12} />
                        </div>
                        <span
                          className={feat.isIncluded ? "text-zinc-200" : "text-zinc-500 line-through"}
                        >
                          {feat.featureText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? "bg-agency-gradient text-white shadow-lg shadow-agency-orange/25 hover:opacity-95"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <span>{isPopular ? "Choose Growth Plan" : plan.name === "Starter Plan" ? "Get Started" : "Choose Premium"}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimers & Comparison Link */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold">
              <Info size={15} className="text-agency-orange" />
              <span>Key Pricing Terms &amp; Transparency Notice:</span>
            </div>
            <p>
              • Advertising spend is paid directly by you to Meta &amp; Google using your own card.
              <br />
              • GST (18%) is extra where applicable. Website development &amp; video production quoted separately.
            </p>
          </div>

          <Link
            href="/pricing"
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>Full Feature Comparison Table</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

