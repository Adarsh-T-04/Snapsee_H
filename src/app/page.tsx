import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessSection } from "@/components/home/ProcessSection";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <FeaturedWork />
      <WhyChooseUs />
      <ProcessSection />
      <PricingTeaser />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}

