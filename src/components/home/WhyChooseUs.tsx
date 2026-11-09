import React from "react";
import { Zap, ShieldCheck, BarChart2, EyeOff, Target, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const differentiators = [
    {
      icon: Target,
      title: "Zero Vanity Metrics",
      desc: "We don't celebrate impressions or empty clicks. Every campaign is calibrated against net revenue, qualified sales meetings, and real contribution margin.",
      color: "text-agency-orange",
    },
    {
      icon: Sparkles,
      title: "In-House Creative Studio",
      desc: "Our copywriters and motion designers test dozens of high-retention video hooks, lifestyle angles, and interactive carousels every single week.",
      color: "text-agency-purple",
    },
    {
      icon: BarChart2,
      title: "Server-Side Tracking (CAPI)",
      desc: "Post-iOS 14 ad buying fails without clean first-party data. We engineer Meta Conversions API and Google Enhanced Conversions for 100% data fidelity.",
      color: "text-emerald-400",
    },
    {
      icon: Zap,
      title: "Radical Speed to Market",
      desc: "From onboarding to your first campaign live takes under 5 business days. Fast creative iterations ensure your ad frequency never fatigues.",
      color: "text-amber-400",
    },
    {
      icon: ShieldCheck,
      title: "Direct Account Ownership",
      desc: "You always retain 100% ownership of your ad accounts, pixel data, and creative assets. All ad spend is billed directly by Meta and Google to your cards.",
      color: "text-sky-400",
    },
    {
      icon: EyeOff,
      title: "No Outsourced Junior Staff",
      desc: "Your account is managed by battle-tested strategists and senior media buyers who have collectively deployed over ₹45Cr in paid media.",
      color: "text-rose-400",
    },
  ];

  return (
    <section className="py-24 bg-agency-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-orange">
            The Agency Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Why High-Growth Brands <br />
            <span className="text-gradient-agency">Trust Snapsee Over Competitors</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Most digital agencies report surface-level vanity numbers. We align incentives directly with your top-line revenue growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card-glass rounded-2xl p-8 card-glass-hover flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Icon size={24} className={item.color} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

