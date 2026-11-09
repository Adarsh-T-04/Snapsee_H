"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("snapsee_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("snapsee_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
      <div className="p-4 rounded-2xl bg-agency-card/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-agency-orange">
            <Cookie size={18} />
            <span className="text-sm font-bold text-white">Privacy & Analytics</span>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          We use essential analytics and campaign pixels to measure ad performance and improve your browsing experience. By continuing, you agree to our{" "}
          <Link href="/privacy" className="text-agency-orange underline">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={acceptConsent}
            className="px-4 py-1.5 rounded-lg bg-agency-gradient text-xs font-bold text-white shadow-md hover:opacity-90"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

