import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsPage() {
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
            <span className="text-xs font-bold uppercase tracking-widest text-agency-orange">
              Legal Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Agency Terms &amp; Conditions
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Last updated: November 2026 • Snapsee Advertising Agency Pvt. Ltd.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Scope of Retainer Services</h2>
              <p>
                Snapsee provides digital marketing, media buying, creative production, SEO, and website development services based on the specific deliverables outlined in your selected monthly package or custom statement of work (SOW).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Direct Advertising Spend &amp; Accounts</h2>
              <p>
                All advertising spend across Meta, Google, LinkedIn, YouTube, and other media networks is paid directly by the Client to the respective platform providers. The Client retains 100% continuous ownership and administrative access to their advertising accounts, business managers, and pixel assets at all times.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Retainer Fees &amp; GST Compliance</h2>
              <p>
                Agency retainer fees are billed monthly in advance. Applicable Goods and Services Tax (GST at 18%) is levied on all agency invoices in accordance with Government regulations. Complete GST tax invoices will be dispatched upon receipt of fee clearance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Confidentiality &amp; Proprietary Data (NDA)</h2>
              <p>
                Snapsee maintains strict confidentiality regarding the Client&apos;s trade secrets, unit margins, customer lists, and financial records. Neither party shall disclose proprietary information without prior written consent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Intellectual Property &amp; Creative Ownership</h2>
              <p>
                Upon receipt of full payment for the applicable billing period, all custom creative graphics, ad copy, video edits, and custom landing page code created specifically for the Client become the exclusive property of the Client.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">6. Performance &amp; Guarantees Disclaimer</h2>
              <p>
                While Snapsee employs battle-tested media buying frameworks and rigorous conversion optimization, advertising outcomes are influenced by third-party platform algorithm updates, market competition, seasonality, and Client product-market fit. Agency fees are for services rendered and media management labor.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

