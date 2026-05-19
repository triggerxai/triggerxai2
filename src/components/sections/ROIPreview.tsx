import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Calculator, Clock, DollarSign, Users, TrendingUp } from "lucide-react";

interface ROIPreviewProps {
  onOpenROI?: () => void;
}

const ROIPreview = ({ onOpenROI }: ROIPreviewProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-5 md:py-8 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* OUTER BOX */}
        <div
          className="relative overflow-hidden rounded-[36px] p-3 sm:p-4"
          style={{
            background: "linear-gradient(180deg, #f3eff7 0%, #efeaf4 100%)",
            border: "1px solid rgba(15,23,42,0.04)",
            boxShadow:
              "0 30px 80px -40px rgba(120, 100, 180, 0.25), 0 10px 30px -15px rgba(0,0,0,0.05)",
          }}
        >
          {/* INNER BOX */}
          <div
            className="relative overflow-hidden rounded-[28px] px-6 sm:px-9 md:px-12 py-8 md:py-12"
            style={{
              background:
                "linear-gradient(135deg, #faf7fb 0%, #f5f0f8 60%, #efe9f5 100%)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Soft ambient glows */}
            <div
              className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(196,181,253,0.4), transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(217,249,157,0.3), transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            {/* GRID */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* LEFT — copy */}
              <div className="text-left">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
                  style={{
                    background: "rgba(217,249,157,0.55)",
                    border: "1px solid rgba(163,230,53,0.35)",
                  }}
                >
                  <Calculator className="w-3.5 h-3.5" style={{ color: "#4d7c0f" }} />
                  <span
                    className="text-[11px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: "#4d7c0f" }}
                  >
                    ROI Calculator
                  </span>
                </div>

                {/* Heading */}
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-[1.05]"
                  style={{ color: "#0f172a" }}
                >
                  Your ROI,
                  <br />
                  Clearly{" "}
                  <span style={{ color: "#7c3aed" }}>Calculated</span>
                </h2>

                {/* Subtitle */}
                <p
                  className="text-base sm:text-lg mb-8 max-w-md leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  Find out the real impact AI automation can create for your
                  business.
                </p>

                {/* CTA */}
                <button
                  onClick={onOpenROI}
                  data-click-sound
                  className="group inline-flex items-center gap-2.5 pl-6 pr-5 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #d9f99d 0%, #bef264 100%)",
                    color: "#0f172a",
                    boxShadow:
                      "0 12px 28px -10px rgba(163,230,53,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
                    border: "1px solid rgba(163,230,53,0.4)",
                  }}
                >
                  Get Your ROI Estimate
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* RIGHT — Orbit calculator */}
              <div className="relative h-[340px] sm:h-[380px] md:h-[400px] flex items-center justify-center">
                {/* Orbit rings */}
                <div
                  className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full pointer-events-none"
                  style={{
                    border: "1px dashed rgba(167,139,250,0.35)",
                  }}
                />
                <div
                  className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full pointer-events-none"
                  style={{
                    border: "1px dashed rgba(167,139,250,0.25)",
                  }}
                />

                {/* Tiny orbit dots */}
                <span className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full" style={{ background: "#a78bfa" }} />
                <span className="absolute top-[78%] left-[22%] w-1.5 h-1.5 rounded-full" style={{ background: "#bef264" }} />
                <span className="absolute top-[28%] right-[14%] w-1.5 h-1.5 rounded-full" style={{ background: "#a78bfa" }} />
                <span className="absolute bottom-[18%] right-[20%] w-1.5 h-1.5 rounded-full" style={{ background: "#bef264" }} />

                {/* Center 3D Calculator */}
                <div className="relative z-10">
                  <div
                    className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-[28px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(160deg, #ffffff 0%, #f3eaff 55%, #e9d5ff 100%)",
                      boxShadow:
                        "0 30px 60px -20px rgba(124,58,237,0.45), 0 10px 20px -8px rgba(124,58,237,0.25), inset 0 2px 0 rgba(255,255,255,0.9), inset 0 -10px 20px rgba(167,139,250,0.18)",
                      border: "1px solid rgba(255,255,255,0.9)",
                    }}
                  >
                    <Calculator
                      className="w-14 h-14 sm:w-16 sm:h-16"
                      strokeWidth={1.8}
                      style={{ color: "#7c3aed" }}
                    />
                  </div>
                  {/* Base shadow plate */}
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110px] sm:w-[130px] h-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(124,58,237,0.35), transparent 70%)",
                      filter: "blur(6px)",
                    }}
                  />
                </div>

                {/* Floating chips */}
                <Chip
                  className="top-[6%] left-[4%] sm:left-[6%]"
                  icon={<Clock className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />}
                  label="Time Saved"
                />
                <Chip
                  className="top-[6%] right-[2%] sm:right-[4%]"
                  icon={<DollarSign className="w-3.5 h-3.5" style={{ color: "#4d7c0f" }} />}
                  label="Cost Savings"
                />
                <Chip
                  className="bottom-[10%] left-[6%] sm:left-[8%]"
                  icon={<Users className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />}
                  label="Leads Recovered"
                />
                <Chip
                  className="bottom-[10%] right-[2%] sm:right-[4%]"
                  icon={<TrendingUp className="w-3.5 h-3.5" style={{ color: "#4d7c0f" }} />}
                  label="Revenue Impact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Chip = ({
  className = "",
  icon,
  label,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <div
    className={`absolute inline-flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full backdrop-blur-md ${className}`}
    style={{
      background: "rgba(255,255,255,0.92)",
      border: "1px solid rgba(15,23,42,0.05)",
      boxShadow:
        "0 8px 20px -8px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
    }}
  >
    <span
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(237,233,254,0.9), rgba(217,249,157,0.5))",
      }}
    >
      {icon}
    </span>
    <span className="text-[12px] font-semibold" style={{ color: "#0f172a" }}>
      {label}
    </span>
  </div>
);

export default ROIPreview;
