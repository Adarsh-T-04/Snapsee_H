"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  TrendingUp,
  X,
  Save,
  Sparkles
} from "lucide-react";
import { ProjectItem } from "@/types";

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [category, setCategory] = useState("Meta Ads & Creative Testing");
  const [objective, setObjective] = useState("");
  const [creativeWork, setCreativeWork] = useState("");
  const [metric1, setMetric1] = useState("+320%");
  const [metric1Label, setMetric1Label] = useState("ROAS Scale");
  const [metric2, setMetric2] = useState("-42%");
  const [metric2Label, setMetric2Label] = useState("CAC Reduction");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
  const [isDemo, setIsDemo] = useState(true);
  const [caseStudy, setCaseStudy] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          clientName,
          category,
          objective,
          creativeWork,
          caseStudy,
          imageUrl,
          isDemo,
          resultsMetrics: [
            { metric: metric1, label: metric1Label },
            { metric: metric2, label: metric2Label },
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProjects([data.project, ...projects]);
        setShowAddModal(false);
        setFeedback("Project added successfully!");
        setTimeout(() => setFeedback(null), 3000);
        // Reset form
        setTitle("");
        setClientName("");
        setObjective("");
        setCreativeWork("");
        setCaseStudy("");
      }
    } catch {
      setFeedback("Failed to add project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setFeedback("Project deleted");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      setFeedback("Delete failed");
    }
  };

  const handleToggleDemo = async (project: ProjectItem) => {
    try {
      const updatedStatus = !project.isDemo;
      const res = await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, isDemo: updatedStatus }),
      });
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === project.id ? { ...p, isDemo: updatedStatus } : p)));
      }
    } catch {
      console.error("Update failed");
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-zinc-400 text-sm">Loading agency case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Manage Portfolio &amp; Case Studies
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Publish client case studies, performance metrics, and toggle Demo vs Verified Client status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedback && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>{feedback}</span>
            </div>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow-lg shadow-agency-orange/20 hover:opacity-95 flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="card-glass rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-zinc-900">
                <Image
                  src={proj.imageUrl}
                  alt={proj.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/80 text-white backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleDemo(proj)}
                  className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md transition-colors ${
                    proj.isDemo
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {proj.isDemo ? "Demo Model" : "Verified Client"}
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-[11px] font-bold text-agency-orange uppercase">
                  {proj.clientName}
                </div>
                <h2 className="text-base font-bold text-white leading-snug">{proj.title}</h2>
                <p className="text-xs text-zinc-400 line-clamp-2">{proj.objective}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  {proj.resultsMetrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-sm font-black text-white text-gradient-agency">{m.metric}</div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[10px]">{proj.id}</span>
              <button
                onClick={() => handleDelete(proj.id)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Case Study Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-glass rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">Add New Case Study</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Project / Campaign Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Aura Luxe: 4.3x ROAS Scaling"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Client / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Aura Luxe Botanicals"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                >
                  <option value="Meta Ads & Creative Testing">Meta Ads &amp; Creative Testing</option>
                  <option value="Lead Generation & Performance Marketing">Lead Generation &amp; Performance Marketing</option>
                  <option value="Google Ads & B2B SEO">Google Ads &amp; B2B SEO</option>
                  <option value="Branding & Video Reels">Branding &amp; Video Reels</option>
                  <option value="Performance Marketing">Full-Funnel Performance Marketing</option>
                  <option value="Website Development & Meta Ads">Website Development &amp; CRO</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Campaign Objective *</label>
                <textarea
                  rows={2}
                  required
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Primary challenge and goals..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Creative Work Executed *</label>
                <textarea
                  rows={2}
                  required
                  value={creativeWork}
                  onChange={(e) => setCreativeWork(e.target.value)}
                  placeholder="What was produced: hooks, UGC, search campaigns..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Metric 1 (e.g. 4.3x)</label>
                  <input
                    type="text"
                    value={metric1}
                    onChange={(e) => setMetric1(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2 text-white"
                  />
                  <input
                    type="text"
                    value={metric1Label}
                    onChange={(e) => setMetric1Label(e.target.value)}
                    placeholder="Label (e.g. Blended ROAS)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2 text-zinc-400 mt-1"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Metric 2 (e.g. -42%)</label>
                  <input
                    type="text"
                    value={metric2}
                    onChange={(e) => setMetric2(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2 text-white"
                  />
                  <input
                    type="text"
                    value={metric2Label}
                    onChange={(e) => setMetric2Label(e.target.value)}
                    placeholder="Label (e.g. CAC Reduction)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2 text-zinc-400 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDemo"
                  checked={isDemo}
                  onChange={(e) => setIsDemo(e.target.checked)}
                  className="accent-agency-orange"
                />
                <label htmlFor="isDemo" className="font-semibold text-zinc-300 cursor-pointer">
                  Mark as Demo Benchmark Model (Preserves client NDA)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agency-gradient text-white font-bold"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

