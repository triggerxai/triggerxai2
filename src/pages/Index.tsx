import { useState } from "react";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Projects from "@/components/sections/Projects";
import Metrics from "@/components/sections/Metrics";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";

import SocialMedia from "@/components/sections/SocialMedia";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

import ROICalculator from "@/components/sections/ROICalculator";
import ROIPreview from "@/components/sections/ROIPreview";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQ from "@/components/sections/FAQ";

const Index = () => {
  const [isROIOpen, setIsROIOpen] = useState(false);

  return <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="reveal reveal-stagger"><Stats /></div>
      <div className="reveal reveal-stagger"><Services /></div>
      <div className="reveal reveal-stagger"><TrustedBy /></div>
      <div className="reveal reveal-stagger"><Projects className="my-0 py-px" onOpenROI={() => setIsROIOpen(true)} /></div>
      <div className="reveal reveal-stagger"><ROIPreview onOpenROI={() => setIsROIOpen(true)} /></div>
      <div className="reveal reveal-stagger"><Testimonials /></div>
      <div className="reveal reveal-stagger"><Process /></div>
      
      <div className="reveal reveal-stagger"><FAQ /></div>
      <div className="reveal reveal-stagger"><Contact /></div>
      <div className="reveal reveal-stagger"><SocialMedia className="py-px rounded-2xl" /></div>
      <Footer />
      <FloatingWhatsApp />
      
      <ROICalculator open={isROIOpen} onClose={() => setIsROIOpen(false)} />
    </div>;
};
export default Index;