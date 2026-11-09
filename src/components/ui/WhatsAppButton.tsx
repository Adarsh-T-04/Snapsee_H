"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Hide in admin dashboard
  if (pathname.startsWith("/admin")) return null;

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919695478967";
  const defaultMessage = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE || 
    "Hi Snapsee Agency team! I want to grow my business and would like to discuss digital advertising packages."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-agency-darker/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with our growth directors
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageCircle size={28} className="fill-white/20" />
      </a>
    </div>
  );
}

