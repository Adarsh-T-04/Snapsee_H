import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DynamicIcon } from "@/components/ui/Icon";
import { initialServices } from "@/lib/data-store";

export function ServicesSection() {
  // Showcase top 6 featured services on homepage
  const featured = initialServices.slice(0, 6);

  return (
    <section className="py-24 relative bg-agency-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-agency-orange">
              Full-Spectrum Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
              Everything Your Brand Needs <br />
              <span className="text-gradient-agency">To Scale Predictably</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-agency-orange transition-colors group"
          >
            <span>Explore All 14 Agency Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((srv) => (
            <div
              key={srv.id}
              className="card-glass rounded-2xl p-8 flex flex-col justify-between card-glass-hover relative group overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-agency-gradient transition-all duration-300"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-orange group-hover:scale-110 group-hover:bg-agency-orange/10 group-hover:border-agency-orange/30 transition-all duration-300">
                    <DynamicIcon name={srv.icon} size={24} />
                  </div>
                  {srv.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-agency-purple/10 text-agency-purple border border-agency-purple/20">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-agency-orange transition-colors">
                  {srv.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                    Key Deliverables:
                  </div>
                  {srv.deliverables.slice(0, 2).map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-agency-orange shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={`/services#${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 group-hover:text-white transition-colors"
                >
                  <span>Learn methodology & deliverables</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

