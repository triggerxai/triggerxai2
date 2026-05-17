import { useState } from "react";
import ROICalculator from "@/components/sections/ROICalculator";
import { usePageMeta } from "@/hooks/use-page-meta";

const ROIPage = () => {
  usePageMeta({
    title: "ROI Calculator — Triggerx AI",
    description: "Calculate the ROI of AI automation for your business in seconds.",
    canonical: "/ROI",
  });
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <img
          src="/lovable-uploads/14bcde09-cf75-409a-bcbf-e346efc47a4f.png"
          alt="Triggerx AI"
          className="w-14 h-14 mx-auto mb-6 object-contain"
        />
        <h1
          className="text-3xl md:text-5xl font-bold text-[#0a0a0a] mb-4"
          style={{ fontFamily: "'Inter', 'Sora', sans-serif", letterSpacing: "-0.02em" }}
        >
          Triggerx AI ROI Calculator
        </h1>
        <p className="text-[#475569] text-base md:text-lg mb-8">
          Find out what AI automation is worth to your business — in under 60 seconds.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center px-7 h-12 rounded-2xl text-[15px] font-medium text-white hover:-translate-y-0.5 transition-all duration-300"
          style={{ background: "#0a0a0a" }}
        >
          Open Calculator
        </button>
        <div className="mt-8">
          <a href="/" className="text-sm text-[#475569] hover:text-[#0a0a0a] underline">
            ← Back to Triggerx AI
          </a>
        </div>
      </div>

      <ROICalculator open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ROIPage;
