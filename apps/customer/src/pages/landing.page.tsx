import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { VenueOwner } from "@/components/venue-owner";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <VenueOwner />
      <CTA />
      <Footer />
    </div>
  );
};