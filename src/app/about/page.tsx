import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Zap, 
  Award, 
  Users, 
  TrendingUp 
} from "lucide-react";
import { agencyTeamMembers, agencyAchievements } from "@/lib/data-store";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-6">
            <Sparkles size={14} /> The Agency Behind High-Growth Scaleups
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            We Are Growth Architects, <br />
            <span className="text-gradient-agency">Not Just Media Buyers</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Snapsee was founded on a simple premise: modern brands don&apos;t need vanity marketing. They need mathematically disciplined media buying, thumb-stopping creative production, and full-funnel CRO.
          </p>
        </div>
      </section>

      {/* Achievements Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-glass rounded-3xl p-8 sm:p-12 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {agencyAchievements.map((ach, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-white text-gradient-agency">
                {ach.number}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 font-medium">
                {ach.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-agency-orange/10 text-agency-orange border border-agency-orange/20 flex items-center justify-center">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-black text-white">Our Mission</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              To empower ambitious businesses to unlock predictable, high-ROAS revenue scaling without wasting capital on vanity impressions or unscientific ad spend.
            </p>
          </div>

          <div className="card-glass rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-agency-purple/10 text-agency-purple border border-agency-purple/20 flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-black text-white">Our Vision</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              To set the global benchmark for creative performance marketing by fusing scientific data attribution with cinematic storytelling and sub-second web engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24" id="team">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-agency-purple">
            Leadership &amp; Talent
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Meet Our Core Strategists
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            Seasoned practitioners who have led growth across top consumer brands and fast-scaling tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencyTeamMembers.map((member) => (
            <div
              key={member.id}
              className="card-glass rounded-3xl p-6 text-center card-glass-hover flex flex-col items-center justify-between"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-agency-gradient flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-agency-orange/20 mb-4 mx-auto">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <div className="text-xs font-semibold text-agency-orange mt-1">
                  {member.role}
                </div>
                <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Work With Us CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="rounded-3xl card-glass p-10 sm:p-14 border border-agency-orange/20 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Ready to partner with a team that treats your ad budget like our own?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
            Let&apos;s evaluate your current growth bottlenecks and unlock your brand&apos;s next revenue phase.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-agency-gradient text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-agency-orange/25"
            >
              Start Your Project With Us
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
            >
              View Monthly Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

