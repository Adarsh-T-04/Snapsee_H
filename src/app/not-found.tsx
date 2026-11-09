import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-agency-dark flex items-center justify-center px-4 py-24 text-center">
      <div className="card-glass rounded-3xl p-10 sm:p-16 max-w-lg border border-white/10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-agency-gradient flex items-center justify-center font-black text-2xl text-white shadow-2xl mx-auto">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The campaign or page you are looking for has been relocated or does not exist. Let&apos;s get you back on track to scale your business.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-agency-gradient text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-agency-orange/20"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

