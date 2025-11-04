import Navigation from "@/components/Navigation";
import SpatialHero from "@/components/hero/SpatialHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import VideoShowcase from "@/components/sections/VideoShowcase";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <Navigation />
      <SpatialHero />
      <ProcessTimeline />
      <VideoShowcase />
      <CaseStudies />
      <Contact />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
