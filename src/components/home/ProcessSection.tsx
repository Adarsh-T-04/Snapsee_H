import React from "react";
import { Search, Compass, Rocket, TrendingUp } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Diagnostic & Economics Audit",
      desc: "We analyze your historical ad accounts, competitor angles, landing page metrics, and gross margins to calculate your exact allowable CAC target.",
    },
    {
      num: "02",
      icon: Compass,
      title: "Creative Engine & Angle Mapping",
      desc: "Our copywriters and designers produce 15-20 distinct creative variations (video hooks, static concepts, carousels) targeting different emotional triggers.",
    },
    {
      num: "03",
      icon: Rocket,
      title: "Algorithmic Media Buying",
      desc: "We deploy controlled budget sandboxes across Meta and Google, letting algorithmic machine learning identify statistical winning combinations fast.",
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Aggressive Scale & CRO",
      desc: "We pour capital into winning ads, deploy dynamic retargeting loops, and optimize your checkout/lead funnel to maximize customer lifetime value.",
    },
  ];

  return (
    <section className="py-24 bg-agency-darker relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-purple">
            Scientific Growth Formula
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            How We Turn Ad Spend Into <br />
            <span className="text-gradient-agency">Compounding Profitability</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card-glass rounded-2xl p-6 flex flex-col justify-between relative group hover:border-agency-purple/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-white/20 group-hover:text-agency-purple/40 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-purple">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

