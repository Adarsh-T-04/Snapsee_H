"use client";

import React, { useState, useEffect } from "react";
import { Layers, Save, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { ServiceItem } from "@/types";
import { DynamicIcon } from "@/components/ui/Icon";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setServices(data.services);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTitleChange = (id: string, val: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, title: val } : s)));
  };

  const handleDescChange = (id: string, val: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, shortDesc: val } : s)));
  };

  const handleBadgeChange = (id: string, val: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, badge: val } : s)));
  };

  const handleToggleActive = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)));
  };

  const handleSave = async (service: ServiceItem) => {
    try {
      setSavingId(service.id);
      setFeedback(null);
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: service.id,
          title: service.title,
          shortDesc: service.shortDesc,
          badge: service.badge || null,
          isActive: service.isActive,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`Saved changes for ${service.title}`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      setFeedback("Failed to update service");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-zinc-400 text-sm">Loading agency services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Manage Agency Services
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Edit service copy, badges, and toggle active visibility across the public website.
          </p>
        </div>

        {feedback && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`card-glass rounded-3xl p-6 border space-y-4 flex flex-col justify-between ${
              srv.isActive ? "border-white/10" : "border-zinc-800 opacity-60"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-orange">
                    <DynamicIcon name={srv.icon} size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-agency-orange uppercase tracking-wider">
                      #{srv.displayOrder}
                    </span>
                    <div className="text-xs text-zinc-400 font-mono">{srv.slug}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleActive(srv.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                    srv.isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  {srv.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{srv.isActive ? "Active" : "Hidden"}</span>
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={srv.title}
                  onChange={(e) => handleTitleChange(srv.id, e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-agency-orange"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Promotional Badge (optional)
                </label>
                <input
                  type="text"
                  value={srv.badge || ""}
                  onChange={(e) => handleBadgeChange(srv.id, e.target.value)}
                  placeholder="e.g. Highest ROI, Trending, Flagship"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-agency-orange"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={srv.shortDesc}
                  onChange={(e) => handleDescChange(srv.id, e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-agency-orange"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end">
              <button
                type="button"
                disabled={savingId === srv.id}
                onClick={() => handleSave(srv)}
                className="px-4 py-2 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow hover:opacity-95 flex items-center gap-1.5"
              >
                <Save size={13} />
                <span>{savingId === srv.id ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

