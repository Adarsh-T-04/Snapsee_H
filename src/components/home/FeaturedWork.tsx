import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { initialProjects } from "@/lib/data-store";

export function FeaturedWork() {
  const featured = initialProjects.slice(0, 3);

  return (
    <section className="py-24 bg-agency-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-agency-purple">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
              Featured Case Studies &amp; <br />
              <span className="text-gradient-agency">Performance Milestones</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-agency-orange transition-colors group"
            >
              <span>View All Portfolio Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
              <AlertCircle size={12} /> Clearly identified benchmark projects
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((proj) => (
            <div
              key={proj.id}
              className="card-glass rounded-2xl overflow-hidden flex flex-col justify-between card-glass-hover group"
            >
              <div>
                {/* Project Image & Badge */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agency-card via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 text-white backdrop-blur-md border border-white/10">
                      {proj.category}
                    </span>
                  </div>
                  {proj.isDemo && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                        Demo Project
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">
                    Client: {proj.clientName}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-agency-orange transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                    {proj.objective}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    {proj.resultsMetrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-lg font-black text-white text-gradient-agency">
                          {m.metric}
                        </div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-tight mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/portfolio#${proj.slug}`}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

