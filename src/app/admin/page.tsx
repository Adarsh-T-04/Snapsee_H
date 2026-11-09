"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Inbox, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  ArrowUpRight, 
  Clock, 
  Layers, 
  Download,
  AlertCircle,
  Plus
} from "lucide-react";
import { DashboardStats, EnquiryItem, EnquiryStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Failed to load stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "CONTACTED":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "MEETING_SCHEDULED":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "PROPOSAL_SENT":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "NEGOTIATION":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "CONVERTED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "REJECTED":
        return "bg-zinc-700 text-zinc-400 border-zinc-600";
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-zinc-400 text-sm">
        Loading agency executive dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-24 text-center text-red-400 text-sm">
        Failed to load dashboard metrics.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Agency Performance Overview
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time pipeline metrics, monthly recurring revenue, and lead conversions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/enquiries?format=csv"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </a>

          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow-lg shadow-agency-orange/20 hover:opacity-95 flex items-center gap-1.5"
          >
            <span>Manage Enquiries</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Enquiries */}
        <div className="card-glass rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Total Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-agency-orange/10 text-agency-orange flex items-center justify-center">
              <Inbox size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats.totalEnquiries}</div>
          <div className="text-[11px] text-agency-orange font-semibold flex items-center gap-1">
            <span>{stats.newEnquiries} unprocessed new leads</span>
          </div>
        </div>

        {/* Converted Clients */}
        <div className="card-glass rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Converted Retainers
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats.convertedClients}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>{stats.conversionRate} Close Rate</span>
          </div>
        </div>

        {/* Monthly Retainer Revenue */}
        <div className="card-glass rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Monthly Active MRR
            </span>
            <div className="w-8 h-8 rounded-lg bg-agency-purple/10 text-agency-purple flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {formatCurrency(stats.monthlyRevenue)}
          </div>
          <div className="text-[11px] text-zinc-400">
            Across active agency contracts
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="card-glass rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Active Client Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats.activeProjects}</div>
          <div className="text-[11px] text-zinc-400">
            Performance &amp; web projects
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead Source Breakdown */}
        <div className="lg:col-span-5 card-glass rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Enquiry Channel Attribution
          </h2>
          <div className="space-y-3 pt-2">
            {stats.leadSourceBreakdown.map((src, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>{src.source}</span>
                  <span className="font-bold text-white">{src.count} leads</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-agency-gradient h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (src.count / stats.totalEnquiries) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Pipeline Breakdown */}
        <div className="lg:col-span-7 card-glass rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Sales Pipeline Stages
            </h2>
            <Link href="/admin/enquiries" className="text-xs text-agency-orange hover:underline font-semibold">
              Open Full CRM →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {stats.statusBreakdown.map((item) => (
              <div
                key={item.status}
                className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1"
              >
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                  {item.status.replace("_", " ")}
                </div>
                <div className="text-xl font-black text-white">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="card-glass rounded-2xl border border-white/10 overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Inbound Enquiries</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Latest business requests awaiting contact</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-agency-orange hover:underline"
          >
            View All ({stats.totalEnquiries}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="py-3 px-3 font-semibold">ID</th>
                <th className="py-3 px-3 font-semibold">Client / Business</th>
                <th className="py-3 px-3 font-semibold">Budget</th>
                <th className="py-3 px-3 font-semibold">Interested Plan</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Submitted</th>
                <th className="py-3 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {stats.recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-white">{enq.id}</td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">{enq.fullName}</div>
                    <div className="text-[11px] text-zinc-400">{enq.businessName}</div>
                  </td>
                  <td className="py-3.5 px-3 text-emerald-400 font-semibold">{enq.monthlyBudget}</td>
                  <td className="py-3.5 px-3 text-zinc-200">{enq.interestedPlan || "Custom"}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      {enq.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-400">{formatDate(enq.createdAt)}</td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href={`/admin/enquiries?id=${enq.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-agency-orange text-white text-[11px] font-bold transition-colors"
                    >
                      Inspect Lead
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

