import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowLeft, ArrowRight, Scale, TrendingUp, ShoppingBag, ShieldCheck } from "lucide-react";
import lawFirmImg from "@/assets/case-law-firm.png";
import peImg from "@/assets/case-private-equity.png";

interface ProjectsProps {
  className?: string;
  onOpenROI?: () => void;
}

const caseStudies = [
  {
    category: "Law Firm",
    company: "Hargrove & Ellison LLP",
    location: "New York, NY",
    system: "AI-Powered Client CRM & Case Pipeline",
    icon: Scale,
    image: lawFirmImg,
    tint: "#F3EEFF",
    ring: "#E5D9FF",
  },
  {
    category: "Private Equity Firm",
    company: "Vantage Capital Partners",
    location: "Chicago, IL",
    system: "Central Portfolio Intelligence Dashboard",
    icon: TrendingUp,
    image: peImg,
    tint: "#EEF7E0",
    ring: "#DCEFC0",
  },
  {
    category: "E-Commerce / Retail Brand",
    company: "Elara Home & Living",
    location: "Los Angeles, CA",
    system: "AI Customer Retention & Post-Purchase Automation Dashboard",
    icon: ShoppingBag,
    image: null as string | null,
    tint: "#FFF3E8",
    ring: "#FCE2CB",
  },
  {
    category: "Insurance Agency",
    company: "Pinnacle Risk Advisors",
    location: "Atlanta, GA",
    system: "AI Voice Agent & Policy Renewal Automation System",
    icon: ShieldCheck,
    image: null as string | null,
    tint: "#E8F2FF",
    ring: "#CFE2FB",
  },
];

const Projects = ({ className }: ProjectsProps = {}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (card) {
      const step = card.offsetWidth + 24;
      setActiveIndex(Math.round(el.scrollLeft / step));
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${className || ""}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`flex items-end justify-between gap-6 mb-10 md:mb-12 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center md:text-left flex-1">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              style={{ color: "#111111" }}
            >
              Case Studies
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mb-2"
              style={{ color: "#6B7280" }}
            >
              Real results from real businesses powered by our AI automation systems.
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(15,23,42,0.08)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "#1f2937" }} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "#111111",
                border: "1px solid #111111",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>

        {/* Carousel - 2 cards visible on desktop with peek */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`section#projects div::-webkit-scrollbar{display:none;}`}</style>

          {caseStudies.map((cs, index) => {
            const Icon = cs.icon;
            const isActive = index === activeIndex;
            return (
              <div
                key={cs.company}
                data-card
                className="snap-start shrink-0 w-[85%] sm:w-[70%] md:w-[calc((100%-1.5rem)/2)] will-change-transform"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? `translateY(0) scale(${isActive ? 1 : 0.96})`
                    : "translateY(40px)",
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                <div
                  className="relative rounded-3xl p-3 h-full flex flex-col transition-all duration-300 ease-out group cursor-pointer"
                  style={{
                    background: cs.tint,
                    border: `1px solid ${cs.ring}`,
                    boxShadow: isActive
                      ? "0 20px 45px rgba(17,17,17,0.10)"
                      : "0 8px 24px rgba(17,17,17,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 24px 50px rgba(17,17,17,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isActive
                      ? "0 20px 45px rgba(17,17,17,0.10)"
                      : "0 8px 24px rgba(17,17,17,0.05)";
                  }}
                >
                  {/* Top: large image/banner ~62% */}
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{
                      aspectRatio: "16 / 10",
                      background: "rgba(255,255,255,0.6)",
                      border: `1px solid ${cs.ring}`,
                    }}
                  >
                    {cs.image ? (
                      <img
                        src={cs.image}
                        alt={`${cs.company} — ${cs.system}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${cs.tint} 0%, rgba(255,255,255,0.7) 100%)`,
                        }}
                      >
                        <div
                          className="w-24 h-24 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.75)",
                            border: `1px solid ${cs.ring}`,
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 6px 18px rgba(17,17,17,0.06)",
                          }}
                        >
                          <Icon className="w-9 h-9" style={{ color: "#1f2937", opacity: 0.75 }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom: white content */}
                  <div
                    className="rounded-2xl p-5 mt-3 flex flex-col flex-grow"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 2px 10px rgba(17,17,17,0.04)",
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                      style={{ color: "#9CA3AF" }}
                    >
                      {cs.category}
                    </span>
                    <h3
                      className="text-xl font-bold leading-snug mb-1"
                      style={{ color: "#111111" }}
                    >
                      {cs.company}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: "#374151", fontWeight: 500 }}>
                      {cs.location}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-5 flex-grow"
                      style={{ color: "#6B7280" }}
                    >
                      {cs.system}
                    </p>

                    <div
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 self-start"
                      style={{ color: "#111111" }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "#1f2937" }} />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
            style={{ background: "#111111" }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
