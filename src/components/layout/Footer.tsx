"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-agency-darker border-t border-white/10 pt-20 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-agency-card to-[#1a1429] border border-white/10 p-8 md:p-12 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-agency-orange/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agency-orange/10 text-agency-orange border border-agency-orange/20 mb-3">
                <ShieldCheck size={13} /> High-ROI Agency Insights
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Get monthly growth playbooks used to generate ₹45Cr+
              </h3>
              <p className="mt-2 text-zinc-400 text-sm max-w-xl">
                Zero spam. Only actionable creative testing frameworks, ad algorithms teardowns, and high-converting marketing strategies.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 size={18} />
                  <span>You are subscribed! Check your inbox for our Q4 growth guide.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="flex-1 bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-agency-gradient text-white text-sm font-bold shadow-lg shadow-agency-orange/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{loading ? "Joining..." : "Subscribe"}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-agency-gradient flex items-center justify-center font-black text-white text-xl shadow-lg">
                S
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                SNAPSEE
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              We don&apos;t just run ads. We build brands that grow. From performance marketing and viral reels to full-funnel CRO and high-converting websites.
            </p>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-agency-orange" />
                <span>Cyber City Hub, Gurugram / Mumbai / Bangalore</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-agency-purple" />
                <a
                  href="mailto:snapsee@snapseeh.site"
                  className="hover:text-white transition-colors"
                >
                  snapsee@snapseeh.site
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400" />
                <a href="tel:+919695478967" className="hover:text-white">+91 96954 78967</a>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#meta-ads" className="hover:text-agency-orange transition-colors">Meta Ads (FB & IG)</Link></li>
              <li><Link href="/services#google-ads" className="hover:text-agency-orange transition-colors">Google & PMax Ads</Link></li>
              <li><Link href="/services#lead-generation" className="hover:text-agency-orange transition-colors">B2B Lead Generation</Link></li>
              <li><Link href="/services#video-editing-reels" className="hover:text-agency-orange transition-colors">Reels & Viral Video</Link></li>
              <li><Link href="/services#search-engine-optimization" className="hover:text-agency-orange transition-colors">SEO & Content Growth</Link></li>
              <li><Link href="/services#website-development" className="hover:text-agency-orange transition-colors">High-Converting Web Dev</Link></li>
              <li><Link href="/services" className="text-agency-orange font-semibold flex items-center gap-1 hover:underline">View All 14 Services →</Link></li>
            </ul>
          </div>

          {/* Pricing & Work */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Packages & Work
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/pricing#starter" className="hover:text-agency-orange transition-colors">Starter Plan (₹9,999/mo)</Link></li>
              <li><Link href="/pricing#growth" className="hover:text-agency-orange transition-colors">Growth Plan (₹19,999/mo)</Link></li>
              <li><Link href="/pricing#premium" className="hover:text-agency-orange transition-colors">Premium Plan (₹39,999/mo)</Link></li>
              <li><Link href="/pricing#compare" className="hover:text-agency-orange transition-colors">Plan Comparison Table</Link></li>
              <li><Link href="/portfolio" className="hover:text-agency-orange transition-colors">Case Studies & Metrics</Link></li>
              <li><Link href="/contact" className="hover:text-agency-orange transition-colors">Custom Retainer Quote</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Our Agency</Link></li>
              <li><Link href="/about#team" className="hover:text-white transition-colors">Leadership & Team</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Agency FAQs</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/admin/login" className="text-xs text-zinc-500 hover:text-zinc-300">Admin Portal Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Snapsee Advertising Agency Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-400">18% GST Applicable</span>
            <span>•</span>
            <span className="text-zinc-400">Ad Spends Billed Directly to Platforms</span>
            <span>•</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-agency-orange transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="hover:text-agency-purple transition-colors" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="YouTube"><Youtube size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

