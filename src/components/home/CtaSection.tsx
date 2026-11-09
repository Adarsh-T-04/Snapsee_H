import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-agency-darker">
      <div className="absolute inset-0 bg-agency-gradient-subtle pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-8">
          <Sparkles size={14} /> Ready to Dominate Your Category?
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
          Stop Wasting Ad Spend. <br />
          <span className="text-gradient-agency">Start Scaling Predictably.</span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Book a 30-minute growth diagnostic with our senior strategists. We will analyze your funnel, map competitor leaks, and deliver a tailored growth blueprint.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-agency-gradient text-white text-base font-bold shadow-2xl shadow-agency-orange/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Claim Your Free Strategy Call</span>
            <ArrowRight size={18} />
          </Link>

          <a
            href="https://wa.me/919695478967"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-base font-semibold shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-agency-orange" />
            <span>Zero obligation audit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-agency-orange" />
            <span>Response within 2 hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-agency-orange" />
            <span>100% Account Data Confidentiality</span>
          </div>
        </div>
      </div>
    </section>
  );
}

