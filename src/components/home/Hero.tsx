"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, Flame, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const [quickService, setQuickService] = useState("Meta Ads (FB & IG)");
  const [quickBudget, setQuickBudget] = useState("₹1,00,000 - ₹2,50,000");

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/contact?service=${encodeURIComponent(quickService)}&budget=${encodeURIComponent(quickBudget)}`);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-agency-orange/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-agency-purple/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 backdrop-blur-md mb-8 hover:border-agency-orange/50 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-agency-orange animate-ping"></span>
            <span className="text-agency-orange">Next-Gen Digital Marketing</span>
            <span className="text-zinc-500">•</span>
            <span>Scaling 7-Figure Brands</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.05] uppercase">
            WE DON&apos;T JUST RUN ADS. <br />
            <span className="text-gradient-agency">WE BUILD BRANDS THAT GROW.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl font-normal leading-relaxed">
            From strategy and creativity to performance marketing, we help businesses attract customers, generate leads, and scale revenue.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-agency-gradient text-white text-base font-bold shadow-xl shadow-agency-orange/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/15 text-zinc-200 hover:text-white hover:bg-white/10 text-base font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>

          {/* Quick Consultation Interactive Card */}
          <div className="mt-16 w-full max-w-3xl card-glass rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/10">
            <div className="text-left mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-agency-orange flex items-center gap-1.5">
                <Flame size={14} /> Fast-Track Your Growth Plan
              </span>
              <span className="text-xs text-zinc-400">Response in &lt; 2 hours</span>
            </div>
            <form onSubmit={handleQuickStart} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5">
                <label className="block text-[11px] text-zinc-400 mb-1 font-medium text-left">Primary Service Required</label>
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-agency-orange transition-colors"
                >
                  <option value="Meta Ads (FB & IG)">Meta Ads (Facebook & Instagram)</option>
                  <option value="Google & Performance Max">Google Ads (Search & PMax)</option>
                  <option value="Lead Generation">B2B & B2C Lead Generation</option>
                  <option value="Video Editing & Reels">Reels Production & Viral Video</option>
                  <option value="Website Development">High-Converting Website</option>
                  <option value="Complete Digital Marketing">Complete Growth Management</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] text-zinc-400 mb-1 font-medium text-left">Monthly Ad Spend Range</label>
                <select
                  value={quickBudget}
                  onChange={(e) => setQuickBudget(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-agency-orange transition-colors"
                >
                  <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000 / mo</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 / mo</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 / mo</option>
                  <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000 / mo</option>
                  <option value="₹5,00,000+">₹5,00,000+ / mo (Enterprise)</option>
                </select>
              </div>

              <div className="sm:col-span-3 sm:mt-4">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow-lg shadow-agency-orange/20 hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Get Strategy</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-4xl pt-10 border-t border-white/10">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">₹45Cr+</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Client Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-agency-orange">4.2x</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Average Blended ROAS</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-agency-purple">180+</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">High-ROI Campaigns Scaled</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">98.4%</div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1">Client Retention Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

