import React from "react";
import { Star, Quote, Award } from "lucide-react";
import { initialTestimonials } from "@/lib/data-store";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-agency-darker relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            What Founders &amp; CMOs Say <br />
            <span className="text-gradient-agency">About Partnering With Snapsee</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialTestimonials.map((t) => (
            <div
              key={t.id}
              className="card-glass rounded-2xl p-8 flex flex-col justify-between relative card-glass-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  {t.resultsTag && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-agency-orange/10 text-agency-orange border border-agency-orange/20 flex items-center gap-1">
                      <Award size={12} /> {t.resultsTag}
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic mb-8">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-agency-gradient flex items-center justify-center font-bold text-white text-sm">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                  <p className="text-xs text-zinc-400">
                    {t.designation}, <span className="text-zinc-300 font-medium">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

