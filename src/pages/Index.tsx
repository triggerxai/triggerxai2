import { useState } from "react";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";

import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import ROICalculator from "@/components/sections/ROICalculator";
import ROIPreview from "@/components/sections/ROIPreview";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQ from "@/components/sections/FAQ";
import { usePageMeta } from "@/hooks/use-page-meta";

const Index = () => {
  usePageMeta({ title: "Triggerx AI — AI Implementation Partner for Modern Businesses", description: "Triggerx AI builds custom AI agents, chatbots, and voice systems that automate workflows, manage interactions, and free your team to focus on growth.", canonical: "/" });
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
      
      <Footer />
      <FloatingWhatsApp />
      
      <ROICalculator open={isROIOpen} onClose={() => setIsROIOpen(false)} />
    </div>;
};
export default Index;