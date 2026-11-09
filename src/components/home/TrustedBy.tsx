import React from "react";

export function TrustedBy() {
  const brands = [
    { name: "AURA LUXE", category: "D2C Luxury" },
    { name: "IMPERIAL REALTY", category: "High-Ticket Real Estate" },
    { name: "KOBLE TECH", category: "B2B SaaS" },
    { name: "VELVET ROASTERS", category: "F&B Specialty" },
    { name: "ZENITH WEALTH", category: "Fintech App" },
    { name: "URBANSNACK", category: "E-Commerce" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-agency-darker/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-8">
          Trusted by ambitious founders, CMOs, and venture-backed scaleups
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-black text-sm tracking-wider text-zinc-300 hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-[10px] text-zinc-600 uppercase tracking-tight mt-0.5">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

