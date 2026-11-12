import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AnalyticsScripts } from "@/components/ui/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://snapsee-agency.vercel.app"),
  verification: {
    google: 'crlWuQXBN4MPrxr6lEsdsxTnmHI9y1IK8d0db-WBXto',
  },
  title: "Snapsee | Top-Tier Digital Advertising & Performance Marketing Agency",
  description: "We don't just run ads. We build brands that grow. Performance marketing, Meta & Google Ads, viral reels, high-converting websites, and SEO scaling.",
  keywords: [
    "Digital Advertising Agency",
    "Performance Marketing",
    "Meta Ads Agency",
    "Google Ads Management",
    "Social Beat alternative",
    "Schbang quality marketing",
    "Brand Identity Design",
    "Viral Reels Production",
    "B2B Lead Generation"
  ],
  authors: [{ name: "Snapsee Advertising Agency" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://snapsee-agency.vercel.app",
    title: "Snapsee | Digital Advertising & Growth Agency",
    description: "Scale your revenue profitably with full-funnel Meta advertising, Google search, viral reels, and bespoke web apps.",
    siteName: "Snapsee Agency",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Snapsee Digital Advertising Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapsee | We Build Brands That Grow",
    description: "From strategy and creativity to performance marketing, we help businesses attract customers and scale revenue.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-agency-dark text-zinc-100 min-h-screen flex flex-col selection:bg-agency-orange selection:text-white font-sans antialiased">
        <AnalyticsScripts />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
