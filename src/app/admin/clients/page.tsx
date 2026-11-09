"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  PauseCircle, 
  ExternalLink,
  Mail,
  Phone,
  Search,
  X
} from "lucide-react";
import { ClientItem, ClientStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Client Form
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [packageName, setPackageName] = useState("Growth Plan");
  const [monthlyRetainer, setMonthlyRetainer] = useState(19999);
  const [status, setStatus] = useState<ClientStatus>("ACTIVE");
  const [notes, setNotes] = useState("");

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          website,
          packageName,
          monthlyRetainer,
          status,
          notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setClients([data.client, ...clients]);
        setShowAddModal(false);
        // Reset
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setWebsite("");
        setNotes("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (st: ClientStatus) => {
    switch (st) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "ONBOARDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "PAUSED":
        return "bg-zinc-700 text-zinc-300 border-zinc-600";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  const totalMRR = clients
    .filter((c) => c.status === "ACTIVE")
    .reduce((sum, c) => sum + c.monthlyRetainer, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Client Retainers &amp; Accounts
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Active monthly client contracts, payment retainers, and status tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow-lg shadow-agency-orange/20 hover:opacity-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card-glass rounded-2xl p-6 border border-white/10">
          <div className="text-xs uppercase font-bold text-zinc-400">Total Active Clients</div>
          <div className="text-3xl font-black text-white mt-1">
            {clients.filter((c) => c.status === "ACTIVE").length}
          </div>
        </div>

        <div className="card-glass rounded-2xl p-6 border border-white/10">
          <div className="text-xs uppercase font-bold text-zinc-400">Active Monthly MRR</div>
          <div className="text-3xl font-black text-gradient-agency mt-1">
            {formatCurrency(totalMRR)}
          </div>
        </div>

        <div className="card-glass rounded-2xl p-6 border border-white/10">
          <div className="text-xs uppercase font-bold text-zinc-400">Clients in Onboarding</div>
          <div className="text-3xl font-black text-amber-400 mt-1">
            {clients.filter((c) => c.status === "ONBOARDING").length}
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card-glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-zinc-400">
                <th className="py-3 px-4 font-bold">Client / Company</th>
                <th className="py-3 px-4 font-bold">Package Name</th>
                <th className="py-3 px-4 font-bold">Monthly Retainer</th>
                <th className="py-3 px-4 font-bold">Contract Status</th>
                <th className="py-3 px-4 font-bold">Joined On</th>
                <th className="py-3 px-4 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No active clients registered. Click &quot;Add New Client&quot; above.
                  </td>
                </tr>
              ) : (
                clients.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{c.company}</div>
                      <div className="text-[11px] text-zinc-400">
                        {c.name} • {c.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">{c.packageName}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      {formatCurrency(c.monthlyRetainer)} / mo
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{formatDate(c.joinedAt)}</td>
                    <td className="py-3.5 px-4 text-[11px] text-zinc-400 max-w-xs truncate">
                      {c.notes || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-glass rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">Add New Client Contract</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                    placeholder="e.g. Velocity Fitness"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                    placeholder="e.g. Samir Sen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                    placeholder="samir@velocity.in"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                    placeholder="+91 98111 22334"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                    placeholder="Growth Plan"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Monthly Retainer (₹) *</label>
                  <input
                    type="number"
                    required
                    value={monthlyRetainer}
                    onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Account Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ClientStatus)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="ONBOARDING">ONBOARDING</option>
                  <option value="PAUSED">PAUSED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-white"
                  placeholder="Key deliverables, client targets, ad account IDs..."
                />
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
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

