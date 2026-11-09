"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  UserCheck, 
  Trash2, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  X,
  Phone,
  Mail,
  Send,
  Plus
} from "lucide-react";
import { EnquiryItem, EnquiryStatus } from "@/types";
import { formatDate } from "@/lib/utils";

function AdminEnquiriesInner() {
  const searchParams = useSearchParams();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [newNote, setNewNote] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = `/api/admin/enquiries?status=${statusFilter}&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);

        // If ID passed in query param, open it
        const queryId = searchParams.get("id");
        if (queryId) {
          const match = data.enquiries.find((e: EnquiryItem) => e.id === queryId);
          if (match) setSelectedEnquiry(match);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, assignedToName: assigneeName || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? data.enquiry : e))
        );
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry(data.enquiry);
        }
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedNotes = [...(selectedEnquiry.notes || []), data.note];
        const updated = { ...selectedEnquiry, notes: updatedNotes };
        setSelectedEnquiry(updated);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? updated : e))
        );
        setNewNote("");
      }
    } catch (err) {
      console.error("Note failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statuses: { label: string; value: EnquiryStatus | "ALL" }[] = [
    { label: "All Stages", value: "ALL" },
    { label: "New Leads", value: "NEW" },
    { label: "Contacted", value: "CONTACTED" },
    { label: "Meeting Scheduled", value: "MEETING_SCHEDULED" },
    { label: "Proposal Sent", value: "PROPOSAL_SENT" },
    { label: "Negotiation", value: "NEGOTIATION" },
    { label: "Converted", value: "CONVERTED" },
    { label: "Rejected", value: "REJECTED" },
  ];

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
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Enquiry CRM &amp; Lead Manager
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track inquiries, update sales pipeline stages, assign strategists, and log internal notes.
          </p>
        </div>

        <a
          href="/api/admin/enquiries?format=csv"
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <Download size={14} />
          <span>Export All to CSV</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-glass rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, client name, business, email..."
            className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st.value
                  ? "bg-agency-gradient text-white shadow-md shadow-agency-orange/20"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* CRM Main Grid (Table & Detail Drawer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column */}
        <div className={`${selectedEnquiry ? "lg:col-span-7" : "lg:col-span-12"} card-glass rounded-2xl border border-white/10 overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400">
                  <th className="py-3 px-3.5 font-bold">ID</th>
                  <th className="py-3 px-3.5 font-bold">Prospect</th>
                  <th className="py-3 px-3.5 font-bold">Budget &amp; Plan</th>
                  <th className="py-3 px-3.5 font-bold">Stage</th>
                  <th className="py-3 px-3.5 font-bold">Contact</th>
                  <th className="py-3 px-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      No enquiries found matching criteria.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`cursor-pointer transition-colors ${
                        selectedEnquiry?.id === enq.id ? "bg-agency-orange/10" : "hover:bg-white/5"
                      }`}
                    >
                      <td className="py-3.5 px-3.5 font-mono font-bold text-white">
                        {enq.id}
                      </td>
                      <td className="py-3.5 px-3.5">
                        <div className="font-bold text-white">{enq.fullName}</div>
                        <div className="text-[11px] text-zinc-400">{enq.businessName}</div>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <div className="text-emerald-400 font-semibold">{enq.monthlyBudget}</div>
                        <div className="text-[10px] text-zinc-400">{enq.interestedPlan || "Custom Scope"}</div>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(enq.status)}`}>
                          {enq.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className="uppercase text-[10px] font-bold text-zinc-400">
                          {enq.preferredContact}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnquiry(enq);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-agency-orange text-white text-[11px] font-bold transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Detailed Drawer Column */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 card-glass rounded-2xl p-6 border border-agency-orange/30 space-y-6 relative animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-agency-orange bg-agency-orange/10 px-2 py-0.5 rounded">
                  {selectedEnquiry.id}
                </span>
                <span className="text-[11px] text-zinc-500">
                  Received {formatDate(selectedEnquiry.createdAt)}
                </span>
              </div>
              <h2 className="text-xl font-black text-white">{selectedEnquiry.fullName}</h2>
              <div className="text-xs text-zinc-300 font-medium">
                {selectedEnquiry.businessName} • {selectedEnquiry.industry}
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-colors"
              >
                <Phone size={14} className="text-agency-orange" />
                <span>Call Client</span>
              </a>
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Snapsee%20Growth%20Proposal%20[${selectedEnquiry.id}]`}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-colors"
              >
                <Mail size={14} className="text-agency-purple" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Stage Selector */}
            <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                Update Pipeline Status:
              </label>
              <select
                disabled={updating}
                value={selectedEnquiry.status}
                onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                className="w-full bg-black/80 border border-white/15 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-agency-orange"
              >
                <option value="NEW">NEW LEAD</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="MEETING_SCHEDULED">MEETING SCHEDULED</option>
                <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                <option value="NEGOTIATION">NEGOTIATION</option>
                <option value="CONVERTED">CONVERTED (WON)</option>
                <option value="REJECTED">REJECTED (LOST)</option>
              </select>
            </div>

            {/* Brief Specification */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Services Requested:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedEnquiry.servicesRequired.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Project Goals &amp; Brief:</span>
                <p className="text-zinc-200 leading-relaxed text-xs">
                  {selectedEnquiry.projectDetails}
                </p>
              </div>

              {selectedEnquiry.websiteUrl && (
                <div className="text-[11px]">
                  <span className="text-zinc-400">Website: </span>
                  <a href={selectedEnquiry.websiteUrl} target="_blank" className="text-agency-orange underline">
                    {selectedEnquiry.websiteUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Internal Notes CRM Log */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Internal Team Notes ({selectedEnquiry.notes?.length || 0})
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                  selectedEnquiry.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-black/60 border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500">
                        <strong className="text-agency-orange">{note.authorName}</strong>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-zinc-300">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] text-zinc-500 italic">No notes logged yet.</div>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal call note or follow-up..."
                  className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-agency-orange"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-agency-gradient text-white text-xs font-bold shadow hover:opacity-95 shrink-0"
                >
                  <Send size={13} />
                </button>
              </form>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Lead Record</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-zinc-400">Loading lead manager...</div>}>
      <AdminEnquiriesInner />
    </Suspense>
  );
}
