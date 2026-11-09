"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Save, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { PricingPlanItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPlans(data.plans);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePriceChange = (id: string, newPrice: number) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, price: newPrice } : p)));
  };

  const handleTaglineChange = (id: string, newTagline: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, tagline: newTagline } : p)));
  };

  const handleTogglePopular = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, isPopular: !p.isPopular } : p)));
  };

  const handleSave = async (plan: PricingPlanItem) => {
    try {
      setSavingId(plan.id);
      setFeedback(null);
      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: plan.id,
          price: plan.price,
          tagline: plan.tagline,
          isPopular: plan.isPopular,
          isActive: plan.isActive,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`Saved changes for ${plan.name}`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      setFeedback("Failed to update pricing plan");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-zinc-400 text-sm">Loading pricing plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Manage Pricing &amp; Plans
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Update package prices, taglines, and featured badges. Changes take effect on the live website immediately.
          </p>
        </div>

        {feedback && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card-glass rounded-3xl p-6 border space-y-6 flex flex-col justify-between ${
              plan.isPopular ? "border-agency-orange" : "border-white/10"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white">{plan.name}</h2>
                <button
                  type="button"
                  onClick={() => handleTogglePopular(plan.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                    plan.isPopular
                      ? "bg-agency-orange text-white"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  {plan.isPopular ? "★ Popular" : "Set Popular"}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Monthly Retainer Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => handlePriceChange(plan.id, Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/15 rounded-xl pl-8 pr-4 py-2.5 text-base font-black text-white focus:outline-none focus:border-agency-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Plan Tagline / Value Proposition
                </label>
                <textarea
                  rows={2}
                  value={plan.tagline}
                  onChange={(e) => handleTaglineChange(plan.id, e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-agency-orange"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Inclusions ({plan.features.length} Features):
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {plan.features.map((f, i) => (
                    <div
                      key={i}
                      className="text-[11px] p-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-zinc-300"
                    >
                      <span className={f.isIncluded ? "text-zinc-200" : "text-zinc-500 line-through"}>
                        {f.featureText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                disabled={savingId === plan.id}
                onClick={() => handleSave(plan)}
                className="w-full py-3 rounded-xl bg-agency-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-agency-orange/20 hover:opacity-95 flex items-center justify-center gap-1.5"
              >
                <Save size={14} />
                <span>{savingId === plan.id ? "Saving..." : "Save Plan Changes"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

