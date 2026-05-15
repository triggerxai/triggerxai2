import { useInView } from "react-intersection-observer";
import { Sparkles, ArrowRight, Plus } from "lucide-react";

interface ROIPreviewProps {
  onOpenROI?: () => void;
}

const ROIPreview = ({ onOpenROI }: ROIPreviewProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Outer rounded container */}
        <div
          className="relative overflow-hidden rounded-[32px] px-6 sm:px-10 md:px-14 py-10 md:py-14"
          style={{
            background:
              "linear-gradient(180deg, #fbf9f5 0%, #faf6ee 50%, #f7f3ea 100%)",
            border: "1px solid rgba(0,0,0,0.04)",
            boxShadow:
              "0 30px 80px -40px rgba(120, 100, 180, 0.25), 0 10px 30px -15px rgba(0,0,0,0.06)",
          }}
        >
          {/* Ambient glows */}
          <div
            className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(196,181,253,0.55), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(217,249,157,0.45), transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.6), transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Decorative shapes */}
          <div
            className="hidden md:block absolute top-10 left-12 w-16 h-16 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #d9f99d 0%, #bef264 100%)",
              opacity: 0.55,
            }}
          />
          <div
            className="hidden md:block absolute bottom-14 left-20 w-10 h-10 rounded-2xl rotate-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)",
              opacity: 0.5,
            }}
          />
          <div
            className="hidden md:block absolute top-20 right-16 w-12 h-12 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)",
              opacity: 0.55,
            }}
          />
          <div
            className="hidden md:block absolute bottom-20 right-24 w-8 h-8 rounded-lg -rotate-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #d9f99d 0%, #a3e635 100%)",
              opacity: 0.6,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(167,139,250,0.25)",
                boxShadow: "0 4px 12px -2px rgba(167,139,250,0.15)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />
              <span
                className="text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: "#7c3aed" }}
              >
                ROI Calculator
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
              style={{ color: "#0f172a" }}
            >
              See Your Potential ROI
            </h2>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg max-w-xl mx-auto mb-12"
              style={{ color: "#64748b" }}
            >
              Estimate how much time and revenue AI automation can save your
              business.
            </p>

            {/* Preview card */}
            <div className="relative max-w-xl mx-auto">

              <div
                className="relative rounded-3xl p-6 sm:p-7 text-left transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow:
                  "0 20px 50px -20px rgba(124, 58, 237, 0.18), 0 8px 20px -10px rgba(0,0,0,0.06)",
              }}
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "#0f172a" }} />
                </div>
                <h3
                  className="text-base sm:text-lg font-semibold"
                  style={{ color: "#0f172a" }}
                >
                  Calculate Your Potential Savings
                </h3>
              </div>

              <p
                className="text-sm mb-5 ml-12"
                style={{ color: "#6b7280" }}
              >
                Answer a few quick questions and see the impact AI can make.
              </p>

              {/* Input-style row */}
              <button
                onClick={onOpenROI}
                className="group w-full flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl transition-all duration-300"
                style={{
                  background: "#fafafa",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f3ff";
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                }}
              >
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
                    border: "1px solid rgba(167,139,250,0.3)",
                  }}
                >
                  <Plus className="w-5 h-5" style={{ color: "#7c3aed" }} />
                </div>

                <div className="flex-1 text-left">
                  <p
                    className="text-sm sm:text-[15px] font-semibold"
                    style={{ color: "#0f172a" }}
                  >
                    Start Your Free ROI Audit
                  </p>
                </div>

                <span
                  className="hidden sm:inline-block text-xs font-medium mr-1"
                  style={{ color: "#94a3b8" }}
                >
                  ~ 1 min
                </span>

                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{
                    background: "#0a0a0a",
                    boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)",
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIPreview;
