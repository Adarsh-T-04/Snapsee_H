"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { trackConversionEvent } from "@/components/ui/Analytics";

function ContactFormInner() {
  const searchParams = useSearchParams();

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [industry, setIndustry] = useState("D2C & E-Commerce");
  const [servicesRequired, setServicesRequired] = useState<string[]>([]);
  const [interestedPlan, setInterestedPlan] = useState("Growth Plan (₹19,999/mo)");
  const [monthlyBudget, setMonthlyBudget] = useState("₹1,00,000 - ₹2,50,000");
  const [projectDetails, setProjectDetails] = useState("");
  const [preferredContact, setPreferredContact] = useState<"whatsapp" | "email" | "phone">("whatsapp");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-fill from query parameters
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");
    const budgetParam = searchParams.get("budget");

    if (serviceParam) {
      setServicesRequired([serviceParam]);
    }
    if (planParam) {
      setInterestedPlan(planParam);
    }
    if (budgetParam) {
      setMonthlyBudget(budgetParam);
    }
  }, [searchParams]);

  const availableServices = [
    "Social Media Marketing",
    "Meta Ads (Facebook & Instagram)",
    "Google Ads (Search & PMax)",
    "Search Engine Optimization (SEO)",
    "Website Development",
    "Branding & Identity Design",
    "Graphic Design",
    "Video Editing & Reels Production",
    "Content Marketing",
    "Influencer Marketing",
    "Lead Generation",
    "Performance Marketing",
    "Marketing Automation",
    "Complete Digital Marketing Management",
  ];

  const handleServiceToggle = (srv: string) => {
    if (servicesRequired.includes(srv)) {
      setServicesRequired(servicesRequired.filter((s) => s !== srv));
    } else {
      setServicesRequired([...servicesRequired, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !businessName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in all mandatory contact information.");
      return;
    }
    if (servicesRequired.length === 0) {
      setErrorMessage("Please select at least one service you are interested in.");
      return;
    }
    if (projectDetails.trim().length < 10) {
      setErrorMessage("Please provide a brief description of your marketing objectives (at least 10 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          businessName,
          email,
          phone,
          websiteUrl,
          industry,
          servicesRequired,
          interestedPlan,
          monthlyBudget,
          projectDetails,
          preferredContact,
          honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessId(data.enquiryId);
        trackConversionEvent("generate_lead", {
          value: monthlyBudget,
          currency: "INR",
          enquiry_id: data.enquiryId,
        });
      } else {
        setErrorMessage(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your connection or reach us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Direct Contact & Agency Guarantees */}
      <div className="lg:col-span-4 space-y-8">
        <div className="card-glass rounded-3xl p-8 border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white">Direct Communication</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Prefer immediate conversation? Speak directly with our founding directors or marketing strategists.
          </p>

          <div className="space-y-4 pt-2 text-sm text-zinc-300">
            <a
              href="https://wa.me/919695478967"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle size={20} />
              <div>
                <div className="text-xs text-zinc-400">Chat on WhatsApp</div>
                <div className="font-bold text-white">+91 96954 78967</div>
              </div>
            </a>

            <a
              href="tel:+919695478967"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Phone size={20} className="text-agency-orange" />
              <div>
                <div className="text-xs text-zinc-400">Direct Phone Line</div>
                <div className="font-bold text-white">+91 96954 78967</div>
              </div>
            </a>

            <a
              href="mailto:adarshtripathi969@gmail.com"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Mail size={20} className="text-agency-purple" />
              <div>
                <div className="text-xs text-zinc-400">Official Inquiries</div>
                <div className="font-bold text-white">adarshtripathi969@gmail.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* Our Commitments */}
        <div className="card-glass rounded-3xl p-8 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            The Snapsee Guarantee
          </h2>
          <div className="space-y-3 text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <Clock size={16} className="text-agency-orange shrink-0 mt-0.5" />
              <span>Guaranteed callback or proposal dispatch in &lt; 4 hours</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-agency-purple shrink-0 mt-0.5" />
              <span>Strict NDA and client financial data confidentiality</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Transparent ad spend billing with 100% account ownership</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Complete 11-Field Enquiry Form */}
      <div className="lg:col-span-8">
        <div className="card-glass rounded-3xl p-8 sm:p-12 border border-white/10 relative">
          {successId ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
                  Thank you, <strong className="text-white">{fullName}</strong>! We have dispatched a confirmation email to <strong className="text-white">{email}</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 max-w-md mx-auto text-left space-y-2">
                <div className="text-xs text-zinc-400">Unique Reference Tracking ID:</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {successId}
                </div>
                <div className="text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                  Our strategists are analyzing your market landscape and will reach out via <strong className="text-white uppercase">{preferredContact}</strong> shortly.
                </div>
              </div>

              <button
                onClick={() => {
                  setSuccessId(null);
                  setProjectDetails("");
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Anti-spam honeypot (hidden from view) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Section 1: Contact Details */}
              <div>
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-agency-orange mb-4">
                  1. Contact &amp; Business Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      1. Full Name <span className="text-agency-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aryan Sehgal"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      2. Company / Business Name <span className="text-agency-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Sehgal Botanicals Pvt Ltd"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      3. Work Email Address <span className="text-agency-orange">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aryan@company.com"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      4. Phone Number <span className="text-agency-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      5. Website URL <span className="text-zinc-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourbrand.com"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      6. Industry
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-agency-orange transition-colors"
                    >
                      <option value="D2C & E-Commerce">D2C &amp; E-Commerce</option>
                      <option value="Real Estate & Luxury Housing">Real Estate &amp; Luxury Housing</option>
                      <option value="B2B & SaaS">B2B &amp; SaaS</option>
                      <option value="Healthcare & Wellness">Healthcare &amp; Wellness</option>
                      <option value="Finance & FinTech">Finance &amp; FinTech</option>
                      <option value="Food & Beverages / Cafe">Food &amp; Beverages / Cafe</option>
                      <option value="Education & EdTech">Education &amp; EdTech</option>
                      <option value="Professional Services">Legal / Professional Services</option>
                      <option value="Other">Other Industry</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Services Selection (Multi-select) */}
              <div className="pt-6 border-t border-white/10">
                <label className="block text-xs uppercase font-extrabold tracking-wider text-agency-purple mb-2">
                  7. Services Required (Select all that apply) <span className="text-agency-orange">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  {availableServices.map((srv) => {
                    const isSelected = servicesRequired.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => handleServiceToggle(srv)}
                        className={`p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-agency-orange/15 border-agency-orange text-white shadow-md shadow-agency-orange/10"
                            : "bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <span>{srv}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            isSelected
                              ? "border-agency-orange bg-agency-orange text-white"
                              : "border-zinc-600"
                          }`}
                        >
                          {isSelected && <CheckCircle2 size={12} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Package, Budget, and Details */}
              <div className="pt-6 border-t border-white/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      8. Interested Pricing Plan
                    </label>
                    <select
                      value={interestedPlan}
                      onChange={(e) => setInterestedPlan(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-agency-orange transition-colors"
                    >
                      <option value="Starter Plan (₹9,999/mo)">Starter Plan – ₹9,999/month</option>
                      <option value="Growth Plan (₹19,999/mo)">Growth Plan – ₹19,999/month (Recommended)</option>
                      <option value="Premium Plan (₹39,999/mo)">Premium Plan – ₹39,999/month</option>
                      <option value="Custom Scope Retainer">Custom Scope Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      9. Monthly Marketing Ad Budget <span className="text-agency-orange">*</span>
                    </label>
                    <select
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-agency-orange transition-colors"
                    >
                      <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000 / month</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 / month</option>
                      <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 / month</option>
                      <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000 / month</option>
                      <option value="₹5,00,000+ (Scaleup)">₹5,00,000+ / month (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    10. Project Description &amp; Targets <span className="text-agency-orange">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Tell us about your product, current marketing bottlenecks, target ROAS/CPL, and key objectives..."
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agency-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    11. Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {(["whatsapp", "email", "phone"] as const).map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-medium uppercase tracking-wider transition-colors ${
                          preferredContact === method
                            ? "bg-agency-orange/15 border-agency-orange text-white"
                            : "bg-black/30 border-white/10 text-zinc-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          checked={preferredContact === method}
                          onChange={() => setPreferredContact(method)}
                          className="accent-agency-orange"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-agency-gradient text-white text-sm font-extrabold uppercase tracking-wider shadow-2xl shadow-agency-orange/30 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Validating &amp; Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Your Enquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-3">
                  By submitting, you agree to our terms. We will never share your contact details.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 bg-agency-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agency-orange/10 border border-agency-orange/30 text-xs font-bold text-agency-orange mb-4">
            <Sparkles size={14} /> Start Your Growth Transformation
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Let&apos;s Build Something <br />
            <span className="text-gradient-agency">Extraordinary Together</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Tell us about your business goals and marketing hurdles. We will analyze your funnel and get back with a tailored roadmap within 2-4 hours.
          </p>
        </div>

        <Suspense fallback={<div className="py-24 text-center text-zinc-400">Loading form...</div>}>
          <ContactFormInner />
        </Suspense>
      </div>
    </div>
  );
}
