import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-8"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </Link>

        <div className="card-glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-agency-purple">
              Data Privacy &amp; Security
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Compliant with DPDP Act 2023 &amp; Global Privacy Standards • Snapsee Advertising Agency
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
              <p>
                When you submit an enquiry on our website or communicate with us, we collect information including your name, company name, email address, phone number, website URL, estimated marketing budgets, and project specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to prepare tailored growth proposals, schedule strategic consultations, and provide agreed agency services. We never sell, rent, or monetize your contact or business data to third-party brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Cookies &amp; Pixel Tracking</h2>
              <p>
                We utilize standard analytical cookies (Google Analytics 4) and advertising conversion pixels (Meta Pixel) to understand traffic patterns and measure ad campaign effectiveness. You may disable cookies via your browser settings at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Data Storage &amp; Encryption</h2>
              <p>
                All enquiry records are stored in secure, encrypted PostgreSQL databases with role-based access limits. Only authorized agency directors and account managers can review lead details.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Your Data Rights</h2>
              <p>
                You may request access to, correction of, or permanent deletion of your enquiry data at any time by sending an email to <a href="mailto:privacy@snapsee.com" className="text-agency-orange underline">privacy@snapsee.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

